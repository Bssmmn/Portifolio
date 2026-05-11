import json
import os
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path

from api.chat import (
    MAX_MESSAGE_LENGTH,
    _call_gemini,
    _detect_language,
    _direct_answer,
    _fallback_answer,
    _greeting_answer,
    _is_greeting,
    _load_knowledge,
    _retrieve_context,
)


ROOT = Path(__file__).resolve().parent
PORT = int(os.environ.get("PORT", "8000"))


def load_local_env():
    """Load simple KEY=value pairs from .env.local for local testing."""
    env_file = ROOT / ".env.local"

    if not env_file.exists():
        return

    for line in env_file.read_text(encoding="utf-8").splitlines():
        line = line.strip()

        if not line or line.startswith("#") or "=" not in line:
            continue

        key, value = line.split("=", 1)
        os.environ.setdefault(key.strip(), value.strip().strip('"').strip("'"))


class PortfolioHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT), **kwargs)

    def _send_json(self, status_code, payload):
        body = json.dumps(payload).encode("utf-8")

        self.send_response(status_code)
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def do_POST(self):
        if self.path != "/api/chat":
            self._send_json(404, {"reply": "Unknown endpoint."})
            return

        try:
            content_length = int(self.headers.get("Content-Length", 0))
            raw_body = self.rfile.read(content_length).decode("utf-8")
            data = json.loads(raw_body or "{}")
            question = str(data.get("message", "")).strip()
            requested_language = str(data.get("language", "")).strip().lower()
            language = requested_language if requested_language in {"en", "de", "ru"} else _detect_language(question)

            if not question:
                self._send_json(400, {"reply": _fallback_answer(language)})
                return

            if len(question) > MAX_MESSAGE_LENGTH:
                self._send_json(400, {"reply": "Please keep the question shorter."})
                return

            if _is_greeting(question):
                self._send_json(200, {"reply": _greeting_answer(language)})
                return

            knowledge = _load_knowledge()

            direct_reply = _direct_answer(question, language, knowledge)
            if direct_reply:
                self._send_json(200, {"reply": direct_reply})
                return

            context = _retrieve_context(question, knowledge)

            if not context:
                self._send_json(200, {"reply": _fallback_answer(language)})
                return

            self._send_json(200, {"reply": _call_gemini(question, context, language)})

        except Exception as error:
            print(f"Local chatbot error: {error}")
            self._send_json(
                500,
                {
                    "reply": (
                        "The assistant could not answer right now. Check the terminal for the local server error."
                    )
                }, 
            )


if __name__ == "__main__":
    load_local_env()
    server = ThreadingHTTPServer(("127.0.0.1", PORT), PortfolioHandler)
    print(f"Portfolio running at http://127.0.0.1:{PORT}")
    print("Chat endpoint running at /api/chat")
    server.serve_forever()

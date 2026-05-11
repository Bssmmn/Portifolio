import json
import os
import re
from http.server import BaseHTTPRequestHandler
from pathlib import Path


KNOWLEDGE_PATH = Path(__file__).with_name("knowledge.json")
MAX_MESSAGE_LENGTH = 500

STOPWORDS = {
    "a", "an", "and", "are", "about", "can", "could", "does", "do", "for", "from",
    "has", "have", "how", "i", "is", "it", "me", "my", "of", "on", "or", "please",
    "tell", "the", "to", "what", "which", "who", "with", "you", "your",

    "der", "die", "das", "und", "oder", "wie", "was", "welche", "welchen", "hat",
    "ist", "von", "über", "mir", "mich", "bitte",

    "и", "а", "что", "как", "кто", "где", "мне", "меня", "про", "о", "об",
    "ее", "её", "его", "ты", "вы", "можешь", "пожалуйста"
}

TOPIC_ALIASES = {
    "profile": {
        "profile", "about", "intro", "background",
        "profil", "über", "hintergrund",
        "профиль", "обо", "биография"
    },
    "projects": {
        "project", "projects", "portfolio", "github", "sign", "gesture", "drone",
        "vegetation", "financial", "news", "analyzer", "finbert", "mediapipe", "opencv",
        "projekt", "projekte",
        "проект", "проекты", "гитхаб"
    },
    "skills": {
        "skill", "skills", "tech", "technology", "stack", "python", "c++", "cpp",
        "sql", "fastapi", "django", "html", "css", "javascript", "git", "docker",
        "linux", "jupyter", "hugging", "face", "ml", "ai", "machine", "learning", "data",
        "fähigkeiten", "kenntnisse", "skills",
        "навыки", "умения", "технологии"
    },
    "education": {
        "education", "study", "university", "degree", "hof", "iitu", "grade", "gpa", "average",
        "studium", "ausbildung", "universität",
        "образование", "университет", "учеба", "учёба"
    },
    "research": {
        "research", "publication", "publications", "scopus", "paper", "papers",
        "gis", "remote", "sensing", "supply", "chain", "analytics", "agile",
        "forschung", "publikation", "scopus",
        "исследования", "публикации", "скопус"
    },
    "achievements": {
        "achievement", "achievements", "award", "winner", "hackathon", "icpc", "dtesi",
        "erfolg", "erfolge", "gewinner", "hackathon",
        "достижения", "хакатон", "победа", "icpc"
    },
    "languages": {
        "language", "languages", "english", "german", "russian", "arabic",
        "sprache", "sprachen", "englisch", "deutsch", "russisch", "arabisch",
        "язык", "языки", "английский", "немецкий", "русский", "арабский"
    },
    "contact": {
        "contact", "email", "mail", "linkedin", "github", "phone",
        "kontakt", "kontaktieren", "e-mail", "linkedin", "github",
        "контакт", "контакты", "связаться", "связь", "почта", "емейл", "линкедин", "гитхаб"
    },
    "cv": {
        "cv", "resume", "lebenslauf", "curriculum",
        "резюме", "св"
    },
    "experience": {
        "experience", "work", "intern", "internship", "fellowship", "job",
        "erfahrung", "praktikum", "werkstudent", "arbeit",
        "опыт", "работа", "стажировка"
    }
}

GREETING_PATTERNS = {
    "en": {"hi", "hello", "hey", "how are you", "good morning", "good evening"},
    "de": {"hallo", "hi", "guten morgen", "guten abend", "wie geht es dir"},
    "ru": {"привет", "здравствуй", "здравствуйте", "как дела", "добрый день"}
}


def _load_knowledge():
    with KNOWLEDGE_PATH.open("r", encoding="utf-8") as file:
        return json.load(file)


def _json_response(handler, status_code, payload):
    body = json.dumps(payload, ensure_ascii=False).encode("utf-8")

    handler.send_response(status_code)
    handler.send_header("Content-Type", "application/json; charset=utf-8")
    handler.send_header("Access-Control-Allow-Origin", "*")
    handler.send_header("Access-Control-Allow-Methods", "POST, OPTIONS")
    handler.send_header("Access-Control-Allow-Headers", "Content-Type")
    handler.end_headers()
    handler.wfile.write(body)


def _detect_language(text):
    lower = text.lower()

    if re.search(r"[а-яА-Я]", text):
        return "ru"

    german_words = {
        "hallo", "wie", "was", "wer", "deutsch", "lebenslauf",
        "kontakt", "forschung", "projekte", "kenntnisse", "studium"
    }

    if any(word in lower for word in german_words):
        return "de"

    return "en"


def _is_greeting(text):
    lower = text.lower().strip()
    return any(phrase in lower for phrases in GREETING_PATTERNS.values() for phrase in phrases)


def _greeting_answer(language):
    if language == "de":
        return "Hallo! Ich bin Gehads Portfolio-Assistent. Du kannst mich nach ihren Projekten, Skills, Forschung, CV, Erfolgen oder Kontaktdaten fragen."

    if language == "ru":
        return "Привет! Я ассистент портфолио Gehad. Можешь спросить меня о её проектах, навыках, исследованиях, CV, достижениях или контактах."

    return "Hi! I’m Gehad’s portfolio assistant. You can ask me about her projects, skills, research, CV, achievements, or contact information."


def _tokenize(text):
    tokens = set(re.findall(r"[a-zA-Zа-яА-Я0-9+#./:-]+", text.lower()))
    return {token for token in tokens if token not in STOPWORDS and len(token) > 1}


def _retrieve_context(question, knowledge):
    question_tokens = _tokenize(question)
    lower_question = question.lower()
    ranked_chunks = []

    for item in knowledge:
        topic = item["topic"].lower()
        topic_tokens = _tokenize(item["topic"])
        text_tokens = _tokenize(item["text"])

        score = len(question_tokens & (topic_tokens | text_tokens))

        if topic in lower_question:
            score += 5

        aliases = TOPIC_ALIASES.get(topic, set())
        if question_tokens & aliases:
            score += 8

        ranked_chunks.append((score, item))

    ranked_chunks.sort(key=lambda pair: pair[0], reverse=True)
    useful_chunks = [item for score, item in ranked_chunks if score > 0][:5]

    if not useful_chunks:
        return ""

    return "\n\n".join(f"{item['topic'].upper()}: {item['text']}" for item in useful_chunks)


def _topic_text(knowledge, topic):
    return next((item["text"] for item in knowledge if item["topic"] == topic), "")


def _matches_topic(question, topic):
    lower = question.lower()
    question_tokens = _tokenize(question)
    aliases = TOPIC_ALIASES.get(topic, set())

    return topic in lower or bool(question_tokens & aliases)


def _fallback_answer(language):
    if language == "de":
        return "Ich kann nur Fragen zu Gehads Portfolio, Projekten, Skills, Forschung, CV, Ausbildung, Erfolgen, Sprachen und Kontaktdaten beantworten."

    if language == "ru":
        return "Я могу отвечать только на вопросы о портфолио Gehad, её проектах, навыках, исследованиях, CV, образовании, достижениях, языках и контактах."

    return "I can only answer questions about Gehad Hamada’s portfolio, projects, skills, research, CV, education, achievements, languages, and contact information."


def _direct_answer(question, language, knowledge):
    lower = question.lower()

    if "email" in lower or "mail" in lower or "e-mail" in lower or "почта" in lower or "емейл" in lower:
        if language == "de":
            return "Gehads E-Mail-Adresse ist ghamada@hof-university.de."
        if language == "ru":
            return "Email Gehad: ghamada@hof-university.de."
        return "Gehad’s email is ghamada@hof-university.de."

    if "linkedin" in lower or "linked in" in lower or "линкедин" in lower:
        if language == "de":
            return "Gehads LinkedIn-Profil ist https://www.linkedin.com/in/gehad-hamada-cs/"
        if language == "ru":
            return "LinkedIn Gehad: https://www.linkedin.com/in/gehad-hamada-cs/"
        return "Gehad’s LinkedIn is https://www.linkedin.com/in/gehad-hamada-cs/"

    if "github" in lower or "git hub" in lower or "гитхаб" in lower:
        if language == "de":
            return "Gehads GitHub-Profil ist https://github.com/Bssmmn"
        if language == "ru":
            return "GitHub Gehad: https://github.com/Bssmmn"
        return "Gehad’s GitHub is https://github.com/Bssmmn"

    if "scopus" in lower or "скопус" in lower:
        if language == "de":
            return "Gehads Scopus ID ist 59563623800."
        if language == "ru":
            return "Scopus ID Gehad: 59563623800."
        return "Gehad’s Scopus ID is 59563623800."

    if "phone" in lower or "number" in lower or "telefon" in lower or "номер" in lower:
        if language == "de":
            return "Gehads Telefonnummer ist +49 157 58339541."
        if language == "ru":
            return "Телефон Gehad: +49 157 58339541."
        return "Gehad’s phone number is +49 157 58339541."

    if _matches_topic(question, "contact"):
        if language == "de":
            return "Du kannst Gehad per E-Mail unter ghamada@hof-university.de kontaktieren. Ihr LinkedIn ist linkedin.com/in/gehad-hamada-cs und ihr GitHub ist github.com/Bssmmn."
        if language == "ru":
            return "Связаться с Gehad можно по email ghamada@hof-university.de. LinkedIn: linkedin.com/in/gehad-hamada-cs, GitHub: github.com/Bssmmn."
        return "You can contact Gehad by email at ghamada@hof-university.de. Her LinkedIn is linkedin.com/in/gehad-hamada-cs and her GitHub is github.com/Bssmmn."

    if _matches_topic(question, "projects"):
        if language == "de":
            return "Gehads Projekte sind Sign Language Recognition System, Drone-Based Vegetation Health Mapping System und Financial News Analyzer. Sie zeigen Arbeit mit Python, ML, Datenvisualisierung, FastAPI, JavaScript, Docker und Deployment."
        if language == "ru":
            return "Проекты Gehad: Sign Language Recognition System, Drone-Based Vegetation Health Mapping System и Financial News Analyzer. Они показывают Python, ML, data visualization, FastAPI, JavaScript, Docker и deployment."
        return "Gehad’s projects include Sign Language Recognition System, Drone-Based Vegetation Health Mapping System, and Financial News Analyzer. They show Python, ML, data visualization, FastAPI, JavaScript, Docker, and deployment work."

    if _matches_topic(question, "skills"):
        if language == "de":
            return "Gehads Skills umfassen Python, C++, SQL, FastAPI, Django, HTML, CSS, JavaScript, Git, GitHub, Docker, Linux, Jupyter, Hugging Face, Datenanalyse und Machine-Learning-Workflows."
        if language == "ru":
            return "Навыки Gehad: Python, C++, SQL, FastAPI, Django, HTML, CSS, JavaScript, Git, GitHub, Docker, Linux, Jupyter, Hugging Face, data analysis и ML workflows."
        return "Gehad’s skills include Python, C++, SQL, FastAPI, Django, HTML, CSS, JavaScript, Git, GitHub, Docker, Linux, Jupyter, Hugging Face, data analysis, and ML workflows."

    if _matches_topic(question, "education"):
        if language == "de":
            return "Gehad studiert B.Sc. Computer Science an der Hochschule Hof und B.Sc. Computer Systems and Software Engineering an der IITU in Almaty. Ihr aktueller Durchschnitt ist 3,58 von 4,0."
        if language == "ru":
            return "Gehad учится на B.Sc. Computer Science в Hof University of Applied Sciences и на B.Sc. Computer Systems and Software Engineering в IITU, Almaty. Ее текущий средний балл: 3.58 из 4.0."
        return "Gehad studies B.Sc. Computer Science at Hof University of Applied Sciences and B.Sc. Computer Systems and Software Engineering at IITU in Almaty. Her current average grade is 3.58 out of 4.0."

    if _matches_topic(question, "experience"):
        if language == "de":
            return "Gehads Erfahrung umfasst die Headstarter AI Fellowship und ein Praktikum im ITU Innovation Center mit Aufgaben in AI-Projekten, Softwareentwicklung, Backend-Entwicklung und Datenverarbeitung."
        if language == "ru":
            return "Опыт Gehad включает Headstarter AI Fellowship и стажировку в ITU Innovation Center с AI projects, software development, backend development и data handling."
        return "Gehad’s experience includes the Headstarter AI Fellowship and an ITU Innovation Center internship, covering AI-driven projects, software development, backend development, and data handling."

    if _matches_topic(question, "research"):
        if language == "de":
            return "Gehads Forschung umfasst Machine Learning, Logistics and Supply Chain, GIS, Remote Sensing, AI-Anwendungen, digitale Transformation, Big Data Analytics und agiles Projektmanagement. Ihre Scopus ID ist 59563623800."
        if language == "ru":
            return "Исследования Gehad связаны с machine learning, logistics and supply chain, GIS, remote sensing, AI applications, digital transformation, big data analytics и agile project management. Scopus ID: 59563623800."
        return "Gehad’s research covers machine learning, logistics and supply chain, GIS, remote sensing, AI applications, digital transformation, big data analytics, and agile project management. Her Scopus ID is 59563623800."

    if _matches_topic(question, "achievements"):
        if language == "de":
            return "Gehads Erfolge umfassen den 2. Platz beim Alrathon Hackathon in Almaty, ICPC-Teilnahme bis zum Viertelfinale und Teilnahme an der 9th International Conference DTESI."
        if language == "ru":
            return "Достижения Gehad: 2 место на Alrathon Hackathon в Алматы, участие в ICPC quarterfinals и участие в 9th International Conference DTESI."
        return "Gehad’s achievements include 2nd place at the Alrathon Hackathon in Almaty, ICPC quarterfinal participation, and participation in the 9th International Conference DTESI."

    if _matches_topic(question, "languages"):
        if language == "de":
            return "Gehads Sprachen sind Arabisch C2, Englisch C1, Russisch B1 und Deutsch B1.1."
        if language == "ru":
            return "Языки Gehad: Arabic C2, English C1, Russian B1 и German B1.1."
        return "Gehad’s languages are Arabic C2, English C1, Russian B1, and German B1.1."

    if _matches_topic(question, "cv"):
        if language == "de":
            return "Gehads Portfolio enthält einen englischen CV unter assets/cv/cv-EN.pdf und einen deutschen CV unter assets/cv/GEHAD_HAMADA_FlowCV_Resume_2026-05-06-2.pdf."
        if language == "ru":
            return "В портфолио Gehad есть English CV: assets/cv/cv-EN.pdf и German CV: assets/cv/GEHAD_HAMADA_FlowCV_Resume_2026-05-06-2.pdf."
        return "Gehad’s portfolio includes an English CV at assets/cv/cv-EN.pdf and a German CV at assets/cv/GEHAD_HAMADA_FlowCV_Resume_2026-05-06-2.pdf."

    if _matches_topic(question, "profile") or "gehad" in lower:
        if language == "de":
            return "Gehad Hamada ist Informatikstudentin mit Fokus auf Software Engineering, KI, datengetriebene Projekte und forschungsbasierte Lösungen. Sie sucht Praktika, Werkstudentenstellen und Junior-Rollen."
        if language == "ru":
            return "Gehad Hamada - студентка Computer Science с фокусом на software engineering, AI, data-driven проекты и research-based solutions. Она ищет internships, working student и junior roles."
        return "Gehad Hamada is a Computer Science student focused on software engineering, AI, data-driven projects, and research-based solutions. She is looking for internships, working student roles, and junior roles."

    return None


def _call_gemini(question, context, language='en'):
    api_key = os.environ.get("GEMINI_API_KEY")

    if not api_key:
        first_context_chunk = re.sub(r"^[A-Z_ ]+:\s*", "", context.split("\n\n", 1)[0]).strip()
        if len(first_context_chunk) > 520:
            first_context_chunk = first_context_chunk[:517].rsplit(" ", 1)[0] + "..."

        if first_context_chunk:
            if language == "de":
                return f"Live-Gemini-Antworten sind noch nicht verbunden. Aus Gehads Portfolio: {first_context_chunk}"
            if language == "ru":
                return f"Live Gemini ответы пока не подключены. Из портфолио Gehad: {first_context_chunk}"
            return f"Live Gemini replies are not connected yet. From Gehad’s portfolio: {first_context_chunk}"

        if language == "de":
            return "Der Portfolio-Assistent ist eingerichtet, aber GEMINI_API_KEY fehlt auf dem Server."
        if language == "ru":
            return "Ассистент портфолио настроен, но на сервере отсутствует GEMINI_API_KEY."
        return "The portfolio assistant is set up, but GEMINI_API_KEY is missing on the server."

    from google import genai
    from google.genai import types

    client = genai.Client(api_key=api_key)

    language_instruction = {
        "en": "Reply in English.",
        "de": "Reply in German.",
        "ru": "Reply in Russian."
    }.get(language, "Reply in English.")

    system_instruction = (
        "You are Gehad Hamada's portfolio assistant. "
        "Answer only about Gehad Hamada, her portfolio, projects, skills, research, CV, "
        "education, achievements, languages, and contact information. "
        "Use only the provided portfolio context. Do not invent facts, experience, employers, "
        "grades, publications, or links. Keep replies concise, professional, and under 100 words. "
        f"{language_instruction} "
        "If the question is unrelated or the answer is not in the context, say that you can only "
        "answer questions about Gehad Hamada's portfolio."
    )

    prompt = (
        "PORTFOLIO CONTEXT:\n"
        f"{context}\n\n"
        "QUESTION:\n"
        f"{question}\n\n"
        "Answer from the context only."
    )

    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=prompt,
        config=types.GenerateContentConfig(
            system_instruction=system_instruction,
            temperature=0.2,
            max_output_tokens=240,
        ),
    )

    return response.text.strip()


class handler(BaseHTTPRequestHandler):
    def do_OPTIONS(self):
        _json_response(self, 200, {"ok": True})

    def do_POST(self):
        try:
            content_length = int(self.headers.get("Content-Length", 0))
            raw_body = self.rfile.read(content_length).decode("utf-8")
            data = json.loads(raw_body or "{}")
            question = str(data.get("message", "")).strip()
            requested_language = str(data.get("language", "")).strip().lower()

            language = requested_language if requested_language in {"en", "de", "ru"} else _detect_language(question)

            if not question:
                _json_response(self, 400, {"reply": _fallback_answer(language)})
                return

            if len(question) > MAX_MESSAGE_LENGTH:
                _json_response(self, 400, {"reply": "Please keep the question shorter."})
                return

            if _is_greeting(question):
                _json_response(self, 200, {"reply": _greeting_answer(language)})
                return

            knowledge = _load_knowledge()

            direct_reply = _direct_answer(question, language, knowledge)
            if direct_reply:
                _json_response(self, 200, {"reply": direct_reply})
                return

            context = _retrieve_context(question, knowledge)

            if not context:
                _json_response(self, 200, {"reply": _fallback_answer(language)})
                return

            reply = _call_gemini(question, context, language)
            _json_response(self, 200, {"reply": reply})

        except Exception as error:
            print(f"Portfolio assistant error: {error}")
            _json_response(
                self,
                500,
                {
                    "reply": "The assistant could not answer right now. Please try again later or contact Gehad directly."
                },
            )

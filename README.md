# Gehad Hamada Multi-Page Portfolio

A modern, animated, multi-page portfolio website for Gehad Hamada, a Software Engineering student looking for internships, working student roles, and junior software engineering opportunities.

## What is included

- `index.html` - animated home page with the robot portfolio assistant
- `about.html` - professional summary and work process
- `projects.html` - filterable project cards
- `achievements.html` - achievement timeline
- `research.html` - research and publication placeholders
- `cv.html` - CV download and skills overview
- `contact.html` - contact cards and validated contact form
- `style.css` - full responsive design, animations, dark/light themes
- `script.js` - icons, theme switching, language switching, counters, filters, chat UI, form validation, scroll effects
- `api/chat.py` - Python Vercel Function for the Gemini portfolio chatbot
- `api/knowledge.json` - editable portfolio knowledge base used by the chatbot
- `local_server.py` - optional local Python server that serves the site and `/api/chat`
- `.env.example` - example environment file for local Gemini testing
- `requirements.txt` - Python dependency list for Vercel
- `vercel.json` - Vercel function configuration
- `assets/images/gehad-profile.jpg` - profile image
- `assets/cv/cv-EN.pdf` - English CV
- `assets/cv/GEHAD_HAMADA_FlowCV_Resume_2026-05-06-2.pdf` - German CV

## Features

- Multiple HTML pages
- Dark mode and light mode with `localStorage`
- English, German, and Russian language switching with `localStorage`
- Local JavaScript SVG icon system
- Matching social/app icon style for GitHub, LinkedIn, ORCID, and email
- Dark violet and muted rose visual identity with polished glassmorphism cards
- Interactive robot chatbot on the home page
- Gemini-powered portfolio Q&A when deployed with the backend
- Simple RAG-style retrieval from `api/knowledge.json`
- Canvas particle background on the home page
- Project filtering
- Scroll progress bar
- Back-to-top button
- Mobile hamburger navigation
- Contact form validation
- Static research page that is easy to edit with your own research titles and ORCID ID
- Fully responsive desktop, tablet, and mobile layout

## How to run

Open `index.html` in a browser if you only want to preview the static pages.

The visual portfolio works as normal from a static file. The Gemini chatbot needs the Python backend, so it works after deploying to Vercel or running with Vercel locally.

## Local Chatbot Testing

Do not put the Gemini API key directly inside `api/chat.py`.

Create a file called `.env.local` inside the `gehad-portfolio` folder:

```text
GEMINI_API_KEY=your_real_gemini_api_key_here
```

Install the Python dependency:

```bash
pip3 install -r requirements.txt
```

Run the included local server from inside the `gehad-portfolio` folder:

```bash
python3 local_server.py
```

Then open:

```text
http://127.0.0.1:8000
```

Important: running `python3 api/chat.py` directly will not start the website. `api/chat.py` is a Vercel Function handler.

You can also test with Vercel CLI:

```bash
npm i -g vercel
vercel dev
```

Then open the local Vercel URL shown in the terminal.

## How to customize

Replace these placeholder links in the HTML files:

- GitHub
- LinkedIn
- ORCID
- Email

Replace the English or German CV files inside `assets/cv/` whenever you update your resume.

Edit project titles, descriptions, and links in `projects.html`.

Edit chatbot knowledge in:

```text
api/knowledge.json
```

Edit translated text in the `translations` object inside `script.js`.

## Deploy on Vercel with Gemini Chatbot

This is the recommended deployment option because the chatbot needs a secure backend.

1. Create a GitHub repository.
2. Upload all files inside the `gehad-portfolio` folder.
3. Import the repository into Vercel.
4. In Vercel, open **Settings** then **Environment Variables**.
5. Add:

```text
GEMINI_API_KEY=your_gemini_api_key_here
```

6. Deploy the project.

The frontend calls the backend at:

```text
/api/chat
```

## GitHub Pages Note

GitHub Pages can host the static pages, but it cannot safely run the Gemini chatbot backend. Use Vercel for the full version.

## Chatbot Rules

The assistant is intentionally limited. It should answer only questions about:

- Gehad Hamada
- Projects
- Skills
- CV
- Research
- Achievements
- Education
- Languages
- Contact information

For unrelated questions, it should refuse politely instead of acting like a general chatbot.

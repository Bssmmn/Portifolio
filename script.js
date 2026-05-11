/* =========================================================
   Gehad Hamada Multi-Page Portfolio JavaScript
   ---------------------------------------------------------
   This file is intentionally plain JavaScript:
   - no frameworks
   - no icon library dependency
   - all icons are generated from this file
   - theme and language are remembered with localStorage
   ========================================================= */

// ---------- Local Icon System ----------
// Each icon is a tiny inline SVG body. JavaScript places the SVG inside
// every <span class="icon" data-icon="..."></span> element.
const icons = {
  home: '<path d="M3 10.5 12 3l9 7.5"/><path d="M5 10v10h14V10"/><path d="M9 20v-6h6v6"/>',
  user: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
  code: '<path d="m8 9-4 3 4 3"/><path d="m16 9 4 3-4 3"/><path d="m14 5-4 14"/>',
  trophy: '<path d="M8 4h8v5a4 4 0 0 1-8 0V4Z"/><path d="M6 5H3v2a4 4 0 0 0 5 4"/><path d="M18 5h3v2a4 4 0 0 1-5 4"/><path d="M12 13v4"/><path d="M8 21h8"/><path d="M9 17h6"/>',
  book: '<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v17H6.5A2.5 2.5 0 0 1 4 17.5v-12Z"/><path d="M4 17.5A2.5 2.5 0 0 1 6.5 15H20"/>',
  file: '<path d="M6 3h8l4 4v14H6V3Z"/><path d="M14 3v5h5"/><path d="M9 13h6"/><path d="M9 17h6"/>',
  mail: '<path d="M4 6h16v12H4z"/><path d="m4 7 8 6 8-6"/>',
  moon: '<path d="M21 14.5A8.5 8.5 0 0 1 9.5 3a7 7 0 1 0 11.5 11.5Z"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/>',
  sparkles: '<path d="M12 3 9.8 8.4 4 10l5.8 1.6L12 17l2.2-5.4L20 10l-5.8-1.6L12 3Z"/><path d="M5 17l-1 2-2 1 2 1 1 2 1-2 2-1-2-1-1-2Z"/><path d="M19 15l-.8 1.7-1.7.8 1.7.8.8 1.7.8-1.7 1.7-.8-1.7-.8L19 15Z"/>',
  download: '<path d="M12 3v12"/><path d="m7 10 5 5 5-5"/><path d="M5 21h14"/>',
  send: '<path d="M22 2 11 13"/><path d="m22 2-7 20-4-9-9-4 20-7Z"/>',
  globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3a14 14 0 0 1 0 18"/><path d="M12 3a14 14 0 0 0 0 18"/>',
  database: '<ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v6c0 1.7 3.6 3 8 3s8-1.3 8-3V5"/><path d="M4 11v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6"/>',
  java: '<path d="M9 18c2 1 5 1 7 0"/><path d="M8 21c3 1 7 1 10-1"/><path d="M12 3c2 2-2 3 0 5s4 2 2 5"/><path d="M8 14c3 1 8 1 10-1"/>',
  layers: '<path d="m12 3 9 5-9 5-9-5 9-5Z"/><path d="m3 12 9 5 9-5"/><path d="m3 16 9 5 9-5"/>',
  target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>',
  github: '<circle cx="12" cy="12" r="9"/><path d="M9 19v-3c-3 .7-3-1.5-4-2"/><path d="M15 19v-3.2c0-.9-.3-1.5-.8-1.9 2.6-.3 5.3-1.3 5.3-5.7 0-1.3-.5-2.4-1.2-3.2.1-.3.5-1.6-.1-3.1 0 0-1-.3-3.2 1.2a11 11 0 0 0-6 0C6.8.7 5.8 1 5.8 1c-.6 1.5-.2 2.8-.1 3.1A4.6 4.6 0 0 0 4.5 7.3c0 4.4 2.7 5.4 5.3 5.7-.4.3-.7.8-.8 1.5"/>',
  linkedin: '<path d="M6 9v10"/><path d="M6 5v.01"/><path d="M10 19v-5.5a3.5 3.5 0 0 1 7 0V19"/><path d="M10 9v10"/>',
  orcid: '<circle cx="12" cy="12" r="9"/><path d="M8 8v8"/><path d="M12 8h2a4 4 0 0 1 0 8h-2V8Z"/>',
  external: '<path d="M14 3h7v7"/><path d="m21 3-9 9"/><path d="M19 14v6H5V6h6"/>',
  arrowUp: '<path d="M12 19V5"/><path d="m5 12 7-7 7 7"/>',
  filter: '<path d="M3 5h18"/><path d="M6 12h12"/><path d="M10 19h4"/>',
  game: '<path d="M7 10h10a5 5 0 0 1 4 8l-1 1a2 2 0 0 1-3-.5L16 16H8l-1 2.5a2 2 0 0 1-3 .5l-1-1a5 5 0 0 1 4-8Z"/><path d="M8 13h3"/><path d="M9.5 11.5v3"/><path d="M16 13h.01"/><path d="M18 15h.01"/>',
  chart: '<path d="M4 19V5"/><path d="M4 19h17"/><path d="M8 16v-5"/><path d="M13 16V8"/><path d="M18 16v-3"/>',
  briefcase: '<path d="M10 6V5a2 2 0 0 1 2-2h0a2 2 0 0 1 2 2v1"/><path d="M4 7h16v12H4z"/><path d="M4 12h16"/><path d="M10 12v2h4v-2"/>',
  satellite: '<path d="M10 14 4 20"/><path d="m14 10 6-6"/><path d="m8 6 10 10"/><path d="M7 7a7 7 0 0 0 10 10"/><path d="M5 3a12 12 0 0 0 16 16"/>',
  graduation: '<path d="m3 8 9-5 9 5-9 5-9-5Z"/><path d="M7 10v5c3 2 7 2 10 0v-5"/><path d="M21 8v6"/>',
  languages: '<path d="M4 5h8"/><path d="M8 3v2"/><path d="M10 5c-.7 4-2.7 7-6 9"/><path d="M5 9c1 2 3 4 6 5"/><path d="M14 21l4-9 4 9"/><path d="M15.5 18h5"/>'
};

// ---------- Translations ----------
// The pages use data-i18n attributes. This object provides the text.
const translations = {
  en: {
    loading: "Loading portfolio...",
    navHome: "Home",
    navAbout: "About",
    navProjects: "Projects",
    navAchievements: "Achievements",
    navResearch: "Research",
    navCv: "CV",
    navContact: "Contact",
    homeEyebrow: "Computer Science Student",
    homeTitle: "Hi, I’m Gehad Hamada.",
    homeLead: "I am a Computer Science student focused on software engineering, AI, data-driven projects, and research-based solutions.",
    btnExploreProjects: "Explore Projects",
    btnDownloadCv: "Download CV",
    btnContact: "Contact Me",
    statPages: "Portfolio Pages",
    statMainProjects: "Main Projects",
    statFocus: "Focus Areas",
    statLanguages: "Languages",
    availability: "Open to internships and working student roles",
    robotStatus: "Portfolio assistant online",
    robotCode: "portfolio assistant",
    assistantTitle: "Ask Gehad",
    assistantIntro: "Ask about projects, skills, CV, research, achievements, languages, or contact.",
    assistantWelcome: "Hi, I’m Gehad’s portfolio assistant. I only answer from her portfolio information.",
    assistantNote: "This assistant is limited to Gehad’s portfolio knowledge.",
    chatInputLabel: "Ask a portfolio question",
    chatPlaceholder: "Ask about Gehad’s projects or skills...",
    chatThinking: "Checking Gehad’s portfolio knowledge...",
    chatError: "The assistant is not available right now. Please try again later.",
    chatBackendMissing: "The chatbot backend is not running. Use vercel dev or python3 local_server.py from the project folder.",
    quickProjects: "Projects",
    quickSkills: "Skills",
    quickResearch: "Research",
    quickContact: "Contact",
    quickQuestionProjects: "What projects has Gehad built?",
    quickQuestionSkills: "What skills does Gehad have?",
    quickQuestionResearch: "What research interests does Gehad have?",
    quickQuestionContact: "How can I contact Gehad?",
    robotTipOne: "Tip: Projects show what Gehad can build, not just what she studies.",
    robotTipTwo: "Tip: The CV page keeps skills honest and easy for recruiters to scan.",
    robotTipThree: "Tip: Research is static on purpose, so real titles are easy to add.",
    signalOneTitle: "Application-focused",
    signalOneText: "Clear pages for projects, CV, research, achievements, and contact.",
    signalTwoTitle: "Practical builder",
    signalTwoText: "Python, C++, SQL, FastAPI, Django, Docker, Git, and data-driven work.",
    profileMiniText: "Computer Science Student",
    homeAboutCard: "About Gehad",
    homeAboutText: "My background, interests, and software engineering direction.",
    homeProjectsCard: "Project Portfolio",
    homeProjectsText: "Sign language recognition, vegetation health mapping, and financial news analysis.",
    homeResearchCard: "Research Profile",
    homeResearchText: "Research work in AI, data analysis, GIS, remote sensing, and digital transformation.",
    homeDirectionEyebrow: "Career Direction",
    homeDirectionTitle: "Focused on software engineering roles in Germany and Europe",
    homeDirectionText: "This portfolio presents my real CV, projects, achievements, and research background in a clean structure for internships, working student roles, and junior software engineering opportunities.",
    aboutEyebrow: "About",
    aboutTitle: "A software engineering student who likes turning ideas into useful interfaces.",
    aboutLead: "Gehad is interested in frontend development, Java, databases, software modeling, educational tools, and research-based systems.",
    aboutStoryTitle: "Professional Summary",
    aboutStoryText: "I am building a portfolio around practical software work: clean websites, structured Java projects, database thinking, and academic research. My goal is to grow into a software engineering role where I can learn quickly, contribute carefully, and keep improving the product experience.",
    focusWeb: "Web interfaces",
    focusJava: "Java projects",
    focusDatabase: "Databases",
    focusModeling: "Software Modeling",
    focusResearch: "Research work",
    processEyebrow: "How I Work",
    processTitle: "A calm process for building better software",
    processOneTitle: "Understand",
    processOneText: "Clarify the goal, users, constraints, and expected result.",
    processTwoTitle: "Design",
    processTwoText: "Sketch the structure, data, interface, and possible edge cases.",
    processThreeTitle: "Build",
    processThreeText: "Implement in small steps with readable code and useful comments.",
    processFourTitle: "Improve",
    processFourText: "Test, refine, and make the experience smoother and clearer.",
    projectsEyebrow: "Projects",
    projectsTitle: "Practical projects with clean structure and visual polish.",
    projectsLead: "Use the filters to scan web, Java, database, game, and research-related work.",
    filterAll: "All",
    filterWeb: "Web",
    filterJava: "Java",
    filterDatabase: "Database",
    filterGame: "Game",
    filterResearch: "Research",
    btnDemo: "Demo",
    btnDetails: "Details",
    projectPortfolioTitle: "Animated Portfolio Website",
    projectPortfolioText: "A multi-page personal portfolio with animations, theme switching, icons, and responsive layouts.",
    projectModelingTitle: "Modeling Language Project",
    projectModelingText: "A university software engineering project focused on grammar design, validation, and structured model rules.",
    projectDatabaseTitle: "SQL Database System",
    projectDatabaseText: "A relational database design project with schemas, relationships, primary keys, foreign keys, and access concepts.",
    projectGameTitle: "Learning Game Concept",
    projectGameText: "An educational game idea that teaches software engineering topics through quizzes, levels, and feedback.",
    projectResearchTitle: "Research Information Dashboard",
    projectResearchText: "A placeholder project for presenting research topics, publication metadata, and academic summaries in a readable interface.",
    achievementsEyebrow: "Achievements",
    achievementsTitle: "Milestones that show initiative, teamwork, and growth.",
    achievementsLead: "A clean timeline for academic, project, and competition-related highlights.",
    badgeWinner: "Winner",
    achievementHackathonTitle: "Hackathon Winner",
    achievementHackathonText: "Won a hackathon by contributing to a software-based idea, implementation, and presentation under time pressure.",
    achievementResearchTitle: "Academic Research Experience",
    achievementResearchText: "Participated in research-related work connected to AI, GIS, remote sensing, information systems, or software-supported solutions.",
    achievementProjectsTitle: "Software Engineering Projects",
    achievementProjectsText: "Completed practical university projects involving programming, databases, modeling, and software design.",
    researchEyebrow: "Research",
    researchTitle: "Research & Publications",
    researchLead: "Academic and research-related work focused on technology, information systems, AI, GIS, remote sensing, and software-supported solutions.",
    orcidEyebrow: "Research Identity",
    orcidTitle: "ORCID ID",
    orcidText: "Add your ORCID profile link here when your researcher profile is ready.",
    researchListEyebrow: "Static List",
    researchListTitle: "Selected research entries",
    researchEntryOneTitle: "Research Title Placeholder",
    researchEntryTwoTitle: "Research Title Placeholder",
    researchEntryThreeTitle: "Research Title Placeholder",
    researchEntryText: "Short research summary placeholder. Replace this line with your actual paper or project description.",
    researchYear: "Year",
    researchStatus: "Status",
    researchStatusPlaceholder: "Add status",
    role: "Role",
    field: "Field",
    researchContributor: "Research contributor",
    softwareSolutions: "Software-supported solutions",
    cvEyebrow: "CV",
    cvTitle: "Application-ready profile for software engineering roles.",
    cvLead: "Download a one-page CV and review the main skills grouped by engineering area.",
    education: "Education",
    educationValue: "Software Engineering",
    languages: "Languages",
    languagesValue: "English, German, Russian, Arabic",
    skillsEyebrow: "Skills",
    skillsTitle: "Skill groups without exaggeration",
    skillFrontend: "Frontend",
    skillProgramming: "Programming",
    skillDatabases: "Databases",
    skillEngineering: "Software Engineering",
    skillAcademic: "Research / Academic",
    contactEyebrow: "Contact",
    contactTitle: "Let’s connect about software engineering opportunities.",
    contactLead: "Open to internships, working student positions, and junior roles where she can learn, contribute, and grow.",
    contactLinkedin: "Professional profile",
    contactGithub: "Project repositories",
    contactOrcid: "Research profile",
    formName: "Name",
    formEmail: "Email",
    formMessage: "Message",
    formSend: "Send Message",
    footerText: "© 2026 Gehad Hamada. Built with HTML, CSS, and JavaScript.",
    errorName: "Please enter your name.",
    errorEmail: "Please enter a valid email address.",
    errorMessage: "Please write at least 10 characters.",
    successMessage: "Thank you. Your message was checked locally. Connect a backend or email service to send it."
  },
  de: {
    loading: "Portfolio wird geladen...",
    navHome: "Start",
    navAbout: "Über mich",
    navProjects: "Projekte",
    navAchievements: "Erfolge",
    navResearch: "Forschung",
    navCv: "Lebenslauf",
    navContact: "Kontakt",
    homeEyebrow: "Informatikstudentin",
    homeTitle: "Hallo, ich bin Gehad Hamada.",
    homeLead: "Ich bin Informatikstudentin mit Fokus auf Software Engineering, KI, datengetriebene Projekte und forschungsbasierte Lösungen.",
    btnExploreProjects: "Projekte ansehen",
    btnDownloadCv: "Lebenslauf herunterladen",
    btnContact: "Kontakt aufnehmen",
    statPages: "Portfolio-Seiten",
    statMainProjects: "Hauptprojekte",
    statFocus: "Schwerpunkte",
    statLanguages: "Sprachen",
    availability: "Offen für Praktika und Werkstudentenstellen",
    robotStatus: "Portfolio-Assistent online",
    robotCode: "Portfolio-Assistent",
    assistantTitle: "Frag Gehad",
    assistantIntro: "Frag nach Projekten, Skills, CV, Forschung, Erfolgen, Sprachen oder Kontakt.",
    assistantWelcome: "Hi, ich bin Gehads Portfolio-Assistent. Ich antworte nur mit Informationen aus ihrem Portfolio.",
    assistantNote: "Dieser Assistent ist auf Gehads Portfolio-Wissen begrenzt.",
    chatInputLabel: "Eine Portfolio-Frage stellen",
    chatPlaceholder: "Frag nach Gehads Projekten oder Skills...",
    chatThinking: "Ich prüfe Gehads Portfolio-Wissen...",
    chatError: "Der Assistent ist gerade nicht verfügbar. Bitte versuche es später erneut.",
    chatBackendMissing: "Das Chatbot-Backend läuft nicht. Nutze vercel dev oder python3 local_server.py im Projektordner.",
    quickProjects: "Projekte",
    quickSkills: "Skills",
    quickResearch: "Forschung",
    quickContact: "Kontakt",
    quickQuestionProjects: "Welche Projekte hat Gehad gebaut?",
    quickQuestionSkills: "Welche Skills hat Gehad?",
    quickQuestionResearch: "Welche Forschungsinteressen hat Gehad?",
    quickQuestionContact: "Wie kann ich Gehad kontaktieren?",
    robotTipOne: "Tipp: Projekte zeigen, was Gehad bauen kann, nicht nur was sie studiert.",
    robotTipTwo: "Tipp: Die CV-Seite hält Skills ehrlich und für Recruiter schnell scanbar.",
    robotTipThree: "Tipp: Forschung ist bewusst statisch, damit echte Titel leicht ergänzt werden können.",
    signalOneTitle: "Bewerbungsfokussiert",
    signalOneText: "Klare Seiten für Projekte, CV, Forschung, Erfolge und Kontakt.",
    signalTwoTitle: "Praktische Entwicklerin",
    signalTwoText: "Python, C++, SQL, FastAPI, Django, Docker, Git und datengetriebene Arbeit.",
    profileMiniText: "Informatikstudentin",
    homeAboutCard: "Über Gehad",
    homeAboutText: "Mein Hintergrund, meine Interessen und meine Software-Engineering-Richtung.",
    homeProjectsCard: "Projektportfolio",
    homeProjectsText: "Sign-Language-Erkennung, Vegetationskartierung und Finanznachrichtenanalyse.",
    homeResearchCard: "Forschungsprofil",
    homeResearchText: "Forschungsarbeit in KI, Datenanalyse, GIS, Fernerkundung und digitaler Transformation.",
    homeDirectionEyebrow: "Karriereziel",
    homeDirectionTitle: "Fokus auf Software-Engineering-Rollen in Deutschland und Europa",
    homeDirectionText: "Dieses Portfolio zeigt meinen echten Lebenslauf, meine Projekte, Erfolge und Forschung in einer klaren Struktur für Praktika, Werkstudentenstellen und Junior-Software-Engineering-Rollen.",
    aboutEyebrow: "Über mich",
    aboutTitle: "Eine Software-Engineering-Studentin, die Ideen in nützliche Interfaces verwandelt.",
    aboutLead: "Gehad interessiert sich für Frontend-Entwicklung, Java, Datenbanken, Softwaremodellierung, Lernwerkzeuge und forschungsbasierte Systeme.",
    aboutStoryTitle: "Professionelle Zusammenfassung",
    aboutStoryText: "Ich baue mein Portfolio rund um praktische Softwarearbeit auf: saubere Websites, strukturierte Java-Projekte, Datenbankdenken und akademische Forschung. Mein Ziel ist eine Software-Engineering-Rolle, in der ich schnell lernen, sorgfältig beitragen und die Produkterfahrung verbessern kann.",
    focusWeb: "Weboberflächen",
    focusJava: "Java-Projekte",
    focusDatabase: "Datenbanken",
    focusModeling: "Software-Modellierung",
    focusResearch: "Forschungsarbeit",
    processEyebrow: "Arbeitsweise",
    processTitle: "Ein ruhiger Prozess für bessere Software",
    processOneTitle: "Verstehen",
    processOneText: "Ziel, Nutzer, Rahmenbedingungen und erwartetes Ergebnis klären.",
    processTwoTitle: "Entwerfen",
    processTwoText: "Struktur, Daten, Oberfläche und mögliche Randfälle skizzieren.",
    processThreeTitle: "Umsetzen",
    processThreeText: "In kleinen Schritten mit lesbarem Code und hilfreichen Kommentaren implementieren.",
    processFourTitle: "Verbessern",
    processFourText: "Testen, verfeinern und die Erfahrung klarer und angenehmer machen.",
    projectsEyebrow: "Projekte",
    projectsTitle: "Praktische Projekte mit klarer Struktur und visueller Qualität.",
    projectsLead: "Nutze die Filter für Web-, Java-, Datenbank-, Game- und Forschungsprojekte.",
    filterAll: "Alle",
    filterWeb: "Web",
    filterJava: "Java",
    filterDatabase: "Datenbank",
    filterGame: "Spiel",
    filterResearch: "Forschung",
    btnDemo: "Demo",
    btnDetails: "Details",
    projectPortfolioTitle: "Animierte Portfolio-Website",
    projectPortfolioText: "Ein mehrseitiges persönliches Portfolio mit Animationen, Theme-Wechsel, Icons und responsiven Layouts.",
    projectModelingTitle: "Modellierungssprachen-Projekt",
    projectModelingText: "Ein universitäres Software-Engineering-Projekt mit Fokus auf Grammatikdesign, Validierung und strukturierte Modellregeln.",
    projectDatabaseTitle: "SQL-Datenbanksystem",
    projectDatabaseText: "Ein relationales Datenbankdesign-Projekt mit Schemas, Beziehungen, Primärschlüsseln, Fremdschlüsseln und Zugriffskonzepten.",
    projectGameTitle: "Lernspiel-Konzept",
    projectGameText: "Eine Lernspiel-Idee, die Software-Engineering-Themen durch Quizze, Level und Feedback vermittelt.",
    projectResearchTitle: "Forschungsinformations-Dashboard",
    projectResearchText: "Ein Platzhalterprojekt für Forschungsthemen, Publikationsdaten und akademische Zusammenfassungen in einer lesbaren Oberfläche.",
    achievementsEyebrow: "Erfolge",
    achievementsTitle: "Meilensteine, die Initiative, Teamarbeit und Wachstum zeigen.",
    achievementsLead: "Eine klare Timeline für akademische, projektbezogene und wettbewerbsbezogene Highlights.",
    badgeWinner: "Gewinnerin",
    achievementHackathonTitle: "Hackathon-Gewinnerin",
    achievementHackathonText: "Gewann einen Hackathon durch Beiträge zu einer softwarebasierten Idee, Umsetzung und Präsentation unter Zeitdruck.",
    achievementResearchTitle: "Akademische Forschungserfahrung",
    achievementResearchText: "Teilnahme an Forschungsarbeit zu KI, GIS, Fernerkundung, Informationssystemen oder softwaregestützten Lösungen.",
    achievementProjectsTitle: "Software-Engineering-Projekte",
    achievementProjectsText: "Praktische Universitätsprojekte mit Programmierung, Datenbanken, Modellierung und Softwaredesign abgeschlossen.",
    researchEyebrow: "Forschung",
    researchTitle: "Forschung & Publikationen",
    researchLead: "Akademische und forschungsbezogene Arbeit mit Fokus auf Technologie, Informationssysteme, KI, GIS, Fernerkundung und softwaregestützte Lösungen.",
    orcidEyebrow: "Forschungsidentität",
    orcidTitle: "ORCID ID",
    orcidText: "Füge hier deinen ORCID-Profillink ein, sobald dein Forschungsprofil bereit ist.",
    researchListEyebrow: "Statische Liste",
    researchListTitle: "Ausgewählte Forschungseinträge",
    researchEntryOneTitle: "Forschungstitel-Platzhalter",
    researchEntryTwoTitle: "Forschungstitel-Platzhalter",
    researchEntryThreeTitle: "Forschungstitel-Platzhalter",
    researchEntryText: "Kurzer Forschungszusammenfassungs-Platzhalter. Ersetze diese Zeile durch deine echte Arbeit oder Projektbeschreibung.",
    researchYear: "Jahr",
    researchStatus: "Status",
    researchStatusPlaceholder: "Status ergänzen",
    role: "Rolle",
    field: "Bereich",
    researchContributor: "Forschungsbeitrag",
    softwareSolutions: "Softwaregestützte Lösungen",
    cvEyebrow: "Lebenslauf",
    cvTitle: "Bewerbungsbereites Profil für Software-Engineering-Rollen.",
    cvLead: "Lade einen einseitigen Lebenslauf herunter und sieh dir die wichtigsten Skills nach Bereichen an.",
    education: "Ausbildung",
    educationValue: "Software Engineering",
    languages: "Sprachen",
    languagesValue: "Englisch, Deutsch, Russisch, Arabisch",
    skillsEyebrow: "Skills",
    skillsTitle: "Skill-Gruppen ohne Übertreibung",
    skillFrontend: "Frontend",
    skillProgramming: "Programmierung",
    skillDatabases: "Datenbanken",
    skillEngineering: "Software Engineering",
    skillAcademic: "Forschung / Studium",
    contactEyebrow: "Kontakt",
    contactTitle: "Lass uns über Software-Engineering-Möglichkeiten sprechen.",
    contactLead: "Offen für Praktika, Werkstudentenstellen und Junior-Rollen, in denen sie lernen, beitragen und wachsen kann.",
    contactLinkedin: "Berufliches Profil",
    contactGithub: "Projekt-Repositories",
    contactOrcid: "Forschungsprofil",
    formName: "Name",
    formEmail: "E-Mail",
    formMessage: "Nachricht",
    formSend: "Nachricht senden",
    footerText: "© 2026 Gehad Hamada. Erstellt mit HTML, CSS und JavaScript.",
    errorName: "Bitte gib deinen Namen ein.",
    errorEmail: "Bitte gib eine gültige E-Mail-Adresse ein.",
    errorMessage: "Bitte schreibe mindestens 10 Zeichen.",
    successMessage: "Danke. Die Nachricht wurde lokal geprüft. Verbinde ein Backend oder einen E-Mail-Service, um sie zu senden."
  },
  ru: {
    loading: "Загрузка портфолио...",
    navHome: "Главная",
    navAbout: "Обо мне",
    navProjects: "Проекты",
    navAchievements: "Достижения",
    navResearch: "Исследования",
    navCv: "CV",
    navContact: "Контакты",
    homeEyebrow: "Студентка Computer Science",
    homeTitle: "Привет, я Gehad Hamada.",
    homeLead: "Я студентка Computer Science с фокусом на software engineering, AI, data-driven проекты и исследовательские решения.",
    btnExploreProjects: "Смотреть проекты",
    btnDownloadCv: "Скачать CV",
    btnContact: "Связаться",
    statPages: "Страницы портфолио",
    statMainProjects: "Основные проекты",
    statFocus: "Направления",
    statLanguages: "Языки",
    availability: "Открыта к стажировкам и working student позициям",
    robotStatus: "Портфолио-ассистент онлайн",
    robotCode: "портфолио-ассистент",
    assistantTitle: "Спросить Gehad",
    assistantIntro: "Спросите о проектах, навыках, CV, исследованиях, достижениях, языках или контактах.",
    assistantWelcome: "Привет, я ассистент портфолио Gehad. Я отвечаю только на основе информации из ее портфолио.",
    assistantNote: "Этот ассистент ограничен знаниями из портфолио Gehad.",
    chatInputLabel: "Задать вопрос о портфолио",
    chatPlaceholder: "Спросите о проектах или навыках Gehad...",
    chatThinking: "Проверяю информацию из портфолио Gehad...",
    chatError: "Ассистент сейчас недоступен. Попробуйте позже.",
    chatBackendMissing: "Backend чатбота не запущен. Используйте vercel dev или python3 local_server.py из папки проекта.",
    quickProjects: "Проекты",
    quickSkills: "Навыки",
    quickResearch: "Исследования",
    quickContact: "Контакт",
    quickQuestionProjects: "Какие проекты создала Gehad?",
    quickQuestionSkills: "Какие навыки есть у Gehad?",
    quickQuestionResearch: "Какие исследовательские интересы есть у Gehad?",
    quickQuestionContact: "Как связаться с Gehad?",
    robotTipOne: "Совет: проекты показывают, что Gehad умеет создавать, а не только что она изучает.",
    robotTipTwo: "Совет: CV-страница делает навыки честными и удобными для быстрого просмотра.",
    robotTipThree: "Совет: раздел исследований статичный специально, чтобы легко добавить реальные названия.",
    signalOneTitle: "Фокус на откликах",
    signalOneText: "Четкие страницы для проектов, CV, исследований, достижений и контактов.",
    signalTwoTitle: "Практичный разработчик",
    signalTwoText: "Python, C++, SQL, FastAPI, Django, Docker, Git и data-driven работа.",
    profileMiniText: "Студентка Computer Science",
    homeAboutCard: "О Gehad",
    homeAboutText: "Мой background, интересы и направление в software engineering.",
    homeProjectsCard: "Портфолио проектов",
    homeProjectsText: "Sign language recognition, vegetation health mapping и financial news analysis.",
    homeResearchCard: "Исследовательский профиль",
    homeResearchText: "Исследовательская работа в AI, data analysis, GIS, remote sensing и digital transformation.",
    homeDirectionEyebrow: "Карьерное направление",
    homeDirectionTitle: "Фокус на software engineering ролях в Германии и Европе",
    homeDirectionText: "Это портфолио показывает мое реальное CV, проекты, достижения и исследовательский background в чистой структуре для internships, working student ролей и junior software engineering возможностей.",
    aboutEyebrow: "Обо мне",
    aboutTitle: "Студентка Software Engineering, которой нравится превращать идеи в полезные интерфейсы.",
    aboutLead: "Gehad интересуется frontend-разработкой, Java, базами данных, моделированием ПО, образовательными инструментами и исследовательскими системами.",
    aboutStoryTitle: "Профессиональное резюме",
    aboutStoryText: "Я строю портфолио вокруг практической разработки: чистые сайты, структурированные Java-проекты, базы данных и академические исследования. Моя цель - расти в software engineering роли, быстро учиться, аккуратно вносить вклад и улучшать пользовательский опыт.",
    focusWeb: "Веб-интерфейсы",
    focusJava: "Java-проекты",
    focusDatabase: "Базы данных",
    focusModeling: "Software Modeling",
    focusResearch: "Исследовательская работа",
    processEyebrow: "Как я работаю",
    processTitle: "Спокойный процесс для создания лучшего ПО",
    processOneTitle: "Понять",
    processOneText: "Уточнить цель, пользователей, ограничения и ожидаемый результат.",
    processTwoTitle: "Спроектировать",
    processTwoText: "Наметить структуру, данные, интерфейс и возможные крайние случаи.",
    processThreeTitle: "Создать",
    processThreeText: "Реализовать небольшими шагами с читаемым кодом и полезными комментариями.",
    processFourTitle: "Улучшить",
    processFourText: "Проверить, доработать и сделать опыт яснее и приятнее.",
    projectsEyebrow: "Проекты",
    projectsTitle: "Практические проекты с чистой структурой и визуальной аккуратностью.",
    projectsLead: "Используйте фильтры для веб-, Java-, database-, game- и research-проектов.",
    filterAll: "Все",
    filterWeb: "Веб",
    filterJava: "Java",
    filterDatabase: "Базы данных",
    filterGame: "Игра",
    filterResearch: "Исследования",
    btnDemo: "Демо",
    btnDetails: "Подробнее",
    projectPortfolioTitle: "Анимированный сайт-портфолио",
    projectPortfolioText: "Многостраничное персональное портфолио с анимациями, переключением темы, иконками и responsive layouts.",
    projectModelingTitle: "Проект языка моделирования",
    projectModelingText: "Университетский software engineering проект с фокусом на грамматику, валидацию и структурированные правила моделей.",
    projectDatabaseTitle: "SQL Database System",
    projectDatabaseText: "Проект реляционной базы данных со схемами, связями, первичными и внешними ключами, а также концепциями доступа.",
    projectGameTitle: "Концепт обучающей игры",
    projectGameText: "Идея образовательной игры, которая обучает software engineering через квизы, уровни и обратную связь.",
    projectResearchTitle: "Research Information Dashboard",
    projectResearchText: "Плейсхолдер-проект для тем исследований, метаданных публикаций и академических описаний в читаемом интерфейсе.",
    achievementsEyebrow: "Достижения",
    achievementsTitle: "Этапы, которые показывают инициативу, командную работу и рост.",
    achievementsLead: "Чистая timeline для академических, проектных и конкурсных достижений.",
    badgeWinner: "Победительница",
    achievementHackathonTitle: "Победительница хакатона",
    achievementHackathonText: "Победила на хакатоне, участвуя в программной идее, реализации и презентации в условиях ограниченного времени.",
    achievementResearchTitle: "Академический исследовательский опыт",
    achievementResearchText: "Участвовала в исследовательской работе, связанной с AI, GIS, remote sensing, информационными системами или программными решениями.",
    achievementProjectsTitle: "Проекты по Software Engineering",
    achievementProjectsText: "Завершила практические университетские проекты по программированию, базам данных, моделированию и проектированию ПО.",
    researchEyebrow: "Исследования",
    researchTitle: "Исследования и публикации",
    researchLead: "Академическая и исследовательская работа с фокусом на технологии, информационные системы, AI, GIS, remote sensing и программные решения.",
    orcidEyebrow: "Исследовательская идентичность",
    orcidTitle: "ORCID ID",
    orcidText: "Добавьте ссылку на ORCID-профиль, когда исследовательский профиль будет готов.",
    researchListEyebrow: "Статический список",
    researchListTitle: "Избранные исследовательские записи",
    researchEntryOneTitle: "Плейсхолдер названия исследования",
    researchEntryTwoTitle: "Плейсхолдер названия исследования",
    researchEntryThreeTitle: "Плейсхолдер названия исследования",
    researchEntryText: "Краткий плейсхолдер описания исследования. Замените эту строку реальной статьей или описанием проекта.",
    researchYear: "Год",
    researchStatus: "Статус",
    researchStatusPlaceholder: "Добавить статус",
    role: "Роль",
    field: "Область",
    researchContributor: "Участница исследования",
    softwareSolutions: "Программные решения",
    cvEyebrow: "CV",
    cvTitle: "Профиль для откликов на software engineering роли.",
    cvLead: "Скачайте одностраничное CV и посмотрите основные навыки по инженерным областям.",
    education: "Образование",
    educationValue: "Software Engineering",
    languages: "Языки",
    languagesValue: "Английский, немецкий, русский, арабский",
    skillsEyebrow: "Навыки",
    skillsTitle: "Группы навыков без преувеличения",
    skillFrontend: "Frontend",
    skillProgramming: "Программирование",
    skillDatabases: "Базы данных",
    skillEngineering: "Software Engineering",
    skillAcademic: "Исследования / учеба",
    contactEyebrow: "Контакты",
    contactTitle: "Свяжемся по поводу software engineering возможностей.",
    contactLead: "Открыта к стажировкам, working student позициям и junior-ролям, где она может учиться, вносить вклад и расти.",
    contactLinkedin: "Профессиональный профиль",
    contactGithub: "Репозитории проектов",
    contactOrcid: "Исследовательский профиль",
    formName: "Имя",
    formEmail: "Email",
    formMessage: "Сообщение",
    formSend: "Отправить сообщение",
    footerText: "© 2026 Gehad Hamada. Создано на HTML, CSS и JavaScript.",
    errorName: "Пожалуйста, введите имя.",
    errorEmail: "Пожалуйста, введите корректный email.",
    errorMessage: "Пожалуйста, напишите минимум 10 символов.",
    successMessage: "Спасибо. Сообщение проверено локально. Подключите backend или email-сервис, чтобы отправлять его."
  }
};

// ---------- DOM Helpers ----------
const body = document.body;
const header = document.getElementById("siteHeader");
const navToggle = document.getElementById("navToggle");
const navPanel = document.getElementById("navPanel");
const themeToggle = document.getElementById("themeToggle");
const languageButtons = document.querySelectorAll(".lang-btn");
const progressBar = document.getElementById("scrollProgress");
const backToTop = document.getElementById("backToTop");
const preloader = document.getElementById("preloader");
const contactForm = document.getElementById("contactForm");
const formSuccess = document.getElementById("formSuccess");
const robotConsole = document.getElementById("robotConsole");
const robotButton = document.getElementById("robotButton");
const chatForm = document.getElementById("chatForm");
const chatInput = document.getElementById("chatInput");
const chatMessages = document.getElementById("chatMessages");
const quickPrompts = document.querySelectorAll(".quick-prompt");

let currentTheme = localStorage.getItem("gehadPortfolioTheme") || "dark";
let currentLanguage = localStorage.getItem("gehadPortfolioLanguage") || "en";

// ---------- Icons ----------
function renderIcons(root = document) {
  root.querySelectorAll("[data-icon]").forEach((element) => {
    const iconName = element.dataset.icon;
    const iconBody = icons[iconName];

    if (!iconBody) return;

    element.innerHTML = `<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">${iconBody}</svg>`;
  });
}

// ---------- Theme ----------
function applyTheme(theme) {
  currentTheme = theme;
  body.dataset.theme = theme;
  localStorage.setItem("gehadPortfolioTheme", theme);

  if (themeToggle) {
    const icon = themeToggle.querySelector("[data-icon]");

    if (icon) {
      icon.dataset.icon = theme === "dark" ? "sun" : "moon";
      renderIcons(themeToggle);
    }
  }
}

function toggleTheme() {
  applyTheme(currentTheme === "dark" ? "light" : "dark");
}

// ---------- Language ----------
function translatePage(language) {
  const dictionary = translations[language] || translations.en;

  currentLanguage = language;
  document.documentElement.lang = language;
  localStorage.setItem("gehadPortfolioLanguage", language);

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.dataset.i18n;

    if (dictionary[key]) {
      element.textContent = dictionary[key];
    }
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
    const key = element.dataset.i18nPlaceholder;

    if (dictionary[key]) {
      element.setAttribute("placeholder", dictionary[key]);
    }
  });

  languageButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.lang === language);
  });
}

// ---------- Navigation ----------
function setActiveNavigation() {
  const currentPage = body.dataset.page;

  document.querySelectorAll("[data-nav]").forEach((link) => {
    link.classList.toggle("is-active", link.dataset.nav === currentPage);
  });
}

function closeMenu() {
  if (!navToggle || !navPanel) return;

  navToggle.classList.remove("is-open");
  navPanel.classList.remove("is-open");
  navToggle.setAttribute("aria-expanded", "false");
  body.classList.remove("menu-open");
}

function toggleMenu() {
  const isOpen = navPanel.classList.toggle("is-open");

  navToggle.classList.toggle("is-open", isOpen);
  navToggle.setAttribute("aria-expanded", String(isOpen));
  body.classList.toggle("menu-open", isOpen);
}

// ---------- Scroll Effects ----------
function updateScrollUi() {
  const scrollTop = window.scrollY;
  const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollableHeight > 0 ? (scrollTop / scrollableHeight) * 100 : 0;

  if (progressBar) progressBar.style.width = `${progress}%`;
  if (header) header.classList.toggle("is-scrolled", scrollTop > 12);
  if (backToTop) backToTop.classList.toggle("is-visible", scrollTop > 520);
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// ---------- Reveal Animations ----------
function setupRevealAnimations() {
  const revealElements = document.querySelectorAll(".reveal");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.14 }
  );

  revealElements.forEach((element) => observer.observe(element));

  requestAnimationFrame(() => {
    document.querySelectorAll(".reveal-on-load").forEach((element, index) => {
      element.style.transitionDelay = `${index * 90}ms`;
      element.classList.add("is-visible");
    });
  });
}

// ---------- Animated Counters ----------
function animateCounters() {
  const counters = document.querySelectorAll("[data-count]");
  if (!counters.length) return;

  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const counter = entry.target;
        const target = Number(counter.dataset.count);
        const duration = 900;
        const startTime = performance.now();

        function tick(now) {
          const progress = Math.min((now - startTime) / duration, 1);
          counter.textContent = Math.round(progress * target);

          if (progress < 1) requestAnimationFrame(tick);
        }

        requestAnimationFrame(tick);
        counterObserver.unobserve(counter);
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach((counter) => counterObserver.observe(counter));
}

// ---------- Project Filters ----------
function setupProjectFilters() {
  const filterButtons = document.querySelectorAll("[data-filter]");
  const projectCards = document.querySelectorAll("[data-project-card]");

  if (!filterButtons.length || !projectCards.length) return;

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter;

      filterButtons.forEach((item) => item.classList.toggle("is-active", item === button));

      projectCards.forEach((card) => {
        const categories = card.dataset.category.split(" ");
        const shouldShow = filter === "all" || categories.includes(filter);

        card.classList.toggle("is-hidden", !shouldShow);
      });
    });
  });
}

// ---------- Contact Form ----------
function setFieldError(name, message) {
  const errorElement = document.querySelector(`[data-error-for="${name}"]`);

  if (errorElement) {
    errorElement.textContent = message;
  }
}

function validateContactForm(event) {
  event.preventDefault();

  const dictionary = translations[currentLanguage] || translations.en;
  const formData = new FormData(contactForm);
  const name = String(formData.get("name")).trim();
  const email = String(formData.get("email")).trim();
  const message = String(formData.get("message")).trim();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  let isValid = true;

  setFieldError("name", "");
  setFieldError("email", "");
  setFieldError("message", "");
  formSuccess.textContent = "";

  if (!name) {
    setFieldError("name", dictionary.errorName);
    isValid = false;
  }

  if (!emailPattern.test(email)) {
    setFieldError("email", dictionary.errorEmail);
    isValid = false;
  }

  if (message.length < 10) {
    setFieldError("message", dictionary.errorMessage);
    isValid = false;
  }

  if (isValid) {
    contactForm.reset();
    formSuccess.textContent = dictionary.successMessage;
  }
}

// ---------- Button Press Animation ----------
function setupPressEffects() {
  document.querySelectorAll(".pressable").forEach((element) => {
    element.addEventListener("click", () => {
      element.classList.remove("is-pressed");
      void element.offsetWidth;
      element.classList.add("is-pressed");

      window.setTimeout(() => element.classList.remove("is-pressed"), 180);
    });
  });
}

// ---------- Portfolio Chat Assistant ----------
function addChatMessage(message, sender = "bot", extraClass = "") {
  if (!chatMessages) return null;

  const messageElement = document.createElement("div");
  messageElement.className = `chat-message ${sender === "user" ? "user-message" : "bot-message"} ${extraClass}`.trim();
  messageElement.textContent = message;
  chatMessages.appendChild(messageElement);
  chatMessages.scrollTop = chatMessages.scrollHeight;

  return messageElement;
}

function setChatLoading(isLoading) {
  if (chatInput) chatInput.disabled = isLoading;

  const submitButton = chatForm?.querySelector("button[type='submit']");
  if (submitButton) submitButton.disabled = isLoading;

  quickPrompts.forEach((button) => {
    button.disabled = isLoading;
  });

  if (robotConsole) {
    robotConsole.classList.toggle("is-active", isLoading);
  }
}

async function sendPortfolioQuestion(question) {
  const dictionary = translations[currentLanguage] || translations.en;
  const cleanQuestion = question.trim();

  if (!cleanQuestion) return;

  addChatMessage(cleanQuestion, "user");
  const typingMessage = addChatMessage(dictionary.chatThinking, "bot", "typing-message");

  setChatLoading(true);

  try {
    const response = await fetch("/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ message: cleanQuestion, language: currentLanguage })
    });

    const contentType = response.headers.get("Content-Type") || "";

    if (!contentType.includes("application/json")) {
      typingMessage.textContent = dictionary.chatBackendMissing;
      return;
    }

    const data = await response.json();
    typingMessage.textContent = data.reply || dictionary.chatError;
  } catch (error) {
    typingMessage.textContent = dictionary.chatError;
  } finally {
    setChatLoading(false);
  }
}

function setupPortfolioChat() {
  if (!chatForm || !chatInput || !chatMessages) return;

  chatForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const question = chatInput.value;
    chatInput.value = "";
    sendPortfolioQuestion(question);
  });

  quickPrompts.forEach((button) => {
    button.addEventListener("click", () => {
      const dictionary = translations[currentLanguage] || translations.en;
      const questionKey = button.dataset.questionKey;
      const question = dictionary[questionKey] || button.textContent;

      sendPortfolioQuestion(question);
    });
  });

  if (robotButton) {
    robotButton.addEventListener("click", () => {
      chatInput.focus();
    });
  }
}

// ---------- Hero Canvas Animation ----------
// This adds a subtle particle field to the home page only.
function setupHeroCanvas() {
  const canvas = document.getElementById("heroCanvas");
  if (!canvas) return;

  const context = canvas.getContext("2d");
  const particles = [];
  const particleCount = 58;

  function resizeCanvas() {
    canvas.width = canvas.offsetWidth * window.devicePixelRatio;
    canvas.height = canvas.offsetHeight * window.devicePixelRatio;
    context.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0);
  }

  function createParticles() {
    particles.length = 0;

    for (let index = 0; index < particleCount; index += 1) {
      particles.push({
        x: Math.random() * canvas.offsetWidth,
        y: Math.random() * canvas.offsetHeight,
        radius: Math.random() * 2.4 + 0.8,
        speedX: (Math.random() - 0.5) * 0.45,
        speedY: (Math.random() - 0.5) * 0.45
      });
    }
  }

  function drawParticles() {
    context.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

    particles.forEach((particle, index) => {
      particle.x += particle.speedX;
      particle.y += particle.speedY;

      if (particle.x < 0 || particle.x > canvas.offsetWidth) particle.speedX *= -1;
      if (particle.y < 0 || particle.y > canvas.offsetHeight) particle.speedY *= -1;

      context.beginPath();
      context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      context.fillStyle = "rgba(199, 167, 255, 0.38)";
      context.fill();

      for (let nextIndex = index + 1; nextIndex < particles.length; nextIndex += 1) {
        const next = particles[nextIndex];
        const distance = Math.hypot(particle.x - next.x, particle.y - next.y);

        if (distance < 120) {
          context.beginPath();
          context.moveTo(particle.x, particle.y);
          context.lineTo(next.x, next.y);
          context.strokeStyle = `rgba(216, 111, 159, ${0.13 - distance / 1000})`;
          context.stroke();
        }
      }
    });

    requestAnimationFrame(drawParticles);
  }

  resizeCanvas();
  createParticles();
  drawParticles();

  window.addEventListener("resize", () => {
    resizeCanvas();
    createParticles();
  });
}

// ---------- Event Listeners ----------
if (themeToggle) themeToggle.addEventListener("click", toggleTheme);
if (navToggle) navToggle.addEventListener("click", toggleMenu);
if (backToTop) backToTop.addEventListener("click", scrollToTop);
if (contactForm) contactForm.addEventListener("submit", validateContactForm);

languageButtons.forEach((button) => {
  button.addEventListener("click", () => translatePage(button.dataset.lang));
});

document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", closeMenu);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeMenu();
});

window.addEventListener("scroll", updateScrollUi);

window.addEventListener("load", () => {
  if (preloader) preloader.classList.add("is-hidden");
});

// ---------- Initial Setup ----------
renderIcons();
applyTheme(currentTheme);
translatePage(currentLanguage);
setActiveNavigation();
setupRevealAnimations();
animateCounters();
setupProjectFilters();
setupPressEffects();
setupPortfolioChat();
setupHeroCanvas();
updateScrollUi();



/* Extra translations for the updated real portfolio pages.
   They live in this same script so every page has one reliable language system.
*/
const portfolioExtraTranslations = {
  en: {
    aboutTitleReal: "A Computer Science student focused on software engineering, AI, and data-driven projects.",
    aboutLeadReal: "Gehad is interested in machine learning, data science, backend development, databases, software engineering, and research-based systems.",
    aboutStoryTextReal: "I am a Computer Science student studying in Germany through a dual-degree path with Hof University of Applied Sciences and International Information Technologies University. I work on practical software projects involving AI, data analysis, backend development, web interfaces, and deployment. I am looking for internships and working student roles where I can learn fast, contribute seriously, and grow as a developer.",
    focusMl: "Machine Learning",
    focusDataScience: "Data Science",
    focusBackend: "Backend Development",
    focusResearchWork: "Research Work",
    processTitleReal: "How I approach technical work",
    processOneTextReal: "Understand the task, the user need, and the expected result before building.",
    processTwoTextReal: "Plan the data flow, model, backend, interface, and possible edge cases.",
    processThreeTextReal: "Build step by step using clean structure and practical tools.",
    processFourTextReal: "Test, fix problems, improve quality, and prepare the result for real use.",

    projectsTitleReal: "Real projects I built or contributed to during my software engineering studies.",
    projectsLeadReal: "A selection of my practical work in machine learning, web development, data visualization, APIs, and deployment.",
    filterMlAi: "ML / AI",
    filterData: "Data",
    projectSignTitle: "Sign Language Recognition System",
    projectSignText: "A real-time gesture recognition project that processes hand landmarks using MediaPipe, maps features for machine learning input, and predicts signs through a Random Forest model with an OpenCV-based pipeline.",
    projectDroneTitle: "Drone-Based Vegetation Health Mapping System",
    projectDroneText: "A team project for visualizing drone flight data and vegetation health layers. I worked on interactive map visualizations, geospatial heatmaps, flight trajectory exploration, and GPS metadata integration.",
    projectFinanceTitle: "Financial News Analyzer",
    projectFinanceText: "An AI-powered financial sentiment analysis application using FinBERT. The project includes a FastAPI backend, vanilla JavaScript frontend, real-time predictions, model comparison, latency tracking, Docker containerization, and deployment on Hugging Face Spaces.",

    achievementsTitleReal: "Milestones from competitions, teamwork, and academic events.",
    achievementsLeadReal: "A timeline of my hackathon experience, ICPC participation, and academic conference involvement.",
    achievementHackathonBadgeReal: "Hackathon",
    achievementHackathonTitleReal: "Alrathon Hackathon — 2nd Place",
    achievementHackathonTextReal: "Won 2nd place in Alrathon in Almaty with a team project focused on an AI/ML solution to support people with disabilities. The project combined teamwork, idea development, implementation, and presentation under time pressure.",
    achievementIcpcBadge: "Programming Contest",
    achievementIcpcTitle: "ICPC Programming Contest Participation",
    achievementIcpcText: "Participated in ICPC preparation and the 1/4 finals round hosted at the university. This experience strengthened my problem-solving, algorithmic thinking, teamwork, and ability to work under competition pressure.",
    achievementDtesiBadge: "Conference",
    achievementDtesiTitle: "DTESI International Conference Participation",
    achievementDtesiText: "Participated in the 9th International Conference DTESI, connected to digital technologies, education, science, and industry.",

    researchTitleReal: "Research & Publications",
    researchLeadReal: "Research-related work focused on machine learning, artificial intelligence, GIS, remote sensing, digital transformation, business analytics, and project management.",
    scopusTitle: "Scopus ID",
    scopusText: "Researcher identification number connected to my academic publication profile.",
    researchSelectedWork: "Selected Work",
    researchEntriesTitle: "Research entries",
    researchOneTitle: "Machine Learning in Logistics and Supply Chain Management",
    researchOneText: "Research on machine learning in logistics and supply chain management at the DTESI Conference.",
    researchTwoTitle: "GIS and Remote Sensing for Water Resource Management",
    researchTwoText: "Research leveraging Geographic Information Systems and Remote Sensing for enhanced water resource management in Kazakhstan.",
    researchThreeTitle: "AI Applications and Digital Transformation",
    researchThreeText: "Research on artificial intelligence applications as a driving force behind digital transformation at the YDF Conference.",
    researchFourTitle: "Big Data Analytics and Business Sustainability",
    researchFourText: "Research on the role of big data analytics in reinforcing the business sustainability of enterprises.",
    researchFiveTitle: "Critical Success Factors in Agile Project Management",
    researchFiveText: "Holistic analysis of the critical success factors in agile project management.",
    researchSixTitle: "Machine Learning Models for Unstructured Decisions and Data",
    researchSixText: "Research on leveraging machine learning models to support the manipulation of unstructured decisions and unstructured data in digital business firms at the DTESI Conference.",
    fieldMlSupply: "Machine Learning / Supply Chain",
    fieldGisRemote: "GIS / Remote Sensing",
    fieldAiDigital: "AI / Digital Transformation",
    fieldBigDataBusiness: "Big Data / Business Analytics",
    fieldAgilePm: "Project Management / Agile",
    fieldMlBusiness: "Machine Learning / Digital Business",

    cvTitleReal: "Computer Science student focused on software engineering, AI, and data-driven projects.",
    cvLeadReal: "Download my CV in English or German and review my real skills, education, experience, projects, and achievements.",
    downloadEnglishCv: "Download English CV",
    downloadGermanCv: "Download German CV",
    educationValueReal: "B.Sc. Computer Science, Hof University of Applied Sciences; B.Sc. Computer Systems and Software Engineering, IITU",
    languagesValueReal: "English — C1, Russian — B1, German — B1.1, Arabic — C2",
    skillsTitleReal: "Technical skills from my CV",
    skillProgrammingLanguages: "Programming Languages",
    skillWebBackend: "Web & Backend",
    skillDataAi: "Data & AI",
    skillToolsPlatforms: "Tools & Platforms",
    skillSoftwareEngineeringReal: "Software Engineering",
    skillProgrammingLanguagesText: "Python, C++, SQL",
    skillWebBackendText: "FastAPI, Django, HTML, CSS, JavaScript",
    skillDataAiText: "Machine Learning Workflows, Data Analysis, FinBERT, Jupyter",
    skillToolsPlatformsText: "Git, GitHub, Docker, Linux, Hugging Face",
    skillSoftwareEngineeringText: "Data Structures, Algorithms, Backend Development, Software Development",
    experienceEyebrow: "Experience",
    experienceTitle: "Work experience",
    headstarterTitle: "Headstarter AI Fellowship",
    headstarterMeta: "Fellow, Remote · July 2023 – October 2023",
    headstarterText: "Participated in building and planning AI-driven projects and gained hands-on experience with machine learning workflows.",
    ituTitle: "ITU Innovation Center",
    ituMeta: "Intern · May 2024 – July 2024",
    ituText: "Assisted in software development and IT-related tasks, including backend development and data handling."
  },
  de: {
    aboutTitleReal: "Informatikstudentin mit Fokus auf Software Engineering, KI und datengetriebene Projekte.",
    aboutLeadReal: "Gehad interessiert sich für Machine Learning, Data Science, Backend-Entwicklung, Datenbanken, Software Engineering und forschungsbasierte Systeme.",
    aboutStoryTextReal: "Ich studiere Informatik in Deutschland im Rahmen eines Doppelabschlusses an der Hochschule Hof und der International Information Technologies University. Ich arbeite an praktischen Softwareprojekten mit KI, Datenanalyse, Backend-Entwicklung, Weboberflächen und Deployment. Ich suche Praktika und Werkstudentenstellen, in denen ich schnell lernen, ernsthaft beitragen und als Entwicklerin wachsen kann.",
    focusMl: "Machine Learning",
    focusDataScience: "Data Science",
    focusBackend: "Backend-Entwicklung",
    focusResearchWork: "Forschungsarbeit",
    processTitleReal: "Wie ich technische Arbeit angehe",
    processOneTextReal: "Die Aufgabe, den Nutzerbedarf und das erwartete Ergebnis verstehen, bevor ich baue.",
    processTwoTextReal: "Datenfluss, Modell, Backend, Interface und mögliche Sonderfälle planen.",
    processThreeTextReal: "Schrittweise mit klarer Struktur und praktischen Tools umsetzen.",
    processFourTextReal: "Testen, Probleme beheben, Qualität verbessern und das Ergebnis für echte Nutzung vorbereiten.",

    projectsTitleReal: "Echte Projekte, die ich während meines Software-Engineering-Studiums gebaut oder unterstützt habe.",
    projectsLeadReal: "Eine Auswahl meiner praktischen Arbeit in Machine Learning, Webentwicklung, Datenvisualisierung, APIs und Deployment.",
    filterMlAi: "ML / KI",
    filterData: "Daten",
    projectSignTitle: "Sign Language Recognition System",
    projectSignText: "Ein Echtzeit-Projekt zur Gestenerkennung, das Hand-Landmarks mit MediaPipe verarbeitet, Features für Machine-Learning-Modelle vorbereitet und Zeichen mit einem Random-Forest-Modell sowie einer OpenCV-Pipeline erkennt.",
    projectDroneTitle: "Drone-Based Vegetation Health Mapping System",
    projectDroneText: "Ein Teamprojekt zur Visualisierung von Drohnenflugdaten und Vegetationsgesundheit. Ich arbeitete an interaktiven Kartenvisualisierungen, geospatialen Heatmaps, Flugrouten-Erkundung und GPS-Metadatenintegration.",
    projectFinanceTitle: "Financial News Analyzer",
    projectFinanceText: "Eine KI-gestützte Anwendung zur Finanz-Sentimentanalyse mit FinBERT. Das Projekt umfasst ein FastAPI-Backend, ein Vanilla-JavaScript-Frontend, Echtzeitvorhersagen, Modellvergleich, Latenztracking, Docker-Containerisierung und Deployment auf Hugging Face Spaces.",

    achievementsTitleReal: "Meilensteine aus Wettbewerben, Teamarbeit und akademischen Veranstaltungen.",
    achievementsLeadReal: "Eine Timeline meiner Hackathon-Erfahrung, ICPC-Teilnahme und akademischen Konferenzaktivitäten.",
    achievementHackathonBadgeReal: "Hackathon",
    achievementHackathonTitleReal: "Alrathon Hackathon — 2. Platz",
    achievementHackathonTextReal: "Ich habe mit meinem Team den 2. Platz beim Alrathon in Almaty gewonnen. Das Projekt konzentrierte sich auf eine KI/ML-Lösung zur Unterstützung von Menschen mit Behinderungen und verband Teamarbeit, Ideenentwicklung, Umsetzung und Präsentation unter Zeitdruck.",
    achievementIcpcBadge: "Programmierwettbewerb",
    achievementIcpcTitle: "Teilnahme am ICPC Programming Contest",
    achievementIcpcText: "Teilnahme an der ICPC-Vorbereitung und am Viertelfinale an der Universität. Diese Erfahrung stärkte Problemlösung, algorithmisches Denken, Teamarbeit und Arbeiten unter Wettbewerbsdruck.",
    achievementDtesiBadge: "Konferenz",
    achievementDtesiTitle: "Teilnahme an der DTESI International Conference",
    achievementDtesiText: "Teilnahme an der 9. International Conference DTESI mit Bezug zu digitalen Technologien, Bildung, Wissenschaft und Industrie.",

    researchTitleReal: "Forschung & Publikationen",
    researchLeadReal: "Forschungsbezogene Arbeit mit Fokus auf Machine Learning, KI, GIS, Fernerkundung, digitale Transformation, Business Analytics und Projektmanagement.",
    scopusTitle: "Scopus ID",
    scopusText: "Forscher-Identifikationsnummer, verbunden mit meinem akademischen Publikationsprofil.",
    researchSelectedWork: "Ausgewählte Arbeiten",
    researchEntriesTitle: "Forschungseinträge",
    researchOneTitle: "Machine Learning in Logistik und Supply Chain Management",
    researchOneText: "Forschung zu Machine Learning in Logistik und Supply Chain Management auf der DTESI-Konferenz.",
    researchTwoTitle: "GIS und Fernerkundung für Wasserressourcenmanagement",
    researchTwoText: "Forschung zur Nutzung von Geographic Information Systems und Fernerkundung für verbessertes Wasserressourcenmanagement in Kasachstan.",
    researchThreeTitle: "KI-Anwendungen und digitale Transformation",
    researchThreeText: "Forschung zu KI-Anwendungen als treibende Kraft hinter digitaler Transformation auf der YDF-Konferenz.",
    researchFourTitle: "Big Data Analytics und Unternehmensnachhaltigkeit",
    researchFourText: "Forschung zur Rolle von Big Data Analytics bei der Stärkung der Nachhaltigkeit von Unternehmen.",
    researchFiveTitle: "Kritische Erfolgsfaktoren im agilen Projektmanagement",
    researchFiveText: "Ganzheitliche Analyse kritischer Erfolgsfaktoren im agilen Projektmanagement.",
    researchSixTitle: "Machine-Learning-Modelle für unstrukturierte Entscheidungen und Daten",
    researchSixText: "Forschung zur Nutzung von Machine-Learning-Modellen zur Unterstützung unstrukturierter Entscheidungen und unstrukturierter Daten in digitalen Unternehmen auf der DTESI-Konferenz.",
    fieldMlSupply: "Machine Learning / Supply Chain",
    fieldGisRemote: "GIS / Fernerkundung",
    fieldAiDigital: "KI / Digitale Transformation",
    fieldBigDataBusiness: "Big Data / Business Analytics",
    fieldAgilePm: "Projektmanagement / Agile",
    fieldMlBusiness: "Machine Learning / Digital Business",

    cvTitleReal: "Informatikstudentin mit Fokus auf Software Engineering, KI und datengetriebene Projekte.",
    cvLeadReal: "Laden Sie meinen Lebenslauf auf Englisch oder Deutsch herunter und sehen Sie meine echten Skills, Ausbildung, Erfahrung, Projekte und Erfolge.",
    downloadEnglishCv: "Englischen Lebenslauf herunterladen",
    downloadGermanCv: "Deutschen Lebenslauf herunterladen",
    educationValueReal: "B.Sc. Informatik, Hochschule Hof; B.Sc. Computer Systems and Software Engineering, IITU",
    languagesValueReal: "Englisch — C1, Russisch — B1, Deutsch — B1.1, Arabisch — C2",
    skillsTitleReal: "Technische Kenntnisse aus meinem Lebenslauf",
    skillProgrammingLanguages: "Programmiersprachen",
    skillWebBackend: "Web & Backend",
    skillDataAi: "Daten & KI",
    skillToolsPlatforms: "Tools & Plattformen",
    skillSoftwareEngineeringReal: "Software Engineering",
    skillProgrammingLanguagesText: "Python, C++, SQL",
    skillWebBackendText: "FastAPI, Django, HTML, CSS, JavaScript",
    skillDataAiText: "Machine-Learning-Workflows, Datenanalyse, FinBERT, Jupyter",
    skillToolsPlatformsText: "Git, GitHub, Docker, Linux, Hugging Face",
    skillSoftwareEngineeringText: "Datenstrukturen, Algorithmen, Backend-Entwicklung, Softwareentwicklung",
    experienceEyebrow: "Erfahrung",
    experienceTitle: "Berufserfahrung",
    headstarterTitle: "Headstarter AI Fellowship",
    headstarterMeta: "Fellow, Remote · Juli 2023 – Oktober 2023",
    headstarterText: "Teilnahme an der Entwicklung und Planung KI-basierter Projekte sowie praktische Erfahrung mit Machine-Learning-Workflows.",
    ituTitle: "ITU Innovation Center",
    ituMeta: "Intern · Mai 2024 – Juli 2024",
    ituText: "Unterstützung bei Softwareentwicklung und IT-bezogenen Aufgaben, inklusive Backend-Entwicklung und Datenverarbeitung."
  },
  ru: {
    aboutTitleReal: "Студентка Computer Science с фокусом на software engineering, AI и data-driven проекты.",
    aboutLeadReal: "Gehad интересуется machine learning, data science, backend-разработкой, базами данных, software engineering и исследовательскими системами.",
    aboutStoryTextReal: "Я изучаю Computer Science в Германии по программе двойного диплома в Hof University of Applied Sciences и International Information Technologies University. Я работаю над практическими software-проектами, связанными с AI, data analysis, backend development, web interfaces и deployment. Я ищу internships и working student позиции, где смогу быстро учиться, серьезно вносить вклад и расти как developer.",
    focusMl: "Machine Learning",
    focusDataScience: "Data Science",
    focusBackend: "Backend Development",
    focusResearchWork: "Исследовательская работа",
    processTitleReal: "Как я подхожу к технической работе",
    processOneTextReal: "Понять задачу, потребность пользователя и ожидаемый результат перед разработкой.",
    processTwoTextReal: "Спланировать data flow, модель, backend, interface и возможные edge cases.",
    processThreeTextReal: "Разрабатывать шаг за шагом с чистой структурой и практичными инструментами.",
    processFourTextReal: "Тестировать, исправлять проблемы, улучшать качество и готовить результат к реальному использованию.",

    projectsTitleReal: "Реальные проекты, которые я создала или в которых участвовала во время учебы по software engineering.",
    projectsLeadReal: "Подборка моей практической работы в machine learning, web development, data visualization, APIs и deployment.",
    filterMlAi: "ML / AI",
    filterData: "Data",
    projectSignTitle: "Sign Language Recognition System",
    projectSignText: "Проект распознавания жестов в реальном времени, который обрабатывает hand landmarks через MediaPipe, подготавливает features для ML-модели и предсказывает жесты через Random Forest и OpenCV pipeline.",
    projectDroneTitle: "Drone-Based Vegetation Health Mapping System",
    projectDroneText: "Командный проект для визуализации drone flight data и vegetation health layers. Я работала над интерактивными картами, geospatial heatmaps, flight trajectory exploration и интеграцией GPS metadata.",
    projectFinanceTitle: "Financial News Analyzer",
    projectFinanceText: "AI-powered приложение для анализа финансового sentiment с использованием FinBERT. Проект включает FastAPI backend, vanilla JavaScript frontend, real-time predictions, model comparison, latency tracking, Docker containerization и deployment на Hugging Face Spaces.",

    achievementsTitleReal: "Достижения в конкурсах, командной работе и академических мероприятиях.",
    achievementsLeadReal: "Timeline моего опыта в хакатоне, участия в ICPC и академических конференциях.",
    achievementHackathonBadgeReal: "Хакатон",
    achievementHackathonTitleReal: "Alrathon Hackathon — 2 место",
    achievementHackathonTextReal: "Заняла 2 место на Alrathon в Алматы с командным проектом, focused on AI/ML solution для поддержки людей с ограниченными возможностями. Проект включал teamwork, idea development, implementation и presentation under time pressure.",
    achievementIcpcBadge: "Соревнование по программированию",
    achievementIcpcTitle: "Участие в ICPC Programming Contest",
    achievementIcpcText: "Участвовала в подготовке к ICPC и в 1/4 финала, проходившем в университете. Этот опыт усилил problem-solving, algorithmic thinking, teamwork и работу под давлением.",
    achievementDtesiBadge: "Конференция",
    achievementDtesiTitle: "Участие в DTESI International Conference",
    achievementDtesiText: "Участвовала в 9-й International Conference DTESI, связанной с digital technologies, education, science и industry.",

    researchTitleReal: "Исследования и публикации",
    researchLeadReal: "Исследовательская работа в области machine learning, AI, GIS, remote sensing, digital transformation, business analytics и project management.",
    scopusTitle: "Scopus ID",
    scopusText: "Идентификационный номер исследователя, связанный с моим академическим профилем публикаций.",
    researchSelectedWork: "Избранные работы",
    researchEntriesTitle: "Исследовательские работы",
    researchOneTitle: "Machine Learning in Logistics and Supply Chain Management",
    researchOneText: "Исследование machine learning in logistics and supply chain management на DTESI Conference.",
    researchTwoTitle: "GIS and Remote Sensing for Water Resource Management",
    researchTwoText: "Исследование использования Geographic Information Systems и Remote Sensing для улучшенного water resource management in Kazakhstan.",
    researchThreeTitle: "AI Applications and Digital Transformation",
    researchThreeText: "Исследование AI applications как driving force behind digital transformation на YDF Conference.",
    researchFourTitle: "Big Data Analytics and Business Sustainability",
    researchFourText: "Исследование роли big data analytics in reinforcing business sustainability of enterprises.",
    researchFiveTitle: "Critical Success Factors in Agile Project Management",
    researchFiveText: "Holistic analysis of the critical success factors in agile project management.",
    researchSixTitle: "Machine Learning Models for Unstructured Decisions and Data",
    researchSixText: "Исследование использования machine learning models для поддержки unstructured decisions и unstructured data in digital business firms на DTESI Conference.",
    fieldMlSupply: "Machine Learning / Supply Chain",
    fieldGisRemote: "GIS / Remote Sensing",
    fieldAiDigital: "AI / Digital Transformation",
    fieldBigDataBusiness: "Big Data / Business Analytics",
    fieldAgilePm: "Project Management / Agile",
    fieldMlBusiness: "Machine Learning / Digital Business",

    cvTitleReal: "Студентка Computer Science с фокусом на software engineering, AI и data-driven проекты.",
    cvLeadReal: "Скачайте мое CV на английском или немецком и посмотрите реальные skills, education, experience, projects и achievements.",
    downloadEnglishCv: "Скачать CV на английском",
    downloadGermanCv: "Скачать CV на немецком",
    educationValueReal: "B.Sc. Computer Science, Hof University of Applied Sciences; B.Sc. Computer Systems and Software Engineering, IITU",
    languagesValueReal: "English — C1, Russian — B1, German — B1.1, Arabic — C2",
    skillsTitleReal: "Технические skills из моего CV",
    skillProgrammingLanguages: "Programming Languages",
    skillWebBackend: "Web & Backend",
    skillDataAi: "Data & AI",
    skillToolsPlatforms: "Tools & Platforms",
    skillSoftwareEngineeringReal: "Software Engineering",
    skillProgrammingLanguagesText: "Python, C++, SQL",
    skillWebBackendText: "FastAPI, Django, HTML, CSS, JavaScript",
    skillDataAiText: "Machine Learning Workflows, Data Analysis, FinBERT, Jupyter",
    skillToolsPlatformsText: "Git, GitHub, Docker, Linux, Hugging Face",
    skillSoftwareEngineeringText: "Data Structures, Algorithms, Backend Development, Software Development",
    experienceEyebrow: "Опыт",
    experienceTitle: "Work experience",
    headstarterTitle: "Headstarter AI Fellowship",
    headstarterMeta: "Fellow, Remote · July 2023 – October 2023",
    headstarterText: "Participated in building and planning AI-driven projects and gained hands-on experience with machine learning workflows.",
    ituTitle: "ITU Innovation Center",
    ituMeta: "Intern · May 2024 – July 2024",
    ituText: "Assisted in software development and IT-related tasks, including backend development and data handling."
  }
};

function applyExtraPortfolioTranslations(language) {
  const dictionary = portfolioExtraTranslations[language] || portfolioExtraTranslations.en;

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.dataset.i18n;
    if (dictionary[key]) element.textContent = dictionary[key];
  });
}

function getStoredPortfolioLanguage() {
  return localStorage.getItem("gehadPortfolioLanguage") || "en";
}

window.addEventListener("DOMContentLoaded", () => {
  applyExtraPortfolioTranslations(getStoredPortfolioLanguage());

  document.querySelectorAll(".lang-btn").forEach((button) => {
    button.addEventListener("click", () => {
      window.setTimeout(() => applyExtraPortfolioTranslations(button.dataset.lang), 0);
    });
  });
});

window.addEventListener("load", () => {
  applyExtraPortfolioTranslations(getStoredPortfolioLanguage());
});

# Shuaib Iqbal — AI/ML Engineer Portfolio

A fully JSON-driven, single-page portfolio with a RAG-powered AI assistant, Hire Me modal, floating navigation sidebar, and WhatsApp integration.

**Frontend:** Vanilla JS (ES Modules) + JSON data files — hosted on GitHub Pages  
**Backend:** FastAPI + LangChain + FAISS + GPT-4o-mini — hosted on Hugging Face Spaces

🌐 **Live:** https://shuaibiqbal.github.io/portfolio  
🤖 **AI Backend:** https://shuaibiqbal-portfolio-rag-api.hf.space/health

---

## Quick Start

```bash
# Option 1 — Python (no install)
python -m http.server 8001

# Option 2 — Live reload on save
pip install -r requirements.txt
python run_dev.py

# Option 3 — Node
npx serve .
```

Open **http://localhost:8001**

> Must be served over HTTP. ES Modules and `fetch()` don't work with `file://`.

---

## Project Structure

```
portfolio/
├── index.html              # Single root div + script tag
├── data/                   # ALL content lives here — edit to update site
│   ├── config.json         # AI backend URL + EmailJS keys
│   ├── sections.json       # Section render order
│   ├── links.json          # Single source of truth for all URLs
│   ├── hero.json           # Hero section content
│   ├── about.json          # About section + full profile modal
│   ├── experience.json     # Work history cards
│   ├── projects.json       # Project cards (13 projects)
│   ├── skills.json         # Skills category cards
│   ├── education.json      # Degree cards + PDF links
│   ├── certifications.json # Certificate cards with images
│   ├── learning.json       # Currently learning section
│   ├── blog.json           # Blog post cards
│   ├── hire.json           # Hire Me form config + field definitions
│   ├── contact.json        # Contact section
│   ├── navbar.json         # Nav links
│   ├── footer.json         # Footer content
│   └── ai-assistant.json   # AI assistant welcome message + suggestions
├── js/
│   ├── main.js             # Boot — loads sections, inits all utilities
│   ├── hire.js             # Hire Me modal (EmailJS + mailto fallback)
│   ├── floatingChat.js     # Floating AI chat widget (bottom-right)
│   ├── floatingButtons.js  # Desktop nav sidebar + mobile WhatsApp btn
│   ├── sections/           # One renderer per section (navbar, hero, about…)
│   └── utils/              # lightbox.js, mobile.js, icons.js
├── css/
│   ├── style.css           # Master @import file
│   ├── base.css            # CSS variables, reset, scroll animations
│   ├── certifications.css  # Shared card grid (used by all card sections)
│   ├── floating-sidebar.css# Desktop sidebar + WhatsApp floating button
│   ├── floating-chat.css   # Floating AI chat widget
│   ├── navbar.css          # Navbar + mobile hamburger menu
│   └── [section].css       # Per-section styles
└── assets/
    ├── images/
    │   ├── hero/           # shuaib1.png (profile photo)
    │   ├── projects/       # Project screenshots
    │   ├── certs/          # Certificate images
    │   └── education/      # Degree certificate images
    └── docs/
        ├── resume/         # Shuaib_Iqbal_CV.pdf
        └── education/      # Degree PDFs
```

---

## Features

| Feature | Detail |
|---------|--------|
| JSON-driven | Edit `data/*.json` — no HTML or JS changes needed |
| Single source of truth | `links.json` owns all URLs — change once, updates everywhere |
| Floating nav sidebar | Desktop (≥1300px): vertical icon bar in right gutter |
| WhatsApp button | Fixed bottom-right (second from right) — all screen sizes |
| Floating AI chat | Fixed bottom-right — chat from any scroll position |
| Hire Me modal | Project / Permanent tabs, 20-currency dropdown, EmailJS + mailto |
| Mobile nav | Full-screen overlay; floating buttons auto-hide when open |
| Scroll animations | Cards fade up as they enter the viewport |
| Lightbox | Click any project/cert image to zoom full-screen |
| Mobile cards | 2-column grid; tap "Details" to expand a card full-width |
| iOS safe area | `env(safe-area-inset-bottom)` on all fixed bottom elements |

---

## Responsive Breakpoints

| Viewport | Layout |
|----------|--------|
| ≥1300px | Desktop + floating nav sidebar visible |
| 1300–901px | Desktop nav, no sidebar |
| 900px | Hamburger menu appears |
| 768px | Mobile hero (hero-sub visible, compact buttons) |
| 600px | Mobile card grid (2-col, tap-to-expand) |
| 480px | About cards go 1-column |
| 380px | Extra-small phone adjustments |

---

## Deployment

### GitHub Pages
```bash
git add . && git commit -m "update" && git push origin main
# Repo → Settings → Pages → Source: main / root
```

### Netlify / Vercel
Drag and drop the project folder. No build step required.

### Hugging Face Spaces
See `deploy/README_hf.md`.

---

## EmailJS Setup

The Hire Me form works immediately via `mailto:` fallback. To enable direct email sending:

1. Sign up free at [emailjs.com](https://www.emailjs.com/) (200 emails/month).
2. Create a service and two templates (owner notification + requester confirmation).
3. Update `data/config.json`:

```json
{
  "emailjs": {
    "publicKey":       "YOUR_PUBLIC_KEY",
    "serviceId":       "service_xxxxxxx",
    "ownerTemplateId": "template_owner",
    "hirerTemplateId": "template_confirm"
  }
}
```

Template variables: `{{from_name}}`, `{{from_email}}`, `{{hire_type}}`, `{{message}}` + all form field names.

---

## AI Assistant Backend

The chat widget posts to `aiBackendUrl` from `data/config.json`. Backend must expose:

```
POST /chat
Body:    { "question": "...", "history": [...], "off_topic_count": 0 }
Returns: { "answer": "...", "off_topic_count": 0 }
```

To run locally: set `data/config.json → aiBackendUrl` to `http://localhost:8000`.

---

## Adding a New Section

```
1. Create  data/my-section.json
2. Create  js/sections/my-section.js   (export renderMySection)
3. Add     { "id": "my-section" }  to data/sections.json
4. Add nav link to data/navbar.json  (optional)
```

No other files need to change. See `GUIDE.md` for full details.

---

## Missing Assets — You Need to Add These

The following project images are not yet available. Add the files and the portfolio will automatically show them:

| Project | File to add |
|---------|-------------|
| E-Commerce AI Chatbot (LLaMA 3) | `assets/images/projects/ecommerce-chatbot.png` |
| AI-Powered Resume Assistant | `assets/images/projects/resume-assistant.png` |
| AiSight Territory Footfall Map | `assets/images/projects/aisight-footfall-map.png` |
| BAT Territory Distribution | `assets/images/projects/bat-territory.png` |
| EBM RGM Dashboard | `assets/images/projects/ebm-dashboard.png` |
| SurveyAuto Demand Forecasting | `assets/images/projects/surveyauto-forecasting.png` |

All other project images are present and loading correctly.

---

## Troubleshooting

| Issue | Fix |
|-------|-----|
| `Could not reach AI backend` | Check `data/config.json → aiBackendUrl` |
| Hire form: "Send failed" | Add EmailJS keys to `config.json`; mailto fallback opens automatically |
| Blank hero background | Add profile photo to `assets/images/hero/shuaib1.png` |
| Content not refreshing | Hard refresh: `Ctrl+Shift+R` |
| Nav z-index issues | Already fixed — uses CSS `:has(nav.open)` to elevate navbar above floating buttons |

# Portfolio Content Guide

All content lives in `data/*.json` files. Edit the JSON → save → refresh browser. No HTML, CSS, or JS changes needed for content updates.

---

## Quick Reference — Which file controls what

| Section | File |
|---------|------|
| Name, photo, buttons, role title | `data/hero.json` |
| About summary + 4 skill cards | `data/about.json` |
| Work experience | `data/experience.json` |
| Projects | `data/projects.json` |
| Skills grid | `data/skills.json` |
| Education degrees | `data/education.json` |
| Certifications | `data/certifications.json` |
| Currently learning | `data/learning.json` |
| Blog posts | `data/blog.json` |
| Contact details | `data/links.json` |
| Navbar links | `data/navbar.json` |
| Hire Me form | `data/hire.json` |
| AI chat settings | `data/ai-assistant.json` |
| EmailJS + AI backend URL | `data/config.json` |

---

## 1 — Hero Section (`data/hero.json`)

```json
{
  "name":       "Shuaib Iqbal",
  "tagline":    "AI/ML Engineer  •  ...",
  "heading":    "Hi, I'm",
  "subheading": "Role line 1\nRole line 2",
  "description": "One paragraph about you",
  "image":      "assets/images/hero/shuaib1.png",
  "buttons": [
    { "label": "Hire Me",       "href": "#",           "type": "primary", "id": "heroHireBtn" },
    { "label": "Let's Connect", "href": "#contact",    "type": "outline" },
    { "label": "Ask AI",        "href": "#ai-assistant","type": "ai",     "id": "heroAiBtn" }
  ],
  "socials": ["github", "linkedin", "email"]
}
```

**To change the photo:** Place the file in `assets/images/hero/` and update the `"image"` path.

---

## 2 — Projects (`data/projects.json`)

### Adding a new project

Add a new object to the `"items"` array:

```json
{
  "id":         "unique_id",
  "title":      "Project Title",
  "tags":       ["Tag1", "Tag2", "Tag3"],
  "desc":       "Project description — 2-3 sentences.",
  "stackLabel": "Tech Stack",
  "stack":      ["Python", "LangChain", "FastAPI"],
  "image":      "assets/images/projects/my-project.png",
  "placeholder":"🤖",
  "github":     "https://github.com/username/repo",
  "demo":       "https://live-demo-url.com"
}
```

**Notes:**
- `"image"` — if there is no image, set `""` and the emoji placeholder will show
- `"github"` / `"demo"` — if there is no link, set `""` and the button will be disabled
- `"id"` — must be unique, no spaces

### Removing a project
Delete that object from the `"items"` array.

### Adding an image
Place the file at `assets/images/projects/filename.png`, then set the path in the JSON.

---

## 3 — Experience (`data/experience.json`)

```json
{
  "id":          "job_1",
  "role":        "Machine Learning Engineer",
  "company":     "AiSight.ai",
  "location":    "Lahore",
  "period":      "Oct 2022 – Present",
  "desc":        "What you did there — 2-3 sentences.",
  "stackLabel":  "Technologies",
  "stack":       ["Python", "LangChain", "FastAPI"],
  "placeholder": "🏢",
  "image":       "assets/images/companies/aisight.png",
  "links": [
    { "label": "Company Site", "href": "https://aisight.ai", "type": "external" },
    { "label": "LinkedIn",     "href": "https://linkedin...", "type": "linkedin" }
  ]
}
```

**To add a company logo:** Place it at `assets/images/companies/logo.png`.

---

## 4 — Skills (`data/skills.json`)

```json
{
  "icon":        "🧠",
  "badge":       "Category Label",
  "title":       "LLM & Generative AI",
  "desc":        "Short description of this skill area.",
  "skillsLabel": "Tools & Frameworks",
  "skills":      ["OpenAI API", "LangChain", "FAISS", "RAG"]
}
```

---

## 5 — Education (`data/education.json`)

```json
{
  "id":         "ms_nust",
  "degree":     "MS Computer Engineering",
  "school":     "NUST — Islamabad",
  "gpa":        "3.5 / 4.0",
  "year":       "2018 – 2021",
  "desc":       "Thesis or description.",
  "focusLabel": "Research Focus",
  "focus":      ["Deep Learning", "Time-Series"],
  "placeholder":"🎓",
  "image":      "assets/images/education/MS Degree Certificate.jpg",
  "buttons": [
    { "label": "View Transcript", "href": "assets/docs/education/MS Degree Transcript.pdf", "type": "view" },
    { "label": "Download",        "href": "assets/docs/education/MS Degree Certificate.pdf", "type": "download" }
  ]
}
```

---

## 6 — Certifications (`data/certifications.json`)

```json
{
  "id":          "cert_id",
  "title":       "Certificate Name",
  "issuer":      "University of Michigan",
  "provider":    "Coursera",
  "date":        "Nov 2020",
  "desc":        "What you learned.",
  "skillsLabel": "Skills Covered",
  "skills":      ["Python", "Data Science"],
  "placeholder": "📜",
  "image":       "assets/images/certs/python_basics_coursera.jpg",
  "link":        "https://coursera.org/verify/..."
}
```

**To add a certificate image:** Place it in `assets/images/certs/`.

---

## 7 — Blog Posts (`data/blog.json`)

```json
{
  "id":       "post_1",
  "title":    "Article Title",
  "tags":     ["LangChain", "RAG"],
  "excerpt":  "Short summary of the article.",
  "date":     "Jun 2025",
  "platform": "Medium",
  "readTime": "8 min read",
  "image":    "",
  "placeholder": "✍️",
  "link":     "https://medium.com/your-article-url"
}
```

---

## 8 — Contact & Social Links (`data/links.json`)

This file is the **single source of truth for all links** — change one place and the entire site updates.

```json
{
  "contact": {
    "email":    "your@email.com",
    "phone_1":  { "display": "(+92) 345 7134603", "href": "tel:+923457134603" },
    "phone_2":  { "display": "(+92) 301 7184603", "href": "tel:+923017184603" },
    "location": "Lahore, Punjab, Pakistan"
  },
  "social": {
    "github":     { "url": "https://github.com/...",   "display": "github.com/...",   "label": "GitHub"   },
    "linkedin":   { "url": "https://linkedin.com/...", "display": "linkedin.com/...", "label": "LinkedIn" },
    "email":      { "url": "mailto:your@email.com",    "display": "your@email.com",   "label": "Email"    },
    "whatsapp_1": { "url": "https://wa.me/923457134603", "display": "+92 345 7134603", "label": "WhatsApp" }
  },
  "resume": "assets/docs/resume/Shuaib_Iqbal_CV.pdf"
}
```

---

## 9 — About Cards (`data/about.json`)

```json
{
  "icon":  "🤖",
  "title": "Machine Learning",
  "desc":  "Description of this skill area."
}
```

There are 4 cards — add, remove, or edit them directly.

---

## 10 — Hire Me Form (`data/hire.json`)

`"types"` contains tabs (`project` / `permanent`). To add or remove fields, edit the `"fields"` array in the respective object.

To add a currency to the list, add a new object to the `"currencies"` array:
```json
{ "code": "XYZ", "label": "XYZ — Currency Name" }
```

---

## 11 — EmailJS Setup (`data/config.json`)

```json
{
  "aiBackendUrl": "https://your-hf-space.hf.space",
  "emailjs": {
    "publicKey":       "YOUR_EMAILJS_PUBLIC_KEY",
    "serviceId":       "service_xxxxxxx",
    "ownerTemplateId": "template_xxxxxxx",
    "hirerTemplateId": "template_xxxxxxx"
  }
}
```

**Setup steps:**
1. [emailjs.com](https://emailjs.com) → free account (200 emails/month)
2. Create an Email Service (Gmail recommended)
3. Create 2 templates: owner notification + sender confirmation
4. Paste the public key, service ID, and template IDs here

If EmailJS is not set up, the form automatically falls back to `mailto:`.

---

## 12 — AI Assistant Backend (`data/config.json`)

```json
{ "aiBackendUrl": "https://shuaibiqbal-portfolio-rag-api.hf.space" }
```

For local testing: set `"http://localhost:8000"` and run the backend locally.

---

## 13 — Images — Where to put them

| Type | Folder |
|------|--------|
| Profile/hero photo | `assets/images/hero/` |
| Company logos (experience) | `assets/images/companies/` |
| Project screenshots | `assets/images/projects/` |
| Certificate images | `assets/images/certs/` |
| Degree certificates | `assets/images/education/` |

**Formats:** PNG, JPG, JPEG, WEBP — all are supported.
**Size:** 800×500px recommended for project images, square for logos.

---

## 14 — Missing Project Images (To Be Added)

These 6 projects currently have no screenshots. Add the file and it will show automatically:

| File | Project |
|------|---------|
| `assets/images/projects/ecommerce-chatbot.png` | E-Commerce AI Chatbot |
| `assets/images/projects/resume-assistant.png` | AI Resume Assistant |
| `assets/images/projects/aisight-footfall-map.png` | AiSight Footfall Map |
| `assets/images/projects/bat-territory.png` | BAT Territory |
| `assets/images/projects/ebm-dashboard.png` | EBM Dashboard |
| `assets/images/projects/surveyauto-forecasting.png` | SurveyAuto Forecasting |

---

## 15 — Deploy to GitHub Pages

```bash
git add .
git commit -m "update portfolio"
git push origin main
```

GitHub repo → Settings → Pages → Source: `main` branch / `/ (root)`

Live URL: `https://shuaibiqbal.github.io/portfolio`

---

## 16 — Common Tasks Quick Reference

| Task | Action |
|------|--------|
| Add new project | `data/projects.json` → add object to `items` array |
| Remove project | `data/projects.json` → delete that object |
| Change phone number | `data/links.json` → `contact.phone_1` |
| Change email | `data/links.json` → update both `contact.email` and `social.email` |
| Replace CV/Resume | Replace `assets/docs/resume/Shuaib_Iqbal_CV.pdf` (keep same filename) |
| Change hero photo | Replace `assets/images/hero/shuaib1.png` (keep same filename) |
| Add new blog post | `data/blog.json` → add object to `items` array |
| Add new certification | `data/certifications.json` → add object to `items` array |
| Add navbar link | `data/navbar.json` → add object to `links` array |
| Update about section | `data/about.json` → edit `summary` or `cards` |
| Update currently learning | `data/learning.json` → `items` array |

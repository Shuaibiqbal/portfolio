# Portfolio Customisation Guide

Complete reference for updating every section of the portfolio without touching HTML or JavaScript.

---

## Table of Contents

1. [Personal Info & Links](#1-personal-info--links)
2. [Hero Section](#2-hero-section)
3. [About Section](#3-about-section)
4. [Work Experience](#4-work-experience)
5. [Projects](#5-projects)
6. [Skills](#6-skills)
7. [Education](#7-education)
8. [Certifications](#8-certifications)
9. [Learning Section](#9-learning-section)
10. [Blog / Articles](#10-blog--articles)
11. [Contact Section](#11-contact-section)
12. [Hire Me Form](#12-hire-me-form)
13. [Navbar](#13-navbar)
14. [Section Order & Visibility](#14-section-order--visibility)
15. [WhatsApp Button](#15-whatsapp-button)
16. [AI Assistant](#16-ai-assistant)
17. [Adding a New Section](#17-adding-a-new-section)
18. [Image & Asset Reference](#18-image--asset-reference)

---

## 1. Personal Info & Links

**File:** `data/links.json`

This is the **single source of truth** for all URLs and contact info. It feeds the hero socials, contact section, footer, and floating sidebar.

```jsonc
{
  "social": {
    "github":     { "url": "https://github.com/YOUR_USERNAME", ... },
    "linkedin":   { "url": "https://linkedin.com/in/YOUR_PROFILE", ... },
    "email":      { "url": "mailto:your@email.com", ... },
    "whatsapp_1": { "url": "https://wa.me/92XXXXXXXXXX?text=...", ... }
  },
  "contact": {
    "email":    "your@email.com",
    "phone_1":  { "href": "tel:+92XXXXXXXXXX", "display": "(+92) XXX XXXXXXX" },
    "location": "Your City, Country"
  },
  "resume": "assets/docs/resume/Your_CV.pdf"
}
```

---

## 2. Hero Section

**File:** `data/hero.json`

```jsonc
{
  "name":        "Your Name",
  "tagline":     "Role  •  Skill  •  Skill",
  "heading":     "Hi, I'm",
  "subheading":  "Line one\nLine two",
  "description": "Short bio paragraph...",
  "image":       "assets/images/hero/your-photo.png",
  "buttons": [
    { "label": "Hire Me",       "href": "#",           "type": "primary", "id": "heroHireBtn" },
    { "label": "Let's Connect", "href": "#contact",    "type": "outline" },
    { "label": "Ask AI About Me","href":"#ai-assistant","type": "ai",     "id": "heroAiBtn" }
  ],
  "socials": ["github", "linkedin", "email"]
}
```

**Hero image:** `assets/images/hero/your-photo.png`  
Use a portrait crop (3:4 ratio). PNG with transparent background works best.

---

## 3. About Section

**File:** `data/about.json`

- `summary` — short paragraph shown below the heading
- `cards[]` — four feature cards with icon, title, desc
- `modal` — full profile modal content (achievements, expertise table, experience + education)

---

## 4. Work Experience

**File:** `data/experience.json`

```jsonc
{
  "items": [
    {
      "id":          "exp_company",
      "company":     "Company Name",
      "location":    "City",
      "period":      "Jan 2023 – Present",
      "role":        "Your Role",
      "desc":        "What you did...",
      "stackLabel":  "Tech Stack",
      "stack":       ["Python", "FastAPI", ...],
      "image":       "assets/images/companies/company.png",
      "placeholder": "🤖",
      "links": [
        { "label": "Company Site", "href": "https://...", "type": "external" },
        { "label": "LinkedIn",     "href": "https://...", "type": "linkedin" }
      ]
    }
  ]
}
```

**Company logo:** `assets/images/companies/company.png` (180×60px recommended)

---

## 5. Projects

**File:** `data/projects.json`

```jsonc
{
  "items": [
    {
      "id":          "project_id",
      "title":       "Project Title",
      "tags":        ["Tag1", "Tag2"],
      "desc":        "What the project does...",
      "stackLabel":  "Tech Stack",
      "stack":       ["Python", "LangChain", ...],
      "image":       "assets/images/projects/screenshot.png",
      "placeholder": "🤖",
      "github":      "https://github.com/...",
      "demo":        "https://..."
    }
  ]
}
```

- Leave `"github": ""` or `"demo": ""` to disable those buttons (shown greyed out).
- Leave `"image": ""` to show the emoji placeholder instead of an image.
- **Screenshot size:** 960×540px (16:9) recommended.

---

## 6. Skills

**File:** `data/skills.json`

Groups your skills into category cards. Each category has an icon, title, and list of skill tags.

---

## 7. Education

**File:** `data/education.json`

```jsonc
{
  "items": [
    {
      "id":           "ms_nust",
      "degree":       "MS Computer Engineering",
      "school":       "NUST — Islamabad",
      "year":         "2018 – 2021",
      "gpa":          "CGPA: 3.50 / 4.00",
      "desc":         "Thesis description...",
      "focusLabel":   "Focus Areas",
      "focus":        ["ML", "Image Processing", ...],
      "image":        "assets/images/education/MS Degree Transcript.jpg",
      "placeholder":  "🎓",
      "buttons": [
        { "label": "Download Degree",      "href": "assets/docs/education/MS Degree Certificate.pdf",  "type": "download" },
        { "label": "Download Transcript",  "href": "assets/docs/education/MS Degree Transcript.pdf",   "type": "download" }
      ]
    }
  ]
}
```

- `"type": "download"` — triggers browser download
- `"type": "view"` — opens in new tab

**Education images:** `assets/images/education/*.jpg` (scanned certificates/transcripts)  
**Education PDFs:** `assets/docs/education/*.pdf`

---

## 8. Certifications

**File:** `data/certifications.json`

```jsonc
{
  "items": [
    {
      "id":          "cert_id",
      "title":       "Certificate Title",
      "issuer":      "Coursera",
      "provider":    "University of Michigan",
      "date":        "Nov 2020",
      "placeholder": "🐍",
      "image":       "assets/images/certs/filename.jpg",
      "link":        "https://credential-verify-url",
      "desc":        "What you learned...",
      "skillsLabel": "Skills Learned",
      "skills":      ["Python", "Data Types", ...]
    }
  ]
}
```

---

## 9. Learning Section

**File:** `data/learning.json`

Shows what you're currently studying. Each card has an icon, title, description, and optional progress percentage.

---

## 10. Blog / Articles

**File:** `data/blog.json`

Each blog card links to an external article (Medium, Dev.to, etc.).

---

## 11. Contact Section

**File:** `data/contact.json`

Pulls phone, email, and location from `data/links.json` automatically. You can customise button labels and which social links to show.

---

## 12. Hire Me Form

**File:** `data/hire.json`

Two tabs: **Short-term Project** and **Permanent Position**. Each tab has a configurable fields array.

To add a field:
```jsonc
{
  "id":          "fieldId",
  "label":       "Field Label",
  "type":        "text",        // text | email | url | textarea | select | currency
  "required":    true,
  "half":        true,          // true = takes half the row width (pairs with next half field)
  "placeholder": "hint text"
}
```

To enable email sending, configure `data/config.json → emailjs` (see README.md).

---

## 13. Navbar

**File:** `data/navbar.json`

```jsonc
{
  "logo": "YourName",
  "links": [
    { "label": "Home",        "href": "#home" },
    { "label": "AI Assistant","href": "#ai-assistant", "isAi": true }
  ]
}
```

`"isAi": true` renders the link in cyan with an AI icon.

---

## 14. Section Order & Visibility

**File:** `data/sections.json`

```json
[
  { "id": "navbar" },
  { "id": "hero" },
  { "id": "about" },
  ...
]
```

- **Reorder** sections by moving their entry up or down.
- **Hide** a section by removing its entry (the section won't render).

---

## 15. WhatsApp Button

**File:** `data/links.json → social.whatsapp_1`

```jsonc
"whatsapp_1": {
  "url": "https://wa.me/923457134603?text=Hi%20Shuaib%2C%20I%20found%20your%20portfolio",
  "display": "(+92) 345 7134603"
}
```

The floating WhatsApp button (mobile only, bottom-left) reads from this key automatically.  
To change the number, update the `wa.me/PHONE` part of the URL.

---

## 16. AI Assistant

**File:** `data/ai-assistant.json` — chat UI text, suggestion pills  
**File:** `data/config.json → aiBackendUrl` — backend endpoint

The floating chat widget posts to `aiBackendUrl/chat`. If the backend is unreachable, the widget shows an error message and the user can try again later.

To keep the HuggingFace backend warm (prevent cold starts), set up a cron job at [cron-job.org](https://cron-job.org/) to ping `YOUR_BACKEND/health` every 5 minutes.

---

## 17. Adding a New Section

**Step 1 — Create the data file**

`data/my-section.json`:
```json
{
  "title": "My",
  "titleAccent": "Section",
  "subtitle": "...",
  "items": []
}
```

**Step 2 — Create the renderer**

`js/sections/my-section.js`:
```js
export async function renderMySection() {
  const container = document.getElementById('section-my-section');
  if (!container) return;
  const d = await fetch('data/my-section.json').then(r => r.json());

  container.innerHTML = `
    <section class="section" id="my-section">
      <div class="container">
        <h2 class="section-title">${d.title} <span class="accent">${d.titleAccent}</span></h2>
        <p class="section-desc">${d.subtitle}</p>
        <!-- your HTML here -->
      </div>
    </section>`;
}
```

The function name must follow the pattern `renderMySection` (camelCase of the section id).

**Step 3 — Register the section**

Add to `data/sections.json`:
```json
{ "id": "my-section" }
```

**Step 4 — Add to navbar** (optional)

Add to `data/navbar.json → links`:
```json
{ "label": "My Section", "href": "#my-section" }
```

---

## 18. Image & Asset Reference

| Asset | Path | Recommended size |
|-------|------|-----------------|
| Hero photo | `assets/images/hero/shuaib1.png` | 800×1000px portrait |
| Company logo | `assets/images/companies/name.png` | 180×60px |
| Project screenshot | `assets/images/projects/name.png` | 960×540px |
| Certificate image | `assets/images/certs/name.jpg` | 800×560px |
| Education image | `assets/images/education/name.jpg` | 800×560px |
| Resume PDF | `assets/docs/resume/Name_CV.pdf` | — |
| Education PDF | `assets/docs/education/Name.pdf` | — |

**If an image is missing:** the card automatically shows the emoji `placeholder` value — no broken images.

---

## Color Theme Reference

All colors are CSS variables defined in `css/base.css`:

```css
--navy:       #0b0f14  /* page background */
--navy-dark:  #121820  /* dark section background */
--navy-card:  #1a212b  /* card background */
--border:     #2d3744  /* borders */
--cyan:       #00b4d8  /* primary accent */
--cyan-hover: #0096c7  /* accent hover */
--white:      #ffffff  /* headings */
--muted:      #b0bec5  /* body text */
--text-dim:   #8a9ab0  /* secondary text */
```

To change the accent color, update `--cyan` and `--cyan-hover`. Everything updates site-wide.

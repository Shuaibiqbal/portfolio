# Portfolio Content Guide

This file has everything you need — to add, update, or remove anything.
Just open the relevant JSON file, make your changes, and you're done.

---

## Adding a New Section (Future)

**Only 3 steps** — never touch `index.html` or `main.js`:

### Step 1 — Create a JSON data file
Copy `data/_template.json` → `data/your-section.json`
```json
{
  "title": "Section",
  "titleAccent": "Title",
  "subtitle": "Description here.",
  "items": [
    { "badge": "Badge", "title": "Item Title", "desc": "Description." }
  ]
}
```

### Step 2 — Create a JS renderer
Copy `js/sections/_template.js` → `js/sections/your-section.js`

**Naming rule:** file `my-awards.js` → export function `renderMyAwards()`
```js
export async function renderYourSection() {
  const container = document.getElementById('section-your-section');
  if (!container) return;
  const d = await fetch('data/your-section.json').then(r => r.json());
  container.innerHTML = `
    <section class="section" id="your-section">
      <div class="container">
        <h2 class="section-title">${d.title} <span class="accent">${d.titleAccent}</span></h2>
        <p class="section-desc">${d.subtitle}</p>
        <!-- your HTML here -->
      </div>
    </section>`;
}
```

### Step 3 — Register in sections.json
Open `data/sections.json` and add it in the desired position:
```json
[
  { "id": "navbar" },
  { "id": "hero" },
  ...
  { "id": "your-section" },   ← add here
  { "id": "contact" },
  { "id": "footer" }
]
```

### Step 4 — (Optional) Add a nav link
In `data/navbar.json` under `links[]`:
```json
{ "label": "Your Section", "href": "#your-section" }
```

### Step 5 — (Optional) Add CSS
If you need custom styling:
1. Create `css/your-section.css`
2. Add an import in `css/style.css`:
   ```css
   @import './your-section.css';
   ```

**Done.** You can reuse existing CSS classes (`cert-card-full`, `cert-badge`, etc.) — you usually won't need to write new CSS.

---

## Quick Reference

| What to change | Which file |
|---|---|
| Nav links | `data/navbar.json` |
| Hero heading, description, buttons | `data/hero.json` |
| Hero profile image | `data/hero.json` → `image` |
| About section text | `data/about.json` |
| About modal (achievements, expertise) | `data/about.json` → `modal` |
| Add a new job | `data/experience.json` → `items[]` |
| Add a new project | `data/projects.json` → `items[]` |
| Add/update a skill | `data/skills.json` → `categories[]` |
| Add a new degree/education | `data/education.json` → `items[]` |
| Add a new certificate | `data/certifications.json` → `items[]` |
| Update learning progress | `data/learning.json` → `items[]` |
| Email, phone, location | `data/contact.json` |
| Resume PDF link | `data/contact.json` → `resume` |
| Footer links | `data/footer.json` |
| AI chat suggestion pills | `data/ai-assistant.json` → `suggestions[]` |
| AI backend URL | `data/config.json` → `aiBackendUrl` |

---

## Experience — Adding a New Job

File: `data/experience.json`

Add this object to the `items` array (following the same structure as existing entries):

```json
{
  "id": "exp_companyname",
  "company": "Company Name",
  "location": "City",
  "period": "Jan 2024 – Present",
  "role": "Job Title",
  "desc": "What you did there — in 2-3 sentences.",
  "stackLabel": "Tech Stack",
  "stack": ["Python", "FastAPI", "Docker"],
  "image": "assets/images/experience/companyname.png",
  "placeholder": "🏢",
  "links": [
    { "label": "Company Site", "href": "https://company.com", "type": "external" },
    { "label": "LinkedIn",     "href": "https://linkedin.com/company/name", "type": "linkedin" }
  ]
}
```

**Notes:**
- `id` — must be unique, lowercase, with underscores
- `image` — if there is no image, set `""` and the `placeholder` emoji will show
- `stack` — add as many skills as needed
- `links[].type` — `"external"` or `"linkedin"` (the icon will change accordingly)

---

## Projects — Adding a New Project

File: `data/projects.json`

```json
{
  "id": "project_name",
  "title": "Project Title",
  "tags": ["Python", "FastAPI"],
  "desc": "What the project does — in 2 sentences.",
  "stackLabel": "Tech Stack",
  "stack": ["Python", "FastAPI", "PostgreSQL"],
  "image": "assets/images/projects/project.png",
  "placeholder": "🤖",
  "github": "https://github.com/shuaibiqbal/project",
  "demo": "https://project-demo.com"
}
```

**Notes:**
- Set `github` or `demo` to `""` if there is no link — the button will be greyed out
- Set `image` to `""` if there is no screenshot — the emoji placeholder will show

---

## Certifications — Adding a New Certificate

File: `data/certifications.json`

Place the certificate image in `assets/certs/` first, then:

```json
{
  "id": "cert_unique_id",
  "title": "Certificate Title",
  "issuer": "Coursera",
  "provider": "University Name",
  "date": "Mar 2026",
  "placeholder": "📜",
  "image": "assets/certs/cert_filename.jpg",
  "link": "https://coursera.org/verify/ABC123",
  "desc": "What the course covered — in 1-2 sentences.",
  "skillsLabel": "Skills Learned",
  "skills": ["Skill 1", "Skill 2", "Skill 3"]
}
```

**Notes:**
- `image` — a screenshot of the certificate, place it in `assets/certs/`
- `link` — the verification URL of the original certificate
- `provider` — if it is the same as `issuer`, use the same value or an empty string
- The download button will automatically download the certificate image

---

## Education — Adding a New Entry

File: `data/education.json`

```json
{
  "id": "edu_unique_id",
  "degree": "Degree Title",
  "school": "University — City",
  "year": "2020 – 2024",
  "gpa": "CGPA: 3.80 / 4.00",
  "desc": "What you studied, thesis topic — in 1-2 sentences.",
  "focusLabel": "Focus Areas",
  "focus": ["Machine Learning", "Computer Vision"],
  "image": "assets/images/education/degree_scan.jpg",
  "placeholder": "🎓",
  "buttons": [
    { "label": "View Degree",  "href": "assets/docs/education/degree.pdf",     "type": "view" },
    { "label": "Transcript",   "href": "assets/docs/education/transcript.pdf",  "type": "download" }
  ]
}
```

**Notes:**
- `type: "view"` — opens in a new tab
- `type: "download"` — triggers a browser download
- If there is no PDF, set `"href": ""` — the button will be disabled

---

## Skills — Updating a Category or Skill

File: `data/skills.json`

**Adding a skill to an existing category:**
```json
"skills": ["LangChain", "OpenAI API", "ADD NEW SKILL HERE"]
```

**Adding a new category:**
```json
{
  "icon": "🔥",
  "badge": "New Category",
  "title": "Category Full Title",
  "desc": "What this category covers.",
  "skillsLabel": "Skills",
  "skills": ["Skill A", "Skill B", "Skill C"]
}
```

---

## Learning — Updating Progress or Adding a New Topic

File: `data/learning.json`

**Updating progress:**
```json
"progress": 85
```
(0 to 100 — the progress bar will update automatically)

**Adding a new topic:**
```json
{
  "icon": "🔥",
  "category": "Category Name",
  "progress": 30,
  "title": "Full Topic Title",
  "desc": "What you are learning — in 1-2 sentences.",
  "topicsLabel": "Topics",
  "topics": ["Topic 1", "Topic 2", "Topic 3"]
}
```

---

## Contact — Updating Email, Phone, Location

File: `data/contact.json`

```json
"direct": [
  {
    "label": "Email",
    "values": [{ "text": "newemail@gmail.com", "href": "mailto:newemail@gmail.com" }]
  },
  {
    "label": "Phone",
    "values": [
      { "text": "(+92) 300 0000000", "href": "tel:+923000000000" }
    ]
  }
]
```

**Updating the Resume PDF:**
```json
"resume": {
  "view":     "assets/resume/New_CV.pdf",
  "download": "assets/resume/New_CV.pdf"
}
```
Place the PDF file in `assets/resume/`.

---

## Hero — Changing the Profile Image

File: `data/hero.json`

```json
"image": "assets/images/new_photo.jpg"
```

Place the image in `assets/images/` first.

---

## Hero — Updating Social Links

File: `data/hero.json`

```json
"socials": [
  { "label": "GitHub",   "href": "https://github.com/newusername", "type": "github" },
  { "label": "LinkedIn", "href": "https://linkedin.com/in/newprofile", "type": "linkedin" },
  { "label": "Email",    "href": "mailto:newemail@gmail.com", "type": "email" }
]
```

**Available types:** `github`, `linkedin`, `email`

---

## Footer — Updating Links

File: `data/footer.json`

```json
{
  "copyright": "© 2026 Your Name — Your Title",
  "links": [
    { "label": "GitHub",      "href": "https://github.com/username" },
    { "label": "LinkedIn",    "href": "https://linkedin.com/in/username" },
    { "label": "HuggingFace", "href": "https://huggingface.co/username" },
    { "label": "Kaggle",      "href": "https://kaggle.com/username" }
  ]
}
```

---

## AI Chat — Updating Suggestion Pills

File: `data/ai-assistant.json`

```json
"suggestions": [
  { "label": "Button Text", "q": "Full question that will be sent to the AI" },
  { "label": "Top Skills",  "q": "What are his top skills?" }
]
```

---

## config.json — Everything in One Place

File: `data/config.json`

```json
{
  "aiBackendUrl": "https://shuaibiqbal-portfolio-rag-api.hf.space",

  "emailjs": {
    "publicKey":       "YOUR_KEY",
    "serviceId":       "YOUR_SERVICE",
    "ownerTemplateId": "TEMPLATE_TO_YOU",
    "hirerTemplateId": "TEMPLATE_TO_THEM"
  }
}
```

### Changing the AI Backend URL
Local dev: `"aiBackendUrl": "http://localhost:8001"`
> Restore the production URL before pushing!

### EmailJS Setup (Hire Me form email)

It works without EmailJS too — on submit, it opens `mailto:`.
To send email directly (recommended):

1. Create a free account at **emailjs.com** (200 emails/month)
2. Connect your Gmail service
3. Create **2 templates**:

**Template 1 — to you (owner):**
```
Subject: New {{hire_type}} from {{from_name}}
Variables: {{from_name}}, {{from_email}}, {{hire_type}}, {{message}}
```

**Template 2 — to them (confirmation):**
```
Subject: Request Received — Shuaib Iqbal
Variables: {{to_name}}, {{hire_type}}
```

4. Paste the IDs into `config.json` — done.

---

## Hire Me Form — Updating Fields or Currencies

File: `data/hire.json`

**Adding a currency:**
```json
"currencies": [
  { "code": "USD", "label": "USD — US Dollar" },
  { "code": "PKR", "label": "PKR — Pakistani Rupee" },
  { "code": "XYZ", "label": "XYZ — New Currency" }   ← add here
]
```

**Adding a new field (to project or permanent):**
```json
{ "id": "fieldId", "label": "Field Label", "type": "text", "required": true, "half": true }
```
- `type`: `text`, `email`, `textarea`, `select`, `currency`
- `half: true` → displayed side-by-side with the next `half: true` field
- `options: ["A","B"]` → only for `type: "select"`

---

## Floating AI Chat Widget

Fixed at the bottom-right corner — visible at any scroll position.

**Changing the welcome message:**
```json
// data/ai-assistant.json
"welcomeMessage": "Hi! Ask me anything about Shuaib."
```

**Changing suggestion pills:**
```json
"suggestions": [
  { "label": "Button Text", "q": "Full question sent to AI" }
]
```

The widget and page section are independent — both use the same backend API.

---

## WhatsApp — Add / Change / Remove Number

File: `data/links.json` → `social{}`

**Changing the number:**
```json
"whatsapp_1": {
  "label":      "WhatsApp",
  "url":        "https://wa.me/923457134603?text=Hi%20Shuaib%2C%20I%20found%20your%20portfolio.",
  "display":    "(+92) 345 7134603",
  "icon":       "whatsapp",
  "isWhatsApp": true
}
```

URL format: `https://wa.me/<countrycode><number>` — no `+`, no spaces, no dashes.
- Pakistan: `92` prefix (not `0`)
- UAE: `971` prefix
- USA: `1` prefix

**Adding a new WhatsApp number:**
1. In `data/links.json` → `social{}`, add `whatsapp_3: {...}`
2. In `data/contact.json` → `"whatsapp": ["whatsapp_1","whatsapp_2","whatsapp_3"]`, add the new key

**Removing a number:**
1. Remove the key from `data/contact.json` → `"whatsapp": []`
2. Also remove the entry from `data/links.json` (optional cleanup)

**Changing the pre-filled message:**
Text after `?text=` in the URL is pre-filled in WhatsApp.

---

## How to Run Locally

**Option 1 — Direct (no installation):**
```bash
python3 -m http.server 8000
# Open: http://localhost:8000
```

**Option 2 — Live reload (file save → browser auto-refresh):**
```bash
pip install livereload
python3 run_dev.py
# Open: http://localhost:8000
```
Live reload saves a lot of time in development — edit JSON and the portfolio updates instantly.

**Running the backend locally too (for AI chat):**
```bash
# In data/config.json:
{ "aiBackendUrl": "http://localhost:8001" }

# In a backend terminal:
uvicorn main:app --reload --port 8001

# Restore before pushing:
{ "aiBackendUrl": "https://shuaibiqbal-portfolio-rag-api.hf.space" }
```

---

## Navbar — Adding/Removing Links

File: `data/navbar.json`

```json
"links": [
  { "label": "Home",       "href": "#home" },
  { "label": "About",      "href": "#about" },
  { "label": "New Section","href": "#new-section" },
  { "label": "AI Assistant","href": "#ai-assistant", "isAi": true }
]
```

**Note:** `"isAi": true` — applies special cyan styling to the AI Assistant link

---

## Assets — Where to Place Images and PDFs

```
assets/
├── images/
│   ├── hero/           ← Profile photo          → hero.json "image"
│   ├── companies/      ← Company logos           → experience.json "image"
│   ├── projects/       ← Project screenshots     → projects.json "image"
│   ├── certs/          ← Certificate images      → certifications.json "image"
│   └── education/      ← Degree scan images      → education.json "image"
└── docs/
    ├── resume/         ← CV PDF                  → contact.json "resume"
    └── education/      ← Degree PDFs, transcripts → education.json "buttons[].href"
```

Place the file in the correct folder, then write the path in the JSON — that's it.

**Path format examples:**
```
Hero photo:          "assets/images/hero/shuaib1.png"
Company logo:        "assets/images/companies/companyname.png"
Project screenshot:  "assets/images/projects/project-name.png"
Certificate image:   "assets/images/certs/cert_filename.jpg"
Education scan:      "assets/images/education/ms_degree.jpg"
Degree PDF:          "assets/docs/education/MS Degree Certificate.pdf"
Resume:              "assets/docs/resume/Shuaib_Iqbal_CV.pdf"
```

---

## Blog — Adding a New Article

File: `data/blog.json`

```json
{
  "id": "blog_unique_id",
  "title": "Article Title",
  "date": "Mar 2026",
  "platform": "Medium",
  "link": "https://medium.com/@shuaibiqbal/article-link",
  "tags": ["LangChain", "RAG", "Python"],
  "excerpt": "Short article summary — 1-2 sentences to attract the reader.",
  "readTime": "6 min read",
  "image": ""
}
```

**Notes:**
- `platform` — Medium, Dev.to, LinkedIn, Personal Blog, etc.
- `image` — article cover image (optional, folder: `assets/images/blog/`)
- Leave `link` empty if it is a draft — "Coming Soon" will show

---

## Image Dimensions Guide

Using the right dimensions keeps the portfolio professional and loads fast.

### Hero Photo — `assets/images/hero/`
```
Recommended: 800 × 1000 px  (portrait, 4:5 ratio)
Format:      PNG (transparent background preferred) or JPG
Max size:    300 KB
Tips:        Professional headshot, solid/blurred background
             Looks good on dark background (portfolio has a dark theme)
```

### Company Logos — `assets/images/companies/`
```
Recommended: 400 × 400 px  (square) or  500 × 200 px  (landscape)
Format:      PNG with transparent background (best)
Max size:    100 KB
Tips:        White/light version of logo looks better on dark background
             Square format is the most consistent in cards
```

### Project Screenshots — `assets/images/projects/`
```
Recommended: 1280 × 720 px  (16:9, widescreen)
Format:      JPG (for screenshots) or PNG (for UI mockups)
Max size:    400 KB
Tips:        Clean screenshot of the browser window or app
             Cropped, no taskbar/system UI
```

### Certificate Images — `assets/images/certs/`
```
Recommended: 1200 × 900 px  (4:3 ratio)
Format:      JPG
Max size:    200 KB
Tips:        Full scan/screenshot of the certificate
             Good contrast, text clearly readable
```

### Education Degree Scans — `assets/images/education/`
```
Recommended: 1200 × 900 px  (4:3 ratio) or A4 scan
Format:      JPG
Max size:    300 KB
Tips:        Clean scan, straight alignment
             Displayed with zoom in the lightbox
```

### Blog Cover Images — `assets/images/blog/` *(optional)*
```
Recommended: 1200 × 630 px  (Open Graph / social share ratio)
Format:      JPG or PNG
Max size:    200 KB
```

### Quick Size Reference
| Image Type     | Width  | Height | Format | Max KB |
|---------------|--------|--------|--------|--------|
| Hero photo    | 800px  | 1000px | PNG    | 300    |
| Company logo  | 400px  | 400px  | PNG    | 100    |
| Project shot  | 1280px | 720px  | JPG    | 400    |
| Certificate   | 1200px | 900px  | JPG    | 200    |
| Degree scan   | 1200px | 900px  | JPG    | 300    |
| Blog cover    | 1200px | 630px  | JPG    | 200    |

**To compress images:** https://squoosh.app (free, browser-based, no upload limit)

---

## Portfolio Upgrade Roadmap

These features can be added in the future — each one only requires a JSON + JS file.

### Tier 1 — Add Soon (High Impact)

#### Testimonials / Recommendations
Show recruiters social proof.
```
data/testimonials.json   js/sections/testimonials.js
```
```json
{
  "name": "John Smith",
  "role": "CTO at AiSight.ai",
  "text": "Shuaib delivered outstanding AI pipelines...",
  "linkedin": "https://linkedin.com/in/johnsmith",
  "avatar": "assets/images/testimonials/john.jpg"
}
```

#### Stats / Numbers
An impactful numbers section — years, projects, clients.
```
data/stats.json   js/sections/stats.js
```
```json
{ "value": "3+",  "label": "Years Experience" },
{ "value": "20+", "label": "Projects Shipped" },
{ "value": "4",   "label": "Enterprise Clients" },
{ "value": "11",  "label": "Certifications" }
```

#### Open Source / GitHub
Pinned repositories or contributions.
```
data/opensource.json   js/sections/opensource.js
```

---

### Tier 2 — Growth Phase (Medium Impact)

#### Research / Publications
Academic papers, thesis, conference talks.
```
data/publications.json   js/sections/publications.js
```

#### Speaking / Talks
Webinars, workshops, guest lectures.
```
data/talks.json   js/sections/talks.js
```

#### Awards & Recognition
Hackathon wins, competitions, honors.
```
data/awards.json   js/sections/awards.js
```

---

### Tier 3 — Polish (Nice to Have)

#### Timeline View
Career journey visual timeline.
```
data/timeline.json   js/sections/timeline.js
```

#### Tools & Setup
Tech stack / tools you use daily.
```
data/tools.json   js/sections/tools.js
```

---

### Process for adding any new section (remember this):
```
1. data/section-name.json       ← content
2. js/sections/section-name.js  ← renderer (export renderSectionName)
3. data/sections.json           ← add one line
4. data/navbar.json             ← add nav link (optional)
```

**CSS:** Reuse existing classes (`cert-card-full`, `cert-badge`, `section-title`, etc.) — write new CSS only when something completely different is needed.

---

## Deleting an Item

To delete any item from any section, just remove its object from the `items[]` or `categories[]` array.

Example — deleting a certificate:
```json
"items": [
  { "id": "cert_a" ... },
  // "id": "cert_b" — removed this entry
  { "id": "cert_c" ... }
]
```

---

## Important Notes

1. **JSON format must be valid** — an extra comma or missing bracket can break the page
2. **Image paths are case-sensitive** — `aisight.png` and `AiSight.png` are different
3. **Browser cache** — if changes are not showing, press `Ctrl+Shift+R` (hard refresh)
4. **Local test** — test with `python3 -m http.server 8000` first, then push

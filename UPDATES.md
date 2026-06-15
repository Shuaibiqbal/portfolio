# Portfolio — Future Updates Guide

This file tracks things that are currently missing or need to be updated in the future.

---

## 1. EmailJS Setup (Hire form direct email)

Currently the form works via `mailto:` (which opens an email client).
To send email directly:

1. Create a free account at https://emailjs.com
2. Connect your Gmail service
3. Create 2 templates:
   - Owner template (notification to you)
   - Hirer template (confirmation to the sender)
4. Update `data/config.json`:

```json
"emailjs": {
  "publicKey":       "abc123...",
  "serviceId":       "service_xxx",
  "ownerTemplateId": "template_owner",
  "hirerTemplateId": "template_confirm"
}
```

---

## 2. Missing Project Screenshots

These 2 projects are currently showing with an emoji placeholder. To add screenshots:

### Step 1 — Create/get the image
- Size: 960×540px (16:9)
- Format: PNG or JPG
- Place in this folder:
  - `assets/images/projects/resume-assistant.png`
  - `assets/images/projects/context-chatbot.png`

### Step 2 — Update data/projects.json

In the `resume_assistant` entry:
```json
"image": "assets/images/projects/resume-assistant.png"
```

In the `context_chatbot` entry:
```json
"image": "assets/images/projects/context-chatbot.png"
```

---

## 3. Adding a New Project

Copy and fill in this object in the `items` array in `data/projects.json`:

```json
{
  "id": "project_id",
  "title": "Project Title",
  "tags": ["Tag1", "Tag2"],
  "desc": "Project description here...",
  "stackLabel": "Tech Stack",
  "stack": ["Python", "FastAPI"],
  "image": "assets/images/projects/filename.png",
  "placeholder": "🤖",
  "github": "https://github.com/...",
  "demo": ""
}
```

- Leaving `image` empty will show the emoji placeholder
- Leaving `github` or `demo` empty will grey out / disable that button

---

## 4. Adding a New Certificate

Add to the `items` array in `data/certifications.json`:

```json
{
  "id": "cert_id",
  "title": "Certificate Name",
  "issuer": "Coursera",
  "provider": "University Name",
  "date": "Jan 2026",
  "placeholder": "🎓",
  "image": "assets/images/certs/filename.jpg",
  "link": "https://verify-link...",
  "desc": "What you learned...",
  "skillsLabel": "Skills Learned",
  "skills": ["Skill1", "Skill2"]
}
```

Place the image in the `assets/images/certs/` folder.

---

## 5. Updating Experience (Jobs)

Add to the `items` array in `data/experience.json`:

```json
{
  "id": "exp_id",
  "company": "Company Name",
  "location": "City",
  "period": "Jan 2026 – Present",
  "role": "Your Role",
  "desc": "What you did there...",
  "stackLabel": "Tech Stack",
  "stack": ["Python", "LangChain"],
  "image": "assets/images/companies/company.png",
  "placeholder": "🏢",
  "links": [
    { "label": "Company Site", "href": "https://...", "type": "external" },
    { "label": "LinkedIn",     "href": "https://...", "type": "linkedin" }
  ]
}
```

Place the logo in the `assets/images/companies/` folder.

---

## 6. Changing the Hero Photo

1. Place the new photo at: `assets/images/hero/shuaib1.png`
2. For mobile: `assets/images/hero/shuaib-mobile.jpeg`
3. Update the path in `data/hero.json` if the filename is different

---

## 7. Updating Social Links / Contact

All links are in one place: `data/links.json`

- GitHub URL
- LinkedIn URL
- Email address
- WhatsApp number (format: `wa.me/923XXXXXXXXX`)
- Phone numbers
- Resume PDF path

---

## 8. Adding a Blog Post

Add to `data/blog.json`:

```json
{
  "title": "Article Title",
  "desc": "Short description...",
  "date": "Jun 2026",
  "link": "https://medium.com/...",
  "tags": ["AI", "LLM"]
}
```

---

## 9. Updating Skills

`data/skills.json` contains categories.
In each category, add or remove skill names from the `skills` array.

---

## Quick Reminder — After any change

1. Save the file
2. Press `Ctrl+Shift+R` in the browser (hard refresh)
3. The change will appear — no build or compile step needed

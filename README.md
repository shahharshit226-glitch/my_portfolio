<div align="center">

# 🌐 Harshit Shah — Developer Portfolio

**A personal portfolio website showcasing projects, skills, experience, and startup work.**

[![Live Site](https://img.shields.io/badge/Live%20Site-Visit-63dcb4?style=for-the-badge&logoColor=white)](https://your-portfolio-link.com)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![License](https://img.shields.io/badge/License-MIT-f5c842?style=for-the-badge)](LICENSE)

</div>

---

## ✨ Features

- **Responsive Design** — Works seamlessly on mobile, tablet, and desktop
- **Smooth Animations** — Scroll-triggered reveals, floating avatar, and staggered section entrances
- **Dark Theme** — Deep dark background with teal (`#63dcb4`) and amber (`#f5c842`) accent palette
- **Active Nav Highlighting** — Navigation updates based on the currently visible section
- **Project Showcase** — Cards with live demo links, GitHub links, tech badges, and highlight bullets
- **Contact Form** — Opens native mail client pre-filled with message details
- **Zero Dependencies** — Pure React + CSS-in-JS, no external UI library

---

## 🗂️ Sections

| Section | Description |
|---|---|
| **Hero** | Name, tagline, status badge, photo avatar, CTA buttons |
| **About** | Bio, university info, core interests |
| **Experience & Achievements** | Elabs Society role + LeetCode / CodeChef / GPA stats |
| **Skills** | Languages, frameworks, databases, AI/ML tools |
| **Projects** | ResaleBrt, AI Resume Analyzer, E-Complaint System, Spotify Clone |
| **Contact** | Social links + email contact form |

---

## 🚀 Projects Featured

### [ResaleBrt](https://resalebrt.com) — Live Startup MVP
> A local resale marketplace built for Biratnagar. Admin-reviewed listings, WhatsApp seller contact, and a fast listing flow.
> **Stack:** Next.js · TypeScript · Supabase · Tailwind CSS

### [AI Resume Analyzer](https://resume-analyzer-agent-2llu.vercel.app)
> NLP-powered resume parser with ATS scoring, skill extraction via spaCy, and an email-based agentic pipeline.
> **Stack:** FastAPI · React · spaCy · Python · Tailwind CSS

### E-Complaint Management System
> Full-stack complaint tracking app with admin dashboard, real-time status updates, and MongoDB backend.
> **Stack:** Node.js · Express.js · MongoDB · HTML/CSS/JS

### Spotify Clone v2
> Pixel-perfect Spotify frontend clone with interactive player controls and dynamic playlist UI.
> **Stack:** JavaScript · HTML5 · CSS3

---

## 🛠️ Tech Stack

```
Frontend    React 18, CSS-in-JS (style tags), Google Fonts (Syne + DM Sans)
Animations  IntersectionObserver API, CSS keyframes, CSS transitions
Tooling     Vite (recommended), npm
```

---

## 📦 Getting Started

### Prerequisites
- Node.js `v18+`
- npm or yarn

### Installation

```bash
# Clone the repo
git clone https://github.com/shahharshit226-glitch/portfolio.git
cd portfolio

# Install dependencies
npm install

# Start dev server
npm run dev
```

### Build for Production

```bash
npm run build
npm run preview
```

---

## 🗃️ Project Structure

```
src/
├── App.jsx          # Entire portfolio — data, components, styles
└── main.jsx         # React entry point
```

> All sections, data, and styles live in `App.jsx` for simplicity. To customize, edit the `PROFILE`, `PROJECTS`, `SKILLS`, and `EXPERIENCE` constants at the top of the file.

---

## ✏️ Customization

To make this your own, update the constants at the top of `App.jsx`:

```js
const PROFILE = {
  name: "Your Name",
  tagline: "Your Tagline",
  github: "https://github.com/yourusername",
  linkedin: "https://linkedin.com/in/yourprofile",
  email: "you@email.com",
  photo: "https://your-photo-url.com/photo.jpg",
  ...
};
```

Similarly update `PROJECTS`, `SKILLS`, `EXPERIENCE`, and `ACHIEVEMENTS` arrays.

---

## 🌐 Deployment

This project deploys perfectly on:

| Platform | Command |
|---|---|
| **Vercel** | `vercel --prod` |
| **Netlify** | Drag & drop `dist/` folder |
| **GitHub Pages** | Use `gh-pages` package |

---

## 📬 Contact

| Platform | Link |
|---|---|
| GitHub | [@shahharshit226-glitch](https://github.com/shahharshit226-glitch) |
| LinkedIn | [harshitshah506](https://www.linkedin.com/in/harshitshah506) |
| Email | shahharshit226@gmail.com |
| Startup | [resalebrt.com](https://resalebrt.com) |

---

<div align="center">

Made with ☕ and React by **Harshit Shah**

</div>
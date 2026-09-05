# Amarjeet Kushwaha — Developer Portfolio

A modern, premium, fully responsive personal portfolio website for **Amarjeet Kushwaha**, Software Developer & Full-Stack Developer.

Built with React, TypeScript, Vite, Tailwind CSS v4, and Framer Motion. Dark theme by default with a light/dark toggle, glassmorphism, animated scroll reveals, and a central data file so every piece of content is editable in one place.

---

## ✨ Features

- **15 sections**: Navbar, Hero, About, Technical Skills, Soft Skills, Experience/Education, Projects, Hackathons, Achievements, Certifications, Coding Profiles, Social Media, Resume, Contact, Footer
- **Premium design**: dark theme default, glassmorphism cards, gradient accents, animated blobs, grid backdrop
- **Dark / light mode** with localStorage persistence and no flash on load
- **Animated statistics** (count-up on scroll) in the About section
- **Project filtering** (All / Full Stack / Frontend / Backend / AI / Other)
- **Certificate lightbox modal** (click to view full-screen, Escape to close)
- **Scroll-spy navbar** with translucent blur on scroll, animated mobile hamburger menu
- **Scroll progress bar**, back-to-top button, branded loading splash
- **Toast notifications** (copy email, form feedback)
- **Copy email button** and Formspree-ready contact form (demo mode until configured)
- **Custom 404 page**
- **SEO**: meta description, Open Graph, Twitter cards, favicon, semantic HTML
- **Accessibility**: semantic landmarks, focus states, ARIA labels, keyboard support, `prefers-reduced-motion` support
- **Responsive** from 375px to 1920px+, no horizontal scrolling

## 🛠 Tech Stack

| Layer     | Tools                                                     |
| --------- | --------------------------------------------------------- |
| Frontend  | React 19, TypeScript, Vite 8                              |
| Styling   | Tailwind CSS v4 (`@tailwindcss/vite`)                     |
| Animation | Framer Motion (respects reduced motion)                   |
| Icons     | Lucide React + inline brand SVGs (lucide dropped brands)  |
| Routing   | React Router (home + custom 404)                          |

## 🚀 Getting Started

```bash
# install
npm install

# start dev server → http://localhost:5173
npm run dev

# type-check + production build
npm run build

# preview the production build → http://localhost:4173
npm run preview
```

## 📝 Customizing Your Content

**Everything** on the site is driven by one file: [`src/data/portfolio.ts`](src/data/portfolio.ts).

| What to change                         | Where                                                      |
| -------------------------------------- | ---------------------------------------------------------- |
| Name, role, email, location, tagline   | `personalInfo`                                             |
| All social links (GitHub, LinkedIn…)   | `socialLinks`                                              |
| Rotating hero titles                   | `rotatingTitles`                                           |
| Animated stat counters                 | `stats` (set real numbers)                                 |
| Skills categories                      | `skills`                                                   |
| Soft skills                            | `softSkills`                                               |
| Education / experience timeline        | `timeline`                                                 |
| Projects (set `featured: true` for big cards, `github`/`demo` URLs enable buttons) | `projects` |
| Hackathons (ranks are highlighted automatically for wins) | `hackathons`            |
| Achievements                           | `achievements`                                             |
| Certificates (set `image` + `verifyUrl`) | `certificates`                                           |
| Coding platform usernames & stats      | `codingProfiles`                                           |
| Contact form (Formspree endpoint)      | `formspreeEndpoint`                                        |

Entries marked with a dashed **Placeholder** badge are meant to be replaced — the badge disappears once you remove the `placeholder: true` flag.

### Replacing your photo

1. Drop your photo at `public/images/profile.jpg` (square or 1:1 works best).
2. That's it — `personalInfo.profileImage` already points there. If the file is missing, a stylized placeholder (`public/images/profile.svg`) is shown automatically.

### Replacing the resume

Replace `public/resume/Amarjeet-Kushwaha-Resume.pdf` with your real resume (same filename), or update the path in `personalInfo.resume`.

### Certificate images

Add images to `public/images/certificates/` and reference them via each certificate's `image` field.

## 📁 Project Structure

```
portfolio/
├── public/
│   ├── images/              # profile + certificate images
│   └── resume/              # Amarjeet-Kushwaha-Resume.pdf
├── src/
│   ├── components/          # reusable UI (Navbar, Footer, Reveal, Toast, modals…)
│   ├── sections/            # one file per page section
│   ├── data/portfolio.ts    # ⭐ central content configuration
│   ├── hooks/               # useTheme
│   ├── pages/               # 404
│   ├── App.tsx              # layout + routes
│   ├── main.tsx
│   └── index.css            # Tailwind v4 theme + custom utilities
├── index.html               # SEO meta + theme bootstrap
└── vite.config.ts
```

## 🌐 Deployment

Any static host works (Vercel, Netlify, GitHub Pages):

```bash
npm run build   # outputs to dist/
```

- **Netlify/Vercel**: zero config; they detect Vite automatically. SPA fallback for the 404 route is handled by default redirects.
- **GitHub Pages**: use a `gh-pages` deploy of `dist/`; the custom 404 route requires a 404.html copy of `index.html`.

## 📄 License

Personal project — content belongs to Amarjeet Kushwaha.

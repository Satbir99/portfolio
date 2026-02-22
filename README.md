# Portfolio

A modern, responsive developer portfolio built with React and Three.js. Features a 3D hero section, smooth animations, light/dark theme, and a contact form powered by EmailJS.

---

## Features

- **3D Hero** — Immersive hero with 3D desktop scene (React Three Fiber)
- **Overview** — Introduction and service cards (Web, Mobile, Backend, Creator)
- **Experience** — Vertical timeline of work and education
- **Skills** — Technology stack with icon grid
- **Projects** — Showcase with live demos and source links
- **Blogs** — Blog section placeholder
- **Contact** — Form with 3D Earth background; emails via EmailJS
- **Theme** — Light/dark mode with persistent preference
- **Responsive** — Mobile-first layout; slide-out nav drawer on tablet and mobile; solid navbar on small screens
- **Accessibility** — Skip link, focus styles, semantic HTML, ARIA where needed

---

## Tech Stack

| Category      | Technologies |
| ------------ | ------------ |
| Framework    | React 18, Vite |
| 3D & Canvas  | Three.js, React Three Fiber, Drei |
| Styling     | Tailwind CSS |
| Animation    | Framer Motion, Lenis (smooth scroll) |
| Contact     | EmailJS |
| Other       | React Router, react-vertical-timeline-component, react-tilt |

---

## Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [npm](https://www.npmjs.com/) or yarn

---

## Getting Started

**Clone and install**

```bash
git clone https://github.com/YOUR_USERNAME/portfolio.git
cd portfolio
npm install
```

**Environment variables (optional, for Contact form)**

Create a `.env` in the project root:

```env
VITE_APP_EMAILJS_SERVICE_ID=your_service_id
VITE_APP_EMAILJS_TEMPLATE_ID=your_template_id
VITE_APP_EMAILJS_PUBLIC_KEY=your_public_key
```

Get these from [EmailJS](https://www.emailjs.com/). Without them, the contact form still renders but will show a configuration message on submit.

**Run locally**

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

**Build for production**

```bash
npm run build
npm run preview   # preview production build locally
```

---

## Project Structure

```
src/
├── assets/          # Images, icons, 3D assets
├── components/      # React components (Navbar, Hero, About, etc.)
│   ├── canvas/      # Three.js scenes (Computers, Earth, Stars)
│   └── ui/         # Shared UI (ThemeToggle, SectionDivider, etc.)
├── constants/       # Nav links, services, tech, projects, experience data
├── context/         # Theme, Lenis, Hero scroll
├── hoc/             # Section wrapper (motion + layout)
├── hooks/           # useIsMobile, useReducedMotion
├── utils/           # Motion variants, helpers
├── App.jsx
├── main.jsx
└── index.css
```

---

## Customization

- **Content** — Edit `src/constants/index.js` for nav links, services, technologies, projects, and experience entries.
- **Theme** — Colors and semantics are in `src/index.css` (CSS variables) and `tailwind.config.cjs`.
- **Sections** — Add or remove sections in `App.jsx` and register new blocks in `constants` and `components` as needed.

---

## License

MIT (or your preferred license).

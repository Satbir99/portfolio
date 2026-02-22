import {
  mobile,
  backend,
  creator,
  web,
  javascript,
  typescript,
  html,
  css,
  reactjs,
  redux,
  tailwind,
  nodejs,
  mongodb,
  git,
  figma,
  trumio,
  innovaccer,
  tigerAnalytics,
  iitRopar,
  scalerAcademy,
  unacademy,
  tataSteel,
  tataTechnologies,
  glimpseGit,
  frp,
  todo,
} from "../assets";

export const navLinks = [
  {
    id: "about",
    title: "About",
  },
  {
    id: "work",
    title: "Work",
  },
  {
    id: "projects",
    title: "Projects",
  },
  {
    id: "skills",
    title: "Skills",
  },
  {
    id: "blogs",
    title: "Blogs",
  },
  {
    id: "contact",
    title: "Contact",
  },
];

const services = [
  {
    title: "Senior Frontend Architect",
    icon: web,
  },
  {
    title: "Product-Driven Engineer",
    icon: mobile,
  },
  {
    title: "Full-Stack Integrator",
    icon: backend,
  },
  {
    title: "Technical Mentor",
    icon: creator,
  },
];

const technologies = [
  {
    name: "HTML 5",
    icon: html,
  },
  {
    name: "CSS 3",
    icon: css,
  },
  {
    name: "JavaScript",
    icon: javascript,
  },
  {
    name: "TypeScript",
    icon: typescript,
  },
  {
    name: "React JS",
    icon: reactjs,
  },
  {
    name: "Redux Toolkit",
    icon: redux,
  },
  {
    name: "Tailwind CSS",
    icon: tailwind,
  },
  {
    name: "Node JS",
    icon: nodejs,
  },
  {
    name: "MongoDB",
    icon: mongodb,
  },
  {
    name: "git",
    icon: git,
  },
  {
    name: "figma",
    icon: figma,
  },
];

const experiences = [
  {
    title: "Software Development Engineer",
    company_name: "Trumio",
    icon: trumio,
    iconBg: "#ffffff",
    date: "June 2025 - Present",
    points: [
      "Architected Udemy Business integration dashboard using React and FastAPI, enabling real-time tracking of learning analytics and course progress for 500+ users.",
      "Built scalable Full-Stack feature set to centralize learning paths, reducing manual reporting effort by 70%.",
      "Led 5+ cross-functional teams through structured sprint cycles and code reviews, improving team delivery velocityby 22%",
      "Developed reusable frontend components and data-driven visualizations (Recharts), improving page load times by ~20% and ensuring platform-wide UI consistency.",
      "Owned end-to-end delivery for 4+ client programs, managing the full lifecycle from Figma-based requirements to production-grade deployment with 95% on-time delivery.",
    ],
  },
  {
    title: "Software Development Engineer",
    company_name: "Innovaccer",
    icon: innovaccer,
    iconBg: "#0037FF",
    date: "July 2024 - May 2025",
    points: [
      "Developed 8+ micro-frontend modules using React, Redux Thunk, and TypeScript, accelerating the delivery of business-critical functionality.",
      "Refactored 17 legacy class-based modules into functional components with 95% test coverage, reducing technical debt by 30%.",
      "Translated Figma UX designs into pixel-perfect, responsive UIs for 5+ redesigned screens, ensuring 100% functional parity.",
      "Upgraded core Design Systems (v2.7.0 to v4.4.0), resolving 15+ failing test cases and enabling more stable, faster deployment cycles.",
      "Reduced UI defects by 15% by creating a generalized, reusable SideSheet and form components adopted across 12+ flows."
    ],
  },
  {
    title: "Senior Engineer",
    company_name: "Tiger Analytics",
    icon: tigerAnalytics,
    iconBg: "#ffffff",
    date: "January 2022 - January 2023",
    points: [
      "Spearheaded a configuration-driven management app using Redux Toolkit and Material UI, enabling rapid customization for 5+ enterprise projects.",
      "Optimized page performance by 25% through strategic code-splitting, memoization, and bundle optimization in data-heavy workflows.",
      "Engineered a scalable dashboard table with virtualized rendering to handle 10,000+ records, significantly reducing memory usage.",
      "Raised 120+ PRs for critical bug fixes and UI refinements, boosting overall team velocity by 30% within tight sprint windows."
    ],
  },
  {
    title: "Teaching Assistant",
    company_name: "IIT Ropar",
    icon: iitRopar,
    iconBg: "#ffffff",
    date: "May 2021 - June 2022",
    points: [
      "Core Courses: Analysis & Design of Algorithms, Data Structures (GE103), and Discrete Mathematics.",
      "Facilitated lab sessions and evaluated complex assignments for 100+ students, ensuring a deep understanding of core computing principles.",
      "Managed plagiarism detection workflows and maintained high academic standards in the grading of exams and quizzes.",
    ],
  },
  {
    title: "Technical Content Writer",
    company_name: "Scaler",
    icon: scalerAcademy,
    iconBg: "#ffffff",
    date: "December 2021 - December 2023",
    points: [
      "Authored 18+ deep-dive technical articles covering core CS pillars, including DBMS, SQL, C Programming, and Data Structures.",
      "Contributed specialized content to Scaler’s Machine Learning course platform, ensuring technical accuracy and pedagogical clarity.",
      "ranslated complex engineering concepts into high-quality, accessible documentation for a global audience of learners.",
    ],
  },
  {
    title: "Iconic Mentor (GATE)",
    company_name: "Unacademy",
    icon: unacademy,
    iconBg: "#ffffff",
    date: "March 2021 - August 2022",
    points: [
      "Mentored 700+ students through the rigors of GATE preparation, focusing on technical clarity and mental resilience.",
      "Maintained a 97% Coach Rating over 800+ sessions, reflecting a deep commitment to user (aspirant) success and clear technical instruction.",
      "Monitored student progress through data-driven milestones, identifying bottlenecks and implementing corrective action plans to ensure exam readiness.",
    ],
  },
  {
    title: "Vocational Intern",
    company_name: "Tata Steel",
    icon: tataSteel,
    iconBg: "#ffffff",
    date: "February 2018 - April 2018",
    points: [
      "Made a research report about SharePoint and Office365 under the guidance of Mr. Shailesh Kumar",
      "Leveraged knowledge in using document & content management tools like SharePoint and Office 365.",
    ],
  },
  {
    title: "Web Developer Intern",
    company_name: "Tata Technologies",
    icon: tataTechnologies,
    iconBg: "#ffffff",
    date: "June 2017 - July 2017",
    points: [
      "Developed Web application to manage complaints of the customers in a team of 5 members.",
      "Worked with Front End web development tools like HTML, CSS, Bootstrap, JavaScript, and jQuery",
      "Integrated PHP with MYSQL using the XAMPP server",
    ],
  },
];

const testimonials = [
  {
    testimonial:
      "I thought it was impossible to make a website as beautiful as our product, but Rick proved me wrong.",
    name: "Sara Lee",
    designation: "CFO",
    company: "Acme Co",
    image: "https://randomuser.me/api/portraits/women/4.jpg",
  },
  {
    testimonial:
      "I've never met a web developer who truly cares about their clients' success like Rick does.",
    name: "Chris Brown",
    designation: "COO",
    company: "DEF Corp",
    image: "https://randomuser.me/api/portraits/men/5.jpg",
  },
  {
    testimonial:
      "After Rick optimized our website, our traffic increased by 50%. We can't thank them enough!",
    name: "Lisa Wang",
    designation: "CTO",
    company: "456 Enterprises",
    image: "https://randomuser.me/api/portraits/women/6.jpg",
  },
];

const projects = [
  {
    name: "Glimpse Git",
    description:
      "An App that highlights the Github Statistics. You can search a user by its Github user Id. Try it Out!",
    tags: [
      {
        name: "react",
        color: "blue-text-gradient",
      },
      {
        name: "styled-components",
        color: "green-text-gradient",
      },
      {
        name: "fusion-charts",
        color: "pink-text-gradient",
      },
    ],
    image: glimpseGit,
    source_code_link: "https://github.com/RIBTAS007/github-users",
    live_preview_link: "https://glimpsegit.netlify.app/",
  },
  {
    name: "Fast React Pizza",
    description:
      "A responsive web application that enables users to order pizza, enforced priority orders, order tracking with unique IDs and flexible order modification functionalities.",
    tags: [
      {
        name: "react",
        color: "blue-text-gradient",
      },
      {
        name: "tailwind",
        color: "green-text-gradient",
      },
      {
        name: "react-router",
        color: "pink-text-gradient",
      },
    ],
    image: frp,
    source_code_link: "https://github.com/RIBTAS007/fast-react-pizza",
    live_preview_link: "https://ribtas007.github.io/fast-react-pizza/",
  },
  {
    name: "Task Zenith",
    description:
      "A responsive todo application with AuthO authentication. Users can do CRUD operation for todo with status tracking, users can filter items based on task status.",
    tags: [
      {
        name: "react",
        color: "blue-text-gradient",
      },
      {
        name: "framer-motion",
        color: "green-text-gradient",
      },
      {
        name: "redux-toolkit",
        color: "pink-text-gradient",
      },
    ],
    image: todo,
    source_code_link: "https://github.com/RIBTAS007/todo",
    live_preview_link: "https://taskzenith.netlify.app/",
  },
];

const blogs = [
  {
    title: "Recoverability in DBMS",
    tag: "DBMS",
    description:
      "Learn about recoverable and irrecoverable schedules, followed by cascadeless and cascade rollback recoverable schedules.",
    link: "https://www.scaler.com/topics/dbms/recoverability-in-dbms/",
  },
  {
    title: "What is CSS rotate()?",
    tag: "CSS",
    description:
      "Learn how to utilize the CSS rotate function through this article, which includes syntax explanations and illustrative examples.",
    link: "https://www.scaler.com/topics/css/css-rotate/",
  },
  {
    title: "Transpose of a Matrix",
    tag: "DSA in C++",
    description:
      "This article explains transposing a 2D matrix, providing explanations of the algorithm, code snippets, and illustrative examples.",
    link: "https://www.scaler.com/topics/transpose-of-a-matrix/",
  },
];

export const BLOGS_READ_MORE_LINK = "https://www.scaler.com/topics/author/satbir-singh/";

export { services, technologies, experiences, testimonials, projects, blogs };

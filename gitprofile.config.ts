// gitprofile.config.ts

const CONFIG = {
  github: {
    username: 'sudo-self',
  },
  base: '/',
  projects: {
    github: {
      display: true,
      header: 'Github Projects',
      mode: 'automatic',
      automatic: {
        sortBy: 'stars',
        limit: 8,
        exclude: {
          forks: false,
          projects: [],
        },
      },
      manual: {
        projects: ['sudo-self/repo-to-txt', 'sudo-self/'],
      },
    },
    external: {
      header: 'Google Play Developers',
      projects: [
        {
          title: 'NeoMoji',
          description:
            'Neomoji redefines how you interact with emojis, blending the futuristic aesthetic of the Matrix with the practicality and simplicity of a modern emoji tool',
          imageUrl:
            'https://sudo-self.com/neomoji.png',
          link: 'https://play.google.com/store/apps/details?id=app.vercel.neomoji.twa&pcampaignid=web_share',
        },
        {
          title: 'Google Developer',
          description:
            'Crafting innovative apps with precision and passion. Jesse delivers exceptional experiences every single time.',
          imageUrl:
            'https://play-lh.googleusercontent.com/s74hZMI5Id0NWSdqO3Ua4Kd10LMV02B5XM7UmsMoz5Ca9ZXZZOSN2Q5u8d-FQwe9kcw=s188',
          link: 'https://play.google.com/store/apps/dev?id=5617955831297880975&hl=en-US',
        },
      ],
    },
  },
  seo: {
    title: 'sudo-self.github.io',
    description: 'A Jekyll themed git protfolio sudo-self',
    imageURL: 'https://avatars.githubusercontent.com/u/119916323?v=4',
  },
  social: {
    linkedin: 'Jrs/developments',
    x: 'ilostmyipad',
    mastodon: 'sudo-self',
    researchGate: '',
    facebook: '',
    instagram: '',
    reddit: '',
    threads: '',
    youtube: '',
    udemy: '',
    dribbble: '',
    behance: '',
    medium: 'sudo-self',
    dev: 'sudo-self',
    stackoverflow: '',
    skype: '',
    telegram: '',
    website: 'https://sudo-self.com',
    phone: '',
    email: 'me@JesseJesse.xyz',
  },
  resume: {
    fileUrl: 'https://me.jessejesse.com/',
  },
  skills: [
    'PHP',
    'Laravel',
    'JavaScript',
    'React.js',
    'Node.js',
    'Nest.js',
    'MySQL',
    'PostgreSQL',
    'Git',
    'Docker',
    'PHPUnit',
    'CSS',
    'Antd',
    'Tailwind',
  ],
  experiences: [
    {
      company: 'Cable One (CABO)',
      position: 'Technical Support',
      from: 'September 2018',
      to: 'January 2021',
      companyLink: 'https://www.cableone.biz',
    },
    {
      company: 'Apple Inc.',
      position: 'Genius Bar',
      from: 'July 2023',
      to: 'August 2024',
      companyLink: 'https://apple.com',
    },
  ],
  certifications: [
    {
      name: 'Tech+',
      body: 'CompTia',
      year: 'March 2025',
      link: 'https://www.credly.com/badges/c8de13c5-ae1d-42c3-8d2e-96cb8a0b2bc7/public_url',
    },
  ],
  educations: [
    {
      institution: 'CTU',
      degree: 'Information Technology',
      from: '2019',
      to: '2023',
    },
    {
      institution: 'Intellitec College',
      degree: 'Comp Service Technician',
      from: '2024',
      to: 'Present',
    },
  ],
    publications: [
      {
        title: 'npm i sudo-3d',
        conferenceName: '',
        journalName: 'node',
        authors: 'sudo-self',
        link: 'https://www.npmjs.com/package/sudo-3d',
        description:
          'The package prompts for the URL to your 3D .glb file and if no URL will use the default then start a local dev server. Instant 3D scene setup with one model. cd sudo-3d & vite build',
      },
      {
        title: 'Node.js v22',
        conferenceName: '',
        journalName: 'Open-Source',
        authors: 'sudo-self',
        link: 'https://nodejs.org/en',
        description:
          'Node.js is an open-source, cross-platform JavaScript runtime environment that allows developers to execute JavaScript code outside of a web browser. Traditionally, JavaScript was primarily used for client-side (frontend) web development to create interactive web pages. Node.js extends JavaScript scapabilities by enabling it to be used for server-side (backend) development, command-line tools, and other applications.',
      },
    ],
  blog: {
    source: 'dev',
    username: 'sudo-self',
    limit: 2,
  },
  googleAnalytics: {
    id: '',
  },
  hotjar: {
    id: '',
    snippetVersion: 6,
  },
  themeConfig: {
    defaultTheme: 'lofi',
    disableSwitch: false,
    respectPrefersColorScheme: false,
    displayAvatarRing: true,
    themes: [
      'light',
      'dark',
      'cupcake',
      'bumblebee',
      'emerald',
      'corporate',
      'synthwave',
      'retro',
      'cyberpunk',
      'valentine',
      'halloween',
      'garden',
      'forest',
      'aqua',
      'lofi',
      'pastel',
      'fantasy',
      'wireframe',
      'black',
      'luxury',
      'dracula',
      'cmyk',
      'autumn',
      'business',
      'acid',
      'lemonade',
      'night',
      'coffee',
      'winter',
      'dim',
      'nord',
      'sunset',
      'procyon',
    ],
    customTheme: {
      primary: '#fc055b',
      secondary: '#219aaf',
      accent: '#e8d03a',
      neutral: '#2A2730',
      'base-100': '#E3E3ED',
      '--rounded-box': '3rem',
      '--rounded-btn': '3rem',
    },
  },
footer: `
  <div class="flex justify-center items-center space-x-2">
    <a href="https://sudo-self.com" target="_blank" rel="noreferrer">
      <img src="https://img.shields.io/badge/sudoself-.com-cyan" alt="Website Badge" />
    </a>
  </div>
`,
  enablePWA: true,
};

export default CONFIG;









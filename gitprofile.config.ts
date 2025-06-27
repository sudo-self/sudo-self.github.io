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
          projects: [], // Example: ['sudo-self/my-project1']
        },
      },
      manual: {
        projects: ['sudo-self/gitprofile', 'sudo-self/pandora'],
      },
    },
    external: {
      header: 'Projects',
      projects: [
        {
          title: 'Project Name',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc ut.',
          imageUrl:
            'https://img.freepik.com/free-vector/illustration-gallery-icon_53876-27002.jpg',
          link: 'https://example.com',
        },
        {
          title: 'Project Name',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc ut.',
          imageUrl:
            'https://img.freepik.com/free-vector/illustration-gallery-icon_53876-27002.jpg',
          link: 'https://example.com',
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
    fileUrl:
      'https://me.jessejesse.com/',
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
      title: 'Publication Title',
      conferenceName: '',
      journalName: 'Journal Name',
      authors: 'John Doe, Jane Smith',
      link: 'https://example.com',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    },
    {
      title: 'Publication Title',
      conferenceName: 'Conference Name',
      journalName: '',
      authors: 'John Doe, Jane Smith',
      link: 'https://example.com',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
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
  footer: `<a 
      class="text-primary" href="https://sudo-self.github.io"
      target="_blank"
      rel="noreferrer"
    >sudo-self.github.io</a>`,

  enablePWA: true,
};

export default CONFIG;


const CONFIG = {
  github: {
    username: 'sudo-self',
  },
  base: '/',  // <-- changed from '/gitprofile/' to '/' here
  projects: {
    github: {
      display: true,
      header: 'Github Repos',
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
        projects: ['sudo-self/bg-bye', 'sudo-self/deploy-buttons'],
      },
    },
    external: {
      header: 'Fullstack Development',
      projects: [
        {
          title: 'NeoMoji',
          description:
            'A matrix movie themed emoji app. Neomoji redefines how you interact with emojis, blending the futuristic aesthetic of the Matrix with the practicality and simplicity of a modern emoji tool. with 100s of emojis to choose from a Webb App turned Android, NeoMoji is available on Google Play and GitHub.',
          imageUrl:
            'https://play-lh.googleusercontent.com/IQPa0FG8yYrz9YPokFHMdMJ-tksGVx0tKFnE7Jr9xpTVY04Vu50nC8EWZ2pHjJ4QbA=w480-h960',
          link: 'https://play.google.com/store/apps/details?id=app.vercel.neomoji.twa&hl=en-US&ah=qz3Meh3QU1ecPmy4vV1G6VYh_Gg&pli=1',
        },
        {
          title: ' ',
          description: 'Tap the emoji to copy to clipboard',
          iframeUrl: 'https://neomoji.vercel.app',
        },
      ],
    },
  },
  seo: {
    title: 'Portfolio of sudo-self',
    description: '',
    imageURL: '',
  },
  social: {
    linkedin: 'JRs',
    x: 'iLostmyipad',
    researchGate: '',
    facebook: '',
    instagram: '',
    reddit: '',
    threads: '',
    youtube: '',
    udemy: '',
    dribbble: '',
    behance: '',
    dev: 'sudo-self',
    skype: '',
    telegram: '',
    website: 'https://sudo-self.com',
    phone: '',
    email: 'me@JesseJesse.xyz',
  },
  resume: {
    fileUrl:
      'https://pub-c1de1cb456e74d6bbbee111ba9e6c757.r2.dev/Jesse%20Roper%20–%20Resume.pdf',
  },
  skills: [
    'Fiber Internet',
    'RF',
    'VOIP',
    'IPTV',
    'Node.js',
    'Next.js',
    'Cloudflared Workers',
    'API',
    'MS 365',
    'macOS',
    'Python',
    'CSS',
    'Android',
    'iOS',
  ],
  experiences: [
    {
      company: 'Sparklight',
      position: 'Fiber Technician',
      from: 'September 2021',
      to: 'September 2024',
      companyLink: 'https://sparklighttv.app',
    },
    {
      company: 'First Source, LLC',
      position: 'Account Service Rep.',
      from: 'July 2018',
      to: 'August 2021',
      companyLink: 'https://www.bankofamerica.com',
    },
  ],
  certifications: [
    {
      name: 'Tech+',
      body: 'compTia',
      year: 'April 2025',
      link: 'https://codepen.io/sudo-self/pen/zxxpdPB',
    },
  ],
  educations: [
    {
      institution: 'CTU',
      degree: 'BS. Information Technology',
      from: '2021',
      to: '2024',
    },
    {
      institution: 'Intellitec College',
      degree: 'Comp Service Technician, CST',
      from: '2024',
      to: 'present',
    },
  ],
  publications: [
    {
      title: 'Dark Mode Anything',
      journalName: 'dev.to',
      authors: 'sudo-self',
      link: 'https://dev.to/sudo-self/dark-mode-23dd',
      description:
        'Life is already complicated but dark mode does not have to be. Add a class to an SVG to use as a toggle. class="dark mode" SVG onclick="toggle dark mode" The dark mode style changes background color to dark gray and text color to gray The SVG toggle style sets fill and color to dark gray width and height and cursor to pointer, Clicking the SVG will toggle dark mode on and off. Demo https://codepen.io/sudo-self/pen/zxxpdPB',
    },
    {
      title: 'Sweet Sitemap Generator',
      journalName: 'npm -i sweet-sitemap-generator',
      Usage: 'npx sweet-sitemap-generator [url]',
      authors: 'sudo-self',
      link: 'https://www.npmjs.com/package/sweet-sitemap-generator',
      description:
        'A quick local server first clone the repository from GitHub by running git clone followed by the URL Then change into the project folder by running cd sweet sitemap generator Next start the server by running node server.js After that you can create sitemaps using curl with a POST request to localhost on port 3000 or you can install the tool globally with npm and run it using npx followed by the URL you want to generate the sitemap.',
    },
  ],
  blog: {
    source: 'dev',
    username: 'sudo-self',
    limit: 4,
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
  footer: `🏴󠁧󠁢󠁥󠁮󠁧󠁿 <a 
      class="text-primary" href="https://sudo-self.com"
      target="_blank"
      rel="noreferrer"
    >sudo-self.com</a>`,
  enablePWA: true,
};

export default CONFIG;

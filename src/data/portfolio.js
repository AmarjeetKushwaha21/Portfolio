/**
 * ============================================================
 * CENTRAL PORTFOLIO CONFIGURATION
 * ============================================================
 * Every section of the site consumes data from this file.
 * Replace the placeholder values (marked "PLACEHOLDER") with
 * real information — no component edits required.
 * ============================================================
 */

export const portfolioData = {
  personalInfo: {
    name: 'Amarjeet Kushwaha',
    role: 'Software Developer & Full-Stack Developer',
    // PLACEHOLDER: fill in your contact details
    email: 'kushwahaamarjeet34@gmail.com',
    phone: '+91 9648634050',
    location: 'Crossing Republik, Ghaziabad, Uttar Pradesh, India',
    profileImage: '/images/profile.jpg',
    resume: '/resume/Amarjeet-Kushwaha-Resume.pdf',
    tagline: 'Building, learning, and solving one problem at a time.',
    intro:
      'I build scalable, user-focused web applications and enjoy solving complex problems through code. I am passionate about full-stack development, competitive programming, and building real-world products.',
    availability: 'Open to Opportunities',
  },

  socialLinks: {
    whatsapp: 'https://wa.me/919648634050',
    github: 'https://github.com/AmarjeetKushwaha21',
    linkedin: 'https://www.linkedin.com/in/amarjeet-kushwaha-2627a7397/',
    leetcode: 'https://leetcode.com/u/CSE13_058/',
    codechef: 'https://www.codechef.com/users/cse_25_058',
    codeforces: 'https://codeforces.com/profile/Amarjeet_Kushwaha',
    geeksforgeeks: 'https://www.geeksforgeeks.org/profile/kushwahaami3w9',
    instagram: 'https://www.instagram.com/amar.storyframe/',
    twitter: 'https://x.com/AmarjeetKu21',
    youtube: 'https://www.youtube.com/@amarjeetkushwaha7625',
  },

  // Rotating titles in the hero
  rotatingTitles: [
    'Full-Stack Developer',
    'Problem Solver',
    'Competitive Programmer',
    'Hackathon Enthusiast',
    'Tech Explorer',
  ],

  // PLACEHOLDER: set all counters to real numbers — they are animated on scroll
  stats: [
    { id: 'sgpa', label: 'First Year SGPA', value: 9.09, decimals: 2, animated: false },
    { id: 'projects', label: 'Projects Built', value: 0, suffix: '+' },
    { id: 'problems', label: 'Problems Solved', value: 0, suffix: '+' },
    { id: 'hackathons', label: 'Hackathons', value: 0, suffix: '' },
    { id: 'certificates', label: 'Certificates', value: 2, suffix: '' },
    { id: 'achievements', label: 'Achievements', value: 1, suffix: '' },
  ],

  // About Me section content
  aboutParagraphs: [
    'I\'m a second-year B.Tech Computer Science student at ABES Engineering College, passionate about turning ideas into real-world solutions through code. My core strengths lie in C++, Data Structures & Algorithms, JavaScript, React, and Node.js, with a growing interest in data visualization and full-stack development.',
    'I enjoy building practical projects that solve real problems while continuously sharpening my problem-solving skills on competitive programming platforms. Beyond coding, I\'m a public speaker and team leader who enjoys collaborating, communicating ideas, and taking initiative.',
    'My goal is to grow into a versatile software engineer who can combine strong problem-solving, full-stack development, and data-driven thinking to build products that create meaningful impact.',
  ],

  skills: [
    {
      id: 'languages',
      title: 'Programming Languages',
      icon: 'code',
      skills: ['C++', 'JavaScript', 'Python', 'Java'],
    },
    {
      id: 'frontend',
      title: 'Frontend',
      icon: 'layout',
      skills: ['HTML', 'CSS', 'React.js', 'Tailwind CSS', 'Bootstrap'],
    },
    {
      id: 'backend',
      title: 'Backend',
      icon: 'server',
      skills: ['Node.js', 'Express.js', 'REST APIs'],
    },
    {
      id: 'database',
      title: 'Database',
      icon: 'database',
      skills: ['MongoDB', 'MySQL', 'PostgreSQL'],
    },
    {
      id: 'tools',
      title: 'Tools',
      icon: 'tools',
      skills: ['Git', 'GitHub', 'VS Code', 'Postman'],
    },
    {
      id: 'core',
      title: 'Core Concepts & Other',
      icon: 'brain',
      skills: [
        'Data Structures & Algorithms',
        'OOP',
        'DBMS',
        'Operating Systems',
        'Computer Networks',
        'API Development',
        'Cloud',
        'AI Tools',
      ],
    },
  ],

  softSkills: [
    { name: 'Communication', description: 'Explaining technical ideas clearly to any audience.' },
    { name: 'Teamwork', description: 'Collaborating effectively toward shared goals.' },
    { name: 'Leadership', description: 'Taking ownership and guiding teams under deadlines.' },
    { name: 'Problem Solving', description: 'Breaking complex problems into clean solutions.' },
    { name: 'Time Management', description: 'Prioritizing work and delivering on schedule.' },
    { name: 'Adaptability', description: 'Learning new tools and stacks quickly.' },
    { name: 'Critical Thinking', description: 'Questioning assumptions before writing code.' },
    { name: 'Creativity', description: 'Finding unconventional, elegant approaches.' },
    { name: 'Collaboration', description: 'Working openly with code reviews and pairing.' },
    { name: 'Public Speaking', description: 'Presenting demos and technical talks.' },
  ],

  // PLACEHOLDER: replace entries — the "placeholder" flag renders a subtle badge
  timeline: [
    {
      kind: 'education',
      title: 'Bachelor of Technology',
      specialization: 'Computer Science & Engineering',
      organization: 'ABES Engineering College',
      period: '2025 — 2029',
      currentYear: '2nd Year',
      coursework: [
        'Data Structures & Algorithms',
        'Database Management Systems',
        'Operating Systems',
        'Computer Networks',
      ],
      achievement: 'First Year SGPA — 9.09',
      points: [],
    },
    {
      kind: 'experience',
      title: 'Software Developer Intern (Placeholder)',
      organization: 'Company Name',
      period: '20XX — 20XX',
      points: [
        'Describe your responsibilities and impact',
        'Technologies you used day-to-day',
      ],
      technologies: ['React', 'Node.js'],
      placeholder: true,
    },
  ],

  // PLACEHOLDER: at least 6 project slots — set featured:true for larger cards
  projects: [
    {
      id: 'project-1',
      name: 'Project One (Placeholder)',
      description: 'Short description of what this project does.',
      problem: 'The problem it solves.',
      categories: ['fullstack'],
      technologies: ['React', 'Node.js', 'MongoDB'],
      features: ['Key feature one', 'Key feature two', 'Key feature three'],
      github: '',
      demo: '',
      featured: true,
      placeholder: true,
    },
    {
      id: 'project-2',
      name: 'Project Two (Placeholder)',
      description: 'Short description of what this project does.',
      problem: 'The problem it solves.',
      categories: ['frontend'],
      technologies: ['React', 'Tailwind CSS'],
      features: ['Key feature one', 'Key feature two'],
      github: '',
      demo: '',
      featured: true,
      placeholder: true,
    },
    {
      id: 'project-3',
      name: 'Project Three (Placeholder)',
      description: 'Short description of what this project does.',
      problem: 'The problem it solves.',
      categories: ['backend'],
      technologies: ['Node.js', 'Express', 'PostgreSQL'],
      features: ['Key feature one', 'Key feature two'],
      github: '',
      demo: '',
      placeholder: true,
    },
    {
      id: 'project-4',
      name: 'Project Four (Placeholder)',
      description: 'Short description of what this project does.',
      problem: 'The problem it solves.',
      categories: ['ai'],
      technologies: ['Python', 'OpenAI API'],
      features: ['Key feature one', 'Key feature two'],
      github: '',
      demo: '',
      placeholder: true,
    },
    {
      id: 'project-5',
      name: 'Project Five (Placeholder)',
      description: 'Short description of what this project does.',
      problem: 'The problem it solves.',
      categories: ['fullstack'],
      technologies: ['React', 'Firebase'],
      features: ['Key feature one', 'Key feature two'],
      github: '',
      demo: '',
      placeholder: true,
    },
    {
      id: 'project-6',
      name: 'Project Six (Placeholder)',
      description: 'Short description of what this project does.',
      problem: 'The problem it solves.',
      categories: ['other'],
      technologies: ['Java'],
      features: ['Key feature one', 'Key feature two'],
      github: '',
      demo: '',
      placeholder: true,
    },
  ],

  // PLACEHOLDER: add your hackathons — do not fabricate rankings
  hackathons: [
    {
      id: 'hackathon-1',
      name: 'Hackathon Name (Placeholder)',
      organizer: 'Organizer',
      date: '20XX',
      team: 'Team Name / Solo',
      problemStatement: 'The problem statement you tackled.',
      solution: 'What your team built.',
      technologies: ['React', 'Node.js'],
      achievement: 'Rank / Outcome (or leave as Participated)',
      certificate: '',
      projectLink: '',
      githubLink: '',
      placeholder: true,
    },
  ],

  // PLACEHOLDER: add real achievements with proof links where possible
  achievements: [
    {
      id: 'genero-2026-gold-medal',
      title: 'Gold Medal — Business Idea Presentation',
      description:
        'Appreciated with a gold medal for the business idea presentation at GENERO 2026, organized by ABES Engineering College, Ghaziabad.',
      date: '2026',
      organization: 'ABES Engineering College, Ghaziabad',
      link: '',
      category: 'academic',
      image: '/images/achievements/genero-2026-gold-medal.jpg',
    },
  ],

  // PLACEHOLDER: add real certificates — empty image falls back to a styled placeholder
  certificates: [
    {
      id: 'dgt-copa-ntc',
      name: 'National Trade Certificate — Computer Operator & Programming Assistant (COPA)',
      organization: 'DGT, Ministry of Skill Development · Govt. of India',
      date: 'Sep 2025',
      credentialId: '250920002798658',
      image: '/images/certificates/dgt-copa-ntc.jpg',
      pdfUrl: '/certificates/dgt-copa-ntc.pdf',
      verifyUrl: '',
    },
    {
      id: 'nptel-modern-cpp',
      name: 'Programming in Modern C++ (Elite)',
      organization: 'NPTEL — IIT Kharagpur · SWAYAM',
      date: 'Jan–Apr 2026',
      credentialId: 'NPTEL26CS52S1055101056',
      image: '/images/certificates/nptel-modern-cpp.jpg',
      pdfUrl: '/certificates/nptel-modern-cpp.pdf',
      verifyUrl: '',
    },
  ],

  // Usernames below drive the LIVE stats in the Coding Profiles section —
  // values are fetched from each platform automatically (cached ~15 min).
  codingProfiles: [
    {
      platform: 'leetcode',
      username: 'CSE13_058',
      description: 'Daily problem solving and contests.',
      url: 'https://leetcode.com/u/CSE13_058/',
    },
    {
      platform: 'codechef',
      username: 'cse_25_058',
      description: 'Long challenge and Cook-Off contests.',
      url: 'https://www.codechef.com/users/cse_25_058',
    },
    {
      platform: 'codeforces',
      username: 'Amarjeet_Kushwaha',
      description: 'Div. 2 rounds and virtual contests.',
      url: 'https://codeforces.com/profile/Amarjeet_Kushwaha',
    },
    {
      platform: 'gfg',
      username: 'kushwahaami3w9',
      description: 'Practice problems and articles.',
      url: 'https://www.geeksforgeeks.org/profile/kushwahaami3w9',
    },
    {
      platform: 'hackerrank',
      username: 'kushwahaamarjee1',
      description: 'Skill certifications and challenges.',
      url: 'https://www.hackerrank.com/profile/kushwahaamarjee1',
    },
    {
      platform: 'github',
      username: 'AmarjeetKushwaha21',
      description: 'Open source and personal projects.',
      url: 'https://github.com/AmarjeetKushwaha21',
    },
  ],

  // Optional: Formspree endpoint for the contact form. Leave empty to run in demo mode.
  formspreeEndpoint: '',
}

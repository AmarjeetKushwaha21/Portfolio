/**
 * ============================================================
 * CENTRAL PORTFOLIO CONFIGURATION
 * ============================================================
 * Every section of the site consumes data from this file.
 * Replace the placeholder values (marked "PLACEHOLDER") with
 * real information — no component edits required.
 * ============================================================
 */

export interface PersonalInfo {
  name: string
  role: string
  email: string
  phone: string
  location: string
  profileImage: string
  resume: string
  tagline: string
  intro: string
  availability: string
}

export interface SocialLinks {
  whatsapp: string
  github: string
  linkedin: string
  leetcode: string
  codechef: string
  codeforces: string
  geeksforgeeks: string
  instagram: string
  twitter: string
  youtube: string
}

export interface SkillCategory {
  id: string
  title: string
  icon: 'code' | 'layout' | 'server' | 'database' | 'tools' | 'brain'
  skills: string[]
}

export interface SoftSkill {
  name: string
  description: string
}

export interface TimelineEntry {
  kind: 'education' | 'experience'
  title: string
  organization: string
  period: string
  location?: string
  points: string[]
  technologies?: string[]
  placeholder?: boolean
}

export type ProjectCategory = 'fullstack' | 'frontend' | 'backend' | 'ai' | 'other'

export interface Project {
  id: string
  name: string
  description: string
  problem: string
  categories: ProjectCategory[]
  technologies: string[]
  features: string[]
  image?: string
  github: string
  demo: string
  featured?: boolean
  placeholder?: boolean
}

export interface Hackathon {
  id: string
  name: string
  organizer: string
  date: string
  team: string
  problemStatement: string
  solution: string
  technologies: string[]
  achievement: string
  certificate: string
  projectLink: string
  githubLink: string
  placeholder?: boolean
}

export interface Achievement {
  id: string
  title: string
  description: string
  date: string
  organization: string
  link: string
  category: 'competitive' | 'hackathon' | 'academic' | 'projects' | 'leadership' | 'other'
  placeholder?: boolean
}

export interface Certificate {
  id: string
  name: string
  organization: string
  date: string
  credentialId: string
  image?: string
  verifyUrl: string
  /** Optional official PDF, linked from the certificate lightbox */
  pdfUrl?: string
  placeholder?: boolean
}

export interface CodingProfile {
  platform: 'leetcode' | 'codechef' | 'codeforces' | 'gfg' | 'hackerrank' | 'github'
  username: string
  description: string
  url: string
  stats: { label: string; value: string }[]
}

export interface StatItem {
  id: string
  label: string
  value: number
  suffix?: string
}

export interface PortfolioConfig {
  personalInfo: PersonalInfo
  socialLinks: SocialLinks
  rotatingTitles: string[]
  stats: StatItem[]
  skills: SkillCategory[]
  softSkills: SoftSkill[]
  timeline: TimelineEntry[]
  projects: Project[]
  hackathons: Hackathon[]
  achievements: Achievement[]
  certificates: Certificate[]
  codingProfiles: CodingProfile[]
  formspreeEndpoint: string
}

export const portfolioData: PortfolioConfig = {
  personalInfo: {
    name: 'Amarjeet Kushwaha',
    role: 'Software Developer & Full-Stack Developer',
    // PLACEHOLDER: fill in your contact details
    email: '',
    phone: '',
    location: '',
    profileImage: '/images/profile.jpg',
    resume: '/resume/Amarjeet-Kushwaha-Resume.pdf',
    tagline: 'Building, learning, and solving one problem at a time.',
    intro:
      'I build scalable, user-focused web applications and enjoy solving complex problems through code. I am passionate about full-stack development, competitive programming, and building real-world products.',
    availability: 'Open to Opportunities',
  } satisfies PersonalInfo,

  socialLinks: {
    // PLACEHOLDER: paste your WhatsApp link (e.g. https://wa.me/91XXXXXXXXXX)
    whatsapp: '',
    github: 'https://github.com/AmarjeetKushwaha21',
    linkedin: '',
    leetcode: 'https://leetcode.com/u/CSE13_058/',
    codechef: 'https://www.codechef.com/users/cse_25_058',
    codeforces: 'https://codeforces.com/profile/Amarjeet_Kushwaha',
    geeksforgeeks: 'https://www.geeksforgeeks.org/profile/kushwahaami3w9',
    instagram: '',
    twitter: '',
    youtube: '',
  } satisfies SocialLinks,

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
    { id: 'years', label: 'Years Learning', value: 0, suffix: '+' },
    { id: 'projects', label: 'Projects Built', value: 0, suffix: '+' },
    { id: 'problems', label: 'Problems Solved', value: 0, suffix: '+' },
    { id: 'hackathons', label: 'Hackathons', value: 0, suffix: '' },
    { id: 'certificates', label: 'Certificates', value: 0, suffix: '' },
    { id: 'achievements', label: 'Achievements', value: 0, suffix: '' },
  ] satisfies StatItem[],

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
  ] satisfies SkillCategory[],

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
  ] satisfies SoftSkill[],

  // PLACEHOLDER: replace entries — the "placeholder" flag renders a subtle badge
  timeline: [
    {
      kind: 'education',
      title: 'Bachelor of Technology (Placeholder)',
      organization: 'Your College / University',
      period: '20XX — 20XX',
      points: [
        'Relevant coursework: Data Structures, Algorithms, DBMS, Operating Systems, Computer Networks',
        'Achievements: add academic highlights here',
      ],
      placeholder: true,
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
  ] satisfies TimelineEntry[],

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
  ] satisfies Project[],

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
  ] satisfies Hackathon[],

  // PLACEHOLDER: add real achievements with proof links where possible
  achievements: [
    {
      id: 'achievement-1',
      title: 'Achievement Title (Placeholder)',
      description: 'Describe the achievement and why it matters.',
      date: '20XX',
      organization: 'Organization',
      link: '',
      category: 'competitive',
      placeholder: true,
    },
  ] satisfies Achievement[],

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
  ] satisfies Certificate[],

  // PLACEHOLDER: usernames + editable static stats (set values to "—" until known)
  codingProfiles: [
    {
      platform: 'leetcode',
      username: 'CSE13_058',
      description: 'Daily problem solving and contests.',
      url: 'https://leetcode.com/u/CSE13_058/',
      stats: [
        { label: 'Problems Solved', value: '—' },
        { label: 'Contest Rating', value: '—' },
        { label: 'Easy / Medium / Hard', value: '—' },
      ],
    },
    {
      platform: 'codechef',
      username: 'cse_25_058',
      description: 'Long challenge and Cook-Off contests.',
      url: 'https://www.codechef.com/users/cse_25_058',
      stats: [
        { label: 'Rating', value: '—' },
        { label: 'Stars', value: '—' },
        { label: 'Problems Solved', value: '—' },
      ],
    },
    {
      platform: 'codeforces',
      username: 'Amarjeet_Kushwaha',
      description: 'Div. 2 rounds and virtual contests.',
      url: 'https://codeforces.com/profile/Amarjeet_Kushwaha',
      stats: [
        { label: 'Rating', value: '—' },
        { label: 'Max Rating', value: '—' },
        { label: 'Rank', value: '—' },
      ],
    },
    {
      platform: 'gfg',
      username: 'kushwahaami3w9',
      description: 'Practice problems and articles.',
      url: 'https://www.geeksforgeeks.org/profile/kushwahaami3w9',
      stats: [
        { label: 'Problems Solved', value: '—' },
        { label: 'Institute Rank', value: '—' },
        { label: 'Score', value: '—' },
      ],
    },
    {
      platform: 'hackerrank',
      username: 'kushwahaamarjee1',
      description: 'Skill certifications and challenges.',
      url: 'https://www.hackerrank.com/profile/kushwahaamarjee1',
      stats: [
        { label: 'Badges', value: '—' },
        { label: 'Stars', value: '—' },
        { label: 'Certifications', value: '—' },
      ],
    },
    {
      platform: 'github',
      username: 'AmarjeetKushwaha21',
      description: 'Open source and personal projects.',
      url: 'https://github.com/AmarjeetKushwaha21',
      stats: [
        { label: 'Repositories', value: '—' },
        { label: 'Followers', value: '—' },
        { label: 'Contributions', value: '—' },
      ],
    },
  ] satisfies CodingProfile[],

  // Optional: Formspree endpoint for the contact form. Leave empty to run in demo mode.
  formspreeEndpoint: '',
}

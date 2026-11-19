import { BrandIcon } from './BrandIcon'
import { portfolioData } from '../data/portfolio'

const socials = [
  { name: 'github', label: 'GitHub', url: portfolioData.socialLinks.github },
  { name: 'linkedin', label: 'LinkedIn', url: portfolioData.socialLinks.linkedin },
  { name: 'instagram', label: 'Instagram', url: portfolioData.socialLinks.instagram },
  { name: 'x', label: 'X (Twitter)', url: portfolioData.socialLinks.twitter },
  { name: 'youtube', label: 'YouTube', url: portfolioData.socialLinks.youtube },
]

export function Footer() {
  const year = new Date().getFullYear()
  const availableSocials = socials.filter((s) => s.url)

  return (
    <footer className="relative mt-24 border-t border-slate-900/10 py-12 dark:border-white/10">
      <div className="section-shell flex flex-col items-center gap-8 text-center">
        <div>
          <p className="font-display text-lg font-semibold text-slate-900 dark:text-white">
            {portfolioData.personalInfo.name}
          </p>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            “{portfolioData.personalInfo.tagline}”
          </p>
        </div>

        {availableSocials.length > 0 && (
          <div className="flex items-center gap-3">
            {availableSocials.map(({ name, label, url }) => (
              <a
                key={label}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="glass-card flex size-10 items-center justify-center rounded-xl text-slate-500 transition-all hover:-translate-y-1 hover:text-indigo-500 dark:text-slate-300 dark:hover:text-indigo-300"
              >
                <BrandIcon name={name} />
              </a>
            ))}
          </div>
        )}

        <nav aria-label="Footer">
          <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-slate-500 dark:text-slate-400">
            {['About', 'Skills', 'Projects', 'Contact'].map((label) => (
              <li key={label}>
                <a
                  href={`#${label.toLowerCase()}`}
                  className="transition-colors hover:text-indigo-500 dark:hover:text-indigo-300"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <p className="text-xs text-slate-400 dark:text-slate-500">
          © {year} {portfolioData.personalInfo.name}. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

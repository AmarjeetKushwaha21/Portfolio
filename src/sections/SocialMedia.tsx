import { Mail } from 'lucide-react'
import { SectionHeading } from '../components/SectionHeading'
import { Reveal } from '../components/Reveal'
import { BrandIcon } from '../components/BrandIcon'
import { portfolioData } from '../data/portfolio'

interface SocialEntry {
  key: string
  label: string
  description: string
  url: string
  brand?: 'whatsapp' | 'linkedin' | 'instagram' | 'x' | 'youtube'
  isEmail?: boolean
}

export function SocialMedia() {
  const { socialLinks, personalInfo } = portfolioData

  const entries: SocialEntry[] = [
    { key: 'whatsapp', label: 'WhatsApp', description: 'Chat with me directly', url: socialLinks.whatsapp, brand: 'whatsapp' },
    { key: 'linkedin', label: 'LinkedIn', description: 'Professional network', url: socialLinks.linkedin, brand: 'linkedin' },
    { key: 'instagram', label: 'Instagram', description: 'Behind the scenes', url: socialLinks.instagram, brand: 'instagram' },
    { key: 'email', label: 'Email', description: 'Best way to reach me', url: personalInfo.email ? `mailto:${personalInfo.email}` : '', isEmail: true },
    { key: 'x', label: 'X / Twitter', description: 'Thoughts & tech chatter', url: socialLinks.twitter, brand: 'x' },
    { key: 'youtube', label: 'YouTube', description: 'Videos & tutorials', url: socialLinks.youtube, brand: 'youtube' },
  ]

  return (
    <section id="social" className="section-shell scroll-mt-24 py-24">
      <SectionHeading
        id="social-heading"
        eyebrow="Social Media"
        title="Find me online"
        subtitle="Every link is configured centrally in src/data/portfolio.ts."
      />

      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {entries.map((entry, i) => {
          const disabled = !entry.url
          const content = (
            <>
              <span className="glass-card flex size-11 items-center justify-center rounded-xl text-slate-600 transition-colors group-hover:text-indigo-500 dark:text-slate-300 dark:group-hover:text-indigo-300">
                {entry.brand ? (
                  <BrandIcon name={entry.brand} className="size-5" />
                ) : (
                  <Mail className="size-5" aria-hidden />
                )}
              </span>
              <div className="min-w-0">
                <p className="font-semibold text-slate-900 dark:text-white">{entry.label}</p>
                <p className="truncate text-xs text-slate-500 dark:text-slate-400">
                  {entry.isEmail && personalInfo.email ? personalInfo.email : entry.description}
                </p>
              </div>
            </>
          )

          return (
            <Reveal key={entry.key} delay={i * 0.04}>
              {disabled ? (
                <span
                  title={`Add your ${entry.label} URL in src/data/portfolio.ts`}
                  className="glass-card group flex cursor-not-allowed items-center gap-4 p-4 opacity-60"
                >
                  {content}
                </span>
              ) : (
                <a
                  href={entry.url}
                  target={entry.isEmail ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  className="glass-card group flex items-center gap-4 p-4 transition-all duration-300 hover:-translate-y-1 hover:border-indigo-500/40"
                >
                  {content}
                </a>
              )}
            </Reveal>
          )
        })}
      </div>
    </section>
  )
}

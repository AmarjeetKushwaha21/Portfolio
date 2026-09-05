import { GraduationCap, Medal, Terminal, Trophy, Code2, ExternalLink, type LucideIcon } from 'lucide-react'
import { SectionHeading } from '../components/SectionHeading'
import { Reveal } from '../components/Reveal'
import { BrandIcon } from '../components/BrandIcon'
import { portfolioData, type CodingProfile } from '../data/portfolio'

const platformMeta: Record<
  CodingProfile['platform'],
  { label: string; icon: LucideIcon | null; brand: 'github' | null; accent: string }
> = {
  leetcode: { label: 'LeetCode', icon: Code2, brand: null, accent: 'text-amber-500' },
  codechef: { label: 'CodeChef', icon: Medal, brand: null, accent: 'text-orange-500' },
  codeforces: { label: 'Codeforces', icon: Trophy, brand: null, accent: 'text-sky-500' },
  gfg: { label: 'GeeksforGeeks', icon: GraduationCap, brand: null, accent: 'text-emerald-500' },
  hackerrank: { label: 'HackerRank', icon: Terminal, brand: null, accent: 'text-green-500' },
  github: { label: 'GitHub', icon: null, brand: 'github', accent: 'text-violet-500' },
}

export function CodingProfiles() {
  return (
    <section id="coding-profiles" className="section-shell scroll-mt-24 py-24">
      <SectionHeading
        id="coding-profiles-heading"
        eyebrow="Coding Profiles"
        title="Consistency, quantified"
        subtitle="Solve → learn → repeat. Stats are editable static values in the data file."
      />

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {portfolioData.codingProfiles.map((profile, i) => {
          const meta = platformMeta[profile.platform]
          const hasUrl = Boolean(profile.url)
          return (
            <Reveal key={profile.platform} delay={i * 0.05}>
              <div className="glass-card flex h-full flex-col p-6 transition-all duration-300 hover:-translate-y-1 hover:border-indigo-500/40">
                <div className="flex items-center gap-3">
                  <span className={`flex size-10 items-center justify-center rounded-xl bg-slate-900/5 dark:bg-white/10 ${meta.accent}`}>
                    {meta.brand ? (
                      <BrandIcon name={meta.brand} className="size-5" />
                    ) : (
                      meta.icon && <meta.icon className="size-5" aria-hidden />
                    )}
                  </span>
                  <div>
                    <h3 className="font-display font-semibold text-slate-900 dark:text-white">
                      {meta.label}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      @{profile.username}
                    </p>
                  </div>
                </div>

                <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
                  {profile.description}
                </p>

                <dl className="mt-4 grid grid-cols-3 gap-2 text-center">
                  {profile.stats.map((stat) => (
                    <div
                      key={stat.label}
                      className="rounded-lg bg-slate-900/[0.04] px-2 py-2.5 dark:bg-white/5"
                    >
                      <dd className="font-display text-sm font-bold text-slate-900 dark:text-white">
                        {stat.value}
                      </dd>
                      <dt className="mt-0.5 text-[10px] leading-tight text-slate-500 dark:text-slate-400">
                        {stat.label}
                      </dt>
                    </div>
                  ))}
                </dl>

                <div className="mt-auto pt-4">
                  {hasUrl ? (
                    <a
                      href={profile.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-500 transition-colors hover:text-indigo-400 dark:text-indigo-300"
                    >
                      View Profile <ExternalLink className="size-4" aria-hidden />
                    </a>
                  ) : (
                    <span
                      title="Add your profile URL in src/data/portfolio.ts"
                      className="inline-flex cursor-not-allowed items-center gap-1.5 text-sm font-semibold text-slate-400 dark:text-slate-600"
                    >
                      View Profile <ExternalLink className="size-4" aria-hidden />
                    </span>
                  )}
                </div>
              </div>
            </Reveal>
          )
        })}
      </div>
    </section>
  )
}

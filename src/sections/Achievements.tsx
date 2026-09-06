import { Award, ExternalLink } from 'lucide-react'
import { SectionHeading } from '../components/SectionHeading'
import { Reveal } from '../components/Reveal'
import { PlaceholderBadge } from '../components/PlaceholderBadge'
import { portfolioData } from '../data/portfolio'

const categoryColors: Record<string, string> = {
  competitive: 'from-emerald-500/15 to-teal-500/15 text-emerald-500',
  hackathon: 'from-violet-500/15 to-indigo-500/15 text-violet-500',
  academic: 'from-sky-500/15 to-blue-500/15 text-sky-500',
  projects: 'from-indigo-500/15 to-cyan-500/15 text-indigo-500',
  leadership: 'from-rose-500/15 to-pink-500/15 text-rose-500',
  other: 'from-slate-500/15 to-slate-400/15 text-slate-500',
}

export function Achievements() {
  return (
    <section id="achievements" className="section-shell scroll-mt-24 py-24">
      <SectionHeading
        id="achievements-heading"
        eyebrow="Achievements"
        title="Moments worth remembering"
      />

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {portfolioData.achievements.map((achievement, i) => (
          <Reveal key={achievement.id} delay={i * 0.05}>
            <article className="glass-card group relative h-full overflow-hidden p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-500/10">
              <div
                aria-hidden
                className="absolute inset-x-0 top-0 z-10 h-1 bg-gradient-to-r from-indigo-500 to-cyan-400 opacity-0 transition-opacity group-hover:opacity-100"
              />
              {achievement.image && (
                <a
                  href={achievement.image}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`View full photo: ${achievement.title}`}
                  className="-m-6 mb-5 block overflow-hidden"
                >
                  <img
                    src={achievement.image}
                    alt={`${achievement.title} — photo`}
                    loading="lazy"
                    className="h-44 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </a>
              )}
              <span
                className={`flex size-11 items-center justify-center rounded-xl bg-gradient-to-br ${
                  categoryColors[achievement.category] ?? categoryColors.other
                } transition-transform duration-300 group-hover:scale-110`}
              >
                <Award className="size-5" aria-hidden />
              </span>

              <div className="mt-4 flex items-start justify-between gap-2">
                <h3 className="font-display font-semibold text-slate-900 dark:text-white">
                  {achievement.title}
                </h3>
                {achievement.placeholder && <PlaceholderBadge />}
              </div>

              <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                {achievement.description}
              </p>

              <div className="mt-4 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                <span>
                  {achievement.organization} · {achievement.date}
                </span>
                {achievement.link && (
                  <a
                    href={achievement.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Proof for ${achievement.title}`}
                    className="inline-flex items-center gap-1 font-semibold text-indigo-500 transition-colors hover:text-indigo-400 dark:text-indigo-300"
                  >
                    Proof <ExternalLink className="size-3.5" aria-hidden />
                  </a>
                )}
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

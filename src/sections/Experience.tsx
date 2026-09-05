import { Briefcase, GraduationCap } from 'lucide-react'
import { SectionHeading } from '../components/SectionHeading'
import { Reveal } from '../components/Reveal'
import { PlaceholderBadge } from '../components/PlaceholderBadge'
import { portfolioData } from '../data/portfolio'

export function Experience() {
  return (
    <section id="experience" className="section-shell scroll-mt-24 py-24">
      <SectionHeading
        id="experience-heading"
        eyebrow="Experience & Education"
        title="My journey so far"
      />

      <div className="relative mx-auto mt-14 max-w-3xl">
        {/* Timeline rail */}
        <div
          aria-hidden
          className="absolute top-0 bottom-0 left-4 w-px bg-gradient-to-b from-indigo-500/60 via-violet-500/40 to-transparent sm:left-1/2"
        />

        <ol className="space-y-10">
          {portfolioData.timeline.map((entry, i) => {
            const left = i % 2 === 0
            const Icon = entry.kind === 'education' ? GraduationCap : Briefcase
            return (
              <li key={`${entry.kind}-${entry.title}`} className="relative">
                {/* Node */}
                <span
                  aria-hidden
                  className="absolute top-6 left-4 z-10 flex size-8 -translate-x-1/2 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 text-white shadow-md shadow-indigo-500/30 sm:left-1/2"
                >
                  <Icon className="size-4" aria-hidden />
                </span>

                <Reveal
                  className={`pl-12 sm:w-[calc(50%-2.5rem)] sm:pl-0 ${
                    left ? 'sm:mr-auto sm:text-right' : 'sm:ml-auto'
                  }`}
                >
                  <div className="glass-card p-6 transition-transform duration-300 hover:-translate-y-1">
                    <div
                      className={`flex items-center gap-2 ${left ? 'sm:justify-end' : ''}`}
                    >
                      <p className="text-xs font-semibold tracking-wide text-indigo-500 uppercase dark:text-indigo-300">
                        {entry.period}
                      </p>
                      {entry.placeholder && <PlaceholderBadge />}
                    </div>
                    <h3 className="font-display mt-2 font-semibold text-slate-900 dark:text-white">
                      {entry.title}
                    </h3>
                    <p className="mt-0.5 text-sm text-slate-500 dark:text-slate-400">
                      {entry.organization}
                      {entry.location ? ` · ${entry.location}` : ''}
                    </p>
                    <ul
                      className={`mt-3 space-y-1.5 text-sm text-slate-600 dark:text-slate-300 ${
                        left ? 'sm:list-inside' : 'list-disc list-inside'
                      }`}
                    >
                      {entry.points.map((point) => (
                        <li key={point}>{point}</li>
                      ))}
                    </ul>
                    {entry.technologies && entry.technologies.length > 0 && (
                      <div
                        className={`mt-4 flex flex-wrap gap-1.5 ${left ? 'sm:justify-end' : ''}`}
                      >
                        {entry.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="rounded-md bg-indigo-500/10 px-2 py-0.5 text-[11px] font-medium text-indigo-600 dark:text-indigo-300"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </Reveal>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}

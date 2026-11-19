import { Calendar, ExternalLink, Medal, Trophy, Users } from 'lucide-react'
import { BrandIcon } from '../components/BrandIcon'
import { SectionHeading } from '../components/SectionHeading'
import { Reveal } from '../components/Reveal'
import { PlaceholderBadge } from '../components/PlaceholderBadge'
import { portfolioData } from '../data/portfolio'

function isWinner(achievement) {
  return /win|first|1st|rank 1|champion|grand/i.test(achievement)
}

export function Hackathons() {
  return (
    <section id="hackathons" className="section-shell scroll-mt-24 py-24">
      <SectionHeading
        id="hackathons-heading"
        eyebrow="Hackathons"
        title="Built under pressure"
        subtitle="What I've built at hackathons — every entry is a story of a long night and a working demo."
      />

      <ol className="relative mx-auto mt-14 max-w-3xl space-y-8">
        <div
          aria-hidden
          className="absolute top-0 bottom-0 left-4 w-px bg-gradient-to-b from-violet-500/60 via-indigo-500/40 to-transparent"
        />
        {portfolioData.hackathons.map((hack) => {
          const winner = !hack.placeholder && isWinner(hack.achievement)
          return (
            <li key={hack.id} className="relative pl-12">
              <span
                aria-hidden
                className={`absolute top-6 left-4 z-10 flex size-8 -translate-x-1/2 items-center justify-center rounded-full text-white shadow-md ${
                  winner
                    ? 'bg-gradient-to-br from-amber-400 to-orange-500 shadow-amber-500/30'
                    : 'bg-gradient-to-br from-violet-500 to-indigo-500 shadow-indigo-500/30'
                }`}
              >
                {winner ? <Trophy className="size-4" /> : <Medal className="size-4" />}
              </span>

              <Reveal>
                <article className="glass-card p-6 transition-transform duration-300 hover:-translate-y-1">
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                    <h3 className="font-display font-semibold text-slate-900 dark:text-white">
                      {hack.name}
                    </h3>
                    {hack.placeholder && <PlaceholderBadge />}
                    {winner && (
                      <span className="rounded-full bg-amber-500/15 px-2.5 py-0.5 text-xs font-bold text-amber-600 dark:text-amber-400">
                        🏆 {hack.achievement}
                      </span>
                    )}
                  </div>

                  <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500 dark:text-slate-400">
                    <span className="inline-flex items-center gap-1">
                      <Calendar className="size-3.5" aria-hidden /> {hack.date}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Users className="size-3.5" aria-hidden /> {hack.team}
                    </span>
                    <span>{hack.organizer}</span>
                  </div>

                  <div className="mt-4 space-y-2 text-sm">
                    <p className="text-slate-600 dark:text-slate-300">
                      <span className="font-semibold text-violet-500 dark:text-violet-300">
                        Problem:{' '}
                      </span>
                      {hack.problemStatement}
                    </p>
                    <p className="text-slate-600 dark:text-slate-300">
                      <span className="font-semibold text-violet-500 dark:text-violet-300">
                        Solution:{' '}
                      </span>
                      {hack.solution}
                    </p>
                    {!winner && hack.achievement && (
                      <p className="text-slate-600 dark:text-slate-300">
                        <span className="font-semibold text-violet-500 dark:text-violet-300">
                          Result:{' '}
                        </span>
                        {hack.achievement}
                      </p>
                    )}
                  </div>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {hack.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-md bg-violet-500/10 px-2 py-0.5 text-[11px] font-medium text-violet-600 dark:text-violet-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {(hack.projectLink || hack.githubLink || hack.certificate) && (
                    <div className="mt-4 flex items-center gap-4 text-sm font-semibold">
                      {hack.projectLink && (
                        <a
                          href={hack.projectLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-slate-700 transition-colors hover:text-indigo-500 dark:text-slate-200 dark:hover:text-indigo-300"
                        >
                          <ExternalLink className="size-4" aria-hidden /> Project
                        </a>
                      )}
                      {hack.githubLink && (
                        <a
                          href={hack.githubLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-slate-700 transition-colors hover:text-indigo-500 dark:text-slate-200 dark:hover:text-indigo-300"
                        >
                          <BrandIcon name="github" className="size-4" /> GitHub
                        </a>
                      )}
                      {hack.certificate && (
                        <a
                          href={hack.certificate}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-slate-700 transition-colors hover:text-indigo-500 dark:text-slate-200 dark:hover:text-indigo-300"
                        >
                          <Medal className="size-4" aria-hidden /> Certificate
                        </a>
                      )}
                    </div>
                  )}
                </article>
              </Reveal>
            </li>
          )
        })}
      </ol>
    </section>
  )
}

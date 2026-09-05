import { Brain, Code, Database, Layout, Server, Wrench, type LucideIcon } from 'lucide-react'
import { SectionHeading } from '../components/SectionHeading'
import { Reveal } from '../components/Reveal'
import { portfolioData, type SkillCategory } from '../data/portfolio'

const categoryIcons: Record<SkillCategory['icon'], LucideIcon> = {
  code: Code,
  layout: Layout,
  server: Server,
  database: Database,
  tools: Wrench,
  brain: Brain,
}

export function Skills() {
  return (
    <section id="skills" className="section-shell scroll-mt-24 py-24">
      <SectionHeading
        id="skills-heading"
        eyebrow="Technical Skills"
        title="Technologies I work with"
        subtitle="Organized by category — hover a card to see it come alive."
      />

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {portfolioData.skills.map((category, i) => {
          const Icon = categoryIcons[category.icon]
          return (
            <Reveal key={category.id} delay={i * 0.05}>
              <div className="glass-card group h-full p-6 transition-all duration-300 hover:-translate-y-1 hover:border-indigo-500/40">
                <div className="flex items-center gap-3">
                  <span className="flex size-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500/15 to-cyan-400/15 text-indigo-500 transition-transform duration-300 group-hover:scale-110 dark:text-indigo-300">
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <h3 className="font-display font-semibold text-slate-900 dark:text-white">
                    {category.title}
                  </h3>
                </div>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <li
                      key={skill}
                      className="rounded-lg border border-slate-900/10 bg-slate-900/[0.04] px-2.5 py-1 text-xs font-medium text-slate-700 transition-colors hover:border-indigo-500/40 hover:bg-indigo-500/10 hover:text-indigo-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:hover:text-indigo-300"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          )
        })}
      </div>
    </section>
  )
}

import {
  Brain,
  Clock,
  HeartHandshake,
  Lightbulb,
  MessageCircle,
  Mic,
  RefreshCw,
  Sparkles,
  Target,
  Users,
  type LucideIcon,
} from 'lucide-react'
import { SectionHeading } from '../components/SectionHeading'
import { Reveal } from '../components/Reveal'
import { portfolioData } from '../data/portfolio'

const softSkillIcons: LucideIcon[] = [
  MessageCircle,
  Users,
  Target,
  Lightbulb,
  Clock,
  RefreshCw,
  Brain,
  Sparkles,
  HeartHandshake,
  Mic,
]

export function SoftSkills() {
  return (
    <section id="soft-skills" className="section-shell scroll-mt-24 py-24">
      <SectionHeading
        id="soft-skills-heading"
        eyebrow="Soft Skills"
        title="How I work with people"
      />

      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {portfolioData.softSkills.map((skill, i) => {
          const Icon = softSkillIcons[i % softSkillIcons.length]
          return (
            <Reveal key={skill.name} delay={i * 0.04}>
              <div className="glass-card group h-full p-5 text-center transition-all duration-300 hover:-translate-y-1 hover:border-violet-500/40">
                <span className="mx-auto flex size-10 items-center justify-center rounded-full bg-gradient-to-br from-violet-500/15 to-indigo-500/15 text-violet-500 transition-transform duration-300 group-hover:scale-110 dark:text-violet-300">
                  <Icon className="size-5" aria-hidden />
                </span>
                <h3 className="mt-3 text-sm font-semibold text-slate-900 dark:text-white">
                  {skill.name}
                </h3>
                <p className="mt-1.5 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                  {skill.description}
                </p>
              </div>
            </Reveal>
          )
        })}
      </div>
    </section>
  )
}

import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { SectionHeading } from '../components/SectionHeading'
import { ProjectCard } from '../components/ProjectCard'
import { portfolioData, type ProjectCategory } from '../data/portfolio'

const filters: { label: string; value: ProjectCategory | 'all' }[] = [
  { label: 'All', value: 'all' },
  { label: 'Full Stack', value: 'fullstack' },
  { label: 'Frontend', value: 'frontend' },
  { label: 'Backend', value: 'backend' },
  { label: 'AI', value: 'ai' },
  { label: 'Other', value: 'other' },
]

export function Projects() {
  const [active, setActive] = useState<ProjectCategory | 'all'>('all')

  const visible = useMemo(
    () =>
      active === 'all'
        ? portfolioData.projects
        : portfolioData.projects.filter((p) => p.categories.includes(active)),
    [active],
  )

  return (
    <section id="projects" className="section-shell scroll-mt-24 py-24">
      <SectionHeading
        id="projects-heading"
        eyebrow="Projects"
        title="Things I've built"
        subtitle="A selection of my work — filter by category to explore."
      />

      {/* Filter pills */}
      <div className="mt-10 flex flex-wrap justify-center gap-2">
        {filters.map(({ label, value }) => (
          <button
            key={value}
            type="button"
            onClick={() => setActive(value)}
            aria-pressed={active === value}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition-all ${
              active === value
                ? 'bg-gradient-to-r from-indigo-500 to-violet-500 text-white shadow-md shadow-indigo-500/30'
                : 'glass text-slate-600 hover:text-indigo-500 dark:text-slate-300 dark:hover:text-indigo-300'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <motion.div layout className="mt-10 grid auto-rows-fr gap-6 sm:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {visible.map((project, i) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <ProjectCard project={project} index={i} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {visible.length === 0 && (
        <p className="mt-10 text-center text-sm text-slate-500 dark:text-slate-400">
          No projects in this category yet.
        </p>
      )}
    </section>
  )
}

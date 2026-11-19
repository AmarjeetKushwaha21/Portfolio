import { ExternalLink } from 'lucide-react'
import { BrandIcon } from './BrandIcon'
import { PlaceholderBadge } from './PlaceholderBadge'

export function ProjectCard({ project, index }) {
  const hasGithub = Boolean(project.github)
  const hasDemo = Boolean(project.demo)

  return (
    <div className="glass-card group flex h-full flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:border-indigo-500/40 hover:shadow-xl hover:shadow-indigo-500/10">
      {/* Visual header — uniform height for every card */}
      <div
        aria-hidden
        className={`relative flex h-40 items-center justify-center overflow-hidden bg-gradient-to-br sm:h-44 ${
          index % 3 === 0
            ? 'from-indigo-500/25 via-violet-500/15 to-cyan-400/20'
            : index % 3 === 1
              ? 'from-violet-500/25 via-fuchsia-500/10 to-indigo-400/20'
              : 'from-cyan-400/25 via-indigo-500/15 to-violet-400/20'
        }`}
      >
        {project.image ? (
          <img
            src={project.image}
            alt={`Screenshot of ${project.name}`}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <span className="font-display text-4xl font-bold text-white/30 transition-transform duration-500 group-hover:scale-110">
            {project.name.charAt(0).toUpperCase()}
          </span>
        )}
        {project.featured && (
          <span className="absolute top-3 right-3 rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 px-2.5 py-0.5 text-[10px] font-bold tracking-wide text-white uppercase shadow-md">
            Featured
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-display text-lg font-semibold text-slate-900 dark:text-white">
            {project.name}
          </h3>
          {project.placeholder && <PlaceholderBadge />}
        </div>

        <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
          {project.description}
        </p>

        {project.problem && (
          <p className="mt-2 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
            <span className="font-semibold text-indigo-500 dark:text-indigo-300">Problem: </span>
            {project.problem}
          </p>
        )}

        <ul className="mt-3 space-y-1">
          {project.features.map((feature) => (
            <li
              key={feature}
              className="flex items-start gap-2 text-xs text-slate-500 dark:text-slate-400"
            >
              <span aria-hidden className="mt-1.5 size-1 shrink-0 rounded-full bg-indigo-400" />
              {feature}
            </li>
          ))}
        </ul>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="rounded-md bg-slate-900/[0.06] px-2 py-0.5 text-[11px] font-medium text-slate-600 dark:bg-white/10 dark:text-slate-300"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="mt-auto flex items-center gap-3 pt-5">
          {hasGithub ? (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-700 transition-colors hover:text-indigo-500 dark:text-slate-200 dark:hover:text-indigo-300"
            >
              <BrandIcon name="github" className="size-4" /> GitHub
            </a>
          ) : (
            <span
              title="Add your GitHub URL in src/data/portfolio.ts"
              className="inline-flex cursor-not-allowed items-center gap-1.5 text-sm font-semibold text-slate-400 dark:text-slate-600"
            >
              <BrandIcon name="github" className="size-4" /> GitHub
            </span>
          )}
          {hasDemo ? (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-700 transition-colors hover:text-indigo-500 dark:text-slate-200 dark:hover:text-indigo-300"
            >
              <ExternalLink className="size-4" aria-hidden /> Live Demo
            </a>
          ) : (
            <span
              title="Add your demo URL in src/data/portfolio.ts"
              className="inline-flex cursor-not-allowed items-center gap-1.5 text-sm font-semibold text-slate-400 dark:text-slate-600"
            >
              <ExternalLink className="size-4" aria-hidden /> Live Demo
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

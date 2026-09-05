import { Download, FileText } from 'lucide-react'
import { SectionHeading } from '../components/SectionHeading'
import { Reveal } from '../components/Reveal'
import { portfolioData } from '../data/portfolio'

export function Resume() {
  const { resume } = portfolioData.personalInfo

  return (
    <section id="resume" className="section-shell scroll-mt-24 py-24">
      <SectionHeading id="resume-heading" eyebrow="Resume" title="One page, everything that matters" />

      <Reveal className="mx-auto mt-12 max-w-xl">
        <div className="glass-card relative overflow-hidden p-8 text-center">
          <div
            aria-hidden
            className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-indigo-500 via-violet-500 to-cyan-400"
          />
          <span className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500/15 to-cyan-400/15 text-indigo-500 dark:text-indigo-300">
            <FileText className="size-7" aria-hidden />
          </span>
          <h3 className="font-display mt-4 text-lg font-semibold text-slate-900 dark:text-white">
            Amarjeet-Kushwaha-Resume.pdf
          </h3>
          <p className="mx-auto mt-2 max-w-sm text-sm text-slate-500 dark:text-slate-400">
            Replace the placeholder file at{' '}
            <code className="rounded bg-slate-900/10 px-1.5 py-0.5 text-xs dark:bg-white/10">
              public/resume/Amarjeet-Kushwaha-Resume.pdf
            </code>{' '}
            with your real resume — no code changes needed.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <a
              href={resume}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:text-indigo-500 dark:text-slate-200 dark:hover:text-indigo-300"
            >
              <FileText className="size-4" aria-hidden /> View Resume
            </a>
            <a
              href={resume}
              download="Amarjeet-Kushwaha-Resume.pdf"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/30 transition-transform hover:scale-[1.03]"
            >
              <Download className="size-4" aria-hidden /> Download Resume
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  )
}

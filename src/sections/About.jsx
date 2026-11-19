import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'
import { SectionHeading } from '../components/SectionHeading'
import { Reveal } from '../components/Reveal'
import { portfolioData } from '../data/portfolio'

function Counter({
  value,
  suffix,
  decimals = 0,
  animated = true,
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const [display, setDisplay] = useState(0)

  // Animated integers count up on scroll; static values (e.g. SGPA) render as-is
  useEffect(() => {
    if (!animated || !inView || value <= 0) return
    const duration = 1400
    const start = performance.now()
    let raf = 0
    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplay(Math.round(eased * value))
      if (progress < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [animated, inView, value])

  const text = animated
    ? String(Math.min(display, value))
    : value.toFixed(decimals)

  return (
    <span ref={ref} className="font-display tabular-nums">
      {text}
      {suffix}
    </span>
  )
}

function StatCard({ stat, index }) {
  return (
    <Reveal delay={index * 0.06}>
      <div className="glass-card group relative overflow-hidden p-5 text-center transition-transform duration-300 hover:-translate-y-1">
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-indigo-500 to-cyan-400 opacity-0 transition-opacity group-hover:opacity-100"
        />
        <p className="text-3xl font-bold text-slate-900 sm:text-4xl dark:text-white">
          <Counter
            value={stat.value}
            suffix={stat.suffix}
            decimals={stat.decimals}
            animated={stat.animated}
          />
        </p>
        <p className="mt-1.5 text-xs font-medium tracking-wide text-slate-500 uppercase dark:text-slate-400">
          {stat.label}
        </p>
      </div>
    </Reveal>
  )
}

export function About() {
  return (
    <section id="about" className="section-shell scroll-mt-24 py-24">
      <SectionHeading
        id="about-heading"
        eyebrow="About Me"
        title="A developer who loves the craft"
      />

      <div className="mt-12 grid gap-10 lg:grid-cols-2">
        <Reveal>
          <div className="glass-card h-full space-y-4 p-7 leading-relaxed text-slate-600 dark:text-slate-300">
            {portfolioData.aboutParagraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 32)}>{paragraph}</p>
            ))}
          </div>
        </Reveal>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-2">
          {portfolioData.stats.map((stat, i) => (
            <StatCard key={stat.id} stat={stat} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

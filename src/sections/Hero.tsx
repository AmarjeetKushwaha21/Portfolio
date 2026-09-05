import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Download, Mail, Sparkles } from 'lucide-react'
import { portfolioData } from '../data/portfolio'

const floatingBadges = [
  { label: 'React', className: 'left-[-8%] top-[16%]', delay: '0s' },
  { label: 'Node.js', className: 'right-[-6%] top-[28%]', delay: '0.8s' },
  { label: 'C++', className: 'left-[-12%] bottom-[22%]', delay: '1.6s' },
  { label: 'TypeScript', className: 'right-[-10%] bottom-[14%]', delay: '2.4s' },
]

export function Hero() {
  const { name, role, intro, profileImage, resume, availability } = portfolioData.personalInfo
  const titles = portfolioData.rotatingTitles
  const [titleIndex, setTitleIndex] = useState(0)
  const [imgFailed, setImgFailed] = useState(false)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    if (reduceMotion) return
    const t = window.setInterval(() => {
      setTitleIndex((i) => (i + 1) % titles.length)
    }, 2600)
    return () => window.clearInterval(t)
  }, [reduceMotion, titles.length])

  const imageSrc = imgFailed ? '/images/profile.svg' : profileImage

  return (
    <section id="home" className="relative overflow-hidden pt-28 pb-20 sm:pt-36">
      {/* Backdrop */}
      <div aria-hidden className="hero-grid pointer-events-none absolute inset-0" />
      <div
        aria-hidden
        className="animate-blob pointer-events-none absolute -top-32 -left-32 size-[28rem] rounded-full bg-indigo-500/15 blur-3xl"
      />
      <div
        aria-hidden
        className="animate-blob pointer-events-none absolute top-1/3 -right-40 size-[26rem] rounded-full bg-cyan-400/10 blur-3xl [animation-delay:4s]"
      />

      <div className="section-shell relative grid items-center gap-14 lg:grid-cols-[1.15fr_0.85fr]">
        {/* Left — text */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <span className="glass inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
            </span>
            {availability}
          </span>

          <p className="mt-6 text-lg text-slate-600 dark:text-slate-300">Hi, I'm {name.split(' ')[0]} 👋</p>

          <h1 className="font-display mt-2 text-4xl leading-tight font-bold tracking-tight text-slate-900 sm:text-5xl xl:text-6xl dark:text-white">
            {role}
          </h1>

          <div className="mt-4 flex h-9 items-center text-xl font-semibold sm:text-2xl">
            <AnimatePresence mode="wait">
              <motion.span
                key={titleIndex}
                initial={reduceMotion ? false : { y: 18, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={reduceMotion ? undefined : { y: -18, opacity: 0 }}
                transition={{ duration: 0.35 }}
                className="gradient-text"
              >
                {titles[titleIndex]}
              </motion.span>
            </AnimatePresence>
          </div>

          <p className="mt-6 max-w-xl leading-relaxed text-slate-600 dark:text-slate-400">{intro}</p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/30 transition-transform hover:scale-[1.03]"
            >
              View My Work <ArrowRight className="size-4" aria-hidden />
            </a>
            <a
              href={resume}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-slate-700 transition-colors hover:text-indigo-500 dark:text-slate-200 dark:hover:text-indigo-300"
            >
              <Download className="size-4" aria-hidden /> Download Resume
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-3 py-3 text-sm font-semibold text-slate-600 transition-colors hover:text-indigo-500 dark:text-slate-300 dark:hover:text-indigo-300"
            >
              <Mail className="size-4" aria-hidden /> Let's Connect
            </a>
          </div>
        </motion.div>

        {/* Right — portrait */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15, ease: 'easeOut' }}
          className="relative mx-auto w-full max-w-sm"
        >
          <div className={reduceMotion ? '' : 'animate-float-slow'}>
            <div className="profile-ring rounded-[2rem] p-[3px] shadow-2xl shadow-indigo-500/20">
              <img
                src={imageSrc}
                alt={`Portrait of ${name}`}
                width={400}
                height={400}
                onError={() => setImgFailed(true)}
                loading="eager"
                className="aspect-square w-full rounded-[calc(2rem-3px)] object-cover"
              />
            </div>
          </div>

          {/* Floating tech badges */}
          {floatingBadges.map(({ label, className, delay }) => (
            <span
              key={label}
              style={reduceMotion ? undefined : { animationDelay: delay }}
              className={`glass absolute ${className} animate-float rounded-full px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-md dark:text-slate-200`}
            >
              {label}
            </span>
          ))}

          <span className="glass absolute -bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-semibold whitespace-nowrap text-slate-700 shadow-lg dark:text-slate-200">
            <Sparkles className="size-3.5 text-indigo-400" aria-hidden />
            {availability}
          </span>
        </motion.div>
      </div>
    </section>
  )
}

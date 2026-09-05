import { Reveal } from './Reveal'

interface SectionHeadingProps {
  id: string
  eyebrow: string
  title: string
  subtitle?: string
  align?: 'center' | 'left'
}

export function SectionHeading({
  id,
  eyebrow,
  title,
  subtitle,
  align = 'center',
}: SectionHeadingProps) {
  const centered = align === 'center'
  return (
    <Reveal className={centered ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'}>
      <p className="text-xs font-semibold tracking-[0.25em] text-indigo-500 uppercase dark:text-indigo-300">
        {eyebrow}
      </p>
      <h2
        id={id}
        className="font-display mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white"
      >
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-base leading-relaxed text-slate-600 dark:text-slate-400">
          {subtitle}
        </p>
      )}
      <div
        aria-hidden
        className={`mt-6 h-1 w-16 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-400 ${
          centered ? 'mx-auto' : ''
        }`}
      />
    </Reveal>
  )
}

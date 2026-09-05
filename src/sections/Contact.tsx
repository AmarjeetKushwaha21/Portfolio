import { useState, type FormEvent } from 'react'
import { Copy, Mail, MapPin, Send } from 'lucide-react'
import { SectionHeading } from '../components/SectionHeading'
import { Reveal } from '../components/Reveal'
import { BrandIcon } from '../components/BrandIcon'
import { useToast } from '../components/Toast'
import { portfolioData } from '../data/portfolio'

const inputClasses =
  'w-full rounded-xl border border-slate-900/10 bg-white/70 px-4 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 transition-colors focus:border-indigo-500/60 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none dark:border-white/10 dark:bg-white/5 dark:text-slate-100'

export function Contact() {
  const { personalInfo, socialLinks, formspreeEndpoint } = portfolioData
  const { showToast } = useToast()
  const [sending, setSending] = useState(false)

  const copyEmail = async () => {
    if (!personalInfo.email) {
      showToast('Set your email in src/data/portfolio.ts first.', 'info')
      return
    }
    try {
      await navigator.clipboard.writeText(personalInfo.email)
      showToast('Email copied to clipboard!', 'success')
    } catch {
      showToast('Could not access the clipboard.', 'info')
    }
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (sending) return
    const form = e.currentTarget
    const data = new FormData(form)

    if (!formspreeEndpoint) {
      // Demo mode — wire up Formspree/EmailJS in the data file to go live
      showToast('Demo mode: connect Formspree in src/data/portfolio.ts to receive messages.', 'info')
      form.reset()
      return
    }

    setSending(true)
    try {
      const res = await fetch(formspreeEndpoint, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      })
      if (!res.ok) throw new Error(`Formspree responded with ${res.status}`)
      showToast('Message sent — thank you!', 'success')
      form.reset()
    } catch (err) {
      showToast(err instanceof Error ? `Failed to send: ${err.message}` : 'Failed to send message.', 'info')
    } finally {
      setSending(false)
    }
  }

  return (
    <section id="contact" className="section-shell relative scroll-mt-24 py-24">
      <div
        aria-hidden
        className="animate-blob pointer-events-none absolute -bottom-24 left-1/4 size-96 rounded-full bg-indigo-500/10 blur-3xl"
      />

      <SectionHeading
        id="contact-heading"
        eyebrow="Contact"
        title="Let's build something together"
        subtitle="Have an opportunity, a project, or just want to say hi? My inbox is always open."
      />

      <div className="mt-12 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        {/* Info cards */}
        <Reveal>
          <div className="flex h-full flex-col gap-4">
            <div className="glass-card flex items-center gap-4 p-5">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500/15 to-cyan-400/15 text-indigo-500 dark:text-indigo-300">
                <Mail className="size-5" aria-hidden />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold tracking-wide text-slate-500 uppercase dark:text-slate-400">
                  Email
                </p>
                {personalInfo.email ? (
                  <a
                    href={`mailto:${personalInfo.email}`}
                    className="truncate text-sm font-medium text-slate-900 transition-colors hover:text-indigo-500 dark:text-white dark:hover:text-indigo-300"
                  >
                    {personalInfo.email}
                  </a>
                ) : (
                  <p className="text-sm text-slate-400 dark:text-slate-500">
                    Add your email in the data file
                  </p>
                )}
              </div>
              <button
                type="button"
                onClick={copyEmail}
                aria-label="Copy email address"
                className="glass-card flex size-9 shrink-0 items-center justify-center rounded-lg text-slate-500 transition-colors hover:text-indigo-500 dark:text-slate-300 dark:hover:text-indigo-300"
              >
                <Copy className="size-4" aria-hidden />
              </button>
            </div>

            {socialLinks.linkedin && (
              <a
                href={socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-card flex items-center gap-4 p-5 transition-all hover:-translate-y-0.5 hover:border-indigo-500/40"
              >
                <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500/15 to-cyan-400/15 text-indigo-500 dark:text-indigo-300">
                  <BrandIcon name="linkedin" />
                </span>
                <div>
                  <p className="text-xs font-semibold tracking-wide text-slate-500 uppercase dark:text-slate-400">
                    LinkedIn
                  </p>
                  <p className="text-sm font-medium text-slate-900 dark:text-white">
                    Connect with me
                  </p>
                </div>
              </a>
            )}

            {socialLinks.github && (
              <a
                href={socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-card flex items-center gap-4 p-5 transition-all hover:-translate-y-0.5 hover:border-indigo-500/40"
              >
                <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500/15 to-cyan-400/15 text-indigo-500 dark:text-indigo-300">
                  <BrandIcon name="github" />
                </span>
                <div>
                  <p className="text-xs font-semibold tracking-wide text-slate-500 uppercase dark:text-slate-400">
                    GitHub
                  </p>
                  <p className="text-sm font-medium text-slate-900 dark:text-white">
                    See my code
                  </p>
                </div>
              </a>
            )}

            <div className="glass-card flex items-center gap-4 p-5">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500/15 to-cyan-400/15 text-indigo-500 dark:text-indigo-300">
                <MapPin className="size-5" aria-hidden />
              </span>
              <div>
                <p className="text-xs font-semibold tracking-wide text-slate-500 uppercase dark:text-slate-400">
                  Location
                </p>
                <p className="text-sm font-medium text-slate-900 dark:text-white">
                  {personalInfo.location || 'Add your location in the data file'}
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Form */}
        <Reveal delay={0.1}>
          <form onSubmit={handleSubmit} className="glass-card h-full space-y-4 p-7" noValidate={false}>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="contact-name" className="mb-1.5 block text-xs font-semibold text-slate-600 dark:text-slate-300">
                  Name
                </label>
                <input id="contact-name" name="name" type="text" required placeholder="Your name" className={inputClasses} />
              </div>
              <div>
                <label htmlFor="contact-email" className="mb-1.5 block text-xs font-semibold text-slate-600 dark:text-slate-300">
                  Email
                </label>
                <input id="contact-email" name="email" type="email" required placeholder="you@example.com" className={inputClasses} />
              </div>
            </div>
            <div>
              <label htmlFor="contact-subject" className="mb-1.5 block text-xs font-semibold text-slate-600 dark:text-slate-300">
                Subject
              </label>
              <input id="contact-subject" name="subject" type="text" required placeholder="What's this about?" className={inputClasses} />
            </div>
            <div>
              <label htmlFor="contact-message" className="mb-1.5 block text-xs font-semibold text-slate-600 dark:text-slate-300">
                Message
              </label>
              <textarea
                id="contact-message"
                name="message"
                required
                rows={5}
                placeholder="Tell me about your project or opportunity…"
                className={`${inputClasses} resize-y`}
              />
            </div>
            <button
              type="submit"
              disabled={sending}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/30 transition-all hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
            >
              <Send className="size-4" aria-hidden />
              {sending ? 'Sending…' : 'Send Message'}
            </button>
            {!formspreeEndpoint && (
              <p className="text-center text-xs text-slate-400 sm:text-left dark:text-slate-500">
                Demo mode — connect a Formspree endpoint in the data file to receive real messages.
              </p>
            )}
          </form>
        </Reveal>
      </div>
    </section>
  )
}

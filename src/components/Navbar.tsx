import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, Moon, Sun, X } from 'lucide-react'
import { useTheme } from '../hooks/useTheme'
import { portfolioData } from '../data/portfolio'

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Hackathons', href: '#hackathons' },
  { label: 'Achievements', href: '#achievements' },
  { label: 'Certificates', href: '#certificates' },
  { label: 'Contact', href: '#contact' },
]

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      className="glass-card flex size-10 items-center justify-center rounded-xl text-slate-600 transition-colors hover:text-indigo-500 dark:text-slate-300 dark:hover:text-indigo-300"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          initial={{ rotate: -90, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          exit={{ rotate: 90, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="flex"
        >
          {theme === 'dark' ? <Sun className="size-5" /> : <Moon className="size-5" />}
        </motion.span>
      </AnimatePresence>
    </button>
  )
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [active, setActive] = useState('#home')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Scroll-spy: highlight the section currently in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`)
        }
      },
      { rootMargin: '-40% 0px -55% 0px' },
    )
    for (const { href } of navLinks) {
      const el = document.getElementById(href.slice(1))
      if (el) observer.observe(el)
    }
    return () => observer.disconnect()
  }, [])

  // Lock body scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const initials = portfolioData.personalInfo.name
    .split(' ')
    .map((part) => part[0])
    .join('')

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || menuOpen ? 'glass shadow-lg shadow-slate-900/5' : 'bg-transparent'
      }`}
    >
      <nav className="section-shell flex h-16 items-center justify-between gap-4" aria-label="Main">
        <a href="#home" className="group flex items-center gap-3">
          <span className="flex size-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-400 font-display text-sm font-bold text-white shadow-md shadow-indigo-500/30">
            {initials}
          </span>
          <span className="hidden font-display font-semibold text-slate-900 sm:block dark:text-white">
            {portfolioData.personalInfo.name}
          </span>
        </a>

        {/* Desktop nav */}
        <ul className="hidden items-center gap-1 lg:flex">
          {navLinks.map(({ label, href }) => (
            <li key={href}>
              <a
                href={href}
                className={`relative rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  active === href
                    ? 'text-indigo-500 dark:text-indigo-300'
                    : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white'
                }`}
              >
                {label}
                {active === href && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-x-2 -bottom-0.5 h-0.5 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-400"
                  />
                )}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <a
            href={portfolioData.personalInfo.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden rounded-xl bg-gradient-to-r from-indigo-500 to-violet-500 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-indigo-500/30 transition-transform hover:scale-[1.03] sm:block"
          >
            Resume
          </a>
          <button
            type="button"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            className="glass-card flex size-10 items-center justify-center rounded-xl text-slate-600 lg:hidden dark:text-slate-300"
          >
            {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="glass overflow-hidden border-t border-slate-900/5 lg:hidden dark:border-white/5"
          >
            <ul className="section-shell flex flex-col gap-1 py-4">
              {navLinks.map(({ label, href }, i) => (
                <motion.li
                  key={href}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 * i }}
                >
                  <a
                    href={href}
                    onClick={() => setMenuOpen(false)}
                    className="block rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-indigo-500/10 hover:text-indigo-500 dark:text-slate-200 dark:hover:text-indigo-300"
                  >
                    {label}
                  </a>
                </motion.li>
              ))}
              <li className="pt-2">
                <a
                  href={portfolioData.personalInfo.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block rounded-xl bg-gradient-to-r from-indigo-500 to-violet-500 px-4 py-2.5 text-center text-sm font-semibold text-white"
                >
                  View Resume
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

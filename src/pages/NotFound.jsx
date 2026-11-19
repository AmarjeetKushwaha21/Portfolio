import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 px-6 text-center">
      <p className="font-display gradient-text text-7xl font-bold sm:text-8xl">404</p>
      <h1 className="font-display text-2xl font-semibold text-slate-900 dark:text-white">
        Page not found
      </h1>
      <p className="max-w-sm text-sm text-slate-500 dark:text-slate-400">
        The horizon you're looking for doesn't exist here. Let's get you back to known territory.
      </p>
      <Link
        to="/"
        className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/30 transition-transform hover:scale-[1.03]"
      >
        <ArrowLeft className="size-4" aria-hidden /> Back to Portfolio
      </Link>
    </main>
  )
}

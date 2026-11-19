import { useCallback, useEffect, useState } from 'react'
import { GraduationCap, Medal, Terminal, Trophy, Code2, ExternalLink, RefreshCw } from 'lucide-react'
import { SectionHeading } from '../components/SectionHeading'
import { Reveal } from '../components/Reveal'
import { BrandIcon } from '../components/BrandIcon'
import { portfolioData } from '../data/portfolio'
import {
  getCodingStats,
  refreshCodingStats,
} from '../services/codingStats'

const platformMeta = {
  leetcode: { label: 'LeetCode', icon: Code2, brand: null, accent: 'text-amber-500' },
  codechef: { label: 'CodeChef', icon: Medal, brand: null, accent: 'text-orange-500' },
  codeforces: { label: 'Codeforces', icon: Trophy, brand: null, accent: 'text-sky-500' },
  gfg: { label: 'GeeksforGeeks', icon: GraduationCap, brand: null, accent: 'text-emerald-500' },
  hackerrank: { label: 'HackerRank', icon: Terminal, brand: null, accent: 'text-green-500' },
  github: { label: 'GitHub', icon: null, brand: 'github', accent: 'text-violet-500' },
}

/** Turns a source value into the exact display string — never padded or rounded. */
function statValue(value) {
  if (value === null || value === undefined) return 'N/A'
  return String(value)
}

function buildStatBoxes(platform, data) {
  if (platform === 'leetcode' && data.leetcode) {
    const s = data.leetcode
    return [
      { label: 'Problems Solved', value: statValue(s.solved) },
      { label: 'Contest Rating', value: statValue(s.contestRating) },
      {
        label: 'Easy / Medium / Hard',
        value:
          s.easy === null && s.medium === null && s.hard === null
            ? 'N/A'
            : `${statValue(s.easy)} / ${statValue(s.medium)} / ${statValue(s.hard)}`,
      },
    ]
  }
  if (platform === 'codechef' && data.codechef) {
    const s = data.codechef
    return [
      { label: 'Problems Solved', value: statValue(s.solved) },
      { label: 'Rating', value: statValue(s.rating) },
      { label: 'Stars', value: s.stars === null ? 'N/A' : `${s.stars} ★` },
    ]
  }
  if (platform === 'codeforces' && data.codeforces) {
    const s = data.codeforces
    return [
      { label: 'Problems Solved', value: statValue(s.solved) },
      { label: 'Rating', value: statValue(s.rating) },
      { label: 'Max Rating', value: statValue(s.maxRating) },
      { label: 'Rank', value: s.rank ? s.rank.replace(/^\w/, (c) => c.toUpperCase()) : 'N/A' },
    ]
  }
  if (platform === 'gfg' && data.gfg) {
    const s = data.gfg
    return [
      { label: 'Problems Solved', value: statValue(s.solved) },
      { label: 'Institute Rank', value: statValue(s.instituteRank) },
      { label: 'Score', value: statValue(s.score) },
    ]
  }
  if (platform === 'hackerrank' && data.hackerrank) {
    const s = data.hackerrank
    return [
      { label: 'Badges', value: statValue(s.badges) },
      { label: 'Stars', value: statValue(s.stars) },
      { label: 'Certifications', value: statValue(s.certifications) },
    ]
  }
  if (platform === 'github' && data.github) {
    const s = data.github
    return [
      { label: 'Repositories', value: statValue(s.repositories) },
      { label: 'Followers', value: statValue(s.followers) },
      { label: 'Contributions', value: statValue(s.contributions) },
    ]
  }
  // Platform fetch failed (or unknown platform): every box shows Unavailable.
  const labels = {
    leetcode: ['Problems Solved', 'Contest Rating', 'Easy / Medium / Hard'],
    codechef: ['Problems Solved', 'Rating', 'Stars'],
    codeforces: ['Problems Solved', 'Rating', 'Max Rating', 'Rank'],
    gfg: ['Problems Solved', 'Institute Rank', 'Score'],
    hackerrank: ['Badges', 'Stars', 'Certifications'],
    github: ['Repositories', 'Followers', 'Contributions'],
  }
  return labels[platform].map((label) => ({ label, value: 'Unavailable' }))
}

function formatAgo(fetchedAt, now) {
  const seconds = Math.max(0, Math.floor((now - fetchedAt) / 1000))
  if (seconds < 60) return 'just now'
  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) return `${minutes} min ago`
  const hours = Math.floor(minutes / 60)
  return `${hours} h ago`
}

export function CodingProfiles() {
  const [stats, setStats] = useState(null)
  const [fetchedAt, setFetchedAt] = useState(null)
  const [loading, setLoading] = useState(true)
  const [now, setNow] = useState(() => Date.now())

  const load = useCallback(async (force) => {
    const usernames = Object.fromEntries(
      portfolioData.codingProfiles.map((p) => [p.platform, p.username]),
    )
    setLoading(true)
    try {
      const snapshot = force ? await refreshCodingStats(usernames) : await getCodingStats(usernames)
      setStats(snapshot.data)
      setFetchedAt(snapshot.fetchedAt)
    } finally {
      setLoading(false)
    }
  }, [])

  // Initial load: cached if fresh, otherwise a fetch. Then a slow
  // background refresh every 30 minutes — APIs are never polled rapidly.
  useEffect(() => {
    void load(false)
    const refresh = setInterval(() => void load(false), 30 * 60 * 1000)
    const tick = setInterval(() => setNow(Date.now()), 30_000)
    return () => {
      clearInterval(refresh)
      clearInterval(tick)
    }
  }, [load])

  const handleRefresh = () => {
    if (loading) return
    void load(true)
  }

  return (
    <section id="coding-profiles" className="section-shell scroll-mt-24 py-24">
      <SectionHeading
        id="coding-profiles-heading"
        eyebrow="Coding Profiles"
        title="Consistency, quantified"
        subtitle="Live statistics fetched directly from each platform — real numbers, no placeholders."
      />

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {portfolioData.codingProfiles.map((profile, i) => {
          const meta = platformMeta[profile.platform]
          const hasUrl = Boolean(profile.url)
          const statBoxes = buildStatBoxes(
            profile.platform,
            stats ?? { leetcode: null, codechef: null, codeforces: null, gfg: null, hackerrank: null, github: null },
          )
          return (
            <Reveal key={profile.platform} delay={i * 0.05}>
              <div className="glass-card flex h-full flex-col p-6 transition-all duration-300 hover:-translate-y-1 hover:border-indigo-500/40">
                <div className="flex items-center gap-3">
                  <span className={`flex size-10 items-center justify-center rounded-xl bg-slate-900/5 dark:bg-white/10 ${meta.accent}`}>
                    {meta.brand ? (
                      <BrandIcon name={meta.brand} className="size-5" />
                    ) : (
                      meta.icon && <meta.icon className="size-5" aria-hidden />
                    )}
                  </span>
                  <div>
                    <h3 className="font-display font-semibold text-slate-900 dark:text-white">
                      {meta.label}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      @{profile.username}
                    </p>
                  </div>
                </div>

                <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
                  {profile.description}
                </p>

                <dl
                  className={`mt-4 grid gap-2 text-center ${
                    statBoxes.length > 3 ? 'grid-cols-2' : 'grid-cols-3'
                  }`}
                >
                  {statBoxes.map((stat) => (
                    <div
                      key={stat.label}
                      className="rounded-lg bg-slate-900/[0.04] px-2 py-2.5 dark:bg-white/5"
                    >
                      <dd className="font-display text-sm font-bold text-slate-900 dark:text-white">
                        {loading ? (
                          <span className="text-slate-400 dark:text-slate-500">Loading…</span>
                        ) : (
                          stat.value
                        )}
                      </dd>
                      <dt className="mt-0.5 text-[10px] leading-tight text-slate-500 dark:text-slate-400">
                        {stat.label}
                      </dt>
                    </div>
                  ))}
                </dl>

                <div className="mt-auto pt-4">
                  {hasUrl ? (
                    <a
                      href={profile.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-500 transition-colors hover:text-indigo-400 dark:text-indigo-300"
                    >
                      View Profile <ExternalLink className="size-4" aria-hidden />
                    </a>
                  ) : (
                    <span
                      title="Add your profile URL in src/data/portfolio.ts"
                      className="inline-flex cursor-not-allowed items-center gap-1.5 text-sm font-semibold text-slate-400 dark:text-slate-600"
                    >
                      View Profile <ExternalLink className="size-4" aria-hidden />
                    </span>
                  )}
                </div>
              </div>
            </Reveal>
          )
        })}
      </div>

      <div className="mt-6 flex items-center justify-end gap-2 text-xs text-slate-500 dark:text-slate-400">
        <span>
          {loading && fetchedAt ? 'Updating…' : fetchedAt ? `Updated ${formatAgo(fetchedAt, now)}` : '\u00A0'}
        </span>
        <button
          type="button"
          onClick={handleRefresh}
          disabled={loading}
          title="Refresh coding statistics"
          aria-label="Refresh coding statistics"
          className="inline-flex size-7 items-center justify-center rounded-full transition-colors hover:bg-slate-900/5 hover:text-indigo-500 disabled:opacity-50 dark:hover:bg-white/10 dark:hover:text-indigo-300"
        >
          <RefreshCw className={`size-3.5 ${loading ? 'animate-spin' : ''}`} aria-hidden />
        </button>
      </div>
    </section>
  )
}

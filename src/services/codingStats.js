/**
 * ============================================================
 * LIVE CODING STATISTICS SERVICE
 * ============================================================
 * Fetches real profile statistics from each coding platform and
 * caches them so the APIs are not called excessively.
 *
 * Data sources (verified public/legitimate):
 *  - LeetCode    : community GraphQL mirror (leetcode-api-faisalshohag)
 *                  + alfa-leetcode-api for the contest rating.
 *                  LeetCode's own graphql endpoint sends no CORS
 *                  headers, so it cannot be called from a browser.
 *  - CodeChef    : public profile HTML via a CORS proxy (no official
 *                  public API exists).
 *  - Codeforces  : official Codeforces API (CORS enabled).
 *  - GFG         : public profile HTML via a CORS proxy (no official
 *                  public API exists).
 *  - HackerRank  : public profile HTML via a CORS proxy (no official
 *                  public API exists).
 *  - GitHub      : official GitHub REST API + jogruber contributions
 *                  mirror (GitHub contribution totals need GraphQL
 *                  auth, which must never live in frontend code).
 *
 * Only values the source actually returns are populated; missing
 * values stay null and render as "N/A". A failed platform fetch
 * renders as "Unavailable" without affecting the other cards.
 * ============================================================
 */

const CACHE_KEY = 'portfolio-coding-stats-v1'
/** Refetch at most every 15 minutes. */
export const STATS_TTL_MS = 15 * 60 * 1000

const emptyData = () => ({
  leetcode: null,
  codechef: null,
  codeforces: null,
  gfg: null,
  hackerrank: null,
  github: null,
})

// ---------------------------------------------------------------
// Low-level helpers
// ---------------------------------------------------------------

async function fetchJson(url, timeoutMs = 15_000) {
  const res = await withTimeout(fetch(url, { headers: { Accept: 'application/json' } }), timeoutMs)
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  return res.json()
}

function withTimeout(promise, timeoutMs) {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error('timeout')), timeoutMs)
    promise.then(
      (res) => {
        clearTimeout(timer)
        resolve(res)
      },
      (err) => {
        clearTimeout(timer)
        reject(err)
      },
    )
  })
}

/**
 * GET a same-origin-blocked HTML page through public CORS proxies.
 * Tries each proxy in order until one succeeds. These proxies are
 * community-run and occasionally down; callers must treat failure
 * as "stats unavailable" for that platform — never as fake data.
 */
const CORS_PROXIES = [
  (url) => `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`,
  (url) => `https://api.codetabs.com/v1/proxy/?quest=${encodeURIComponent(url)}`,
]

async function fetchHtmlViaProxy(url, timeoutMs = 20_000) {
  let lastError
  for (const makeUrl of CORS_PROXIES) {
    try {
      const res = await withTimeout(fetch(makeUrl(url)), timeoutMs)
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const text = await res.text()
      if (text.trim().length > 0) return text
      throw new Error('empty response')
    } catch (err) {
      lastError = err
    }
  }
  throw lastError instanceof Error ? lastError : new Error('all proxies failed')
}

function firstMatch(text, pattern) {
  const m = text.match(pattern)
  return m ? m[1] : null
}

// ---------------------------------------------------------------
// LeetCode (stats mirror + contest rating API)
// ---------------------------------------------------------------

async function fetchLeetCode(username) {
  const stats = { solved: null, easy: null, medium: null, hard: null, contestRating: null }

  const main = await fetchJson(`https://leetcode-api-faisalshohag.vercel.app/${username}`)
  if (typeof main.totalSolved === 'number') stats.solved = main.totalSolved
  if (typeof main.easySolved === 'number') stats.easy = main.easySolved
  if (typeof main.mediumSolved === 'number') stats.medium = main.mediumSolved
  if (typeof main.hardSolved === 'number') stats.hard = main.hardSolved

  // Contest rating is served by a second endpoint; failing to load it
  // must not invalidate the solved counts above.
  try {
    const contest = await fetchJson(
      `https://alfa-leetcode-api.onrender.com/userContestRankingInfo/${username}`,
      25_000,
    )
    if (contest.userContestRanking && typeof contest.userContestRanking.rating === 'number') {
      stats.contestRating = Math.round(contest.userContestRanking.rating)
    }
  } catch {
    // leave contestRating null → renders "N/A"
  }

  return stats
}

// ---------------------------------------------------------------
// CodeChef (public profile page via CORS proxy)
// ---------------------------------------------------------------

async function fetchCodeChef(username) {
  const html = await fetchHtmlViaProxy(`https://www.codechef.com/users/${username}`)

  const rating = firstMatch(html, /class="rating-number">\s*(\d+)/)
  const starBlock = firstMatch(html, /class="rating-star">([\s\S]*?)<\/div>/)
  const stars = starBlock ? (starBlock.match(/★|&#9733;/g) ?? []).length : null
  const solved = firstMatch(html, /Total Problems Solved:\s*(\d+)/)

  return {
    rating: rating ? Number(rating) : null,
    stars: stars !== null ? stars : null,
    solved: solved ? Number(solved) : null,
  }
}

// ---------------------------------------------------------------
// Codeforces (official API)
// ---------------------------------------------------------------

async function fetchCodeforces(username) {
  const info = await fetchJson(
    `https://codeforces.com/api/user.info?handles=${encodeURIComponent(username)}&checkHistoricHandles=false`,
  )
  if (info.status !== 'OK' || info.result.length === 0) throw new Error('user not found')
  const user = info.result[0]

  // Distinct fully-solved problems, counted from the submission history.
  let solved = null
  try {
    const subs = await fetchJson(
      `https://codeforces.com/api/user.status?handle=${encodeURIComponent(username)}&from=1&count=10000`,
    )
    if (subs.status === 'OK') {
      const unique = new Set(
        subs.result
          .filter((s) => s.verdict === 'OK')
          .map((s) => `${s.problem.contestId ?? 'gym'}-${s.problem.index ?? s.problem.name}`),
      )
      solved = unique.size
    }
  } catch {
    // submission history is a nice-to-have; keep solved null
  }

  return {
    rating: user.rating ?? null,
    maxRating: user.maxRating ?? null,
    rank: user.rank ?? null,
    solved,
  }
}

// ---------------------------------------------------------------
// GeeksforGeeks (public profile page via CORS proxy)
// ---------------------------------------------------------------

async function fetchGfg(username) {
  const html = await fetchHtmlViaProxy(`https://www.geeksforgeeks.org/user/${username}/`)

  const solved = firstMatch(html, /"total_problems_solved"\s*:\s*(\d+)/)
  const score = firstMatch(html, /"score"\s*:\s*(\d+)/)
  const instituteRank = firstMatch(html, /"institute_rank"\s*:\s*"([^"]*)"/)

  return {
    solved: solved ? Number(solved) : null,
    score: score ? Number(score) : null,
    instituteRank: instituteRank && instituteRank.length > 0 ? instituteRank : null,
  }
}

// ---------------------------------------------------------------
// HackerRank (public profile page via CORS proxy)
// ---------------------------------------------------------------

async function fetchHackerRank(username) {
  const html = await fetchHtmlViaProxy(`https://www.hackerrank.com/profile/${username}`)

  const badgeSection = firstMatch(html, /hacker-badges-v2([\s\S]*?)<\/section>/)
  let badges = null
  if (badgeSection) {
    badges = /not unlocked any badges/.test(badgeSection) ? 0 : (badgeSection.match(/hacker-badge/g) ?? []).length || null
  }

  const stars = badgeSection && badges ? (badgeSection.match(/★|&#9733;/g) ?? []).length || null : null
  const certifications = (html.match(/certificate-link/g) ?? []).length || null

  return { badges, stars, certifications }
}

// ---------------------------------------------------------------
// GitHub (official REST API + contributions mirror)
// ---------------------------------------------------------------

async function fetchGitHub(username) {
  const user = await fetchJson(
    `https://api.github.com/users/${encodeURIComponent(username)}`,
  )

  let contributions = null
  try {
    const cal = await fetchJson(
      `https://github-contributions-api.jogruber.de/v4/${encodeURIComponent(username)}`,
    )
    if (Array.isArray(cal.contributions)) {
      contributions = cal.contributions.reduce((sum, day) => sum + (day.count ?? 0), 0)
    }
  } catch {
    // contributions are a nice-to-have; keep null
  }

  return {
    repositories: user.public_repos ?? null,
    followers: user.followers ?? null,
    contributions,
  }
}

// ---------------------------------------------------------------
// Cache + orchestration
// ---------------------------------------------------------------

export function loadCachedStats() {
  try {
    const raw = localStorage.getItem(CACHE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    if (typeof parsed.fetchedAt !== 'number' || !parsed.data) return null
    return parsed
  } catch {
    return null
  }
}

function saveCache(snapshot) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(snapshot))
  } catch {
    // storage may be unavailable (private mode etc.) — stats still work in-memory
  }
}

export function clearCachedStats() {
  try {
    localStorage.removeItem(CACHE_KEY)
  } catch {
    /* ignore */
  }
}

/** Fetch every platform in parallel; each failure stays isolated. */
export async function fetchAllCodingStats(usernames) {
  const data = emptyData()
  await Promise.allSettled([
    fetchLeetCode(usernames.leetcode).then((v) => (data.leetcode = v)),
    fetchCodeChef(usernames.codechef).then((v) => (data.codechef = v)),
    fetchCodeforces(usernames.codeforces).then((v) => (data.codeforces = v)),
    fetchGfg(usernames.gfg).then((v) => (data.gfg = v)),
    fetchHackerRank(usernames.hackerrank).then((v) => (data.hackerrank = v)),
    fetchGitHub(usernames.github).then((v) => (data.github = v)),
  ])

  const snapshot = { fetchedAt: Date.now(), data }
  saveCache(snapshot)
  return snapshot
}

/**
 * Returns the cached snapshot when it is younger than STATS_TTL_MS,
 * otherwise fetches fresh data. Call once on page load.
 */
export async function getCodingStats(usernames) {
  const cached = loadCachedStats()
  if (cached && Date.now() - cached.fetchedAt < STATS_TTL_MS) return cached
  return fetchAllCodingStats(usernames)
}

/** Force a refresh, bypassing (and then rewriting) the cache. */
export async function refreshCodingStats(usernames) {
  clearCachedStats()
  return fetchAllCodingStats(usernames)
}

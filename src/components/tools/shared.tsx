/**
 * Pieces the AOHC dosing calculators share.
 *
 * ⚠️  `findCombos` IS THE LIVE SITE'S TABLET SEARCH, LINE FOR LINE. The
 * fenbendazole and ivermectin pages on artofhealingcancer.com each carry
 * their own copy of the same function — identical, down to the tablet cap
 * (`ceil(upper / smallest) + 1`) and the sort (closest first, then fewest
 * tablets, then larger sum). It lives here once so the two cannot drift.
 * DO NOT "IMPROVE" IT WITHOUT AOHC'S SAY-SO: a change here changes a dose
 * someone may act on, on two pages at once.
 */

export const KG_PER_LB = 0.45359237

export type Combo = {
  sum: number
  combo: Record<number, number>
  used: number
  diff: number
  diffPct: number
}

export function findCombos(
  target: number,
  denoms: number[],
  tolPct: number,
  maxTabs: number,
  topN = 9,
): Combo[] {
  const out: Combo[] = []
  const upper = target * (1 + tolPct / 100)
  const lower = target * Math.max(0, 1 - tolPct / 100)
  const bestCap = Math.min(maxTabs, Math.ceil(upper / Math.min(...denoms)) + 1)

  function dfs(idx: number, used: number, sum: number, combo: Record<number, number>) {
    if (used > bestCap) return
    if (sum > upper) return
    if (sum >= lower && sum <= upper) {
      out.push({
        sum,
        combo: { ...combo },
        used,
        diff: Math.abs(sum - target),
        diffPct: target > 0 ? (Math.abs(sum - target) / target) * 100 : 0,
      })
    }
    if (idx >= denoms.length) return
    const d = denoms[idx]
    /* Unreachable after the line above; narrows the type for the
       compiler without changing the original algorithm's behaviour. */
    if (d === undefined) return
    const maxCount = Math.min(Math.floor((upper - sum) / d), bestCap - used)
    for (let k = maxCount; k >= 0; k--) {
      if (k > 0) combo[d] = (combo[d] || 0) + k
      dfs(idx + 1, used + k, sum + d * k, combo)
      if (k > 0) {
        combo[d] = (combo[d] ?? 0) - k
        if (!combo[d]) delete combo[d]
      }
    }
  }

  dfs(0, 0, 0, {})
  out.sort((a, b) => a.diff - b.diff || a.used - b.used || b.sum - a.sum)

  const uniq: Combo[] = []
  const seen = new Set<string>()
  for (const r of out) {
    const sig = Object.entries(r.combo)
      .sort((a, b) => Number(b[0]) - Number(a[0]))
      .map(([mg, c]) => `${mg}x${c}`)
      .join('+')
    if (!seen.has(sig)) {
      seen.add(sig)
      uniq.push(r)
    }
    if (uniq.length >= topN) break
  }
  return uniq
}

/**
 * Locale pinned to en-IN so the server render and the client agree — the
 * default locale differs between Node and the browser and would cause a
 * hydration mismatch the first time a number appears.
 */
export function fmt(n: number, digits = 2) {
  if (!Number.isFinite(n)) return '—'
  return n.toLocaleString('en-IN', { maximumFractionDigits: digits })
}

export const inputClass =
  'w-full rounded-(--radius-lg) border border-border-strong bg-surface px-4 py-3 text-base text-text tabular-nums placeholder:text-text-subtle focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30'

export function Step({ n, title, children }: { n: number; title: string; children: React.ReactNode }) {
  return (
    <fieldset className="min-w-0 border-t border-border pt-6 first:border-t-0 first:pt-0">
      <legend className="flex items-center gap-3">
        <span
          aria-hidden
          className="flex size-7 items-center justify-center rounded-full bg-primary-subtle text-sm font-bold text-primary-dark"
        >
          {n}
        </span>
        <span className="font-display text-lg font-bold text-text">{title}</span>
      </legend>
      <div className="mt-4">{children}</div>
    </fieldset>
  )
}

/** A segmented control built from real radio inputs. */
export function Segmented<T extends string>({
  name,
  value,
  options,
  onChange,
}: {
  name: string
  value: T
  options: { value: T; label: string }[]
  onChange: (v: T) => void
}) {
  return (
    <div className="inline-flex flex-wrap rounded-(--radius-pill) border border-border bg-surface-subtle p-1">
      {options.map((o) => (
        <label key={o.value} className="relative cursor-pointer">
          <input
            type="radio"
            name={name}
            value={o.value}
            checked={value === o.value}
            onChange={() => onChange(o.value)}
            className="peer sr-only"
          />
          <span className="block rounded-(--radius-pill) px-4 py-2 text-sm font-semibold text-text-muted transition-colors peer-checked:bg-primary-dark peer-checked:text-white peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-accent">
            {o.label}
          </span>
        </label>
      ))}
    </div>
  )
}

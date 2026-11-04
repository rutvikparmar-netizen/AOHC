'use client'

import { useMemo, useState } from 'react'
import { Icon } from '@/components/ui/Icon'
import { KG_PER_LB, Segmented, Step, findCombos, fmt, inputClass } from '@/components/tools/shared'

/**
 * Ivermectin tablet-dose calculator.
 *
 * ⚠️  THE FORMULA IS AOHC'S, CARRIED OVER UNCHANGED FROM
 * https://artofhealingcancer.com/blogs/ivermectin-dosing-calculator/.
 * Every number below is that page's:
 *
 *   target mg  = mg/kg for the chosen context × body weight in kg
 *   contexts   investigational (cancer) 0.4 mg/kg; standard (non-cancer) 0.2 mg/kg
 *   1 lb       = 0.45359237 kg
 *   strengths  3 / 6 / 12 / 24 / 48 mg, all on by default
 *   defaults   max 12 tablets, ±5% tolerance, 12 combinations shown
 *
 * The tablet search is the shared `findCombos`, which is the same
 * function the live page carries. See `./shared` before touching it.
 *
 * As on the fenbendazole calculator, results update live, so the live
 * page's Calculate button (which did nothing the inputs had not already
 * done) is not reproduced. Reset stays.
 */

const DOSING = { cancer: 0.4, standard: 0.2 } as const
type Context = keyof typeof DOSING

const STRENGTHS = [3, 6, 12, 24, 48]

export function IvermectinCalculator() {
  const [context, setContext] = useState<Context>('cancer')
  const [weight, setWeight] = useState('')
  const [unit, setUnit] = useState<'kg' | 'lb'>('kg')
  const [strengths, setStrengths] = useState<number[]>(STRENGTHS)
  const [maxTablets, setMaxTablets] = useState('12')
  const [tolerance, setTolerance] = useState('5')

  const mgPerKg = DOSING[context]

  const weightKg = useMemo(() => {
    const w = parseFloat(weight)
    if (!(Number.isFinite(w) && w > 0)) return NaN
    return unit === 'kg' ? w : w * KG_PER_LB
  }, [weight, unit])

  const target = Number.isFinite(weightKg) ? mgPerKg * weightKg : NaN
  const denoms = useMemo(() => [...strengths].sort((a, b) => b - a), [strengths])

  const combos = useMemo(() => {
    if (!Number.isFinite(target) || target <= 0 || denoms.length === 0) return []
    return findCombos(target, denoms, parseFloat(tolerance) || 0, parseInt(maxTablets) || 12, 12)
  }, [target, denoms, tolerance, maxTablets])

  const best = combos[0]

  function toggleStrength(mg: number) {
    setStrengths((s) => (s.includes(mg) ? s.filter((x) => x !== mg) : [...s, mg]))
  }

  function reset() {
    setContext('cancer')
    setWeight('')
    setUnit('kg')
    setStrengths(STRENGTHS)
    setMaxTablets('12')
    setTolerance('5')
  }

  return (
    <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
      {/* ── Inputs ─────────────────────────────────────────────────── */}
      <form
        onSubmit={(e) => e.preventDefault()}
        className="min-w-0 space-y-6 rounded-(--radius-3xl) border border-border bg-surface p-6 shadow-(--shadow-card) sm:p-8 lg:col-span-7"
      >
        <Step n={1} title="Context">
          <Segmented
            name="ivm-context"
            value={context}
            onChange={setContext}
            options={[
              { value: 'cancer', label: 'Investigational (Cancer)' },
              { value: 'standard', label: 'Standard (Non-cancer)' },
            ]}
          />
          {context === 'cancer' ? (
            <p className="mt-3 flex gap-2.5 rounded-(--radius-xl) border border-accent bg-accent-subtle p-4 text-sm leading-relaxed text-text">
              <Icon name="info" className="mt-0.5 size-4 shrink-0 text-accent-dark" />
              <span>
                “Investigational (cancer)” is off-label and should only be used in clinical
                trials or under strict specialist supervision.
              </span>
            </p>
          ) : null}
        </Step>

        <Step n={2} title="Body weight">
          <div className="flex flex-wrap items-center gap-3">
            <label htmlFor="ivm-weight" className="sr-only">
              Body weight in {unit}
            </label>
            <div className="relative w-40">
              <input
                id="ivm-weight"
                type="number"
                inputMode="decimal"
                min="0"
                step="0.01"
                placeholder="e.g. 70"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className={`${inputClass} pr-12`}
              />
              <span
                aria-hidden
                className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-sm font-semibold text-text-subtle"
              >
                {unit}
              </span>
            </div>
            <Segmented
              name="ivm-unit"
              value={unit}
              onChange={setUnit}
              options={[
                { value: 'kg', label: 'kg' },
                { value: 'lb', label: 'lb' },
              ]}
            />
          </div>
          <p className="mt-3 text-sm text-text-muted">
            Planned dose: <strong className="tabular-nums text-text">{mgPerKg.toFixed(2)} mg/kg × weight</strong>
          </p>
        </Step>

        <Step n={3} title="Tablets">
          <p id="ivm-strengths-help" className="text-sm text-text-muted">
            Tablet strengths you have available.
          </p>
          <div role="group" aria-describedby="ivm-strengths-help" className="mt-3 flex flex-wrap gap-2">
            {STRENGTHS.map((mg) => {
              const on = strengths.includes(mg)
              return (
                <label key={mg} className="cursor-pointer">
                  <input
                    type="checkbox"
                    checked={on}
                    onChange={() => toggleStrength(mg)}
                    className="peer sr-only"
                  />
                  <span className="inline-flex items-center gap-1.5 rounded-(--radius-pill) border border-border px-3.5 py-2 text-sm font-semibold tabular-nums text-text-muted transition-colors peer-checked:border-primary-dark peer-checked:bg-primary-dark peer-checked:text-white peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-accent">
                    {on ? <Icon name="check" className="size-3.5" /> : null}
                    {mg} mg
                  </span>
                </label>
              )
            })}
          </div>

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="ivm-max" className="block text-sm font-semibold text-text">
                Max tablets to consider
              </label>
              <input
                id="ivm-max"
                type="number"
                min="1"
                step="1"
                value={maxTablets}
                onChange={(e) => setMaxTablets(e.target.value)}
                className={`${inputClass} mt-1.5`}
              />
              <p className="mt-1 text-xs text-text-subtle">
                Biggest number of tablets allowed in each combination.
              </p>
            </div>
            <div>
              <label htmlFor="ivm-tol" className="block text-sm font-semibold text-text">
                Match tolerance (±%)
              </label>
              <input
                id="ivm-tol"
                type="number"
                min="0"
                step="0.5"
                value={tolerance}
                onChange={(e) => setTolerance(e.target.value)}
                className={`${inputClass} mt-1.5`}
              />
              <p className="mt-1 text-xs text-text-subtle">
                How close the tablet dose can be to the target. Higher percent gives more options.
              </p>
            </div>
          </div>
        </Step>

        <div className="border-t border-border pt-6">
          <button
            type="button"
            onClick={reset}
            className="inline-flex min-h-11 items-center gap-2 rounded-(--radius-pill) border border-border-strong px-5 text-sm font-semibold text-text hover:border-accent hover:text-accent-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            Reset
          </button>
        </div>
      </form>

      {/* ── Results ────────────────────────────────────────────────── */}
      <div className="min-w-0 lg:col-span-5">
        <div className="space-y-5 lg:sticky lg:top-28" aria-live="polite">
          <div className="overflow-hidden rounded-(--radius-3xl) bg-brand-teal-950 text-white shadow-(--shadow-card)">
            <div className="p-6 sm:p-8">
              <p className="text-eyebrow uppercase text-brand-teal-300">Total mg per dose (target)</p>
              <p className="mt-2 font-display text-5xl font-bold tabular-nums leading-none">
                {Number.isFinite(target) ? fmt(target, 2) : '—'}
                {Number.isFinite(target) ? <span className="ml-2 text-2xl text-brand-teal-200">mg</span> : null}
              </p>
              {!Number.isFinite(target) ? (
                <p className="mt-3 text-sm text-brand-teal-100">Enter a body weight to calculate.</p>
              ) : null}
            </div>
            <dl className="divide-y divide-white/10 border-t border-white/10 text-sm">
              {[
                ['Context', context === 'standard' ? 'Standard (Non-cancer)' : 'Investigational (Cancer)'],
                ['Rate', `${mgPerKg.toFixed(2)} mg/kg × weight`],
                ['Weight basis', Number.isFinite(weightKg) ? `${fmt(weightKg, 2)} kg` : '—'],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between gap-4 px-6 py-3 sm:px-8">
                  <dt className="text-brand-teal-200">{k}</dt>
                  <dd className="text-right font-semibold tabular-nums">{v}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="rounded-(--radius-3xl) border border-border bg-surface p-6 shadow-(--shadow-card) sm:p-7">
            <h3 className="font-display text-lg font-bold text-text">Tablet combinations</h3>
            {!Number.isFinite(target) ? (
              <p className="mt-2 text-sm text-text-muted">No target yet.</p>
            ) : denoms.length === 0 ? (
              <p className="mt-2 text-sm text-text-muted">Select at least one tablet strength.</p>
            ) : combos.length === 0 ? (
              <p className="mt-2 text-sm text-text-muted">
                No combos found. Try increasing tolerance/max tablets.
              </p>
            ) : (
              <>
                <p className="mt-2 text-sm text-text-muted">
                  Best: <strong className="text-text">{fmt(best?.diff ?? NaN, 2)} mg</strong> off target (
                  {fmt(best?.diffPct ?? NaN, 2)}%) using <strong className="text-text">{best?.used}</strong>{' '}
                  tablets.
                </p>
                <ol className="mt-4 space-y-2.5">
                  {combos.map((c, i) => {
                    const counts = Object.entries(c.combo)
                      .sort((a, b) => Number(b[0]) - Number(a[0]))
                      .map(([mg, ct]) => `${ct} × ${mg} mg`)
                      .join(' + ')
                    const over = c.sum >= target
                    return (
                      <li
                        key={counts}
                        className={
                          i === 0
                            ? 'rounded-(--radius-xl) border-2 border-accent bg-accent-subtle p-4'
                            : 'rounded-(--radius-xl) border border-border p-4'
                        }
                      >
                        {i === 0 ? (
                          <span className="mb-1.5 inline-block rounded-(--radius-pill) bg-accent px-2.5 py-0.5 text-xs font-bold uppercase tracking-wide text-white">
                            Best match
                          </span>
                        ) : null}
                        <p className="font-semibold tabular-nums text-text">{counts}</p>
                        <p className="mt-1 text-xs tabular-nums text-text-muted">
                          Sum {fmt(c.sum, 2)} mg · {over ? '+' : '−'}
                          {fmt(Math.abs(c.sum - target), 2)} mg ({fmt(c.diffPct, 2)}%) · {c.used} tablet
                          {c.used === 1 ? '' : 's'}
                        </p>
                      </li>
                    )
                  })}
                </ol>
              </>
            )}
            <p className="mt-4 text-xs text-text-subtle">Packaging options only. Not treatment advice.</p>
          </div>

          <p className="flex gap-2.5 text-sm leading-relaxed text-text-muted">
            <Icon name="shield-check" className="mt-0.5 size-4 shrink-0 text-accent-dark" />
            No tablet combinations are suggestions. Always follow the exact prescribing clinician’s order.
          </p>
        </div>
      </div>
    </div>
  )
}

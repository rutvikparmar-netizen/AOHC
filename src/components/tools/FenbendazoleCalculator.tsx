'use client'

import { useMemo, useState } from 'react'
import { Icon } from '@/components/ui/Icon'
import { KG_PER_LB, Segmented, Step, findCombos, fmt, inputClass } from '@/components/tools/shared'

/**
 * Fenbendazole tablet-dose calculator.
 *
 * ──────────────────────────────────────────────────────────────────────────
 * ⚠️  THE FORMULA IS AOHC'S, CARRIED OVER UNCHANGED FROM THE LIVE PAGE.
 * AOHC supplied the original HTML and asked for "the Formula which we
 * use". Everything numeric below is that page's, value for value:
 *
 *   target mg = mg/kg for the chosen protocol × body weight in kg
 *   protocols  3.17 / 6.34 / 14.3 / 28.6 mg/kg; non-cancer 10 mg/kg
 *   1 lb       = 0.45359237 kg
 *   strengths  222 / 444 / 500 / 888 / 1000 mg, all on by default
 *   defaults   max 6 tablets, ±5% tolerance, 12 combinations shown
 *
 * `findCombos` is the original depth-first search line for line,
 * including its tablet cap (`ceil(upper / smallest) + 1`) and its sort
 * (closest first, then fewest tablets, then larger sum). DO NOT "IMPROVE"
 * THE MATHS WITHOUT AOHC'S SAY-SO: a change here changes a dose someone
 * may act on.
 *
 * ⚠️  THE PROTOCOL NAMES DID NOT MATCH WHAT THE FORMULA PRODUCES, AND
 * THAT IS THE ONE THING THIS VERSION DOES DIFFERENTLY. The original
 * buttons read "Max Dose (2000mg)" and "Joe Tippens Basic (222mg)", but
 * the formula is per kilogram: those milligram figures are the mg/kg
 * values times 70 kg. For a 100 kg person "Max Dose (2000mg)" computes
 * 2,860 mg. A label promising 2000 mg over a result of 2,860 mg is the
 * most dangerous kind of wrong this page could be, so the formula is
 * kept and the LABELS are made true instead: each option shows its
 * mg/kg rate and says the milligram figure is what it comes to at 70 kg,
 * and the result panel says so plainly whenever the computed dose is
 * above the figure the protocol is named for.
 *
 * ⚠️  NO CALCULATE BUTTON. The original recalculated on every input
 * anyway and also had a Calculate button that did nothing extra. Results
 * update live; Reset stays.
 *
 * The search itself, and the other shared pieces, live in ./shared.
 */

type Protocol = {
  mgPerKg: number
  name: string
  /** The milligram figure the live page named this protocol by — mg/kg × 70. */
  named: number
}

const CANCER_PROTOCOLS: Protocol[] = [
  { mgPerKg: 3.17, name: 'Joe Tippens Basic', named: 222 },
  { mgPerKg: 6.34, name: 'Aggressive Protocol', named: 444 },
  { mgPerKg: 14.3, name: 'High Dose', named: 1000 },
  { mgPerKg: 28.6, name: 'Max Dose', named: 2000 },
]

/** Non-cancer: 10 mg/kg daily, "theoretical — NOT FDA approved for humans". */
const STANDARD_MG_PER_KG = 10

const STRENGTHS = [222, 444, 500, 888, 1000]

/* ── The calculator ───────────────────────────────────────────────────── */

export function FenbendazoleCalculator() {
  const [context, setContext] = useState<'cancer' | 'standard'>('cancer')
  const [protocolIdx, setProtocolIdx] = useState(0)
  const [weight, setWeight] = useState('')
  const [unit, setUnit] = useState<'kg' | 'lb'>('kg')
  const [strengths, setStrengths] = useState<number[]>(STRENGTHS)
  const [maxTablets, setMaxTablets] = useState('6')
  const [tolerance, setTolerance] = useState('5')

  const protocol = CANCER_PROTOCOLS[protocolIdx] ?? CANCER_PROTOCOLS[0]!
  const mgPerKg = context === 'cancer' ? protocol.mgPerKg : STANDARD_MG_PER_KG

  const weightKg = useMemo(() => {
    const w = parseFloat(weight)
    if (!(Number.isFinite(w) && w > 0)) return NaN
    return unit === 'kg' ? w : w * KG_PER_LB
  }, [weight, unit])

  const target = Number.isFinite(weightKg) ? mgPerKg * weightKg : NaN

  const denoms = useMemo(() => [...strengths].sort((a, b) => b - a), [strengths])

  const combos = useMemo(() => {
    if (!Number.isFinite(target) || target <= 0 || denoms.length === 0) return []
    return findCombos(
      target,
      denoms,
      parseFloat(tolerance) || 0,
      parseInt(maxTablets) || 6,
      12,
    )
  }, [target, denoms, tolerance, maxTablets])

  const best = combos[0]

  /** True when the result is above the milligram figure the protocol is named for. */
  const exceedsNamed =
    context === 'cancer' && Number.isFinite(target) && target > protocol.named * 1.005

  function toggleStrength(mg: number) {
    setStrengths((s) => (s.includes(mg) ? s.filter((x) => x !== mg) : [...s, mg]))
  }

  function reset() {
    setContext('cancer')
    setProtocolIdx(0)
    setWeight('')
    setUnit('kg')
    setStrengths(STRENGTHS)
    setMaxTablets('6')
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
            name="context"
            value={context}
            onChange={setContext}
            options={[
              { value: 'cancer', label: 'Cancer protocols' },
              { value: 'standard', label: 'Non-cancer' },
            ]}
          />
        </Step>

        <Step n={2} title={context === 'cancer' ? 'Protocol' : 'Dose basis'}>
          {context === 'cancer' ? (
            <>
              <div className="grid gap-3 sm:grid-cols-2">
                {CANCER_PROTOCOLS.map((p, i) => (
                  <label key={p.name} className="relative block cursor-pointer">
                    <input
                      type="radio"
                      name="protocol"
                      checked={protocolIdx === i}
                      onChange={() => setProtocolIdx(i)}
                      className="peer sr-only"
                    />
                    <span className="flex h-full flex-col rounded-(--radius-xl) border border-border bg-surface p-4 transition-colors hover:border-border-strong peer-checked:border-accent peer-checked:bg-accent-subtle peer-checked:ring-1 peer-checked:ring-accent peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-accent">
                      <span className="flex items-start justify-between gap-2">
                        <span className="font-semibold text-text">{p.name}</span>
                        <span className="shrink-0 rounded-(--radius-pill) bg-surface-subtle px-2 py-0.5 text-xs font-bold tabular-nums text-primary-dark">
                          {p.mgPerKg} mg/kg
                        </span>
                      </span>
                      {/* The live page labelled this "(222mg)". It is only
                          222 mg at 70 kg — see the note at the top. */}
                      <span className="mt-1 text-sm text-text-muted">
                        {p.named.toLocaleString('en-IN')} mg/day at 70 kg
                      </span>
                    </span>
                  </label>
                ))}
              </div>
              <p className="mt-3 text-sm text-text-muted">
                Based on real patient experiences. Higher doses require strict
                medical supervision.
              </p>
            </>
          ) : (
            <p className="rounded-(--radius-xl) border border-border bg-surface-subtle p-4 text-sm leading-relaxed text-text-muted">
              Non-cancer: <strong className="text-text">10 mg/kg daily</strong>{' '}
              (theoretical — NOT FDA approved for humans).
            </p>
          )}
        </Step>

        <Step n={3} title="Body weight">
          <div className="flex flex-wrap items-center gap-3">
            <label htmlFor="fbz-weight" className="sr-only">
              Body weight in {unit}
            </label>
            <div className="relative w-40">
              <input
                id="fbz-weight"
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
              name="unit"
              value={unit}
              onChange={setUnit}
              options={[
                { value: 'kg', label: 'kg' },
                { value: 'lb', label: 'lb' },
              ]}
            />
          </div>
        </Step>

        <Step n={4} title="Tablets">
          <p id="fbz-strengths-help" className="text-sm text-text-muted">
            Tablet strengths you have available.
          </p>
          <div
            role="group"
            aria-describedby="fbz-strengths-help"
            className="mt-3 flex flex-wrap gap-2"
          >
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
              <label htmlFor="fbz-max" className="block text-sm font-semibold text-text">
                Max tablets per combination
              </label>
              <input
                id="fbz-max"
                type="number"
                min="1"
                step="1"
                value={maxTablets}
                onChange={(e) => setMaxTablets(e.target.value)}
                className={`${inputClass} mt-1.5`}
              />
            </div>
            <div>
              <label htmlFor="fbz-tol" className="block text-sm font-semibold text-text">
                Match tolerance (±%)
              </label>
              <input
                id="fbz-tol"
                type="number"
                min="0"
                step="0.5"
                value={tolerance}
                onChange={(e) => setTolerance(e.target.value)}
                className={`${inputClass} mt-1.5`}
              />
              <p className="mt-1 text-xs text-text-subtle">
                How close the tablets must get to the target. Higher gives more options.
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
              <p className="text-eyebrow uppercase text-brand-teal-300">
                Total mg per day (target)
              </p>
              <p className="mt-2 font-display text-5xl font-bold tabular-nums leading-none">
                {Number.isFinite(target) ? fmt(target, 0) : '—'}
                {Number.isFinite(target) ? (
                  <span className="ml-2 text-2xl text-brand-teal-200">mg</span>
                ) : null}
              </p>
              {!Number.isFinite(target) ? (
                <p className="mt-3 text-sm text-brand-teal-100">
                  Enter a body weight to calculate.
                </p>
              ) : null}
            </div>

            <dl className="divide-y divide-white/10 border-t border-white/10 text-sm">
              {[
                [
                  'Protocol',
                  context === 'cancer' ? protocol.name : 'Non-cancer (theoretical)',
                ],
                ['Rate', `${mgPerKg} mg/kg × weight`],
                ['Weight basis', Number.isFinite(weightKg) ? `${fmt(weightKg, 2)} kg` : '—'],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between gap-4 px-6 py-3 sm:px-8">
                  <dt className="text-brand-teal-200">{k}</dt>
                  <dd className="text-right font-semibold tabular-nums">{v}</dd>
                </div>
              ))}
            </dl>
          </div>

          {exceedsNamed ? (
            <div className="flex items-start gap-3 rounded-(--radius-2xl) border-2 border-accent bg-accent-subtle p-4">
              <Icon name="alert-triangle" className="mt-0.5 size-5 shrink-0 text-accent-dark" />
              <p className="text-sm leading-relaxed text-text">
                <strong>
                  This is {fmt(target, 0)} mg — more than the{' '}
                  {protocol.named.toLocaleString('en-IN')} mg this protocol is named for.
                </strong>{' '}
                The dose scales with body weight; the named figure assumes 70 kg.
              </p>
            </div>
          ) : null}

          <div className="rounded-(--radius-3xl) border border-border bg-surface p-6 shadow-(--shadow-card) sm:p-7">
            <h3 className="font-display text-lg font-bold text-text">Tablet combinations</h3>

            {!Number.isFinite(target) ? (
              <p className="mt-2 text-sm text-text-muted">No target yet.</p>
            ) : denoms.length === 0 ? (
              <p className="mt-2 text-sm text-text-muted">Select at least one tablet strength.</p>
            ) : combos.length === 0 ? (
              <p className="mt-2 text-sm text-text-muted">
                No combinations found. Try increasing the tolerance or the maximum number of tablets.
              </p>
            ) : (
              <>
                <p className="mt-2 text-sm text-text-muted">
                  Best: <strong className="text-text">{fmt(best?.diff ?? NaN, 2)} mg</strong> off
                  target ({fmt(best?.diffPct ?? NaN, 2)}%) using{' '}
                  <strong className="text-text">{best?.used}</strong> tablets.
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
                          {fmt(Math.abs(c.sum - target), 2)} mg ({fmt(c.diffPct, 2)}%) ·{' '}
                          {c.used} tablet{c.used === 1 ? '' : 's'}
                        </p>
                      </li>
                    )
                  })}
                </ol>
              </>
            )}
          </div>

          <ul className="space-y-2 text-sm leading-relaxed text-text-muted">
            <li className="flex gap-2.5">
              <Icon name="shield-check" className="mt-0.5 size-4 shrink-0 text-accent-dark" />
              Requires liver function monitoring (ALT, AST) every 2–4 weeks. Stop if enzymes are elevated.
            </li>
            <li className="flex gap-2.5">
              <Icon name="info" className="mt-0.5 size-4 shrink-0 text-accent-dark" />
              Take with fatty food (coconut oil, eggs) for better absorption.
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

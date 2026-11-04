'use client'

import { useId, useMemo, useState } from 'react'
import { Icon } from '@/components/ui/Icon'
import { Segmented, inputClass } from '@/components/tools/shared'

/**
 * Breast cancer chemotherapy dose calculator (BSA + Calvert).
 *
 * ⚠️  THE FORMULAS AND EVERY DOSE FIGURE ARE AOHC'S, CARRIED OVER FROM
 * https://artofhealingcancer.com/blogs/aohc-breast-cancer-chemotherapy-dosage-calculator/:
 *
 *   BSA (m²)         = √(height cm × weight kg / 3600)          Mosteller
 *   CrCl (mL/min)    = (140 − age) × weight × (0.85 if female) / (72 × SCr)
 *                      floored at 0; only when age and creatinine are given
 *   BSA-based drug   = mg/m² × BSA × (dose % / 100)
 *   Carboplatin      = AUC × (min(CrCl, 150) + 25)                Calvert
 *                      — not scaled by the dose percentage
 *   Display          = 1 decimal under 10 mg, otherwise whole mg
 *
 * The mg/m² table is `DRUG_CLASSES` below, value for value.
 *
 * ──────────────────────────────────────────────────────────────────────────
 * ⚠️  THE DOSE-REDUCTION LABELS ON THE LIVE PAGE SAID THE OPPOSITE OF WHAT
 * THE FORMULA DOES, AND THAT IS THE ONE THING CHANGED HERE. The live
 * options read "75% Reduction", "50% Reduction", "20% Reduction
 * (Low-dose)", but the code multiplies the dose BY that number: "75%
 * Reduction" gives 75% of the standard dose — a 25% reduction — and "20%
 * Reduction" gives 20% of it, an 80% reduction. On a chemotherapy page a
 * label that inverts the dose is the worst kind of wrong, so the formula
 * is kept and the labels now say what it computes ("75% of standard
 * dose"). AOHC should confirm which one they meant.
 *
 * ⚠️  COCKCROFT–GAULT HERE USES ACTUAL BODY WEIGHT, as the live page does.
 * Many oncology protocols use ideal or adjusted body weight for obese
 * patients; that is a clinical choice for AOHC's team, flagged rather than
 * changed.
 *
 * Results update live rather than on a Calculate button, as on the other
 * two calculators.
 */

type Drug = { name: string; mgPerM2: [number] | [number, number]; schedule: string }
type DrugClass = { id: string; label: string; drugs: Drug[]; note: string }

const DRUG_CLASSES: DrugClass[] = [
  {
    id: 'anthracyclines',
    label: 'Anthracyclines',
    drugs: [
      { name: 'Doxorubicin', mgPerM2: [60, 75], schedule: 'IV every 21 days' },
      { name: 'Epirubicin', mgPerM2: [75, 90], schedule: 'IV every 21 days' },
      { name: 'Liposomal Doxorubicin', mgPerM2: [50], schedule: 'IV every 28 days' },
    ],
    note: 'Maximum cumulative dose for doxorubicin: 550 mg/m². Monitor cardiac function (ECHO/MUGA).',
  },
  {
    id: 'taxanes',
    label: 'Taxanes',
    drugs: [
      { name: 'Paclitaxel', mgPerM2: [175], schedule: 'IV every 21 days' },
      { name: 'Paclitaxel Weekly', mgPerM2: [80], schedule: 'IV weekly' },
      { name: 'Docetaxel', mgPerM2: [75, 100], schedule: 'IV every 21 days' },
      { name: 'Docetaxel Weekly', mgPerM2: [35], schedule: 'IV weekly' },
      { name: 'Abraxane (nab-Paclitaxel)', mgPerM2: [260], schedule: 'IV every 21 days' },
      { name: 'Abraxane Weekly', mgPerM2: [125], schedule: 'IV weekly x3, q4w' },
    ],
    note: 'Premedicate for hypersensitivity reactions. Monitor for peripheral neuropathy.',
  },
  {
    id: 'alkylating',
    label: 'Alkylating Agents',
    drugs: [
      { name: 'Cyclophosphamide', mgPerM2: [600], schedule: 'IV every 21 days' },
      { name: 'Cyclophosphamide (oral)', mgPerM2: [100], schedule: 'PO daily x14 days' },
      { name: 'Ifosfamide', mgPerM2: [1200], schedule: 'IV daily x5 days' },
    ],
    note: 'Ensure adequate hydration. Monitor for hemorrhagic cystitis with cyclophosphamide/ifosfamide.',
  },
  {
    id: 'antimetabolites',
    label: 'Antimetabolites',
    drugs: [
      { name: '5-Fluorouracil', mgPerM2: [600], schedule: 'IV days 1,8 q28d' },
      { name: 'Capecitabine', mgPerM2: [1250], schedule: 'PO BID x14d q21d' },
      { name: 'Methotrexate', mgPerM2: [40], schedule: 'IV days 1,8 q28d' },
      { name: 'Gemcitabine', mgPerM2: [1000], schedule: 'IV days 1,8 q21d' },
    ],
    note: 'Monitor for mucositis, hand-foot syndrome (capecitabine). Leucovorin rescue may be needed with high-dose MTX.',
  },
  {
    id: 'platinum',
    label: 'Platinum Compounds',
    drugs: [{ name: 'Cisplatin', mgPerM2: [75], schedule: 'IV every 21 days' }],
    note: 'Monitor renal function, hearing, and neuropathy. Adequate hydration essential for cisplatin.',
  },
  {
    id: 'other',
    label: 'Other Agents',
    drugs: [
      { name: 'Vinorelbine', mgPerM2: [25], schedule: 'IV weekly' },
      { name: 'Eribulin', mgPerM2: [1.4], schedule: 'IV days 1,8 q21d' },
      { name: 'Ixabepilone', mgPerM2: [40], schedule: 'IV every 21 days' },
      { name: 'Mitomycin', mgPerM2: [10], schedule: 'IV every 42 days' },
    ],
    note: 'Monitor for specific toxicities. Eribulin: QT prolongation. Vinorelbine: severe constipation.',
  },
]

const CARBOPLATIN = [
  { auc: 6, schedule: 'IV every 21 days', use: 'Standard adjuvant' },
  { auc: 5, schedule: 'IV every 21 days', use: 'Combination therapy' },
  { auc: 4, schedule: 'IV every 21 days', use: 'Elderly/reduced function' },
  { auc: 2, schedule: 'IV weekly', use: 'Weekly schedule' },
]

const DOSE_LEVELS = [
  { value: '100', label: '100% (standard dose)' },
  { value: '75', label: '75% of standard dose' },
  { value: '50', label: '50% of standard dose' },
  { value: '20', label: '20% of standard dose (low-dose)' },
]

/** The live page's rounding: one decimal under 10 mg, whole mg above. */
function fmtMg(mg: number) {
  return mg < 10 ? Math.round(mg * 10) / 10 : Math.round(mg)
}

function Field({
  id,
  label,
  unit,
  help,
  value,
  onChange,
}: {
  id: string
  label: string
  unit: string
  help: string
  value: string
  onChange: (v: string) => void
}) {
  return (
    <div className="min-w-0">
      <label htmlFor={id} className="block text-sm font-semibold text-text">
        {label}
      </label>
      <div className="relative mt-1.5">
        <input
          id={id}
          type="number"
          inputMode="decimal"
          min="0"
          step="any"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          aria-describedby={`${id}-help`}
          className={`${inputClass} pr-16`}
        />
        <span
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-sm font-semibold text-text-subtle"
        >
          {unit}
        </span>
      </div>
      <p id={`${id}-help`} className="mt-1 text-xs text-text-subtle">
        {help}
      </p>
    </div>
  )
}

export function BreastChemoCalculator() {
  const uid = useId()
  const [weight, setWeight] = useState('')
  const [height, setHeight] = useState('')
  const [age, setAge] = useState('')
  const [gender, setGender] = useState<'female' | 'male'>('female')
  const [scr, setScr] = useState('')
  const [level, setLevel] = useState('100')
  const [tab, setTab] = useState(DRUG_CLASSES[0]!.id)

  const r = parseFloat(level) / 100

  const { bsa, crcl } = useMemo(() => {
    const w = parseFloat(weight)
    const h = parseFloat(height)
    const a = parseFloat(age)
    const s = parseFloat(scr)
    if (!(w > 0) || !(h > 0)) return { bsa: NaN, crcl: null as number | null }
    const bsa = Math.sqrt((h * w) / 3600)
    let crcl: number | null = null
    if (a > 0 && s > 0) {
      crcl = ((140 - a) * w * (gender === 'female' ? 0.85 : 1)) / (72 * s)
      if (crcl < 0) crcl = 0
    }
    return { bsa, crcl }
  }, [weight, height, age, scr, gender])

  const ready = Number.isFinite(bsa)
  const ageNum = parseFloat(age)

  function dose(d: Drug) {
    if (!ready) return '—'
    const vals = d.mgPerM2.map((v) => fmtMg(v * bsa * r))
    return vals.length === 2 ? `${vals[0]}–${vals[1]} mg` : `${vals[0]} mg`
  }

  function carbo(auc: number) {
    if (!ready) return '—'
    if (crcl === null) return 'Enter age + creatinine'
    return `${Math.round(auc * (Math.min(crcl, 150) + 25))} mg`
  }

  function reset() {
    setWeight('')
    setHeight('')
    setAge('')
    setGender('female')
    setScr('')
    setLevel('100')
  }

  const active = DRUG_CLASSES.find((c) => c.id === tab) ?? DRUG_CLASSES[0]!
  const touched = weight !== '' || height !== ''

  const th = 'px-4 py-3 text-left text-xs font-bold uppercase tracking-wide text-text-subtle'
  const td = 'px-4 py-3 align-top'

  return (
    <div className="space-y-8">
      <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
        {/* ── Patient information ─────────────────────────────────── */}
        <form
          onSubmit={(e) => e.preventDefault()}
          className="min-w-0 rounded-(--radius-3xl) border border-border bg-surface p-6 shadow-(--shadow-card) sm:p-8 lg:col-span-7"
        >
          <h2 className="font-display text-h4 font-bold text-text">Patient Information</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <Field id={`${uid}-w`} label="Weight" unit="kg" help="Body weight (kg)." value={weight} onChange={setWeight} />
            <Field id={`${uid}-h`} label="Height" unit="cm" help="Height (cm)." value={height} onChange={setHeight} />
            <Field id={`${uid}-a`} label="Age" unit="years" help="Age (years) — for carboplatin dosing." value={age} onChange={setAge} />
            <Field
              id={`${uid}-c`}
              label="Serum Creatinine"
              unit="mg/dL"
              help="mg/dL — for carboplatin dosing."
              value={scr}
              onChange={setScr}
            />
            <fieldset className="min-w-0">
              <legend className="text-sm font-semibold text-text">Gender</legend>
              <div className="mt-1.5">
                <Segmented
                  name={`${uid}-g`}
                  value={gender}
                  onChange={setGender}
                  options={[
                    { value: 'female', label: 'Female' },
                    { value: 'male', label: 'Male' },
                  ]}
                />
              </div>
              <p className="mt-1 text-xs text-text-subtle">For creatinine clearance calculation.</p>
            </fieldset>
            <div className="min-w-0">
              <label htmlFor={`${uid}-r`} className="block text-sm font-semibold text-text">
                Dose level
              </label>
              <select
                id={`${uid}-r`}
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                className={`${inputClass} mt-1.5 cursor-pointer`}
              >
                {DOSE_LEVELS.map((d) => (
                  <option key={d.value} value={d.value}>
                    {d.label}
                  </option>
                ))}
              </select>
              <p className="mt-1 text-xs text-text-subtle">Applied to BSA-based drugs.</p>
            </div>
          </div>

          {touched && !ready ? (
            <p role="alert" className="mt-5 rounded-(--radius-xl) border border-accent bg-accent-subtle p-4 text-sm text-text">
              Please enter a valid weight (kg) and height (cm) to calculate BSA-based doses.
            </p>
          ) : null}

          <div className="mt-6 border-t border-border pt-6">
            <button
              type="button"
              onClick={reset}
              className="inline-flex min-h-11 items-center gap-2 rounded-(--radius-pill) border border-border-strong px-5 text-sm font-semibold text-text hover:border-accent hover:text-accent-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              Reset
            </button>
          </div>
        </form>

        {/* ── BSA & renal function ───────────────────────────────── */}
        <div className="min-w-0 lg:col-span-5">
          <div aria-live="polite" className="overflow-hidden rounded-(--radius-3xl) bg-brand-teal-950 text-white shadow-(--shadow-card) lg:sticky lg:top-28">
            <div className="p-6 sm:p-8">
              <p className="text-eyebrow uppercase text-brand-teal-300">Body Surface Area (BSA)</p>
              <p className="mt-2 font-display text-5xl font-bold tabular-nums leading-none">
                {ready ? bsa.toFixed(2) : '—'}
                {ready ? <span className="ml-2 text-2xl text-brand-teal-200">m²</span> : null}
              </p>
              {!ready ? (
                <p className="mt-3 text-sm text-brand-teal-100">Enter weight and height to calculate.</p>
              ) : null}
            </div>
            <dl className="divide-y divide-white/10 border-t border-white/10 text-sm">
              {[
                ['Creatinine Clearance (CrCl)', !ready ? '—' : crcl === null ? 'Enter age + creatinine' : `${Math.round(crcl)} mL/min`],
                ['Dose level applied', ready ? `${level}%` : '—'],
                ['Patient weight', ready ? `${parseFloat(weight)} kg` : '—'],
                ['Patient age', ready && ageNum > 0 ? `${ageNum} years` : '—'],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between gap-4 px-6 py-3 sm:px-8">
                  <dt className="text-brand-teal-200">{k}</dt>
                  <dd className="text-right font-semibold tabular-nums">{v}</dd>
                </div>
              ))}
            </dl>
            <p className="border-t border-white/10 px-6 py-4 text-xs leading-relaxed text-brand-teal-100 sm:px-8">
              BSA via the Mosteller formula. CrCl via the Cockcroft-Gault formula. Carboplatin dosing uses the
              Calvert formula: Dose = AUC × (CrCl + 25).
            </p>
          </div>
        </div>
      </div>

      {/* ── Drug dosages ─────────────────────────────────────────── */}
      <section
        aria-labelledby={`${uid}-drugs`}
        className="rounded-(--radius-3xl) border border-border bg-surface p-6 shadow-(--shadow-card) sm:p-8"
      >
        <h2 id={`${uid}-drugs`} className="font-display text-h4 font-bold text-text">
          Drug Dosages
        </h2>

        <div role="tablist" aria-label="Drug class" className="mt-5 flex flex-wrap gap-2">
          {DRUG_CLASSES.map((c) => {
            const on = c.id === tab
            return (
              <button
                key={c.id}
                type="button"
                role="tab"
                id={`${uid}-tab-${c.id}`}
                aria-selected={on}
                aria-controls={`${uid}-panel-${c.id}`}
                tabIndex={on ? 0 : -1}
                onClick={() => setTab(c.id)}
                onKeyDown={(e) => {
                  if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return
                  const i = DRUG_CLASSES.findIndex((x) => x.id === tab)
                  const n = (i + (e.key === 'ArrowRight' ? 1 : -1) + DRUG_CLASSES.length) % DRUG_CLASSES.length
                  const next = DRUG_CLASSES[n]!
                  setTab(next.id)
                  document.getElementById(`${uid}-tab-${next.id}`)?.focus()
                }}
                className={`inline-flex min-h-11 cursor-pointer items-center rounded-(--radius-pill) border px-4 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
                  on
                    ? 'border-primary-dark bg-primary-dark text-white'
                    : 'border-border bg-surface text-text-muted hover:border-accent hover:text-accent-dark'
                }`}
              >
                {c.label}
              </button>
            )
          })}
        </div>

        <div
          role="tabpanel"
          id={`${uid}-panel-${active.id}`}
          aria-labelledby={`${uid}-tab-${active.id}`}
          className="mt-6"
        >
          <div className="overflow-x-auto rounded-(--radius-xl) border border-border">
            <table className="w-full min-w-[34rem] text-sm">
              <thead className="bg-surface-subtle">
                <tr>
                  <th scope="col" className={th}>Drug</th>
                  <th scope="col" className={th}>Standard Dose</th>
                  <th scope="col" className={th}>Calculated Dose</th>
                  <th scope="col" className={th}>Schedule</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {active.drugs.map((d) => (
                  <tr key={d.name}>
                    <th scope="row" className={`${td} text-left font-semibold text-text`}>{d.name}</th>
                    <td className={`${td} tabular-nums text-text-muted`}>{d.mgPerM2.join('-')} mg/m²</td>
                    <td className={`${td} font-bold tabular-nums text-primary-dark`}>{dose(d)}</td>
                    <td className={`${td} text-text-muted`}>{d.schedule}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 flex gap-2.5 text-sm leading-relaxed text-text-muted">
            <Icon name="info" className="mt-0.5 size-4 shrink-0 text-accent-dark" />
            <span>
              <strong className="text-text">Note:</strong> {active.note}
            </span>
          </p>

          {active.id === 'platinum' ? (
            <div className="mt-8">
              <h3 className="font-display text-lg font-bold text-text">Carboplatin Dosing (Calvert Formula)</h3>
              <div className="mt-4 overflow-x-auto rounded-(--radius-xl) border border-border">
                <table className="w-full min-w-[34rem] text-sm">
                  <thead className="bg-surface-subtle">
                    <tr>
                      <th scope="col" className={th}>Target AUC</th>
                      <th scope="col" className={th}>Calculated Dose</th>
                      <th scope="col" className={th}>Schedule</th>
                      <th scope="col" className={th}>Clinical Use</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {CARBOPLATIN.map((c) => (
                      <tr key={c.auc}>
                        <th scope="row" className={`${td} text-left font-semibold text-text`}>AUC {c.auc}</th>
                        <td className={`${td} font-bold tabular-nums text-primary-dark`}>{carbo(c.auc)}</td>
                        <td className={`${td} text-text-muted`}>{c.schedule}</td>
                        <td className={`${td} text-text-muted`}>{c.use}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-text-muted">
                <strong className="text-text">Calvert Formula:</strong> Dose (mg) = Target AUC × (CrCl + 25). CrCl
                capped at 150 mL/min for safety. (Carboplatin uses AUC targets rather than the BSA dose
                percentage.)
              </p>
            </div>
          ) : null}
        </div>
      </section>
    </div>
  )
}

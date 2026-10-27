import { cn } from '@/lib/utils'

/**
 * Form field primitives.
 *
 * ERROR WIRING IS THE WHOLE POINT. Each field links its message with
 * `aria-describedby` and sets `aria-invalid`, so a screen-reader user hears
 * what is wrong with the input they are focused on rather than discovering a
 * red message they cannot reach. Getting that right once here is why the forms
 * do not hand-roll inputs.
 *
 * Shared by the public forms and the admin console, so they cannot drift.
 */

const inputBase =
  'w-full rounded-(--radius-input) border bg-surface px-3.5 py-2.5 text-base text-text ' +
  'placeholder:text-text-subtle focus:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 ' +
  'aria-[invalid=true]:border-danger'

export function Label({
  htmlFor,
  children,
  optional,
  required,
  hint,
  /**
   * Visually hides the label but keeps it for screen readers. Used where a
   * `<legend>` already names the group — a dial-code select beside a phone
   * number still needs its own accessible name, but showing both would read
   * as two separate questions.
   */
  labelHidden,
}: {
  htmlFor: string
  children: React.ReactNode
  optional?: boolean
  required?: boolean
  hint?: string
  labelHidden?: boolean
}) {
  return (
    <span className={labelHidden ? 'sr-only' : 'mb-1.5 block'}>
      <label htmlFor={htmlFor} className="text-sm font-bold text-text">
        {children}
        {/* Required is marked, not implied. The asterisk is `aria-hidden` and
            the word is read instead — a screen reader announcing "asterisk"
            tells nobody anything. */}
        {required ? (
          <>
            <span aria-hidden className="ml-1 text-accent-dark">
              *
            </span>
            <span className="sr-only"> (required)</span>
          </>
        ) : null}
        {optional ? (
          <span className="ml-1.5 font-normal text-text-muted">(optional)</span>
        ) : null}
      </label>
      {hint ? <span className="mt-0.5 block text-sm text-text-muted">{hint}</span> : null}
    </span>
  )
}

export function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null
  return (
    <p id={id} className="mt-1.5 text-sm font-medium text-danger">
      {message}
    </p>
  )
}

export function TextField({
  name,
  label,
  type = 'text',
  error,
  defaultValue,
  required,
  optional,
  labelHidden,
  hint,
  autoComplete,
  inputMode,
  placeholder,
  className,
}: {
  name: string
  label: string
  type?: 'text' | 'email' | 'tel'
  error?: string
  defaultValue?: string
  required?: boolean
  optional?: boolean
  labelHidden?: boolean
  hint?: string
  autoComplete?: string
  inputMode?: 'text' | 'email' | 'tel' | 'numeric'
  placeholder?: string
  className?: string
}) {
  const errorId = `${name}-error`

  return (
    <div className={className}>
      <Label htmlFor={name} optional={optional} required={required} hint={hint} labelHidden={labelHidden}>
        {label}
      </Label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        defaultValue={defaultValue}
        autoComplete={autoComplete}
        inputMode={inputMode}
        placeholder={placeholder}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        className={cn(inputBase, error ? 'border-danger' : 'border-border-strong')}
      />
      <FieldError id={errorId} message={error} />
    </div>
  )
}

export function TextArea({
  name,
  label,
  error,
  defaultValue,
  required,
  optional,
  labelHidden,
  hint,
  rows = 5,
  placeholder,
  className,
}: {
  name: string
  label: string
  error?: string
  defaultValue?: string
  required?: boolean
  optional?: boolean
  labelHidden?: boolean
  hint?: string
  rows?: number
  placeholder?: string
  className?: string
}) {
  const errorId = `${name}-error`

  return (
    <div className={className}>
      <Label htmlFor={name} optional={optional} required={required} hint={hint} labelHidden={labelHidden}>
        {label}
      </Label>
      <textarea
        id={name}
        name={name}
        rows={rows}
        required={required}
        defaultValue={defaultValue}
        placeholder={placeholder}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        className={cn(
          inputBase,
          'resize-y',
          error ? 'border-danger' : 'border-border-strong',
        )}
      />
      <FieldError id={errorId} message={error} />
    </div>
  )
}

export function SelectField({
  name,
  label,
  options,
  error,
  defaultValue,
  required,
  labelHidden,
  hint,
  className,
}: {
  name: string
  label: string
  options: Array<{ value: string; label: string }>
  error?: string
  defaultValue?: string
  required?: boolean
  labelHidden?: boolean
  hint?: string
  className?: string
}) {
  const errorId = `${name}-error`

  return (
    <div className={className}>
      <Label htmlFor={name} hint={hint} required={required} labelHidden={labelHidden}>
        {label}
      </Label>
      <select
        id={name}
        name={name}
        required={required}
        defaultValue={defaultValue}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        className={cn(inputBase, error ? 'border-danger' : 'border-border-strong')}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <FieldError id={errorId} message={error} />
    </div>
  )
}

export function CheckboxField({
  name,
  children,
  error,
  defaultChecked,
}: {
  name: string
  children: React.ReactNode
  error?: string
  defaultChecked?: boolean
}) {
  const errorId = `${name}-error`

  return (
    <div>
      <div className="flex gap-3">
        <input
          id={name}
          name={name}
          type="checkbox"
          defaultChecked={defaultChecked}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          /* 24px is the WCAG 2.5.8 floor for a target, and the box was 20.
             The label is clickable too, so the usable area is larger than
             this — but the box is what a reader aims at. */
          className="mt-0.5 size-6 shrink-0 accent-[var(--color-primary)]"
        />
        <label htmlFor={name} className="text-sm leading-relaxed text-neutral-700">
          {children}
        </label>
      </div>
      <FieldError id={errorId} message={error} />
    </div>
  )
}

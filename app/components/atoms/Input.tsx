import React, { forwardRef } from 'react'

export type InputElement = HTMLElement


interface SelectOption {
  label: string
  value: string
}

interface InputProps
  extends React.InputHTMLAttributes<InputElement> {
  as?: 'input' | 'textarea' | 'select'
  variant?: 'default' | 'select'
  rows?: number
  options?: SelectOption[]
}

const baseInputStyles =
  'w-full px-4 py-3 border rounded-lg bg-white text-sm focus:outline-none transition'

const variantStyles = {
  default:
    'focus:ring-2 focus:ring-primary-500 focus:border-transparent focus:border-slate-200',
  select:
    'focus:ring-2 focus:ring-primary-500 focus:border-transparent focus:border-slate-300',
}

const Input = forwardRef<InputElement, InputProps>(
  (
    {
      as = 'input',
      className = '',
      rows = 3,
      options = [],
      disabled,
      variant = 'default',
      ...props
    },
    ref
  ) => {
    const styles = `
      ${baseInputStyles}
      ${variantStyles[variant]}
      ${className}
      ${disabled ? 'bg-slate-100 cursor-not-allowed' : ''}
    `

    if (as === 'textarea') {
      return <textarea ref={ref} className={styles} rows={rows} disabled={disabled} {...props} />
    }

    if (as === 'select') {
      return (
        <select ref={ref} className={styles} disabled={disabled} {...props}>
          {options.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      )
    }

    return <input ref={ref} className={styles} disabled={disabled} {...props} />
  }
)

Input.displayName = 'Input'

export default Input

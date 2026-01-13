import React from 'react'

export type InputElement =
  | HTMLInputElement
  | HTMLTextAreaElement
  | HTMLSelectElement

interface SelectOption {
  label: string
  value: string
}

interface InputProps {
  as?: 'input' | 'textarea' | 'select'
  placeholder?: string
  value?: string
  onChange?: (e: React.ChangeEvent<InputElement>) => void
  type?: string
  className?: string
  disabled?: boolean
  variant?: 'default' | 'select'

  /* textarea */
  rows?: number

  /* select */
  options?: SelectOption[]
}

const baseInputStyles =
  'w-full px-4 py-3 border rounded-lg bg-white text-sm focus:outline-none transition'

const variantStyles = {
  default: 'focus:ring-2 focus:ring-blue-500 focus:border-blue-500',
  select: 'focus:ring-2 focus:ring-green-500 focus:border-green-500',
}

const Input = ({
  as = 'input',
  placeholder,
  value,
  onChange,
  type = 'text',
  className = '',
  rows = 3,
  options = [],
  disabled,
  variant = 'default',
}: InputProps) => {
  const styles = `
    ${baseInputStyles}
    ${variantStyles[variant]}
    ${className}
    ${disabled ? 'bg-slate-100 cursor-not-allowed' : ''}
  `

  if (as === 'textarea') {
    return (
      <textarea
        className={styles}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        rows={rows}
        disabled={disabled}
      />
    )
  }

  if (as === 'select') {
    return (
      <select
        className={styles}
        value={value}
        onChange={onChange}
        disabled={disabled}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    )
  }

  return (
    <input
      className={styles}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      disabled={disabled}
    />
  )
}

export default Input

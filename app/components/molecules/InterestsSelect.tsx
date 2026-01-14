'use client'

import React from 'react'

interface Option {
  label: string
  value: string
}

interface InterestsSelectProps {
  label: string
  options: Option[]
  value: string[]
  onChange: (values: string[]) => void
  max?: number
  error?: string
}

const InterestsSelect: React.FC<InterestsSelectProps> = ({
  label,
  options,
  value,
  onChange,
  max = 3,
  error,
}) => {
  const [open, setOpen] = React.useState(false)

  const hasError = Boolean(error && value.length === 0)

  const toggleOption = (val: string) => {
    if (value.includes(val)) {
      onChange(value.filter(v => v !== val))
    } else {
      if (value.length >= max) return
      onChange([...value, val])
    }
  }

  const removeChip = (val: string) => {
    onChange(value.filter(v => v !== val))
  }

  return (
    <div className="relative flex flex-col">
      {/* Label */}
      <label
        className={`body-sm mb-1.5 ${
          hasError ? 'text-red-500' : 'text-slate-700'
        }`}
      >
        {label} <span className="text-red-500">*</span>
      </label>

      {/* Input-like box */}
      <div
        onClick={() => setOpen(prev => !prev)}
        className={`
          flex min-h-12 flex-wrap items-center gap-2
          rounded-lg border px-3 py-2 cursor-pointer
          ${
            hasError
              ? 'border-red-500 ring-2 ring-red-500/20'
              : open
              ? 'border-primary-500 ring-2 ring-primary-500/20'
              : 'border-slate-300'
          }
        `}
      >
        {value.length === 0 && (
          <span className="text-slate-400 text-sm">
            Select interests
          </span>
        )}

        {value.map(v => {
          const opt = options.find(o => o.value === v)
          return (
            <span
              key={v}
              className="flex items-center gap-1 rounded-md bg-green-100 px-2 py-1 text-sm text-green-700"
            >
              {opt?.label}
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  removeChip(v)
                }}
                className="text-green-700 hover:text-green-900"
              >
                ×
              </button>
            </span>
          )
        })}

        <span className="ml-auto text-slate-400">▾</span>
      </div>

      {/* Dropdown */}
      {open && (
        <div className="absolute top-full z-10 mt-1 w-full rounded-lg border bg-white shadow">
          {value.length >= max && (
            <div className="bg-orange-50 px-4 py-2 text-sm text-orange-600">
              Maximum {max} options selected
            </div>
          )}

          <div className="max-h-56 overflow-auto">
            {options.map(option => {
              const checked = value.includes(option.value)
              const disabled = !checked && value.length >= max

              return (
                <label
                  key={option.value}
                  className={`
                    flex items-center gap-3 px-4 py-2
                    ${checked ? 'bg-green-50' : ''}
                    ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:bg-slate-50'}
                  `}
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    disabled={disabled}
                    onChange={() => toggleOption(option.value)}
                    className="h-4 w-4 accent-green-600"
                  />
                  <span>{option.label}</span>
                </label>
              )
            })}
          </div>
        </div>
      )}

      {/* Error message (hidden when open – no gap) */}
      {!open && hasError && (
        <p className="mt-1 text-xs text-red-500">{error}</p>
      )}
    </div>
  )
}

export default InterestsSelect

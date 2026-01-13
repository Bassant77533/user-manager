'use client'

import React from 'react'

interface Option {
  label: string
  value: string
}

interface CustomSingleSelectProps {
  label: string
  value?: string
  onChange: (value: string) => void
  options: Option[]
  placeholder?: string
}

const CustomSingleSelect: React.FC<CustomSingleSelectProps> = ({
  label,
  value,
  onChange,
  options,
  placeholder = 'Select option',
}) => {
  const [open, setOpen] = React.useState(false)

  const selectedOption = options.find(o => o.value === value)

  return (
    <div className="relative flex flex-col gap-1.5">
      {/* Label */}
      <label className="body-sm text-slate-700">
        {label}
      </label>

      {/* Trigger */}
      <div
        onClick={() => setOpen(prev => !prev)}
        className={`
          flex items-center justify-between
          min-h-[48px] px-4 cursor-pointer
          rounded-lg border bg-white
          ${open
            ? 'border-green-500 ring-2 ring-green-500/20'
            : 'border-slate-300'}
        `}
      >
        <span className={selectedOption ? 'text-slate-900' : 'text-slate-400'}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>

        <span className="text-slate-400">▾</span>
      </div>

      {/* Dropdown */}
      {open && (
        <div className="absolute top-full z-10 mt-1 w-full rounded-lg border bg-white shadow">
          {options.map(option => {
            const selected = option.value === value

            return (
              <div
                key={option.value}
                onClick={() => {
                  onChange(option.value)
                  setOpen(false)
                }}
                className={`
                  flex items-center justify-between px-4 py-2 cursor-pointer
                  ${selected
                    ? 'bg-green-50 text-green-700'
                    : 'hover:bg-slate-50'}
                `}
              >
                <span>{option.label}</span>
                {selected && <span className="text-green-600">✓</span>}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default CustomSingleSelect

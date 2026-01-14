'use client'

import React from 'react'
import { Icon } from '../atoms/Icons/Icon'

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
  required?: boolean
  disabled?: boolean
  error ?: string 
}

const CustomSingleSelect: React.FC<CustomSingleSelectProps> = ({
  label,
  value,
  onChange,
  options,
  placeholder = 'Select option',
  required = false,
  error ,
  disabled = false,
}) => {
  const [open, setOpen] = React.useState(false)

  const selectedOption = options.find(o => o.value === value)
  const hasError = required && !value && error 

  return (
    <div className="relative flex flex-col gap-1.5">
      {/* Label */}
      <label className="body-sm text-slate-700">
        {label}
        {required && <span className="ml-1 text-red-500">*</span>}
      </label>

      {/* Trigger */}
      <div
        onClick={() => !disabled && setOpen(prev => !prev)}
        className={`
          flex items-center justify-between
          min-h-[48px] px-4 rounded-lg border bg-white
          ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}
          ${
            hasError
              ? 'border-red-500 ring-2 ring-red-500'
              : open
              ? 'border-green-500 ring-2 ring-green-500/20'
              : 'border-slate-300'
          }
        `}
      >
        <span className={selectedOption ? 'text-slate-900' : 'text-slate-400'}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>

        <span className="text-slate-400">▾</span>
      </div>

      {/* Dropdown */}
      {open && !disabled && (
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
                  ${
                    selected
                      ? 'bg-primary-50 text-primary-500'
                      : 'hover:bg-slate-100'
                  }
                `}
              >
                <span>{option.label}</span>
                {selected && <span className="text-primary-500"><Icon name='check'/></span>}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default CustomSingleSelect

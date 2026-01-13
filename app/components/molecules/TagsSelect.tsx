'use client'

import React from 'react'
import Input from '../atoms/Input'

interface TagOption {
  label: string
  value: string
}

interface TagsSelectProps {
  label: string
  options: TagOption[]
  value: string[]
  onChange: (values: string[]) => void
  placeholder?: string
}

const TagsSelect: React.FC<TagsSelectProps> = ({
  label,
  options,
  value,
  onChange,
  placeholder = 'Select tags',
}) => {
  const [open, setOpen] = React.useState(false)
  const [search, setSearch] = React.useState('')

  const filteredOptions = options.filter(opt =>
    opt.label.toLowerCase().includes(search.toLowerCase())
  )

  const toggleTag = (val: string) => {
    if (value.includes(val)) {
      onChange(value.filter(v => v !== val))
    } else {
      onChange([...value, val])
    }
  }

  const removeChip = (val: string) => {
    onChange(value.filter(v => v !== val))
  }

  return (
    <div className="relative flex flex-col gap-1.5">
      {/* Label */}
      <label className="body-sm text-slate-700">
        {label}
      </label>

      {/* Input-like box */}
      <div
        className={`
          flex min-h-[48px] flex-wrap items-center gap-2
          rounded-lg border px-3 py-2 cursor-pointer bg-white
          ${open
            ? 'border-primary-500 ring-2 ring-primary-500/20'
            : 'border-slate-300'}
        `}
        onClick={() => setOpen(prev => !prev)}
      >
        {value.length === 0 && (
          <span className="text-slate-400 text-sm">
            {placeholder}
          </span>
        )}

        {value.map(v => {
          const tag = options.find(o => o.value === v)
          return (
            <span
              key={v}
              className="flex items-center gap-1 rounded-md bg-green-100 px-2 py-1 text-sm text-green-700"
            >
              {tag?.label}
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  removeChip(v)
                }}
                className="hover:text-green-900"
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
          {/* Search */}
          <div className="p-2">
            <Input
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Options */}
          <div className="max-h-56 overflow-auto">
            {filteredOptions.map(option => {
              const checked = value.includes(option.value)

              return (
                <label
                  key={option.value}
                  className="flex items-center gap-3 px-4 py-2 cursor-pointer hover:bg-slate-50"
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => toggleTag(option.value)}
                    className="h-4 w-4 accent-green-600"
                  />
                  <span>{option.label}</span>
                </label>
              )
            })}

            {filteredOptions.length === 0 && (
              <div className="px-4 py-2 text-sm text-slate-400">
                No results
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default TagsSelect

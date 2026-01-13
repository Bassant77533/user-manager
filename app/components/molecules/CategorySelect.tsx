import React from 'react'
import Input from '../atoms/Input'

interface Option {
    label: string
    value: string
}

interface CategorySelectProps {
    label: string
    options: Option[]
    value?: string
    onChange: (value: string) => void
    placeholder?: string
}

const CategorySelect: React.FC<CategorySelectProps> = ({
label,
options,
value,
onChange,
placeholder = 'Select category',
}) => {
const [open, setOpen] = React.useState(false)
const [search, setSearch] = React.useState('')

const selectedOption = options.find(o => o.value === value)

const filteredOptions = options.filter(option =>
option.label.toLowerCase().includes(search.toLowerCase())
)

return (
<div className="relative flex flex-col gap-1.5">
    {/* Label */}
    <label className="body-sm text-slate-700">
    {label}
    </label>

    {/* Input-like box */}
    <div
    className={`
        flex items-center justify-between
        min-h-12 px-4
        rounded-lg border cursor-pointer bg-white
        ${open ? 'border-primary-500 ring-2 ring-primary-500/20' : 'border-slate-300'}
    `}
    onClick={() => setOpen(!open)}
    >
    <span className={selectedOption ? 'text-slate-900' : 'text-slate-400'}>
        {selectedOption ? selectedOption.label : placeholder}
    </span>

    <span className="text-slate-400">▾</span>
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
        {filteredOptions.length === 0 && (
            <div className="px-4 py-2 text-sm text-slate-400">
            No results
            </div>
        )}

        {filteredOptions.map(option => {
            const selected = option.value === value

            return (
            <div
                key={option.value}
                onClick={() => {
                onChange(option.value)
                setOpen(false)
                setSearch('')
                }}
                className={`
                flex items-center justify-between px-4 py-2 cursor-pointer
                ${selected ? 'bg-green-50 text-green-700' : 'hover:bg-slate-50'}
                `}
            >
                <span>{option.label}</span>
                {selected && <span>✓</span>}
            </div>
            )
        })}
        </div>
    </div>
    )}
</div>
)
}

export default CategorySelect

import React from 'react'
import Input, { InputElement } from '../atoms/Input'


interface SelectOption {
  label: string
  value: string
}

interface InputFieldProps {
    label: string
    type?: string
    placeholder?: string
    value?: string
    onChange?: (e: React.ChangeEvent<InputElement>) => void
    helperText?: string
    error?: string
    disabled?: boolean
    leftIcon?: React.ReactNode
    as?: 'input' | 'textarea' | 'select'
    options?: SelectOption[]
}

const InputField: React.FC<InputFieldProps> = ({
    label,
    type = 'text',
    placeholder,
    value,
    onChange,
    helperText,
    error,
    disabled,
    leftIcon,
    options,
    as = 'input',
}) => {
return (
<div className="flex flex-col gap-1.5">

    {/* Label */}
    <label className={` body-sm ${error ? 'text-red-500 ' : 'text-stale-100'} `}>
    {label}
    </label>

    {/* Input and Icon */}
    <div className="relative">
    {leftIcon && (
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
        {leftIcon}
        </span>
    )}

    <Input
        as={as}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        options={options}
        disabled={disabled}
        className={`
        ${leftIcon ? 'pl-11' : ''}
        ${error ? 'border-red-500 focus:ring-red-500' : 'border-slate-500 focus:ring-primary-500'}
        `}
    />
    </div>

    {/* Helper / Error */}
    {error ? (
    <p className="caption text-red-500">{error}</p>
    ) : helperText ? (
    <p className="caption text-slate-500">{helperText}</p>
    ) : null}
</div>
)
}

export default InputField

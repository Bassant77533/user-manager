import React from 'react'
import RadioButton from '../atoms/RadioButton'

interface RadioOption {
    label: string
    value: string
}

interface RadioGroupProps {
    label: string
    name: string
    options: RadioOption[]
    value?: string
    onChange?: (value: string) => void
    helperText?: string
    error?: string
    disabled?: boolean
}

const RadioGroup: React.FC<RadioGroupProps> = ({
    label,
    name,
    options,
    value,
    onChange,
    helperText,
    error,
    disabled,
}) => {
return (
<fieldset className="flex flex-col gap-2">
    
    {/* Group Label */}
    <legend className="text-sm font-medium text-slate-700">
    {label}
    </legend>

    {/* Radios */}
    {options.map(option => (
    <RadioButton
        key={option.value}
        label={option.label}
        value={option.value}
        name={name}
        checked={value === option.value}
        disabled={disabled}
        onChange={() => onChange?.(option.value)}
    />
    ))}

    {/* Helper / Error */}
    {error ? (
    <p className="text-xs text-red-500">{error}</p>
    ) : helperText ? (
    <p className="text-xs text-slate-500">{helperText}</p>
    ) : null}
</fieldset>
)
}

export default RadioGroup

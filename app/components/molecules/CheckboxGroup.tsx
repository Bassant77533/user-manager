import React from 'react'
import Checkbox from '../atoms/CheckBox'

interface CheckboxGroupProps {
    label: string
    options: string[]
    values?: string[]
    onChange?: (values: string[]) => void
    error?: string
    helperText?: string
}

const CheckboxGroup: React.FC<CheckboxGroupProps> = ({
    label,
    options,
    values = [],
    onChange,
    error,
    helperText,
}) => {
const toggleValue = (value: string) => {
const updatedValues = values.includes(value)
    ? values.filter(v => v !== value)
    : [...values, value]

onChange?.(updatedValues)
}

return (
<fieldset className="flex flex-col gap-2">
    <legend className="text-sm font-medium text-slate-700">
    {label}
    </legend>

    {options.map(option => (
    <Checkbox
        key={option}
        label={option}
        checked={values.includes(option)}
        onChange={() => toggleValue(option)}
    />
    ))}

    {error ? (
    <p className="text-xs text-red-500">{error}</p>
    ) : helperText ? (
    <p className="text-xs text-slate-500">{helperText}</p>
    ) : null}
</fieldset>
)
}

export default CheckboxGroup

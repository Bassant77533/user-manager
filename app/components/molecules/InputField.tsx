import React, { forwardRef } from 'react'
import Input, { InputElement } from '../atoms/Input'

interface SelectOption {
    label: string
    value: string
}

interface InputFieldProps {
    label: string
    type?: string
    placeholder?: string
    helperText?: string
    error?: string
    disabled?: boolean
    leftIcon?: React.ReactNode
    as?: 'input' | 'textarea' | 'select'
    options?: SelectOption[]
    required?: boolean
}

const InputField = forwardRef<InputElement, InputFieldProps>(
(
{
    label,
    required = true,
    type = 'text',
    placeholder,
    helperText,
    error,
    disabled,
    leftIcon,
    options,
    as = 'input',
...rest

},
ref
) => {
return (
    <div className="flex flex-col gap-1.5">
    {/* Label */}
    <label className={`body-sm ${error ? 'text-red-500' : ''}`}>
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
    </label>

    {/* Input and Icon */}
    <div className="relative">
        {leftIcon && (
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
            {leftIcon}
        </span>
        )}

    <Input
    ref={ref}
    as={as}
    type={type}
    placeholder={placeholder}
    options={options}
    disabled={disabled}
    {...rest}   
    className={`
        ${leftIcon ? 'pl-11' : ''}
        ${
        error
            ? 'border-red-500 focus:ring-red-500'
            : 'border-slate-300 focus:ring-primary-500'
        }
    `}
    />
    </div>

    {/* Helper / Error */}
    {error ? (
        <p className="caption text-red-500">{error}</p>
    ) : " " }
    {helperText ? (
        <p className="caption text-slate-500">{helperText}</p>
    ) : null
    }
    </div>
)
}
)

InputField.displayName = 'InputField'

export default InputField

import React from 'react';

type InputElement =  HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;

interface SelectOption {
    label: string;
    value: string;
}

interface InputProps {
    as?: 'input' | 'textarea' | 'select';
    placeholder?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<InputElement>) => void;
    type?: string;
    className?: string;
    /* textarea */
    rows?: number;
    /* select */
    options?: SelectOption[];
}
const baseInputStyles = 'w-full px-4 py-3 border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent';
const Input = ({
    as = 'input',
    placeholder,
    value,
    onChange,
    type = 'text',
    className,
    rows = 3,
    options = [],
}: InputProps) => {
return (
<>
    {as === 'textarea' && (
    <textarea
        className={baseInputStyles + ' ' + (className || '')}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        rows={rows}
    />
    )}

    {as === 'select' && (
    <select
        className= {baseInputStyles + ' ' + (className || '')}
        value={value}
        onChange={onChange}
    >
        {placeholder && (
        <option value="" disabled>
            {placeholder}
        </option>
        )}

        {options.map((option) => (
        <option key={option.value} value={option.value}>
            {option.label}
        </option>
        ))}
    </select>
    )}

    {as === 'input' && (
    <input
        className={baseInputStyles + ' ' + (className || '')}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
    />
    )}
</>
);
};

export default Input;

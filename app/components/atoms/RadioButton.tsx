import React from 'react';

interface RadioProps {
    label: string;
    value: string;
    name: string;
    checked?: boolean;
    disabled?: boolean;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    className?: string;
}

const RadioButton = ({
    label,
    value,
    name,
    checked,
    disabled,
    onChange,
    className,
}: RadioProps) => {
return (
<label
    className={`flex items-center gap-3 ${
    disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
    } ${className || ''}`}
>
    <input
    type="radio"
    name={name}
    value={value}
    checked={checked}
    disabled={disabled}
    onChange={onChange}
    className="h-4 w-4 "
    />
    <span>{label}</span>
</label>
);
};

export default RadioButton;

import React from 'react';

interface CheckboxProps {
    label?: string;
    checked?: boolean;
    disabled?: boolean;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    className?: string;
}

const CheckBox = ({
    label,
    checked,
    disabled,
    onChange,
    className,
}: CheckboxProps) => {
return (
<label
    className={`flex items-center gap-3 ${
    disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
    } ${className || ''}`}
>
    <input
    type="checkbox"
    checked={checked}
    disabled={disabled}
    onChange={onChange}
    className="h-4 w-4"
    />
    {label && <span >{label}</span>}
</label>
);
};

export default CheckBox;

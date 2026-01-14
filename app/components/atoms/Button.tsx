import React from 'react'
import clsx from 'clsx'
import { Icon } from './Icons/Icon'
import { IconName } from './Icons/icon.types'

interface ButtonProps {
    children: React.ReactNode
    onClick?: () => void
    className?: string
    disabled?: boolean
    variant?: 'primary' | 'secondary' | 'ghost' | 'accent'
    icon?: IconName
    type?: 'button' | 'submit' | 'reset' 
    iconPosition?: 'left' | 'right'
}

const Button = ({
    children,
    onClick,
    className,
    variant = 'primary',
    disabled,
    icon,
    type = 'button',
    iconPosition =  'left'
}: Readonly<ButtonProps>) => {
const btnType =
    variant === 'primary'
    ? 'bg-primary-600 hover:bg-primary-700 text-white'
    : variant === 'secondary'
    ? 'border-2 border-primary-600 text-primary-600 hover:bg-primary-50'
    : variant === 'ghost'
    ? 'text-slate-600 hover:bg-slate-100'
    : 'bg-accent-500 hover:bg-accent-600 text-white'

return (
<button
    type={type}
    onClick={onClick}
    disabled={disabled}
    className={clsx(
    'inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors',
    btnType,
    disabled && 'opacity-50 cursor-not-allowed pointer-events-none',
    className
    )}
>  
    {icon && iconPosition === 'left' && <Icon name={icon} />}
    {children}
    {icon && iconPosition === 'right' && <Icon name={icon} />}
</button>
)
}

export default Button

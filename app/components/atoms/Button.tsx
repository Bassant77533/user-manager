import React from 'react'

interface ButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    className?: string;
    disabled?: boolean
    variant?: 'primary' | 'secondary' | 'ghost' | 'accent'
}


const Button = ({ children, onClick, className, variant , disabled }: Readonly<ButtonProps>) => {
    const btnType = variant === 'primary' ? 'bg-primary-600 hover:bg-primary-700 text-white ' :
                variant === 'secondary' ? 'border-2 border-primary-600 text-primary-600 hover:bg-primary-50 ' :
                variant === 'ghost' ? 'text-stale-600 hover:bg-stale-100 ' :
                'bg-accent-500 hover:bg-accent-600 text-white ';
    return (
        <button
            onClick={onClick}
            className={` font-medium transition-colors rounded-lg ${btnType} ${className} ${disabled ? 'opacity-50 hover:cursor-not-allowed' : ''}  cursor-pointer px-4 py-2`}
        >
    {children}
</button>
)
}

export default Button

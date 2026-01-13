import React from 'react'

interface ButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    className?: string;
    disabled?: boolean
    variant?: 'primary' | 'secondary' | 'ghost' | 'accent'
}


const Button = ({ children, onClick, className, variant }: Readonly<ButtonProps>) => {
return (
    <button
    onClick={onClick}
    variant={variant}
    className={`px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
>
    {children}
</button>
)
}

export default Button

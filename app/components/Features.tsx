import React from 'react'
import { Icon } from './atoms/Icons/Icon'
import { IconName } from './atoms/Icons/icon.types'

interface FeaturesProps { 
    iconName: IconName, 
    title: string,
    description: string,
    color?: string, 
}
const Features = ({ iconName, title, description , color }: FeaturesProps) => {
return (
    <div className='border-slate-200 rounded-lg p-4 bg-white'>
        <div className={`w-10 h-10 ${color ? `bg-${color}` : 'bg-primary-100'} rounded-lg flex items-center justify-center mb-3`}>
            <Icon name={iconName} className={`text-${color || 'primary-500'}`} />
        </div>
        <h3 className='text-lg font-semibold mt-2'>{title}</h3>
        <p className='text-slate-600 body-sm mt-1'>{description}</p>
    </div>
)
}

export default Features

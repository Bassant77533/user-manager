import React from 'react';
import { Check } from 'lucide-react';

interface StepCircleProps { 
    content?: number | React.ReactNode;
    isActive ?: boolean; 
    isCompleted ?: boolean;
    size?: "small" | "large"; 
    title: string; 
}

const StepCircle = ({
    content,
    isActive = false ,
    isCompleted,
    size = "large",
    title,
}: StepCircleProps) => {

//size
const sizeClasses = size === "small" ? "w-6 h-6 text-xs " : "w-8 h-8 text-sm";


// state colors
const stateClasses = isCompleted
    ? "bg-primary-600 text-white"
    : isActive
    ? "bg-primary-600 text-white"
    : "bg-slate-200 text-slate-600";

return (
<div className="flex flex-col items-center">
    <div
    className={`flex items-center justify-center rounded-full  mb-2 ${sizeClasses} ${stateClasses}`}
    >
    {isCompleted ? (
        <Check size={16} strokeWidth={2} />
    ) : (
        content
    )}
    </div>
    <span className={`text-sm font-medium ${isActive ? 'text-primary-600' : 'text-slate-600'}`}>
    {title}
    </span>
</div>
);
};

export default StepCircle;

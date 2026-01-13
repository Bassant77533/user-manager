import React from 'react'
import StepCircle from '../atoms/StepCircle'


interface Step {
    id: number
    title: string
}


interface ProgressBarProps {
    steps: Step[]
    currentStep: number
}

const ProgressBar = ({steps, currentStep}: ProgressBarProps) => {
return (
    <div> 
        <div className='flex  items-center justify-between mb-8'>
            {
                steps.map((step,index)=>{
                    const isActive = step.id === currentStep
                    const isCompleted = step.id < currentStep
                    return (
                        <React.Fragment key={step.id}>
                            <StepCircle content={step.id} title={step.title} isActive={isActive} isCompleted={isCompleted} />
                            {/* connector */}
                            {index < steps.length - 1 && (
                                <div className="mx-4 flex-1 h-1 bg-slate-200 rounded">
                                <div
                                    className={`h-1 rounded transition-all duration-300 ${
                                    isCompleted ? 'bg-green-600 w-full' : 'w-0'
                                    }`}
                                />
                                </div>
                            )}
                        </React.Fragment>
                    )
                })
            }
        </div>
        <div className="text-center text-sm text-slate-600">{currentStep} of {steps.length} - {(currentStep / steps.length * 100).toFixed(0)} % completed</div>
    </div>
)
}

export default ProgressBar

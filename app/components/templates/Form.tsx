'use client'

import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import ProgressBar from '../organisms/ProgressBar'
import PersonalInfoStep from '../organisms/PersonalInfoStep'
import PreferencesStep from '../organisms/PreferencesStep'
import Button from '../atoms/Button'
import { userFormSchema, UserFormValues } from '@/app/schemas/user.form.schema'
import ReviewandSubmit from '../organisms/ReviewandSubmit'
import SuccessModal from '../pages/SuccessModal'

const TOTAL_STEPS = 3

export default function StepperForm() {
const [step, setStep] = useState(1)

const methods = useForm<UserFormValues>({
resolver: zodResolver(userFormSchema),
mode: 'onTouched',
shouldUnregister: false,  
defaultValues: {
    fullName: '',
    email: '',
    gender: '',
    country: '',
    age: undefined,
    category: '',
},
})

const nextStep = async () => {
    
const stepFields: (keyof UserFormValues)[] =
step === 1
    ? ['fullName', 'email', 'gender', 'country', 'age']
: step === 2
    ? ['category' , 'interests']
    : []

const isValid = await methods.trigger(stepFields)
console.log('isValid', isValid)
console.log(methods.watch())
if (isValid) {
setStep((s) => s + 1)
}
}

const prevStep = () => setStep((s) => s - 1)

const onSubmit = (data: UserFormValues) => {
    console.log('onSubmit called, current step:', step)
    // Only process if we're actually on step 3 AND form is being submitted
    if (step === TOTAL_STEPS) {
        console.log('FINAL DATA:', data)
        setShowSuccess(true)
    }
}


const steps = [
    { id: 1, title: 'Personal' },
    { id: 2, title: 'Preferences' },
    { id: 3, title: 'Review' },
]
const [showSuccess, setShowSuccess] = useState(false)

return (
    <div className="max-w-4xl mx-auto my-10">
        <ProgressBar currentStep={step} steps={steps} />
        <div className="bg-white rounded-xl p-8 mt-4">
        <FormProvider {...methods}>
            <form>
            {step === 1 && <PersonalInfoStep />}
            {step === 2 && <PreferencesStep />}
            {step === 3 && <ReviewandSubmit />}
            <div className="flex justify-between mt-6">
                {step > 1 && (
                <Button
                    variant="secondary"
                    icon="chevronLeft"
                    onClick={prevStep}
                    type='button'
                >
                    Back
                </Button>
                )}
                {step < TOTAL_STEPS ? (
                <Button  type='button' variant="primary" onClick={nextStep} icon='chevronRight' iconPosition='right'>
                    Next Step
                </Button>
                ) : (
                <Button  variant="primary"  onClick={methods.handleSubmit(onSubmit)}>
                    Submit
                </Button>
                )}
            </div>
            </form>
        </FormProvider>
        </div>
        <SuccessModal
            open={showSuccess}
        onClose={() => {
            setShowSuccess(false)   
            methods.reset()     
            setStep(1)         
        }}

        onConfirm={() => {
            setShowSuccess(false)  // Closes the modal
            methods.reset()         // Resets all form fields to default values
            setStep(1)              // Goes back to step 1
        }}
        />
    </div>
)
}

'use client'

import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import ProgressBar from '../organisms/ProgressBar'
import PersonalInfoStep from '../organisms/PersonalInfoStep'
import PreferencesStep from '../organisms/PreferencesStep'
import Button from '../atoms/Button'
import { userFormSchema, UserFormValues } from '@/app/schemas/user.form.schema'

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
},
})

const nextStep = async () => {
    
  const stepFields: (keyof UserFormValues)[] =
    step === 1
      ? ['fullName', 'email', 'gender', 'country', 'age']
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
    console.log('FINAL DATA:', data)
}

const steps = [
    { id: 1, title: 'Personal' },
    { id: 2, title: 'Preferences' },
    { id: 3, title: 'Review' },
]

return (
    <div className="max-w-4xl mx-auto my-10">
        <ProgressBar currentStep={step} steps={steps} />

        <div className="bg-white rounded-xl p-8 mt-4">
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
            {step === 1 && <PersonalInfoStep />}
            {step === 2 && <PreferencesStep />}

            <div className="flex justify-between mt-6">
                {step > 1 && (
                <Button
                    variant="secondary"
                    icon="chevronLeft"
                    onClick={prevStep}
                >
                    Back
                </Button>
                )}

                {step < TOTAL_STEPS ? (
                <Button  variant="primary" onClick={nextStep}>
                    Next Step
                </Button>
                ) : (
                <Button   variant="primary">
                    Submit
                </Button>
                )}
            </div>
            </form>
        </FormProvider>
        </div>
    </div>
)
}

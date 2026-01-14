import { Controller, useFormContext } from 'react-hook-form'
import InputField from '../molecules/InputField'
import CustomSingleSelect from '../molecules/SingleSelect'
import CountrySelect from '../molecules/CountrySelect'
import { UserFormValues } from '@/app/schemas/user.form.schema'



const genderOptions = [
  { label: 'Male', value: 'male' },
  { label: 'Female', value: 'female' },
]

const PersonalInfoStep = () => {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<UserFormValues>()
 
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Personal Information</h2>
      <InputField
        label="Full Name"
        placeholder="Maged Yassen"
        helperText="Must be 2–50 characters"
        error={errors.fullName?.message}
        {...register('fullName')}
      />
      <InputField
        label="Email Address"
        type="email"
        placeholder="maged.yassen@example.com"
        error={errors.email?.message}
        {...register('email')}
      />

      <Controller
        name="gender"
        control={control}
        render={({ field }) => (
          <CustomSingleSelect
            label="Gender"
            options={genderOptions}
            value={field.value}
            onChange={field.onChange}
            required
            error={errors.gender?.message}
          />
        )}
      />

      <Controller
        name="country"
        control={control}
        render={({ field }) => (
          <CountrySelect
            label="Country"
            value={field.value}
            onChange={field.onChange}
            placeholder="Select your country"
          />
        )}
      />

      <InputField
        label="Age"
        type="number"
        placeholder="30"
        helperText="Must be between 18 and 100"
        error={errors.age?.message}
        {...register('age')}
      />
    </div>
  )
}

export default PersonalInfoStep

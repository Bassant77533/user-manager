import { Controller, useFormContext } from 'react-hook-form'
import CustomSingleSelect from '../molecules/SingleSelect'
import { UserFormValues } from '@/app/schemas/user.form.schema'
import InterestsSelect from '../molecules/InterestsSelect'
import { Icon } from '../atoms/Icons/Icon'
import Button from '../atoms/Button'




const categoryOptions = [
  { label: 'Technology', value: 'technology' },
  { label: 'Design', value: 'design' },
  { label: 'Business', value: 'business' },
  { label: 'Marketing', value: 'marketing' },
  { label: 'Other', value: 'other' },
]
const interestOptions = [
  { label: 'Web Development', value: 'web_development' },
  { label: 'Graphic Design', value: 'graphic_design' },
  { label: 'Data Science', value: 'data_science' },
  { label: 'Digital Marketing', value: 'digital_marketing' },
  { label: 'Product Management', value: 'product_management' },]
const PreferencesStep = () => {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<UserFormValues>()

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Preferences</h2>
      <Controller
        name="category"
        control={control}
        render={({ field }) => (
          <CustomSingleSelect
            label="category"
            options={categoryOptions}
            value={field.value}
            onChange={field.onChange}
            required
            error={errors.category?.message}
          />
        )}
      />
      <Controller
        name="interests"
        control={control}
        defaultValue={[]}   
        render={({ field }) => (
          <InterestsSelect
            label="Interests"
            options={interestOptions}
            value={field.value}
            onChange={field.onChange}
            max={3}
            error={errors.interests?.message}
          />
        )}
      />
      <label className='body-sm text-slate-700 mb-3'>Avatar upload (Optional)</label>
      <div className=" w-full flex items-center justify-center flex-col space-y-3 border border-dotted border-slate-400 rounded-lg px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 transition-colors">
        <Icon name='upload' size="lg" className='text-slate-400' />
        <p className='text-slate-600'>Drag & drop your avatar here</p>
        <Button variant="primary" type='button'> Browse files</Button>
        <p className='caption text-slate-500'>PNG , JPG up to 5MB</p>
      </div>
    </div>
  )
  
}

export default PreferencesStep

import { useFormContext } from 'react-hook-form'
import { UserFormValues } from '@/app/schemas/user.form.schema'
import { Icon } from '../atoms/Icons/Icon'

const ReviewandSubmit = () => {
    const { watch } = useFormContext<UserFormValues>()
    const data = watch()
    return (
    <div className="space-y-4">
        <h2 className="text-lg font-semibold">Review & Submit</h2>
        <div className="rounded-xl  bg-slate-50 p-6 space-y-4">
        {Object.entries(data).map(([key, value]) => {
            if (!value || (Array.isArray(value) && value.length === 0)) {
            return null
            }
            return (
            <div key={key} className="flex justify-between border-b border-b-slate-200 pb-3">
                {/* Label */}
                <span className="text-xs font-medium text-slate-500 capitalize">
                {key}
                </span>
                {/* Value */}
                {!Array.isArray(value) ? (
                <span className="text-sm text-slate-800">
                    {String(value)}
                </span>
                ) : (
                <div className="flex flex-wrap gap-2">
                    {value.map((item) => (
                    <span
                        key={item}
                        className="rounded-md bg-green-100 px-2 py-1 text-xs font-medium text-green-700"
                    >
                        {item}
                    </span>
                    ))}
                </div>
                )}
            </div>
            )
        })}
        </div>
        <div className='bg-green-50 flex  rounded-xl p-4'>
            <Icon name='checkCircle' className='text-green-600 mr-3'></Icon>
            <div>
                <h3 className='body-sm font-medium text-primary-800'>Ready to submit</h3>
                <p className='caption text-primary-700'>Review all information carefully before submitting. You can go back to make changes.</p>
            </div>
        </div>
    </div>
    )
}

export default ReviewandSubmit

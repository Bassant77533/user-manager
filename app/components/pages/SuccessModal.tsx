import Button from '../atoms/Button'
import { Icon } from '../atoms/Icons/Icon'


interface SuccessModalProps {
    open: boolean
    title?: string
    description?: string
    onClose: () => void
    onConfirm: () => void
}

const SuccessModal: React.FC<SuccessModalProps> = ({
open,
title = 'User Added Successfully!',
description = 'The user has been added to the system. You can now view their profile or continue adding more users.',
onClose,
onConfirm,
}) => {
if (!open) return null



return (
<div className="fixed inset-0 z-50 flex items-center justify-center">
    {/* Overlay */}
    <div
    className="absolute inset-0 bg-black/30"
    onClick={onClose}
    />

    {/* Modal */}
    <div className="relative z-10 max-w-lg  rounded-xl bg-white p-12 shadow-lg">
    {/* Icon */}
    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-green-100 mb-6">
        <Icon
        name= "checkCircle"
        size="lg"
        className="text-green-600"
        />
    </div>

    {/* Title */}
    <h3 className="mb-3 text-center text-lg font-semibold text-slate-900">
        {title}
    </h3>

    {/* Description */}
    <p className="mb-8 text-center text-sm text-slate-600">
        {description}
    </p>

    {/* Actions */}
    <div className="flex justify-center gap-4">
        <Button
        variant="secondary"
        onClick={onClose}
        >
        Close
        </Button>

        <Button
        variant="primary"
        onClick={onConfirm}
        >
        View Users
        </Button>
    </div>
    </div>
</div>
)
}

export default SuccessModal

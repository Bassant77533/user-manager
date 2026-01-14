'use client'

type PaginationProps = {
    currentPage: number
    totalPages: number
    pageSize: number
    totalItems: number
    onPageChange: (page: number) => void
}

export default function Pagination({
    currentPage,
    totalPages,
    pageSize,
    totalItems,
    onPageChange,
}: PaginationProps) {
  const start = (currentPage - 1) * pageSize + 1
  const end = Math.min(currentPage * pageSize, totalItems)

return (
<div className="flex items-center justify-between p-4 border rounded-xl bg-green-50">
    {/* Left text */}
    <p className="text-sm text-slate-600">
    Showing <span className="font-medium">{start}</span> to{' '}
    <span className="font-medium">{end}</span> of {totalItems} results
    </p>

    {/* Buttons */}
    <div className="flex items-center gap-2">
    <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-1 border rounded-lg disabled:opacity-50"
    >
        Previous
    </button>

    {Array.from({ length: totalPages }).map((_, i) => {
        const page = i + 1
        return (
        <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`w-9 h-9 rounded-lg text-sm font-medium ${
            currentPage === page
                ? 'bg-green-600 text-white'
                : 'border hover:bg-white'
            }`}
        >
            {page}
        </button>
        )
    })}

    <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-1 border rounded-lg disabled:opacity-50"
    >
        Next
    </button>
    </div>
</div>
)
}

'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { ChevronDown, Check, Search, Loader2 } from 'lucide-react'

interface Country {
  name: string
  code: string
}

interface Props {
  label: string
  value?: string
  onChange: (value: string) => void
  placeholder?: string
}

const LIMIT = 5 

export default function CountrySelect({
  label,
  value,
  onChange,
  placeholder = 'Select country',
}: Props) {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [countries, setCountries] = useState<Country[]>([])
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [loading, setLoading] = useState(false)
  
  const containerRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLUListElement>(null)

  const fetchCountries = useCallback(async (pageNum: number, searchVal: string, isNewSearch: boolean) => {
    if (loading) return
    setLoading(true)
    try {
      const res = await fetch(
        `/api/countries?page=${pageNum}&limit=${LIMIT}&search=${encodeURIComponent(searchVal)}`
      )
      const data = await res.json()
      
      const newCountries = data.countries || []
      
      setCountries(prev => isNewSearch ? newCountries : [...prev, ...newCountries])
      setHasMore(data.hasMore)
    } catch (error) {
      console.error("Failed to load countries", error)
    } finally {
      setLoading(false)
    }
  }, [loading])

  // Reset and fetch when search changes or dropdown opens
  useEffect(() => {
    if (open) {
      setPage(1)
      fetchCountries(1, search, true)
    }
  }, [open, search]) // fetchCountries excluded from deps to prevent infinite loops

  const handleScroll = (e: React.UIEvent<HTMLUListElement>) => {
    const el = e.currentTarget
    // Logic: distance from bottom < 20px
    const isBottom = el.scrollHeight - el.scrollTop <= el.clientHeight + 20

    if (isBottom && hasMore && !loading) {
      const nextPage = page + 1
      setPage(nextPage)
      fetchCountries(nextPage, search, false)
    }
  }

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const selected = countries.find(c => c.code === value)

  return (
    <div ref={containerRef} className="relative w-full space-y-1">
      <label className="text-sm font-medium text-slate-700">{label}</label>

      <button
        type="button"
        onClick={() => setOpen(v => !v)}
        className="w-full flex items-center justify-between px-4 py-3 border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-primary-500 transition-all"
      >
        <span className={selected ? 'text-slate-900' : 'text-slate-400'}>
          {selected?.name || placeholder}
        </span>
        <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div className="absolute z-50 mt-2 w-full rounded-xl border bg-white shadow-xl overflow-hidden">
          <div className="p-2 border-b">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                autoFocus
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search countries..."
                className="w-full pl-9 pr-3 py-2 text-sm border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>

          <ul 
            ref={scrollRef}
            onScroll={handleScroll}
            className="max-h-60 overflow-y-auto overflow-x-hidden" // Critical for scroll event
          >
            {countries.map((c, index) => (
              <li
                key={`${c.code}-${index}`} // Combined key to prevent duplicates
                onClick={() => {
                  onChange(c.code)
                  setOpen(false)
                  setSearch('')
                }}
                className={`
                  flex items-center justify-between px-4 py-2.5 cursor-pointer text-sm
                  hover:bg-blue-50 transition-colors
                  ${value === c.code ? 'bg-blue-50 text-primary-700 font-medium' : 'text-slate-700'}
                `}
              >
                {c.name}
                {value === c.code && <Check className="w-4 h-4 text-primary-600" />}
              </li>
            ))}

            {loading && (
              <li className="flex justify-center items-center px-4 py-4 text-sm text-slate-400">
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
                Loading...
              </li>
            )}

            {!loading && countries.length === 0 && (
              <li className="px-4 py-6 text-center text-sm text-slate-400">No countries found</li>
            )}
            
            {!hasMore && countries.length > 0 && (
              <li className="px-4 py-2 text-center text-[10px] text-slate-300 uppercase">End of list</li>
            )}
          </ul>
        </div>
      )}
    </div>
  )
}
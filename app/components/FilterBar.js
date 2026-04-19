'use client'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'

export default function FilterBar() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [location, setLocation] = useState(searchParams.get('location') || '')
  const [type, setType] = useState(searchParams.get('type') || '')
  const [status, setStatus] = useState(searchParams.get('status') || '')

  const handleFilter = () => {
    const params = new URLSearchParams()
    if (location) params.set('location', location)
    if (type) params.set('type', type)
    if (status) params.set('status', status)
    router.push('/?' + params.toString())
  }

  const handleReset = () => {
    setLocation(''); setType(''); setStatus('')
    router.push('/')
  }

  const selectClass = "border border-gray-200 px-3 py-2 text-sm bg-white focus:outline-none focus:border-black w-full"

  return (
    <div className="flex flex-wrap gap-3 items-end mb-2">
      <div className="flex flex-col gap-1 min-w-36">
        <label className="text-xs text-gray-400 uppercase tracking-wider">Location</label>
        <select value={location} onChange={e => setLocation(e.target.value)} className={selectClass}>
          <option value="">All Locations</option>
          <option value="Canggu">Canggu</option>
          <option value="Seminyak">Seminyak</option>
          <option value="Ubud">Ubud</option>
          <option value="Jimbaran">Jimbaran</option>
          <option value="Uluwatu">Uluwatu</option>
          <option value="Sanur">Sanur</option>
          <option value="Pererenan">Pererenan</option>
        </select>
      </div>
      <div className="flex flex-col gap-1 min-w-36">
        <label className="text-xs text-gray-400 uppercase tracking-wider">Type</label>
        <select value={type} onChange={e => setType(e.target.value)} className={selectClass}>
          <option value="">All Types</option>
          <option value="villa">Villa</option>
          <option value="land">Land</option>
          <option value="commercial">Commercial</option>
        </select>
      </div>
      <div className="flex flex-col gap-1 min-w-36">
        <label className="text-xs text-gray-400 uppercase tracking-wider">Status</label>
        <select value={status} onChange={e => setStatus(e.target.value)} className={selectClass}>
          <option value="">For Sale & Rent</option>
          <option value="for_sale">For Sale</option>
          <option value="for_rent">For Rent</option>
        </select>
      </div>
      <button onClick={handleFilter}
        className="bg-black text-white text-sm px-6 py-2 hover:bg-gray-800 transition">
        Search
      </button>
      <button onClick={handleReset}
        className="border border-gray-200 text-gray-500 text-sm px-4 py-2 hover:border-gray-400 transition">
        Reset
      </button>
    </div>
  )
}
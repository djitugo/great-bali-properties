'use client'
export default function SortSelect({ currentSort }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <label style={{ fontSize: '13px', color: '#6b7280', whiteSpace: 'nowrap' }}>Sort by:</label>
      <select
        defaultValue={currentSort}
        onChange={e => {
          const url = new URL(window.location.href)
          url.searchParams.set('sort', e.target.value)
          window.location.href = url.toString()
        }}
        style={{
          border: '1px solid #e5e7eb', padding: '8px 28px 8px 12px', fontSize: '13px',
          backgroundColor: 'white', cursor: 'pointer', appearance: 'none',
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236b7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E\")",
          backgroundRepeat: 'no-repeat', backgroundPosition: 'right 8px center', backgroundSize: '12px'
        }}>
        <option value="featured">Featured First</option>
        <option value="price_asc">Price: Low to High</option>
        <option value="price_desc">Price: High to Low</option>
        <option value="alpha">Alphabetically</option>
        <option value="new">Newest First</option>
      </select>
    </div>
  )
}
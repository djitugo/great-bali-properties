import { supabase } from '../../lib/supabase'
import PropertyDetailClient from '../../components/PropertyDetailClient'

export default async function PropertyDetail({ params }) {
  const { slug } = await params
  const { data: p } = await supabase.from('properties').select('*').eq('slug', slug).single()
  if (!p) return (
    <div style={{ paddingTop: '100px', textAlign: 'center', fontFamily: 'Inter, sans-serif' }}>
      <p style={{ color: '#9ca3af' }}>Property not found.</p>
      <a href="/properties" style={{ color: 'black', fontSize: '14px' }}>← Back to listings</a>
    </div>
  )
  return <PropertyDetailClient property={p} />
}
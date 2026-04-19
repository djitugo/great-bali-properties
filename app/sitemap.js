const BASE = 'https://greatbaliproperties.com'

export default function sitemap() {
  const now = new Date()
  const routes = [
    { path: '', priority: 1.0, changeFrequency: 'daily' },
    { path: '/properties', priority: 0.9, changeFrequency: 'daily' },
    { path: '/about', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/contact', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/guide', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/guide/areas', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/guide/ownership', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/guide/legal', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/guide/roi', priority: 0.8, changeFrequency: 'monthly' },
  ]

  return routes.map(r => ({
    url: `${BASE}${r.path}`,
    lastModified: now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }))
}

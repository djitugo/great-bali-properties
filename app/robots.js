export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/'],
      },
    ],
    sitemap: 'https://greatbaliproperties.com/sitemap.xml',
    host: 'https://greatbaliproperties.com',
  }
}

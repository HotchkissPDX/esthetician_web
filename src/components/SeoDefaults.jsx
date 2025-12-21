import { Helmet } from 'react-helmet-async'

export default function SeoDefaults() {
  const base = 'https://madelyn-hotchkiss.com';

  return (
    <Helmet>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#8AAE92" />
      <meta name="robots" content="index, follow" />
      <meta property="og:site_name" content="Madelyn Hotchkiss Esthetics" />
      {/* Add favicons/manifest in public/ if available */}

      {/* Breadcrumbs shown on all pages */}
      <script type="application/ld+json">{`
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "${base}/" },
          { "@type": "ListItem", "position": 2, "name": "About", "item": "${base}/about" },
          { "@type": "ListItem", "position": 3, "name": "Services", "item": "${base}/services" }
          { "@type": "ListItem", "position": 4, "name": "Book", "item": "${base}/book" }
          { "@type": "ListItem", "position": 5, "name": "Testimonials", "item": "${base}/testimonials" }
          { "@type": "ListItem", "position": 6, "name": "Contact", "item": "${base}/contact" }
        ]
      }
      `}</script>
    </Helmet>
  )
}

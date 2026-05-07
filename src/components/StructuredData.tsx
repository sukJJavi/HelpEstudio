const SITE_URL = "https://help-estudio.es";

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": ["Organization", "ProfessionalService"],
  "@id": `${SITE_URL}/#organization`,
  name: "Help Estudio",
  alternateName: "Help Estudio — Global Digital Product Architect",
  url: SITE_URL,
  logo: `${SITE_URL}/assets/og-image.png`,
  foundingDate: "2012",
  description:
    "Global Digital Product Architect and Next.js expert. We build SaaS products and deliver high-performance digital production for tier-1 agencies including Havas, Dentsu, and Wunderman Thompson.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Madrid",
    addressCountry: "ES",
  },
  areaServed: "Worldwide",
  serviceType: ["Product Engineering", "SaaS Development", "Digital Ad Production"],
  sameAs: [
    "https://www.linkedin.com/in/jjavierblanco",
  ],
  knowsAbout: [
    "Next.js",
    "TypeScript",
    "SaaS Architecture",
    "Digital Advertising",
    "Product Engineering",
    "React",
    "Node.js",
    "Three.js",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Digital Product Services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Product Development",
          description:
            "End-to-end SaaS product development using Next.js, TypeScript, and modern cloud infrastructure. From zero to launch with full technical ownership.",
          provider: { "@id": `${SITE_URL}/#organization` },
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "High-End Ad Delivery",
          description:
            "High-performance HTML5 display and rich media campaign production for global advertising agencies including Havas, Dentsu, Wunderman Thompson, and Publicis. IAB-compliant, zero-latency execution at scale.",
          provider: { "@id": `${SITE_URL}/#organization` },
        },
      },
    ],
  },
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${SITE_URL}/#person`,
  name: "Javier Blanco",
  jobTitle: "Global Digital Product Architect",
  worksFor: { "@id": `${SITE_URL}/#organization` },
  url: SITE_URL,
  sameAs: ["https://www.linkedin.com/in/jjavierblanco"],
  knowsAbout: [
    "Next.js",
    "TypeScript",
    "SaaS",
    "Digital Advertising",
    "Product Architecture",
    "React",
    "Three.js",
    "Havas",
    "Dentsu",
    "Wunderman Thompson",
  ],
  hasOccupation: {
    "@type": "Occupation",
    name: "Digital Product Architect",
    description:
      "Building SaaS products and delivering high-performance digital production for global agencies since 2012.",
    occupationLocation: {
      "@type": "City",
      name: "Madrid",
    },
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: "Help Estudio",
  publisher: { "@id": `${SITE_URL}/#organization` },
};

export default function StructuredData() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  );
}

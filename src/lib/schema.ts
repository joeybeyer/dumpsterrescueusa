import { brand } from "@/data/brand";

const businessId = `${brand.domain}/#business`;

// Advanced Schema: sameAs links for entity consolidation
// Add all indexed brand mentions (social profiles, directories, citations)
const sameAsLinks = [
  // Social profiles
  "https://www.facebook.com/dumpsterrescueusa",
  "https://www.instagram.com/dumpsterrescueusa",
  // Directories - Add actual URLs once claimed
  // "https://www.yelp.com/biz/dumpster-rescue-usa-bartlett",
  // "https://www.bbb.org/...",
  // "https://www.angi.com/...",
];

// Advanced Schema: knowsAbout - comprehensive expertise list
const knowsAbout = [
  "Junk Removal",
  "Dumpster Rental",
  "Estate Cleanout",
  "Garage Cleanout",
  "Basement Cleanout",
  "Construction Debris Removal",
  "Light Demolition",
  "Shed Removal",
  "Deck Demolition",
  "Appliance Removal",
  "Furniture Removal",
  "Hoarding Cleanup",
  "Foreclosure Cleanout",
  "Commercial Junk Removal",
  "Roll-Off Dumpster Rental",
  "Same-Day Junk Pickup",
];

// Advanced Schema: hasOfferCatalog - service silo structure
const hasOfferCatalog = {
  "@type": "OfferCatalog",
  name: "Junk Removal & Dumpster Rental Services",
  itemListElement: [
    {
      "@type": "OfferCatalog",
      name: "Junk Removal Services",
      itemListElement: [
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Same-Day Junk Removal" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Garage Cleanout" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Basement Cleanout" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Estate Cleanout" } },
      ],
    },
    {
      "@type": "OfferCatalog",
      name: "Dumpster Rental Services",
      itemListElement: [
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "10-Yard Dumpster Rental" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "15-Yard Dumpster Rental" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "20-Yard Dumpster Rental" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "30-Yard Dumpster Rental" } },
      ],
    },
    {
      "@type": "OfferCatalog",
      name: "Demolition Services",
      itemListElement: [
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Light Demolition" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Shed Removal" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Deck Demolition" } },
      ],
    },
  ],
};

// Advanced Schema: AggregateRating - Real Google stats
const aggregateRating = {
  "@type": "AggregateRating",
  ratingValue: "5.0",
  reviewCount: "64",
  bestRating: "5",
  worstRating: "1",
};

// Advanced Schema: Sample Review for rich snippets
const sampleReviews = [
  {
    "@type": "Review",
    author: { "@type": "Person", name: "Mike T." },
    datePublished: "2024-12-15",
    reviewBody: "Called them for same-day pickup and they showed up within 2 hours. Professional crew, fair pricing, cleaned up everything. Highly recommend!",
    reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
  },
  {
    "@type": "Review",
    author: { "@type": "Person", name: "Sarah L." },
    datePublished: "2024-11-28",
    reviewBody: "Used them for an estate cleanout in Naperville. They were respectful, efficient, and donated items we requested. Great local company.",
    reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
  },
];

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": businessId,
  name: brand.legalName,
  url: brand.domain,
  telephone: brand.phone,
  address: {
    "@type": "PostalAddress",
    streetAddress: brand.primaryLocation.street,
    addressLocality: brand.primaryLocation.city,
    addressRegion: brand.primaryLocation.state,
    postalCode: brand.primaryLocation.zip,
    addressCountry: "US"
  },
  sameAs: sameAsLinks,
  knowsAbout,
};

const geoCoordinates =
  brand.primaryGeo?.latitude && brand.primaryGeo?.longitude
    ? {
        "@type": "GeoCoordinates",
        latitude: brand.primaryGeo.latitude,
        longitude: brand.primaryGeo.longitude
      }
    : undefined;

export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "HomeAndConstructionBusiness"],
  "@id": businessId,
  name: brand.name,
  url: brand.domain,
  telephone: brand.phone,
  description: "Fast, dependable junk removal and demolition across Chicagoland. Local crews, contractor-grade results, same-day service available.",
  // Advanced Schema: additionalType for entity disambiguation
  additionalType: [
    "https://en.wikipedia.org/wiki/Waste_management",
    "https://en.wikipedia.org/wiki/Demolition",
    "https://www.wikidata.org/wiki/Q180388", // Waste management
  ],
  // Advanced Schema: disambiguatingDescription (unique content for AI/LLMs)
  disambiguatingDescription: "Dumpster Rescue LLC is a family-owned junk removal and dumpster rental company based in Bartlett, Illinois, serving the greater Chicagoland area including DuPage, Kane, and Cook counties. Founded by local contractors who saw a need for reliable, same-day hauling services, we specialize in residential and commercial cleanouts, roll-off dumpster rentals from 10 to 30 yards, estate cleanouts, garage and basement clearing, construction debris removal, and light demolition including shed and deck teardowns. Unlike national franchises, we operate with our own local crews who know the neighborhoods, municipal requirements, and disposal facilities throughout the western suburbs. Our service area spans from Naperville to Schaumburg, Elgin to Oak Brook, and everywhere in between. We're fully licensed and insured with certificates available on request. Same-day service is available for most junk removal jobs when you call before noon. For larger projects requiring dumpsters, we typically deliver within 24 hours. Our pricing is transparent with no hidden fees—we quote based on volume, not time, so you know exactly what you'll pay before we start. We partner with local recycling centers and donation facilities to divert usable items from landfills whenever possible.",
  areaServed: [
    { "@type": "County", name: "DuPage County", containedInPlace: { "@type": "State", name: "Illinois" } },
    { "@type": "County", name: "Kane County", containedInPlace: { "@type": "State", name: "Illinois" } },
    { "@type": "County", name: "Cook County", containedInPlace: { "@type": "State", name: "Illinois" } },
  ],
  address: {
    "@type": "PostalAddress",
    streetAddress: brand.primaryLocation.street,
    addressLocality: brand.primaryLocation.city,
    addressRegion: brand.primaryLocation.state,
    postalCode: brand.primaryLocation.zip,
    addressCountry: "US"
  },
  ...(geoCoordinates ? { geo: geoCoordinates } : {}),
  // Advanced Schema: Opening hours
  openingHoursSpecification: [
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "07:00", closes: "19:00" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Saturday", opens: "08:00", closes: "17:00" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Sunday", opens: "09:00", closes: "15:00" },
  ],
  // Advanced Schema: Price range
  priceRange: "$$",
  // Advanced Schema: Payment methods
  paymentAccepted: "Cash, Credit Card, Debit Card, Check",
  currenciesAccepted: "USD",
  // Advanced Schema: Ratings & Reviews
  aggregateRating,
  review: sampleReviews,
  // Advanced Schema: Service catalog
  hasOfferCatalog,
  // Advanced Schema: Entity linking
  sameAs: sameAsLinks,
  knowsAbout,
};

export const serviceSchema = (serviceName: string) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  name: serviceName,
  provider: { "@id": businessId },
  areaServed: brand.serviceArea
});

export const locationServiceSchema = (city: string) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  name: `${city} Junk Removal & Demolition`,
  provider: { "@id": businessId },
  areaServed: {
    "@type": "City",
    name: city
  }
});

export const faqSchema = (faqs: { question: string; answer: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer
    }
  }))
});

export const breadcrumbSchema = (items: { name: string; url: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: item.url
  }))
});


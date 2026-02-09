import { brand } from "@/data/brand";
import { locations } from "@/data/locations";
import {
  breadcrumbSchema,
  faqSchema,
  locationServiceSchema,
  localBusinessSchema
} from "@/lib/schema";
import { buildCityContent } from "@/lib/location-content";

type HeadProps = {
  params: { citySlug: string };
};

export default function Head({ params }: HeadProps) {
  const location = locations.find((item) => item.slug === params.citySlug);
  if (!location) {
    return null;
  }

  const content = buildCityContent(location.name, location.slug);
  const breadcrumbs = [
    { name: "Home", url: brand.domain },
    { name: "Locations", url: `${brand.domain}/locations/` },
    { name: `${location.name}, IL`, url: `${brand.domain}/locations/${location.slug}/` }
  ];

  const jsonLd = [
    localBusinessSchema,
    locationServiceSchema(`${location.name}, IL`),
    faqSchema(content.faqs),
    breadcrumbSchema(breadcrumbs)
  ];

  return (
    <>
      <title>{`${location.name}, IL Junk Removal & Demolition | Dumpster Rescue LLC`}</title>
      <meta
        name="description"
        content={`Junk removal, demolition, and dumpster services in ${location.name}, IL.`}
      />
      <link rel="canonical" href={`${brand.domain}/locations/${location.slug}/`} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}


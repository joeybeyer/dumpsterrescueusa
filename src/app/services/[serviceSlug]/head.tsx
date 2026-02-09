import { brand } from "@/data/brand";
import { services } from "@/data/services";
import { breadcrumbSchema, faqSchema, serviceSchema } from "@/lib/schema";

type HeadProps = {
  params: { serviceSlug: string };
};

export default function Head({ params }: HeadProps) {
  const service = services.find((item) => item.slug === params.serviceSlug);
  if (!service) {
    return null;
  }

  const breadcrumbs = [
    { name: "Home", url: brand.domain },
    { name: "Services", url: `${brand.domain}/services/` },
    { name: service.name, url: `${brand.domain}/services/${service.slug}/` }
  ];

  const jsonLd = [
    serviceSchema(service.name),
    faqSchema(service.faqs),
    breadcrumbSchema(breadcrumbs)
  ];

  return (
    <>
      <title>{`${service.name} in Chicagoland | Dumpster Rescue LLC`}</title>
      <meta name="description" content={service.description} />
      <link rel="canonical" href={`${brand.domain}/services/${service.slug}/`} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}


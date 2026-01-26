import Link from "next/link";
import { notFound } from "next/navigation";
import { brand } from "@/data/brand";
import { services } from "@/data/services";
import { locations } from "@/data/locations";
import Breadcrumbs from "@/components/Breadcrumbs";
import KeyTakeaways from "@/components/KeyTakeaways";
import FAQAccordion from "@/components/FAQAccordion";

type PageProps = {
  params: { serviceSlug: string };
};

export default function ServiceDetailPage({ params }: PageProps) {
  const service = services.find((item) => item.slug === params.serviceSlug);
  if (!service) {
    notFound();
  }

  const priorityLocations = locations.filter((loc) => loc.priority).slice(0, 6);
  const additionalLocations = locations
    .filter((loc) => !loc.priority)
    .slice(0, 4);
  const topLocations = [...priorityLocations, ...additionalLocations];
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services/" },
    { label: service.name, href: `/services/${service.slug}/` }
  ];

  return (
    <div className="mx-auto w-full max-w-6xl px-6 pb-16 pt-10">
      <Breadcrumbs items={breadcrumbs} />
      <div className="mt-4 flex flex-col gap-6 md:flex-row md:items-start">
        <div className="flex-1">
          <p className="text-xs font-bold uppercase tracking-wide text-green-600">
            Service
          </p>
          <div className="mt-2 inline-flex items-center gap-2 rounded-xl bg-red-600 px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">
            Same-day / 24-7 response line
          </div>
          <h1 className="mt-2 text-3xl font-bold text-gray-900">
            {service.name} in Chicagoland
          </h1>
          <p className="mt-3 text-sm text-gray-700">{service.description}</p>
          <p className="mt-4 text-xs text-gray-600">
            Last updated{" "}
            <time dateTime={brand.updatedDate}>{brand.updatedDate}</time>
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <a
              href={brand.phoneHref}
              className="rounded-xl bg-green-600 px-6 py-3 text-sm font-bold uppercase tracking-wide text-white shadow-lg hover:bg-green-700"
            >
              Call {brand.phone}
            </a>
            <a
              href={brand.smsHref}
              className="flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-bold uppercase tracking-wide text-white shadow-lg hover:bg-blue-700"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Text Photo for Quote
            </a>
          </div>
        </div>

        {/* Service Image */}
        {service.image && (
          <div className="w-full md:w-80 lg:w-96">
            <div className="overflow-hidden rounded-2xl border border-gray-200 shadow-lg">
              <img
                src={service.image}
                alt={`${service.name} service in Chicagoland`}
                className="h-48 w-full object-cover md:h-56"
              />
            </div>
          </div>
        )}
      </div>

      <div className="mt-6">
        <KeyTakeaways
          title={`Quick Summary - ${service.name} in Chicagoland`}
          bullets={service.keyTakeaways}
        />
      </div>

      <section className="mt-10 rounded-2xl border border-gray-200 bg-white p-6 shadow-lg">
        <h2 className="text-xl font-bold text-gray-900">
          Pricing guidance
        </h2>
        <p className="mt-2 text-lg font-semibold text-green-600">
          Minimum loads start at just $150
        </p>
        <p className="mt-2 text-sm text-gray-700">
          Final pricing depends on volume, access, and hauling requirements. We give
          clear, upfront estimates before any work starts—no surprises.
        </p>
        <p className="mt-3 text-sm text-gray-700">
          Call {brand.phone} to confirm availability and get your precise quote.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-bold text-gray-900">
          Top service areas
        </h2>
        <p className="mt-2 text-sm text-gray-700">
          We focus on the towns below for fast response and priority scheduling.
          View the full list on{" "}
          <Link href="/locations/" className="font-semibold text-green-600">
            our locations page
          </Link>
          .
        </p>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {topLocations.map((location, index) => (
            <Link
              key={location.slug}
              href={`/locations/${location.slug}/`}
              className="group rounded-2xl border border-gray-200 bg-white p-4 shadow-lg transition-shadow hover:shadow-xl"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm font-bold uppercase tracking-wide text-gray-900">
                  {location.name}, IL
                </p>
                <div className="flex items-center gap-1.5">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-green-500"></span>
                  <span className="text-xs font-medium text-green-600">
                    {index % 2 === 0 ? "Trucks in area" : "Same-Day"}
                  </span>
                </div>
              </div>
              <p className="mt-1 text-xs text-gray-600">
                {location.county} County
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-bold text-gray-900">
          Service FAQs
        </h2>
        <div className="mt-4">
          <FAQAccordion items={service.faqs} />
        </div>
      </section>
    </div>
  );
}

export function generateStaticParams() {
  return services.map((service) => ({ serviceSlug: service.slug }));
}

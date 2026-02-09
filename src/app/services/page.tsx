import Link from "next/link";
import { services } from "@/data/services";
import { brand } from "@/data/brand";

export const metadata = {
  title: "Services",
  description:
    "Junk removal, demolition, and dumpster rental services across Chicagoland suburbs.",
  alternates: {
    canonical: "/services/"
  }
};

export default function ServicesPage() {
  const grouped = services.reduce((acc, service) => {
    acc[service.category] = acc[service.category] || [];
    acc[service.category].push(service);
    return acc;
  }, {} as Record<string, typeof services>);

  return (
    <div className="mx-auto w-full max-w-6xl px-6 pb-16 pt-10">
      <p className="text-xs font-bold uppercase tracking-wide text-red-600">
        Services
      </p>
      <h1 className="mt-2 text-3xl font-bold text-gray-900">
        Professional cleanup services across Chicagoland.
      </h1>
      <p className="mt-3 text-sm text-gray-700">
        Call {brand.phone} for fast response and clear pricing.
      </p>
      <p className="mt-2 text-xs text-gray-600">
        Last updated{" "}
        <time dateTime={brand.updatedDate}>{brand.updatedDate}</time>
      </p>

      <div className="mt-8 space-y-10">
        {Object.entries(grouped).map(([category, list]) => (
          <section key={category}>
            <h2 className="text-xl font-bold text-gray-900">{category}</h2>
            <div className="mt-4 grid gap-4 md:grid-cols-3">
              {list.map((service) => (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}/`}
                  className="rounded-lg border border-gray-200 bg-white p-5 shadow-lg"
                >
                  <h3 className="text-lg font-bold text-gray-900">
                    {service.name}
                  </h3>
                  <p className="mt-2 text-sm text-gray-700">
                    {service.description}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

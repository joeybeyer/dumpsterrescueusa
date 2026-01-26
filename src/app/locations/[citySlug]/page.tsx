import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { brand } from "@/data/brand";
import { locations } from "@/data/locations";
import { services } from "@/data/services";
import { buildCityContent } from "@/lib/location-content";
import Breadcrumbs from "@/components/Breadcrumbs";
import KeyTakeaways from "@/components/KeyTakeaways";
import FAQAccordion from "@/components/FAQAccordion";
import ReviewsStrip from "@/components/ReviewsStrip";
import SetUserCity from "@/components/SetUserCity";

type PageProps = {
  params: { citySlug: string };
};

type ServiceItem = (typeof services)[number];

// SEO-optimized metadata using the Title Tag formula:
// Primary Keyword + Emotional Hook + [Modifier]
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const location = locations.find((item) => item.slug === params.citySlug);
  if (!location) return {};

  const content = buildCityContent(location.name, location.slug);

  // Title: Primary Keyword + Benefit + [Year Modifier] - under 60 chars
  // "Junk Removal in Elgin IL | Same-Day Pickup [2026]"
  const title = `Junk Removal in ${location.name} IL | Same-Day Pickup [2026]`;

  // Meta Description: Problem + Solution + Micro-Promise - under 155 chars
  // Front-load the value prop in first 120 chars for mobile
  const description = `Need junk gone fast in ${location.name}? Same-day removal for garages, basements & estates. Upfront pricing, local crew. Call ${brand.phone} - we load everything.`;

  return {
    title,
    description,
    openGraph: {
      title: content.heroH1 || `Junk Removal & Demolition in ${location.name}, IL`,
      description,
      type: "website",
      locale: "en_US",
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
    alternates: {
      canonical: `https://dumpsterrescueusa.com/locations/${location.slug}/`,
    },
  };
}

export default function CityPage({ params }: PageProps) {
  const location = locations.find((item) => item.slug === params.citySlug);
  if (!location) {
    notFound();
  }

  const content = buildCityContent(location.name, location.slug);
  const moneyServices = [
    "junk-removal",
    "demolition",
    "garage-cleanout",
    "estate-cleanout",
    "hot-tub-removal"
  ]
    .map((slug) => services.find((service) => service.slug === slug))
    .filter((service): service is ServiceItem => Boolean(service));
  const relatedCities = locations
    .filter(
      (item) =>
        item.slug !== location.slug && item.county === location.county
    )
    .slice(0, 3);

  const coreServices = services.filter((service) => service.category === "Core");

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Locations", href: "/locations/" },
    { label: `${location.name}, IL`, href: `/locations/${location.slug}/` }
  ];

  return (
    <div className="mx-auto w-full max-w-6xl px-6 pb-16 pt-10">
      {/* Store user's city for personalization across site */}
      <SetUserCity city={location.name} />
      <Breadcrumbs items={breadcrumbs} />
      <div className="mt-4">
        <p className="text-xs font-bold uppercase tracking-wide text-green-600">
          Location
        </p>
        <div className="mt-2 inline-flex items-center gap-2 rounded-xl bg-red-600 px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">
          Same-day / 24-7 response line
        </div>
        <h1 className="mt-2 text-3xl font-bold text-gray-900">
          {content.heroH1}
        </h1>
        <p className="mt-2 text-sm font-bold uppercase tracking-wide text-gray-800">
          {content.trustLine}
        </p>
        <p className="mt-3 text-sm text-gray-700">
          Need{" "}
          <Link
            href={`/services/${moneyServices[0]?.slug}/`}
            className="font-semibold text-green-600"
          >
            {moneyServices[0]?.name.toLowerCase()}
          </Link>{" "}
          in {location.name}? Our local crew handles{" "}
          <Link
            href={`/services/${moneyServices[2]?.slug}/`}
            className="font-semibold text-green-600"
          >
            {moneyServices[2]?.name.toLowerCase()}
          </Link>
          ,{" "}
          <Link
            href={`/services/${moneyServices[3]?.slug}/`}
            className="font-semibold text-green-600"
          >
            {moneyServices[3]?.name.toLowerCase()}
          </Link>
          , and{" "}
          <Link
            href={`/services/${moneyServices[1]?.slug}/`}
            className="font-semibold text-green-600"
          >
            light {moneyServices[1]?.name.toLowerCase()}
          </Link>{" "}
          across {location.county} County. {content.heroSub}
        </p>
        <p className="mt-2 text-sm text-gray-700">
          We dispatch from Bartlett with a Medinah service office. See{" "}
          <Link href="/locations/" className="font-semibold text-green-600">
            all service areas
          </Link>{" "}
          or {content.phoneLine}
        </p>
        <p className="mt-4 text-xs text-gray-600">
          Last updated{" "}
          <time dateTime={brand.updatedDate}>{brand.updatedDate}</time>
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <a
            href={brand.phoneHref}
            className="rounded-xl bg-green-600 px-6 py-3 text-sm font-bold uppercase tracking-wide text-white shadow-lg hover:bg-green-700"
          >
            {content.ctaLabel}
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
        <ul className="mt-4 list-disc space-y-1 pl-5 text-sm text-gray-700">
          {content.heroBullets.map((bullet: string) => (
            <li key={bullet}>{bullet}</li>
          ))}
        </ul>
      </div>

      <div className="mt-8">
        <KeyTakeaways
          title={`Quick Summary - Junk Removal in ${location.name}`}
          bullets={[
            `Same-day junk removal in ${location.name} when available`,
            "We load everything - you don't lift a finger",
            "Upfront pricing with no hidden fees",
            "Garage, basement, estate & construction cleanouts",
            `Local Bartlett crew serving ${location.county} County`
          ]}
        />
      </div>

      <section className="mt-6 rounded-xl border-l-4 border-green-600 bg-gray-50 p-4 shadow-lg">
        <h2 className="text-xl font-bold text-gray-900">Service Snapshot</h2>
        <p className="mt-2 text-sm text-gray-700">{content.aiSummary}</p>
      </section>

      <section className="mt-10 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-lg">
          <h2 className="text-base font-semibold text-gray-900">
            Local landmarks
          </h2>
          <ul className="mt-3 list-disc space-y-1 pl-4 text-sm text-gray-700">
            {content.landmarks.map((item: string) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-lg">
          <h2 className="text-base font-semibold text-gray-900">
            Neighborhoods we serve
          </h2>
          <ul className="mt-3 list-disc space-y-1 pl-4 text-sm text-gray-700">
            {content.neighborhoods.map((item: string) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-lg">
          <h2 className="text-base font-semibold text-gray-900">
            Weather & housing
          </h2>
          <p className="mt-3 text-sm text-gray-700">
            {content.weather} {content.housing}
          </p>
        </div>
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-lg">
          <h2 className="text-base font-semibold text-gray-900">
            Local dumpsters used
          </h2>
          <p className="mt-3 text-sm text-gray-700">
            {content.dumpsters.join(", ")}
          </p>
        </div>
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-lg">
          <h2 className="text-base font-semibold text-gray-900">
            Local hauling types
          </h2>
          <p className="mt-3 text-sm text-gray-700">
            {content.hauling.join(", ")}
          </p>
        </div>
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-lg">
          <h2 className="text-base font-semibold text-gray-900">
            Zoning & permits
          </h2>
          <p className="mt-3 text-sm text-gray-700">{content.permits}</p>
        </div>
      </section>

      <section className="mt-10 rounded-2xl border border-gray-200 bg-white p-6 shadow-lg">
        <h2 className="text-xl font-bold text-gray-900">Service radius</h2>
        <p className="mt-2 text-sm text-gray-700">
          {content.serviceRadius} We provide service coverage without claiming a
          physical address in {location.name}.
        </p>
      </section>

      <section className="mt-10 rounded-2xl border border-gray-200 bg-white p-6 shadow-lg">
        <h2 className="text-xl font-bold text-gray-900">
          Service scope in {location.name}
        </h2>
        <p className="mt-2 text-sm text-gray-700">
          Our crews handle the full cleanup scope below across {location.name}.
          Each service is backed by clean staging, clear pricing, and fast
          scheduling.
        </p>
        <ul className="mt-3 space-y-1 pl-5 text-sm text-gray-700">
          <li className="flex items-center gap-2">
            <span className="inline-flex items-center rounded bg-green-100 px-2 py-0.5 text-xs font-semibold text-green-800">PRIMARY</span>
            <span className="font-semibold">Junk removal</span> — full-service hauling for homes & businesses
          </li>
          <li className="list-disc ml-4">Garage cleanouts</li>
          <li className="list-disc ml-4">Basement cleanouts</li>
          <li className="list-disc ml-4">Estate cleanouts</li>
          <li className="list-disc ml-4">Appliance removal</li>
          <li className="list-disc ml-4">Construction debris</li>
          <li className="list-disc ml-4">Hoarding cleanup</li>
          <li className="mt-2 flex items-center gap-2">
            <span className="inline-flex items-center rounded bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600">ALSO</span>
            <span>Light demolition</span> — hot tubs, sheds, decks
          </li>
        </ul>
        <div className="mt-4 flex flex-wrap gap-3 text-sm">
          {moneyServices.map((service) => (
            <Link
              key={service.slug}
              href={`/services/${service.slug}/`}
              className="rounded-xl border border-gray-200 px-4 py-2 text-gray-800"
            >
              {service.name}
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-10 rounded-2xl border border-gray-200 bg-white p-6 shadow-lg">
        <h2 className="text-xl font-bold text-gray-900">
          Driving directions from Bartlett or Medinah
        </h2>
        <p className="mt-2 text-sm text-gray-700">
          From Bartlett: we dispatch crews directly to {location.name} using the
          most efficient route based on your address and local restrictions.
          From Medinah: we stage equipment and route crews through major
          arterials to keep arrival windows tight.
        </p>
        <p className="mt-3 text-sm text-gray-700">
          Call {brand.phone} and we will confirm the best route, drop-off
          location, and permit guidance for your {location.name} job.
        </p>
      </section>

      <section className="mt-10 rounded-2xl border border-gray-200 bg-white p-6 shadow-lg">
        <h2 className="text-xl font-bold text-gray-900">
          How the rescue process works
        </h2>
        <p className="mt-2 text-sm text-gray-700">
          Step 1: Call or text photos and we confirm the scope. Step 2: We
          schedule a tight arrival window and arrive with a clean crew. Step 3:
          We remove debris, stage hauling, and leave the site clean. This
          process keeps {location.name} homeowners, landlords, and contractors
          in control.
        </p>
        <p className="mt-3 text-sm text-gray-700">
          If you need container placement, we guide you through permit and
          zoning rules so your job stays compliant.
        </p>
      </section>

      <section className="mt-10 rounded-2xl border border-gray-200 bg-white p-6 shadow-lg">
        <h2 className="text-xl font-bold text-gray-900">
          Dumpster sizing guidance for {location.name}
        </h2>
        <p className="mt-2 text-sm text-gray-700">
          Most {location.name} cleanouts fit a 10 or 15 yard dumpster. Remodeling
          projects often need 20 yard capacity, while construction or multi-room
          cleanouts typically use 30 yard dumpsters. We confirm sizing before
          delivery to avoid overflows and surprise fees.
        </p>
        <p className="mt-3 text-sm text-gray-700">
          If the job is hands-on hauling, our crews can skip the dumpster and
          remove debris directly from the property.
        </p>
      </section>

      <section className="mt-10 rounded-2xl border border-gray-200 bg-white p-6 shadow-lg">
        <h2 className="text-xl font-bold text-gray-900">
          Materials we remove in {location.name}
        </h2>
        <p className="mt-2 text-sm text-gray-700">
          We remove household junk, renovation debris, appliances, furniture,
          yard waste, and demolition materials. If you are unsure about specific
          items, send photos and we will confirm the safest disposal path.
        </p>
        <p className="mt-3 text-sm text-gray-700">
          Our team follows local disposal guidelines and keeps staging tidy so
          neighborhoods stay clean before and after the job.
        </p>
      </section>

      <section className="mt-10 rounded-2xl border border-gray-200 bg-white p-6 shadow-lg">
        <h2 className="text-xl font-bold text-gray-900">
          Why {location.name} calls the rescue crew
        </h2>
        <p className="mt-2 text-sm text-gray-700">
          We are not a discount hauler. We are the calm, professional crew that
          shows up on time, keeps the site controlled, and finishes clean. From
          landlords and contractors to overwhelmed homeowners, our {location.name}{" "}
          customers call for fast response and zero hassle.
        </p>
      </section>

      <section className="mt-10 rounded-2xl border border-gray-200 bg-white p-6 shadow-lg">
        <h2 className="text-xl font-bold text-gray-900">
          Local climate and debris patterns
        </h2>
        <p className="mt-2 text-sm text-gray-700">
          {content.weather} {content.housing} That means spring storm cleanup,
          fall yard waste, and steady renovation debris year-round. We plan
          container placement and hauling routes around these seasonal swings so
          {location.name} customers get consistent, on-time service.
        </p>
      </section>

      <section className="mt-10 rounded-2xl border border-gray-200 bg-white p-6 shadow-lg">
        <h2 className="text-xl font-bold text-gray-900">
          Coverage for homeowners, landlords, and contractors
        </h2>
        <p className="mt-2 text-sm text-gray-700">
          Homeowners use us for basement cleanouts, garage overflow, and move-out
          debris. Landlords call for unit turnovers and estate cleanouts with
          tight timelines. Contractors rely on us for demolition debris and
          steady haul-away support. We keep every jobsite in {location.name}
          organized, with clear staging and reliable pickup windows.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-bold text-gray-900">
          Services in {location.name}
        </h2>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {moneyServices.map((service) => (
            <Link
              key={service.slug}
              href={`/services/${service.slug}/`}
              className="rounded-2xl border border-gray-200 bg-white p-4 shadow-lg"
            >
              <p className="text-sm font-bold uppercase tracking-wide text-gray-900">
                {service.name}
              </p>
              <p className="text-xs text-gray-600">{service.description}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-bold text-gray-900">Nearby cities</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {relatedCities.map((city) => (
            <Link
              key={city.slug}
              href={`/locations/${city.slug}/`}
              className="rounded-2xl border border-gray-200 bg-white p-4 shadow-lg"
            >
              <p className="text-sm font-bold uppercase tracking-wide text-gray-900">
                {city.name}, IL
              </p>
              <p className="text-xs text-gray-600">{city.county} County</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-10 rounded-2xl border border-gray-200 bg-white p-6 shadow-lg">
        <h2 className="text-xl font-bold text-gray-900">Google Map</h2>
        <iframe
          className="mt-4 h-80 w-full rounded-xl border border-gray-200"
          title={`${location.name} map`}
          loading="lazy"
          src={
            content.mapEmbed ||
            `https://www.google.com/maps?q=${encodeURIComponent(
              `${location.name}, IL`
            )}&output=embed`
          }
        />
      </section>

      {location.priority ? (
        <section className="mt-10 grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-lg">
            <h2 className="text-xl font-bold text-gray-900">
              Priority coverage for {location.name}
            </h2>
            <p className="mt-3 text-sm text-gray-700">
              {content.priorityIntro}
            </p>
            <p className="mt-4 text-sm text-gray-700">
              {content.priorityTestimonial}
            </p>
          </div>
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-lg">
            <h2 className="text-xl font-bold text-gray-900">
              Popular jobs in {location.name}
            </h2>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-gray-700">
            {content.popularJobs.map((job: string) => (
              <li key={job}>{job}</li>
            ))}
            </ul>
          </div>
        </section>
      ) : null}

      <section className="mt-10">
        <h2 className="text-xl font-bold text-gray-900">
          What {location.county} County Neighbors Say
        </h2>
        <div className="mt-4">
          <ReviewsStrip />
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-bold text-gray-900">
          {location.name} FAQs
        </h2>
        <div className="mt-4">
          <FAQAccordion items={content.faqs} />
        </div>
      </section>

      {/* STEP 11: Final CTA - Decision Moment */}
      <section className="mt-10 rounded-2xl bg-gray-900 p-8 text-center shadow-xl">
        <h2 className="text-2xl font-bold text-white">
          Ready to Get Your Junk Gone in {location.name}?
        </h2>
        <p className="mx-auto mt-3 max-w-lg text-sm text-gray-300">
          Same-day pickup available. Call now for an instant quote or text us a photo — we respond fast.
        </p>
        <div className="mt-6 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href={brand.phoneHref}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-green-600 px-8 py-4 text-lg font-bold uppercase tracking-wide text-white shadow-lg hover:bg-green-700 sm:w-auto"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            Call {brand.phone}
          </a>
          <a
            href={brand.smsHref}
            className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-white bg-transparent px-8 py-4 text-lg font-bold uppercase tracking-wide text-white hover:bg-white/10 sm:w-auto"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Text Photo for Quote
          </a>
        </div>
        <p className="mt-4 text-xs text-gray-400">
          No obligation. Upfront pricing. We load everything.
        </p>
      </section>
    </div>
  );
}

export function generateStaticParams() {
  return locations.map((location) => ({ citySlug: location.slug }));
}

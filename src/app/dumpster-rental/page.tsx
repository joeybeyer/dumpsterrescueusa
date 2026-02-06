import Link from "next/link";
import Image from "next/image";
import { brand } from "@/data/brand";

export const metadata = {
  title: `Dumpster Rental in Chicagoland | Roll-Off Containers | ${brand.legalName}`,
  description:
    "Book a Chicagoland dumpster rental with fast delivery, clear pricing, and flexible sizes. Call Dumpster Rescue LLC today for a free quote and schedule pickup.",
  alternates: {
    canonical: "/dumpster-rental/"
  }
};

const faqs = [
  {
    question: "How long can I keep a roll-off dumpster?",
    answer:
      "Most rentals include a standard 7-day window, and longer terms are available when you need extra time. We confirm dates and extensions before delivery."
  },
  {
    question: "What size dumpster do I need for a home cleanout?",
    answer:
      "A 10-yard dumpster works for small cleanouts and garage projects, while most whole-home cleanouts and remodels fit best in a 20-yard. We help you size it based on debris volume."
  },
  {
    question: "Do I need a permit for dumpster placement?",
    answer:
      "If the dumpster sits on a public street or sidewalk, most towns require a permit. Driveway placement usually does not. We can guide you through local requirements."
  },
  {
    question: "What items are not allowed in a dumpster?",
    answer:
      "Hazardous materials, liquids, batteries, chemicals, paints, tires, and appliances with refrigerants are typically restricted. Ask us if you're unsure about an item."
  },
  {
    question: "Is driveway damage a concern?",
    answer:
      "We place boards under the container and follow best practices to protect driveways and pavers. Let us know about delicate surfaces or tight access."
  },
  {
    question: "How far in advance should I book?",
    answer:
      "We recommend booking a few days ahead, but same-day and next-day delivery are often available in Chicagoland. Call to check current availability."
  },
  {
    question: "Do you offer flat-rate pricing?",
    answer:
      "Yes. We provide clear, upfront pricing based on the size, rental period, and material type. You'll know the price before we deliver."
  },
  {
    question: "Can I place a dumpster on a sloped driveway?",
    answer:
      "In most cases, yes, but we'll evaluate the slope and access to keep placement safe. We may suggest an alternate spot or boards for stabilization."
  },
  {
    question: "What happens if I overfill the dumpster?",
    answer:
      "Containers must be filled level with the top to ensure safe transport. If you have extra debris, we can arrange a swap or an additional haul."
  }
];

export default function DumpsterRentalPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        "@id": `${brand.domain}/#localbusiness`,
        name: brand.legalName,
        url: brand.domain,
        telephone: "+16307358700",
        image: `${brand.domain}/images/optimized/logo.webp`,
        priceRange: "$$",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Bartlett",
          addressRegion: "IL",
          addressCountry: "US"
        },
        areaServed: ["DuPage County", "Kane County", "Cook County", "Chicagoland"]
      },
      {
        "@type": "Service",
        name: "Dumpster Rental",
        serviceType: "Roll-Off Dumpster Rental",
        provider: { "@id": `${brand.domain}/#localbusiness` },
        areaServed: ["Chicagoland", "DuPage County", "Kane County", "Cook County"],
        offers: {
          "@type": "Offer",
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
          url: `${brand.domain}/dumpster-rental/`
        }
      }
    ]
  };

  const faqJsonLd = {
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
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <div className="mx-auto w-full max-w-5xl px-6 pb-16 pt-10">
        {/* Breadcrumb */}
        <nav className="text-xs text-gray-600">
          <Link href="/">Home</Link> / <Link href="/services/">Services</Link> /{" "}
          <span>Dumpster Rental</span>
        </nav>

        {/* Hero */}
        <div className="mt-4 flex flex-col gap-6 md:flex-row md:items-start">
          <div className="flex-1">
            <p className="text-xs font-bold uppercase tracking-wide text-red-600">
              Pillar Page
            </p>
            <h1 className="mt-2 text-3xl font-bold text-gray-900">
              Dumpster Rental in Chicagoland
            </h1>
            <p className="mt-3 text-sm text-gray-700">
              Looking for a dependable roll-off dumpster rental in Chicagoland?
              Dumpster Rescue LLC delivers driveway-safe containers fast, helps
              you choose the right size, and picks up on your schedule. This
              guide answers the most common questions about roll-off dumpsters,
              sizing, pricing, placement, and local permit requirements.
            </p>
            <p className="mt-4 text-xs text-gray-600">
              Last updated <time dateTime="2026-02-06">2026-02-06</time>
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <a
                href={brand.phoneHref}
                className="rounded-lg bg-red-600 px-6 py-3 text-sm font-bold uppercase tracking-wide text-white shadow-lg hover:bg-red-700"
              >
                Call {brand.phone}
              </a>
              <a
                href={brand.smsHref}
                className="flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-sm font-bold uppercase tracking-wide text-white shadow-lg hover:bg-blue-700"
              >
                Text a Photo for a Price
              </a>
            </div>
          </div>
          <div className="w-full md:w-80 lg:w-96">
            <div className="overflow-hidden rounded-lg border border-gray-200 shadow-lg">
              <Image
                src="/images/optimized/dumpster-20-yard.webp"
                alt="Roll-off dumpster rental in Chicagoland"
                width={400}
                height={300}
                className="h-48 w-full object-cover md:h-56"
              />
            </div>
          </div>
        </div>

        {/* Quick Summary */}
        <div className="mt-6">
          <section className="rounded-xl border-l-4 border-red-600 bg-gray-50 p-4 shadow-lg">
            <p className="text-xs font-bold uppercase tracking-wide text-red-600">
              Quick Summary
            </p>
            <h2 className="mt-2 text-xl font-bold text-gray-900">
              Chicagoland Roll-Off Dumpster Rental at a Glance
            </h2>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-gray-700">
              <li>
                10, 20, and 30 yard dumpsters for cleanouts, remodels, and
                construction debris.
              </li>
              <li>
                Driveway-safe placement with boards to protect concrete and
                pavers.
              </li>
              <li>Flexible rental periods with clear, upfront pricing.</li>
              <li>Local permit guidance for street placement.</li>
              <li>Fast delivery across DuPage, Kane, and Cook County suburbs.</li>
            </ul>
          </section>
        </div>

        {/* What Is Dumpster Rental */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-gray-900">
            What Is Dumpster Rental and Roll-Off Service?
          </h2>
          <p className="mt-3 text-sm text-gray-700">
            Dumpster rental is a temporary waste solution where a roll-off
            container is delivered to your property, filled with debris, and
            hauled away when you're done. A roll-off dumpster is open-top,
            rectangular, and designed to handle bulky material such as
            construction debris, renovation waste, roofing shingles, yard
            cleanup, and household junk. The containers are delivered on a
            specialized truck that safely slides the dumpster into place.
          </p>
          <p className="mt-3 text-sm text-gray-700">
            At Dumpster Rescue LLC, roll-off service is designed to be simple:
            we confirm the size you need, schedule delivery, place the container
            safely, and return for pickup when your project is complete. If you
            need additional time or a second haul, we can arrange a swap or
            extension.
          </p>
        </section>

        {/* How It Works */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-gray-900">
            How Dumpster Rental Works
          </h2>
          <div className="mt-4 grid gap-6 md:grid-cols-3">
            <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-900">1. Delivery</h3>
              <p className="mt-2 text-sm text-gray-700">
                We schedule a delivery window and place the dumpster where you
                want it—usually a driveway or parking pad. We use boards to
                protect surfaces and keep the container stable.
              </p>
            </div>
            <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-900">2. Fill</h3>
              <p className="mt-2 text-sm text-gray-700">
                Load the dumpster at your pace. Keep debris level with the top
                edge for safe transport and distribute weight evenly when
                possible.
              </p>
            </div>
            <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-900">3. Pickup</h3>
              <p className="mt-2 text-sm text-gray-700">
                Call or text when you're ready. We pick up the container, haul
                debris to an approved facility, and leave your site clean.
              </p>
            </div>
          </div>
          <p className="mt-4 text-sm text-gray-700">
            Need help choosing a container size or a quicker turn-around?
            Explore our{" "}
            <Link
              href="/dumpster-rental/sizes/"
              className="font-semibold text-red-600"
            >
              dumpster sizes guide
            </Link>{" "}
            and we'll handle the rest.
          </p>
        </section>

        {/* Sizes */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-gray-900">
            Dumpster Sizes: 10, 20, and 30 Yard Options
          </h2>
          <p className="mt-3 text-sm text-gray-700">
            Choosing the right size saves money and keeps your project moving.
            The most popular roll-off sizes for residential and light commercial
            projects are 10-yard, 20-yard, and 30-yard dumpsters.
          </p>
          <div className="mt-4 space-y-4">
            <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-900">
                10-Yard Dumpster
              </h3>
              <p className="mt-2 text-sm text-gray-700">
                Best for small cleanouts, garage projects, and minor remodeling.
                Fits well in tight driveways and holds roughly 3–4 pickup loads
                of debris.
              </p>
            </div>
            <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-900">
                20-Yard Dumpster
              </h3>
              <p className="mt-2 text-sm text-gray-700">
                Our most common choice for home cleanouts, flooring or kitchen
                demos, and moderate construction work. Holds about 6–8 pickup
                loads.
              </p>
            </div>
            <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-900">
                30-Yard Dumpster
              </h3>
              <p className="mt-2 text-sm text-gray-700">
                Ideal for large remodels, estate cleanouts, and bigger
                construction jobs. Holds approximately 9–12 pickup loads.
              </p>
            </div>
          </div>
          <p className="mt-4 text-sm text-gray-700">
            See exact dimensions and use cases in our{" "}
            <Link
              href="/dumpster-rental/sizes/"
              className="font-semibold text-red-600"
            >
              dumpster size breakdown
            </Link>
            .
          </p>
        </section>

        {/* Accepted Items */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-gray-900">
            What You Can and Can't Put in a Dumpster
          </h2>
          <p className="mt-3 text-sm text-gray-700">
            Roll-off dumpsters are designed for bulky, non-hazardous materials.
            Most household junk, furniture, construction debris, wood, drywall,
            and yard waste can go in a container. The key is keeping loads level
            and avoiding restricted items.
          </p>
          <div className="mt-4 grid gap-6 md:grid-cols-2">
            <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-900">
                Commonly Accepted
              </h3>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-gray-700">
                <li>Household junk and furniture</li>
                <li>Construction debris (wood, drywall, flooring)</li>
                <li>Yard waste and brush</li>
                <li>Non-hazardous remodeling debris</li>
                <li>Cardboard and packaging</li>
              </ul>
            </div>
            <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-900">
                Typically Restricted
              </h3>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-gray-700">
                <li>Paints, solvents, and chemicals</li>
                <li>Oil, gasoline, and liquid waste</li>
                <li>Hazardous materials or asbestos</li>
                <li>Tires, batteries, and electronics</li>
                <li>Appliances with refrigerants</li>
              </ul>
            </div>
          </div>
          <p className="mt-4 text-sm text-gray-700">
            If you're unsure about a specific item, call and we'll confirm the
            safest, legal disposal option.
          </p>
        </section>

        {/* Pricing */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-gray-900">
            Dumpster Rental Pricing Overview
          </h2>
          <p className="mt-3 text-sm text-gray-700">
            Pricing depends on container size, rental duration, debris type, and
            disposal fees. We provide clear, upfront quotes with no surprises so
            you can budget accurately. Typical pricing includes delivery,
            pickup, and a set rental period. Heavier or restricted materials may
            require special handling.
          </p>
          <p className="mt-3 text-sm text-gray-700">
            For specific numbers and current specials, visit our{" "}
            <Link
              href="/dumpster-rental/pricing/"
              className="font-semibold text-red-600"
            >
              dumpster rental pricing page
            </Link>{" "}
            or call {brand.phone} for a fast quote.
          </p>
        </section>

        {/* Permits */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-gray-900">
            Permits and Placement in Chicagoland
          </h2>
          <p className="mt-3 text-sm text-gray-700">
            Permits are usually required if a dumpster sits on public property
            such as a street, sidewalk, or alley. Most driveways and private
            lots do not require a permit. Each municipality has different rules,
            so it's smart to verify before delivery.
          </p>
          <p className="mt-3 text-sm text-gray-700">
            We help you determine whether a permit is needed and how to apply.
            Learn more on our{" "}
            <Link
              href="/dumpster-rental/permits/"
              className="font-semibold text-red-600"
            >
              dumpster permit guide
            </Link>
            .
          </p>
        </section>

        {/* Service Areas */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-gray-900">Service Areas</h2>
          <p className="mt-3 text-sm text-gray-700">
            Dumpster Rescue LLC is based in Bartlett and serves Chicagoland
            suburbs with fast delivery and flexible scheduling. Our service area
            covers DuPage, Kane, and Cook counties, including towns like
            Bartlett, Carol Stream, Bloomingdale, Schaumburg, Elgin, and
            surrounding communities. If you're unsure whether we deliver to your
            location, call or text and we'll confirm availability.
          </p>
        </section>

        {/* Why Choose Us */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-gray-900">
            Why Choose Dumpster Rescue LLC
          </h2>
          <p className="mt-3 text-sm text-gray-700">
            We're a local, family-owned team focused on clear communication and
            fast response. From small cleanouts to large remodels, our crew is
            known for showing up on time, placing dumpsters carefully, and
            keeping pricing straightforward. We also prioritize eco-friendly
            disposal when possible by routing materials to appropriate recycling
            and disposal facilities.
          </p>
          <ul className="mt-4 list-disc space-y-1 pl-5 text-sm text-gray-700">
            <li>Same-day or next-day delivery when available</li>
            <li>Driveway-safe placement and careful pickup</li>
            <li>Transparent pricing with no hidden fees</li>
            <li>Local crew based in Bartlett, IL</li>
            <li>Responsive support for permits and sizing</li>
          </ul>
        </section>

        {/* FAQ */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-gray-900">
            Frequently Asked Questions
          </h2>
          <div className="mt-4 space-y-3">
            {faqs.map((faq, idx) => (
              <details
                key={idx}
                className="rounded-xl border border-gray-200 bg-white px-5 py-4"
              >
                <summary className="cursor-pointer text-sm font-bold uppercase tracking-wide text-gray-900">
                  {faq.question}
                </summary>
                <p className="mt-3 text-sm text-gray-900">{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="mt-10 rounded-lg border border-gray-200 bg-white p-6 shadow-lg">
          <h2 className="text-xl font-bold text-gray-900">
            Ready to Schedule Your Dumpster?
          </h2>
          <p className="mt-2 text-sm text-gray-700">
            Call {brand.phone} or text a photo for a quick estimate. We'll
            recommend the right size, coordinate delivery, and keep your project
            on track.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <a
              href={brand.phoneHref}
              className="rounded-lg bg-red-600 px-6 py-3 text-sm font-bold uppercase tracking-wide text-white shadow-lg hover:bg-red-700"
            >
              Call for a Quote
            </a>
            <a
              href={brand.smsHref}
              className="rounded-lg border-2 border-yellow-400 px-6 py-3 text-sm font-bold uppercase tracking-wide text-yellow-500 hover:bg-yellow-400 hover:text-black"
            >
              Text a Photo
            </a>
          </div>
        </section>
      </div>
    </>
  );
}

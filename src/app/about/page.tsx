import Link from "next/link";
import { brand } from "@/data/brand";

export const metadata = {
  title: "About Us - The Calm, Professional Cleanup Crew",
  description:
    "Dumpster Rescue USA is a local family business serving Chicagoland with professional junk removal, demolition, and dumpster rental. Based in Bartlett, IL.",
  alternates: {
    canonical: "/about/"
  }
};

export default function AboutPage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-gray-900">
        <div className="mx-auto w-full max-w-6xl px-6 py-16">
          <p className="text-xs font-bold uppercase tracking-wide text-green-400">
            About Us
          </p>
          <h1 className="mt-2 text-4xl font-bold text-white md:text-5xl">
            The Calm, Professional Cleanup Crew.
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-white/80">
            We aren&apos;t a national franchise. We are a local family business
            saving Chicagoland from clutter, one driveway at a time.
          </p>
        </div>
      </section>

      <div className="mx-auto w-full max-w-6xl px-6 pb-16 pt-10">
        {/* Why We Exist Section */}
        <section className="flex flex-col gap-8 md:flex-row md:items-center">
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-900">
              Junk removal shouldn&apos;t be stressful.
            </h2>
            <p className="mt-4 text-sm text-gray-700">
              We started Dumpster Rescue USA because we saw a gap in the market.
              You had two bad choices: the expensive national franchises with
              hidden fees, or the &quot;guy with a truck&quot; who might not show up.
            </p>
            <p className="mt-3 text-sm text-gray-700">
              We built the <strong>third option: The Professional Local Crew.</strong>
            </p>
            <p className="mt-3 text-sm text-gray-700">
              We believe in clear communication, clean uniforms, and trucks that
              don&apos;t leak oil on your driveway. When you call us, you aren&apos;t
              getting a call center in another state&mdash;you&apos;re getting a neighbor
              in Bartlett or Medinah who cares about your reputation as much as
              their own.
            </p>
          </div>
          <div className="w-full md:w-96">
            <div className="overflow-hidden rounded-2xl border border-gray-200 shadow-lg">
              <img
                src="/images/optimized/hero-crew.webp"
                alt="Dumpster Rescue USA team - local Bartlett junk removal crew"
                className="h-64 w-full object-cover"
              />
            </div>
          </div>
        </section>

        {/* 3 Pillars Section */}
        <section className="mt-16">
          <h2 className="text-center text-2xl font-bold text-gray-900">
            The 3 Pillars of Rescue
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            What sets us apart from the franchises and the fly-by-night haulers.
          </p>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-lg">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-bold text-gray-900">
                Price Transparency
              </h3>
              <p className="mt-2 text-sm text-gray-600">
                No &quot;Sticker Shock&quot;
              </p>
              <p className="mt-3 text-sm text-gray-700">
                We hate hidden fees as much as you do. We provide clear, upfront
                estimates based on volume. You will never see a &quot;surprise
                surcharge&quot; after the truck is loaded.
              </p>
            </div>
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-lg">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-bold text-gray-900">
                The &quot;Clean Crew&quot; Standard
              </h3>
              <p className="mt-2 text-sm text-gray-600">
                Professional, Respectful, Trusted
              </p>
              <p className="mt-3 text-sm text-gray-700">
                Our team is background-checked, uniformed, and trained to respect
                your property. We sweep up before we leave. The only evidence we
                were there is the clean space we left behind.
              </p>
            </div>
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-lg">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-bold text-gray-900">
                Responsible Disposal
              </h3>
              <p className="mt-2 text-sm text-gray-600">
                Donate & Recycle First
              </p>
              <p className="mt-3 text-sm text-gray-700">
                We don&apos;t just dump it. We sort it. Usable furniture gets donated
                to local charities, and recyclables are separated. We aim to keep
                as much as possible out of the landfill.
              </p>
            </div>
          </div>
        </section>

        {/* Local Roots Section */}
        <section className="mt-16 rounded-2xl border border-gray-200 bg-gray-50 p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900">
            Born in Bartlett. Serving the Suburbs.
          </h2>
          <p className="mt-4 text-sm text-gray-700">
            Our trucks roll out from Humbracht Circle in Bartlett and our service
            office in Medinah every morning. Because we are local, we can offer
            response times the big guys can&apos;t match.
          </p>
          <div className="mt-4 rounded-xl bg-white p-4 shadow">
            <p className="text-sm font-semibold text-gray-900">Our Promise:</p>
            <p className="mt-1 text-sm text-gray-700">
              If we say we&apos;ll be there between 9 AM and 11 AM, we will be. And if
              traffic hits on I-290, you get a text update, not silence.
            </p>
          </div>
          <div className="mt-6 grid gap-4 text-sm text-gray-700 md:grid-cols-2">
            <div className="flex items-start gap-3">
              <svg className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <div>
                <p className="font-semibold">Primary Location</p>
                <p>{brand.primaryLocation.street}, {brand.primaryLocation.city}, {brand.primaryLocation.state} {brand.primaryLocation.zip}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <svg className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              <div>
                <p className="font-semibold">Service Office</p>
                <p>{brand.secondaryLocation.street}, {brand.secondaryLocation.city}, {brand.secondaryLocation.state} {brand.secondaryLocation.zip}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="mt-16">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            <div className="rounded-2xl border border-gray-200 bg-white p-6 text-center shadow-lg">
              <p className="text-3xl font-bold text-green-600">5+</p>
              <p className="mt-1 text-sm text-gray-600">Years Serving DuPage County</p>
            </div>
            <div className="rounded-2xl border border-gray-200 bg-white p-6 text-center shadow-lg">
              <p className="text-3xl font-bold text-green-600">64</p>
              <p className="mt-1 text-sm text-gray-600">5-Star Reviews</p>
            </div>
            <div className="rounded-2xl border border-gray-200 bg-white p-6 text-center shadow-lg">
              <p className="text-3xl font-bold text-green-600">&lt; 5 min</p>
              <p className="mt-1 text-sm text-gray-600">Average Response Time</p>
            </div>
            <div className="rounded-2xl border border-gray-200 bg-white p-6 text-center shadow-lg">
              <p className="text-3xl font-bold text-green-600">100%</p>
              <p className="mt-1 text-sm text-gray-600">Licensed & Insured</p>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="mt-16 rounded-2xl bg-gray-900 p-8 text-center shadow-lg md:p-12">
          <h2 className="text-2xl font-bold text-white md:text-3xl">
            Ready to reclaim your space?
          </h2>
          <p className="mt-3 text-white/80">
            Call now for same-day availability or text us a photo for an instant quote.
          </p>
          <div className="mt-6 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href={brand.phoneHref}
              className="w-full rounded-xl bg-green-600 px-8 py-4 text-sm font-bold uppercase tracking-wide text-white shadow-lg hover:bg-green-700 sm:w-auto"
            >
              Call {brand.phone}
            </a>
            <a
              href={brand.smsHref}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-8 py-4 text-sm font-bold uppercase tracking-wide text-white shadow-lg hover:bg-blue-700 sm:w-auto"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Text Photo for Quote
            </a>
          </div>
        </section>

        {/* Service Links */}
        <section className="mt-16">
          <h2 className="text-xl font-bold text-gray-900">
            Explore Our Services
          </h2>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link href="/services/junk-removal/" className="rounded-xl border border-gray-200 px-4 py-2 text-sm text-gray-800 hover:bg-gray-50">
              Junk Removal
            </Link>
            <Link href="/services/demolition/" className="rounded-xl border border-gray-200 px-4 py-2 text-sm text-gray-800 hover:bg-gray-50">
              Demolition
            </Link>
            <Link href="/services/dumpster-rental/" className="rounded-xl border border-gray-200 px-4 py-2 text-sm text-gray-800 hover:bg-gray-50">
              Dumpster Rental
            </Link>
            <Link href="/services/estate-cleanout/" className="rounded-xl border border-gray-200 px-4 py-2 text-sm text-gray-800 hover:bg-gray-50">
              Estate Cleanout
            </Link>
            <Link href="/services/garage-cleanout/" className="rounded-xl border border-gray-200 px-4 py-2 text-sm text-gray-800 hover:bg-gray-50">
              Garage Cleanout
            </Link>
            <Link href="/locations/" className="rounded-xl border border-gray-200 px-4 py-2 text-sm text-gray-800 hover:bg-gray-50">
              All Locations
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}

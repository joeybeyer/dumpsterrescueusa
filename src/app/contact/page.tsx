import { brand } from "@/data/brand";
import QuoteForm from "@/components/QuoteForm";

export const metadata = {
  title: "Contact Us - Get Your Free Quote Today",
  description:
    "Call, text photos, or fill out our form. Same-day junk removal available. Dumpster Rescue USA serves DuPage, Kane, and Cook counties from Bartlett, IL.",
  alternates: {
    canonical: "/contact/"
  }
};

export default function ContactPage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-gray-900">
        <div className="mx-auto w-full max-w-6xl px-6 py-16">
          <p className="text-xs font-bold uppercase tracking-wide text-green-400">
            Contact Us
          </p>
          <h1 className="mt-2 text-4xl font-bold text-white md:text-5xl">
            Get Your Free Quote in Minutes.
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-white/80">
            Three ways to reach us. Pick the one that fits your style.
          </p>
        </div>
      </section>

      <div className="mx-auto w-full max-w-6xl px-6 pb-16 pt-10">
        {/* Choose Your Speed Grid */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900">Choose Your Speed</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {/* Call Card */}
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-lg">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-bold text-gray-900">Call Us Now</h3>
              <p className="mt-1 text-sm font-semibold text-green-600">
                Fastest for same-day
              </p>
              <p className="mt-3 text-sm text-gray-700">
                Speak directly with our crew. Best if you need service today or
                have questions.
              </p>
              <a
                href={brand.phoneHref}
                className="mt-4 block w-full rounded-xl bg-green-600 px-6 py-4 text-center text-sm font-bold uppercase tracking-wide text-white shadow-lg hover:bg-green-700"
              >
                Call {brand.phone}
              </a>
            </div>

            {/* Text Card */}
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-lg">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-bold text-gray-900">Text Photos</h3>
              <p className="mt-1 text-sm font-semibold text-blue-600">
                Best for accurate quotes
              </p>
              <p className="mt-3 text-sm text-gray-700">
                Snap a pic of your pile. We&apos;ll text back a price within 15
                minutes during business hours.
              </p>
              <a
                href={brand.smsHref}
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-4 text-sm font-bold uppercase tracking-wide text-white shadow-lg hover:bg-blue-700"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Text Photo for Quote
              </a>
            </div>

            {/* Form Card */}
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-lg">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
                <svg className="h-6 w-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-bold text-gray-900">Fill Out Form</h3>
              <p className="mt-1 text-sm font-semibold text-gray-600">
                Good for planning ahead
              </p>
              <p className="mt-3 text-sm text-gray-700">
                Not urgent? Send us details and we&apos;ll follow up within 2
                hours during business hours.
              </p>
              <a
                href="#quote-form"
                className="mt-4 block w-full rounded-xl border border-gray-300 bg-white px-6 py-4 text-center text-sm font-bold uppercase tracking-wide text-gray-700 shadow hover:bg-gray-50"
              >
                Jump to Form
              </a>
            </div>
          </div>
        </section>

        {/* Main Content Grid */}
        <div className="mt-12 grid gap-10 lg:grid-cols-3">
          {/* Quote Form - Takes 2 columns */}
          <section id="quote-form" className="lg:col-span-2">
            <h2 className="mb-4 text-xl font-bold text-gray-900">
              Request a Quote
            </h2>
            <QuoteForm source="/contact" />
          </section>

          {/* Sidebar - Operational Details */}
          <aside className="space-y-6">
            {/* Hours */}
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-lg">
              <h3 className="flex items-center gap-2 text-lg font-bold text-gray-900">
                <svg className="h-5 w-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Hours
              </h3>
              <div className="mt-4 space-y-2 text-sm text-gray-700">
                <div className="flex justify-between">
                  <span>Monday - Friday</span>
                  <span className="font-semibold">7 AM - 7 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday</span>
                  <span className="font-semibold">8 AM - 5 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday</span>
                  <span className="font-semibold">By Appointment</span>
                </div>
              </div>
              <div className="mt-4 rounded-xl bg-green-50 p-3">
                <p className="text-xs font-semibold text-green-700">
                  24/7 emergency line available for urgent cleanouts
                </p>
              </div>
            </div>

            {/* Locations */}
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-lg">
              <h3 className="flex items-center gap-2 text-lg font-bold text-gray-900">
                <svg className="h-5 w-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Our Locations
              </h3>
              <div className="mt-4 space-y-4 text-sm text-gray-700">
                <div>
                  <p className="font-semibold text-gray-900">Primary Location</p>
                  <p>
                    {brand.primaryLocation.street}
                    <br />
                    {brand.primaryLocation.city}, {brand.primaryLocation.state}{" "}
                    {brand.primaryLocation.zip}
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Service Office</p>
                  <p>
                    {brand.secondaryLocation.street}
                    <br />
                    {brand.secondaryLocation.city},{" "}
                    {brand.secondaryLocation.state} {brand.secondaryLocation.zip}
                  </p>
                </div>
              </div>
            </div>

            {/* Service Area */}
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-lg">
              <h3 className="flex items-center gap-2 text-lg font-bold text-gray-900">
                <svg className="h-5 w-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
                Service Area
              </h3>
              <p className="mt-4 text-sm text-gray-700">{brand.serviceArea}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
                  DuPage County
                </span>
                <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
                  Kane County
                </span>
                <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
                  Cook County
                </span>
              </div>
            </div>
          </aside>
        </div>

        {/* Save A Call FAQ Section */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900">
            Save A Call &mdash; Quick Answers
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Common questions we answer on the phone. Read first, call with confidence.
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-lg">
              <h3 className="font-bold text-gray-900">
                How fast can you get here?
              </h3>
              <p className="mt-2 text-sm text-gray-700">
                Same-day service is often available depending on truck schedules.
                Call before noon for the best chance at same-day pickup.
              </p>
            </div>
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-lg">
              <h3 className="font-bold text-gray-900">
                What&apos;s included in the price?
              </h3>
              <p className="mt-2 text-sm text-gray-700">
                Everything. Labor, loading, hauling, and disposal fees are all
                included in your quote. No surprises after the truck is loaded.
              </p>
            </div>
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-lg">
              <h3 className="font-bold text-gray-900">
                Do you move heavy items?
              </h3>
              <p className="mt-2 text-sm text-gray-700">
                Yes. Our crew handles appliances, furniture, hot tubs, and more.
                We bring the muscle so you don&apos;t have to lift a finger.
              </p>
            </div>
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-lg">
              <h3 className="font-bold text-gray-900">
                What won&apos;t you take?
              </h3>
              <p className="mt-2 text-sm text-gray-700">
                Hazardous materials (paint, chemicals, asbestos), medical waste,
                and anything illegal. Everything else? We&apos;ve probably hauled it.
              </p>
            </div>
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-lg">
              <h3 className="font-bold text-gray-900">
                Do I need to be home?
              </h3>
              <p className="mt-2 text-sm text-gray-700">
                Not always. If the items are accessible (garage, driveway, etc.)
                and payment is arranged, we can complete the job while you&apos;re away.
              </p>
            </div>
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-lg">
              <h3 className="font-bold text-gray-900">
                How do I get an exact price?
              </h3>
              <p className="mt-2 text-sm text-gray-700">
                Text us photos or call for a free on-site estimate. We quote by
                volume, not by item, so you always know what to expect.
              </p>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="mt-16 rounded-2xl bg-gray-900 p-8 text-center shadow-lg md:p-12">
          <h2 className="text-2xl font-bold text-white md:text-3xl">
            Still have questions?
          </h2>
          <p className="mt-3 text-white/80">
            We&apos;re happy to help. No pressure, no obligation.
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
      </div>
    </div>
  );
}

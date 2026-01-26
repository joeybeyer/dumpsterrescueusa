"use client";

import Link from "next/link";
import { brand } from "@/data/brand";
import { services } from "@/data/services";
import { locations } from "@/data/locations";
import ReviewsStrip from "@/components/ReviewsStrip";
import TrustBar from "@/components/TrustBar";
import GoogleReviewsBadge from "@/components/GoogleReviewsBadge";
import LocalCrewBadge from "@/components/LocalCrewBadge";
import QuoteForm from "@/components/QuoteForm";
import ProofGallery from "@/components/ProofGallery";

export default function HomePage() {
  const coreServices = services.filter((service) => service.category === "Core");
  const priorityLocations = locations.filter((loc) => loc.priority).slice(0, 6);

  return (
    <div className="bg-white">
      <section className="bg-gray-900">
        {/* Reduced padding on mobile for more content per screen */}
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 pb-10 pt-10 md:flex-row md:items-center md:gap-10 md:pb-14 md:pt-14">
          <div className="space-y-4 text-white md:space-y-5">
            {/* KICKER: Social proof above headline (per Typeframing method) */}
            <p className="text-sm font-medium text-white/70">
              Trusted by 2,000+ Chicagoland homes, landlords & contractors
            </p>

            {/* H1: Problem + Solution + Benefit (8-15 words) */}
            <h1 className="text-4xl font-bold md:text-5xl">
              We show up. We clean it out. You relax.
            </h1>

            {/* Urgency badge - moved below H1 for visual hierarchy */}
            <div className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-4 py-2 text-sm font-bold uppercase tracking-wide">
              <span className="h-2 w-2 animate-pulse rounded-full bg-white"></span>
              Same-Day / 24-7 Response Line
            </div>

            {/* DESCRIPTION: Expanded detail on how we solve the problem (20-40 words) */}
            <p className="max-w-xl text-lg text-white/80">
              Fast, dependable junk removal and demolition across Chicagoland.
              We handle garages, basements, estates & construction debris.
              Local crews. Upfront pricing. No surprises.
            </p>

            {/* Trust signals moved above CTAs with icons */}
            <TrustBar variant="dark" showIcons={true} className="py-2" />

            {/* CTA Buttons - Educational focus (sticky bar handles transactional) */}
            <div className="flex flex-wrap items-center gap-3">
              <a
                href="#quote-form"
                className="rounded-xl bg-green-600 px-6 py-3 text-sm font-bold uppercase tracking-wide text-white shadow-lg hover:bg-green-700"
                style={{ WebkitBackfaceVisibility: 'hidden', backfaceVisibility: 'hidden' }}
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector('#quote-form')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <span>Check Availability</span>
              </a>
              <a
                href={brand.smsHref}
                className="flex items-center gap-2 rounded-xl border-2 border-white/30 bg-white/10 px-6 py-3 text-sm font-bold uppercase tracking-wide text-white shadow-lg hover:bg-white/20"
                style={{ WebkitBackfaceVisibility: 'hidden', backfaceVisibility: 'hidden' }}
              >
                <svg className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>Get Instant Quote</span>
              </a>
            </div>

            {/* Green Guarantee - Guilt-Free Conversion Trigger */}
            <div className="flex items-center gap-2 text-sm text-green-400">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <span className="font-semibold">We Donate & Recycle First</span>
            </div>

            {/* Mobile: Show crew image BEFORE reviews for emotional trust */}
            <div className="block md:hidden">
              <div className="relative h-48 overflow-hidden rounded-2xl border border-gray-700 shadow-lg">
                <img
                  src="/images/optimized/hero-crew.webp"
                  alt="Dumpster Rescue USA crew with junk removal truck in Chicagoland"
                  className="h-full w-full object-cover"
                />
                <LocalCrewBadge defaultCity="Bartlett" />
              </div>
            </div>

            {/* Google Reviews badge near CTAs - clickable to GBP */}
            <GoogleReviewsBadge
              rating={5.0}
              count={64}
              compact
              variant="dark"
              reviewsUrl="https://www.google.com/maps/place/Dumpster+Rescue+LLC/@41.9952457,-88.2026682,17z/data=!4m16!1m9!3m8!1s0x880f07d388d5fce1:0xa410c666518792f8!2sDumpster+Rescue+LLC!8m2!3d41.9952457!4d-88.2026682!9m1!1b1!16s%2Fg%2F11lf227nvz!3m5!1s0x880f07d388d5fce1:0xa410c666518792f8!8m2!3d41.9952457!4d-88.2026682!16s%2Fg%2F11lf227nvz"
            />
          </div>
          <div id="quote-form" className="flex w-full flex-col gap-4 md:max-w-md scroll-mt-24">
            {/* Hero image - Desktop only (mobile shows it above reviews) */}
            <div className="relative hidden h-60 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg md:block">
              <img
                src="/images/optimized/hero-crew.webp"
                alt="Dumpster Rescue USA crew with junk removal truck in Chicagoland"
                className="h-full w-full object-cover"
              />
              {/* Overlay badge - Dynamic based on user location */}
              <LocalCrewBadge defaultCity="Bartlett" />
            </div>
            <QuoteForm source="/" className="max-w-md" />
          </div>
        </div>
      </section>

      {/* 3-Step Process Visual - The Missing Bridge */}
      {/* Reduced padding on mobile for more content per screen */}
      <section className="border-b border-gray-100 bg-gray-50 py-5 md:py-8">
        <div className="mx-auto flex w-full max-w-4xl flex-col items-center gap-4 px-6 md:flex-row md:gap-6 md:justify-between">
          <div className="flex flex-col items-center text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-100">
              <svg className="h-7 w-7 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <p className="mt-2 text-sm font-bold text-gray-900">1. Snap a Photo</p>
            <p className="text-xs text-gray-600">Text us what you need gone</p>
          </div>
          <div className="hidden h-0.5 w-16 bg-green-200 md:block" />
          <div className="flex flex-col items-center text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-100">
              <svg className="h-7 w-7 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
            </div>
            <p className="mt-2 text-sm font-bold text-gray-900">2. Get Upfront Price</p>
            <p className="text-xs text-gray-600">No surprises, no haggling</p>
          </div>
          <div className="hidden h-0.5 w-16 bg-green-200 md:block" />
          <div className="flex flex-col items-center text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-100">
              <svg className="h-7 w-7 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="mt-2 text-sm font-bold text-gray-900">3. Gone in 24 Hours</p>
            <p className="text-xs text-gray-600">We haul it, you relax</p>
          </div>
        </div>
      </section>

      {/* Service cards - reduced padding on mobile */}
      <section className="mx-auto w-full max-w-6xl px-6 py-6 md:py-10">
        <div className="grid gap-4 md:gap-5 md:grid-cols-3">
          {coreServices.map((service) => (
            <Link
              key={service.slug}
              href={`/services/${service.slug}/`}
              className="rounded-2xl border border-gray-200 bg-white p-5 shadow-lg"
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

      {/* Proof Gallery - Before/After showcase */}
      <section className="border-t border-gray-100 bg-gray-50">
        <ProofGallery />
        <div className="pb-8 text-center">
          <Link
            href="/gallery/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-green-600 hover:text-green-700 hover:underline"
          >
            View Full Gallery
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>

      {/* Priority areas - reduced padding on mobile */}
      <section className="mx-auto w-full max-w-6xl px-6 pb-8 pt-6 md:pb-10 md:pt-10">
        <h2 className="text-2xl font-bold text-gray-900">
          Priority service areas
        </h2>
        <p className="mt-2 text-sm text-gray-700">
          The cities below receive dedicated local coverage and fast response
          times.
        </p>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {priorityLocations.map((location, index) => (
            <Link
              key={location.slug}
              href={`/locations/${location.slug}/`}
              className="group rounded-2xl border border-gray-200 bg-white p-4 shadow-lg transition-shadow hover:shadow-xl"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm font-bold uppercase tracking-wide text-gray-900">
                  {location.name}, IL
                </p>
                {/* Speed indicator - alternating status for visual variety */}
                <div className="flex items-center gap-1.5">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-green-500"></span>
                  <span className="text-xs font-medium text-green-600">
                    {index % 2 === 0 ? "Trucks in area" : "Same-Day Available"}
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

      {/* Reviews - reduced padding on mobile */}
      <section className="mx-auto w-full max-w-6xl px-6 pb-12 md:pb-16">
        <ReviewsStrip />
      </section>
    </div>
  );
}

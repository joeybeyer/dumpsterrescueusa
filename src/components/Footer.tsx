import Link from "next/link";
import { brand } from "@/data/brand";

// Priority locations for footer (top 6) with county for geo relevance
const footerLocations = [
  { name: "Bartlett", county: "DuPage", slug: "bartlett-il" },
  { name: "Elgin", county: "Kane", slug: "elgin-il" },
  { name: "Schaumburg", county: "Cook", slug: "schaumburg-il" },
  { name: "Naperville", county: "DuPage", slug: "naperville-il" },
  { name: "Carol Stream", county: "DuPage", slug: "carol-stream-il" },
  { name: "Bloomingdale", county: "DuPage", slug: "bloomingdale-il" }
];

// Core services for footer
const footerServices = [
  { name: "Junk Removal", slug: "junk-removal" },
  { name: "Demolition", slug: "demolition" },
  { name: "Dumpster Rental", slug: "dumpster-rental" },
  { name: "Garage Cleanouts", slug: "garage-cleanout" },
  { name: "Estate Cleanouts", slug: "estate-cleanout" },
  { name: "Hot Tub Removal", slug: "hot-tub-removal" }
];

interface FooterProps {
  geoLine?: string;
}

export default function Footer({ geoLine }: FooterProps) {
  const defaultGeoLine = "Serving DuPage, Kane, and Cook County suburbs across Chicagoland.";

  return (
    <footer className="bg-gray-900 pb-6 pt-12 text-sm text-white">
      <div className="mx-auto w-full max-w-6xl px-6">
        {/* 4-Column Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Column 1: Brand + Trust */}
          <div>
            <p className="text-lg font-bold">{brand.name}</p>
            <p className="mt-1 text-white/70">Family-Owned • Licensed & Insured</p>

            <div className="mt-4 space-y-2 text-white/80">
              <div className="flex items-start gap-2">
                <svg className="mt-0.5 h-4 w-4 shrink-0 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>{brand.primaryLocation.city}, IL</span>
              </div>
              <div className="flex items-start gap-2">
                <svg className="mt-0.5 h-4 w-4 shrink-0 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                <span>Service Office: {brand.secondaryLocation.city}, IL</span>
              </div>
            </div>

            {/* Google Rating */}
            <div className="mt-4 flex items-center gap-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="h-4 w-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-white/80">5.0 Google Rating (64 reviews)</span>
            </div>
          </div>

          {/* Column 2: Services */}
          <div>
            <p className="font-bold uppercase tracking-wide text-white/90">Services</p>
            <ul className="mt-3 space-y-2">
              {footerServices.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services/${service.slug}/`}
                    className="text-white/70 transition-colors hover:text-white"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Locations */}
          <div>
            <p className="font-bold uppercase tracking-wide text-white/90">Locations</p>
            <ul className="mt-3 space-y-2">
              {footerLocations.map((location) => (
                <li key={location.slug}>
                  <Link
                    href={`/locations/${location.slug}/`}
                    className="text-white/70 transition-colors hover:text-white"
                  >
                    {location.name} <span className="text-white/40">({location.county})</span>
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/locations/"
                  className="inline-flex items-center gap-1 font-medium text-green-400 hover:text-green-300"
                >
                  View all locations
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact + Action */}
          <div>
            <p className="font-bold uppercase tracking-wide text-white/90">Contact Us</p>
            <div className="mt-3 space-y-3">
              <a
                href={brand.phoneHref}
                className="flex items-center gap-2 text-white hover:text-green-400"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className="font-semibold">{brand.phone}</span>
              </a>
              <a
                href={brand.smsHref}
                className="flex items-center gap-2 text-white hover:text-green-400"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <span>Text Us for a Quote</span>
              </a>
              <div className="flex items-center gap-2 text-green-400">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="font-medium">Same-Day Service Available</span>
              </div>
            </div>

            {/* Social Links - "Verified on" framing for trust */}
            <div className="mt-6">
              <p className="text-xs text-white/50">Verified on</p>
              <div className="mt-2 flex items-center gap-3">
                {/* Google Business Profile - PRIMARY (brighter, larger) */}
                <a
                  href="https://www.google.com/maps/place/Dumpster+Rescue+LLC/@41.9952457,-88.2026682,17z/data=!4m16!1m9!3m8!1s0x880f07d388d5fce1:0xa410c666518792f8!2sDumpster+Rescue+LLC!8m2!3d41.9952457!4d-88.2026682!9m1!1b1!16s%2Fg%2F11lf227nvz!3m5!1s0x880f07d388d5fce1:0xa410c666518792f8!8m2!3d41.9952457!4d-88.2026682!16s%2Fg%2F11lf227nvz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white transition-colors hover:bg-white/30"
                  aria-label="Google Business Profile"
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                  </svg>
                </a>
                {/* Facebook - Secondary (muted) */}
                <a
                  href="https://www.facebook.com/profile.php?id=61583786624911"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white/50 transition-colors hover:bg-white/20 hover:text-white/70"
                  aria-label="Facebook"
                >
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
                {/* Instagram - Secondary (muted) */}
                <a
                  href="https://www.instagram.com/dumpsterrescue"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white/50 transition-colors hover:bg-white/20 hover:text-white/70"
                  aria-label="Instagram"
                >
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
                {/* WhatsApp - Secondary (muted) */}
                <a
                  href="https://wa.me/16307358700"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white/50 transition-colors hover:bg-white/20 hover:text-white/70"
                  aria-label="WhatsApp"
                >
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </a>
                {/* Nextdoor - Secondary (muted) */}
                <a
                  href="https://nextdoor.com/pages/dumpster-rescue-llc-bartlett-il/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white/50 transition-colors hover:bg-white/20 hover:text-white/70"
                  aria-label="Nextdoor"
                >
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 3L4 9v11h5v-6h6v6h5V9l-8-6zm-4 7l4-3 4 3v1H8v-1z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 border-t border-white/10 pt-6">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            {/* Geo Line */}
            <p className="text-center text-xs text-white/50 md:text-left">
              {geoLine || defaultGeoLine}
            </p>

            {/* Legal Links */}
            <div className="flex flex-wrap justify-center gap-4 text-xs text-white/50">
              <Link href="/privacy-policy/" className="hover:text-white/70">
                Privacy Policy
              </Link>
              <Link href="/legal/" className="hover:text-white/70">
                Terms of Service
              </Link>
              <span>&copy; {new Date().getFullYear()} {brand.name}</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

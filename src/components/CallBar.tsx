"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { brand } from "@/data/brand";

// Core services for dropdown menu
const coreServices = [
  { slug: "junk-removal", name: "Junk Removal" },
  { slug: "dumpster-rental", name: "Dumpster Rental" },
  { slug: "demolition", name: "Demolition" },
  { slug: "estate-cleanout", name: "Estate Cleanout" },
  { slug: "garage-cleanout", name: "Garage Cleanout" },
];

export default function CallBar() {
  const [scrolled, setScrolled] = useState(false);

  // Track scroll for mobile header shrink
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="sticky top-0 z-50 border-b border-gray-800 bg-black transition-all duration-200">
      <div className={`mx-auto flex w-full max-w-6xl items-center justify-between px-6 transition-all duration-200 ${scrolled ? "py-2 md:py-4" : "py-4"}`}>
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-3">
            <img
              src="/images/optimized/logo.webp"
              alt="Dumpster Rescue LLC"
              className={`transition-all duration-200 ${scrolled ? "h-12" : "h-16 md:h-20"}`}
            />
            <div className="flex flex-col">
              <span className="font-heading text-lg font-bold uppercase leading-tight text-white">
                {brand.name}
              </span>
              <span className={`text-xs font-bold uppercase tracking-wide text-red-500 transition-all duration-200 ${scrolled ? "hidden md:block" : ""}`}>
                Same-Day Junk Removal
              </span>
            </div>
          </Link>
        </div>
        <div className="hidden items-center gap-4 md:flex">
          {/* Services dropdown */}
          <div className="group relative">
            <Link
              href="/services/"
              className="flex items-center gap-1 text-sm font-bold uppercase tracking-wide text-white hover:text-red-500"
            >
              Services
              <svg
                className="h-4 w-4 transition-transform group-hover:rotate-180"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </Link>
            {/* Dropdown menu */}
            <div className="invisible absolute left-0 top-full z-50 min-w-[220px] pt-2 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100">
              <div className="rounded-lg border border-gray-700 bg-gray-900 py-2 shadow-xl">
                {coreServices.map((service) => (
                  <Link
                    key={service.slug}
                    href={`/services/${service.slug}/`}
                    className="block px-4 py-2 text-sm text-white hover:bg-gray-800 hover:text-yellow-300"
                  >
                    {service.name}
                  </Link>
                ))}
                <div className="my-2 border-t border-gray-700" />
                <Link
                  href="/services/"
                  className="block px-4 py-2 text-sm font-semibold text-yellow-300 hover:bg-gray-800"
                >
                  View All Services →
                </Link>
              </div>
            </div>
          </div>
          <Link
            href="/locations/"
            className="text-sm font-bold uppercase tracking-wide text-white hover:text-red-500"
          >
            Locations
          </Link>
          <Link
            href="/about/"
            className="text-sm font-bold uppercase tracking-wide text-white hover:text-red-500"
          >
            About
          </Link>
          <Link
            href="/gallery/"
            className="text-sm font-bold uppercase tracking-wide text-white hover:text-red-500"
          >
            Gallery
          </Link>
          <Link
            href="/contact/"
            className="text-sm font-bold uppercase tracking-wide text-white hover:text-red-500"
          >
            Contact
          </Link>
        </div>
        <div className="flex items-center gap-3">
          <a
            href={brand.phoneHref}
            className="rounded-lg bg-red-600 px-5 py-3 text-sm font-bold uppercase tracking-wide text-white shadow-lg hover:bg-red-700"
            style={{ WebkitBackfaceVisibility: 'hidden', backfaceVisibility: 'hidden' }}
          >
            <span>Call {brand.phone}</span>
          </a>
          <a
            href={brand.smsHref}
            className="hidden rounded-lg border-2 border-yellow-400 px-4 py-2 text-sm font-bold uppercase tracking-wide text-yellow-400 hover:bg-yellow-400 hover:text-black md:inline-flex"
            style={{ WebkitBackfaceVisibility: 'hidden', backfaceVisibility: 'hidden' }}
          >
            <span>Text a Photo for a Price</span>
          </a>
        </div>
      </div>
    </div>
  );
}


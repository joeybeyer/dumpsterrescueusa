"use client";

import { useState, useEffect } from "react";
import { brand } from "@/data/brand";

export default function StickyCallButton() {
  const [formVisible, setFormVisible] = useState(true);

  useEffect(() => {
    const form = document.getElementById("quote-form");
    if (!form) return;

    const observer = new IntersectionObserver(
      ([entry]) => setFormVisible(entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(form);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Mobile: Always-visible sticky bottom CTAs */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-gradient-to-t from-black/90 to-transparent pb-4 pt-8 md:hidden">
        <div className="mx-4 flex flex-col gap-2">
          <a
            href={brand.phoneHref}
            className="flex w-full items-center justify-center rounded-lg bg-red-600 px-4 py-4 text-base font-bold uppercase tracking-wide text-white shadow-xl hover:bg-red-700 active:bg-red-800"
            style={{ WebkitBackfaceVisibility: 'hidden', backfaceVisibility: 'hidden' }}
          >
            <svg className="mr-2 h-5 w-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <span>Call Now</span>
          </a>
          <a
            href={brand.smsHref}
            className="flex w-full items-center justify-center gap-2 rounded-lg border-2 border-yellow-400 bg-black px-4 py-4 text-base font-bold uppercase tracking-wide text-yellow-400 shadow-xl hover:bg-yellow-400 hover:text-black active:bg-yellow-500"
            style={{ WebkitBackfaceVisibility: 'hidden', backfaceVisibility: 'hidden' }}
          >
            <svg className="h-5 w-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>Text a Photo for a Price</span>
          </a>
        </div>
      </div>

      {/* Desktop: Sticky bottom bar when quote form scrolls out of view */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-40 hidden border-t border-gray-800 bg-black/95 backdrop-blur-sm transition-transform duration-300 md:block ${
          formVisible ? "translate-y-full" : "translate-y-0"
        }`}
      >
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-3">
          <p className="text-sm font-semibold text-white">
            Ready to reclaim your space? Get a free quote now.
          </p>
          <div className="flex items-center gap-3">
            <a
              href={brand.smsHref}
              className="flex items-center gap-2 rounded-lg bg-red-600 px-5 py-2.5 text-sm font-bold uppercase tracking-wide text-white shadow-lg hover:bg-red-700"
            >
              <svg className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Text a Photo for a Price
            </a>
            <a
              href={brand.phoneHref}
              className="rounded-lg border-2 border-yellow-400 px-5 py-2.5 text-sm font-bold uppercase tracking-wide text-yellow-400 hover:bg-yellow-400 hover:text-black"
            >
              Call {brand.phone}
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

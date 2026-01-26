import { brand } from "@/data/brand";

export default function StickyCallButton() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-gradient-to-t from-gray-900/90 to-transparent pb-4 pt-8 md:hidden">
      <div className="mx-4 flex flex-col gap-2">
        {/* Call Now - Primary CTA, full width */}
        <a
          href={brand.phoneHref}
          className="flex w-full items-center justify-center rounded-xl bg-green-600 px-4 py-4 text-base font-bold uppercase tracking-wide text-white shadow-xl hover:bg-green-700 active:bg-green-800"
          style={{ WebkitBackfaceVisibility: 'hidden', backfaceVisibility: 'hidden' }}
        >
          <svg className="mr-2 h-5 w-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          <span>Call Now</span>
        </a>
        {/* Text Photo - Secondary CTA, full width, filled style */}
        <a
          href={brand.smsHref}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-gray-800 px-4 py-4 text-base font-bold uppercase tracking-wide text-white shadow-xl hover:bg-gray-700 active:bg-gray-600"
          style={{ WebkitBackfaceVisibility: 'hidden', backfaceVisibility: 'hidden' }}
        >
          <svg className="h-5 w-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span>Text a Photo</span>
        </a>
      </div>
    </div>
  );
}

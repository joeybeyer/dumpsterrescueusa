import { brand } from "@/data/brand";

interface FooterConversionBandProps {
  cityName?: string;
}

export default function FooterConversionBand({ cityName }: FooterConversionBandProps) {
  const headline = cityName
    ? `Need Junk Removal in ${cityName} Today?`
    : "Need Junk Removal Today?";

  return (
    <section className="border-t border-gray-200 bg-gray-50 py-10">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <h2 className="font-heading text-2xl font-bold uppercase text-gray-900 md:text-3xl">
          {headline}
        </h2>

        <div className="mt-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-gray-700">
          <div className="flex items-center gap-2">
            <svg className="h-5 w-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>Same-Day Service</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="h-5 w-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>Licensed & Insured</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="h-5 w-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>Local Crew Dispatched Fast</span>
          </div>
        </div>

        <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href={brand.phoneHref}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-red-600 px-8 py-4 text-base font-bold uppercase tracking-wide text-white shadow-lg hover:bg-red-700 sm:w-auto"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            Call {brand.phone}
          </a>
          <a
            href={brand.smsHref}
            className="flex w-full items-center justify-center gap-2 rounded-lg border-2 border-gray-900 bg-transparent px-8 py-4 text-base font-bold uppercase tracking-wide text-gray-900 hover:bg-gray-100 sm:w-auto"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Text a Photo
          </a>
        </div>
      </div>
    </section>
  );
}

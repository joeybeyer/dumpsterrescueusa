import { brand } from "@/data/brand";

export const metadata = {
  title: "Pricing",
  description: "Clear, upfront pricing for junk removal and demolition.",
  alternates: {
    canonical: "/pricing/"
  }
};

export default function PricingPage() {
  return (
    <div className="mx-auto w-full max-w-4xl px-6 pb-16 pt-10">
      <p className="text-xs font-bold uppercase tracking-wide text-green-600">
        Pricing
      </p>
      <h1 className="mt-2 text-3xl font-bold text-gray-900">
        Clear, upfront pricing with no surprises.
      </h1>
      <p className="mt-3 text-sm text-gray-700">
        Pricing depends on volume, access, and disposal requirements. Call us
        for a fast, exact quote.
      </p>
      <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-lg">
        <h2 className="text-lg font-bold text-gray-900">What affects cost</h2>
        <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-gray-700">
          <li>Amount and type of debris</li>
          <li>Access and labor requirements</li>
          <li>Dumpster size or haul type</li>
          <li>Permits for street placement when required</li>
        </ul>
      </div>
      <div className="mt-6">
        <a
          href={brand.phoneHref}
          className="rounded-xl bg-green-600 px-6 py-3 text-sm font-bold uppercase tracking-wide text-white shadow-lg hover:bg-green-700"
        >
          Call {brand.phone}
        </a>
      </div>
    </div>
  );
}

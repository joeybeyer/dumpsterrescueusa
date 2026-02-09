import { brand } from "@/data/brand";

export const metadata = {
  title: "Tips & Advice",
  description:
    "Helpful cleanup and demolition tips from the Dumpster Rescue LLC team.",
  alternates: {
    canonical: "/tips-advice/"
  }
};

export default function TipsAdvicePage() {
  return (
    <div className="mx-auto w-full max-w-4xl px-6 pb-16 pt-10">
      <p className="text-xs font-bold uppercase tracking-wide text-red-600">
        Tips & Advice
      </p>
      <h1 className="mt-2 text-3xl font-bold text-gray-900">
        Practical cleanup guidance from the rescue crew.
      </h1>
      <p className="mt-3 text-sm text-gray-700">
        We'll add helpful guides for cleanouts, demolition prep, and dumpster
        sizing.
      </p>
      <p className="mt-4 text-xs text-gray-600">
        Last updated{" "}
        <time dateTime={brand.updatedDate}>{brand.updatedDate}</time>
      </p>
      <div className="mt-6 rounded-lg border border-gray-200 bg-white p-6 shadow-lg">
        <p className="text-sm text-gray-700">
          Coming soon: practical checklists and local permit guidance.
        </p>
      </div>
    </div>
  );
}


export const metadata = {
  title: "Legal",
  description: "Legal information for Dumpster Rescue LLC.",
  alternates: {
    canonical: "/legal/"
  }
};

export default function LegalPage() {
  return (
    <div className="mx-auto w-full max-w-4xl px-6 pb-16 pt-10">
      <h1 className="text-3xl font-bold text-gray-900">Legal</h1>
      <p className="mt-4 text-sm text-gray-700">
        This page will include legal disclosures and terms. Replace this copy
        with the finalized legal text.
      </p>
    </div>
  );
}


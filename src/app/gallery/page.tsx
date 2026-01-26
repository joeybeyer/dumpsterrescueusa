import { Metadata } from "next";
import ProofGallery from "@/components/ProofGallery";

export const metadata: Metadata = {
  title: "Project Gallery - Before & After Photos | Dumpster Rescue USA",
  description:
    "See real before and after photos of our junk removal, demolition, and dumpster rental projects across Chicagoland. Proof we get the job done right.",
  alternates: {
    canonical: "/gallery/"
  }
};

export default function GalleryPage() {
  return (
    <div className="bg-white">
      {/* Hero section */}
      <section className="bg-gray-900 py-12">
        <div className="mx-auto max-w-4xl px-6 text-center text-white">
          <h1 className="text-4xl font-bold">
            Our Work Speaks for Itself
          </h1>
          <p className="mt-4 text-lg text-white/80">
            Real projects from real customers across DuPage, Kane, and Cook counties.
            Drag the slider on Before/After photos to see the transformation.
          </p>
        </div>
      </section>

      {/* Gallery component */}
      <ProofGallery />

      {/* Trust signals */}
      <section className="border-t border-gray-200 bg-gray-50 py-12">
        <div className="mx-auto max-w-4xl px-6">
          <div className="grid gap-8 text-center md:grid-cols-3">
            <div>
              <p className="text-3xl font-bold text-green-600">5.0</p>
              <p className="mt-1 text-sm text-gray-600">Google Rating (64 Reviews)</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-green-600">Same-Day</p>
              <p className="mt-1 text-sm text-gray-600">Service Available</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-green-600">100%</p>
              <p className="mt-1 text-sm text-gray-600">Licensed & Insured</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

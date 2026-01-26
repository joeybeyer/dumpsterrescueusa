import { brand } from "@/data/brand";

export const metadata = {
  title: "Thank You",
  description: "Thanks for contacting Dumpster Rescue USA.",
  alternates: {
    canonical: "/thank-you/"
  }
};

export default function ThankYouPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-6 pb-16 pt-10 text-center">
      <h1 className="text-3xl font-bold text-gray-900">Thanks for reaching out.</h1>
      <p className="mt-3 text-sm text-gray-700">
        We'll respond quickly. If you need immediate help, call{" "}
        <a href={brand.phoneHref} className="font-bold text-green-600">
          {brand.phone}
        </a>
        .
      </p>
    </div>
  );
}

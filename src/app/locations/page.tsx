import { brand } from "@/data/brand";
import { locations, counties } from "@/data/locations";
import LocationSearch from "@/components/LocationSearch";

export const metadata = {
  title: "Locations",
  description:
    "Service coverage for Chicagoland suburbs in DuPage, Kane, and Cook counties.",
  alternates: {
    canonical: "/locations/"
  }
};

export default function LocationsPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-6 pb-16 pt-10">
      <p className="text-xs font-bold uppercase tracking-wide text-red-600">
        Locations
      </p>
      <h1 className="mt-2 text-3xl font-bold text-gray-900">
        Service coverage across Chicagoland suburbs.
      </h1>
      <p className="mt-3 text-sm text-gray-700">
        We serve DuPage, Kane, and Cook counties from Bartlett with a service
        office in Medinah.
      </p>
      <p className="mt-2 text-sm text-gray-700">
        Call {brand.phone} for fast response and availability.
      </p>
      <p className="mt-2 text-xs text-gray-600">
        Last updated{" "}
        <time dateTime={brand.updatedDate}>{brand.updatedDate}</time>
      </p>

      <div className="mt-8">
        <LocationSearch locations={locations} counties={counties} />
      </div>
    </div>
  );
}

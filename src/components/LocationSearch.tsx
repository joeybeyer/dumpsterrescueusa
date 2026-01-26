"use client";

import { useMemo, useState } from "react";

type Location = {
  slug: string;
  name: string;
  county: string;
  secondaryCounties?: string[];
};

type LocationSearchProps = {
  locations: Location[];
  counties: string[];
};

export default function LocationSearch({ locations, counties }: LocationSearchProps) {
  const [query, setQuery] = useState("");
  const [county, setCounty] = useState("All");

  const filtered = useMemo(() => {
    return locations.filter((location) => {
      const matchesQuery = location.name
        .toLowerCase()
        .includes(query.toLowerCase());
      const matchesCounty =
        county === "All" ||
        location.county === county ||
        location.secondaryCounties?.includes(county);
      return matchesQuery && matchesCounty;
    });
  }, [query, county, locations]);

  return (
    <div className="space-y-4">
      <div className="grid gap-3 md:grid-cols-3">
        <input
          className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm"
          placeholder="Search by city name"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <select
          className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm"
          value={county}
          onChange={(event) => setCounty(event.target.value)}
        >
          <option value="All">All counties</option>
          {counties.map((item) => (
            <option key={item} value={item}>
              {item} County
            </option>
          ))}
        </select>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {filtered.map((location) => (
          <a
            key={location.slug}
            href={`/locations/${location.slug}/`}
            className="rounded-2xl border border-gray-200 bg-white p-4 shadow-lg"
          >
            <p className="text-sm font-bold uppercase tracking-wide text-gray-900">{location.name}</p>
            <p className="text-xs text-gray-600">{location.county} County</p>
          </a>
        ))}
      </div>
    </div>
  );
}

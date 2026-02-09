import React from "react";

interface TableColumn {
  key: string;
  header: string;
  className?: string;
}

interface ComparisonTableProps {
  title?: string;
  description?: string;
  columns: TableColumn[];
  data: Record<string, string | number | React.ReactNode>[];
  highlightFirst?: boolean;
  className?: string;
}

export default function ComparisonTable({
  title,
  description,
  columns,
  data,
  highlightFirst = false,
  className = "",
}: ComparisonTableProps) {
  return (
    <div className={`overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg ${className}`}>
      {(title || description) && (
        <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
          {title && (
            <h3 className="text-lg font-bold text-gray-900">{title}</h3>
          )}
          {description && (
            <p className="mt-1 text-sm text-gray-600">{description}</p>
          )}
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  scope="col"
                  className={`px-6 py-3 text-left text-xs font-bold uppercase tracking-wide text-gray-700 ${column.className || ""}`}
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {data.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className={
                  highlightFirst && rowIndex === 0
                    ? "bg-red-50"
                    : rowIndex % 2 === 0
                    ? "bg-white"
                    : "bg-gray-50"
                }
              >
                {columns.map((column) => (
                  <td
                    key={column.key}
                    className={`whitespace-nowrap px-6 py-4 text-sm text-gray-900 ${
                      highlightFirst && rowIndex === 0 ? "font-semibold" : ""
                    }`}
                  >
                    {row[column.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Pre-built dumpster size comparison table for BERT optimization
export function DumpsterSizeTable({ className = "" }: { className?: string }) {
  const columns: TableColumn[] = [
    { key: "size", header: "Dumpster Size" },
    { key: "dimensions", header: "Dimensions (L x W x H)" },
    { key: "capacity", header: "Capacity" },
    { key: "bestFor", header: "Best For" },
    { key: "price", header: "Starting Price" },
  ];

  const data = [
    {
      size: "10-Yard",
      dimensions: "12' x 8' x 3.5'",
      capacity: "4 pickup truck loads",
      bestFor: "Small cleanouts, garage clearing",
      price: "$295",
    },
    {
      size: "15-Yard",
      dimensions: "16' x 8' x 4'",
      capacity: "6 pickup truck loads",
      bestFor: "Basement cleanouts, small remodels",
      price: "$345",
    },
    {
      size: "20-Yard",
      dimensions: "22' x 8' x 4.5'",
      capacity: "8 pickup truck loads",
      bestFor: "Roofing projects, large cleanouts",
      price: "$395",
    },
    {
      size: "30-Yard",
      dimensions: "22' x 8' x 6'",
      capacity: "12 pickup truck loads",
      bestFor: "Construction debris, major renovations",
      price: "$495",
    },
  ];

  return (
    <ComparisonTable
      title="Dumpster Rental Sizes & Pricing in Chicagoland"
      description="Compare our dumpster sizes to find the right fit for your project. Prices include delivery, pickup, and disposal."
      columns={columns}
      data={data}
      className={className}
    />
  );
}

// Full-service junk removal pricing table (labor included)
export function FullServicePricingTable({ className = "" }: { className?: string }) {
  const columns: TableColumn[] = [
    { key: "service", header: "Service Package" },
    { key: "capacity", header: "Capacity" },
    { key: "includes", header: "What's Included" },
    { key: "bestFor", header: "Best For" },
    { key: "price", header: "Price" },
  ];

  const data = [
    {
      service: "Full-Service Dump Truck",
      capacity: "Up to 7 yards",
      includes: "Dump truck, labor, loading, hauling, disposal",
      bestFor: "Small cleanouts, single room, furniture removal",
      price: "$399",
    },
    {
      service: "15-Yard Dumpster + Full-Service Truck",
      capacity: "15 yards + 7 yards (22 total)",
      includes: "15-yard dumpster rental, 7-yard dump truck, full labor crew",
      bestFor: "Basement + garage combo, estate cleanouts, major cleanups",
      price: "$999",
    },
  ];

  return (
    <ComparisonTable
      title="Full-Service Junk Removal Packages"
      description="All-inclusive pricing with labor. We do the heavy lifting—you just point to what goes."
      columns={columns}
      data={data}
      highlightFirst={true}
      className={className}
    />
  );
}

// Service comparison table
export function ServiceComparisonTable({ className = "" }: { className?: string }) {
  const columns: TableColumn[] = [
    { key: "service", header: "Service" },
    { key: "timeline", header: "Timeline" },
    { key: "includes", header: "What's Included" },
    { key: "bestFor", header: "Best For" },
  ];

  const data = [
    {
      service: "Same-Day Junk Removal",
      timeline: "Same day",
      includes: "Loading, hauling, disposal, cleanup",
      bestFor: "Urgent cleanouts, small to medium loads",
    },
    {
      service: "Dumpster Rental",
      timeline: "3-7 days",
      includes: "Delivery, pickup, disposal up to weight limit",
      bestFor: "Large projects, DIY renovations",
    },
    {
      service: "Estate Cleanout",
      timeline: "1-3 days",
      includes: "Full property clearing, sorting, donation coordination",
      bestFor: "Estates, move-outs, inherited properties",
    },
    {
      service: "Light Demolition",
      timeline: "1-2 days",
      includes: "Demo, debris removal, site cleanup",
      bestFor: "Sheds, decks, interior demo",
    },
  ];

  return (
    <ComparisonTable
      title="Junk Removal Services Comparison"
      description="Choose the right service for your project. All services available across DuPage, Kane, and Cook counties."
      columns={columns}
      data={data}
      className={className}
    />
  );
}

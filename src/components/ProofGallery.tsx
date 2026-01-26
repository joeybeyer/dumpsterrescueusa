"use client";

import { useState } from "react";

// Gallery categories for filtering
const categories = [
  { id: "all", label: "All Projects" },
  { id: "cleanouts", label: "Extreme Cleanouts" },
  { id: "demolition", label: "Demolition" },
  { id: "dumpsters", label: "Dumpster Rentals" }
];

// Gallery items with Before/After support
type GalleryItem = {
  id: string;
  category: "cleanouts" | "demolition" | "dumpsters";
  title: string;
  location: string;
  description: string;
  beforeImage?: string;
  afterImage?: string;
  isBeforeAfter: boolean;
  // Placeholder colors for items without real images yet
  placeholderBefore?: string;
  placeholderAfter?: string;
};

const galleryItems: GalleryItem[] = [
  // Extreme Cleanouts
  {
    id: "cleanout-1",
    category: "cleanouts",
    title: "Estate Cleanout",
    location: "Bartlett, IL",
    description: "Complete 3-bedroom estate cleared in one day. Donated usable items to local charity.",
    isBeforeAfter: true,
    beforeImage: "/images/optimized/gallery-estate-before.webp",
    afterImage: "/images/optimized/gallery-estate-after.webp"
  },
  {
    id: "cleanout-2",
    category: "cleanouts",
    title: "Garage Cleanout",
    location: "Naperville, IL",
    description: "20 years of accumulation removed. Client could finally park their car inside.",
    isBeforeAfter: true,
    beforeImage: "/images/optimized/gallery-garage-extreme-before.webp",
    afterImage: "/images/optimized/gallery-garage-extreme-after.webp"
  },
  {
    id: "cleanout-3",
    category: "cleanouts",
    title: "Basement Cleanout",
    location: "Schaumburg, IL",
    description: "Flooded basement cleared and prepped for renovation.",
    isBeforeAfter: true,
    beforeImage: "/images/optimized/gallery-basement-extreme-before.webp",
    afterImage: "/images/optimized/gallery-basement-extreme-after.webp"
  },
  // Demolition
  {
    id: "demo-1",
    category: "demolition",
    title: "Hot Tub Removal",
    location: "Elmhurst, IL",
    description: "Old spa removed in under 2 hours. Deck left clean and ready for new use.",
    isBeforeAfter: true,
    beforeImage: "/images/optimized/gallery-hottub-before.webp",
    afterImage: "/images/optimized/gallery-hottub-after.webp"
  },
  {
    id: "demo-2",
    category: "demolition",
    title: "Shed Tear-Down",
    location: "Carol Stream, IL",
    description: "Rotted wooden shed demolished and hauled away. Area graded flat.",
    isBeforeAfter: true,
    beforeImage: "/images/optimized/gallery-shed-before.webp",
    afterImage: "/images/optimized/gallery-shed-after.webp"
  },
  {
    id: "demo-3",
    category: "demolition",
    title: "Kitchen Gut-Out",
    location: "Bloomingdale, IL",
    description: "Complete kitchen demo for renovation. Cabinets, flooring, and drywall removed.",
    isBeforeAfter: true,
    beforeImage: "/images/optimized/gallery-kitchen-before.webp",
    afterImage: "/images/optimized/gallery-kitchen-after.webp"
  },
  // Dumpster Rentals
  {
    id: "dumpster-1",
    category: "dumpsters",
    title: "Roofing Project",
    location: "Addison, IL",
    description: "20-yard dumpster for complete roof tear-off. Delivered same-day.",
    isBeforeAfter: true,
    beforeImage: "/images/optimized/gallery-roofing-project.webp",
    afterImage: "/images/optimized/gallery-roofing-complete.webp"
  },
  {
    id: "dumpster-2",
    category: "dumpsters",
    title: "Driveway Protection",
    location: "Hanover Park, IL",
    description: "Boards placed under wheels to protect decorative paver driveway.",
    isBeforeAfter: false,
    afterImage: "/images/optimized/gallery-driveway-protection.webp"
  },
  {
    id: "dumpster-3",
    category: "dumpsters",
    title: "Home Renovation",
    location: "Hoffman Estates, IL",
    description: "15-yard dumpster for bathroom and kitchen remodel debris.",
    isBeforeAfter: false,
    afterImage: "/images/optimized/gallery-home-renovation.webp"
  }
];

// Before/After comparison component with slider
function BeforeAfterSlider({ item }: { item: GalleryItem }) {
  const [sliderPosition, setSliderPosition] = useState(50);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSliderPosition(Number(e.target.value));
  };

  const hasRealImages = item.beforeImage && item.afterImage;

  return (
    <div className="slider-touch-zone relative h-64 w-full overflow-hidden rounded-t-xl">
      {/* After image/placeholder (background) */}
      <div className="absolute inset-0">
        {item.afterImage ? (
          <img
            src={item.afterImage}
            alt={`${item.title} - After`}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className={`flex h-full w-full items-center justify-center ${item.placeholderAfter || 'bg-green-100'}`}>
            <div className="text-center">
              <svg className="mx-auto h-12 w-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <p className="mt-2 text-sm font-medium text-green-700">After: Clean</p>
            </div>
          </div>
        )}
        <div className="absolute bottom-2 right-2 rounded bg-green-600 px-2 py-1 text-xs font-bold text-white shadow">
          AFTER
        </div>
      </div>

      {/* Before image/placeholder (clipped) */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ width: `${sliderPosition}%` }}
      >
        {item.beforeImage ? (
          <img
            src={item.beforeImage}
            alt={`${item.title} - Before`}
            className="h-full w-full object-cover"
            style={{ width: `${100 / (sliderPosition / 100)}%`, maxWidth: 'none' }}
          />
        ) : (
          <div
            className={`flex h-full items-center justify-center ${item.placeholderBefore || 'bg-red-100'}`}
            style={{ width: `${100 / (sliderPosition / 100)}%`, maxWidth: 'none' }}
          >
            <div className="text-center">
              <svg className="mx-auto h-12 w-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              <p className="mt-2 text-sm font-medium text-red-600">Before: Cluttered</p>
            </div>
          </div>
        )}
        <div className="absolute bottom-2 left-2 rounded bg-red-600 px-2 py-1 text-xs font-bold text-white shadow">
          BEFORE
        </div>
      </div>

      {/* Slider line */}
      <div
        className="absolute top-0 bottom-0 w-1 bg-white shadow-lg"
        style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
      >
        {/* Slider handle */}
        <div className="absolute top-1/2 left-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white bg-gray-900 shadow-lg">
          <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
          </svg>
        </div>
      </div>

      {/* Invisible range input for interaction */}
      <input
        type="range"
        min="5"
        max="95"
        value={sliderPosition}
        onChange={handleSliderChange}
        className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
        aria-label="Before/After comparison slider"
      />

      {/* Instruction overlay */}
      {!hasRealImages && (
        <div className="absolute top-2 left-1/2 -translate-x-1/2 rounded-full bg-black/50 px-3 py-1 text-xs text-white">
          Drag to compare
        </div>
      )}
    </div>
  );
}

// Single image card component
function ImageCard({ item }: { item: GalleryItem }) {
  return (
    <div className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg transition-shadow hover:shadow-xl">
      {/* Image or Before/After slider */}
      {item.isBeforeAfter ? (
        <BeforeAfterSlider item={item} />
      ) : (
        <div className="relative h-64 w-full overflow-hidden rounded-t-xl">
          {item.afterImage ? (
            <img
              src={item.afterImage}
              alt={item.title}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className={`flex h-full w-full items-center justify-center ${item.placeholderAfter || 'bg-gray-100'}`}>
              <div className="text-center">
                <svg className="mx-auto h-16 w-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="mt-2 text-sm text-gray-500">Photo coming soon</p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Content */}
      <div className="p-4">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-bold text-gray-900">{item.title}</h3>
            <p className="text-sm text-green-600">{item.location}</p>
          </div>
          {item.isBeforeAfter && (
            <span className="rounded-full bg-yellow-100 px-2 py-0.5 text-xs font-semibold text-yellow-800">
              Before/After
            </span>
          )}
        </div>
        <p className="mt-2 text-sm text-gray-600">{item.description}</p>
      </div>
    </div>
  );
}

// Main gallery component
export default function ProofGallery() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredItems = activeCategory === "all"
    ? galleryItems
    : galleryItems.filter(item => item.category === activeCategory);

  return (
    <section className="py-12">
      <div className="mx-auto max-w-6xl px-6">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">
            See the Proof
          </h2>
          <p className="mt-2 text-gray-600">
            Real projects. Real results. Drag the slider to compare before and after.
          </p>
          {/* Same-day conversion bridge */}
          <p className="mt-3 inline-flex items-center gap-2 rounded-full bg-green-50 px-4 py-2 text-sm font-medium text-green-700">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Most jobs shown here were completed same-day
          </p>
        </div>

        {/* Category tabs */}
        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                activeCategory === category.id
                  ? "bg-green-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Gallery grid */}
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredItems.map((item) => (
            <ImageCard key={item.id} item={item} />
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <p className="text-gray-600">
            Have a project like these? Get your free quote today.
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-3">
            <a
              href="tel:6307358700"
              className="rounded-xl bg-green-600 px-6 py-3 text-sm font-bold uppercase tracking-wide text-white shadow-lg hover:bg-green-700"
            >
              Call (630) 735-8700
            </a>
            <a
              href="sms:6307358700"
              className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-bold uppercase tracking-wide text-white shadow-lg hover:bg-blue-700"
            >
              Text Photos for Quote
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { brand } from "@/data/brand";

type FormData = {
  zipCode: string;
  city: string;
  state: string;
  projectType: string;
  dumpsterSize: string;
  name: string;
  email: string;
  phone: string;
  smsOptIn?: boolean;
  message?: string;
  honeypot: string;
};

// Smart dropdown organized by service type with specific use cases
const serviceOptions = [
  {
    group: "Junk Removal (We Load It)",
    options: [
      { value: "junk-furniture-appliances", label: "Junk Removal: Furniture / Appliances / General" },
      { value: "junk-garage-basement", label: "Junk Removal: Garage or Basement Cleanout" },
      { value: "junk-estate-cleanout", label: "Junk Removal: Estate or Whole-Home Cleanout" },
      { value: "junk-hoarding", label: "Junk Removal: Hoarding / Sensitive Cleanup" }
    ]
  },
  {
    group: "Demolition (We Tear It Down)",
    options: [
      { value: "demo-hot-tub", label: "Demolition: Hot Tub Removal" },
      { value: "demo-shed-deck-fence", label: "Demolition: Shed / Deck / Fence Removal" },
      { value: "demo-interior", label: "Demolition: Interior Tear-out (Kitchen/Bath)" }
    ]
  },
  {
    group: "Dumpster Rental (You Load It)",
    options: [
      { value: "dumpster-renovation", label: "Dumpster Rental: Home Renovation / Remodel" },
      { value: "dumpster-roofing", label: "Dumpster Rental: Roofing or Siding Project" },
      { value: "dumpster-concrete-yard", label: "Dumpster Rental: Concrete / Dirt / Yard Waste" }
    ]
  },
  {
    group: "Commercial",
    options: [
      { value: "commercial", label: "Commercial / Contractor Services" }
    ]
  }
];

// Dynamic size options based on service type
const junkRemovalSizes = [
  { value: "single-item", label: "Single Item / Minimum Load (Starts at $150)" },
  { value: "7-yard-truck", label: "7-Yard Dump Truck - Full Service ($399 Flat)" },
  { value: "half-truck", label: "1/2 Truck - Garage Cleanout (Volume Pricing)" },
  { value: "full-truck", label: "Full Truck - Large Cleanout (Volume Pricing)" }
];

const dumpsterRentalSizes = [
  { value: "10-yard", label: "10 Yard - Heavy debris (Concrete/Dirt) or 1 Room" },
  { value: "20-yard", label: "20 Yard - Large renovations, roofing, whole home (Best Value)" },
  { value: "15-yard", label: "15 Yard - Garage cleanout, decluttering" },
  { value: "rescue-combo", label: "THE RESCUE COMBO: 15-Yard Bin + Crew Labor ($999 Special)" }
];

const demolitionSizes = [
  { value: "hot-tub", label: "Standard Hot Tub Removal" },
  { value: "shed", label: "Standard Shed/Deck Tear-down" },
  { value: "consult", label: "Something else (We'll call to discuss)" }
];

// Commercial-specific options - contractors need different language
const commercialSizes = [
  { value: "20-yard-commercial", label: "20 Yard - Construction / Roofing Debris" },
  { value: "multi-load", label: "Multiple Dumpsters (Ongoing Project)" },
  { value: "live-load", label: "Live Load (We wait while you load)" },
  { value: "recurring", label: "Recurring Service (Weekly/Monthly)" }
];

// Visual volume/scope cards per service category
const volumeCardsByCategory: Record<string, { value: string; projectType: string; label: string; subtitle?: string; description: string; badge?: string }[]> = {
  junk: [
    { value: "single-item", projectType: "junk-furniture-appliances", label: "Single Item", description: "Couch, fridge, mattress, etc." },
    { value: "7-yard-truck", projectType: "junk-furniture-appliances", label: "Small Load", subtitle: "\u00BC Truck", description: "Think a few items and boxes" },
    { value: "half-truck", projectType: "junk-garage-basement", label: "Medium Load", subtitle: "\u00BD Truck", description: "Small garage or large room", badge: "Most Popular" },
    { value: "full-truck", projectType: "junk-estate-cleanout", label: "Full Truck", subtitle: "Max Capacity", description: "Whole basement or large renovation" },
    { value: "not-sure", projectType: "junk-furniture-appliances", label: "I'm Not Sure", description: "Just give me a ballpark" },
  ],
  dumpster: [
    { value: "10-yard", projectType: "dumpster-renovation", label: "10 Yard", subtitle: "Small", description: "1 room or heavy debris (concrete/dirt)" },
    { value: "15-yard", projectType: "dumpster-renovation", label: "15 Yard", subtitle: "Medium", description: "Garage cleanout or decluttering" },
    { value: "20-yard", projectType: "dumpster-renovation", label: "20 Yard", subtitle: "Large", description: "Full renovation, roofing, whole home", badge: "Best Value" },
    { value: "rescue-combo", projectType: "dumpster-renovation", label: "Rescue Combo", subtitle: "15-Yard + Crew", description: "Dumpster AND we load the first 7 yards" },
    { value: "not-sure", projectType: "dumpster-renovation", label: "I'm Not Sure", description: "Just give me a ballpark" },
  ],
  demolition: [
    { value: "hot-tub", projectType: "demo-hot-tub", label: "Hot Tub Removal", description: "Standard hot tub tear-out and haul", badge: "Most Requested" },
    { value: "shed", projectType: "demo-shed-deck-fence", label: "Shed / Deck / Fence", description: "Outdoor structure tear-down" },
    { value: "consult", projectType: "demo-interior", label: "Interior Tear-out", description: "Kitchen, bath, or room demo" },
    { value: "not-sure", projectType: "demo-shed-deck-fence", label: "Something Else", description: "We'll call to discuss your project" },
  ],
  commercial: [
    { value: "20-yard-commercial", projectType: "commercial", label: "Single Dumpster", description: "Construction or roofing debris", badge: "Most Common" },
    { value: "multi-load", projectType: "commercial", label: "Multiple Dumpsters", description: "Ongoing project, multiple hauls" },
    { value: "recurring", projectType: "commercial", label: "Recurring Service", description: "Weekly or monthly pickups" },
    { value: "live-load", projectType: "commercial", label: "Live Load", description: "We wait while you load" },
    { value: "not-sure", projectType: "commercial", label: "Not Sure Yet", description: "Let's discuss your needs" },
  ],
};

// Helper functions
const isJunkRemoval = (value: string) => value?.startsWith("junk-");
const isDumpsterRental = (value: string) => value?.startsWith("dumpster-");
const isDemolition = (value: string) => value?.startsWith("demo-");
const isCommercial = (value: string) => value === "commercial";

// Get the right size options based on service type
const getSizeOptions = (projectType: string) => {
  if (isJunkRemoval(projectType)) return junkRemovalSizes;
  if (isDumpsterRental(projectType)) return dumpsterRentalSizes;
  if (isDemolition(projectType)) return demolitionSizes;
  if (isCommercial(projectType)) return commercialSizes; // Contractors get pro options
  return [];
};

// Check if we need to show size selector
const needsSizeSelector = (projectType: string) => {
  return isJunkRemoval(projectType) || isDumpsterRental(projectType) || isDemolition(projectType) || isCommercial(projectType);
};

// Get size field label based on service type
const getSizeLabel = (projectType: string) => {
  if (isJunkRemoval(projectType)) return "Select your load size";
  if (isDumpsterRental(projectType)) return "Dumpster Size";
  if (isDemolition(projectType)) return "Project Details";
  if (isCommercial(projectType)) return "Service Type";
  return "Select option";
};

// Real verified testimonials - curated from Google reviews
const testimonials = [
  {
    quote: "Communication was very clear. They were incredibly efficient, professional, and very easy to work with.",
    name: "Laura Kolassa",
    location: "Bartlett, IL"
  },
  {
    quote: "I spoke to Frank the owner to just get general info. He was helpful and honest.",
    name: "Linda Cairns",
    location: "Local Neighbor"
  },
  {
    quote: "Got my quote in 15 minutes. Dumpster arrived next morning! Fair pricing, no surprises.",
    name: "Mike Thompson",
    location: "Naperville, IL"
  },
  {
    quote: "Couldn't be more satisfied. They handled everything professionally from start to finish.",
    name: "Laura K.",
    location: "Bartlett, IL"
  }
];

interface QuoteFormProps {
  cityName?: string;
  stateName?: string;
  className?: string;
  source?: string;
}

// Service category options for big button selector
type ServiceCategory = "junk" | "dumpster" | "demolition" | "commercial" | null;

export default function QuoteForm({
  cityName,
  stateName,
  className = "",
  source
}: QuoteFormProps) {
  const [step, setStep] = useState(1);
  const [serviceCategory, setServiceCategory] = useState<ServiceCategory>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [zipLookupLoading, setZipLookupLoading] = useState(false);
  const [zipValid, setZipValid] = useState(false);
  const [formLoadTime] = useState(Date.now());
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    trigger,
    formState: { errors }
  } = useForm<FormData>({
    defaultValues: {
      city: cityName || "",
      state: stateName || "",
      honeypot: ""
    }
  });

  const zipCode = watch("zipCode");
  const city = watch("city");
  const state = watch("state");
  const projectType = watch("projectType");
  const dumpsterSize = watch("dumpsterSize");

  // Reset project type when service category changes
  useEffect(() => {
    setValue("projectType", "");
    setValue("dumpsterSize", "");
  }, [serviceCategory, setValue]);

  // Get filtered service options based on selected category
  const getFilteredServices = () => {
    if (!serviceCategory) return serviceOptions;
    switch (serviceCategory) {
      case "junk":
        return serviceOptions.filter(g => g.group.includes("Junk Removal"));
      case "dumpster":
        return serviceOptions.filter(g => g.group.includes("Dumpster Rental"));
      case "demolition":
        return serviceOptions.filter(g => g.group.includes("Demolition"));
      case "commercial":
        return serviceOptions.filter(g => g.group.includes("Commercial"));
      default:
        return serviceOptions;
    }
  };

  // Rotate testimonials every 5 seconds on success screen
  useEffect(() => {
    if (!submitted) return;
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [submitted]);

  // Auto-advance Step 2 after card selection (300ms visual feedback delay)
  useEffect(() => {
    if (step === 2 && serviceCategory) {
      const timer = setTimeout(() => {
        setError(null);
        setStep(3);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [serviceCategory, step]);

  // Zip code lookup
  const lookupZip = async () => {
    if (!zipCode || zipCode.length !== 5) return;
    setZipLookupLoading(true);
    setZipValid(false);
    try {
      const res = await fetch(`https://api.zippopotam.us/us/${zipCode}`);
      if (res.ok) {
        const data = await res.json();
        if (data.places && data.places.length > 0) {
          setValue("city", data.places[0]["place name"]);
          setValue("state", data.places[0]["state abbreviation"]);
          setZipValid(true);
        }
      } else {
        setError("Invalid zip code. Please check and try again.");
      }
    } catch {
      // Silently fail, user can enter manually
    }
    setZipLookupLoading(false);
  };

  const nextStep = async () => {
    let fieldsToValidate: (keyof FormData)[] = [];
    if (step === 1) {
      fieldsToValidate = ["zipCode"];
      await lookupZip();
    } else if (step === 2) {
      // Step 2 is now the category selector - no validation needed, just check category selected
      if (!serviceCategory) {
        setError("Please select what type of service you need");
        return;
      }
    } else if (step === 3) {
      if (!dumpsterSize) {
        setError("Please select an option to continue");
        return;
      }
    }
    const valid = fieldsToValidate.length === 0 || await trigger(fieldsToValidate);
    if (valid) {
      setError(null);
      setStep((s) => s + 1);
    }
  };

  const prevStep = () => {
    setError(null);
    // Reset category when going back from step 2
    if (step === 3) {
      setServiceCategory(null);
    }
    setStep((s) => s - 1);
  };

  const onSubmit = async (data: FormData) => {
    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/send-form.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          zip: data.zipCode,
          zipCode: data.zipCode,
          city: data.city,
          state: data.state,
          projectType: data.projectType,
          service: data.projectType,
          dumpsterSize: data.dumpsterSize,
          name: data.name,
          email: data.email,
          phone: data.phone,
          smsOptIn: data.smsOptIn,
          message: data.message,
          source: source || window.location.pathname
        })
      });

      if (res.ok) {
        setSubmitted(true);
      } else {
        setError("Something went wrong. Please try again or call us directly.");
      }
    } catch {
      setError("Something went wrong. Please try again or call us directly.");
    }

    setSubmitting(false);
  };

  // Success state
  if (submitted) {
    const testimonial = testimonials[currentTestimonial];
    return (
      <div className={`rounded-lg border border-gray-200 bg-white shadow-lg ${className}`}>
        {/* Progress bar at 100% */}
        <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
          <div className="flex items-center justify-center gap-2">
            {[1, 2, 3, 4].map((s) => (
              <div
                key={s}
                className="h-2.5 flex-1 rounded-full bg-red-600 shadow-sm shadow-red-200"
              />
            ))}
          </div>
          <p className="mt-2 text-center text-xs font-semibold text-red-600">
            Complete!
          </p>
        </div>

        <div className="p-6 md:p-8">
          <div className="text-center">
            {/* Checkmark */}
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
              <svg className="h-8 w-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>

            <h3 className="mt-4 text-2xl font-bold text-gray-900">Request Received!</h3>
            <p className="mt-2 text-gray-600">
              We&apos;re on it. Expect a text or call within 2-3 minutes.
            </p>

            {/* Phone nearby reminder */}
            <div className="mt-3 flex items-center justify-center gap-2 text-sm text-red-600">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span className="font-medium">Keep your phone nearby!</span>
            </div>

            {/* Text a Photo CTA - faster pricing option */}
            <div className="mt-6 rounded-lg border-2 border-dashed border-yellow-400 bg-yellow-50 p-4">
              <p className="text-sm font-bold text-gray-900">Want a faster price?</p>
              <p className="mt-1 text-sm text-gray-600">
                Skip the wait &mdash; text a photo of your junk and get a price in minutes.
              </p>
              <a
                href={brand.smsHref}
                className="mt-3 inline-flex items-center gap-2 rounded-lg bg-red-600 px-5 py-3 text-sm font-bold uppercase tracking-wide text-white shadow-lg hover:bg-red-700"
              >
                <svg className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Text a Photo to {brand.phone}
              </a>
            </div>

            {/* What happens next */}
            <div className="mt-6 text-left">
              <h4 className="font-bold text-gray-900">What Happens Next</h4>
              <div className="mt-4 space-y-4">
                <div className="flex gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-red-600 text-sm font-bold text-white">
                    1
                  </div>
                  <p className="text-sm text-gray-700">
                    We&apos;re reviewing your project details and calculating your quote
                  </p>
                </div>
                <div className="flex gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-red-600 text-sm font-bold text-white">
                    2
                  </div>
                  <p className="text-sm text-gray-700">
                    A team member will text or call you within 2-3 minutes during business hours
                  </p>
                </div>
                <div className="flex gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-red-600 text-sm font-bold text-white">
                    3
                  </div>
                  <p className="text-sm text-gray-700">
                    Schedule your pickup &mdash; often available same-day or next-day
                  </p>
                </div>
              </div>
            </div>

            {/* Phone CTA */}
            <div className="mt-6 rounded-lg bg-gray-50 p-4">
              <p className="text-sm font-semibold text-gray-900">Prefer to talk? Call us now:</p>
              <a
                href={brand.phoneHref}
                className="mt-2 inline-block rounded-lg border-2 border-red-600 px-6 py-3 text-sm font-bold uppercase tracking-wide text-red-600 hover:bg-red-600 hover:text-white"
              >
                Call {brand.phone}
              </a>
            </div>

            {/* Rotating testimonial */}
            <div className="mt-6 rounded-lg border border-gray-200 bg-gray-50 p-4">
              <p className="text-sm italic text-gray-700">&ldquo;{testimonial.quote}&rdquo;</p>
              <p className="mt-2 text-xs font-semibold text-gray-600">
                - {testimonial.name}, {testimonial.location}
              </p>
            </div>

            {/* Social proof */}
            <div className="mt-4 flex items-center justify-center gap-1">
              <div className="flex text-yellow-400">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
              </div>
              <span className="text-xs text-gray-600">Rated 5.0/5 by 66 Customers</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`rounded-lg border border-gray-200 bg-white shadow-lg ${className}`}>
      {/* Progress indicator - vibrant 4-step visual */}
      <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
        <div className="flex items-center justify-center gap-2">
          {[1, 2, 3, 4].map((s) => (
            <div
              key={s}
              className={`h-2.5 flex-1 rounded-full transition-all duration-300 ${
                step >= s ? "bg-red-600 shadow-sm shadow-red-200" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
        <p className="mt-2 text-center text-xs font-semibold text-gray-700">
          Step {step} of 4: {step === 1 ? "Your Area" : step === 2 ? "Service Type" : step === 3 ? "Project Details" : "Almost Done!"}
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="p-6 md:p-8">
        {/* Honeypot - hidden spam trap */}
        <input
          type="text"
          {...register("honeypot")}
          className="absolute -left-[9999px] h-0 w-0 opacity-0"
          tabIndex={-1}
          autoComplete="off"
        />

        {/* Error message */}
        {error && (
          <div className="mb-4 rounded-lg bg-red-50 p-4 text-sm text-red-700">
            {error}
          </div>
        )}

        {/* Step 1: Location */}
        {step === 1 && (
          <div className="space-y-4">
            <div>
              <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700">
                Where should we come? <span className="text-red-500">*</span>
              </label>
              <div className="mt-1 flex gap-2">
                <input
                  type="text"
                  id="zipCode"
                  maxLength={5}
                  {...register("zipCode", {
                    required: "Zip code is required",
                    pattern: {
                      value: /^\d{5}$/,
                      message: "Please enter a valid 5-digit zip code"
                    }
                  })}
                  className="block w-full rounded-lg border border-gray-300 px-4 py-3 text-sm shadow-sm focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
                  placeholder="60103"
                />
                {zipLookupLoading && (
                  <div className="flex items-center">
                    <svg className="h-5 w-5 animate-spin text-red-600" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                  </div>
                )}
              </div>
              {errors.zipCode && (
                <p className="mt-1 text-xs text-red-600">{errors.zipCode.message}</p>
              )}
              {/* ZIP reassurance microcopy */}
              <p className="mt-1.5 text-xs text-gray-500">
                We only use your ZIP to check availability — no spam.
              </p>
            </div>

            {/* City/State display */}
            {zipValid && city && state && (
              <div className="flex items-center gap-2 rounded-lg bg-red-50 p-3">
                <svg className="h-5 w-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-sm font-medium text-red-700">
                  {city}, {state}
                </span>
              </div>
            )}

            <button
              type="button"
              onClick={nextStep}
              className="w-full rounded-lg bg-red-600 px-6 py-4 text-sm font-bold uppercase tracking-wide text-white shadow-lg hover:bg-red-700"
            >
              Get My Instant Quote
            </button>
          </div>
        )}

        {/* Step 2: Big Button Service Category Selector */}
        {step === 2 && (
          <div className="space-y-4 pb-20 md:pb-0">
            <p className="text-center text-sm text-gray-600">
              What do you need help with?
            </p>

            <div className="grid gap-3">
              {/* Junk Removal - Primary option with "Most Popular" badge */}
              <button
                type="button"
                onClick={() => setServiceCategory("junk")}
                className={`relative flex items-center gap-4 rounded-lg border-2 p-4 text-left transition-all ${
                  serviceCategory === "junk"
                    ? "border-red-600 bg-red-50 ring-2 ring-red-200"
                    : "border-red-300 bg-red-50/30 hover:border-red-400 hover:bg-red-50"
                }`}
              >
                {/* Most Popular badge */}
                <span className="absolute -top-2 right-3 rounded-full bg-red-600 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">
                  Most Popular
                </span>
                <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full ${
                  serviceCategory === "junk" ? "bg-red-600 text-white" : "bg-red-100 text-red-600"
                }`}>
                  <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                  </svg>
                </div>
                <div>
                  <p className="font-bold text-gray-900">I want you to remove it</p>
                  <p className="text-sm text-gray-500">Full-service junk removal - we load &amp; haul</p>
                </div>
                {serviceCategory === "junk" && (
                  <svg className="ml-auto h-6 w-6 shrink-0 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </button>

              {/* Dumpster Rental */}
              <button
                type="button"
                onClick={() => setServiceCategory("dumpster")}
                className={`flex items-center gap-4 rounded-lg border-2 p-4 text-left transition-all ${
                  serviceCategory === "dumpster"
                    ? "border-blue-600 bg-blue-50 ring-2 ring-blue-200"
                    : "border-gray-200 hover:border-blue-300 hover:bg-gray-50"
                }`}
              >
                <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${
                  serviceCategory === "dumpster" ? "bg-blue-600 text-white" : "bg-blue-100 text-blue-600"
                }`}>
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
                <div>
                  <p className="font-bold text-gray-900">I want a dumpster</p>
                  <p className="text-sm text-gray-500">We drop it off, you fill it, we pick it up</p>
                </div>
                {serviceCategory === "dumpster" && (
                  <svg className="ml-auto h-6 w-6 shrink-0 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </button>

              {/* Demolition */}
              <button
                type="button"
                onClick={() => setServiceCategory("demolition")}
                className={`flex items-center gap-4 rounded-lg border-2 p-4 text-left transition-all ${
                  serviceCategory === "demolition"
                    ? "border-orange-600 bg-orange-50 ring-2 ring-orange-200"
                    : "border-gray-200 hover:border-orange-300 hover:bg-gray-50"
                }`}
              >
                <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${
                  serviceCategory === "demolition" ? "bg-orange-600 text-white" : "bg-orange-100 text-orange-600"
                }`}>
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </div>
                <div>
                  <p className="font-bold text-gray-900">I need demolition</p>
                  <p className="text-sm text-gray-500">Hot tub, shed, deck, fence, interior tear-out</p>
                </div>
                {serviceCategory === "demolition" && (
                  <svg className="ml-auto h-6 w-6 shrink-0 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </button>

              {/* Commercial - updated copy for contractors */}
              <button
                type="button"
                onClick={() => setServiceCategory("commercial")}
                className={`flex items-center gap-4 rounded-lg border-2 p-4 text-left transition-all ${
                  serviceCategory === "commercial"
                    ? "border-purple-600 bg-purple-50 ring-2 ring-purple-200"
                    : "border-gray-200 hover:border-purple-300 hover:bg-gray-50"
                }`}
              >
                <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${
                  serviceCategory === "commercial" ? "bg-purple-600 text-white" : "bg-purple-100 text-purple-600"
                }`}>
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <div>
                  <p className="font-bold text-gray-900">Commercial / Contractor</p>
                  <p className="text-sm text-gray-500">Volume pricing, priority scheduling, recurring service</p>
                </div>
                {serviceCategory === "commercial" && (
                  <svg className="ml-auto h-6 w-6 shrink-0 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </button>
            </div>

            {/* Anxiety relief text */}
            <p className="text-center text-xs text-gray-500">
              Not sure which to choose? Pick the closest option — we&apos;ll guide you.
            </p>

            <button
              type="button"
              onClick={prevStep}
              className="w-full rounded-lg border border-gray-300 bg-white px-6 py-3 text-sm font-bold uppercase tracking-wide text-gray-700 shadow hover:bg-gray-50"
            >
              Back
            </button>
          </div>
        )}

        {/* Step 3: Project Scope (Visual Cards) */}
        {step === 3 && (
          <div className="space-y-4 pb-20 md:pb-0">
            <p className="text-center text-sm font-medium text-gray-700">
              {serviceCategory === "junk" ? "How much stuff are we rescuing?" :
               serviceCategory === "dumpster" ? "What size dumpster do you need?" :
               serviceCategory === "demolition" ? "What are we tearing down?" :
               serviceCategory === "commercial" ? "What does your project need?" :
               "Tell us about your project"}
            </p>

            {/* Hidden inputs to keep form data for submission */}
            <input type="hidden" {...register("projectType")} />
            <input type="hidden" {...register("dumpsterSize")} />

            <div className="grid gap-3">
              {(volumeCardsByCategory[serviceCategory || "junk"] || []).map((card) => (
                <button
                  key={card.value}
                  type="button"
                  onClick={() => {
                    setValue("dumpsterSize", card.value);
                    setValue("projectType", card.projectType);
                  }}
                  className={`relative flex items-center gap-3 rounded-lg border-2 p-4 text-left transition-all ${
                    dumpsterSize === card.value
                      ? "border-red-600 bg-red-50 ring-2 ring-red-200"
                      : card.value === "not-sure"
                      ? "border-dashed border-gray-300 hover:border-gray-400 hover:bg-gray-50"
                      : card.badge
                      ? "border-red-200 bg-red-50/30 hover:border-red-300 hover:bg-red-50"
                      : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  {card.badge && (
                    <span className="absolute -top-2 right-3 rounded-full bg-red-600 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">
                      {card.badge}
                    </span>
                  )}
                  <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-sm font-bold ${
                    dumpsterSize === card.value ? "bg-red-600 text-white" : "bg-gray-100 text-gray-500"
                  }`}>
                    {card.value === "not-sure" ? (
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    ) : card.subtitle ? (
                      <span>{card.subtitle}</span>
                    ) : (
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                      </svg>
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-bold text-gray-900">{card.label}</p>
                    <p className="text-sm text-gray-500">{card.description}</p>
                  </div>
                  {dumpsterSize === card.value && (
                    <svg className="h-6 w-6 shrink-0 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </button>
              ))}
            </div>

            {/* Deal highlights */}
            {dumpsterSize === "7-yard-truck" && (
              <div className="rounded-lg border border-red-200 bg-red-50 p-3">
                <p className="text-sm text-red-800">
                  <strong>$399 Flat Rate Deal:</strong> Our 7-yard dump truck holds about as much as a standard pickup bed. One flat price, no hidden fees.
                </p>
              </div>
            )}

            {dumpsterSize === "rescue-combo" && (
              <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-3">
                <p className="text-sm text-yellow-800">
                  <strong>THE RESCUE COMBO:</strong> 15-Yard Dumpster AND our crew loads the first 7 yards for you. Extra muscle on day one.
                </p>
              </div>
            )}

            {/* Demolition: Text a photo prompt - pricing varies by material */}
            {serviceCategory === "demolition" && (
              <div className="flex items-center gap-3 rounded-lg border border-blue-200 bg-blue-50 p-3">
                <svg className="h-5 w-5 shrink-0 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <p className="text-sm text-blue-800">
                  <strong>Tip:</strong> Demo pricing varies by material. <a href={brand.smsHref} className="font-bold underline">Text us a photo</a> for the most accurate quote.
                </p>
              </div>
            )}

            {/* Reassurance micro-copy */}
            <p className="text-center text-xs text-gray-500">
              Don&apos;t worry, your final price is confirmed on-site before we touch a thing!
            </p>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={prevStep}
                className="flex-1 rounded-lg border border-gray-300 bg-white px-6 py-4 text-sm font-bold uppercase tracking-wide text-gray-700 shadow hover:bg-gray-50"
              >
                Back
              </button>
              <button
                type="button"
                onClick={nextStep}
                disabled={!dumpsterSize}
                className="flex-1 rounded-lg bg-red-600 px-6 py-4 text-sm font-bold uppercase tracking-wide text-white shadow-lg hover:bg-red-700 disabled:opacity-50"
              >
                ALMOST THERE &rarr;
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Contact Info */}
        {step === 4 && (
          <div className="space-y-4 pb-20 md:pb-0">
            <p className="text-sm font-medium text-gray-700">
              Where should we send your free quote?
            </p>

            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                First Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                {...register("name", {
                  required: "Name is required",
                  minLength: { value: 2, message: "Name must be at least 2 characters" }
                })}
                className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-3 text-sm shadow-sm focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
                placeholder="John"
              />
              {errors.name && (
                <p className="mt-1 text-xs text-red-600">{errors.name.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                id="phone"
                {...register("phone", {
                  required: "Phone number is required",
                  pattern: {
                    value: /^[\d\s\-\(\)]+$/,
                    message: "Please enter a valid phone number"
                  }
                })}
                className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-3 text-sm shadow-sm focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
                placeholder="(630) 555-1234"
              />
              {errors.phone && (
                <p className="mt-1 text-xs text-red-600">{errors.phone.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Please enter a valid email address"
                  }
                })}
                className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-3 text-sm shadow-sm focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
                placeholder="john@example.com"
              />
              {errors.email && (
                <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>
              )}
            </div>

            {/* SMS opt-in checkbox */}
            <label className="flex cursor-pointer items-start gap-2.5">
              <input
                type="checkbox"
                {...register("smsOptIn")}
                defaultChecked={true}
                className="mt-0.5 h-4 w-4 rounded border-gray-300 text-red-600 focus:ring-red-500"
              />
              <span className="text-sm text-gray-600">
                Text me my quote <span className="text-xs text-gray-400">(Recommended &mdash; fastest response)</span>
              </span>
            </label>

            {/* Trust Box */}
            <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
              <div className="space-y-2.5">
                <div className="flex items-center gap-2">
                  <svg className="h-4 w-4 shrink-0 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <span className="text-sm text-gray-700"><strong>Fast:</strong> Expect a text/call within 2-3 minutes</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="h-4 w-4 shrink-0 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm text-gray-700"><strong>Free:</strong> No credit card required. Zero obligation.</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="h-4 w-4 shrink-0 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <span className="text-sm text-gray-700"><strong>Safe:</strong> We hate spam too. Your info stays with us.</span>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={prevStep}
                className="flex-1 rounded-lg border border-gray-300 bg-white px-6 py-4 text-sm font-bold uppercase tracking-wide text-gray-700 shadow hover:bg-gray-50"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="flex-1 rounded-lg bg-red-600 px-6 py-4 text-sm font-bold uppercase tracking-wide text-white shadow-lg hover:bg-red-700 disabled:opacity-50"
              >
                {submitting ? "Sending..." : "GET MY SAME-DAY QUOTE"}
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}

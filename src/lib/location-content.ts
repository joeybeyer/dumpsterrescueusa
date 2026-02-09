import { brand } from "@/data/brand";
const { locationDetails } = require("../data/location-details");

const defaultDumpsters = ["10-yard", "15-yard", "20-yard", "30-yard"];
const defaultHauling = [
  "household junk",
  "renovation debris",
  "garage cleanouts",
  "yard waste"
];

const priorityJobs = [
  "basement cleanouts",
  "garage cleanouts",
  "deck removal",
  "shed demo",
  "estate cleanouts"
];

const cityFaqs = (city: string) => [
  {
    question: `Do you offer same-day junk removal in ${city}?`,
    answer:
      "Yes! Same-day junk removal is often available when you call early. We dispatch local crews from Bartlett to serve the area quickly."
  },
  {
    question: `What types of junk do you remove in ${city}?`,
    answer:
      "We remove furniture, appliances, mattresses, yard waste, construction debris, garage clutter, basement junk, and estate cleanout items. If you're unsure, text us a photo for a quick answer."
  },
  {
    question: `How much does junk removal cost in ${city}?`,
    answer:
      "Pricing depends on volume and weight. We provide upfront quotes before any work begins—no surprises. Most single-item pickups start around $75-150, while full cleanouts vary by scope."
  },
  {
    question: `Do I need to move items outside before you arrive?`,
    answer:
      "No. Our crew handles all the heavy lifting from inside your home, garage, or basement. Just point to what goes."
  },
  {
    question: `Do you serve contractors in ${city}?`,
    answer:
      "Yes. We work with contractors and property managers for ongoing debris removal, renovation cleanouts, and scheduled pickups."
  },
  {
    question: `Do you also offer demolition services?`,
    answer:
      "Yes. We handle light demolition including hot tub removal, shed tear-down, deck removal, and fence demolition. Debris hauling is always included."
  },
  {
    question: `Where are you based?`,
    answer: `We operate from ${brand.primaryLocation.city}, IL with a service office in ${brand.secondaryLocation.city}. Our crews serve all of ${city} and surrounding areas.`
  }
];

export const buildCityContent = (city: string, slug?: string) => {
  const override = slug ? locationDetails?.[slug] || {} : {};

  return {
    landmarks:
      override.landmarks?.length > 0
        ? override.landmarks
        : [`Downtown ${city}`, `${city} community parks`, `${city} retail corridors`],
    neighborhoods:
      override.neighborhoods?.length > 0
        ? override.neighborhoods
        : [`${city} Estates`, `${city} Crossing`, `${city} Heights`],
    weather:
      override.weather?.length > 0
        ? override.weather
        : "Four-season Midwest weather with spring and fall cleanup demand.",
    housing:
      override.housing?.length > 0
        ? override.housing
        : "A mix of single-family homes, townhomes, and local businesses.",
    dumpsters:
      override.dumpsters?.length > 0 ? override.dumpsters : defaultDumpsters,
    hauling:
      override.hauling?.length > 0 ? override.hauling : defaultHauling,
    permits:
      override.permits?.length > 0
        ? override.permits
        : "Street placement may require a city permit. We provide permit guidance before delivery.",
    serviceRadius: `Serving ${city} from ${brand.primaryLocation.city}, IL and our ${brand.secondaryLocation.city} service office within the Chicagoland suburbs.`,
    faqs: cityFaqs(city),
    popularJobs:
      override.popularJobs?.length > 0 ? override.popularJobs : priorityJobs,
    priorityIntro:
      override.priorityIntro?.length > 0
        ? override.priorityIntro
        : `We keep priority crews ready for ${city} cleanouts, remodel debris, and time-sensitive haul-aways.`,
    priorityTestimonial:
      override.priorityTestimonial?.length > 0
        ? override.priorityTestimonial
        : `Reliable, fast response in ${city} with clear pricing and clean job sites.`,
    heroH1:
      override.heroH1?.length > 0
        ? override.heroH1
        : `Junk Removal & Demolition in ${city}, IL`,
    heroSub:
      override.heroSub?.length > 0
        ? override.heroSub
        : `Fast-response junk removal and light demolition for homes, rentals, and contractors in ${city}.`,
    trustLine:
      override.trustLine?.length > 0
        ? override.trustLine
        : "Family-owned - Licensed & insured - Real local crew",
    ctaLabel:
      override.ctaLabel?.length > 0
        ? override.ctaLabel
        : "Schedule Same-Day Pickup",
    phoneLine:
      override.phoneLine?.length > 0
        ? override.phoneLine
        : `Call or Text ${brand.phone}`,
    heroBullets:
      override.heroBullets?.length > 0
        ? override.heroBullets
        : [
            "Same-day service when available",
            "We handle heavy and messy jobs",
            "Clean, professional crews"
          ],
    aiSummary:
      override.aiSummary?.length > 0
        ? override.aiSummary
        : `Dumpster Rescue LLC provides fast junk removal and light demolition in ${city}, Illinois with same-day availability and upfront pricing.`,
    mapEmbed:
      override.mapEmbed?.length > 0
        ? override.mapEmbed
        : ""
  };
};


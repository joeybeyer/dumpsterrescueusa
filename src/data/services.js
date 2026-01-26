const services = [
  {
    slug: "junk-removal",
    name: "Junk Removal",
    description:
      "Full-service junk removal for homes, rentals, and jobsites across Chicagoland.",
    category: "Core",
    image: "/images/optimized/service-junk-removal.webp",
    keyTakeaways: [
      "Same-day junk removal when available",
      "On-site loading included",
      "Clear pricing before we start",
      "Clean, professional crews from Bartlett",
      "Service across DuPage, Kane, and Cook"
    ],
    faqs: [
      {
        question: "How fast can you arrive?",
        answer:
          "Same-day appointments are often available depending on crew schedules."
      },
      {
        question: "Do you handle heavy items?",
        answer:
          "Yes. We remove appliances, furniture, and bulky debris."
      },
      {
        question: "Do I need to move items outside?",
        answer:
          "No. Our team handles lifting and hauling from inside the property."
      },
      {
        question: "Can you service rentals and commercial sites?",
        answer:
          "Yes. We work with landlords, property managers, and contractors."
      },
      {
        question: "What areas do you serve?",
        answer:
          "We serve Chicagoland suburbs across DuPage, Kane, and Cook counties."
      }
    ]
  },
  {
    slug: "demolition",
    name: "Demolition",
    description:
      "Light demolition services for decks, sheds, hot tubs, and interior tear-outs.",
    category: "Core",
    image: "/images/optimized/service-demolition.webp",
    keyTakeaways: [
      "Controlled, clean demo work",
      "Debris hauling included",
      "Permit-aware planning",
      "Fast scheduling from Bartlett",
      "Trusted by homeowners and contractors"
    ],
    faqs: [
      {
        question: "What types of demo do you handle?",
        answer:
          "Decks, sheds, hot tubs, and interior tear-outs are our most common projects."
      },
      {
        question: "Do you remove debris?",
        answer:
          "Yes. Hauling and disposal are included in every demo project."
      },
      {
        question: "Can you help with permits?",
        answer:
          "We can confirm local requirements and guide you on permits."
      },
      {
        question: "Do you handle commercial demo?",
        answer:
          "Light commercial demo is available based on scope and access."
      },
      {
        question: "What areas do you serve?",
        answer:
          "We serve DuPage, Kane, and Cook counties from Bartlett, IL."
      }
    ]
  },
  {
    slug: "dumpster-rental",
    name: "Dumpster Rental",
    description:
      "Driveway-safe roll-off dumpster rentals for cleanouts, remodels, and construction.",
    category: "Core",
    image: "/images/optimized/dumpster-20-yard.webp",
    keyTakeaways: [
      "10, 15, 20, and 30 yard dumpsters",
      "Same-day delivery when available",
      "Flat-rate pricing with clear terms",
      "Permit guidance for street placement",
      "Local crew based in Bartlett"
    ],
    faqs: [
      {
        question: "What sizes do you offer?",
        answer:
          "We offer 10, 15, 20, and 30 yard roll-off dumpsters."
      },
      {
        question: "Do I need a permit?",
        answer:
          "Permits are typically required for street placement. We can guide you."
      },
      {
        question: "How long is the rental period?",
        answer:
          "Most rentals include a 7-day window with extensions available."
      },
      {
        question: "Do you protect driveways?",
        answer:
          "Yes. We use boards and careful placement to protect surfaces."
      },
      {
        question: "What areas do you serve?",
        answer:
          "We deliver across DuPage, Kane, and Cook counties."
      }
    ]
  },
  {
    slug: "full-service-junk-removal",
    name: "Full Service Junk Removal",
    description:
      "Hands-on removal with sorting, loading, and hauling included.",
    category: "Junk Removal",
    image: "/images/optimized/service-junk-removal.webp",
    keyTakeaways: [
      "Full labor included",
      "Room-by-room removal",
      "Donation and recycling pathways",
      "Fast scheduling across Chicagoland",
      "Transparent pricing"
    ],
    faqs: [
      {
        question: "Do you sort items for donation?",
        answer:
          "Yes. We separate usable items when possible."
      }
    ]
  },
  {
    slug: "estate-cleanout",
    name: "Estate Cleanout",
    description:
      "Estate cleanouts with careful sorting, hauling, and timeline support.",
    category: "Junk Removal",
    image: "/images/optimized/service-estate-cleanout.webp",
    keyTakeaways: [
      "Room-by-room planning",
      "Donation-friendly sorting",
      "Fast scheduling for real estate timelines",
      "Discreet, professional crews",
      "Bartlett-based operations"
    ],
    faqs: [
      {
        question: "Can you work with realtors?",
        answer:
          "Yes. We coordinate with realtors and estate managers."
      }
    ]
  },
  {
    slug: "garage-cleanout",
    name: "Garage Cleanout",
    description:
      "Garage cleanouts with fast removal, hauling, and tidy finishes.",
    category: "Junk Removal",
    image: "/images/optimized/garage-after.webp",
    keyTakeaways: [
      "Fast garage cleanouts",
      "Labor included for heavy lifting",
      "Clear pricing before we start",
      "Same-day options when available",
      "Local Bartlett crew"
    ],
    faqs: [
      {
        question: "Do I need to prep the garage?",
        answer:
          "No. We can sort and remove items directly from the garage."
      }
    ]
  },
  {
    slug: "hoarder-cleaning-service",
    name: "Hoarder Cleaning Service",
    description:
      "Sensitive, staged cleanouts for hoarding situations with respectful crews.",
    category: "Junk Removal",
    image: "/images/optimized/service-junk-removal.webp",
    keyTakeaways: [
      "Staged cleanout plans",
      "Discreet, respectful crews",
      "Hauling and disposal included",
      "Flexible scheduling",
      "Local, trusted team"
    ],
    faqs: [
      {
        question: "Can you schedule multiple visits?",
        answer:
          "Yes. We can break large cleanouts into stages."
      }
    ]
  },
  {
    slug: "house-clean-out",
    name: "House Clean Out",
    description:
      "Whole-home cleanouts for move-outs, estates, and property turnovers.",
    category: "Junk Removal",
    image: "/images/optimized/service-estate-cleanout.webp",
    keyTakeaways: [
      "Room-by-room cleanouts",
      "Labor included",
      "Fast scheduling",
      "Clear pricing before we start",
      "Local Bartlett crew"
    ],
    faqs: [
      {
        question: "Do you remove items from basements and attics?",
        answer:
          "Yes. We handle multi-level cleanouts with stairs and tight access."
      }
    ]
  },
  {
    slug: "same-day-junk-removal",
    name: "Same Day Junk Removal",
    description:
      "Rapid-response hauling for urgent cleanouts and overflow debris.",
    category: "Junk Removal",
    image: "/images/optimized/social-same-day.webp",
    keyTakeaways: [
      "Same-day service when available",
      "Priority scheduling",
      "Clear estimates",
      "Fast arrival windows",
      "Professional crews"
    ],
    faqs: [
      {
        question: "How soon can you arrive?",
        answer:
          "Call early for same-day availability in the suburbs."
      }
    ]
  },
  {
    slug: "heavy-item-pickup",
    name: "Heavy Item Pickup",
    description:
      "Pickup and haul-away for bulky, heavy items and oversized debris.",
    category: "Junk Removal",
    image: "/images/optimized/hero-team-working.webp",
    keyTakeaways: [
      "Appliances and bulky items",
      "Safe lifting and loading",
      "On-site labor included",
      "Fast scheduling",
      "Local disposal compliance"
    ],
    faqs: [
      {
        question: "Do you remove appliances?",
        answer:
          "Yes. We remove appliances and other heavy items."
      }
    ]
  },
  {
    slug: "appliance-removal",
    name: "Appliance Removal",
    description:
      "Washer, dryer, refrigerator, and appliance removal with proper hauling.",
    category: "Junk Removal",
    image: "/images/optimized/hero-team-working.webp",
    keyTakeaways: [
      "Appliance haul-away and disposal",
      "Safe lifting and loading",
      "Fast scheduling",
      "Clear, upfront pricing",
      "Local compliance for disposal"
    ],
    faqs: [
      {
        question: "Do you disconnect appliances?",
        answer:
          "We can assist if disconnects are accessible and safe, but licensed help may be required."
      }
    ]
  },
  {
    slug: "trash-haulers",
    name: "Trash Haulers",
    description:
      "Reliable hauling for renovation debris, household trash, and cleanouts.",
    category: "Junk Removal",
    image: "/images/optimized/hero-truck-driveway.webp",
    keyTakeaways: [
      "Flexible haul-away scheduling",
      "Clear pricing before we load",
      "Licensed disposal routes",
      "Local Bartlett team",
      "Residential and contractor support"
    ],
    faqs: [
      {
        question: "Do you haul construction debris?",
        answer:
          "Yes. We haul construction debris and renovation waste."
      }
    ]
  },
  {
    slug: "shed-removal",
    name: "Shed Demolition",
    description:
      "Shed demolition and haul-away with full site cleanup.",
    category: "Demolition",
    image: "/images/optimized/service-demolition.webp",
    keyTakeaways: [
      "Safe shed demolition",
      "Debris removal included",
      "Fast scheduling",
      "Permit-aware planning",
      "Local crews"
    ],
    faqs: [
      {
        question: "Do you remove shed foundations?",
        answer:
          "We remove small slab foundations when accessible."
      }
    ]
  },
  {
    slug: "hot-tub-removal",
    name: "Hot Tub Removal",
    description:
      "Hot tub demo, removal, and disposal handled by our crew.",
    category: "Demolition",
    image: "/images/optimized/service-demolition.webp",
    keyTakeaways: [
      "Full tear-out and hauling",
      "Site cleanup included",
      "Fast scheduling",
      "Permit-aware guidance",
      "Professional crews"
    ],
    faqs: [
      {
        question: "Do you disconnect electrical?",
        answer:
          "Electrical disconnects should be handled by a licensed electrician."
      }
    ]
  },
  {
    slug: "construction-removal",
    name: "Construction Debris Removal",
    description:
      "Hauling for construction debris, remodel waste, and jobsite cleanup.",
    category: "Demolition",
    image: "/images/optimized/dumpster-30-yard.webp",
    keyTakeaways: [
      "Jobsite debris hauling",
      "Flexible pickup windows",
      "Flat-rate pricing options",
      "Local compliance",
      "Contractor-friendly scheduling"
    ],
    faqs: [
      {
        question: "Do you support contractor schedules?",
        answer:
          "Yes. We coordinate pickups around contractor timelines."
      }
    ]
  }
];

module.exports = { services };

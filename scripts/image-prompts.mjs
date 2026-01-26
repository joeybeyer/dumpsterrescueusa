/**
 * kie.ai Image Generation Prompt Templates
 * Using nanobanana pro model for high-quality junk removal & dumpster rental images
 *
 * Prompt structure for best results:
 * - Be specific about subject, setting, lighting, and style
 * - Include brand colors (green trucks, professional uniforms)
 * - Specify Chicagoland/suburban setting when relevant
 * - Add "photorealistic" or "professional photography" for realistic outputs
 */

// Brand color references for consistent imagery
export const brandColors = {
  primary: "forest green",
  accent: "white",
  truckColor: "dark green with white lettering",
};

// Hero section images
export const heroPrompts = {
  crewPhoto: {
    name: "hero-crew",
    prompt: `Professional photography of a junk removal crew of 3 workers standing in front of a large green dump truck in a suburban driveway. Workers wearing green company t-shirts and work gloves, smiling at camera, giving thumbs up. Clean residential neighborhood in Chicagoland suburbs, sunny day, professional and friendly atmosphere. Photorealistic, high resolution, commercial photography style.`,
    aspectRatio: "16:9",
    useCase: "Homepage hero section",
  },
  truckDriveway: {
    name: "hero-truck-driveway",
    prompt: `Professional photography of a green roll-off dumpster truck backing into a suburban residential driveway in Illinois. Clean, well-maintained truck with professional appearance. Typical Chicagoland neighborhood with green lawns and mature trees. Morning light, photorealistic, commercial photography quality.`,
    aspectRatio: "16:9",
    useCase: "Homepage hero alternate",
  },
  teamAtWork: {
    name: "hero-team-working",
    prompt: `Professional photography of junk removal workers loading furniture and household items into a green dump truck. Workers in green company shirts, professional work gloves, working efficiently in a suburban garage. Clean operation, organized process. Chicagoland suburb setting. Photorealistic, editorial photography style.`,
    aspectRatio: "16:9",
    useCase: "Homepage hero action shot",
  },
};

// Before/After images for testimonials and case studies
export const beforeAfterPrompts = {
  garageCleanout: {
    before: {
      name: "garage-before",
      prompt: `Photography of a cluttered suburban garage filled with old furniture, boxes, broken appliances, yard equipment, and miscellaneous junk piled high. Disorganized, overwhelming amount of items. Typical Chicagoland home garage interior. Natural lighting from open garage door. Photorealistic.`,
      aspectRatio: "4:3",
    },
    after: {
      name: "garage-after",
      prompt: `Photography of a clean, empty suburban garage after professional cleanout. Swept concrete floor, organized walls, plenty of space for parking. Same garage now completely cleared of all junk and debris. Bright, clean, open space. Natural lighting from open garage door. Photorealistic.`,
      aspectRatio: "4:3",
    },
    useCase: "Garage cleanout service page",
  },
  basementCleanout: {
    before: {
      name: "basement-before",
      prompt: `Photography of a cluttered basement filled with old boxes, furniture, exercise equipment, holiday decorations, and years of accumulated items. Typical suburban Chicagoland home basement. Fluorescent lighting, crowded and disorganized. Photorealistic.`,
      aspectRatio: "4:3",
    },
    after: {
      name: "basement-after",
      prompt: `Photography of a clean, empty basement after professional cleanout. Clear concrete floor, empty shelving, organized space ready for use. Same basement now completely cleared. Clean and spacious. Fluorescent lighting. Photorealistic.`,
      aspectRatio: "4:3",
    },
    useCase: "Basement cleanout service page",
  },
  yardDebris: {
    before: {
      name: "yard-before",
      prompt: `Photography of a suburban backyard with large pile of branches, brush, old lumber, and yard debris after storm cleanup or landscaping project. Messy pile in green grass. Chicagoland residential backyard. Daytime, natural lighting. Photorealistic.`,
      aspectRatio: "4:3",
    },
    after: {
      name: "yard-after",
      prompt: `Photography of a clean suburban backyard after debris removal. Green grass, no debris, neat and tidy lawn. Same backyard now completely cleared of all debris. Daytime, natural lighting. Photorealistic.`,
      aspectRatio: "4:3",
    },
    useCase: "Yard debris removal service page",
  },
};

// Gallery-specific Before/After images for ProofGallery component
export const galleryPrompts = {
  // CATEGORY A: Extreme Cleanouts
  estateCleanout: {
    before: {
      name: "gallery-estate-before",
      prompt: `Documentary-style photograph of a hoarder house interior, dimly lit living room completely filled floor-to-ceiling with boxes, newspapers, old clothes, and miscellaneous items. Narrow pathways between piles. Overwhelming accumulation. Shot from doorway perspective showing the full scope. Natural window light filtering through gaps. Photorealistic, editorial documentary style.`,
      aspectRatio: "4:3",
    },
    after: {
      name: "gallery-estate-after",
      prompt: `Documentary-style photograph of the same living room now completely empty and clean. Freshly vacuumed carpet visible, clean walls, open space with natural light streaming through windows. Dramatic transformation. Same angle as before shot. Photorealistic, editorial documentary style.`,
      aspectRatio: "4:3",
    },
    useCase: "Gallery - Estate Cleanout transformation",
  },
  garageExtreme: {
    before: {
      name: "gallery-garage-extreme-before",
      prompt: `Professional photograph of a severely cluttered two-car garage packed with 20 years of accumulation. Old furniture, broken appliances, boxes stacked high, lawn equipment buried under debris. No room to walk. Car shapes barely visible under tarps and junk. Dust particles in light from open door. Photorealistic.`,
      aspectRatio: "4:3",
    },
    after: {
      name: "gallery-garage-extreme-after",
      prompt: `Professional photograph of the same two-car garage now completely empty and clean. Swept concrete floor with slight staining. Empty walls with bare studs visible. Both garage door openings visible. Natural light flooding in. Same camera angle showing dramatic transformation. Photorealistic.`,
      aspectRatio: "4:3",
    },
    useCase: "Gallery - Extreme Garage Cleanout",
  },
  basementExtreme: {
    before: {
      name: "gallery-basement-extreme-before",
      prompt: `Professional photograph of a cluttered suburban basement with water damage evidence. Old furniture, cardboard boxes, holiday decorations, exercise equipment piled together. Some items show mold and water staining on lower boxes. Fluorescent overhead lighting. Concrete block walls. Photorealistic.`,
      aspectRatio: "4:3",
    },
    after: {
      name: "gallery-basement-extreme-after",
      prompt: `Professional photograph of the same basement now completely cleared and clean. Empty concrete floor swept clean, bare walls ready for renovation. All debris removed. Industrial dehumidifier visible in corner. Same fluorescent lighting, same camera angle. Ready for renovation. Photorealistic.`,
      aspectRatio: "4:3",
    },
    useCase: "Gallery - Flooded Basement Cleanout",
  },

  // CATEGORY B: Demolition
  hotTubRemoval: {
    before: {
      name: "gallery-hottub-before",
      prompt: `Professional photograph of an old, weathered hot tub on a wooden deck in a suburban backyard. Hot tub shows age with cracked cover, discolored shell, rotting wood cabinet. Deck boards warped around it. Overgrown landscaping. Chicagoland backyard setting. Daytime natural lighting. Photorealistic.`,
      aspectRatio: "4:3",
    },
    after: {
      name: "gallery-hottub-after",
      prompt: `Professional photograph of the same deck area, hot tub completely removed. Clean deck surface visible, slight discoloration where tub sat. Open space ready for new use. Same landscaping background, deck now looking refreshed. Natural daylight. Same camera angle. Photorealistic.`,
      aspectRatio: "4:3",
    },
    useCase: "Gallery - Hot Tub Removal",
  },
  shedTeardown: {
    before: {
      name: "gallery-shed-before",
      prompt: `Professional photograph of a dilapidated wooden garden shed in a suburban backyard. Rotted wood siding, sagging roof, broken door hanging off hinges. Overgrown weeds around base. Typical Chicagoland backyard with fence visible. Daytime, overcast lighting. Photorealistic.`,
      aspectRatio: "4:3",
    },
    after: {
      name: "gallery-shed-after",
      prompt: `Professional photograph of the same backyard location, shed completely demolished and removed. Flat graded dirt/grass area where shed stood. Clean space, no debris remaining. Same fence and landscaping visible. Fresh grass seed or leveled soil. Same camera angle. Photorealistic.`,
      aspectRatio: "4:3",
    },
    useCase: "Gallery - Shed Tear-Down",
  },
  kitchenGutout: {
    before: {
      name: "gallery-kitchen-before",
      prompt: `Professional photograph of an outdated 1980s kitchen before renovation. Oak cabinets, laminate countertops, vinyl flooring, dated appliances. Cluttered counters with personal items. Typical suburban Chicagoland home kitchen. Natural lighting from window. Photorealistic, interior photography style.`,
      aspectRatio: "4:3",
    },
    after: {
      name: "gallery-kitchen-after",
      prompt: `Professional photograph of the same kitchen completely gutted for renovation. All cabinets removed, bare drywall (some removed to studs), flooring torn up to subfloor, appliances removed. Exposed plumbing and electrical. Construction debris cleared. Ready for contractors. Same camera angle. Photorealistic.`,
      aspectRatio: "4:3",
    },
    useCase: "Gallery - Kitchen Gut-Out Demo",
  },

  // CATEGORY C: Dumpster Rentals
  roofingProject: {
    before: {
      name: "gallery-roofing-project",
      prompt: `Professional photograph of a 20-yard green roll-off dumpster in a suburban driveway during a roofing project. Dumpster half-filled with old shingles and roofing debris. Workers on roof visible in background tearing off old shingles. Sunny day, active job site. Chicagoland residential neighborhood. Photorealistic, documentary style.`,
      aspectRatio: "4:3",
    },
    after: {
      name: "gallery-roofing-complete",
      prompt: `Professional photograph of completed roof with dumpster being loaded onto truck for removal. Full dumpster with roofing debris, green roll-off truck hooking up container. New roof shingles visible on house. Clean driveway. Satisfied completion of project. Same residential setting. Photorealistic.`,
      aspectRatio: "4:3",
    },
    useCase: "Gallery - Roofing Dumpster Project",
  },
  drivewayProtection: {
    name: "gallery-driveway-protection",
    prompt: `Close-up professional photograph of a green roll-off dumpster being delivered onto a decorative paver driveway. Wooden boards placed under the dumpster wheels to protect the pavers. Detail shot showing the care taken to protect the homeowner's property. Professional truck driver positioning the container. Chicagoland suburban home. Photorealistic.`,
    aspectRatio: "4:3",
    useCase: "Gallery - Driveway Protection Detail",
  },
  homeRenovation: {
    name: "gallery-home-renovation",
    prompt: `Professional photograph of a 15-yard green dumpster positioned next to a suburban home undergoing bathroom and kitchen remodel. Dumpster filled with drywall, old tile, fixtures, and construction debris. Workers carrying debris from house to dumpster. Active renovation project. Chicagoland residential setting. Daytime. Photorealistic.`,
    aspectRatio: "4:3",
    useCase: "Gallery - Home Renovation Dumpster",
  },
};

// Dumpster product images
export const dumpsterPrompts = {
  tenYard: {
    name: "dumpster-10-yard",
    prompt: `Professional product photography of a 10-yard roll-off dumpster in a suburban driveway. Green metal dumpster, clean and professional. Small-medium size container suitable for garage cleanouts. Chicagoland residential setting with house visible. Daytime, clear sky. Photorealistic, commercial product photography.`,
    aspectRatio: "4:3",
    useCase: "Dumpster rental size guide",
  },
  fifteenYard: {
    name: "dumpster-15-yard",
    prompt: `Professional product photography of a 15-yard roll-off dumpster in a suburban driveway. Green metal dumpster, clean and professional. Medium size container suitable for basement cleanouts and small remodels. Chicagoland residential setting. Daytime, clear sky. Photorealistic, commercial product photography.`,
    aspectRatio: "4:3",
    useCase: "Dumpster rental size guide",
  },
  twentyYard: {
    name: "dumpster-20-yard",
    prompt: `Professional product photography of a 20-yard roll-off dumpster in a suburban driveway. Green metal dumpster, clean and professional. Large container suitable for roofing projects and major cleanouts. Chicagoland residential setting. Daytime, clear sky. Photorealistic, commercial product photography.`,
    aspectRatio: "4:3",
    useCase: "Dumpster rental size guide",
  },
  thirtyYard: {
    name: "dumpster-30-yard",
    prompt: `Professional product photography of a 30-yard roll-off dumpster at a construction site. Large green metal dumpster, clean and professional. Extra large container suitable for construction debris and major renovations. Commercial or large residential project in Chicagoland area. Daytime, clear sky. Photorealistic, commercial product photography.`,
    aspectRatio: "4:3",
    useCase: "Dumpster rental size guide",
  },
};

// Service-specific images
export const servicePrompts = {
  junkRemoval: {
    name: "service-junk-removal",
    prompt: `Professional photography of two workers carrying old couch from a suburban home to a green junk removal truck. Professional uniforms, work gloves, efficient teamwork. Chicagoland suburb, well-maintained home exterior. Daytime, friendly neighborhood atmosphere. Photorealistic, editorial style.`,
    aspectRatio: "16:9",
    useCase: "Junk removal service page hero",
  },
  estateClearout: {
    name: "service-estate-cleanout",
    prompt: `Professional photography of respectful junk removal workers carefully packing and removing items from an estate home. Professional demeanor, organized process with boxes and furniture. Older suburban home interior. Soft natural lighting, compassionate and professional atmosphere. Photorealistic, editorial style.`,
    aspectRatio: "16:9",
    useCase: "Estate cleanout service page hero",
  },
  demolition: {
    name: "service-demolition",
    prompt: `Professional photography of workers demolishing an old wooden shed in a suburban backyard. Workers with safety gear and tools, debris being loaded into a green dumpster. Controlled demolition process. Chicagoland residential backyard. Daytime, active work scene. Photorealistic, editorial style.`,
    aspectRatio: "16:9",
    useCase: "Demolition service page hero",
  },
  commercialCleanout: {
    name: "service-commercial",
    prompt: `Professional photography of junk removal crew clearing out a commercial office space. Workers removing old office furniture, desks, and equipment. Professional uniforms, efficient operation. Modern office building interior. Daytime, professional business environment. Photorealistic, commercial photography style.`,
    aspectRatio: "16:9",
    useCase: "Commercial cleanout service page",
  },
};

// Social media and GBP post images
export const socialPrompts = {
  sameDayService: {
    name: "social-same-day",
    prompt: `Professional photography of a green junk removal truck parked in front of a suburban home with workers loading items. Text-friendly composition with clear sky area for overlay text. Bright, energetic, urgent feel. Daytime, Chicagoland neighborhood. Photorealistic, social media marketing style.`,
    aspectRatio: "1:1",
    useCase: "GBP post - Same-day service promotion",
  },
  customerSatisfaction: {
    name: "social-happy-customer",
    prompt: `Professional photography of a satisfied homeowner shaking hands with a junk removal crew member in front of a now-empty garage. Green truck visible in background. Friendly, trustworthy atmosphere. Suburban Chicagoland setting. Daytime, warm lighting. Photorealistic, testimonial style.`,
    aspectRatio: "1:1",
    useCase: "GBP post - Customer satisfaction",
  },
  beforeAfterSplit: {
    name: "social-before-after",
    prompt: `Professional split-screen photography showing cluttered garage on left side transforming to clean empty garage on right side. Clear visual transformation. Before label area on left, after label area on right. Bright lighting, dramatic comparison. Photorealistic, marketing style.`,
    aspectRatio: "1:1",
    useCase: "GBP post - Before/after transformation",
  },
  weekendAvailability: {
    name: "social-weekend",
    prompt: `Professional photography of a junk removal truck and crew working in a suburban neighborhood on a weekend morning. Friendly neighborhood atmosphere, workers waving to camera. Green truck, professional appearance. Bright Saturday morning feel. Chicagoland suburb. Photorealistic, lifestyle photography.`,
    aspectRatio: "1:1",
    useCase: "GBP post - Weekend availability",
  },
  freeEstimate: {
    name: "social-free-estimate",
    prompt: `Professional photography of a junk removal crew member with clipboard talking to homeowner in driveway, pointing at items to be removed. Friendly consultation, professional demeanor. Green truck in background. Suburban Chicagoland home. Daytime, helpful atmosphere. Photorealistic, service photography style.`,
    aspectRatio: "1:1",
    useCase: "GBP post - Free estimate promotion",
  },
};

// Location-specific images (for priority cities)
export const locationPrompts = {
  naperville: {
    name: "location-naperville",
    prompt: `Professional photography of a green junk removal truck parked on a tree-lined street in Naperville, Illinois suburb. Upscale residential neighborhood with well-maintained homes. Daytime, beautiful suburban atmosphere. Workers visible near truck. Photorealistic, local business photography.`,
    aspectRatio: "16:9",
    useCase: "Naperville location page",
  },
  schaumburg: {
    name: "location-schaumburg",
    prompt: `Professional photography of a green dumpster being delivered to a home in Schaumburg, Illinois. Mixed residential and commercial area visible. Typical Schaumburg neighborhood architecture. Green truck, professional operation. Daytime. Photorealistic, local service photography.`,
    aspectRatio: "16:9",
    useCase: "Schaumburg location page",
  },
  bartlett: {
    name: "location-bartlett",
    prompt: `Professional photography of the Dumpster Rescue USA headquarters in Bartlett, Illinois. Green trucks in parking area, professional facility. Local small business atmosphere. Daytime, welcoming appearance. Photorealistic, business profile photography.`,
    aspectRatio: "16:9",
    useCase: "Bartlett (headquarters) location page",
  },
};

// Combine all prompts for batch generation
export const allPrompts = {
  ...heroPrompts,
  ...dumpsterPrompts,
  ...servicePrompts,
  ...socialPrompts,
  ...locationPrompts,
  // Before/after pairs and gallery prompts need special handling
};

export const beforeAfterPairs = beforeAfterPrompts;
export const galleryPairs = galleryPrompts;

// Count gallery items (mix of before/after pairs and single images)
const galleryBeforeAfterCount = Object.values(galleryPrompts).filter(p => p.before && p.after).length * 2;
const gallerySingleCount = Object.values(galleryPrompts).filter(p => !p.before && !p.after && p.prompt).length;

// Export prompt counts for batch planning
export const promptCounts = {
  hero: Object.keys(heroPrompts).length,
  dumpster: Object.keys(dumpsterPrompts).length,
  service: Object.keys(servicePrompts).length,
  social: Object.keys(socialPrompts).length,
  location: Object.keys(locationPrompts).length,
  beforeAfter: Object.keys(beforeAfterPrompts).length * 2,
  gallery: galleryBeforeAfterCount + gallerySingleCount,
  total:
    Object.keys(heroPrompts).length +
    Object.keys(dumpsterPrompts).length +
    Object.keys(servicePrompts).length +
    Object.keys(socialPrompts).length +
    Object.keys(locationPrompts).length +
    Object.keys(beforeAfterPrompts).length * 2 +
    galleryBeforeAfterCount + gallerySingleCount,
};

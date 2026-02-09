/**
 * Nano Banana Pro (Gemini 3 Pro Image) — kie.ai Prompt Templates
 * Dumpster Rescue LLC — Brand Colors: Safety Red (#ED1C24), Caution Yellow (#FFF200), Rich Black (#000000)
 *
 * Prompt formula for Nano Banana Pro:
 *   [Subject + Adjectives] doing [Action] in [Location/Context].
 *   [Composition/Camera Angle]. [Lighting/Atmosphere].
 *   [Style/Media]. [Specific Constraint/Text].
 *
 * Text rendering: Nano Banana Pro renders text accurately.
 *   Always include exact text in quotes: "DUMPSTER RESCUE"
 *
 * Reference image: Upload the logo PNG as a reference image in kie.ai
 *   to guide the "DUMPSTER RESCUE" branding on dumpsters.
 */

// Brand constants for prompt consistency
export const brandColors = {
  primary: "safety red (#ED1C24)",
  accent: "caution yellow (#FFF200)",
  base: "rich black",
  truckColor: "black truck with bold red 'DUMPSTER RESCUE' lettering and yellow accent stripe",
  dumpsterColor: "bright vivid kelly green roll-off dumpster with bold white 'DUMPSTER RESCUE' text on the side",
  uniformColor: "black work shirts with red 'DUMPSTER RESCUE' logo",
};

// ─────────────────────────────────────────────────────────
// HERO SECTION IMAGES
// ─────────────────────────────────────────────────────────
export const heroPrompts = {
  crewPhoto: {
    name: "hero-crew",
    prompt: `A confident junk removal crew of 3 muscular workers standing proudly in front of a large black roll-off truck with bold red "DUMPSTER RESCUE" lettering on the side, parked in a clean suburban driveway. Workers wearing black work shirts with red logos and yellow safety vests, smiling at camera with thumbs up. Eye-level shot, centered composition with truck filling background. Golden hour warm sunlight, professional and heroic atmosphere. Photorealistic commercial photography, Canon EOS R5. The truck has "DUMPSTER RESCUE" clearly visible in large red block letters.`,
    aspectRatio: "16:9",
    useCase: "Homepage hero section",
  },
  truckDriveway: {
    name: "hero-truck-driveway",
    prompt: `A powerful black roll-off dumpster truck with bold red "DUMPSTER RESCUE" lettering and yellow accent stripe backing a bright vivid kelly green dumpster into a neat suburban residential driveway in Illinois. The bright vivid kelly green dumpster has "DUMPSTER RESCUE" painted in white block text on the side. Typical Chicagoland neighborhood with green lawns and mature oak trees. Wide angle shot from street level. Morning golden light, professional service atmosphere. Photorealistic editorial photography. Text on truck reads "DUMPSTER RESCUE" in red.`,
    aspectRatio: "16:9",
    useCase: "Homepage hero alternate",
  },
  teamAtWork: {
    name: "hero-team-working",
    prompt: `Two strong junk removal workers in black shirts with red "DUMPSTER RESCUE" logos loading old furniture and boxes into a bright vivid kelly green roll-off dumpster with "DUMPSTER RESCUE" in white text. Workers wearing yellow safety gloves, working efficiently in a suburban garage. Medium shot from garage interior looking out toward driveway. Natural daylight streaming in, energetic work-in-progress feel. Photorealistic editorial photography, shallow depth of field. Dumpster clearly shows "DUMPSTER RESCUE" branding.`,
    aspectRatio: "16:9",
    useCase: "Homepage hero action shot",
  },
};

// ─────────────────────────────────────────────────────────
// GALLERY: BEFORE/AFTER — EXTREME CLEANOUTS
// ─────────────────────────────────────────────────────────
export const galleryPrompts = {
  estateCleanout: {
    before: {
      name: "gallery-estate-before",
      prompt: `A cluttered estate home interior, living room completely filled floor-to-ceiling with old boxes, newspapers, vintage furniture, and decades of accumulated items. Narrow pathways between towering piles. Shot from doorway perspective showing the overwhelming scope. Dim natural window light filtering through gaps in the mess. Photorealistic documentary photography, wide angle lens. No people.`,
      aspectRatio: "4:3",
    },
    after: {
      name: "gallery-estate-after",
      prompt: `The same living room now completely empty and spotlessly clean. Freshly vacuumed beige carpet visible, clean cream walls, open spacious room with natural light streaming through windows. A green "DUMPSTER RESCUE" branded dumpster visible through the window in the driveway outside. Dramatic transformation. Same doorway angle as the before shot. Photorealistic documentary photography. Text "DUMPSTER RESCUE" visible on the dumpster outside.`,
      aspectRatio: "4:3",
    },
    useCase: "Gallery - Estate Cleanout transformation",
  },
  garageExtreme: {
    before: {
      name: "gallery-garage-extreme-before",
      prompt: `A severely cluttered two-car garage packed with 20 years of accumulation. Old furniture, broken appliances, stacked boxes, lawn equipment buried under debris. No room to walk, impossible to park a car. Dust particles visible in the light from the open garage door. Shot from inside looking out. Photorealistic documentary photography. No people.`,
      aspectRatio: "4:3",
    },
    after: {
      name: "gallery-garage-extreme-after",
      prompt: `The same two-car garage now completely empty and swept clean. Bare concrete floor with light staining. Empty walls, both garage door openings visible with natural light flooding in. A bright vivid kelly green dumpster with white "DUMPSTER RESCUE" text sits in the driveway just outside the garage. Same interior camera angle showing the dramatic transformation. Photorealistic documentary photography.`,
      aspectRatio: "4:3",
    },
    useCase: "Gallery - Extreme Garage Cleanout",
  },
  basementExtreme: {
    before: {
      name: "gallery-basement-extreme-before",
      prompt: `A flooded suburban basement cluttered with water-damaged cardboard boxes, old furniture, exercise equipment, and holiday decorations. Water staining visible on lower boxes and walls. Concrete block walls. Fluorescent overhead lighting casting harsh shadows. Shot from the stairway looking down into the mess. Photorealistic documentary photography. No people.`,
      aspectRatio: "4:3",
    },
    after: {
      name: "gallery-basement-extreme-after",
      prompt: `The same basement now completely cleared and clean. Empty concrete floor swept clean, bare concrete block walls. Industrial dehumidifier in one corner. All debris removed, space ready for renovation. Same stairway camera angle. Fluorescent lighting showing the open clean space. Photorealistic documentary photography. No people.`,
      aspectRatio: "4:3",
    },
    useCase: "Gallery - Flooded Basement Cleanout",
  },

  // ─────────────────────────────────────────────────────────
  // GALLERY: BEFORE/AFTER — DEMOLITION
  // ─────────────────────────────────────────────────────────
  hotTubRemoval: {
    before: {
      name: "gallery-hottub-before",
      prompt: `An old weathered hot tub sitting on a wooden deck in a suburban Chicagoland backyard. Cracked faded cover, discolored fiberglass shell, rotting wood cabinet panels. Deck boards warped and stained around the base. Overgrown landscaping in background. Three-quarter angle from deck level. Overcast daylight, neglected outdoor space feel. Photorealistic documentary photography.`,
      aspectRatio: "4:3",
    },
    after: {
      name: "gallery-hottub-after",
      prompt: `The same deck area with the hot tub completely removed. Clean deck surface with slight discoloration rectangle where the tub sat. Open usable space. Same landscaping background, deck now looking refreshed and spacious. A black truck with red "DUMPSTER RESCUE" lettering visible driving away in the background. Same camera angle. Natural daylight. Photorealistic documentary photography.`,
      aspectRatio: "4:3",
    },
    useCase: "Gallery - Hot Tub Removal",
  },
  shedTeardown: {
    before: {
      name: "gallery-shed-before",
      prompt: `A dilapidated wooden garden shed in a suburban Chicagoland backyard. Severely rotted wood siding, sagging asphalt shingle roof, broken door hanging off rusty hinges. Overgrown weeds around the base. Wood fence and neighboring houses visible behind. Three-quarter view showing full shed. Overcast daylight. Photorealistic documentary photography.`,
      aspectRatio: "4:3",
    },
    after: {
      name: "gallery-shed-after",
      prompt: `The same backyard location with the shed completely demolished and removed. Flat graded dirt area where the shed stood, fresh grass seed visible. No debris remaining. Same fence and landscaping background. A bright vivid kelly green dumpster with "DUMPSTER RESCUE" in white text loaded with wood debris sits nearby ready for pickup. Same camera angle. Natural daylight. Photorealistic documentary photography.`,
      aspectRatio: "4:3",
    },
    useCase: "Gallery - Shed Tear-Down",
  },
  kitchenGutout: {
    before: {
      name: "gallery-kitchen-before",
      prompt: `An outdated 1980s kitchen before renovation. Honey oak cabinets, beige laminate countertops, yellowed vinyl flooring, dated almond-colored appliances. Cluttered counters. Typical suburban Chicagoland home kitchen interior. Natural window lighting. Eye-level shot from kitchen entrance. Photorealistic interior photography.`,
      aspectRatio: "4:3",
    },
    after: {
      name: "gallery-kitchen-after",
      prompt: `The same kitchen completely gutted for renovation. All cabinets ripped out, bare drywall with some sections removed to exposed wood studs, flooring torn up revealing plywood subfloor, all appliances removed. Exposed copper plumbing and electrical wiring visible. Construction dust on surfaces, space is clean of debris. Same camera angle from kitchen entrance. Photorealistic documentary photography.`,
      aspectRatio: "4:3",
    },
    useCase: "Gallery - Kitchen Gut-Out Demo",
  },

  // ─────────────────────────────────────────────────────────
  // GALLERY: DUMPSTER RENTALS
  // ─────────────────────────────────────────────────────────
  roofingProject: {
    before: {
      name: "gallery-roofing-project",
      prompt: `A large 20-yard bright vivid kelly green roll-off dumpster with bold white "DUMPSTER RESCUE" text on the side, sitting in a suburban driveway during an active roofing project. Dumpster half-filled with old shingles and roofing felt. Two workers on the roof in the background tearing off old shingles. Sunny clear sky. Chicagoland residential neighborhood with houses visible. Wide shot from the street. Photorealistic documentary photography. "DUMPSTER RESCUE" text clearly legible on the dumpster.`,
      aspectRatio: "4:3",
    },
    after: {
      name: "gallery-roofing-complete",
      prompt: `A black roll-off truck with red "DUMPSTER RESCUE" lettering hooking up a full bright vivid kelly green dumpster loaded with old roofing shingles for removal. New architectural shingles visible on the completed roof behind. Clean driveway, satisfied project completion. Same residential neighborhood setting. Medium-wide shot from the street. Natural daylight. Photorealistic documentary photography. "DUMPSTER RESCUE" visible on both truck and dumpster.`,
      aspectRatio: "4:3",
    },
    useCase: "Gallery - Roofing Dumpster Project",
  },
  drivewayProtection: {
    name: "gallery-driveway-protection",
    prompt: `Close-up detail shot of a bright vivid kelly green roll-off dumpster with white "DUMPSTER RESCUE" text being carefully placed onto a decorative brick paver driveway. Thick wooden boards placed under the dumpster wheels and rails to protect the expensive pavers. A professional truck driver in a black shirt with red logo guiding the placement. Suburban Chicagoland home with manicured landscaping. Low angle close-up showing the care taken. Natural daylight. Photorealistic commercial photography. "DUMPSTER RESCUE" text clearly visible on the dumpster side.`,
    aspectRatio: "4:3",
    useCase: "Gallery - Driveway Protection Detail",
  },
  homeRenovation: {
    name: "gallery-home-renovation",
    prompt: `A 15-yard bright vivid kelly green dumpster with bold white "DUMPSTER RESCUE" text positioned next to a suburban home undergoing renovation. Dumpster filled with drywall sheets, old ceramic tile, bathroom fixtures, and construction debris. A worker in a black shirt carrying a load of debris from the house toward the dumpster. Active renovation project, organized worksite. Chicagoland residential setting with green lawn. Wide shot. Daytime natural light. Photorealistic documentary photography. "DUMPSTER RESCUE" lettering clearly legible.`,
    aspectRatio: "4:3",
    useCase: "Gallery - Home Renovation Dumpster",
  },
};

// ─────────────────────────────────────────────────────────
// SERVICE-SPECIFIC BEFORE/AFTER PAIRS
// ─────────────────────────────────────────────────────────
export const beforeAfterPrompts = {
  garageCleanout: {
    before: {
      name: "garage-before",
      prompt: `A cluttered suburban garage filled with old furniture, stacked cardboard boxes, broken appliances, tangled yard equipment, and miscellaneous junk piled shoulder-high. Disorganized overwhelming accumulation. Typical Chicagoland home two-car garage interior. Natural light from open garage door. Shot from inside looking out. Photorealistic documentary photography.`,
      aspectRatio: "4:3",
    },
    after: {
      name: "garage-after",
      prompt: `The same suburban garage now completely clean and empty. Swept concrete floor, organized bare walls, plenty of open space to park two cars. Bright natural light from open garage door. A green "DUMPSTER RESCUE" branded dumpster visible in the driveway just outside. Same camera angle from inside looking out. Photorealistic documentary photography. "DUMPSTER RESCUE" text on dumpster.`,
      aspectRatio: "4:3",
    },
    useCase: "Garage cleanout service page",
  },
  basementCleanout: {
    before: {
      name: "basement-before",
      prompt: `A cluttered basement filled with old boxes, outdated exercise equipment, dusty holiday decorations, broken furniture, and years of accumulated household items. Typical suburban Chicagoland home basement with concrete block walls. Harsh fluorescent lighting. Crowded and disorganized. Shot from stairway. Photorealistic documentary photography.`,
      aspectRatio: "4:3",
    },
    after: {
      name: "basement-after",
      prompt: `The same basement now completely clean and empty. Clear concrete floor, bare shelving, organized open space ready for use. Fluorescent lighting showing a spacious clean room. Same camera angle from stairway. Photorealistic documentary photography.`,
      aspectRatio: "4:3",
    },
    useCase: "Basement cleanout service page",
  },
  yardDebris: {
    before: {
      name: "yard-before",
      prompt: `A suburban Chicagoland backyard with a massive pile of tree branches, brush, old lumber, and storm debris covering the lawn. Messy organic pile on green grass. Residential backyard with fence and neighboring houses. Daytime overcast lighting. Wide shot from patio. Photorealistic documentary photography.`,
      aspectRatio: "4:3",
    },
    after: {
      name: "yard-after",
      prompt: `The same suburban backyard now completely cleared. Green grass, no debris, neat tidy lawn. Same fence and houses visible. A green "DUMPSTER RESCUE" dumpster loaded with the branches and debris being hauled away on a black truck in the background. Same camera angle from patio. Daytime natural light. Photorealistic documentary photography.`,
      aspectRatio: "4:3",
    },
    useCase: "Yard debris removal service page",
  },
};

// ─────────────────────────────────────────────────────────
// DUMPSTER PRODUCT IMAGES (size guide)
// ─────────────────────────────────────────────────────────
export const dumpsterPrompts = {
  tenYard: {
    name: "dumpster-10-yard",
    prompt: `A clean 10-yard bright vivid kelly green roll-off dumpster with bold white "DUMPSTER RESCUE" text on the side, sitting empty in a clean suburban driveway. Small-medium size container, about 4 feet tall. Chicagoland residential home with green lawn visible. Eye-level product shot from the front-quarter angle. Bright clear sky, clean professional presentation. Photorealistic commercial product photography. "DUMPSTER RESCUE" text centered and clearly legible. Yellow caution stripe along the top edge.`,
    aspectRatio: "4:3",
    useCase: "Dumpster rental size guide - 10 yard",
  },
  fifteenYard: {
    name: "dumpster-15-yard",
    prompt: `A clean 15-yard bright vivid kelly green roll-off dumpster with bold white "DUMPSTER RESCUE" text on the side, sitting empty in a suburban driveway. Medium size container, about 4.5 feet tall. Chicagoland residential home with landscaping visible. Eye-level product shot from front-quarter angle. Bright clear sky, clean professional look. Photorealistic commercial product photography. "DUMPSTER RESCUE" text centered and clearly legible. Yellow caution stripe along top edge.`,
    aspectRatio: "4:3",
    useCase: "Dumpster rental size guide - 15 yard",
  },
  twentyYard: {
    name: "dumpster-20-yard",
    prompt: `A clean 20-yard bright vivid kelly green roll-off dumpster with bold white "DUMPSTER RESCUE" text on the side, sitting empty in a suburban driveway. Large container, about 5 feet tall and 22 feet long. Chicagoland residential home visible behind. Eye-level product shot from front-quarter angle. Bright clear sky, professional presentation. Photorealistic commercial product photography. "DUMPSTER RESCUE" text centered and clearly legible. Yellow caution stripe along top edge.`,
    aspectRatio: "4:3",
    useCase: "Dumpster rental size guide - 20 yard",
  },
  thirtyYard: {
    name: "dumpster-30-yard",
    prompt: `A clean 30-yard bright vivid kelly green roll-off dumpster with bold white "DUMPSTER RESCUE" text on the side, positioned at a large construction site. Extra large container, about 6 feet tall and 22 feet long. Commercial or large residential renovation project in Chicagoland area. Eye-level product shot from front-quarter angle. Bright clear sky, professional worksite. Photorealistic commercial product photography. "DUMPSTER RESCUE" text centered and clearly legible. Yellow caution stripe along top edge.`,
    aspectRatio: "4:3",
    useCase: "Dumpster rental size guide - 30 yard",
  },
};

// ─────────────────────────────────────────────────────────
// SERVICE PAGE HERO IMAGES
// ─────────────────────────────────────────────────────────
export const servicePrompts = {
  junkRemoval: {
    name: "service-junk-removal",
    prompt: `Two strong junk removal workers in black shirts with red "DUMPSTER RESCUE" logos carrying an old brown couch from a suburban home toward a black truck with red "DUMPSTER RESCUE" lettering. Professional work gloves, efficient teamwork. Chicagoland suburb, well-maintained brick home exterior. Medium shot from the front porch. Warm daytime light, friendly professional atmosphere. Photorealistic editorial photography. "DUMPSTER RESCUE" visible on both shirts and truck.`,
    aspectRatio: "16:9",
    useCase: "Junk removal service page hero",
  },
  estateClearout: {
    name: "service-estate-cleanout",
    prompt: `Professional junk removal workers in black "DUMPSTER RESCUE" shirts carefully and respectfully packing estate items into organized moving boxes. Older suburban home interior with family photos on walls. Workers showing careful handling, compassionate professional demeanor. Soft natural window lighting, warm respectful tone. Medium shot at eye level. Photorealistic editorial photography. Red "DUMPSTER RESCUE" logos visible on worker shirts.`,
    aspectRatio: "16:9",
    useCase: "Estate cleanout service page hero",
  },
  demolition: {
    name: "service-demolition",
    prompt: `Two workers with safety helmets and yellow vests demolishing an old wooden shed in a suburban Chicagoland backyard. Sledgehammers and pry bars in use, controlled demolition. A green "DUMPSTER RESCUE" dumpster nearby collecting the debris. Active dynamic work scene. Wide shot from the yard. Daytime natural light, energetic professional atmosphere. Photorealistic editorial photography. "DUMPSTER RESCUE" text on the dumpster clearly visible.`,
    aspectRatio: "16:9",
    useCase: "Demolition service page hero",
  },
  commercialCleanout: {
    name: "service-commercial",
    prompt: `Junk removal crew in black "DUMPSTER RESCUE" shirts clearing out a commercial office space. Workers carrying old office desks, chairs, and filing cabinets. Modern office building interior with fluorescent lighting. Professional efficient operation. Medium-wide shot down a hallway. Bright commercial lighting, business-professional atmosphere. Photorealistic commercial photography. Red "DUMPSTER RESCUE" logos on worker shirts.`,
    aspectRatio: "16:9",
    useCase: "Commercial cleanout service page",
  },
};

// ─────────────────────────────────────────────────────────
// SOCIAL MEDIA & GBP POST IMAGES
// ─────────────────────────────────────────────────────────
export const socialPrompts = {
  sameDayService: {
    name: "social-same-day",
    prompt: `A black "DUMPSTER RESCUE" truck with red lettering and a bright vivid kelly green dumpster parked in front of a suburban home with workers loading items. Composition with large clear blue sky area at top for text overlay. Bright energetic urgent feel. Daytime, Chicagoland neighborhood. Square format centered composition. Photorealistic social media marketing photography. "DUMPSTER RESCUE" clearly readable on truck.`,
    aspectRatio: "1:1",
    useCase: "GBP post - Same-day service promotion",
  },
  customerSatisfaction: {
    name: "social-happy-customer",
    prompt: `A satisfied homeowner shaking hands with a "DUMPSTER RESCUE" crew member in a black shirt with red logo in front of a now-empty clean garage. Black truck with red "DUMPSTER RESCUE" lettering visible in the background. Genuine friendly smiles, trustworthy atmosphere. Suburban Chicagoland setting with green lawn. Warm afternoon light. Square format. Photorealistic testimonial-style photography.`,
    aspectRatio: "1:1",
    useCase: "GBP post - Customer satisfaction",
  },
  beforeAfterSplit: {
    name: "social-before-after",
    prompt: `Split-screen image: left half shows a cluttered messy garage full of junk, right half shows the same garage completely clean and empty with a green "DUMPSTER RESCUE" dumpster in the driveway. Clear visual line dividing the two halves. Bold dramatic transformation. Bright lighting on both sides. Square format. Photorealistic marketing photography. "DUMPSTER RESCUE" text on dumpster on the clean side.`,
    aspectRatio: "1:1",
    useCase: "GBP post - Before/after transformation",
  },
  weekendAvailability: {
    name: "social-weekend",
    prompt: `A black "DUMPSTER RESCUE" truck with red lettering and crew of 3 workers in black shirts working in a suburban Chicagoland neighborhood on a bright Saturday morning. Friendly approachable workers, one waving to camera. Residential street with mature trees and well-kept homes. Warm morning light, positive neighborhood atmosphere. Square format. Photorealistic lifestyle photography. "DUMPSTER RESCUE" on truck clearly visible.`,
    aspectRatio: "1:1",
    useCase: "GBP post - Weekend availability",
  },
  freeEstimate: {
    name: "social-free-estimate",
    prompt: `A "DUMPSTER RESCUE" crew member in a black shirt with red logo holding a clipboard, talking to a homeowner in a driveway while gesturing toward a pile of items to be removed. Professional consultation, friendly helpful demeanor. Black truck with red "DUMPSTER RESCUE" in the background. Suburban Chicagoland home. Warm daytime light. Square format. Photorealistic service photography. Company name visible on shirt and truck.`,
    aspectRatio: "1:1",
    useCase: "GBP post - Free estimate promotion",
  },
};

// ─────────────────────────────────────────────────────────
// LOCATION-SPECIFIC IMAGES
// ─────────────────────────────────────────────────────────
export const locationPrompts = {
  naperville: {
    name: "location-naperville",
    prompt: `A black "DUMPSTER RESCUE" truck with red lettering delivering a bright vivid kelly green dumpster on a tree-lined street in Naperville, Illinois. Upscale residential neighborhood with well-maintained brick homes and manicured lawns. Workers visible near the truck. Wide establishing shot from across the street. Beautiful warm afternoon light, premium suburban service atmosphere. Photorealistic local business photography. "DUMPSTER RESCUE" on truck clearly legible.`,
    aspectRatio: "16:9",
    useCase: "Naperville location page",
  },
  schaumburg: {
    name: "location-schaumburg",
    prompt: `A green "DUMPSTER RESCUE" dumpster with white text being delivered to a home in Schaumburg, Illinois. Mixed residential area with typical Schaumburg subdivision architecture. Black truck with red branding. Professional careful delivery on the driveway. Wide shot showing the neighborhood context. Daytime natural light. Photorealistic local service photography. "DUMPSTER RESCUE" visible on dumpster and truck.`,
    aspectRatio: "16:9",
    useCase: "Schaumburg location page",
  },
  bartlett: {
    name: "location-bartlett",
    prompt: `The Dumpster Rescue LLC headquarters yard in Bartlett, Illinois. Multiple bright vivid kelly green dumpsters with white "DUMPSTER RESCUE" text lined up neatly. Two black trucks with red "DUMPSTER RESCUE" lettering parked in the yard. Professional small business facility with American flag. Clean organized operation. Wide establishing shot. Clear sky, warm welcoming light, family-owned business atmosphere. Photorealistic business profile photography.`,
    aspectRatio: "16:9",
    useCase: "Bartlett (headquarters) location page",
  },
};

// ─────────────────────────────────────────────────────────
// EXPORTS & COUNTS
// ─────────────────────────────────────────────────────────

// Combine single-image prompts for batch access
export const allPrompts = {
  ...heroPrompts,
  ...dumpsterPrompts,
  ...servicePrompts,
  ...socialPrompts,
  ...locationPrompts,
};

export const beforeAfterPairs = beforeAfterPrompts;
export const galleryPairs = galleryPrompts;

// Count gallery items (mix of before/after pairs and single images)
const galleryBeforeAfterCount = Object.values(galleryPrompts).filter(p => p.before && p.after).length * 2;
const gallerySingleCount = Object.values(galleryPrompts).filter(p => !p.before && !p.after && p.prompt).length;

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


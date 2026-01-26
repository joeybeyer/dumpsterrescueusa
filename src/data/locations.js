const priorityTowns = new Set([
  "Bloomingdale",
  "Streamwood",
  "Hanover Park",
  "Carol Stream",
  "Wayne",
  "Elgin",
  "South Elgin",
  "Hoffman Estates",
  "South Barrington",
  "Schaumburg"
]);

const toSlug = (name) =>
  `${name
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/\./g, "")
    .replace(/\s+/g, "-")}-il`;

const buildLocations = (names, county) =>
  names.map((name) => ({
    slug: toSlug(name),
    name,
    state: "IL",
    county,
    priority: priorityTowns.has(name)
  }));

const dupes = new Map();

const mergeLocation = (location) => {
  const existing = dupes.get(location.slug);
  if (!existing) {
    dupes.set(location.slug, location);
    return;
  }

  if (!existing.secondaryCounties?.includes(location.county)) {
    existing.secondaryCounties = [
      ...(existing.secondaryCounties || []),
      location.county
    ];
  }
};

[
  ...buildLocations(
    [
      "Addison",
      "Aurora",
      "Bartlett",
      "Batavia",
      "Bensenville",
      "Bloomingdale",
      "Bolingbrook",
      "Burr Ridge",
      "Carol Stream",
      "Clarendon Hills",
      "Darien",
      "Downers Grove",
      "Elk Grove Village",
      "Elmhurst",
      "Glendale Heights",
      "Glen Ellyn",
      "Hanover Park",
      "Hinsdale",
      "Itasca",
      "Lemont",
      "Lisle",
      "Lombard",
      "Medinah",
      "Naperville",
      "Oak Brook",
      "Oakbrook Terrace",
      "Roselle",
      "Schaumburg",
      "St. Charles",
      "Villa Park",
      "Warrenville",
      "Wayne",
      "West Chicago",
      "Westmont",
      "Wheaton",
      "Willowbrook",
      "Winfield",
      "Wood Dale",
      "Woodridge"
    ],
    "DuPage"
  ),
  ...buildLocations(
    [
      "Algonquin",
      "Barrington",
      "Barrington Hills",
      "Bartlett",
      "Batavia",
      "Burlington",
      "Campton Hills",
      "Carpentersville",
      "East Dundee",
      "Elburn",
      "Elgin",
      "Geneva",
      "Gilberts",
      "Hampshire",
      "Hoffman Estates",
      "Huntly",
      "North Aurora",
      "Pingree Grove",
      "Sleepy Hollow",
      "South Elgin",
      "St. Charles",
      "Sugar Grove",
      "Wayne",
      "West Dundee"
    ],
    "Kane"
  ),
  ...buildLocations(
    [
      "Alsip",
      "Arlington Heights",
      "Bellwood",
      "Berkeley",
      "Berwyn",
      "Blue Island",
      "Bridgeview",
      "Broadview",
      "Brookfield",
      "Burbank",
      "Chicago Heights",
      "Chicago Ridge",
      "Cicero",
      "Des Plaines",
      "Elk Grove Village",
      "Elmwood Park",
      "Forest Park",
      "Franklin Park",
      "Glencoe",
      "Glenwood",
      "Hanover Park",
      "Harwood Heights",
      "Hazel Crest",
      "Hillside",
      "Hoffman Estates",
      "Hometown",
      "Homewood",
      "Inverness",
      "Kenilworth",
      "La Grange",
      "La Grange Park",
      "Lansing",
      "Markham",
      "Matteson",
      "Maywood",
      "Melrose Park",
      "Midlothian",
      "Mount Prospect",
      "Niles",
      "Northbrook",
      "Oak Forest",
      "Oak Lawn",
      "Olympia Fields",
      "Orland Park",
      "Palatine",
      "Palos Heights",
      "Palos Hills",
      "Palos Park",
      "Park Forest",
      "Park Ridge",
      "River Forest",
      "River Grove",
      "Rolling Meadows",
      "Schaumburg",
      "Schiller Park",
      "Skokie",
      "South Barrington",
      "South Holland",
      "Stone Park",
      "Streamwood",
      "Tinley Park",
      "Westchester",
      "Western Springs",
      "Wheeling",
      "Willow Springs",
      "Wilmette",
      "Winnetka",
      "Worth"
    ],
    "Cook"
  )
].forEach(mergeLocation);

const locations = Array.from(dupes.values()).sort((a, b) =>
  a.name.localeCompare(b.name)
);

const counties = ["DuPage", "Kane", "Cook"];

module.exports = { locations, counties };

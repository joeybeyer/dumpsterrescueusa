"use client";

import { useEffect, useState } from "react";

interface LocalCrewBadgeProps {
  defaultCity?: string;
}

export default function LocalCrewBadge({ defaultCity = "Bartlett" }: LocalCrewBadgeProps) {
  const [city, setCity] = useState(defaultCity);

  useEffect(() => {
    // Check if we have a stored location preference
    const storedCity = localStorage.getItem("userCity");
    if (storedCity) {
      setCity(storedCity);
      return;
    }

    // Check URL path for location context
    const path = window.location.pathname;
    const locationMatch = path.match(/\/locations\/([^/]+)/);
    if (locationMatch) {
      // Extract city name from slug (e.g., "naperville-il" -> "Naperville")
      const slug = locationMatch[1];
      const cityName = slug
        .replace(/-il$/, "")
        .split("-")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
      setCity(cityName);
      localStorage.setItem("userCity", cityName);
    }
  }, []);

  return (
    <div className="absolute bottom-3 left-3 rounded-lg bg-red-600 px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-white shadow-lg">
      Local {city} Crew
    </div>
  );
}

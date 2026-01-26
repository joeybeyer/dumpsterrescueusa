"use client";

import { useEffect } from "react";

interface SetUserCityProps {
  city: string;
}

export default function SetUserCity({ city }: SetUserCityProps) {
  useEffect(() => {
    localStorage.setItem("userCity", city);
  }, [city]);

  return null;
}

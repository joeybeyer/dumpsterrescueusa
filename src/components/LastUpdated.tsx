import React from "react";

interface LastUpdatedProps {
  date: string; // ISO format: "2025-01-15"
  className?: string;
  showIcon?: boolean;
  variant?: "inline" | "badge";
}

export default function LastUpdated({
  date,
  className = "",
  showIcon = true,
  variant = "inline",
}: LastUpdatedProps) {
  // Parse the ISO date and format for display
  const dateObj = new Date(date);
  const formattedDate = dateObj.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Get month and year for shorter display
  const shortDate = dateObj.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
  });

  if (variant === "badge") {
    return (
      <div
        className={`inline-flex items-center gap-1.5 rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-800 ${className}`}
      >
        {showIcon && (
          <svg
            className="h-3.5 w-3.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        )}
        <span>
          Updated{" "}
          <time dateTime={date} itemProp="dateModified">
            {shortDate}
          </time>
        </span>
      </div>
    );
  }

  return (
    <p className={`flex items-center gap-1.5 text-sm text-gray-600 ${className}`}>
      {showIcon && (
        <svg
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      )}
      <span>
        Last Updated:{" "}
        <time dateTime={date} itemProp="dateModified" className="font-medium">
          {formattedDate}
        </time>
      </span>
    </p>
  );
}

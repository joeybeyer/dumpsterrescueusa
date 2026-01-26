import React from "react";

interface GoogleReviewsBadgeProps {
  rating?: number;
  count?: number;
  compact?: boolean;
  variant?: "dark" | "light";
  className?: string;
  reviewsUrl?: string;
}

export default function GoogleReviewsBadge({
  rating = 5.0,
  count = 64,
  compact = false,
  variant = "dark",
  className = "",
  reviewsUrl,
}: GoogleReviewsBadgeProps) {
  const textColor = variant === "dark" ? "text-white" : "text-gray-900";
  const mutedColor = variant === "dark" ? "text-white/80" : "text-gray-600";

  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  const renderStars = () => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <svg
            key={i}
            className="h-4 w-4 fill-yellow-400 text-yellow-400"
            viewBox="0 0 20 20"
            aria-hidden="true"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <svg
            key={i}
            className="h-4 w-4 text-yellow-400"
            viewBox="0 0 20 20"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="half-star">
                <stop offset="50%" stopColor="currentColor" />
                <stop offset="50%" stopColor="#d1d5db" />
              </linearGradient>
            </defs>
            <path
              fill="url(#half-star)"
              d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
            />
          </svg>
        );
      } else {
        stars.push(
          <svg
            key={i}
            className="h-4 w-4 fill-gray-300 text-gray-300"
            viewBox="0 0 20 20"
            aria-hidden="true"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        );
      }
    }
    return stars;
  };

  if (compact) {
    const ReviewsLink = reviewsUrl ? (
      <a
        href={reviewsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`text-sm underline decoration-dotted underline-offset-2 hover:decoration-solid ${mutedColor}`}
      >
        ({count} reviews)
      </a>
    ) : (
      <span className={`text-sm ${mutedColor}`}>({count} reviews)</span>
    );

    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <div className="flex items-center gap-0.5">{renderStars()}</div>
        <span className={`text-sm font-semibold ${textColor}`}>
          {rating}/5
        </span>
        {ReviewsLink}
      </div>
    );
  }

  return (
    <div
      className={`inline-flex items-center gap-3 rounded-xl bg-white/10 px-4 py-2 backdrop-blur-sm ${className}`}
    >
      <div className="flex flex-col items-center">
        <div className="flex items-center gap-0.5">{renderStars()}</div>
        <span className={`mt-1 text-xs font-bold ${textColor}`}>
          {rating}/5 on Google
        </span>
      </div>
      <div className={`border-l border-white/20 pl-3 ${textColor}`}>
        <span className="text-lg font-bold">{count}</span>
        <span className="ml-1 text-xs">Reviews</span>
      </div>
    </div>
  );
}

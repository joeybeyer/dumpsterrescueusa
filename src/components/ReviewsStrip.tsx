// Real verified reviews from Google - curated for conversion impact
const reviews = [
  {
    name: "Laura Kolassa",
    location: "Bartlett, IL",
    rating: 5,
    quote:
      "I had an excellent experience with Dumpster Rescue and couldn't be more satisfied. They were incredibly efficient, professional, and very easy to work with. Communication was very clear.",
    date: "5 months ago",
    verified: true,
    highlight: "communication" // Key trust signal
  },
  {
    name: "Linda Cairns",
    location: "Local Neighbor",
    rating: 5,
    quote:
      "Just wanted to share a very positive experience. I initially found them on the Next Door app and spoke to Frank the owner to just get general info. He was helpful and honest.",
    date: "3 weeks ago",
    verified: true,
    highlight: "owner" // The "spoke to owner" goldmine
  },
  {
    name: "Mike Thompson",
    location: "Naperville, IL",
    rating: 5,
    quote:
      "Got my quote in 15 minutes. Dumpster arrived next morning! Fair pricing, no surprises. Will use again for sure.",
    date: "2 months ago",
    verified: true,
    highlight: "speed" // Speed + pricing trust signal
  }
];

// Google icon for verified badge
const GoogleIcon = () => (
  <svg className="h-4 w-4" viewBox="0 0 24 24">
    <path
      fill="#4285F4"
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
    />
    <path
      fill="#34A853"
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
    />
    <path
      fill="#FBBC05"
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
    />
    <path
      fill="#EA4335"
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
    />
  </svg>
);

// Star rating component
const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex text-yellow-400">
    {[1, 2, 3, 4, 5].map((star) => (
      <svg
        key={star}
        className={`h-4 w-4 ${star <= rating ? "fill-current" : "fill-gray-200"}`}
        viewBox="0 0 20 20"
      >
        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
      </svg>
    ))}
  </div>
);

export default function ReviewsStrip() {
  return (
    <section className="rounded-2xl border border-gray-200 bg-white px-6 py-6 shadow-lg">
      {/* Header with stats */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <GoogleIcon />
          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-green-600">
              Google Reviews
            </p>
            <p className="text-2xl font-bold text-gray-900">
              5.0 <span className="text-yellow-400">/ 5</span>{" "}
              <span className="text-base font-normal text-gray-500">(64 reviews)</span>
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 rounded-full bg-green-50 px-3 py-1">
          <span className="h-2 w-2 animate-pulse rounded-full bg-green-500"></span>
          <p className="text-sm font-semibold text-green-700">
            Call & speak to Frank, the owner
          </p>
        </div>
        <p className="text-sm font-bold uppercase tracking-wide text-red-600">
          Same-day Available
        </p>
      </div>

      {/* Review cards */}
      <div className="mt-5 grid gap-4 md:grid-cols-3">
        {reviews.map((review) => (
          <div
            key={review.name}
            className="rounded-xl border border-gray-200 bg-gray-50 p-4 transition-shadow hover:shadow-md"
          >
            {/* Header with name and verified badge */}
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <p className="text-sm font-bold text-gray-900">{review.name}</p>
                  {review.verified && (
                    <span className="flex items-center gap-1 text-xs text-blue-600">
                      <GoogleIcon />
                      <span className="hidden sm:inline">Verified</span>
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-500">{review.location}</p>
              </div>
              <StarRating rating={review.rating} />
            </div>

            {/* Quote */}
            <p className="mt-3 text-sm leading-relaxed text-gray-700">
              &ldquo;{review.quote}&rdquo;
            </p>

            {/* Date */}
            <p className="mt-3 text-xs text-gray-400">{review.date}</p>
          </div>
        ))}
      </div>

      {/* CTA to see all reviews */}
      <div className="mt-5 text-center">
        <a
          href="https://www.google.com/maps/place/Dumpster+Rescue+LLC/@41.9952457,-88.2026682,17z/data=!4m16!1m9!3m8!1s0x880f07d388d5fce1:0xa410c666518792f8!2sDumpster+Rescue+LLC!8m2!3d41.9952457!4d-88.2026682!9m1!1b1!16s%2Fg%2F11lf227nvz!3m5!1s0x880f07d388d5fce1:0xa410c666518792f8!8m2!3d41.9952457!4d-88.2026682!16s%2Fg%2F11lf227nvz"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm font-semibold text-green-600 hover:text-green-700 hover:underline"
        >
          See all 64 reviews on Google
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </svg>
        </a>
      </div>
    </section>
  );
}

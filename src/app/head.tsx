import { brand } from "@/data/brand";
import { localBusinessSchema, organizationSchema } from "@/lib/schema";

export default function Head() {
  const jsonLd = [organizationSchema, localBusinessSchema];
  return (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}

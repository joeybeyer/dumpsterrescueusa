import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const publicDir = path.join(root, "public");
const deployDir = path.join(root, "deploy");

const require = createRequire(import.meta.url);
const { locations } = require(path.join(root, "src", "data", "locations.js"));
const { services } = require(path.join(root, "src", "data", "services.js"));
const { redirects } = require(path.join(root, "src", "data", "redirects.js"));
const { brand } = require(path.join(root, "src", "data", "brand.js"));

const ensureDir = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

ensureDir(publicDir);
ensureDir(deployDir);

const url = (pathName) => `${brand.domain}${pathName}`;

const serviceUrls = services.map((service) => `/services/${service.slug}/`);
const locationUrls = locations.map((location) => `/locations/${location.slug}/`);

const staticUrls = [
  "/",
  "/services/",
  "/locations/",
  "/about/",
  "/contact/",
  "/gallery/",
  "/pricing/",
  "/tips-advice/",
  "/privacy-policy/",
  "/refund-policy/",
  "/pricing-policy/",
  "/legal/",
  "/thank-you/"
];

const sitemapUrls = [...staticUrls, ...serviceUrls, ...locationUrls];

const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapUrls
  .map((item) => {
    const loc = url(item);
    return `  <url><loc>${loc}</loc></url>`;
  })
  .join("\n")}
</urlset>
`;

fs.writeFileSync(path.join(publicDir, "sitemap.xml"), sitemapXml);

const robots = `User-agent: *
Allow: /

Sitemap: ${url("/sitemap.xml")}
`;
fs.writeFileSync(path.join(publicDir, "robots.txt"), robots);

const llms = `# Dumpster Rescue USA

About:
Dumpster Rescue USA (Dumpster Rescue LLC) provides junk removal, light demolition, and dumpster rental
services across Chicagoland suburbs in DuPage, Kane, and Cook counties. We are a Bartlett-based team
with an additional service office in Medinah.

Contact:
Phone: ${brand.phone}
Primary location: ${brand.primaryLocation.street}, ${brand.primaryLocation.city}, ${brand.primaryLocation.state} ${brand.primaryLocation.zip}
Service office: ${brand.secondaryLocation.street}, ${brand.secondaryLocation.city}, ${brand.secondaryLocation.state} ${brand.secondaryLocation.zip}
Website: ${brand.domain}

Key pages:
- ${url("/services/")}
- ${url("/locations/")}
- ${url("/services/junk-removal/")}
- ${url("/services/demolition/")}
- ${url("/services/dumpster-rental/")}

Locations:
${locationUrls.map((item) => `- ${url(item)}`).join("\n")}
`;
fs.writeFileSync(path.join(publicDir, "llms.txt"), llms);

const redirectMap = redirects
  .map((item) => `rewrite ^${item.from}$ ${item.to} permanent;`)
  .join("\n");
fs.writeFileSync(path.join(deployDir, "redirects.conf"), redirectMap);

/**
 * kie.ai Image Generation Script — Nano Banana Pro (Gemini 3 Pro Image)
 * Dumpster Rescue LLC
 *
 * Usage:
 *   node scripts/generate-images.mjs --prompt "hero-crew"
 *   node scripts/generate-images.mjs --category hero
 *   node scripts/generate-images.mjs --gallery
 *   node scripts/generate-images.mjs --all
 *   node scripts/generate-images.mjs --list
 *
 * With reference image (logo for branding consistency):
 *   node scripts/generate-images.mjs --prompt "hero-crew" --ref ./public/images/optimized/logo.webp
 *
 * Environment variables:
 *   KIE_API_KEY - Your kie.ai API key (set in .env.local)
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

// ── Load .env.local ──────────────────────────────────────
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const envPath = path.join(root, ".env.local");

if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, "utf-8");
  envContent.split("\n").forEach((line) => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith("#")) {
      const [key, ...valueParts] = trimmed.split("=");
      const value = valueParts.join("=").trim();
      if (key && value && !process.env[key]) {
        process.env[key] = value;
      }
    }
  });
  console.log("  Loaded environment from .env.local");
}

import {
  heroPrompts,
  dumpsterPrompts,
  servicePrompts,
  socialPrompts,
  locationPrompts,
  beforeAfterPairs,
  galleryPairs,
  promptCounts,
} from "./image-prompts.mjs";

const outputDir = path.join(root, "public", "images", "generated");

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// ── kie.ai API configuration ─────────────────────────────
const KIE_API_BASE = "https://api.kie.ai";
const KIE_MODEL = process.env.KIE_MODEL || "nano-banana-pro";
const POLL_INTERVAL = 5000; // 5s between status checks
const MAX_POLL_ATTEMPTS = 60; // Max ~5 minutes of polling

// ── Reference image (logo) for brand consistency ─────────
let referenceImagePath = null;
const refIndex = process.argv.indexOf("--ref");
if (refIndex !== -1 && process.argv[refIndex + 1]) {
  referenceImagePath = path.resolve(process.argv[refIndex + 1]);
  if (!fs.existsSync(referenceImagePath)) {
    console.error(`Reference image not found: ${referenceImagePath}`);
    process.exit(1);
  }
  console.log(`  Reference image: ${referenceImagePath}`);
}

/**
 * Convert a local image file to base64 data URI
 */
function imageToBase64(filePath) {
  const buffer = fs.readFileSync(filePath);
  const ext = path.extname(filePath).slice(1).toLowerCase();
  const mime = ext === "webp" ? "image/webp" : ext === "png" ? "image/png" : "image/jpeg";
  return `data:${mime};base64,${buffer.toString("base64")}`;
}

/**
 * Generate a single image via kie.ai Nano Banana Pro
 * @param {string} prompt - The image generation prompt
 * @param {string} aspectRatio - Aspect ratio (e.g., "16:9", "1:1", "4:3")
 * @param {string} outputName - Output filename (without extension)
 * @returns {Promise<string|null>} - Path to the generated image, or null on failure
 */
async function generateImage(prompt, aspectRatio = "16:9", outputName = "output") {
  const apiKey = process.env.KIE_API_KEY;

  if (!apiKey) {
    console.error("Error: KIE_API_KEY environment variable is required");
    console.log("Set it in .env.local:  KIE_API_KEY=your_key_here");
    process.exit(1);
  }

  console.log(`\n  Generating: ${outputName}`);
  console.log(`   Prompt: ${prompt.substring(0, 100)}...`);
  console.log(`   Aspect Ratio: ${aspectRatio}`);
  console.log(`   Model: ${KIE_MODEL}`);

  try {
    // Build request body per kie.ai docs
    const input = {
      prompt,
      aspect_ratio: aspectRatio,
      resolution: "1K",
      output_format: "png",
    };

    // Add reference image if provided (for logo branding consistency)
    if (referenceImagePath) {
      input.image_input = [imageToBase64(referenceImagePath)];
      console.log(`   Reference: logo attached`);
    }

    // Step 1: Create the task
    console.log("   Creating task...");
    const createResponse = await fetch(`${KIE_API_BASE}/api/v1/jobs/createTask`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({ model: KIE_MODEL, input }),
    });

    if (!createResponse.ok) {
      const error = await createResponse.text();
      throw new Error(`Create Task Error (${createResponse.status}): ${error}`);
    }

    const createResult = await createResponse.json();
    const taskId =
      createResult.data?.taskId ||
      createResult.data?.recordId ||
      createResult.taskId ||
      createResult.task_id ||
      createResult.id;

    if (!taskId) {
      console.log("   Response:", JSON.stringify(createResult, null, 2));
      throw new Error("No task_id in response");
    }

    console.log(`   Task ID: ${taskId}`);

    // Step 2: Poll for completion
    console.log("   Waiting for generation...");
    let attempts = 0;
    let imageUrl = null;

    while (attempts < MAX_POLL_ATTEMPTS) {
      await new Promise((resolve) => setTimeout(resolve, POLL_INTERVAL));
      attempts++;

      const statusResponse = await fetch(
        `${KIE_API_BASE}/api/v1/jobs/recordInfo?taskId=${taskId}`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${apiKey}` },
        }
      );

      if (!statusResponse.ok) {
        console.log(`   Status check failed (attempt ${attempts})`);
        continue;
      }

      const statusResult = await statusResponse.json();
      const data = statusResult.data || statusResult;
      const state = (data.state || data.status || "").toLowerCase();

      if (state === "success" || state === "completed") {
        // Extract image URL from various response formats
        try {
          if (data.resultJson) {
            const resultData =
              typeof data.resultJson === "string"
                ? JSON.parse(data.resultJson)
                : data.resultJson;
            imageUrl = resultData.resultUrls?.[0] || resultData.url || resultData.image_url;
          }
          if (!imageUrl) {
            imageUrl =
              data.resultUrls?.[0] ||
              data.output?.images?.[0]?.url ||
              data.images?.[0]?.url ||
              data.url;
          }
        } catch (e) {
          console.log("   Failed to parse resultJson:", e.message);
        }

        if (imageUrl) {
          console.log(`   Generation complete!`);
          break;
        }
      } else if (state === "fail" || state === "failed" || state === "error") {
        throw new Error(
          `Task failed: ${data.failMsg || data.error || data.message || "Unknown error"}`
        );
      }

      // Still processing
      process.stdout.write(
        `\r   Processing... (${(attempts * POLL_INTERVAL) / 1000}s)   `
      );
    }

    if (!imageUrl) {
      throw new Error("Timed out waiting for image generation");
    }

    // Step 3: Download the image
    console.log("   Downloading image...");
    const imageResponse = await fetch(imageUrl);
    if (!imageResponse.ok) {
      throw new Error(`Failed to download image: ${imageResponse.status}`);
    }

    const imageBuffer = Buffer.from(await imageResponse.arrayBuffer());
    const outputPath = path.join(outputDir, `${outputName}.png`);
    fs.writeFileSync(outputPath, imageBuffer);

    console.log(`   Saved: ${outputPath}`);
    return outputPath;
  } catch (error) {
    console.error(`   Error: ${error.message}`);
    return null;
  }
}

// ── Category generation ──────────────────────────────────
async function generateCategory(category) {
  const categories = {
    hero: heroPrompts,
    dumpster: dumpsterPrompts,
    service: servicePrompts,
    social: socialPrompts,
    location: locationPrompts,
  };

  const prompts = categories[category];
  if (!prompts) {
    console.error(`Unknown category: ${category}`);
    console.log(`Available: ${Object.keys(categories).join(", ")}`);
    process.exit(1);
  }

  console.log(`\n  Generating ${category} images (${Object.keys(prompts).length})...\n`);

  for (const [key, config] of Object.entries(prompts)) {
    await generateImage(config.prompt, config.aspectRatio, config.name);
    await new Promise((resolve) => setTimeout(resolve, 2000));
  }
}

// ── Before/After pairs ───────────────────────────────────
async function generateBeforeAfter() {
  console.log(
    `\n  Generating before/after pairs (${Object.keys(beforeAfterPairs).length} pairs)...\n`
  );

  for (const [key, pair] of Object.entries(beforeAfterPairs)) {
    console.log(`\n  ${key} pair:`);
    await generateImage(pair.before.prompt, pair.before.aspectRatio, pair.before.name);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    await generateImage(pair.after.prompt, pair.after.aspectRatio, pair.after.name);
    await new Promise((resolve) => setTimeout(resolve, 2000));
  }
}

// ── Gallery images ───────────────────────────────────────
async function generateGallery() {
  const pairCount = Object.values(galleryPairs).filter((p) => p.before && p.after).length;
  const singleCount = Object.values(galleryPairs).filter(
    (p) => !p.before && !p.after && p.prompt
  ).length;
  console.log(
    `\n  Generating gallery images (${pairCount} pairs + ${singleCount} singles)...\n`
  );

  for (const [key, item] of Object.entries(galleryPairs)) {
    if (item.before && item.after) {
      console.log(`\n  ${key} (before/after pair):`);
      await generateImage(item.before.prompt, item.before.aspectRatio, item.before.name);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      await generateImage(item.after.prompt, item.after.aspectRatio, item.after.name);
      await new Promise((resolve) => setTimeout(resolve, 2000));
    } else if (item.prompt) {
      console.log(`\n  ${key} (single shot):`);
      await generateImage(item.prompt, item.aspectRatio, item.name);
      await new Promise((resolve) => setTimeout(resolve, 2000));
    }
  }
}

// ── Single prompt ────────────────────────────────────────
async function generateSingle(promptName) {
  const allPrompts = {
    ...heroPrompts,
    ...dumpsterPrompts,
    ...servicePrompts,
    ...socialPrompts,
    ...locationPrompts,
  };

  // Add before/after pairs
  for (const [, pair] of Object.entries(beforeAfterPairs)) {
    allPrompts[pair.before.name] = pair.before;
    allPrompts[pair.after.name] = pair.after;
  }

  // Add gallery items
  for (const [, item] of Object.entries(galleryPairs)) {
    if (item.before && item.after) {
      allPrompts[item.before.name] = item.before;
      allPrompts[item.after.name] = item.after;
    } else if (item.prompt) {
      allPrompts[item.name] = item;
    }
  }

  const config = Object.values(allPrompts).find((p) => p.name === promptName);

  if (!config) {
    console.error(`Unknown prompt: ${promptName}`);
    console.log("\nAvailable prompts:");
    Object.values(allPrompts).forEach((p) => console.log(`  - ${p.name}`));
    process.exit(1);
  }

  await generateImage(config.prompt, config.aspectRatio, config.name);
}

// ── Generate all ─────────────────────────────────────────
async function generateAll() {
  console.log(`\n  Generating ALL images (${promptCounts.total} total)...\n`);

  for (const category of ["hero", "dumpster", "service", "social", "location"]) {
    await generateCategory(category);
  }

  await generateBeforeAfter();
  await generateGallery();

  console.log("\n  All images generated!\n");
}

// ── List all prompts ─────────────────────────────────────
function listPrompts() {
  console.log("\n  Available Image Prompts (Nano Banana Pro):\n");

  console.log("HERO IMAGES:");
  Object.values(heroPrompts).forEach((p) => console.log(`  - ${p.name} (${p.useCase})`));

  console.log("\nDUMPSTER SIZE IMAGES:");
  Object.values(dumpsterPrompts).forEach((p) => console.log(`  - ${p.name} (${p.useCase})`));

  console.log("\nSERVICE PAGE IMAGES:");
  Object.values(servicePrompts).forEach((p) => console.log(`  - ${p.name} (${p.useCase})`));

  console.log("\nSOCIAL / GBP IMAGES:");
  Object.values(socialPrompts).forEach((p) => console.log(`  - ${p.name} (${p.useCase})`));

  console.log("\nLOCATION IMAGES:");
  Object.values(locationPrompts).forEach((p) => console.log(`  - ${p.name} (${p.useCase})`));

  console.log("\nBEFORE/AFTER SERVICE PAIRS:");
  Object.entries(beforeAfterPairs).forEach(([key, pair]) => {
    console.log(`  - ${pair.before.name} / ${pair.after.name} (${pair.useCase})`);
  });

  console.log("\nGALLERY IMAGES:");
  Object.entries(galleryPairs).forEach(([key, item]) => {
    if (item.before && item.after) {
      console.log(`  - ${item.before.name} / ${item.after.name} (${item.useCase})`);
    } else if (item.prompt) {
      console.log(`  - ${item.name} (${item.useCase})`);
    }
  });

  console.log(`\nTotal: ${promptCounts.total} images\n`);
  console.log("Cost estimate: ~$" + (promptCounts.total * 0.10).toFixed(2) + " at $0.10/image\n");
}

// ── CLI ──────────────────────────────────────────────────
const args = process.argv.slice(2).filter((a) => a !== "--ref" && !a.startsWith("./") && !a.startsWith("/") && !a.includes("logo"));

if (args.length === 0 || args.includes("--help") || args.includes("-h")) {
  console.log(`
kie.ai Image Generation — Nano Banana Pro (Gemini 3 Pro Image)
Dumpster Rescue LLC

Usage:
  node scripts/generate-images.mjs [options]

Options:
  --prompt <name>     Generate a single image by prompt name
  --category <name>   Generate all images in a category
                      Categories: hero, dumpster, service, social, location
  --before-after      Generate all before/after service pairs
  --gallery           Generate all gallery images (ProofGallery component)
  --all               Generate ALL images (${promptCounts.total} total)
  --list              List all available prompts with cost estimate
  --ref <path>        Attach reference image (logo) for brand consistency
  --help, -h          Show this help

Examples:
  node scripts/generate-images.mjs --list
  node scripts/generate-images.mjs --prompt hero-crew
  node scripts/generate-images.mjs --gallery --ref ./public/images/optimized/logo.webp
  node scripts/generate-images.mjs --all --ref ./public/images/optimized/logo.webp

Environment:
  KIE_API_KEY    Required. Set in .env.local

Output:
  public/images/generated/
  `);
  process.exit(0);
}

if (args.includes("--list")) {
  listPrompts();
  process.exit(0);
}

if (args.includes("--all")) {
  generateAll();
} else if (args.includes("--gallery")) {
  generateGallery();
} else if (args.includes("--before-after")) {
  generateBeforeAfter();
} else if (args.includes("--category")) {
  const idx = args.indexOf("--category");
  const category = args[idx + 1];
  if (!category) {
    console.error("Error: --category requires a name");
    process.exit(1);
  }
  generateCategory(category);
} else if (args.includes("--prompt")) {
  const idx = args.indexOf("--prompt");
  const promptName = args[idx + 1];
  if (!promptName) {
    console.error("Error: --prompt requires a name");
    process.exit(1);
  }
  generateSingle(promptName);
} else {
  console.error("Unknown arguments. Use --help for usage.");
  process.exit(1);
}


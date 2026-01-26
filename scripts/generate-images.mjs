/**
 * kie.ai Image Generation Script
 * Using nanobanana pro model for Dumpster Rescue USA
 *
 * Usage:
 *   node scripts/generate-images.mjs --prompt "hero-crew"
 *   node scripts/generate-images.mjs --category hero
 *   node scripts/generate-images.mjs --all
 *
 * Environment variables:
 *   KIE_API_KEY - Your kie.ai API key (set in .env.local)
 *
 * API Documentation: https://kie.ai/docs
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

// Load environment variables from .env.local
const __dirname_early = path.dirname(fileURLToPath(import.meta.url));
const root_early = path.resolve(__dirname_early, "..");
const envPath = path.join(root_early, ".env.local");

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
  console.log("✓ Loaded environment from .env.local");
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

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const outputDir = path.join(root, "public", "images", "generated");

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// kie.ai API configuration
const KIE_API_BASE = "https://api.kie.ai";
const KIE_MODEL = "nano-banana-pro";
const POLL_INTERVAL = 3000; // 3 seconds between status checks
const MAX_POLL_ATTEMPTS = 60; // Max 3 minutes of polling

/**
 * Create a task and poll for completion
 * @param {string} prompt - The image generation prompt
 * @param {string} aspectRatio - Aspect ratio (e.g., "16:9", "1:1", "4:3")
 * @param {string} outputName - Output filename (without extension)
 * @returns {Promise<string>} - Path to the generated image
 */
async function generateImage(prompt, aspectRatio = "16:9", outputName = "output") {
  const apiKey = process.env.KIE_API_KEY;

  if (!apiKey) {
    console.error("Error: KIE_API_KEY environment variable is required");
    console.log("Set it in .env.local file");
    process.exit(1);
  }

  console.log(`\n📸 Generating: ${outputName}`);
  console.log(`   Prompt: ${prompt.substring(0, 80)}...`);
  console.log(`   Aspect Ratio: ${aspectRatio}`);
  console.log(`   Model: ${KIE_MODEL}`);

  try {
    // Step 1: Create the task
    console.log("   ⏳ Creating task...");
    const createResponse = await fetch(`${KIE_API_BASE}/api/v1/jobs/createTask`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: KIE_MODEL,
        input: {
          prompt: prompt,
          aspect_ratio: aspectRatio,
          num_images: 1,
        },
      }),
    });

    if (!createResponse.ok) {
      const error = await createResponse.text();
      throw new Error(`Create Task Error (${createResponse.status}): ${error}`);
    }

    const createResult = await createResponse.json();
    const taskId = createResult.data?.taskId ||
                   createResult.data?.recordId ||
                   createResult.taskId ||
                   createResult.task_id ||
                   createResult.id;

    if (!taskId) {
      console.log("   Response:", JSON.stringify(createResult, null, 2));
      throw new Error("No task_id in response");
    }

    console.log(`   📋 Task ID: ${taskId}`);

    // Step 2: Poll for completion using recordInfo endpoint
    console.log("   ⏳ Waiting for generation...");
    let attempts = 0;
    let imageUrl = null;

    while (attempts < MAX_POLL_ATTEMPTS) {
      await new Promise((resolve) => setTimeout(resolve, POLL_INTERVAL));
      attempts++;

      const statusResponse = await fetch(`${KIE_API_BASE}/api/v1/jobs/recordInfo?taskId=${taskId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      });

      if (!statusResponse.ok) {
        console.log(`   ⚠️ Status check failed (attempt ${attempts})`);
        continue;
      }

      const statusResult = await statusResponse.json();
      const data = statusResult.data || statusResult;
      const state = data.state || data.status;

      if (state === "success" || state === "completed" || state === "SUCCESS" || state === "COMPLETED") {
        // Parse resultJson to get image URLs
        // resultJson format: {"resultUrls":["https://example.com/generated-image.jpg"]}
        try {
          if (data.resultJson) {
            const resultData = typeof data.resultJson === "string"
              ? JSON.parse(data.resultJson)
              : data.resultJson;
            imageUrl = resultData.resultUrls?.[0] || resultData.url || resultData.image_url;
          }
          // Fallback to other possible locations
          if (!imageUrl) {
            imageUrl = data.resultUrls?.[0] ||
                       data.output?.images?.[0]?.url ||
                       data.images?.[0]?.url ||
                       data.url;
          }
        } catch (e) {
          console.log("   ⚠️ Failed to parse resultJson:", e.message);
        }

        if (imageUrl) {
          console.log(`\n   ✓ Generation complete!`);
          break;
        }
      } else if (state === "failed" || state === "FAILED" || state === "error") {
        throw new Error(`Task failed: ${data.failMsg || data.error || data.message || "Unknown error"}`);
      }

      // Still processing
      process.stdout.write(`\r   ⏳ Processing... (${attempts * POLL_INTERVAL / 1000}s)   `);
    }

    if (!imageUrl) {
      throw new Error("Timed out waiting for image generation");
    }

    // Step 3: Download the image
    console.log("   ⬇️ Downloading image...");
    const imageResponse = await fetch(imageUrl);
    if (!imageResponse.ok) {
      throw new Error(`Failed to download image: ${imageResponse.status}`);
    }

    const imageBuffer = Buffer.from(await imageResponse.arrayBuffer());
    const outputPath = path.join(outputDir, `${outputName}.png`);
    fs.writeFileSync(outputPath, imageBuffer);

    console.log(`   ✅ Saved: ${outputPath}`);
    return outputPath;
  } catch (error) {
    console.error(`\n   ❌ Error: ${error.message}`);
    return null;
  }
}

/**
 * Generate images for a specific category
 * @param {string} category - Category name (hero, dumpster, service, social, location)
 */
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
    console.log(`Available categories: ${Object.keys(categories).join(", ")}`);
    process.exit(1);
  }

  console.log(`\n🎨 Generating ${category} images (${Object.keys(prompts).length} images)...\n`);

  for (const [key, config] of Object.entries(prompts)) {
    await generateImage(config.prompt, config.aspectRatio, config.name);
    // Add delay between requests to respect rate limits
    await new Promise((resolve) => setTimeout(resolve, 2000));
  }
}

/**
 * Generate before/after pairs
 */
async function generateBeforeAfter() {
  console.log(`\n🎨 Generating before/after pairs (${Object.keys(beforeAfterPairs).length} pairs)...\n`);

  for (const [key, pair] of Object.entries(beforeAfterPairs)) {
    console.log(`\n📁 ${key} pair:`);
    await generateImage(pair.before.prompt, pair.before.aspectRatio, pair.before.name);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    await generateImage(pair.after.prompt, pair.after.aspectRatio, pair.after.name);
    await new Promise((resolve) => setTimeout(resolve, 2000));
  }
}

/**
 * Generate gallery images (before/after pairs and single shots)
 */
async function generateGallery() {
  const pairCount = Object.values(galleryPairs).filter(p => p.before && p.after).length;
  const singleCount = Object.values(galleryPairs).filter(p => !p.before && !p.after && p.prompt).length;
  console.log(`\n🎨 Generating gallery images (${pairCount} pairs + ${singleCount} single shots)...\n`);

  for (const [key, item] of Object.entries(galleryPairs)) {
    // Check if it's a before/after pair or single image
    if (item.before && item.after) {
      console.log(`\n📁 ${key} (before/after pair):`);
      await generateImage(item.before.prompt, item.before.aspectRatio, item.before.name);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      await generateImage(item.after.prompt, item.after.aspectRatio, item.after.name);
      await new Promise((resolve) => setTimeout(resolve, 2000));
    } else if (item.prompt) {
      // Single image
      console.log(`\n📸 ${key} (single shot):`);
      await generateImage(item.prompt, item.aspectRatio, item.name);
      await new Promise((resolve) => setTimeout(resolve, 2000));
    }
  }
}

/**
 * Generate a single prompt by name
 * @param {string} promptName - The prompt name (e.g., "hero-crew")
 */
async function generateSingle(promptName) {
  // Search all categories for the prompt
  const allPrompts = {
    ...heroPrompts,
    ...dumpsterPrompts,
    ...servicePrompts,
    ...socialPrompts,
    ...locationPrompts,
  };

  // Also check before/after prompts
  for (const [key, pair] of Object.entries(beforeAfterPairs)) {
    allPrompts[pair.before.name] = pair.before;
    allPrompts[pair.after.name] = pair.after;
  }

  // Also check gallery prompts (before/after pairs and single shots)
  for (const [key, item] of Object.entries(galleryPairs)) {
    if (item.before && item.after) {
      allPrompts[item.before.name] = item.before;
      allPrompts[item.after.name] = item.after;
    } else if (item.prompt) {
      allPrompts[item.name] = item;
    }
  }

  // Find by name property
  const config = Object.values(allPrompts).find((p) => p.name === promptName);

  if (!config) {
    console.error(`Unknown prompt: ${promptName}`);
    console.log("\nAvailable prompts:");
    Object.values(allPrompts).forEach((p) => console.log(`  - ${p.name}`));
    process.exit(1);
  }

  await generateImage(config.prompt, config.aspectRatio, config.name);
}

/**
 * Generate all images
 */
async function generateAll() {
  console.log(`\n🚀 Generating ALL images (${promptCounts.total} total)...\n`);
  console.log("This may take a while. Grab a coffee! ☕\n");

  const categories = ["hero", "dumpster", "service", "social", "location"];

  for (const category of categories) {
    await generateCategory(category);
  }

  await generateBeforeAfter();
  await generateGallery();

  console.log("\n✨ All images generated!\n");
}

/**
 * List all available prompts
 */
function listPrompts() {
  console.log("\n📋 Available Image Prompts:\n");

  console.log("HERO IMAGES:");
  Object.values(heroPrompts).forEach((p) => console.log(`  - ${p.name} (${p.useCase})`));

  console.log("\nDUMPSTER IMAGES:");
  Object.values(dumpsterPrompts).forEach((p) => console.log(`  - ${p.name} (${p.useCase})`));

  console.log("\nSERVICE IMAGES:");
  Object.values(servicePrompts).forEach((p) => console.log(`  - ${p.name} (${p.useCase})`));

  console.log("\nSOCIAL/GBP IMAGES:");
  Object.values(socialPrompts).forEach((p) => console.log(`  - ${p.name} (${p.useCase})`));

  console.log("\nLOCATION IMAGES:");
  Object.values(locationPrompts).forEach((p) => console.log(`  - ${p.name} (${p.useCase})`));

  console.log("\nBEFORE/AFTER PAIRS:");
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
}

// CLI argument handling
const args = process.argv.slice(2);

if (args.length === 0 || args.includes("--help") || args.includes("-h")) {
  console.log(`
kie.ai Image Generation Script for Dumpster Rescue USA
Using nanobanana pro model

Usage:
  node scripts/generate-images.mjs [options]

Options:
  --prompt <name>     Generate a single image by prompt name
  --category <name>   Generate all images in a category
                      Categories: hero, dumpster, service, social, location
  --before-after      Generate all before/after pairs
  --gallery           Generate all gallery images (for ProofGallery component)
  --all               Generate ALL images (${promptCounts.total} total)
  --list              List all available prompts
  --help, -h          Show this help message

Examples:
  node scripts/generate-images.mjs --prompt hero-crew
  node scripts/generate-images.mjs --category social
  node scripts/generate-images.mjs --before-after
  node scripts/generate-images.mjs --gallery
  node scripts/generate-images.mjs --all

Environment:
  KIE_API_KEY         Required. Your kie.ai API key.
                      Set with: export KIE_API_KEY=your_key_here

Output:
  Images are saved to: public/images/generated/
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
  const categoryIndex = args.indexOf("--category");
  const category = args[categoryIndex + 1];
  if (!category) {
    console.error("Error: --category requires a category name");
    process.exit(1);
  }
  generateCategory(category);
} else if (args.includes("--prompt")) {
  const promptIndex = args.indexOf("--prompt");
  const promptName = args[promptIndex + 1];
  if (!promptName) {
    console.error("Error: --prompt requires a prompt name");
    process.exit(1);
  }
  generateSingle(promptName);
} else {
  console.error("Unknown arguments. Use --help for usage information.");
  process.exit(1);
}

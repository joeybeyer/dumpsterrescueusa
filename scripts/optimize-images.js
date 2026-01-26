const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const INPUT_DIR = path.join(__dirname, '../public/images/generated');
const OUTPUT_DIR = path.join(__dirname, '../public/images/optimized');

// Configuration
const CONFIG = {
  webp: {
    quality: 80,
    effort: 6, // 0-6, higher = slower but better compression
  },
  jpeg: {
    quality: 80,
    mozjpeg: true,
  },
  // Max dimensions for different image types
  maxDimensions: {
    hero: { width: 1200, height: 800 },
    gallery: { width: 800, height: 600 },
    default: { width: 1000, height: 800 },
  },
};

// Determine image type from filename
function getImageType(filename) {
  const lower = filename.toLowerCase();
  if (lower.includes('hero')) return 'hero';
  if (lower.includes('gallery') || lower.includes('before') || lower.includes('after')) return 'gallery';
  return 'default';
}

// Get max dimensions for image type
function getMaxDimensions(filename) {
  const type = getImageType(filename);
  return CONFIG.maxDimensions[type];
}

// Format bytes to human readable
function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

async function optimizeImage(inputPath, outputPath, filename) {
  const { width: maxWidth, height: maxHeight } = getMaxDimensions(filename);

  try {
    const inputStats = fs.statSync(inputPath);
    const inputSize = inputStats.size;

    // Get image metadata
    const metadata = await sharp(inputPath).metadata();

    // Calculate resize dimensions maintaining aspect ratio
    let resizeOptions = {};
    if (metadata.width > maxWidth || metadata.height > maxHeight) {
      resizeOptions = {
        width: maxWidth,
        height: maxHeight,
        fit: 'inside',
        withoutEnlargement: true,
      };
    }

    // Convert to WebP
    const webpPath = outputPath.replace(/\.(png|jpg|jpeg)$/i, '.webp');
    await sharp(inputPath)
      .resize(resizeOptions)
      .webp(CONFIG.webp)
      .toFile(webpPath);

    const webpStats = fs.statSync(webpPath);
    const webpSize = webpStats.size;
    const savings = ((inputSize - webpSize) / inputSize * 100).toFixed(1);

    console.log(`✓ ${filename}`);
    console.log(`  Original: ${formatBytes(inputSize)} (${metadata.width}x${metadata.height})`);
    console.log(`  WebP: ${formatBytes(webpSize)} (${savings}% smaller)\n`);

    return {
      filename,
      originalSize: inputSize,
      webpSize,
      savings: parseFloat(savings),
    };
  } catch (error) {
    console.error(`✗ Error processing ${filename}:`, error.message);
    return null;
  }
}

async function main() {
  console.log('🖼️  Image Optimization Script\n');
  console.log('Input directory:', INPUT_DIR);
  console.log('Output directory:', OUTPUT_DIR);
  console.log('');

  // Create output directory if it doesn't exist
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    console.log('Created output directory\n');
  }

  // Get all PNG and JPG files
  const files = fs.readdirSync(INPUT_DIR).filter(file =>
    /\.(png|jpg|jpeg)$/i.test(file)
  );

  if (files.length === 0) {
    console.log('No images found to optimize.');
    return;
  }

  console.log(`Found ${files.length} images to optimize\n`);
  console.log('─'.repeat(50) + '\n');

  const results = [];
  for (const file of files) {
    const inputPath = path.join(INPUT_DIR, file);
    const outputPath = path.join(OUTPUT_DIR, file);
    const result = await optimizeImage(inputPath, outputPath, file);
    if (result) results.push(result);
  }

  // Summary
  console.log('─'.repeat(50));
  console.log('\n📊 Summary\n');

  const totalOriginal = results.reduce((sum, r) => sum + r.originalSize, 0);
  const totalWebp = results.reduce((sum, r) => sum + r.webpSize, 0);
  const totalSavings = ((totalOriginal - totalWebp) / totalOriginal * 100).toFixed(1);

  console.log(`Images processed: ${results.length}`);
  console.log(`Original total: ${formatBytes(totalOriginal)}`);
  console.log(`WebP total: ${formatBytes(totalWebp)}`);
  console.log(`Total savings: ${formatBytes(totalOriginal - totalWebp)} (${totalSavings}%)`);
  console.log(`\nOptimized images saved to: ${OUTPUT_DIR}`);
}

main().catch(console.error);

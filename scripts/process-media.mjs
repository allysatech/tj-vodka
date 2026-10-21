import sharp from "sharp";
import fs from "fs/promises";
import path from "path";

const ROOT = process.cwd();
const ORIGINALS_DIR = path.join(ROOT, "public", "media", "originals");
const BW_DIR = path.join(ROOT, "public", "media", "bw");

async function ensureDirs() {
  await fs.mkdir(BW_DIR, { recursive: true });
}

/**
 * Creates a clean transparent cutout of the TJ Vodka bottle from product01.jpg.
 * product01.jpg is 1301 x 2048 on a pure black studio backdrop.
 * We identify the bottle bounding box, mask out the pure black exterior while
 * preserving the crisp silver rim-light and glass base, and output a >=1600px tall transparent PNG & WebP.
 */
async function createBottleCutout() {
  const inputPath = path.join(ORIGINALS_DIR, "m01-product01-packshot.jpg");
  const image = sharp(inputPath).grayscale();
  const { data, info } = await image
    .raw()
    .toBuffer({ resolveWithObject: true });

  const width = info.width;
  const height = info.height;
  const rgba = Buffer.alloc(width * height * 4);

  // First pass: find horizontal center and bottle bounds per row
  // The bottle is centered horizontally in the 1301x2048 frame.
  let minX = width, maxX = 0, minY = height, maxY = 0;

  for (let y = 0; y < height; y++) {
    let rowLeft = -1;
    let rowRight = -1;
    // Scan from left to center and right to center to find outer rim highlight of the bottle
    for (let x = Math.floor(width * 0.18); x < Math.floor(width * 0.82); x++) {
      const lum = data[y * width + x];
      if (lum > 16) {
        rowLeft = x;
        break;
      }
    }
    for (let x = Math.floor(width * 0.82); x >= Math.floor(width * 0.18); x--) {
      const lum = data[y * width + x];
      if (lum > 16) {
        rowRight = x;
        break;
      }
    }

    if (rowLeft !== -1 && rowRight !== -1 && rowRight - rowLeft > 25) {
      if (rowLeft < minX) minX = rowLeft;
      if (rowRight > maxX) maxX = rowRight;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;

      for (let x = 0; x < width; x++) {
        const idx = (y * width + x) * 4;
        const lum = data[y * width + x];
        if (x >= rowLeft && x <= rowRight) {
          // Inside the bottle silhouette: keep opaque, slightlyfeathering the 2px outer edge
          const distEdge = Math.min(x - rowLeft, rowRight - x);
          let alpha = 255;
          if (distEdge === 0) alpha = Math.min(255, lum * 6);
          else if (distEdge === 1) alpha = Math.min(255, Math.max(180, lum * 8));
          // Slightly lift midtones/highlights for crisp monochrome separation
          const cleanLum = Math.min(255, Math.round(Math.pow(lum / 255, 0.92) * 255));
          rgba[idx] = cleanLum;
          rgba[idx + 1] = cleanLum;
          rgba[idx + 2] = cleanLum;
          rgba[idx + 3] = alpha;
        } else if (x >= rowLeft - 3 && x <= rowRight + 3 && lum > 10) {
          // Soft anti-aliased edge
          const cleanLum = lum;
          rgba[idx] = cleanLum;
          rgba[idx + 1] = cleanLum;
          rgba[idx + 2] = cleanLum;
          rgba[idx + 3] = Math.min(160, lum * 4);
        } else {
          rgba[idx] = 0;
          rgba[idx + 1] = 0;
          rgba[idx + 2] = 0;
          rgba[idx + 3] = 0;
        }
      }
    }
  }

  // Crop with generous padding around the bottle, maintaining >1800px height
  const padX = 60;
  const padY = 40;
  const cropLeft = Math.max(0, minX - padX);
  const cropTop = Math.max(0, minY - padY);
  const cropWidth = Math.min(width - cropLeft, maxX - minX + padX * 2);
  const cropHeight = Math.min(height - cropTop, maxY - minY + padY * 2);

  console.log(`Bottle cutout bounds: ${cropWidth}x${cropHeight} (from ${width}x${height})`);

  const cutoutSharp = sharp(rgba, {
    raw: { width, height, channels: 4 },
  }).extract({
    left: cropLeft,
    top: cropTop,
    width: cropWidth,
    height: cropHeight,
  });

  await cutoutSharp
    .clone()
    .png({ compressionLevel: 9 })
    .toFile(path.join(BW_DIR, "m01-bottle-cutout.png"));

  await cutoutSharp
    .clone()
    .webp({ quality: 92, alphaQuality: 95 })
    .toFile(path.join(BW_DIR, "m01-bottle-cutout.webp"));

  // Also save M04 and M10 clean packshot aliases/versions
  await cutoutSharp
    .clone()
    .png({ compressionLevel: 9 })
    .toFile(path.join(BW_DIR, "m04-bottle-clean.png"));

  await cutoutSharp
    .clone()
    .png({ compressionLevel: 9 })
    .toFile(path.join(BW_DIR, "m10-shop-packshot.png"));
}

async function convertBrandPhotosToMonochrome() {
  const jobs = [
    {
      in: "m01-product01-packshot.jpg",
      out: "m01-product01-bw.jpg",
      gamma: 1.05,
    },
    {
      in: "m03-image-6-story-beach.jpg",
      out: "m03-story-beach-bw.jpg",
      gamma: 1.08,
    },
    {
      in: "m03-story-bg-image2.jpg",
      out: "m03-story-bg-image2-bw.jpg",
      gamma: 1.0,
    },
    {
      in: "m04-image-4-serve-composite.jpg",
      out: "m04-serve-reference-bw.jpg",
      gamma: 1.05,
    },
    {
      in: "m05-image-2-campaign.jpg",
      out: "m05-campaign-wide-bw.jpg",
      gamma: 1.0,
    },
    {
      in: "m06-image-3-atmosphere-shelves.jpg",
      out: "m06-atmosphere-shelves-bw.jpg",
      gamma: 1.12,
    },
    {
      in: "m07-image-5-culture-sneakers.jpg",
      out: "m07-culture-sneakers-bw.jpg",
      gamma: 1.05,
    },
    {
      in: "m08-image-4-main-lounge.jpg",
      out: "m08-main-lounge-bw.jpg",
      gamma: 1.06,
    },
    {
      in: "m09-image-8-venue-bar.jpg",
      out: "m09-venue-bar-bw.jpg",
      gamma: 1.12,
    },
    {
      in: "m10-product-back-packshot.jpg",
      out: "m10-product-back-bw.jpg",
      gamma: 1.05,
    },
    {
      in: "m10-product-studio.png",
      out: "m10-product-studio-bw.jpg",
      gamma: 1.05,
    },
    {
      in: "m10-product-martini.jpg",
      out: "m10-product-martini-bw.jpg",
      gamma: 1.05,
    },
  ];

  for (const job of jobs) {
    const inFile = path.join(ORIGINALS_DIR, job.in);
    const outFile = path.join(BW_DIR, job.out);
    await sharp(inFile)
      .grayscale()
      .gamma(job.gamma)
      .normalise({ lower: 1, upper: 99 })
      .jpeg({ quality: 90, chromaSubsampling: "4:4:4" })
      .toFile(outFile);
    console.log(`Processed neutral B&W: ${job.out}`);
  }

  // Generate M02 static poster (1920x1080 neutral studio light backdrop, no text or bottle baked in)
  const posterWidth = 1920;
  const posterHeight = 1080;
  const posterBuf = Buffer.alloc(posterWidth * posterHeight * 3);
  for (let y = 0; y < posterHeight; y++) {
    for (let x = 0; x < posterWidth; x++) {
      const nx = (x / posterWidth - 0.5) * 2;
      const ny = (y / posterHeight - 0.42) * 2;
      const dist = Math.sqrt(nx * nx * 0.85 + ny * ny * 1.15);
      // Soft neutral studio spotlight from #2C2C2C center to #080808 edges
      const falloff = Math.max(0, 1 - dist * 0.95);
      const val = Math.round(8 + Math.pow(falloff, 2.2) * 38);
      const idx = (y * posterWidth + x) * 3;
      posterBuf[idx] = val;
      posterBuf[idx + 1] = val;
      posterBuf[idx + 2] = val;
    }
  }
  await sharp(posterBuf, {
    raw: { width: posterWidth, height: posterHeight, channels: 3 },
  })
    .jpeg({ quality: 90 })
    .toFile(path.join(BW_DIR, "m02-studio-light-poster.jpg"));
  console.log("Generated M02 studio light poster: m02-studio-light-poster.jpg");
}

await ensureDirs();
await createBottleCutout();
await convertBrandPhotosToMonochrome();

import sharp from "sharp";
import fs from "fs";
import path from "path";

const inputDir = "./src/assets/covers";
const outputDir = "./public/covers";

// ensure output folder exists
fs.mkdirSync(outputDir, { recursive: true });

// supported input formats
const allowed = [".png", ".jpg", ".jpeg", ".webp"];

async function optimize() {
  const files = fs.readdirSync(inputDir);

  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    if (!allowed.includes(ext)) continue;

    const inputPath = path.join(inputDir, file);

    const outputName = file.replace(ext, ".webp");
    const outputPath = path.join(outputDir, outputName);

    console.log(`→ Optimizing ${file}`);

    await sharp(inputPath)
      .resize(512)
      .webp({ quality: 100 })
      .toFile(outputPath);
  }

  console.log("✔ All images optimized!");
}

optimize();

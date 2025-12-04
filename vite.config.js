import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
})


import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const inputDir = './src/assets/covers';
const outputDir = './public/covers';

fs.mkdirSync(outputDir, { recursive: true });

fs.readdirSync(inputDir).forEach(async file => {
    const inputPath = path.join(inputDir, file);
    const outputPath = path.join(outputDir, file.split('.')[0] + '.webp');

    await sharp(inputPath)
        .resize(800)      // width
        .webp({ quality: 70 })
        .toFile(outputPath);

    console.log(`Optimized: ${file}`);
});

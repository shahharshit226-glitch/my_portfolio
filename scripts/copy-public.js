// scripts/copy-public.js
// Copies public/ folder contents to dist/ after build

import fs from 'fs';
import path from 'path';

const publicDir = path.resolve('public');
const distDir = path.resolve('dist');

function copyRecursive(src, dest) {
  if (!fs.existsSync(src)) return;

  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      fs.mkdirSync(destPath, { recursive: true });
      copyRecursive(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
      console.log(`Copied: ${entry.name} -> dist/`);
    }
  }
}

if (fs.existsSync(distDir)) {
  copyRecursive(publicDir, distDir);
  console.log('✅ Public assets copied to dist/');
} else {
  console.error('❌ dist/ folder not found. Run build first.');
  process.exit(1);
}
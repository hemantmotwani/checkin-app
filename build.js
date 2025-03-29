import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Create output directory
const outputDir = path.join(__dirname, 'dist');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Build UI
console.log('Building UI...');
exec('cd ui && npm install && npm run build', (error, stdout, stderr) => {
  if (error) {
    console.error(`UI build error: ${error}`);
    return;
  }
  console.log('UI build output:', stdout);
  
  // Copy UI build to output directory
  console.log('Copying UI build to output directory...');
  copyDir(path.join(__dirname, 'ui/dist'), outputDir);
  
  // Copy server files
  console.log('Copying server files...');
  if (!fs.existsSync(path.join(outputDir, 'service'))) {
    fs.mkdirSync(path.join(outputDir, 'service'), { recursive: true });
  }
  
  copyDir(path.join(__dirname, 'service'), path.join(outputDir, 'service'));
  
  // Create a minimal package.json for Vercel
  const pkg = {
    "name": "checkin-app",
    "version": "1.0.0",
    "engines": {
      "node": "18.x"
    },
    "scripts": {
      "start": "node service/src/index.js"
    }
  };
  
  fs.writeFileSync(path.join(outputDir, 'package.json'), JSON.stringify(pkg, null, 2));
  
  // Copy vercel.json to output directory
  fs.copyFileSync(
    path.join(__dirname, 'vercel.json'),
    path.join(outputDir, 'vercel.json')
  );
  
  console.log('Build completed successfully!');
});

// Helper function to copy directories
function copyDir(src, dest) {
  const entries = fs.readdirSync(src, { withFileTypes: true });
  
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    
    if (entry.name === 'node_modules' || entry.name === '.git') {
      continue;
    }
    
    if (entry.isDirectory()) {
      if (!fs.existsSync(destPath)) {
        fs.mkdirSync(destPath, { recursive: true });
      }
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Get the backend URL from environment variables or use default
const backendUrl = process.env.VITE_BACKEND_URL || 'https://checkin-app.vercel.app';

console.log(`Building with backend URL: ${backendUrl}`);

// Ensure environment variables are set in all necessary locations
const envContent = `VITE_BACKEND_URL=${backendUrl}`;

// Write to root .env
fs.writeFileSync('.env', envContent);
console.log('Updated root .env file');

// Write to ui/.env
fs.writeFileSync('ui/.env', envContent);
console.log('Updated ui/.env file');

// Write to ui/.env.production
fs.writeFileSync('ui/.env.production', envContent);
console.log('Updated ui/.env.production file');

// Build the UI with Vite
console.log('Building UI with Vite...');
try {
  execSync('cd ui && npm run build', { stdio: 'inherit' });
  console.log('Vite build completed successfully');
} catch (error) {
  console.error('Vite build failed:', error);
  process.exit(1);
}

console.log('Build completed successfully');

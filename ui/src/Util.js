// import * as dotenv from 'dotenv'
// dotenv.config();

let backendUrl;
// const backendUrl = process.env.BASE_URL || `https://${process.env.VERCEL_URL}`;
console.log('Printing import.meta.env');
console.log(import.meta.env);
try {
  // Try to get the URL from Vite's define replacement
  console.log('backendUrl:', backendUrl);
  backendUrl = import.meta.env.VITE_BACKEND_URL;
  console.log('Using Vite backend URL:', backendUrl);
} catch (e) {
  // Fallback for production or if define replacement fails
  console.log(e);
  console.log('Vite backend URL not available, using fallback');
  backendUrl = 'http://localhost:3000';
}
console.log('backendUrl:', backendUrl);

export { backendUrl };
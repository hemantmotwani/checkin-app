let backendUrl;
try {
  // Try to get the URL from Vite's define replacement
  backendUrl = __VITE_BACKEND_URL__;
  console.log('Using Vite backend URL:', backendUrl);
} catch (e) {
  // Fallback for production or if define replacement fails
  console.log('Vite backend URL not available, using fallback');
  backendUrl = 'http://localhost:3000';
}

export { backendUrl };
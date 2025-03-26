const scanner = new Html5QrcodeScanner('qr-reader', {
  qrbox: 250,
  fps: 10,
});

// Function to handle QR code data
const handleQRCodeData = (qrCodeData) => {
  document.getElementById('result').innerText = `Scanned: ${qrCodeData}`;
  
  // Send data to the backend
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
  
  fetch(`${backendUrl}/checkin`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ qrData: qrCodeData }),
  })
  .then(response => response.json())
  .then(data => alert(data.message))
  .catch(error => console.error(error));
};

// Render the QR code scanner (hidden for PC testing)
scanner.render((qrCodeData) => {
  handleQRCodeData(qrCodeData);
});

// Manual QR code entry
document.getElementById('manual-submit-btn').addEventListener('click', () => {
  const qrCodeData = document.getElementById('manual-qr-input').value;
  if (qrCodeData) {
    handleQRCodeData(qrCodeData);
  } else {
    alert('Please enter a QR code.');
  }
});

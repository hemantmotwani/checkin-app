import { backendUrl } from './Util.js'; // Import the backend URL


// Function to handle QR code data
const handleQRCodeData = (qrCodeData) => {
  document.getElementById('result').innerText = `Scanned: ${qrCodeData}`;
  
  fetch(`${backendUrl}/checkin`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ qrData: qrCodeData }),
  })
  .then(response => response.json())
  .then(data => alert(data.message))
  .catch(error => console.error(error));
};


// Manual QR code entry
document.getElementById('manual-submit-btn').addEventListener('click', () => {
  const qrCodeData = document.getElementById('manual-qr-input').value;
  if (qrCodeData) {
    handleQRCodeData(qrCodeData);
  } else {
    alert('Please enter a QR code.');
  }
});

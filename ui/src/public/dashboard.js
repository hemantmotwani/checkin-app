import { backendUrl } from './Util.js'; // Import the backend URL


const fetchCheckIns = async () => {
    try {
    //   const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3000'; 
      const response = await fetch(`${backendUrl}/dashboard`);
      const checkins = await response.json();
      const tableBody = document.getElementById('checkins');
      tableBody.innerHTML = checkins.map(checkin => `
        <tr>
          <td>${checkin.clientId}</td>
          <td>${checkin.clientFirstName}</td>
          <td>${checkin.clientLastName}</td>
          <td>${checkin.clientAddress}</td>
          <td>${checkin.clientCity}</td>
          <td>${checkin.clientState}</td>
          <td>${checkin.clientPostal}</td>
          <td>${checkin.clientPhone}</td>
          <td>${checkin.clientEmail}</td>
          <td>${checkin.checkInTime}</td>
        </tr>
      `).join('');
    } catch (error) {
      console.error('Error fetching check-ins:', error);
    }
  };
  export { fetchCheckIns }
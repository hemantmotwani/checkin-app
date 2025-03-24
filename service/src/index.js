const express = require('express');
const admin = require('firebase-admin');
const cors = require('cors');

// Initialize Firebase
const serviceAccount = require('../resources/serviceAccountKey.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
const app = express();
app.use(cors());
app.use(express.json());

// Check-in endpoint
app.post('/checkin', async (req, res) => {
  const { qrData } = req.body;
  try {
    // Check if the client exists
    const clientRef = db.collection('Client_Details').doc(qrData);
    const clientDoc = await clientRef.get();
    if (!clientDoc.exists) {
      return res.status(404).json({ message: 'Client not found.' });
    }
    const client_checkin_data = {
      client_Id: qrData,
      ltf_Id: qrData,
      checkin_time: Date.now()
    };
    // Add the check-in to the checkins collection
    await db.collection('Client_CheckIns').doc(client_checkin_data.client_Id).set(client_checkin_data);
    res.json({ message: `Client ${qrData} checked in successfully.` });
  } catch (error) {
    console.error("Error checking in client:", error);
    res.status(500).json({ message: 'Error checking in client.' });
  }
});

// Dashboard endpoint
app.get('/dashboard', async (req, res) => {
  try {
    const checkinsSnapshot = await db.collection('Client_CheckIns').get();
    // console.log(checkinsSnapshot);
    const checkins = [];
    for (const doc of checkinsSnapshot.docs) {
      const checkinData = doc.data();
      // console.log(checkinData);
      // console.log(checkinData.client_Id);
      const clientRef = db.collection('Client_Details').doc(checkinData.client_Id);
      // console.log(clientRef);
      const clientDoc = await clientRef.get();
      // console.log(checkinData);
      if (clientDoc.exists) {
        checkins.push({
          clientId: checkinData.client_Id,
          ltfId: checkinData.ltf_Id,
          clientFirstName: clientDoc.data().first_name,
          clientLastName: clientDoc.data().last_name,
          clientAddress: clientDoc.data().address,
          clientCity: clientDoc.data().city,
          clientState: clientDoc.data().state,
          clientPostal: clientDoc.data().postal,
          clientPhone: clientDoc.data().phone,
          clientEmail: clientDoc.data().email,
          checkInTime: checkinData.checkin_time.toDate().toLocaleString('en-US', { timeZone: 'America/Chicago' })
        });
      }
    }
    // console.log(checkins);
    res.json(checkins);
  } catch (error) {
    console.error("Error fetching check-ins:", error);
    res.status(500).json({ message: 'Error fetching check-ins.' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
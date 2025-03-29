import express from 'express';
import admin from 'firebase-admin';
import cors from 'cors';

import * as dotenv from 'dotenv'
dotenv.config();

import firebaseAdmin from "firebase-admin";

const serviceAccount = {
  type: "service_account",
  project_id: process.env.FIREBASE_PROJECT_ID,
  private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
  private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'), // Fixes newlines
  client_email: process.env.FIREBASE_CLIENT_EMAIL,
  client_id: process.env.FIREBASE_CLIENT_ID,
  auth_uri: process.env.FIREBASE_AUTH_URI,
  token_uri: process.env.FIREBASE_TOKEN_URI,
  auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_CERT_URL,
  client_x509_cert_url: process.env.FIREBASE_CLIENT_CERT_URL,
};

if (!firebaseAdmin.apps.length) {
  firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(serviceAccount),
  });
}

export default firebaseAdmin;


// // Initialize Firebase
// const serviceAccount = require('../resources/serviceAccountKey.json');
// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
// });

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
      checkin_Id: qrData + Date.now(),
      client_Id: qrData,
      ltf_Id: qrData,
      checkin_time: Date.now()
    };
    console.log(client_checkin_data);
    // Add the check-in to the checkins collection
    await db.collection('Client_CheckIns').doc(client_checkin_data.checkin_Id).set(client_checkin_data);
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
          checkInTime: new Intl.DateTimeFormat('en-US', {
            timeZone: 'America/Chicago', // Chicago timezone
            month: 'numeric', // month as number (e.g., 3)
            day: 'numeric', // day as number (e.g., 26)
            year: 'numeric', // year as number (e.g., 2025)
            hour: '2-digit', // hour with 2 digits (e.g., 5)
            minute: '2-digit', // minute with 2 digits (e.g., 30)
            second: '2-digit', // second with 2 digits (e.g., 15)
            hour12: true, // 12-hour format (AM/PM)
          }).format(new Date(checkinData.checkin_time))
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
  process.env.NODE_ENV === 'production' ? console.log(`Server running on https://checkin-app-five.vercel.app`) : console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Server running on http://localhost:${PORT}`);
});
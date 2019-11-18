import Firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyAFMl5MZ5HYuvKa8qtAnafaWC-FKHiNeoo',
  authDomain: 'ai-food-tracker.firebaseapp.com',
  databaseURL: 'https://ai-food-tracker.firebaseio.com',
  projectId: 'ai-food-tracker',
  storageBucket: 'ai-food-tracker.appspot.com',
  messagingSenderId: '32448871985',
  appId: '1:32448871985:web:a1e10d85df1767415c9f10',
  measurementId: 'G-VVYP3PL5DX',
};

const app = Firebase.initializeApp(firebaseConfig);
const db = app.database();

export { db };

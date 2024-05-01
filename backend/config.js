const { initializeApp } = require('firebase/app');
const { getFirestore, collection, addDoc, getDocs } = require('firebase/firestore');
const firebaseConfig = {
  authDomain: "deft-return-398202.firebaseapp.com",
  projectId: "deft-return-398202",
  storageBucket: "deft-return-398202.appspot.com",
  messagingSenderId: "366586947150",
  appId: "1:366586947150:web:65ce8f368bcc29ef98851f",
  measurementId: "G-43N6GTCT1R"
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
module.exports = db;
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// ⚠️ Usa tu configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCTb-jggL0hc_UhatqKJ7PbPclp5KnmNdE",
  authDomain: "tienda-armonia-68820.firebaseapp.com",
  projectId: "tienda-armonia-68820",
  storageBucket: "tienda-armonia-68820.firebasestorage.app",
  messagingSenderId: "175480831582",
  appId: "1:175480831582:web:ddbf23a86ed8335f1d7ecf",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

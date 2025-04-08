// Firebase SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getDatabase, ref, onValue, runTransaction } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-database.js";

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCA8k3MG9FGgjLa4fkQ979G2hVQf9DNsYs",
  authDomain: "say-it-loud-8e48f.firebaseapp.com",
  databaseURL: "https://say-it-loud-8e48f-default-rtdb.firebaseio.com",
  projectId: "say-it-loud-8e48f",
  storageBucket: "say-it-loud-8e48f.firebasestorage.app",
  messagingSenderId: "677195341918",
  appId: "1:677195341918:web:ea837b45ccfc11f7f454cf",
  measurementId: "G-N6KB82D5GD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// DOM Elements
const checkbox = document.getElementById("verifyBox");
const counterEl = document.getElementById("counter");

// Firebase counter reference
const counterRef = ref(db, "verifiedCount");

// Update counter in real time
onValue(counterRef, (snapshot) => {
  const count = snapshot.val() || 0;
  counterEl.textContent = `Verified Humans: ${count}`;
});

// Check if this browser already verified
const alreadyVerified = localStorage.getItem("palestine_verified");

if (alreadyVerified === "true") {
  checkbox.checked = true;
  checkbox.disabled = true;
}

// Checkbox change listener
checkbox.addEventListener("change", () => {
  if (checkbox.checked && alreadyVerified !== "true") {
    checkbox.disabled = true;
    localStorage.setItem("palestine_verified", "true");

    // Safely increment the counter
    runTransaction(counterRef, (current) => {
      return (current || 0) + 1;
    });
  }
});

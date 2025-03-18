import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

// 🔹 Yahan apni Firebase ki config values daalo

const firebaseConfig = {
  apiKey: "AIzaSyDka2Eh1Ad3qYNtwbquVXQ8-oR5FNHAcPo",

  authDomain: "pjs-9f199.firebaseapp.com",

  projectId: "pjs-9f199",

  storageBucket: "pjs-9f199.firebasestorage.app",

  messagingSenderId: "863909316844",

  appId: "1:863909316844:web:78e7b99b26ded71f7c3dc9",

  measurementId: "G-DEHP19K1M5",
};



// Function to get FCM token
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

// ✅ FCM Token Generate karna
export const requestFCMToken = async () => {
  try {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      const token = await getToken(messaging, {
        vapidKey: "BFObwBwQt2UK4UzW3JmxRLWyoQzVW53XNxfVXR3AaPtvU-SXDBvMhPIkmKzfQ19yw0jtECMHypCzKa1LjFRbEbI",
      });
      return token;
    } else {
      console.error("Notification permission denied.");
      return null;
    }
  } catch (error) {
    console.error("Error getting FCM token:", error);
    return null;
  }
};

// Handle foreground notifications
export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      console.log("Message received: ", payload);
      resolve(payload);
    });
  });

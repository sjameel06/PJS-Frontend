importScripts("https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js");

firebase.initializeApp({
    apiKey: "AIzaSyDka2Eh1Ad3qYNtwbquVXQ8-oR5FNHAcPo",

    authDomain: "pjs-9f199.firebaseapp.com",
  
    projectId: "pjs-9f199",
  
    storageBucket: "pjs-9f199.firebasestorage.app",
  
    messagingSenderId: "863909316844",
  
    appId: "1:863909316844:web:78e7b99b26ded71f7c3dc9",
  
    measurementId: "G-DEHP19K1M5",
});

const messaging = firebase.messaging();

// Background Notifications handle karna
messaging.onBackgroundMessage((payload) => {
  console.log("Background Notification Received:", payload);

  self.registration.showNotification(payload.notification.title, {
    body: payload.notification.body,
    icon: "/firebase-logo.png",
  });
});

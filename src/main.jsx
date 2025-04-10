import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import App from './App';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/firebase-messaging-sw.js")
    .then((registration) => {
      console.log("✅ Service Worker Registered:", registration);
    })
    .catch((error) => {
      console.log("❌ Service Worker Registration Failed:", error);
    });
}

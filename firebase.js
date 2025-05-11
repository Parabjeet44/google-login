// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBhRY1uUjnNZbXoxVnvtUIfTqbNxddCDv0",
  authDomain: "nextjs-mui-c04cd.firebaseapp.com",
  projectId: "nextjs-mui-c04cd",
  storageBucket: "nextjs-mui-c04cd.firebasestorage.app",
  messagingSenderId: "862859835759",
  appId: "1:862859835759:web:b8516a063795027340d09a",
  measurementId: "G-7N2R4TYN7M"
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

let analytics;
let messaging;

// Lazy initialize analytics and messaging in a safe way
export const initFirebaseServices = async () => {
  if (typeof window !== 'undefined') {
    const { getAnalytics } = await import("firebase/analytics");
    analytics = getAnalytics(app);

    const { getMessaging, onMessage } = await import("firebase/messaging");
    messaging = getMessaging(app);

    onMessage(messaging, (payload) => {
      console.log("Message received in foreground:", payload);
    });
  }
};

export const googleSignUp = async () => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    console.log("User signed up:", result.user);
  } catch (error) {
    console.error("Google Sign-In Error:", error.message);
  }
};

export const requestNotificationPermission = async () => {
  if (typeof window === "undefined" || !messaging) return;

  try {
    const { getToken } = await import("firebase/messaging");
    const currentToken = await getToken(messaging, {
      vapidKey: "your-vapid-key"
    });
    if (currentToken) {
      console.log("FCM Token:", currentToken);
    } else {
      console.log("No FCM token retrieved");
    }
  } catch (err) {
    console.error("FCM token error:", err);
  }
};

export { auth, messaging };

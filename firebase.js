// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
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
        vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
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

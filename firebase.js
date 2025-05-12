import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithRedirect, getRedirectResult } from "firebase/auth";

// Firebase configuration
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

// Google Sign-Up with Redirect (for WebView compatibility)
export const googleSignUp = async () => {
  const provider = new GoogleAuthProvider();
  try {
    await signInWithRedirect(auth, provider);
  } catch (error) {
    console.error("Google Sign-In Error:", error.message);
  }
};

// Handle the redirect result after login
export const handleRedirectResult = async () => {
  try {
    const result = await getRedirectResult(auth);
    if (result) {
      const user = result.user;
      console.log("User signed in:", user);
      // You can post message back to WebView or do any post-login actions here
      if (typeof window !== 'undefined' && window.ReactNativeWebView) {
        window.ReactNativeWebView.postMessage("LOGIN_SUCCESS");
      }
    }
  } catch (error) {
    console.error("Error handling redirect result:", error.message);
  }
};

// Request notification permission and get FCM token
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

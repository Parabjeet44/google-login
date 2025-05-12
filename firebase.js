// firebase.js
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithRedirect,
  getRedirectResult,
} from "firebase/auth";

// Firebase configuration (DON'T include client_id here)
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Google Auth Provider with redirect support
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account", // Always show account picker
});

// Sign up with Google using redirect (popup fails in WebView)
export const googleSignUp = async () => {
  try {
    await signInWithRedirect(auth, provider);
  } catch (error) {
    console.error("Google Sign-In Error:", error.message);
  }
};

// Handle result after redirect
export const handleRedirectResult = async () => {
  try {
    const result = await getRedirectResult(auth);
    if (result && result.user) {
      console.log("User signed in:", result.user);

      // 👇 Send message to React Native WebView if inside it
      if (typeof window !== "undefined" && window.ReactNativeWebView) {
        window.ReactNativeWebView.postMessage("LOGIN_SUCCESS");
      }
    }
  } catch (error) {
    console.error("Redirect Sign-In Error:", error.message);
  }
};

// Optional: FCM push notification support (if needed)
let messaging;

export const initFirebaseServices = async () => {
  if (typeof window !== "undefined") {
    const { getAnalytics } = await import("firebase/analytics");
    getAnalytics(app);

    const { getMessaging, onMessage } = await import("firebase/messaging");
    messaging = getMessaging(app);

    onMessage(messaging, (payload) => {
      console.log("Message received in foreground:", payload);
    });
  }
};

export const requestNotificationPermission = async () => {
  if (typeof window === "undefined" || !messaging) return;

  try {
    const { getToken } = await import("firebase/messaging");
    const token = await getToken(messaging, {
      vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
    });

    if (token) {
      console.log("FCM Token:", token);
    } else {
      console.log("No FCM token available");
    }
  } catch (error) {
    console.error("Error retrieving FCM token:", error);
  }
};

export { auth, provider, messaging };

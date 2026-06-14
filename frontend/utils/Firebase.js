import { getAuth, GoogleAuthProvider } from "firebase/auth"
import { initializeApp } from "firebase/app"

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "v-cart-7adf6.firebaseapp.com",
    projectId: "v-cart-7adf6",
    storageBucket: "v-cart-7adf6.firebasestorage.app",
    messagingSenderId: "938248810096",
    appId: "1:938248810096:web:9087e1330b5144d0d4ceb5"
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const provider = new GoogleAuthProvider()

export { auth, provider }

import { initializeApp } from "firebase/app"
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyDoP6XIZkUwNf7dPc9lSrW8gA0TkVzkiB8",
  authDomain: "doogel-d35cc.firebaseapp.com",
  projectId: "doogel-d35cc",
  storageBucket: "doogel-d35cc.appspot.com",
  messagingSenderId: "371545070379",
  appId: "1:371545070379:web:35b00cfa255ec3aa7c836e",
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)

export async function signInWithAbyssGoogle() {
  const provider = new GoogleAuthProvider()
  // Use the specific account
  provider.setCustomParameters({
    login_hint: "dsouzarnd@gmail.com",
  })

  try {
    const result = await signInWithPopup(auth, provider)
    return result.user
  } catch (error) {
    console.error("Error signing in with Google:", error)
    throw error
  }
}

export { auth }


// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: 'AIzaSyC-E1gNkOfwQZe1JJFYp8hriEEZPPHFXq0',
	authDomain: 'my-project-93fb9.firebaseapp.com',
	projectId: 'my-project-93fb9',
	storageBucket: 'my-project-93fb9.appspot.com',
	messagingSenderId: '746574868192',
	appId: '1:746574868192:web:e282ec61458c827b5f2a85',
	measurementId: 'G-ZR11M9H4JN',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const storage = getStorage(app)
export const auth = getAuth(app)
export const db = getFirestore(app)

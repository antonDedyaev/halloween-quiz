// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyA6dtazqrCjqU1CVDu5aOcprwDTUSbSsys',
  authDomain: 'halloween-quiz-itpelag.firebaseapp.com',
  projectId: 'halloween-quiz-itpelag',
  storageBucket: 'halloween-quiz-itpelag.appspot.com',
  messagingSenderId: '167909099154',
  appId: '1:167909099154:web:3711c53cd6fb930045c84b',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)

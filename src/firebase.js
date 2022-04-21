// Import the functions you need from the SDKs you need
import firebase from "firebase/app";
import "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAoJrw3rrGow0YhUrn0YoOHehJX_P2tX98",
  authDomain: "carros-react.firebaseapp.com",
  projectId: "carros-react",
  storageBucket: "carros-react.appspot.com",
  messagingSenderId: "189349064055",
  appId: "1:189349064055:web:5700a367db876d6b128572",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export { firebase };

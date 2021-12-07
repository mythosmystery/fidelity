// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
   apiKey: 'AIzaSyChpNupxgF09YTeKPIzgZua1fT5ck_3Ywg',
   authDomain: 'fidelity-8b2df.firebaseapp.com',
   projectId: 'fidelity-8b2df',
   storageBucket: 'fidelity-8b2df.appspot.com',
   messagingSenderId: '764000384314',
   appId: '1:764000384314:web:45b91df4f5872e9c6f4c03',
   measurementId: '${config.measurementId}'
};

// Initialize Firebase
export const firebase = initializeApp(firebaseConfig);

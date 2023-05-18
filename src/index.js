import React from 'react';
import { render } from 'react-dom';
import './index.css';
import { initializeApp } from "firebase/app";
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ThemeProvider } from './GlobalComponents/ThemeProvider';
import { CartProvider } from 'react-use-cart';

;


const firebaseConfig = {
  apiKey: "AIzaSyCGqq05WtWtfYCKXkgMtS-00QpxP5jnhRs",
  authDomain: "hospedaje-react-firebase-f9e44.firebaseapp.com",
  projectId: "hospedaje-react-firebase-f9e44",
  storageBucket: "hospedaje-react-firebase-f9e44.appspot.com",
  messagingSenderId: "894026044971",
  appId: "1:894026044971:web:8a7cf95dc2a31b5ea1fc6e"
};


initializeApp(firebaseConfig);

render(
  <React.StrictMode>
    <ThemeProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </ThemeProvider>
  </React.StrictMode>
  , document.getElementById('root'));


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
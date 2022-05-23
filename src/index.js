import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './inputs.css'
import App from './App';
import reportWebVitals from './reportWebVitals';
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import "../node_modules/bootstrap/dist/js/bootstrap.bundle"
import "../node_modules/bootstrap/dist/css/bootstrap.css"
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import "./css/card.css"
import "./css/login.css"
import "./css/blogs.css"
import './css/Home.css'
import './css/Navbar.css'
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <App />
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

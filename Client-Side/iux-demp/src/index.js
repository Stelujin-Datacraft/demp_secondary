import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Login from './pages/UserService/Login';
import AppRouter from './Router'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import LoginAppRouter from './LoginRouter';
import Header from './pages/CommonComponents/Header';
import Modal from 'react-modal';

// ... your other imports and component definitions


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Header/>
            <LoginAppRouter />
        </BrowserRouter>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

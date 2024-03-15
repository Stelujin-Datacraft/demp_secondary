// Router.js

import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './pages/UserService/Login';
import Form from './pages/Forms/Form'
import AdminView from './pages/ReportDashboard/AdminView'
import CanvasPage from './pages/UserService/CanvasPage'
import GpsMappingForm from './pages/Forms/GpsMappingForm'
import FormsPage from './pages/Forms/FormsPage'
import { NavigationBar } from './pages/CommonComponents/CommonComponents'
import PollDayReporting from './pages/Forms/PollDayReporting'
import './assets/styles.css'
import IssuesView from './pages/UserService/IssuesView';
import LiveUpdateForm from './pages/Forms/LiveUpdateForm';
import LocationCard from './pages/RouteMap/LocationCard';
import TrackPage from './pages/RouteMap/TrackPage';
import LocationCanvas from './pages/RouteMap/LocationCanvas';
import { LoginType, saveUserLogin, loadUserLogin } from './components/actions';
import CanvasPageUser from './pages/UserService/CanvasPageUser';
import VIssueForm from './pages/Forms/VIssueForm';
import VForm from './pages/Forms/VForms';
import AppRouter from './Router.js'

const USERLOGIN = LoginType.User;

function RedirectAdmin() {
    console.log('ADMIN')

    if (USERLOGIN = LoginType.USER) {
        return { CanvasPage };
    }
}

const LoginAppRouter = () => {

    const [userLogin, setUserLogin] = useState(loadUserLogin)

    useEffect(() => {
        // Call your function here
        console.log(userLogin)

        //console.log(userLogin.type, LoginType.ADMIN);


        // Replace with your actual function name
    }, []);
    const handleRedirect = (AdminPage, UserPage) => {
        console.log("ADMIN PAGE", userLogin.payload)
        console.log("USER PAGE", userLogin.payload)

        if (userLogin.payload === LoginType.PUBLIC) {
            console.log("IF")
            window.location.href = `/login`;
            return Login
        }
        else if (userLogin.payload === LoginType.ADMIN) { return <AdminPage /> }
        else if (userLogin.payload === LoginType.SO) { return <AdminPage /> }
        else if (userLogin.payload === LoginType.BLO) { return <UserPage /> }
        else {
            console.log("ELSE")
            window.location.href = `/login`;
            return Login
        }
    }

    return (
        <div className="canvas-container">

                <Switch>
                    <Route exact path="/login" component={Login} />
                    <AppRouter/>
                </Switch>

        </div>
    );
};



export default LoginAppRouter;

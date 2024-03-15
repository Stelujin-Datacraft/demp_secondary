// Router.js

import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './pages/UserService/Login';
import Form from './pages/Forms/Form'
import AdminView from './pages/ReportDashboard/AdminView'
import Dash from './pages/ReportDashboard/Dash'
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
import ReportBooth from './pages/Forms/ReportBooth';
import DetailedView from './pages/ReportDashboard/DetailedView';
import MapView from './pages/RouteMap/MapView';
import Directions from './pages/RouteMap/Map';
import BarGraph from './pages/ReportDashboard/BarGraph';
import DetailedAssemblyView from './pages/ReportDashboard/DetailedAssemblyView';
import DetailedBoothView from './pages/ReportDashboard/DetailedBoothView';
import IssueForm from './pages/UserService/IssueForm';
import MapComponent from './pages/RouteMap/MapComponent';
import Table from './pages/ReportDashboard/table';
import PrePollView from './pages/ReportDashboard/PrePollView';
import IssueDetails from './pages/UserService/IssueDetails';
import ReactModalApp from './pages/UserService/ReactModalApp';
import PrePollDayReporting from './pages/Forms/PrePollDayReporting';
import EndMessage from './pages/ReportDashboard/EndMessage';

const USERLOGIN = LoginType.User;

function  RedirectAdmin() {
    console.log('ADMIN')

    if (USERLOGIN = LoginType.USER) {
        return { CanvasPage };
    }}

const AppRouter = () => {

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
        else if (userLogin.payload === LoginType.BLO) { return <UserPage/>}
        else {
            console.log("ELSE")
            window.location.href = `/login`;
            return Login
        }
    }

    return (
        <div className="canvas-container">
            <NavigationBar />

            <div className='content'>

                <Switch>
                    {/*                    <Route path="/canvas" component={userLogin.payload === LoginType.ADMIN ? CanvasPage : CanvasPageUser}></Route >*/}
                    <Route path="/canvas" component={() => handleRedirect(Dash,CanvasPageUser)}></Route >
                    {/*<Route exact path="/login" component={Login} />
*/}
                <Route exact path="/form" component={Form} />
                    <Route exact path="/adminview" component={AdminView} />
                        <Route exact path="/gps-mapping-form" component={GpsMappingForm} />
                        <Route exact path="/forms-page" component={FormsPage} />
                    <Route exact path="/poll" component={PollDayReporting} />
                    <Route exact path="/prepoll" component={PrePollDayReporting} />
                        <Route exact path="/issue_view" component={IssuesView} />
                        <Route exact path="/liveupdate" component={LiveUpdateForm} />
                        <Route exact path="/loc" component={TrackPage} />
                    <Route exact path="/routemap" component={LocationCanvas} />
                    <Route exact path="/vehicle-issues-form" component={VIssueForm} />
                    <Route exact path="/report-booth" component={ReportBooth} />
                    <Route exact path="/vehicle-details-form" component={VForm} />
                    <Route exact path="/detailed-view" component={DetailedView} />
                    <Route exact path="/mapview" component={MapView} />
                    <Route exact path="/map" component={Directions} />
                    <Route exact path="/bar" component={BarGraph} />
                    <Route exact path="/dash" component={Dash} />
                    <Route exact path="/daview" component={DetailedAssemblyView} />
                    <Route exact path="/dbview" component={DetailedBoothView} />
                    <Route exact path="/submitIssue" component={IssueForm} />
                    <Route exact path="/mapcomp" component={MapComponent} />
                    <Route exact path="/table" component={Table} />
                    <Route exact path="/prepollview" component={PrePollView} />
                    <Route exact path="/mod" component={ReactModalApp} />
                    <Route exact path="/endmsg" component={EndMessage} />

                    <Route exact path="/issuedetailsview" component={IssueDetails} />
            </Switch>
            </div>
        </div>
    );
};



export default AppRouter;

import React, { useState}from "react";
import { NavigationBar, Button } from "../CommonComponents/CommonComponents";
import '../../assets/styles.css'
import { LoginType, saveUserLogin, loadUserLogin } from '../../components/actions';

const CanvasPageUser = () => {
    const [userLogin, setUserLogin] = useState(loadUserLogin)
    const handleButtonClick = (buttonName) => {
        // Handle button click here based on buttonName
        console.log(`Clicked button: ${buttonName}`);
        window.location.href = `/${buttonName}`;
    };

    return (
        <div className="internal-container">

            <main className="internal-container">
                <h2>Dashboards</h2>
                <header>
                    <div className='message-box'>
                        <div>
                            <img className="icon" src={require('../voteicon.jpg')} /></div>
                        <span><p className="message">Good Morning! We wish you a peaceful Election Day!</p></span>
                    </div>
                </header>
                <section>
                    <div className="buttons-container">
                        {(userLogin.payload === LoginType.BLO) && (
                            <Button name="Voting Form" onClick={() => handleButtonClick("liveupdate")} />

                        )}

                        <Button name="Raise Issue" onClick={() => handleButtonClick("raise_issue")} />

                        <Button name="Communication Plan" onClick={() => handleButtonClick("Communication_Plan")} />
                        <Button name="Route Map" onClick={() => handleButtonClick("routemap")} />
                        <Button name="Reports Dashboard" onClick={() => handleButtonClick("adminview")} />

                        {(userLogin.payload === LoginType.BLO ) && (
                            <Button name="Reporting" onClick={() => handleButtonClick("poll")} />

                                )}

                        <Button name="Issues" onClick={() => handleButtonClick("issue_view")} />
                        <Button name="Forms" onClick={() => handleButtonClick("forms-page")} />

                        {/* Add more buttons as needed */}
                    </div>
                </section>
            </main>
        </div>
    );
};

export default CanvasPageUser;

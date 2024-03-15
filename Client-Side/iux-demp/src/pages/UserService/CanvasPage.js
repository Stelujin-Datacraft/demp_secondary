import React from "react";
import { NavigationBar, Button } from "../CommonComponents/CommonComponents";
import '../../assets/styles.css'
const CanvasPage = () => {
    const handleButtonClick = (buttonName) => {
        // Handle button click here based on buttonName
        console.log(`Clicked button: ${buttonName}`);
        window.location.href = `/${buttonName}`;
    };

    return (
        <div className="internal-container">

            <main className="internal-container">
                <h3>Dashboards</h3>
                <header>

                    <div className='message-box'>
                        <div>
                           <img className="icon" src={require('../voteicon.jpg')}  /></div>
                        <span><p className="message">Good Morning! We wish you a peaceful Election Day!</p></span>
                        </div>
                </header>
                <section>
                    <div className="buttons-container">
                        <Button name="Communication Plan" onClick={() => handleButtonClick("Communication_Plan")} />
                        <Button name="Route Map" onClick={() => handleButtonClick("routemap")} />
                        <Button name="Reports Dashboard" onClick={() => handleButtonClick("adminview")} />
                        <Button name="Issues" onClick={() => handleButtonClick("issue_view")} />
                        {/* Add more buttons as needed */}
                    </div>
                </section>
            </main>
        </div>
    );
};

export default CanvasPage;

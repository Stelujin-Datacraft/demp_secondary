import React from "react";
import { NavigationBar, Button } from "../CommonComponents/CommonComponents";
import '../../assets/styles.css'

const LocationCanvas = () => {
    const handleButtonClick = (buttonName) => {
        // Handle button click here based on buttonName
        console.log(`Clicked button: ${buttonName}`);
        //const navigate = useNavigate();
        // navigate('/gps-mapping-forms');
        window.location.href = `/${buttonName}`;
    };

    return (
        <div className="internal-container">

            <main className="internal-container">

                <h3>Route Maps </h3>
                <br/>
                <main className="internal-container">
                <section>

                    <div className="buttons-container">
                        <Button name="Find Polling Booths" onClick={() => handleButtonClick("loc")} />
                        <Button name="Find Sector Officer" onClick={() => handleButtonClick("loc")} />
                        <Button name="Track EVM movement" onClick={() => handleButtonClick("loc")} />
                        
                        {/* Add more buttons as needed */}
                    </div>
                    </section>
                </main>
            </main>
        </div>
    );
};

export default LocationCanvas;

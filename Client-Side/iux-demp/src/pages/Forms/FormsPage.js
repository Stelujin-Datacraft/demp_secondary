import React from "react";
import { NavigationBar, Button } from "../CommonComponents/CommonComponents";
import '../../assets/styles.css'
import Form from "./Form";

const FormsPage = () => {
    const field = [{"name" : 'FIELD FORM'},
        { "name": 'FIELD FORM1' },
        { "name": 'FIELD FORM2' }]
    const handleButtonClick = (buttonName) => {
        // Handle button click here based on buttonName
        console.log(`Clicked button: ${buttonName}`);
        //const navigate = useNavigate();
    // navigate('/gps-mapping-forms');
        //window.location.href = `/${buttonName}`;

        window.location.href = `/report-booth?target=${buttonName}`
    };
    const handleSubmit = () => {
    console.log('FORM SUBMITTED')}

    return (
        <div className="internal-container">

            <main className="internal-container">
                
                <h3>Forms </h3>

                <br />
                <main className="internal-container">
                <section>
                    
                    <div className="buttons-container">
                        <Button name="Vehicle Details Form" onClick={() => handleButtonClick("vehicle_details_form")} />
                        <Button name="Driver Details Form" onClick={() => handleButtonClick("driver_details_form")} />
                        <Button name="Vehicle Issue Form" onClick={() => handleButtonClick("vehicle_issue_form")} />
                        <Button name="GPS Mapping Form" onClick={() => handleButtonClick("gps-mapping-form")} />
                        
                        {/* Add more buttons as needed */}
                    </div>
                    </section>
                </main>
            </main>
        </div>
    );
};

export default FormsPage;

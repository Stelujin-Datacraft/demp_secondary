//SET ON CHANGE POST MECHANISM FOR EACH RADIO BUTTON

import React, { useState, useEffect } from 'react';
import RadioButtons from '../../components/RadioButtons'; // Replace with actual component
import PollTimeInput from '../../components/PollTimeInput'; // Replace with actual component
import IssueSelection from '../../components/IssueSelection'; // Replace with actual component
import axios from 'axios'; // Import for server communication
import '../../assets/styles.css'

const RadioOption = ({ value, label, isChecked }) => (
    <label>
        <input
            type="radio"
            name="engine"
            value={value}
            checked={isChecked}
        />
        <span className="radio-tile">
            <span className="radio-icon">{/* Your SVG icon here */}</span>
            <span className="radio-label">{label}</span>
        </span>
    </label>
);

const EngineRadioGroup = () => {
    const [selectedEngine, setSelectedEngine] = useState("Bicycle"); // Initial selection

    const handleRadioChange = (event) => {
        setSelectedEngine(event.target.value);
    };

    const options = [
        { value: "Bicycle", label: "Bicycle", isChecked: true },
        { value: "Motorbike", label: "Motorbike" },
        // Add more options if needed
    ];

    return (
        <div className="radio-inputs">
            <div className="radio-inputs">
                <label>
                    <input className="radio-input" type="radio" name="engine"/>
                        <span className="radio-tile">
                            <span className="radio-icon">

                            <img className="icon" src={require('../voteicon.jpg')} />
                        </span>
                            <span className="radio-label">Bicycle</span>
                        </span>
		</label>
                    <label>
                        <input checked="" className="radio-input" type="radio" name="engine"/>
                            <span className="radio-tile">
                                <span className="radio-icon">
                            <img className="icon" src={require('../voteicon.jpg')} />
                                </span>
                                <span className="radio-label">Motorbike</span>
                            </span>
		</label>
                        <label>
                            <input className="radio-input" type="radio" name="engine"/>
                                <span className="radio-tile">
                                    <span className="radio-icon">

                            <img className="icon" src={require('../voteicon.jpg')} />
                                    </span>
                                    <span className="radio-label">Car</span>
                                </span>
		</label>
</div>
        </div>
    );
};

export default EngineRadioGroup;

import React from 'react';

const RadioButtons = ({ label, options, value, onChange }) => (
    <div className="radio-group">
        <label>{label}</label>
        {options.map((option, index) => (
            <div key={index}>
                <input
                    type="radio"
                    id={`radio-${index}`}
                    name="mockPollConducted"
                    value={option}
                    checked={option === value}
                    onChange={() => onChange(option)}
                />
                <label htmlFor={`radio-${index}`}>{option}</label>
            </div>
        ))}
    </div>
);

export default RadioButtons;

import React, { useState } from 'react';
import '../assets/radiostyle.css'

const IssueSelection = ({ onChange, selected }) => {


    return (<div className="issue-selection">

        <label>Issue Type:
            <br />
            <div><br />
                <select className="input-select" value={selected} onChange={(e) => onChange(e.target.value)}>
                    <option value="">Select</option>
                    <option value="evm">EVM Issue</option>
                    <option value="law-and-order">Law and Order Issue</option>
                    {/* Add more options as needed */}
                </select>
            </div>
        </label>
    </div>
    )
};

export default IssueSelection;

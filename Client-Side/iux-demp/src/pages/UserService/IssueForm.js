import React, { useState } from 'react';

const IssueForm = () => {
    const [issueType, setIssueType] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('your-backend-api-endpoint', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    issueType,
                    description,
                }),
            });

            if (response.ok) {
                console.log('Issue submitted successfully');
                // Optionally, you can reset the form fields after successful submission
                setIssueType('');
                setDescription('');
            } else {
                console.error('Failed to submit issue');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="issue-form-container">
            <h1>Issue Form</h1>
            <div className="issue-info">
                <p>Assembly: XYZ Assembly</p>
                <p>Booth: Booth 123</p>
                <p>Sector Officer: John Doe</p>
                <p>Issue Raiser: Jane Doe</p>
                <p>Location: ABC Street</p>
            </div>

            <form onSubmit={handleSubmit} className="issue-form">
                <div className="form-group">
                    <label htmlFor="issueType">Issue Type:</label>
                    <select id="issueType" value={issueType} onChange={(e) => setIssueType(e.target.value)}>
                        <option value="">Select Issue Type</option>
                        <option value="General">General</option>
                        <option value="Technical">Technical</option>
                        <option value="Administrative">Administrative</option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} />
                </div>

                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default IssueForm;

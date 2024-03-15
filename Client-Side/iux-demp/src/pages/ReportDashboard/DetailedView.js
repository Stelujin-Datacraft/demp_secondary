import React, { useState, useEffect } from 'react';

const DetailedView = () => {
    const [data, setData] = useState({}); // State to hold detailed view data

    // Function to fetch data from backend (replace with your actual API call)
    const fetchData = async () => {
        try {
            const response = await fetch('/api/detailed-view-data'); // Replace with your API endpoint
            const jsonData = await response.json();
            setData(jsonData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    // Fetch data on component mount
    useEffect(() => {
        setData({ boothName: '', assemblyName: '', sectorOfficerName: '', sectorOfficerLocation: '', boothLocation: '', boothIssues: '', totalVotes: '', maleVotes: '', femaleVotes: '', transgenderVotes: '', issues: '', id: '', description: '', status: '', date: '' })
        //fetchData();
       
    }, []);

    // Check if data is loaded before rendering
    if (!data) return <p>Loading detailed view data...</p>;

    return (
        <div className="detailed-view">
            <h2>Detailed View</h2>
            <header>
            <div className="details-container">
                <div className="options">
                    <ul>
                        <li>Booth Name: {data.boothName}</li>
                        <li>Assembly Name: {data.assemblyName}</li>
                        <li>Sector Officer Name: {data.sectorOfficerName}</li>
                        <li>Sector Officer Location: {data.sectorOfficerLocation}</li>
                        <li>Booth Location: {data.boothLocation}</li>
                        <li>Booth Issues: {data.boothIssues && data.boothIssues.join(', ')}</li>
                    </ul>
                </div>
                <div className="main-details">
                    <h2>Voting Details</h2>
                    <ul>
                        <li>Total Votes: {data.totalVotes}</li>
                        <li>Male Votes: {data.maleVotes}</li>
                        <li>Female Votes: {data.femaleVotes}</li>
                        <li>Transgender Votes: {data.transgenderVotes}</li>
                    </ul>
                    <h2>Issues</h2>

                        <div key={data.id}>
                            <h3>{data.description}</h3>
                            <p>
                                Status: {data.status} - Date: {data.date}
                            </p>
                        </div>
                </div>
                </div>
            </header>
        </div>
    );
};

export default DetailedView;

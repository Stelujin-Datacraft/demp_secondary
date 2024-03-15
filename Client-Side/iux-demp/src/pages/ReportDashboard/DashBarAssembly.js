import React,{ useState } from 'react';
import { Doughnut } from 'react-chartjs-2';

const DashBarAssembly = () => {
    // Static values for demonstration
    const assemblies = [
        { name: 'Assembly 1', maleVotes: 150, femaleVotes: 120, transVotes: 30, totalVotes: 300, nonVoters: 100, openIssues: 20, closedIssues: 50, totalVoters: 500 },
        { name: 'Assembly 2', maleVotes: 200, femaleVotes: 180, transVotes: 40, totalVotes: 420, nonVoters: 80, openIssues: 30, closedIssues: 70, totalVoters: 600 },
        // Add more assemblies here...
    ];

    // Calculate total district data
    const districtData = assemblies.reduce((acc, curr) => {
        acc.maleVotes += curr.maleVotes;
        acc.femaleVotes += curr.femaleVotes;
        acc.transVotes += curr.transVotes;
        acc.totalVotes += curr.totalVotes;
        acc.nonVoters += curr.nonVoters;
        acc.openIssues += curr.openIssues;
        acc.closedIssues += curr.closedIssues;
        acc.totalVoters += curr.totalVoters;
        return acc;
    }, { maleVotes: 0, femaleVotes: 0, transVotes: 0, totalVotes: 0, nonVoters: 0, openIssues: 0, closedIssues: 0, totalVoters: 0 });

    // Calculate percentages for each type of vote
    const maleVotesPercentage = ((districtData.maleVotes / districtData.nonVoters) * 100).toFixed(2);
    const femaleVotesPercentage = ((districtData.femaleVotes / districtData.nonVoters) * 100).toFixed(2);
    const transVotesPercentage = ((districtData.transVotes / districtData.nonVoters) * 100).toFixed(2);
    const nonVotersPercentage = ((districtData.nonVoters / (districtData.nonVoters + districtData.totalVotes)) * 100).toFixed(2);

    // Chart data for issues
    const issuesData = {
        labels: ['Open', 'Closed'],
        datasets: [
            {
                data: [districtData.openIssues, districtData.closedIssues],
                backgroundColor: ['#FF5733', '#36A2EB'], // Red for open issues, blue for closed issues
                hoverBackgroundColor: ['#FF5733', '#36A2EB'],
            },
        ],
    };

    // Chart data for male votes
    const maleVotesData = {
        labels: ['Male'],
        datasets: [
            {
                data: [maleVotesPercentage, nonVotersPercentage], // Male votes as a proportion out of non-voters
                backgroundColor: [
                    'rgba(255, 99, 132, 0.6)', // Red gradient
                    'rgba(211, 211, 211, 0.6)' // Lightgray gradient
                ],
            },
        ],
    };

    // Chart data for female votes
    const femaleVotesData = {
        labels: ['Female'],
        datasets: [
            {
                data: [femaleVotesPercentage, nonVotersPercentage], // Female votes as a proportion out of non-voters
                backgroundColor: [
                    'rgba(54, 162, 235, 0.6)', // Blue gradient
                    'rgba(211, 211, 211, 0.6)' // Lightgray gradient
                ],
            },
        ],
    };

    // Chart data for trans votes
    const transVotesData = {
        labels: ['Trans'],
        datasets: [
            {
                data: [transVotesPercentage, nonVotersPercentage], // Trans votes as a proportion out of non-voters
                backgroundColor: [
                    'rgba(255, 206, 86, 0.6)', // Yellow gradient
                    'rgba(211, 211, 211, 0.6)' // Lightgray gradient
                ],
            },
        ],
    };
    const [selectedCategory, setSelectedCategory] = useState('EVM Issues');

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
        //onCategoryChange(event.target.value); // Pass selected category to parent
    };


    return (
        <div className="dashboard">
            <div ><h3>                   <div className="toggle-button">
                <label>Select Issue type</label>
                <select value={selectedCategory} onChange={handleCategoryChange}>
                    <option value="EVM Issues">Sillod</option>
                    <option value="LAW and Order Issues">Kannad</option>
                    <option value="Natural Disaster issues">Paithan</option>
                </select></div></h3>
                <h2>Total Votes</h2>
                <h1>85%</h1>
            </div>
            <div className="chart">
                <h3>Issues</h3>
                <Doughnut data={issuesData} />
            </div>
            <div className="chart">
                <h3>Male Votes</h3>
                <Doughnut data={maleVotesData} />
            </div>
            <div className="chart">
                <h3>Female Votes</h3>
                <Doughnut data={femaleVotesData} />
            </div>
            <div className="chart">
                <h3>Trans Votes</h3>
                <Doughnut data={transVotesData} />
            </div>
        </div>
    );
};

export default DashBarAssembly;

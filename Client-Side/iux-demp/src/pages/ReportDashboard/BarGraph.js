import { CategoryScale } from 'chart.js/auto';
import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import MyChart from '../../MyChart';

const BarGraph = () => {
    const [data, setData] = useState({
        labels: ['Variable 1', 'Variable 2', 'Variable 3'],
        datasets: [
            {
                label: 'Male',
                data: [50, 70, 30],
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
                stack: 'gender',
            },
            {
                label: 'Female',
                data: [20, 15, 40], // Replace with your female data
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
                stack: 'gender',
            },
            {
                label: 'Trans',
                data: [10, 5, 15], // Replace with your trans data
                backgroundColor: 'rgba(255, 206, 86, 0.2)',
                borderColor: 'rgba(255, 206, 86, 1)',
                borderWidth: 1,
                stack: 'gender',
            }, {
                label: 'Male',
                data: [50, 70, 30],
                backgroundColor: 'rgba(0, 126, 86, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
                stack: 'gender',
            },
            {
                label: 'Female',
                data: [20, 15, 40], // Replace with your female data
                backgroundColor: 'rgba(0, 126, 86, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
                stack: 'gender',
            },
            {
                label: 'Trans',
                data: [10, 5, 15], // Replace with your trans data
                backgroundColor: 'rgba(0, 126, 86, 0.2)',
                borderColor: 'rgba(255, 206, 86, 1)',
                borderWidth: 1,
                stack: 'gender',
            }
        ],
    });

    // Update data (replace with your data fetching logic)
    useEffect(() => {
        // Simulate data fetching
        setTimeout(() => {

            setData({
                labels: ['Updated Var 1', 'Updated Var 2', 'Updated Var 3'],
                datasets: [
                    {
                        label: 'Male',
                        data: [80, 60, 40],
                        // ... other chart options
                    },
                    {
                        label: 'Female',
                        data: [],
            // ... other chart options
          },
                    {
                        label: 'Trans',
                        data: [],
            // ... other chart options
          },
                ],
            });
        }, 1000); // Simulate delay, replace with actual data fetching logic
    }, []);

    return (
        <div className="internal-container"><main className="internal-container">
        <div className="bar-graph-container">
                <br />
                <h2>Data Visualization</h2>
                <br/>
            <div className="chart-container">
                <Bar data={data} options={{ maintainAspectRatio: false }} />
            </div>
            <div className="issues-space">
                    <br />
                    <h3>Issues Space</h3>
                <MyChart/>
                {/* Add content for your issues space here (e.g., a list, form) */}
            </div>
        </div>
        </main></div>
            );
};

export default BarGraph;

import React, { useState, useEffect } from 'react';
import '../../assets/styles.css'
import IconLoc from '../CommonComponents/IconComponent';
function DistrictLevelView({ title, locations, onLocationClick }) {
    //const [data, setData] = useState([]); // State to store fetched data
    const [data, setData] = useState([{ 'assembly': 'DY John Doe', 'polling_booth': 'Sillod', 'pre_pol_status': 'Done', 'poll_male': '89%', 'poll_female': '65%', 'poll_transgender': '25%', 'poll_total': '61%', 'issues': 'Yes' },
    ])
    useEffect(() => {
        // Fetch data from the server on component mount
        fetch('/api/data') // Replace with your actual data endpoint
            .then((response) => response.json())
            .then((jsonData) => setData(jsonData))
            .catch((error) => console.error('Error fetching data:', error));
    }, []);

    const handleDropdownClick = (index) => {
        // Implement your dropdown menu logic here
        // You can access the detailed data for the selected row using data[index]
        console.log('Dropdown clicked for row:', index);
    };
    const handleLocationClick = (url) => {
        console.log(`Clicked button: ${url}`);
        window.location.href = `/map`;
    }
    return (
        <div>
            
            <br/>
            <h2>District Level View</h2>
            <br />
            <header>
            <table>
                <thead>
                    <th></th>
                </thead>
                    <tbody >
                        <tr ><td>RO Office :</td><td><a onClick={() => handleLocationClick('ARO')}><IconLoc /></a> </td></tr>
                        <tr><td>Counting Center :</td><td><a onClick={() => handleLocationClick('ARO')}><IconLoc /></a> </td></tr>
                        <tr><td>EVM Strong Room A & B </td><td><a onClick={() => handleLocationClick('ARO')}><IconLoc /></a> </td></tr>
                        <tr><td>EVM Strong Room C & D  :</td><td><a onClick={() => handleLocationClick('ARO')}><IconLoc /></a> </td></tr>

                </tbody>

            </table>
                </header>
        </div>
    );
}

export default DistrictLevelView;

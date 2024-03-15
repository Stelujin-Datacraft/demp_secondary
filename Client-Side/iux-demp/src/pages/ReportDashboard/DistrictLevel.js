import React, { useState, useEffect } from 'react';
import '../../assets/styles.css'
import axios from 'axios';

import { get_district, urlPre, get_body } from '../../components/globalApiConfig';
import { getData } from '../../components/apiActions';
import { loadUser, LoginType, loadUserLogin } from '../../components/actions';
function DistrictLevelView() {
    //const [data, setData] = useState([]); // State to store fetched data
    const [data, setData] = useState([{ 'assembly': 'DY John Doe', 'polling_booth': 'Sillod', 'pre_pol_status': 'Done', 'poll_male': '89%', 'poll_female': '65%', 'poll_transgender': '25%', 'poll_total': '61%', 'issues': 'Yes' },
    ])

    const [error, setError] = useState('');
    const [userId, setUserId] = useState(loadUser.login);
    const [token, setToken] = useState(loadUser.pay_token);


    async function getUserData() {
        try {
            const response = await getData(`${urlPre}/${get_district}`, get_body(userId, token));
            if (response) {
                setData(response)
            }
            else {
                console.log(data)
            }

        } catch (error) {
            if (error.response && error.response.data) {
                setError(error.response.data.message); // Handle data retrieval error
            } else {
                console.error('Unexpected error format:', error);
                // Handle unexpected error format
            }
        }
    }






    useEffect(() => {
        console.log("Booth LEVEL")
        try { getUserData() } catch (error) { console.log(error) }
        // Fetch data from the server on component mount
        //getUserData(loadUser().payload)     

    }, []);

    const handleDropdownClick = (index) => {
        // Implement your dropdown menu logic here
        // You can access the detailed data for the selected row using data[index]
        console.log('Dropdown clicked for row:', index);
    };
    const handleLocationClick = (url) => {
        console.log(`Clicked button: ${url}`);
        window.location.href = `/${url}`;
    }
    return (
        <div>
            <h2>District Level View</h2>
            <br />

            <div className="internal-container-table">
                <table >
                    <thead style={{ borderBottom: '1px solid blue' }}>

                        <tr>
                            <th style={{ backgroundColor: "lightgray", width:"20%" }}>Total Votes</th>
                            <th>1,89,210 </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style={{ backgroundColor: "lightgray", width: "20%" }}>Male Votes</td>
                            <td>90,012 </td>
                        </tr>

                        <tr>
                            <td style={{ backgroundColor: "lightgray", width: "20%" }}>Female Votes</td>
                            <td>81,918 </td>
                        </tr>

                        <tr>
                            <td style={{ backgroundColor: "lightgray", width: "20%" }}>Transgender Votes</td>
                            <td>15,100 </td>
                        </tr>

                        <tr>
                            <td style={{ backgroundColor: "lightgray", width: "20%" }}>Open Issue </td>
                            <td style={{ color: "red", fontWeight:'bold' }}>13 </td>
                        </tr>
                    </tbody>
                    {/*<a onClick={() => handleLocationClick('ARO')}><img src={require('../../assets/ICON/icon_location.png')} /></a>*/}
                </table>
            </div>
        </div>
    );
}

export default DistrictLevelView;

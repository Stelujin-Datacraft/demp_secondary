import React, { useState, useEffect } from 'react';
import '../../assets/styles.css'
import axios from 'axios';

import { loadUser, LoginType, loadUserLogin } from '../../components/actions';
import { get_assembly, urlPre, get_body } from '../../components/globalApiConfig';
import { getData } from '../../components/apiActions';
function AssemblyLevelView() {
    //const [data, setData] = useState([]); // State to store fetched data
    const [userId, setUserId] = useState(loadUser.login);
    const [token, setToken] = useState(loadUser.pay_token);
    const [data, setData] = useState([
        { 'assembly': 'Sillod', 'polling_booth': 'Booth 1', 'pre_pol_status': 'Done', 'poll_male': '1204', 'poll_female': '1112', 'poll_transgender': '122', 'poll_total': '2438', 'issues': 'NO' },
        { 'assembly': 'Phulambri', 'polling_booth': 'Booth 2', 'pre_pol_status': 'NO', 'poll_male': '-', 'poll_female': '-', 'poll_transgender': '-', 'poll_total': '-', 'issues': 'Yes' },
        { 'assembly': 'East', 'polling_booth': 'Booth 3', 'pre_pol_status': 'Done', 'poll_male': '3001', 'poll_female': '2300', 'poll_transgender': '253', 'poll_total': '5554', 'issues': 'NO' },
        { 'assembly': 'West', 'polling_booth': 'Booth 4', 'pre_pol_status': 'Done', 'poll_male': '2301', 'poll_female': '1998', 'poll_transgender': '349', 'poll_total': '4648', 'issues': 'No' },
        { 'assembly': 'Paithan', 'polling_booth': 'Booth 5', 'pre_pol_status': 'Done', 'poll_male': '809', 'poll_female': '625', 'poll_transgender': '97', 'poll_total': '1513', 'issues': 'Yes' },
        { 'assembly': 'Kannad', 'polling_booth': 'Booth 6', 'pre_pol_status': 'Done', 'poll_male': '1001', 'poll_female': '896', 'poll_transgender': '140', 'poll_total': '2037', 'issues': 'NO' }
       
    ])

    const [error, setError] = useState('');
    

    async function getUserData() {
        try {
            const response = await getData(`${urlPre}/${get_assembly}`, get_body(userId, token));
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
        // Fetch data from the server on component mount
        //getUserData(loadUser().payload)
        try { getUserData()} catch (error) {console.log(error) }

    }, []);

    const handleDropdownClick = (index) => {
        // Implement your dropdown menu logic here
        // You can access the detailed data for the selected row using data[index]
        console.log('Dropdown clicked for row:', index);
        window.location.href = `/daview?assembly=${index}`;
    };
    const handleLocationClick = (url) => {
        console.log(`Clicked button: ${url}`);
        window.location.href = `/map`;
    }
    return (
        <div>

            <h3>AssemblyLevelView</h3>
            <br />
            <br />

            <div className="internal-container-table">
            <table >
                <thead>

                        <tr style={{ backgroundColor: "lightgray" }}>
                        <th>Assembly office</th>
                        <th>Male Votes</th>
                        <th>Female Votes</th>
                        <th>TransGender Votes</th>
                        <th>Total Votes</th>
                        <th>Issues</th>
                        <th>Contact SO</th>
                        <th>SO Location</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, index) => (

                        <tr key={index} onClick={() => handleDropdownClick(index)}
                            className={row.issues === 'Yes' ? 'alerts-border' : 'no-issue-row'}
                        >

                            <td>{row.assembly}</td>
                            <td>{row.poll_male}</td>
                            <td>{row.poll_female}</td>
                            <td>{row.poll_transgender}</td>
                            <td>{row.poll_total}</td>
                            <td>{row.issues}</td>
                            <td><a onClick={() => handleLocationClick(row.contacts)}><img style={{ width: '25px' }} src={require('../../assets/ICON/icon_communication.png')} /></a></td>


                            <td> <a onClick={() => handleLocationClick(row.location)}><img style={{ width: '25px' }} src={require('../../assets/ICON/icon_location_black.png')}/></a></td>

                            <td>
                                {/* Implement your custom dropdown component here */}

                            </td>

                        </tr>


                    ))}
                </tbody>
                </table>
                </div>
        </div>
    );
}

export default AssemblyLevelView;

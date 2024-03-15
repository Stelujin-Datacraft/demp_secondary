import React, { useState, useEffect } from 'react';
import '../../assets/styles.css'
import axios from 'axios';

import { loadUser, LoginType, loadUserLogin } from '../../components/actions';
import { get_booth, urlPre, get_body } from '../../components/globalApiConfig';
import { getData } from '../../components/apiActions';
function BoothLevelView() {
    //const [data, setData] = useState([]); // State to store fetched data
    const [data, setData] = useState([
        { 'assembly': 'Sillod', "sector_officer":"M Pathan", 'polling_booth': 'Booth 1', 'pre_pol_status': 'Done', 'poll_male': '1204', 'poll_female': '1112', 'poll_transgender': '122', 'poll_total': '2438', 'issues': 'NO' },
        { 'assembly': 'Phulambri', "sector_officer": "Rajesh S.R", 'polling_booth': 'Booth 2', 'pre_pol_status': 'NO', 'poll_male': '-', 'poll_female': '-', 'poll_transgender': '-', 'poll_total': '-', 'issues': 'Yes' },
        { 'assembly': 'East', "sector_officer": "Sanjay B.", 'polling_booth': 'Booth 3', 'pre_pol_status': 'Done', 'poll_male': '3001', 'poll_female': '2300', 'poll_transgender': '253', 'poll_total': '5554', 'issues': 'NO' },
        { 'assembly': 'West', "sector_officer": "Aniket A.R.", 'polling_booth': 'Booth 4', 'pre_pol_status': 'Done', 'poll_male': '2301', 'poll_female': '1998', 'poll_transgender': '349', 'poll_total': '4648', 'issues': 'No' },
        { 'assembly': 'Paithan', "sector_officer": "Azad M.", 'polling_booth': 'Booth 5', 'pre_pol_status': 'Done', 'poll_male': '809', 'poll_female': '625', 'poll_transgender': '97', 'poll_total': '1513', 'issues': 'Yes' },
        { 'assembly': 'Kannad', "sector_officer": "Prashant R.", 'polling_booth': 'Booth 6', 'pre_pol_status': 'Done', 'poll_male': '1001', 'poll_female': '896', 'poll_transgender': '140', 'poll_total': '2037', 'issues': 'NO' }

    ])

    const [error, setError] = useState('');
//    const [userId, setUserId] = useState(loadUser().payload);

    const [userId, setUserId] = useState(loadUser.login);
    const [token, setToken] = useState(loadUser.pay_token);


    async function getUserData(assembly) {
        try {
            let body = get_body(userId, token)
            body['assembly'] = assembly
            const response = await getData(`${urlPre}/${get_booth}`, body);
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



    const [prePollDataActive, setPrePollDataActive] = useState(data)


    const handleClick = (assembly) => {
        console.log('Assembly --> ', assembly)
        setData(prePollDataActive.filter(obj => obj.assembly === assembly))

    };




    useEffect(() => {
        console.log("Booth LEVEL")
        try {
            getUserData('all')
        } catch (error) { console.log(error)}
        // Fetch data from the server on component mount
        //getUserData(loadUser().payload)     

    }, []);

    const handleDropdownClick = (index) => {
        // Implement your dropdown menu logic here
        // You can access the detailed data for the selected row using data[index]
        console.log('Dropdown clicked for row:', index);
        window.location.href = `/dbview?booth=${index}`;
    };
    const handleLocationClick = (url) => {
        console.log(`Clicked button: ${url}`);
        window.location.href = `/map`;
    }
    const [selectedCategory, setSelectedCategory] = useState('EVM Issues');

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
        getUserData(selectedCategory)
        handleClick(event.target.value)
        //onCategoryChange(event.target.value); // Pass selected category to parent
    };
    
    return (
        <div className='internal-container'>
            
            <h2>Booth Level View</h2>
            <br />
            <div className="internal-container-table">
                <div className="toggle-button">
                    <label>Select Issue type  :</label>
                    <select value={selectedCategory} onChange={handleCategoryChange}>
                        <option value="Sillod">Sillod</option>
                        <option value="Kannad">Kannad</option>
                        <option value="Phulambri">Phulambri</option>
                    </select></div>
                <table >
                    <thead style={{ borderBottom: '1px solid blue' }}>

                        <tr  style={{ backgroundColor: "lightgray" }}>
                        <th>Sector</th>
                        <th>Sector Officer</th>
                        <th>Polling Booth</th>
                        <th>Pre Poll Status</th>
                        <th>Male Votes</th>
                        <th>Female Votes</th>
                        <th>TransGender Votes</th>
                        <th>Total Votes</th>
                        <th>Issue</th>
                        <th>Location</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, index) => (

                        <tr key={index} onClick={() => handleDropdownClick(index)}
                            className={row.issues === 'Yes' ? 'alerts-border' : 'no-issue-row'}
                        >
                            <td>{row.assembly}</td>
                            <td>{row.sector_officer}</td>
                            <td>{row.polling_booth}</td>
                            <td>{row.pre_pol_status}</td>
                            <td>{row.poll_male}</td>
                            <td>{row.poll_female}</td>
                            <td>{row.poll_transgender}</td>
                            <td>{row.poll_total}</td>
                            <td>{row.issues}</td>


                            <td> <a onClick={() => handleLocationClick(row.location)}><img src={require('../../assets/ICON/icon_location.png')} /></a></td>

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

export default BoothLevelView;

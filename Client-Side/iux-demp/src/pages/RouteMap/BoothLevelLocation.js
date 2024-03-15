import React, { useState, useEffect } from 'react';
import { Button, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '../CommonComponents/ExpandMoreIcon'
import '../../assets/styles.css'
import IconLoc from '../CommonComponents/IconComponent';
import axios from 'axios';
import { getURLParams, loadUser } from '../../components/actions'
import { getData } from '../../components/apiActions';
import { get_body, get_booth,get_booths, get_issue_complete_detail, urlPre } from '../../components/globalApiConfig';


function BoothLevelLocation({ title, locations, onLocationClick }) {
    const [booths, setBooths] = useState([
        { "assembly": "Sillod", "booth": "booth 1" },
        { "assembly": "Sillod", "booth": "booth 2" },
        { "assembly": "Sillod", "booth": "booth 3" }
    ])
    const [data, setData] = useState([])
    const handleLocationClick = (url) => {
        console.log(`Clicked button: ${url}`);
        window.location.href = `/map`;
    }
    const [error, setError] = useState('');

    /*const handleLogin = async () => {
        console.log("Login Initiated")




        try {
            const response = await axios.get('http://localhost:5000/get_district', {});
            if (response && response.data) {
                //console.log(response.data); // Handle successful login
                setData(response.data)

                //user_id, level, base-> d/sec/b, token,


                //remove
            } else {
                // Handle unexpected response format
                console.error('Unexpected response format:', response);
            }
        } catch (error) {
            if (error.response && error.response.data) {
                setError(error.response.data.message); // Handle login error
            } else {
                // Handle unexpected error format
                console.error('Unexpected error format:', error);
            }
        }
    };
*//*
    useEffect(() => {
       *//* handleLogin();
        console.log(data['assembly_id'])*//*
        
    },[])*/

    const onAssemblyClick = (id) => { console.log(id) }

    const user_id = loadUser.payload
    const token = loadUser.pay_token
    const level = loadUser.pay_level
    const assembly = loadUser.pay_assembly_code
    const [params, setParams] = useState('1')
    const getBooths = async () => {
        try {
            let body = get_body(user_id, token)
            body['assembly'] = assembly
            const response = getData(`${urlPre}/${get_booths}`, body)
            if (response) {
                setBooths(response)
            }
        } catch { console.log('API FAILED ') }
    }
    const [booth, setBooth] = useState({
        "location": "Sillod", "sector_officer": "booth 1", 'issue_status':'open'
    })
    const getBoothDetail = async () => {
        try {
            let body = get_body(user_id, token)
            body['assembly'] = assembly
            const response = getData(`${urlPre}/${get_booth}`, body)
            if (response) {
                setBooth(response)
            }
        } catch { console.log('API FAILED ') }
    }
    return (
        <div>
            <br/>
            <h2>Booth level Location</h2>
            <br />
            <br />
            <ul>
                {locations.map((location) => (
                    <li key={location.id}>
                        {location.booth && (
                            <Accordion onClick={() => getBoothDetail(location)} className={location.issue === 'yes' ? 'alerts-border' : 'non-alert'}>
                                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                    {location.booth}
                                </AccordionSummary>

                                <AccordionDetails>
                                    <div>
                                        <table>
                                            <thead>
                                                <th></th>
                                            </thead>
                                            <tbody>
                                                <tr><td>Booth Location :</td><td><a onClick={() => handleLocationClick('ARO')}><IconLoc/></a> </td></tr>
                                                <tr><td>Sector Officer  :</td><td><a onClick={() => handleLocationClick('ARO')}><IconLoc /></a> </td></tr>
                                                <tr><td>Issue Status: </td><td> {location.issue}</td></tr>
                                                
                                            </tbody>

                                        </table>
                                    </div>


                                   
                                </AccordionDetails>
                            </Accordion>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default BoothLevelLocation;

import React, { useEffect, useState} from "react";
import { useParams } from 'react-router-dom';
import { NavigationBar, Button } from "../CommonComponents/CommonComponents";
import '../../assets/styles.css'
import Form from "./Form";
import { postData, getData, putData, deleteData, handleApiError } from '../../components/apiActions'
import { timeDataTemp } from '../../components/timeReport'
import { loadUser, LoginType, getURLParams, loadUserLogin } from '../../components/actions';
import { urlPre, get_booths , post_issue_form, post_poll_closed, get_issues_url, post_pre_poll, get_assembly_dash, get_body, get_issues_dash, get_pre_poll_status, get_time_based_report, get_issues_detail, get_count_data } from '../../components/globalApiConfig';



const ReportBooth = () => {

    
    // Access information from the location object:

    //const { target } = useParams();
    const [booth, setBooth] = useState([{ "name": 'Booth 3', status: 'done' },
        { "name": 'Booth 1', status: 'done'},
        { "name": 'Booth 2', status: 'done' }])

    const [userId, setUserId] = useState(loadUser().payload);
    const [assembly, setAssembly] = useState(loadUser().pay_assembly_code);

    const [level, setLevel] = useState(loadUser().pay_level);
    const [token, setToken] = useState(loadUser().pay_token);
    const getBooths = async () => {

     
        try {
            let body = get_body(userId, token, level)
            body['assembly'] = assembly

            const response = await postData(`${urlPre}/${get_booths}`, body);
            if (response) {
                setBooth(response)
                console.log(response);
            }
        } catch (error) {
            console.log("Server Failed to respond")
            handleApiError(error)
        }
    }
    

    // Example Usage
    
    const handleClick = (booth) => {

        const urlParams = getURLParams();
        console.log(urlParams);

        window.location.href = `/${urlParams.target}?booth=${booth}`
        console.log('FORM SUBMITTED')
    }
    useEffect(() => {
        getBooths()
    }, []);
    return (
        <div className="internal-container">

            <main className="internal-container">

                <div className="internal-container-table booth-select">
                    <table >
                        <thead>

                            <tr>
                                <th>Booth Name</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {booth.map((row, index) => (

                                <tr key={index}  className={row.status === 'Done' ? 'issue-row' : 'no-issue-row'}>

                                    <td onClick={() => handleClick(row.name)}>{row.name}</td>
                                    <td>{row.status}</td>
 
                                    

                                </tr>


                            ))}
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    );
};

export default ReportBooth;

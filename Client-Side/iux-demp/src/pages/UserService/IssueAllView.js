import React, { useState, useEffect } from 'react';
import '../../assets/styles.css'
import IconLoc from '../CommonComponents/IconComponent';

import { loadUser, LoginType, loadUserLogin } from '../../components/actions';
import { get_allIssue, urlPre, get_body } from '../../components/globalApiConfig';
import { getData } from '../../components/apiActions';
function IssueAllView(issuesD, openIssue, issueType, allIssue) {
    const [issues, setIssues] = useState(issuesD.issuesD);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [userId, setUserId] = useState(loadUser.login);
    const [token, setToken] = useState(loadUser.pay_token);

    useEffect(() => {
        console.log("--------", issuesD.issuesD)
        try { getUserData() } catch (error) { console.log(error) }
    }, []);
    const handleLocationClick = (url) => {
        console.log(`Clicked button: ${url}`);
        window.location.href = `/map`;
    }
    
    
    //openIssue, issueType, allIssue

    async function getUserData() {
        try {
            let body = get_body(userId, token)
            body['issue_status'] = openIssue
            body['issue_type'] = issueType
            body['all_issue'] = allIssue

            const response = await getData(`${urlPre}/${get_allIssue}`, body )
            if (response) {
                setIssues(response)
            }
            else {
                console.log(issues)
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
    const handleDropdownClick = (index) => {
        // Implement your dropdown menu logic here
        // You can access the detailed data for the selected row using data[index]
        console.log('Dropdown clicked for row:', index);
        window.location.href = `/issuedetailsview?issue=${index}`;
    };



    return (
        <div className='internal-container'>

            <main className='internal-container'>
                <br />

                {issues.length > 0 && (
                    <div style={{ border: '0px solid white !important' }}   >
                        <table>
                            <thead>
                                <tr style={{ backgroundColor: "lightgray" }}>
                                    <th>Issue</th>
                                    <th>Publisher</th>
                                    <th>Status</th>
                                    <th>Assembly</th>
                                    <th>Poll Booth</th>
                                    <th>Contact</th>
                                    <th>Location</th>
                                    <th>Time</th>
                                </tr>
                            </thead>
                            <tbody>
                                {issues.map((issue) => (
                                    <tr onClick={() => handleDropdownClick(issue.id)} key={issue.id} className={issue.status === 'Open' ? 'alerts-border' : 'non-alert'} >
                                        <td>{issue.title}</td>
                                        <td>{issue.publisher}</td>
                                        <td>{issue.status}</td>
                                        <td>{issue.assembly}</td>
                                        <td>{issue.pollbooth}</td>
                                        <td>{issue.contact}</td>
                                        <td><a onClick={() => handleLocationClick(issue.location_url)}><img src={require('../../assets/ICON/icon_location.png')} /></a> </td>
                                        <td>{issue.time}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>)}
                     </main> </div>
    );
}

export default IssueAllView;

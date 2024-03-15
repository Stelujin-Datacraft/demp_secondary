import React, { useState, useEffect } from 'react';
import '../../assets/styles.css'
import IconLoc from '../CommonComponents/IconComponent';

import { loadUser, LoginType, loadUserLogin } from '../../components/actions';
import { get_allIssue, urlPre, get_body } from '../../components/globalApiConfig';
import { getData } from '../../components/apiActions';
import Modal from "./Modal";

function IssueAssemblyView(openIssue, issueType, allIssue) {



     const [issues, setIssues] = useState([
        {   
            "id": 'Issue is the best',
            "title": 'EVM',
            "publisher": 'SO. ARO',
            "status": 'Open',
            "assembly": 'Sillod',
            "pollbooth": 'Booth 1',
            "contact": '9049807255',
            "contact_url": "https://sjcbsbk",
            "location": 'Abad',
            "time": '2 mins',
            "location_url": 'https://hcjsk'
        },
        {
            "id": 'Issue is the best',
            "title": 'Law and Order',
            "publisher": 'SO. ARO',
            "status": 'Closed',
            "assembly": 'Phulambri',
            "pollbooth": 'Booth 1',
            "contact": '9049807255',
            "contact_url": "https://sjcbsbk",
            "location": 'Abad',
            "time": '40 mins',
            "location_url": 'https://hcjsk'
        }, {
            "id": 'Issue is the best',
            "title": 'EVM',
            "publisher": 'SO. ARO',
            "status": 'Closed',
            "assembly": 'Kannad',
            "pollbooth": 'Booth 1',
            "contact": '9049807255',
            "contact_url": "https://sjcbsbk",
            "location": 'Abad',
            "time": '1 hour',
            "location_url": 'https://hcjsk'
        },
    ]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [userId, setUserId] = useState(loadUser.login);
    const [token, setToken] = useState(loadUser.pay_token);
    useEffect(() => {
        try { getUserData() } catch (error) { console.log(error) }
    }, []);
    const handleLocationClick = (url) => {
        console.log(`Clicked button: ${url}`);
        window.location.href = `/map`;
    }
    
    
    async function getUserData() {
        try {
            let body = get_body(userId, token)
            body['issue_status'] = openIssue
            body['issue_type'] = issueType
            body['all_issue'] = allIssue

            const response = await getData(`${urlPre}/${get_allIssue}`, body)
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

    const [issueId, setIssueId] = useState('1')
    const [isOpen, setIsOpen] = useState(false);

    const handleCloseClick = async () => {
        try {
            //const response = await axios.post(`/api/issues/${issueId}/close`);
            // Handle successful close response (e.g., update UI)
            console.log('Issue closed successfully:');
            setIsOpen(false); // Close modal after successful close
        } catch (error) {
            console.error('Error closing issue:', error);
            // Handle error (e.g., display error message)
        }
    };
    const openModal = () => {
        console.log('CLICKED')
        setIsOpen(true)
    };
    const closeModal = () => setIsOpen(false);
    const [open, setOpen] = React.useState(false);

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    return (
        <div className='internal-container'>
            
            <main className='internal-container'>
                <br />

                        {isLoading && <p>{/*Loading issues...*/}</p>}
                        {error && <p>{/*Error: {error.message}*/}</p>}
                        {issues.length > 0 && (
                            <div style={{ border: '0px solid white !important' }}   >
                                <table>
                                    <thead>
                                        <tr style={{ backgroundColor: "lightgray" }}>
                                            <th>Issue</th>
                                            <th>Assembly</th>

                                            <th>Publisher</th>
                                            <th>Issues</th>
                                            <th>Contact</th>
                                            <th>Location</th>
                                            <th>Time</th>
                                    <th>Status</th>

                                </tr>
                                    </thead>
                                    <tbody>
                                        {issues.map((issue) => (
                                            <tr key={issue.id} className={issue.status === 'Open' ? 'alerts-border' : 'non-alert'} >
                                                <td>{issue.assembly}</td>

                                                <td>{issue.title}</td>
                                                <td>{issue.publisher}</td>
                                                <td>{issue.pollbooth}</td>
                                                <td>{issue.contact}</td>
                                                <td><a onClick={() => handleLocationClick(issue.location_url)}><img src={require('../../assets/ICON/icon_location.png')} /></a> </td>
                                                <td>{issue.time}</td>
                                                <td>{issue.status}</td>
                                                <td> <div
                                                    style={{
                                                        textAlign: "center",
                                                        display: "block",
                                                        margin: "auto",
                                                    }}
                                                >
                                                    <button type="button" onClick={handleOpen}>
                                                        Close Issue
                                                    </button>
                                                    <Modal isOpen={open} onClose={handleClose}>
                                                        <>
                                                            <h1>GFG</h1>
                                                            <h3>A computer science portal!</h3>
                                                        </>
                                                    </Modal>
                                                </div></td>

                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>)}
            </main> </div>
    );
}

export default IssueAssemblyView;

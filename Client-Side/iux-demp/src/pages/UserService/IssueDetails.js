import React, { useState, useEffect } from 'react';
import '../../assets/styles.css'; // Import CSS file for styling
import { getURLParams, loadUser } from '../../components/actions'
import { getData } from '../../components/apiActions';
import { get_body, get_issue_complete_detail, urlPre } from '../../components/globalApiConfig';

const IssueDetails = () => {
    const [issueStatus, setIssueStatus] = useState('Open');

    // Sample data (replace with actual data from props or state)
    const [issue,setIssue] = useState({
        assemblyName: 'Sillod',
        boothName: 'Booth 145',
        sectorOfficerName: 'Shanker Kulkarni',
        sectorOfficerContact: '123-456-7890',
        sectorOfficerLocation: 'Location',
        masterTrainer: 'Harsh Pandey',
        masterTrainerLocation: 'Location',
        masterTrainerContact: '987-654-3210',
        issueType: 'EVM',
        issueDescription: 'Sample Issue Description'
    });

    const handleStatusChange = (e) => {
        setIssueStatus(e.target.value);
    };
    const [isAssmbly, setIsAssmbly] = useState('Paithan')
    const user_id = loadUser.payload
    const token = loadUser.pay_token
    const level = loadUser.pay_level
    const [params, setParams]  = useState('1')
    const getIssueDetails = async () => {
        try {
            let body = get_body(user_id, token)
            body['id'] = params
            const response = getData(`${urlPre}/${get_issue_complete_detail}`, body)
            if (response) {
                setIssue(response)
            }
        } catch { console.log('API FAILED ') }
    }
    useEffect(() => {
        const urlParams = getURLParams();
        console.log(urlParams.id);
        setParams(urlParams.id)

        //try { getPrePollStatus() } catch (error) { console.log(error) }
    }, []);
    return (
        <div className="issue-details-container">
            <h2 className="issue-details-title">Issue Details</h2>
            <div className='internal-container-table dash'>
                <div className="issue-details-item">
                    <strong className="issue-details-label">Issue Type:</strong> {issue.issueType}
                </div>
                <div className="issue-details-item">
                    <strong className="issue-details-label">Issue Status:</strong>{' '}
                    <select value={issueStatus} onChange={handleStatusChange} className="issue-status-select">
                        <option value="Open">Open</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Closed">Closed</option>
                    </select>
                </div>
                <div className="issue-details-item">
                    <strong className="issue-details-label">Issue Description:</strong> {issue.issueDescription}
                </div></div>
            <table className="issue-details-table">
                <tbody>
                    <tr>
                        <td><strong>Assembly Name:</strong></td>
                        <td>{isAssmbly}</td>
                    </tr>
                    <tr>
                        <td><strong>Booth Name:</strong></td>
                        <td>{issue.boothName}</td>
                    </tr>
                    <tr>
                        <td><strong>Sector Officer Name:</strong></td>
                        <td>{issue.sectorOfficerName}</td>
                    </tr>
                    <tr>
                        <td><strong>Sector Officer Contact:</strong></td>
                        <td>{issue.sectorOfficerContact}</td>
                    </tr>
                    <tr>
                        <td><strong>Sector Officer Location:</strong></td>
                        <td>{issue.sectorOfficerLocation}</td>
                    </tr>
                    <tr>
                        <td><strong>Master Trainer:</strong></td>
                        <td>{issue.masterTrainer}</td>
                    </tr>
                    <tr>
                        <td><strong>Master Trainer Location:</strong></td>
                        <td>{issue.masterTrainerLocation}</td>
                    </tr>
                    <tr>
                        <td><strong>Contact Master Trainer:</strong></td>
                        <td>{issue.masterTrainerContact}</td>
                    </tr>
                </tbody>
            </table>
            <br />
            <br />
            <br />
            
        </div>
    );
};

export default IssueDetails;

import React, { useState, useEffect } from 'react';
import IconLoc from '../CommonComponents/IconComponent';
import { postData, getData, putData, deleteData, handleApiError } from '../../components/apiActions'
import { timeDataTemp } from '../../components/timeReport'
import { loadUser, LoginType, loadUserLogin, getURLParams } from '../../components/actions';
import { urlPre, get_pre_poll_status_booth, get_assembly_details, get_booth_based_report, get_assembly_dash, get_body, get_issues_dash, get_pre_poll_status, get_time_based_report, get_issues_detail, get_count_data, get_issue_detail } from '../../components/globalApiConfig';

const DetailedBoothView = ({ data_resp }) => {
    const [timeBasedData, setTimeBasedData] = useState(timeDataTemp)
    // Destructure data object (assuming data is passed as a prop)
    const [data, setData] = useState({
        assembly: '',
        location: '',
        aroLocation: '',
        aroContact: '',
        soLocation: '',
        soContact: '',
        prePollConducted: '',


    });
    const reportData = [
        {
            "assembly": "My Assembly Name",
            "pollStart": "07:00 AM",
            "maleVotes": 100,
            "femaleVotes": 80,
            "transVotes": 5,
            "totalVotes": 185
        }
        // ... data for other booths
    ]
    const timeBasedReport = [
        {
            "time": "7:00 AM - 9:00 AM",
            "assembly": "My Assembly Name",
            "maleVotes": 220,
            "femaleVotes": 175,
            "transVotes": 8,
            "totalVotes": 403
        },
        {
            "time": "9:00 AM - 11:00 AM",
            "assembly": "My Assembly Name",
            "maleVotes": 150,
            "femaleVotes": 120,
            "transVotes": 4,
            "totalVotes": 274
        },
        // ... data for other timeframes
    ]

    const location = data.location
    const aroLocation = data.aroLocation
    const aroContact = data.aroContact
    const soLocation = data.soLocation
    const soContact = data.soContact
    const prePollConducted = data.prePollConducted
    const [userId, setUserId] = useState(loadUser().payload);
    const [assembly, setAssembly] = useState(loadUser().pay_assembly_code);
    const [userType, setUserType] = useState(loadUserLogin())
    const [booth, setBooth] = useState(loadUser().pay_booth_code)
    const [level, setLevel] = useState(loadUser().pay_level);
    const [token, setToken] = useState(loadUser().pay_token);




    async function getTimeBasedReport(userId, token) {
        try {
            if (userType.payload === LoginType.ADMIN) { (setAssembly('all')) }
            let body = get_body(userId, token, level)
            body["assembly"] = assembly
            const response = await getData(`${urlPre}/${get_time_based_report}`, body);
            console.log(response)
            if (response) { timeBasedData(response); }

        } catch (error) {
            console.log("Server Failed to respond")

            handleApiError(error)

        }
    }
    const [issueDetail, setIssueDetail] = useState({
        "issue": "",
        "description": "",
        "status": "",
        "time": "",
        "so_contact": "",
    })
    async function getTimeBasedReport(userId, token) {
        try {
            if (userType.payload === LoginType.ADMIN) { (setAssembly('all')) }
            let body = get_body(userId, token, level)
            body["assembly"] = assembly
            const response = await getData(`${urlPre}/${get_issue_detail}`, body);
            console.log(response)
            if (response) { setIssueDetail(response); }

        } catch (error) {
            console.log("Server Failed to respond")

            handleApiError(error)

        }
    }

    const [prePoll, setPrePoll] = useState({
        'mockPoll': '',
        'evmClear':''
    })
    async function getPrePollBooth(userId, token) {
        try {
            if (userType.payload === LoginType.ADMIN) { (setAssembly('all')) }
            let body = get_body(userId, token, level)
            body["assembly"] = assembly
            const response = await getData(`${urlPre}/${get_pre_poll_status_booth}`, body);
            console.log(response)
            if (response) { setPrePoll(response); }

        } catch (error) {
            console.log("Server Failed to respond")

            handleApiError(error)

        }
    }
    useEffect(() => {
        if (data_resp) { setData(data_resp) }
        try { 
        const urlParams = getURLParams();
            console.log(urlParams);
            if (urlParams.booth) {
                setBooth(urlParams.booth)
            }
        } catch { console.log(booth)}
/*
        window.location.href = `/${urlParams.target}?booth=${booth}`
        console.log('FORM SUBMITTED')*/
}, []);
    return (
        <div className='internal-container'>
        <div className="detailed-assembly-view">
            <section className="section-detail">
                <h2>Booth Details</h2>
                <p>Assembly: {assembly}</p>
                <p>Location: {location}</p>
                <p>
                    ARO Location: {aroLocation} - Contact: {aroContact}
                </p>
                <p>
                    SO Location: {soLocation} - Contact: {soContact}
                </p>
            </section>

            <h2>Pre-Poll Conducted</h2>
            <table>
                <thead>
                    <tr>
                        <th>Booth</th>
                        <th>Status</th>
                    </tr>
                </thead>
                    <tbody>
                    <tr>
                            <td>Mock Poll Conducted</td>
                            <td>{prePoll.mockPoll ? 'EVM Cleared' : 'NA'}</td>
                    </tr>
                    <tr>
                            <td>EVM Cleared </td>
                            <td>{prePoll.evmClear ? 'EVM Cleared' : 'NA'}</td>
                    </tr>
                </tbody>
            </table>

            <h2>Issue Report</h2>
            <table>
                <thead>
                    <tr>
                        <th>Issue </th>
                        <th>Issue Status</th>
                        <th>Description</th>
                        <th>Time</th>
                        <th>SO contact</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                        <tr >
                            <td>{issueDetail.issue}</td>
                            <td>{issueDetail.description}</td>
                            <td>{issueDetail.status}</td>
                            <td>{issueDetail.so_contact}</td>
                            <td>{issueDetail.time}</td>
                            <td><a>close</a></td>
                        </tr>
                    
                </tbody>
            </table>

            <h2>Time Based Report (7 AM - 5 PM)</h2>

                <table >
                    <thead>
                        <tr
                            style={{ backgroundColor: '#2260ff', color: 'white' }}
                        >
                            <th>Time</th>

                            <th>Male</th>
                            <th>Female</th>
                            <th>Trans</th>
                            <th>Total</th>

                        </tr>
                    </thead>

                    <tbody>
                        {timeBasedData.map((row, index) => (
                            <tr key={index} >
                                <td>{row.time}</td>

                                <td>

                                    <tr><td>{row.assembly[0].total_male_count}</td></tr>

                                </td>
                                <td>

                                    <tr><td>{row.assembly[0].total_female_count}</td></tr>

                                </td>
                                <td>


                                    <tr><td>{row.assembly[0].total_trans_count}</td></tr>
                                </td>
                                <td>
                                    <tr><td>{row.assembly[0].total_count}</td></tr>

                                </td>
                            </tr>))}
                    </tbody>
                </table>
        </div>
    </div>);
};

export default DetailedBoothView;

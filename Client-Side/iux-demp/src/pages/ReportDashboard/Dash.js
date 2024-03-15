import React, { useState, useEffect } from 'react';
import '../../assets/styles.css'
import axios from 'axios';
import { Doughnut } from 'react-chartjs-2';
import { postData, getData, putData, deleteData, handleApiError } from '../../components/apiActions'
import { timeDataTemp } from '../../components/timeReport'
import { loadUser, LoginType, loadUserLogin } from '../../components/actions';
import { urlPre, get_issues_url, get_assembly_dash, get_body, get_issues_dash, get_pre_poll_status, get_time_based_report, get_issues_detail, get_count_data } from '../../components/globalApiConfig';

import DashBarAssembly from './DashBarAssembly';

function Dash() {
    //const [data, setData] = useState([]); // State to store fetched data
    const [timeBasedData, setTimeBasedData] = useState(timeDataTemp)

    const [countData, setCountData] = useState({
        'total_count': '0',
        'male_count': '0',
        'female_count': '0',
        'trans_count': '0',
        'total_count_per': '0',
        'male_count_per': '0',
        'female_count_per': '0',
        'trans_count_per': '0',

    })


    const [assemblyData, setAssemblyData] = useState(
        [
            {
                'assembly': 'Sillod',
                'polling_booth': 'Booth 1',
                'pre_pol_status': 'Done',
                'male_votes': 0,
                'female_votes': 0,
                'transgender_votes': 0,
                'total_votes': 0,
                'issues': '7',
                'poll_male_per': '0',
                'poll_female_per': '0',
                'poll_transgender_per': '0',
                'poll_total_per': '0'
            },

            {
                'assembly': 'East',
                'polling_booth': 'Booth 3',
                'pre_pol_status': 'Done',
                'male_votes': 0,
                'female_votes': 0,
                'transgender_votes': 0,
                'total_votes': 0,
                'issues': '0',
                'poll_male_per': '0',
                'poll_female_per': '0',
                'poll_transgender_per': '0',
                'poll_total_per': '0'
            },

            {
                'assembly': 'Central',
                'polling_booth': 'Booth 6',
                'pre_pol_status': 'Done',
                'male_votes': 0,
                'female_votes': 0,
                'transgender_votes': 0,
                'total_votes': 0,
                'issues': '0',
                'poll_male_per': '0',
                'poll_female_per': '0',
                'poll_transgender_per': '0',
                'poll_total_per': '0'
            },

            {
                'assembly': 'West',
                'polling_booth': 'Booth 4',
                'pre_pol_status': 'Done',
                'male_votes': 0,
                'female_votes': 0,
                'transgender_votes': 0,
                'total_votes': 0,
                'issues': '0',
                'poll_male_per': '0',
                'poll_female_per': '0',
                'poll_transgender_per': '0',
                'poll_total_per': '0'
            },

            {
                'assembly': 'Kanand',
                'polling_booth': 'Booth 2',
                'pre_pol_status': 'NO',
                'male_votes': 0,
                'female_votes': 0,
                'transgender_votes': 0,
                'total_votes': 0,
                'issues': '12',
                'poll_male_per': '0',
                'poll_female_per': '0',
                'poll_transgender_per': '0',
                'poll_total_per': '0'
            },

            {
                'assembly': 'Paithan',
                'polling_booth': 'Booth 5',
                'pre_pol_status': 'Done',
                'male_votes': 0,
                'female_votes': 0,
                'transgender_votes': 0,
                'total_votes': 0,
                'issues': '4',
                'poll_male_per': '0',
                'poll_female_per': '0',
                'poll_transgender_per': '0',
                'poll_total_per': '0'
            },

            {
                'assembly': 'Kannad',
                'polling_booth': 'Booth 7',
                'pre_pol_status': 'Done',
                'male_votes': 0,
                'female_votes': 0,
                'transgender_votes': 0,
                'total_votes': 0,
                'issues': '0',
                'poll_male_per': '0',
                'poll_female_per': '0',
                'poll_transgender_per': '0',
                'poll_total_per': '0'
            },

            {
                'assembly': 'Gangapur',
                'polling_booth': 'Booth 3',
                'pre_pol_status': 'Done',
                'male_votes': 0,  // Changed from poll_male
                'female_votes': 0,  // Changed from poll_female
                'transgender_votes': 0,  // Changed from poll_transgender
                'total_votes': 0,  // Changed from poll_total
                'issues': '0',
                'poll_male_per': '0',  // Changed to 0
                'poll_female_per': '0',  // Changed to 0
                'poll_transgender_per': '0',  // Changed to 0
                'poll_total_per': '0'  // Changed to 0
            },
            {
                'assembly': 'Vaijapur',
                'polling_booth': 'Booth 9',
                'pre_pol_status': 'Done',
                'male_votes': 0,  // Changed from poll_male
                'female_votes': 0,  // Changed from poll_female
                'transgender_votes': 0,  // Changed from poll_transgender
                'total_votes': 0,  // Changed from poll_total
                'issues': '0',
                'poll_male_per': '0',  // Changed to 0
                'poll_female_per': '0',  // Changed to 0
                'poll_transgender_per': '0',  // Changed to 0
                'poll_total_per': '0'  // Changed to 0
            }])


    const [issueData, setIssueData] = useState([
        { 'assembly': '-', 'booth':'-', 'issues': 'EVM', 'time':"-" },
       
    ])
    const [issueDataLaw, setIssueDataLaw] = useState([
        { 'assembly': '-', 'booth': '-', 'issues': 'LAW', 'time': "-" },
       
    ])
    const [activeIssue, setActiveIssue] = useState(issueData)
    const [error, setError] = useState('');
    const [userType, setUserType] = useState(loadUserLogin())

    const [userId, setUserId] = useState(loadUser().payload);
    const [assembly, setAssembly] = useState(loadUser().pay_assembly_code);

    const [level, setLevel] = useState(loadUser().pay_level);
    const [token, setToken] = useState(loadUser().pay_token);
    const [assemblyCode, setAssemblyCode] = useState(loadUser.pay_assembly_code);
    const [boothCode, setBoothCode] = useState(loadUser.booth_code);

    const [isOpenSelected, setIsOpenSelected] = useState(true);
    const [tBData, setTBData] = useState([{}]);
    const [issueKey, setIssueKey] = useState('evm');
    const [issueDetailsData, setIssueDetailsData] = useState({
        'total_issues': '0',
        'open_issues': '0',
        'closed_issues': '0',
        'evm_issues': '0',
        'law_issues':'0'

    })
    const [prePollData, setPrePollData] = useState([
        { 'assembly': 'Gangapur', 'mock_poll': 'Yes', 'evm_clear': 'Yes' },
        { 'assembly': 'Sillod', 'mock_poll': 'No', 'evm_clear': 'No' },
        { 'assembly': 'Paithan', 'mock_poll': 'No', 'evm_clear': 'Nos' },
        { 'assembly': 'East', 'mock_poll': 'Yes', 'evm_clear': 'Yes' },
        { 'assembly': 'Central', 'mock_poll': 'Yes', 'evm_clear': 'Yes' },
        { 'assembly': 'West', 'mock_poll': 'Yes', 'evm_clear': 'Yes' },
        { 'assembly': 'Vaijapur', 'mock_poll': 'Yes', 'evm_clear': 'Yes' },
        { 'assembly': 'Kannad', 'mock_poll': 'Yes', 'evm_clear': 'No' },
        { 'assembly': 'Phulambri', 'mock_poll': 'Yes', 'evm_clear': 'Yes' },
    ])


    const maleVotesData = {
        labels: [],
        datasets: [
            {
                data: [456, 1000], // Male votes as a proportion out of non-voters
                backgroundColor: [
                    'blue', // Red gradient
                    'rgba(211, 211, 211, 0.6)' // Lightgray gradient
                ],
            },
        ],
    };
    const feMaleVotesData = {
        labels: [],
        datasets: [
            {
                data: [456, 1000], // Male votes as a proportion out of non-voters
                backgroundColor: [
                    'pink', // Red gradient
                    'rgba(211, 211, 211, 0.6)' // Lightgray gradient
                ],
            },
        ],
    };
    const totalVotesData = {
        labels: [],
        datasets: [
            {
                data: [456, 1000], // Male votes as a proportion out of non-voters
                backgroundColor: [
                    'red', // Red gradient
                    'rgba(211, 211, 211, 0.6)' // Lightgray gradient
                ],
            },
        ],
    };
    const transVotesData = {
        labels: [],
        datasets: [
            {
                data: [456, 1000], // Male votes as a proportion out of non-voters
                backgroundColor: [
                    'lightgreen', // Red gradient
                    'rgba(211, 211, 211, 0.6)' // Lightgray gradient
                ],
            },
        ],
    };
    const [timeText, setTimeText] = useState('');
    function getTimeDifference(data, hoursDifference = 2) {
        // Convert seconds to unix timestamp
        const timestamp = data['_seconds'];

        // Calculate time difference with adjustment
        const current_time = Date.now() / 1000;  // Get current time in seconds since epoch
        const time_difference = current_time - timestamp - hoursDifference * 60 * 60;

        // Calculate days, hours, and minutes
        const days = Math.floor(time_difference / 86400);
        const hours = Math.floor((time_difference % 86400) / 3600);
        const minutes = Math.floor((time_difference % 3600) / 60);

        // Build the time text
        let timeText = '';
        if (days > 0) {
            timeText += `${days} day${days > 1 ? 's' : ''} `;
        }
        if (hours > 0) {
            timeText += `${hours} hour${hours > 1 ? 's' : ''} `;
        }
        if (minutes > 0) {
            timeText += `${minutes} min${minutes > 1 ? 's' : ''}`;
        }

        // Handle no time difference
        if (!timeText) {
            timeText = 'Just now';
        }

        return timeText.trim();
    }
    //Handle Clicks

    const handleClick = () => {
        setIsOpenSelected(!isOpenSelected);
        if (isOpenSelected) {
            console.log("Open")
            getIssueData(userId, token, issueDataLaw)
            if (issueDataLaw === '') {
                setIssueKey('law')
                getIssueData(userId, token, issueDataLaw)
                //setActiveIssue()
            }
            else { setActiveIssue(issueDataLaw) }

            //onResolvedClick();
        } else {
            console.log("CLosed")
            if (issueData === '') {
                setIssueKey('evm')
                getIssueData(userId, token, issueData)
            }
            else { setActiveIssue(issueData) }
            //onOpenClick();
        }
    };


    const handleDropdownClick = (index) => {
        // Implement your dropdown menu logic here
        console.log(`Clicked button: ${index}`);
        window.location.href = `/daview?assembly=${index}`;

    };
    const handleLocationClick = (url) => {
        console.log(`Clicked button: ${url}`);
        window.location.href = `/map`;
    }

    const handlePrePollClick = (assembly) => {
        console.log(`Clicked button: ${assembly}`);
        window.location.href = `/prepollview?assembly=${assembly}`;
    }



    // Handle Asyncs

    async function getAssemblyData(userId, token) {
        try {
            let body = get_body(userId, token, level)
            if (userType.payload === LoginType.ADMIN) { body['assembly'] = 'all' } else { body['assembly'] = assembly }
           
           
            const response = await getData(`${urlPre}/${get_assembly_dash}`, body);
            
            if (response) {
                try {
                    const data = response.map()
                    console.log(data)
                    setAssemblyData(response);
                } catch {
                    console.log(response)
                }
                
            }
            
        } catch (error) {
            console.log("Server Failed to respond")
            console.log(assemblyData) 
            handleApiError(error)

            }
    }

    async function getIssueDetails(userId, token) {
        try {
            let body = get_body(userId, token, level)
            if (userType.payload === LoginType.ADMIN) { body['assembly'] = 'all' } else { body['assembly'] = assembly }
            
            const response = await getData(`${urlPre}/${get_issues_detail}`, body);
           
            if (response) { setIssueDetailsData(response[0]); }
            
        } catch (error) {
            console.log("Server Failed to respond")
            
            handleApiError(error)

        }
    }
    async function getIssueData(userId, token, data) {
        console.log('ISSUE DATA IN')
        try {
            let body = get_body(userId, token, level)
            body['key'] = issueKey
            body['assembly'] = assembly
            console.log('ISSUE DATA TRY')

            const response = await getData(`${urlPre}/${get_issues_dash}`, body);
           
            console.log('ISSUE DATA TRY')
            console.log(response)

            if (response) {
                console.log("FUnction called in")
                setIssueData(response);
                setActiveIssue(response)
            } else { setIssueData(data)}
            console.log("FUnction called out")
        } catch (error) {
            console.log("Server Failed to respond")
          
            handleApiError(error)

        }
    }
   
    async function getPrePollStatus(userId, token) {
        try {
            let body = get_body(userId, token, level)
            if (userType.payload === LoginType.ADMIN) { body['assembly'] = 'all' } else { body['assembly'] = assembly }
            
            const response = await getData(`${urlPre}/${get_pre_poll_status}`,body );
            console.log(response)
            if (response) { setPrePollData(response); }

        } catch (error) {
            console.log("Server Failed to respond")
      
            handleApiError(error)

        }
    }
 

    async function getTimeBasedReport(userId, token) {
        try {
            if (userType.payload === LoginType.ADMIN) { (setAssembly('all')) }
            let body = get_body(userId, token, level )
            body["assembly"] = assembly
            const response = await getData(`${urlPre}/${get_time_based_report}`,body);
            console.log(response)
            if (response) { setTBData(response); }

        } catch (error) {
            console.log("Server Failed to respond")

            handleApiError(error)

        }
    }

    async function getCountData(userId, token) {
        try {
            const response = await getData(`${urlPre}/${get_count_data}/`, get_body(userId, token, level));
            console.log(response)
            if (response) { setCountData(response); }

        } catch (error) {
            console.log("Server Failed to respond")

            handleApiError(error)

        }
    }

    const handle = (row) => {
        console.log("ROW OF ROW")
        console.log(row)
        return row.time
    }
    const handleClickIssueRow = (assembly) => {

        console.log(`Clicked button: ${assembly}`);
        window.location.href = `/issuedetailsview?assembly=${assembly}`;
    }
    let key = 0
    const handleColors = () => {
        
        const arr = ['#FDF3E0', '#E6F7FF', '#F9EBEA', '#E0F2F1','#FFF9C4']
        if (key == 4) { key = 0 } else {
            key = key + 1
        }
        //console.log('key : ',key)
        return { backgroundColor: arr[key] }
    }

    useEffect(() => {
        // Fetch data from the server on component mount
        //getUserData(loadUser().payload)
        
        console.log(level, userType.payload, LoginType.ADMIN)
        try {
            
            
            getAssemblyData(userId, token)
            getIssueDetails(userId, token)
            getIssueData(userId, token, issueData)
            getPrePollStatus(userId, token)
            //getTimeBasedReport(userId, token)
            getCountData(userId, token)
            getTimeBasedReport(userId, token)
        } catch (error) {
            console.log(error)
        }
    }, []);
    

    return (
        <div style={{ overflowX: 'scroll', backgroundColor:'#eaeef6' }} className="internal-container">
            <br />
            {(userType.payload === LoginType.ADMIN) && (
                <div className="buttons-container-head">
                    <h2 style={{ paddingLeft: '20px' }} >DASHBOARD </h2>
                    <br />

                    <div className='internal-container-table' style={{
                        display: 'flex'
                    }}>
                        <div style={{ width: '30% !important', }} className='internal-container-table dash' style={{
                            marginLeft: ''
                        }}>
                            <h3>Total Votes<p style={{ color: 'gray' }}>{countData.total_count_per}</p></h3>
                            <h1>{countData.total_count} </h1></div>
                        <div style={{ width: '30%', }} className='internal-container-table dash' style={{
                            marginLeft: ''
                        }}>
                            <h3>Male Votes<p style={{ color: 'gray' }}>{countData.male_count_per}</p></h3>
                            <h2>{countData.male_count}</h2></div>
                        <div style={{ width: '30%', }} className='internal-container-table dash' style={{
                            marginLeft: ''
                        }}>
                            <h3>Female Votes<p style={{ color: 'gray' }}>{countData.female_count_per}</p></h3>
                            <h2>{countData.female_count} </h2></div>

                        <div style={{ width: '30%', }} className='internal-container-table dash' style={{
                            marginLeft: ''
                        }}>
                            <h3>Trans Votes <p style={{ color: 'gray' }}>{countData.trans_count_per}</p></h3>
                            <h2>{countData.trans_count} </h2></div>
                    </div>
                </div>)}{(userType.payload != LoginType.ADMIN) && (
                <div className="buttons-container-head">
                    <h2 style={{ paddingLeft: '20px' }} >{assembly} </h2>
                    <br /></div>
                )}


            <br />
            <br />
            <div style={{ display:'flex' }} className="top">
                <div style={{ width:'70%', }} className="internal-container-tab dash">
                    <div style={{ marginBottom: '30px' }} className="internal-container-table">
                        <div style={{ overflow: 'hidden', borderRadius:'15px' }}>

                    <table >
                    <thead>

                                    <tr style={{ backgroundColor: "#5988ffe6", color: 'white', fontFamily:'poppins'  }}>
                            <th>Assembly office</th>
                            <th>Male Votes</th>
                            <th>Female Votes</th>
                            <th>TransGender Votes</th>
                            <th>Total Votes</th>
                            <th>Issues</th>

                        </tr>
                    </thead>
                        <tbody>
                            { assemblyData.map((row, index) => (

                            <tr key={index} onClick={() => handleDropdownClick(row.assembly)}
                                className={row.issue != '0' ? 'alerts-border' : 'no-issue-row'}
                            >

                                    <td className="tableCell">{row.assembly}</td>
                                    <td className="tableCell"><td><b>{row.male_votes === '-' ? 'NA' : row.male_votes}</b></td><td>{row.male_votes === '-' ? 'NA' : row.male_votes_per}</td>  </td>
                                    <td className="tableCell"><td><b>{row.female_votes === '-' ? 'NA' : row.female_votes}</b></td><td>{row.female_votes === '-' ? 'NA' : row.female_votes_per}</td>  </td>
                                    <td className="tableCell"><td><b>{row.trans_votes === '-' ? 'NA' : row.trans_votes}</b></td><td>{row.trans_votes === '-' ? 'NA' : row.trans_votes_per}</td> </td>
                                    <td className="tableCell"><td><b>{row.total_votes === '-' ? 'NA' : row.total_votes}</b></td><td>{row.total_votes === '-' ? 'NA' : row.total_votes_per}</td></td>
                                <td>{row.issue}</td>
                           
                            </tr>


                        ))}
                    </tbody>
                            </table></div>
                    </div>
                    <div className="internal-container-table">

                        <header>
                            <div>Pre-Poll Status
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Assembly</th>
                                            <th>Mock - poll</th>
                                            <th>EVM clear</th>

                                            <th>Poll Start</th>
                                            <th>SO Contact</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {prePollData.map((row, index) => (
                                            <tr onClick={() => handlePrePollClick(row.assembly)}>
                                                <td>{row.assembly}</td>
                                                <td ><img style={{ width: '30px' }} src={row.mockpoll === 'Yes' ? "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAADFklEQVR4nO2WW0xScRzHz4v2ni8JA0VRuSkhMF9600DxmooiiKnokce2HnL22GrVQxfTtLd6yLx0WSvU1COguUxN5aIgEoqKst5M30p+7ZC3CQcBca3N7/bZDr/L//uF/ccOgpzpfxLfhTKELnWjwI1iQrfaInQ3bP9FbfHWXOpGfCbixoKVeqHAVTcs2GgAgfsYNhqAv46O8V3opRMb8wGNSl+pb+OvoR7+Ogohge8461rxM8IyF84rY3hOlS7dVQ8ngees1bLMqvOhffMpNIrnqNHyVlUQCbiO6lGWWRoddIA029X2i85aiCTcxarW4MznKjO432s83KUaiCj2ag/bqhAeG4BjrdKmOarhNOAsKIcCmjNnZOxUmxJS7VUn4vp6C6hW7/r2bEpgm8qZhAHYpoomjk0JYbOghNYfbwDX5u9t4FgrfWZYRvkN4l/AKMfY1koIC0sltLhfw54ebXT5nWOY5IOEARgG2SLLogB/VNtvwbWlh8Ca99OfV0DLes++Of7sd86iAKZBtkAYIGVWtsWck4MPxgrY/LXtPfzJWjcwzYd6Zrm3tief/hFwD8IAydNlPxkmGfhglMED58t9k+aVLm8NB3/2qZuISfkm3SQMkDRZaksxlINfZsqgebnzwGy50+czPkO4v0vSZImVMAD9awmWPFsGhExL4b79BRzVY0eHtxdwdxf6eAnxJUzUFd1MmpZCQKZK4Z7t+cFtt3d4a8fu7ULXFzUSBojT5jHoE8VAnyoJzEQxqA13QG24DUHNH9qLG5AQ/xHhoukLtIkTxXAa0HQFGHKcKJocQcJY4U7C+BWIJLTPRZ74j5IMJBhR+3PaaV+KIJJQByVPkWDF6pZGUz/l6uLHCiESUAZyxui92eeQUER6mxlD6cvWx43kQ9xomIzkA6U/R4efFZL5nljdrGjSe1E7Fcv1UPV5EBKYZIf8QdSGPOOH91J6WKSOTB6pV9xLwSRA0eUGBpMASSMeJvdcDu7ChaILr7KYse+ymmI1oiGyRmQl94m3cEgasSVWIxrEe/hMSIeeCfnH+gM5kThN5WVbbgAAAABJRU5ErkJggg==" :"https://img.icons8.com/ios-filled/50/FA5252/close-window.png" }/></td>
                                                <td ><img style={{ width: '30px' }} src={row.evm_clear === 'Yes' ? "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAADFklEQVR4nO2WW0xScRzHz4v2ni8JA0VRuSkhMF9600DxmooiiKnokce2HnL22GrVQxfTtLd6yLx0WSvU1COguUxN5aIgEoqKst5M30p+7ZC3CQcBca3N7/bZDr/L//uF/ccOgpzpfxLfhTKELnWjwI1iQrfaInQ3bP9FbfHWXOpGfCbixoKVeqHAVTcs2GgAgfsYNhqAv46O8V3opRMb8wGNSl+pb+OvoR7+Ogohge8461rxM8IyF84rY3hOlS7dVQ8ngees1bLMqvOhffMpNIrnqNHyVlUQCbiO6lGWWRoddIA029X2i85aiCTcxarW4MznKjO432s83KUaiCj2ag/bqhAeG4BjrdKmOarhNOAsKIcCmjNnZOxUmxJS7VUn4vp6C6hW7/r2bEpgm8qZhAHYpoomjk0JYbOghNYfbwDX5u9t4FgrfWZYRvkN4l/AKMfY1koIC0sltLhfw54ebXT5nWOY5IOEARgG2SLLogB/VNtvwbWlh8Ca99OfV0DLes++Of7sd86iAKZBtkAYIGVWtsWck4MPxgrY/LXtPfzJWjcwzYd6Zrm3tief/hFwD8IAydNlPxkmGfhglMED58t9k+aVLm8NB3/2qZuISfkm3SQMkDRZaksxlINfZsqgebnzwGy50+czPkO4v0vSZImVMAD9awmWPFsGhExL4b79BRzVY0eHtxdwdxf6eAnxJUzUFd1MmpZCQKZK4Z7t+cFtt3d4a8fu7ULXFzUSBojT5jHoE8VAnyoJzEQxqA13QG24DUHNH9qLG5AQ/xHhoukLtIkTxXAa0HQFGHKcKJocQcJY4U7C+BWIJLTPRZ74j5IMJBhR+3PaaV+KIJJQByVPkWDF6pZGUz/l6uLHCiESUAZyxui92eeQUER6mxlD6cvWx43kQ9xomIzkA6U/R4efFZL5nljdrGjSe1E7Fcv1UPV5EBKYZIf8QdSGPOOH91J6WKSOTB6pV9xLwSRA0eUGBpMASSMeJvdcDu7ChaILr7KYse+ymmI1oiGyRmQl94m3cEgasSVWIxrEe/hMSIeeCfnH+gM5kThN5WVbbgAAAABJRU5ErkJggg==" : "https://img.icons8.com/ios-filled/50/FA5252/close-window.png"} /></td>
                                                <td ><div className={row.evm_clear === 'Yes' ? 'tableStatusGreen' : 'tableStatusRed'}>{row.evm_clear === 'Yes' ? 'Started' : 'Not Started'}</div></td>
                                                <td><img style={{ width: '20px', margin:'5px' }} width="20" height="20" src="https://img.icons8.com/ios-filled/50/000000/ringer-volume.png" alt="ringer-volume" />9049807255</td>
                                            </tr>))}
                                    </tbody>
                                </table>

                            </div>
                        </header>
                    </div>

            </div>






                <div style={{ width: '30%', overflowY: 'scroll', height:'850px' }} className="internal-container-table  dash">

                    <header style={{border:'1px solid red'}}>
                        <div>Total Issues <div><h2 style={{color:'red'}}>{issueDetailsData.total_issues}</h2></div>
                        <table>
                            <thead>
                                <tr>
                                        <th>Open Issues</th>
                                        <th style={{ color: 'red' }} >{issueDetailsData.open_issues}</th>
                                </tr>
                                <tr>
                                        <th>Resolved Issues</th>
                                        <th style={{ color: 'green' }}>{issueDetailsData.closed_issues}</th>
                                </tr></thead>
                            </table>
                            <table>
                                <thead>
                                    <tr>
                                        <th>EVM Issues</th>
                                        <th>{issueDetailsData.evm_issues}</th>
                                    </tr>
                                    <tr>
                                        <th>LAW and Order Issues</th>
                                        <th>{issueDetailsData.law_issues}</th>
                                    </tr></thead>
                            </table>

                    </div>

                    <div > Open Issues
                            <div className="toggle-button">
                                <button
                                    className={isOpenSelected ? 'active' : ''}
                                    onClick={handleClick}
                                >
                                    EVM issues
                                </button>
                                <button
                                    className={!isOpenSelected ? 'active' : ''}
                                    onClick={handleClick}
                                >
                                    Law and Order issues
                                </button>
                            </div>

                        <table>
                                <thead>
                                    <tr style={{ fontSize:"14px" }}>
                                    <th>Assembly</th>
                                    <th>Booth</th>
                                    <th>Issues</th>
                                    <th>time</th>
                                </tr>
                            </thead>
                                <tbody>
                                    {activeIssue.map((row, index) => (
                                        <tr style={{ fontSize: "14px" }} onClick={() => handleClickIssueRow(row.assembly)}>
                                            <td>{row.assembly}</td>
                                            <td>{row.pollbooth}</td>
                                            <td>{row.issue_type}</td>
                                            <td>{getTimeDifference(row.time)}</td>
                                        </tr>))}
                            </tbody>
                        </table>
                    
                    </div>
                </header>
            </div>


            </div>





           
            <div className="internal-container-table dash">

                <header>
                    <div>Poll Status {assembly}
                        {(level === 'dl') && (
                        <table >
                            <thead>
                                <tr
                                    style={{ backgroundColor:'#2260ff', color:'white' }}
                                >
                                    <th>Time</th>
                                    <th></th>
                                    <th>Sillod</th>
                                    <th>Paithan</th>
                                    <th>Central</th>
                                    <th>West</th>
                                    <th>East</th>
                                    <th>Kannad</th>
                                    <th>Phulambri</th>
                                    <th>Vaijapur</th>
                                    <th>Gangapur</th>
                                </tr>
                            </thead>
                            <tbody>
                                {timeDataTemp.map((row, index) => (
                                    <tr key={index} style={handleColors()}>
                                        <td>{row.time}</td>
                                        <td>
                                            <tr><td>Total</td></tr>
                                            <tr><td>Male</td></tr>
                                            <tr><td>Female</td></tr>
                                            <tr><td>Trans</td></tr>

                                        </td>

                                        <td style={{ backgroundColor:'#0000ff12' }} onClick={() => handleDropdownClick(row.assembly[0].a)} >
                                            <tr><td >{row.assembly[0].total_count}</td></tr>
                                            <tr><td>{row.assembly[0].total_male_count}</td></tr>
                                            <tr><td>{row.assembly[0].total_female_count}</td></tr>
                                            <tr><td>{row.assembly[0].total_trans_count}</td></tr>
                                            </td>
                                        <td onClick={() => handleDropdownClick(row.assembly[1].a)}>
                                            <tr><td>{row.assembly[0].total_count}</td></tr>
                                            <tr><td>{row.assembly[0].total_male_count}</td></tr>
                                            <tr><td>{row.assembly[0].total_female_count}</td></tr>
                                            <tr><td>{row.assembly[0].total_trans_count}</td></tr>
                                        </td>
                                        <td style={{ backgroundColor: '#0000ff12' }} onClick={() => handleDropdownClick(row.assembly[2].a)}>
                                            <tr><td>{row.assembly[0].total_count}</td></tr>
                                            <tr><td>{row.assembly[0].total_male_count}</td></tr>
                                            <tr><td>{row.assembly[0].total_female_count}</td></tr>
                                            <tr><td>{row.assembly[0].total_trans_count}</td></tr>
                                        </td>
                                        <td onClick={() => handleDropdownClick(row.assembly[3].a)}>
                                            <tr><td>{row.assembly[0].total_count}</td></tr>
                                            <tr><td>{row.assembly[0].total_male_count}</td></tr>
                                            <tr><td>{row.assembly[0].total_female_count}</td></tr>
                                            <tr><td>{row.assembly[0].total_trans_count}</td></tr>
                                        </td>
                                        <td style={{ backgroundColor: '#0000ff12' }} onClick={() => handleDropdownClick(row.assembly[4].a)}>
                                            <tr><td>{row.assembly[0].total_count}</td></tr>
                                            <tr><td>{row.assembly[0].total_male_count}</td></tr>
                                            <tr><td>{row.assembly[0].total_female_count}</td></tr>
                                            <tr><td>{row.assembly[0].total_trans_count}</td></tr>
                                        </td>
                                        <td onClick={() => handleDropdownClick(row.assembly[5].a)}>
                                            <tr><td>{row.assembly[0].total_count}</td></tr>
                                            <tr><td>{row.assembly[0].total_male_count}</td></tr>
                                            <tr><td>{row.assembly[0].total_female_count}</td></tr>
                                            <tr><td>{row.assembly[0].total_trans_count}</td></tr>

                                        </td>
                                        <td style={{ backgroundColor: '#0000ff12' }} onClick={() => handleDropdownClick(row.assembly[6].a)}>
                                            <tr><td>{row.assembly[0].total_count}</td></tr>
                                            <tr><td>{row.assembly[0].total_male_count}</td></tr>
                                            <tr><td>{row.assembly[0].total_female_count}</td></tr>
                                            <tr><td>{row.assembly[0].total_trans_count}</td></tr>
                                        </td>
                                        <td onClick={() => handleDropdownClick(row.assembly[7].a)}>
                                            <tr><td>{row.assembly[0].total_count}</td></tr>
                                            <tr><td>{row.assembly[0].total_male_count}</td></tr>
                                            <tr><td>{row.assembly[0].total_female_count}</td></tr>
                                            <tr><td>{row.assembly[0].total_trans_count}</td></tr>
                                        </td>
                                        <td style={{ backgroundColor: '#0000ff12' }} onClick={() => handleDropdownClick(row.assembly[8].a)}>
                                            <tr><td>{row.assembly[0].total_count}</td></tr>
                                            <tr><td>{row.assembly[0].total_male_count}</td></tr>
                                            <tr><td>{row.assembly[0].total_female_count}</td></tr>
                                            <tr><td>{row.assembly[0].total_trans_count}</td></tr>
                                        </td>
                                    </tr>))}
                            </tbody>
                        </table>)}









                        {(level != 'dl') && (

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
                                {timeDataTemp.map((row, index) => (
                                    <tr key={index} style={handleColors()} >
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
                        </table>)}

                    </div>
                </header>
                

            </div>

           {/* <div className='internal-container-table'>
                <DashBarAssembly />

            </div>*/}











        </div>
    );
}

export default Dash;

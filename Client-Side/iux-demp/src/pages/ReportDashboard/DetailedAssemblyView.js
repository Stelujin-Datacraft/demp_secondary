import React, { useState, useEffect}from 'react';
import IconLoc from '../CommonComponents/IconComponent';
import { postData, getData, putData, deleteData, handleApiError } from '../../components/apiActions'
import { timeDataTemp } from '../../components/timeReport'
import { loadUser, LoginType, loadUserLogin, getURLParams } from '../../components/actions';
import { urlPre, get_assembly_details, get_booth_based_report, get_assembly_dash, get_body, get_issues_dash, get_pre_poll_status, get_time_based_report, get_issues_detail, get_count_data } from '../../components/globalApiConfig';

const DetailedAssemblyView = ({ data_resp }) => {
    // Destructure data object (assuming data is passed as a prop)
    const [timeBasedData, setTimeBasedData] = useState(timeDataTemp)
    const [tBData, setTBData] = useState()
    const [data, setData] = useState({
        assembly: '',
        location: '',
        aroLocation: '',
        aroContact: '',
        soLocation: '',
        soContact: '',
        prePollConducted: '',
        
        
    });
    const [reportData, setReportData] = useState([
        {
            "assembly": "My Assembly Name",
            "pollStart": "07:00 AM",
            "maleVotes": 100,
            "femaleVotes": 80,
            "transVotes": 5,
            "totalVotes": 185
        },
        {
            "assembly": "My Assembly Name",
            "pollStart": "09:00 AM",
            "maleVotes": 120,
            "femaleVotes": 95,
            "transVotes": 3,
            "totalVotes": 218
        },
        // ... data for other booths
    ])
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
    const [isAssembly, setIsAssmbly] = useState(loadUser().pay_assembly_code)
    const [userId, setUserId] = useState(loadUser().payload);
    const [assembly, setAssembly] = useState(loadUser().pay_assembly_code);
    const [userType, setUserType] = useState(loadUserLogin())

    const [level, setLevel] = useState(loadUser().pay_level);
    const [token, setToken] = useState(loadUser().pay_token);


    async function getAssemblyDetails(userId, token) {
        try {
            let body = get_body(userId, token)
            body['assembly'] = isAssembly
            const response = await getData(`${urlPre}/${get_assembly_details}/`, body);
            console.log(response)
            if (response) { setData(response); }

        } catch (error) {
            console.log("Server Failed to respond")

            handleApiError(error)

        }
    }
    const [prePollData, setPrePollData] = useState([
        { 'booth': 'Gangapur', 'mock_poll': 'Yes', 'evm_clear': 'Yes' },
        { 'booth': 'Sillod', 'mock_poll': 'No', 'evm_clear': 'No' },
        { 'booth': 'Paithan', 'mock_poll': 'No', 'evm_clear': 'Nos' },
        { 'booth': 'East', 'mock_poll': 'Yes', 'evm_clear': 'Yes' },
        { 'booth': 'Central', 'mock_poll': 'Yes', 'evm_clear': 'Yes' },
        { 'booth': 'West', 'mock_poll': 'Yes', 'evm_clear': 'Yes' },
        { 'booth': 'Vaijapur', 'mock_poll': 'Yes', 'evm_clear': 'Yes' },
        { 'booth': 'Kannad', 'mock_poll': 'Yes', 'evm_clear': 'No' },
        { 'booth': 'Phulambri', 'mock_poll': 'Yes', 'evm_clear': 'Yes' },
    ])
    const handlePrePollClick = (booth) => {
        console.log(`Clicked button: ${booth}`);
        window.location.href = `/dbview?booth=${booth}`;
    }

    const handleLocationClick = (url) => {
        console.log(`Clicked button: ${url}`);
        window.location.href = `/map`;
    }



    async function getAssemblyData(userId, token) {
        try {
            let body = get_body(userId, token, level)
            if (userType.payload === LoginType.ADMIN) { body['assembly'] = 'all' } else { body['assembly'] = assembly }


            const response = await getData(`${urlPre}/${get_assembly_dash}`, body);

            if (response) { setData(response); }

        } catch (error) {
            console.log("Server Failed to respond")
            console.log(data)
            handleApiError(error)

        }
    }



    async function getTimeBasedReport(userId, token) {
        try {
            if (userType.payload === LoginType.ADMIN) { (setAssembly('all')) }
            let body = get_body(userId, token, level)
            body["assembly"] = assembly
            const response = await getData(`${urlPre}/${get_time_based_report}`, body);
            console.log(response)
            if (response) { setTimeBasedData(response); }

        } catch (error) {
            console.log("Server Failed to respond")

            handleApiError(error)

        }
    }


    async function getPrePollStatus(userId, token) {
        try {
            let body = get_body(userId, token, level)
            if (userType.payload === LoginType.ADMIN) { body['assembly'] = 'all' } else { body['assembly'] = assembly }

            const response = await getData(`${urlPre}/${get_pre_poll_status}`, body);
            console.log(response)
            console.log("pre-poll")
            if (response) { setPrePollData(response); }

        } catch (error) {
            console.log("Server Failed to respond")

            handleApiError(error)

        }
    }



    async function getBoothList(userId, token) {
        try {
            if (userType.payload === LoginType.ADMIN) { (setAssembly('all')) }
            let body = get_body(userId, token, level)
            body["assembly"] = assembly
            const response = await getData(`${urlPre}/${get_booth_based_report}`, body);
            console.log(response)
            if (response) { setReportData(response); }

        } catch (error) {
            console.log("Server Failed to respond")

            handleApiError(error)

        }
    }


    useEffect(() => {
        const urlParams = getURLParams();
        console.log(urlParams.assembly);
        if (urlParams.assembly) {
            setIsAssmbly(urlParams.assembly)
        }
        if (data_resp) { setData(data_resp) }
        try {


            getAssemblyData(userId, token)
            getPrePollStatus(userId, token)
            getTimeBasedReport(userId, token)
        } catch (error) {
            console.log(error)
        }
}, []);
    return (
        <div className="detailed-assembly-view" style={{ backgroundColor: 'white', overflowY:'scroll' }}>
            <section className="section-detail">
                <h2>Assembly Details</h2>
                <br />
                <table>
                    <thead>
                        <tr><th>Assembly</th><td>{isAssembly}</td></tr>
                        <tr><th>Location</th><td>{location}</td></tr>
                        <tr><th>ARO Location</th><td><a onClick={() => handleLocationClick(aroLocation)}><IconLoc /></a></td></tr>
                        <tr><th>ARO Contact</th><td>{aroContact}</td></tr>
                        <tr><th>SO  Location</th><td><a onClick={() => handleLocationClick( soLocation )}><IconLoc /></a></td></tr>
                        <tr><th>SO  Contact</th><td>{soContact}</td></tr>
                        
                    </thead>
                </table>
              
                <br />
            </section>

            <h2>Pre-Poll Conducted</h2>
            <header>
                <div>Pre-Poll Status
                    <table>
                        <thead>
                            <tr>
                                <th>Booth</th>
                                <th>Mock - poll</th>
                                <th>EVM clear</th>

                                <th>Poll Start</th>
                                <th>Booth Contact</th>
                            </tr>
                        </thead>
                        <tbody>
                            {prePollData.map((row, index) => (
                                <tr onClick={() => handlePrePollClick(row.booth)}>
                                    <td>{row.booth}</td>
                                    <td ><img style={{ width: '30px' }} src={row.mockpoll === 'Yes' ? "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAADFklEQVR4nO2WW0xScRzHz4v2ni8JA0VRuSkhMF9600DxmooiiKnokce2HnL22GrVQxfTtLd6yLx0WSvU1COguUxN5aIgEoqKst5M30p+7ZC3CQcBca3N7/bZDr/L//uF/ccOgpzpfxLfhTKELnWjwI1iQrfaInQ3bP9FbfHWXOpGfCbixoKVeqHAVTcs2GgAgfsYNhqAv46O8V3opRMb8wGNSl+pb+OvoR7+Ogohge8461rxM8IyF84rY3hOlS7dVQ8ngees1bLMqvOhffMpNIrnqNHyVlUQCbiO6lGWWRoddIA029X2i85aiCTcxarW4MznKjO432s83KUaiCj2ag/bqhAeG4BjrdKmOarhNOAsKIcCmjNnZOxUmxJS7VUn4vp6C6hW7/r2bEpgm8qZhAHYpoomjk0JYbOghNYfbwDX5u9t4FgrfWZYRvkN4l/AKMfY1koIC0sltLhfw54ebXT5nWOY5IOEARgG2SLLogB/VNtvwbWlh8Ca99OfV0DLes++Of7sd86iAKZBtkAYIGVWtsWck4MPxgrY/LXtPfzJWjcwzYd6Zrm3tief/hFwD8IAydNlPxkmGfhglMED58t9k+aVLm8NB3/2qZuISfkm3SQMkDRZaksxlINfZsqgebnzwGy50+czPkO4v0vSZImVMAD9awmWPFsGhExL4b79BRzVY0eHtxdwdxf6eAnxJUzUFd1MmpZCQKZK4Z7t+cFtt3d4a8fu7ULXFzUSBojT5jHoE8VAnyoJzEQxqA13QG24DUHNH9qLG5AQ/xHhoukLtIkTxXAa0HQFGHKcKJocQcJY4U7C+BWIJLTPRZ74j5IMJBhR+3PaaV+KIJJQByVPkWDF6pZGUz/l6uLHCiESUAZyxui92eeQUER6mxlD6cvWx43kQ9xomIzkA6U/R4efFZL5nljdrGjSe1E7Fcv1UPV5EBKYZIf8QdSGPOOH91J6WKSOTB6pV9xLwSRA0eUGBpMASSMeJvdcDu7ChaILr7KYse+ymmI1oiGyRmQl94m3cEgasSVWIxrEe/hMSIeeCfnH+gM5kThN5WVbbgAAAABJRU5ErkJggg==" : "https://img.icons8.com/ios-filled/50/FA5252/close-window.png"} /></td>
                                    <td ><img style={{ width: '30px' }} src={row.evm_clear === 'Yes' ? "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAADFklEQVR4nO2WW0xScRzHz4v2ni8JA0VRuSkhMF9600DxmooiiKnokce2HnL22GrVQxfTtLd6yLx0WSvU1COguUxN5aIgEoqKst5M30p+7ZC3CQcBca3N7/bZDr/L//uF/ccOgpzpfxLfhTKELnWjwI1iQrfaInQ3bP9FbfHWXOpGfCbixoKVeqHAVTcs2GgAgfsYNhqAv46O8V3opRMb8wGNSl+pb+OvoR7+Ogohge8461rxM8IyF84rY3hOlS7dVQ8ngees1bLMqvOhffMpNIrnqNHyVlUQCbiO6lGWWRoddIA029X2i85aiCTcxarW4MznKjO432s83KUaiCj2ag/bqhAeG4BjrdKmOarhNOAsKIcCmjNnZOxUmxJS7VUn4vp6C6hW7/r2bEpgm8qZhAHYpoomjk0JYbOghNYfbwDX5u9t4FgrfWZYRvkN4l/AKMfY1koIC0sltLhfw54ebXT5nWOY5IOEARgG2SLLogB/VNtvwbWlh8Ca99OfV0DLes++Of7sd86iAKZBtkAYIGVWtsWck4MPxgrY/LXtPfzJWjcwzYd6Zrm3tief/hFwD8IAydNlPxkmGfhglMED58t9k+aVLm8NB3/2qZuISfkm3SQMkDRZaksxlINfZsqgebnzwGy50+czPkO4v0vSZImVMAD9awmWPFsGhExL4b79BRzVY0eHtxdwdxf6eAnxJUzUFd1MmpZCQKZK4Z7t+cFtt3d4a8fu7ULXFzUSBojT5jHoE8VAnyoJzEQxqA13QG24DUHNH9qLG5AQ/xHhoukLtIkTxXAa0HQFGHKcKJocQcJY4U7C+BWIJLTPRZ74j5IMJBhR+3PaaV+KIJJQByVPkWDF6pZGUz/l6uLHCiESUAZyxui92eeQUER6mxlD6cvWx43kQ9xomIzkA6U/R4efFZL5nljdrGjSe1E7Fcv1UPV5EBKYZIf8QdSGPOOH91J6WKSOTB6pV9xLwSRA0eUGBpMASSMeJvdcDu7ChaILr7KYse+ymmI1oiGyRmQl94m3cEgasSVWIxrEe/hMSIeeCfnH+gM5kThN5WVbbgAAAABJRU5ErkJggg==" : "https://img.icons8.com/ios-filled/50/FA5252/close-window.png"} /></td>
                                    <td ><div className={row.evm_clear === 'Yes' ? 'tableStatusGreen' : 'tableStatusRed'}>{row.evm_clear === 'Yes' ? 'Started' : 'Not Started'}</div></td>
                                    <td><img style={{ width: '20px', margin: '5px' }} width="20" height="20" src="https://img.icons8.com/ios-filled/50/000000/ringer-volume.png" alt="ringer-volume" />9049807255</td>
                                </tr>))}
                        </tbody>
                    </table>

                </div>
            </header>

            
            
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
            <h2>Report</h2>
            <table>
                <thead>
                    <tr>
                        <th>Booth</th>
                        <th>Poll Start</th>
                        <th>Male Votes</th>
                        <th>Female Votes</th>
                        <th>Trans Votes</th>
                        <th>Total Votes</th>
                    </tr>
                </thead>
                <tbody>
                    {reportData?.map((row) => (
                        <tr key={row.booth} onClick={() => handlePrePollClick(row.booth)}>
                            <td>{row.assembly}</td>
                            <td>{row.pollStart}</td>
                            <td>{row.maleVotes}</td>
                            <td>{row.femaleVotes}</td>
                            <td>{row.transVotes}</td>
                            <td>{row.maleVotes + row.femaleVotes + row.transVotes}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    );
};

export default DetailedAssemblyView;

import React, { useState} from 'react';

import { postData, getData, putData, deleteData, handleApiError } from '../components/apiActions'
import { timeDataTemp } from '../components/timeReport'
import { loadUser, LoginType, loadUserLogin } from '../components/actions';
import { urlPre, get_issues_url, post_pre_poll, get_assembly_dash, get_body, get_issues_dash, get_pre_poll_status, get_time_based_report, get_issues_detail, get_count_data } from '../components/globalApiConfig';


const PollTimeInput = ({ time, onChange, onSubmit }) => {
    /*const [maleVote, setMaleVote] = useState('')
    const [femaleVote, setFemaleVote] = useState('')
    const [transVote, setTransVote] = useState('')*/

    const [pollComplete, setPollComplete] = useState('NA')
    const [pollSafe, setPollSafe] = useState('NA')
    const [booth, setbooth] = useState('1')
    const [status, setStatus] = useState('false')


    const [userId, setUserId] = useState(loadUser().payload);
    const [assembly, setAssembly] = useState(loadUser().pay_assembly_code);

    const [level, setLevel] = useState(loadUser().pay_level);
    const [token, setToken] = useState(loadUser().pay_token);

    const [maleVotes, setMaleVotes] = useState(0)
    const [femaleVotes, setFemaleVotes] = useState(0)
    const [transVotes, setTransVotes] = useState(0)
    const [totalVotes, setTotalVotes] = useState(0)

    
    const handlePollComplete = async (tbd) => {
       
        setStatus(true)


        try {
            let body = get_body(userId, token, level)
            body['assembly'] = assembly
            body['booth'] = booth
            body['time_based_data'] = tbd


            const response = await postData(`${urlPre}/${post_pre_poll}`, body);

            if (response) { console.log(response); }

        } catch (error) {
            console.log("Server Failed to respond")

            handleApiError(error)

        }

        if (status) {
            setPollComplete('YES')
        }




        //IF NO
        //Raise ERROR and get back
    };

    const handleSubmitData = () => {
        console.log("RUN")
        console.log(maleVotes)
        console.log(femaleVotes)
        console.log(transVotes)
        const tbd ={ time:time,maleVotes: maleVotes, femaleVotes: femaleVotes, transVotes: transVotes, totalVotes: maleVotes + transVotes + femaleVotes }
        handlePollComplete(tbd)

    }

    return (<div className="poll-time-input">
        <br />

        <span>{time}</span>
        <div className="input-group">
            <label> Male<span style={{ width: '20px' }}> </span>
                <input
                    className="input-data"
                    type="number"
                    placeholder="0"
                    value={time.male}
                    onChange={(e) => setMaleVotes(e.target.value)}
                /></label >
            <label> Female<span style={{ width: '20px' }}> </span>
                <input
                    className="input-data"
                    type="number"
                    placeholder="0"
                    value={time.transgender}
                    onChange={(e) => setFemaleVotes(e.target.value)}
                /> </label>
            <label> Transgender<span style={{ width: '20px' }}> </span>
                <input
                    className="input-data"
                    type="number"
                    placeholder="0"
                    value={time.female}
                    onChange={(e) => setTransVotes(e.target.value)}
                /></label>
            <label>
                <span></span>
                <button className="button-47 " onClick={(e) => handleSubmitData()}>
                    Submit Poll
                </button>
            </label>
        </div>
        <br />
    </div>
    );
};

export default PollTimeInput;

//SET ON CHANGE POST MECHANISM FOR EACH RADIO BUTTON

import React, { useState, useEffect } from 'react';
import RadioButtons from '../../components/RadioButtons'; // Replace with actual component
import PollTimeInput from '../../components/PollTimeInput'; // Replace with actual component
import IssueSelection from '../../components/IssueSelection'; // Replace with actual component
import axios from 'axios'; // Import for server communication
import '../../assets/radiostyle.css'
import '../../assets/styles.css'

import { postData, getData, putData, deleteData, handleApiError } from '../../components/apiActions'
import { timeDataTemp } from '../../components/timeReport'
import { loadUser, LoginType, loadUserLogin } from '../../components/actions';
import { urlPre, post_issue_form,post_poll_closed, get_issues_url, post_pre_poll , get_assembly_dash, get_body, get_issues_dash, get_pre_poll_status, get_time_based_report, get_issues_detail, get_count_data } from '../../components/globalApiConfig';



const PollDayReporting = () => {
    // State variables for form data and error handling
    const [isLoading, setIsLoading] = useState(false); // Initially false
    const [mockPollConducted, setMockPollConducted] = useState('NA'); // Default: NA
    const [evmCleared, setEvmCleared] = useState('NA'); // Default: NA
    const [pollStarted, setPollStarted] = useState('NA'); // Default: NA
    const [pollComplete, setPollComplete] = useState('NA')
    const [pollSafe, setPollSafe] = useState('NA')
    const [booth, setbooth] = useState('1')
    const [status, setStatus] = useState('false')
    const mockPollOptions = ['YES', 'NO']
    const [enableIssue, setEnableIssue] = useState('NO')
    const [pollTimes, setPollTimes] = useState([
        { male: '', transgender: '', female: '' },
        { male: '', transgender: '', female: '' },
        // ... add more time slots if needed
    ]);
    const [timeSlots, setTimeSlots] = useState([
        { time: '7-9 am', male: '', transgender: '', female: '' },
        { time: '7-11 am', male: '', transgender: '', female: '' },
        { time: '7-13 pm', male: '', transgender: '', female: '' },
        { time: '7-15 pm', male: '', transgender: '', female: '' },
        { time: '7-17 pm', male: '', transgender: '', female: '' },
        // ... add more timeslots if needed
    ]);


    const [issueType, setIssueType] = useState('');
    const [issueDetails, setIssueDetails] = useState('');
    const [errors, setErrors] = useState({}); // State for error messages
    const type = {
        MPC: 'MPC',
        EVMC: 'EVMC',
        POLLS: 'POLLS',
        ISSUES: 'ISSUES',
        TIMESLOTS: 'TIMESLOTS'
    }
    const [error, setError] = useState('');

    const [userId, setUserId] = useState(loadUser().payload);
    const [assembly, setAssembly] = useState(loadUser().pay_assembly_code);

    const [level, setLevel] = useState(loadUser().pay_level);
    const [token, setToken] = useState(loadUser().pay_token);

    const handleEventChange = async (key, value, setFunction) => {

        console.log(key, value)
        try {
            let body = get_body(userId, token, level)
            body['assembly'] = assembly
            body['booth'] = booth
            body[key] = evmCleared


            const response = await postData(`${urlPre}/${post_pre_poll}_${key}`, body);

            if (response) { console.log(response); }

        } catch (error) {
            console.log("Server Failed to respond")

            handleApiError(error)

        }




    }

    // Fetch mock poll options, time slots, and issue types on component mount
    //useEffect(() => {
    /*        const fetchData = async () => {
                setIsLoading(true);
                try {
                    const response = await axios.get('/api/poll-data');
                    const { mockPollOptions, timeSlots, issueTypes } = response.data;
    
                    // Update state with fetched data
                    setMockPollOptions(mockPollOptions);
                    setTimeSlots(timeSlots);
                    setIssueTypes(issueTypes);
                } catch (error) {
                    console.error('Error fetching data:', error);
                    // Handle error gracefully, e.g., display an error message
                } finally {
                    setIsLoading(false);
                }
            };
    
            fetchData();
        }, []);
    */
    // Form submission handler with validation and error handling
    const handleSubmit = async (event) => {
        event.preventDefault();

        const errors = {}; // Reset errors on submit

        // Validate form data (add appropriate validation rules here)
        /*  if (mockPollConducted === 'yes' && pollTimes.some(time => Object.values(time).every(value => !value))) {
              errors.pollTimes = 'Please provide data for all time slots.';
          }
          if (mockPollConducted === 'no' && !issueType) {
              errors.issueType = 'Please select an issue type.';
          }
          if (mockPollConducted === 'no' && !issueDetails) {
              errors.issueDetails = 'Please provide issue details.';
          }
  
          setErrors(errors); // Update error state
  
          if (Object.keys(errors).length === 0) {
              setIsLoading(true); // Set loading indicator to true
              try {
                  const response = await axios.post('/api/submit-report', {
                      mockPollConducted,
                      pollTimes,
                      issueType,
                      issueDetails,
                  });
  
                  if (response.status === 200) {
                      console.log('Report submitted successfully!');
                      // Handle successful submission, e.g., clear form, show confirmation message
                  } else {
                      // Handle server errors
                      console.error('Error submitting report:', response.data);
                      // Set an error message for the user
                  }
              } catch (error) {
                  console.error('Network error:', error);
                  // Handle network errors
              } finally {
                  setIsLoading(false); // Set loading indicator to false
              }
          }*/
    };

    // Functions for handling changes in form fields (replace with your actual implementations)
    // ... handleMockPollChange, handlePollTimeChange, handleIssueTypeChange, handleIssueDetailsChange

    const handlePollTimeChange = (index, inputType, value) => {
        // Validate input (optional)
        // ... add validation logic if needed, e.g.,
        // if (!isValidTimeValue(value)) {
        //   console.error(`Invalid time value: ${value}`);
        //   return;
        // }

        // Update pollTimes state immutably
        /*const updatedPollTimes = [...pollTimes];
        updatedPollTimes[index][inputType] = value;
        setPollTimes(updatedPollTimes);*/
        console.log(value)
    };
    
    const handlePollComplete = async () => {
        // ADD LOGIN to check all fields of POLL is completed
        //IF YES
        setStatus(true)


        try {
            let body = get_body(userId, token, level)
            body['assembly'] = assembly
            body['booth'] = booth
            body['pollClosed'] = 'yes'


            const response = await postData(`${urlPre}/${post_poll_closed}}`, body);

            if (response) { console.log(response); }

        } catch (error) {
            console.log("Server Failed to respond")

            handleApiError(error)
           

        }

        if (status) {
            setPollComplete('YES')
            window.location.href = `/endmsg`;
        }



        
        //IF NO
        //Raise ERROR and get back
    };

    const handleEnableIssue = () => {
        if (enableIssue === 'YES') {
            setEnableIssue('NO')
        } else { setEnableIssue('YES')}
    };
  
    const [issueDesc, setIssueDesc] = useState('')

    const handleIssueTypeChange = (event) => {
        console.log("SET", event)
        setIssueType(event)
    };

    const handleIssueDetailsChange = (event) => {
        setIssueDesc(event)


    };

    const handleIssueSubmit = async  () => {



        try {
            let body = get_body(userId, token, level)
            body['assembly'] = assembly
            body['booth'] = booth
            body['issueType'] = issueType
            body['issueDesc'] = issueDesc



            const response = await postData(`${urlPre}/${post_issue_form}}`, body);

            if (response) { console.log(response); }
            setEnableIssue('NO')

        } catch(error) {
            console.log("Server Failed to respond")

            handleApiError(error)


        }





    }


    return (
        <form onSubmit={handleSubmit} className="poll-form" style={{ width: '100% !important' }}>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}> {/* Flexbox for right alignment */}
                <button onClick={() => handleEnableIssue()} className='button-47' style={{ border: '1px solid red' }}>Add an Issue</button>
            </div>
            <h2>Poll Day Reporting</h2>



            <div className="RadioButtons">
                <header>
                    <div className='radio-inputs'>
                        <label className="label-input" >Mock Poll Conducted :
                            <div className='radio-inputs-block pollStatusRadio'>
                            <div className="radio-button-container">
                                    <label for="option1" className="radio-button active"> YES </label>
                                    <input type="radio" id="option1" name="mockpoll" value="option1" onChange={() => handleEventChange(type.MPC, 'YES', setMockPollConducted('YES'))} />
                                        
  
                                <label for="option2" className="radio-button"> NO </label>
                                    <input type="radio" id="option2" name="mockpoll" value="option2" onChange={() => handleEventChange(type.MPC, 'NO', setMockPollConducted('NO'))}/>
                            </div>
                            </div>
                        </label>
                            </div>
            {/*EVM CLEARED*/}
                    <div className='radio-inputs'>
                        <label className="label-input">EVM  Conducted :
                            <div className='radio-inputs-block pollStatusRadio'>
                                <div className="radio-button-container">
                                    <label for="option1" className="radio-button active"> YES </label>
                                    <input type="radio" id="option1" name="evmcleared" value="option1" onChange={() => handleEventChange(type.EVMC, 'YES', setEvmCleared('YES'))} />


                                    <label for="option2" className="radio-button"> NO </label>
                                    <input type="radio" id="option2" name="evmcleared" value="option2" onChange={() => handleEventChange(type.EVMC, 'NO', setEvmCleared('NO'))} />
                                </div>
                            </div>
                        </label>
                    </div>

                    <div className='radio-inputs'>
                        <label className="label-input">Poll Started :
                            <div className='radio-inputs-block pollStatusRadio'>
                                <div className="radio-button-container">
                                    <label for="option1" className="radio-button active"> YES </label>
                                    <input type="radio" id="option1" name="pollstart" value="option1" onChange={() => handleEventChange(type.POLLS, 'YES', setPollStarted('YES'))} />


                                    <label for="option2" className="radio-button"> NO </label>
                                    <input type="radio" id="option2" name="pollstart" value="option2" onChange={() => handleEventChange(type.POLLS, 'NO', setPollStarted('NO'))} />
                                </div>
                            </div>
                        </label>
                    </div>

                    </header>
                        </div >

            {(mockPollConducted === 'YES' && evmCleared === 'YES' && pollStarted === 'YES' && pollComplete!='YES') && (
                <header>
                <div>
                    <h3>Poll Time Inputs</h3>
                        {timeSlots.map((index) => (
                            <PollTimeInput key={index} time={index.time} />
                    ))}
                        <br/>
                    <button className="button-47 input-group-button" type='submit' onClick={handlePollComplete}> Poll Completed Submit</button>

                        <br />
                    </div>
                </header>
            )}



            {(mockPollConducted === 'NO' || evmCleared === 'NO' || pollStarted === 'NO' || enableIssue === 'YES') && (
                <header>
                <div>

                    <h3>Issue Selection</h3>
                        <br />
                        <div className="issue-selection">

                            <label>Issue Type:
                                <br />
                                <div><br />
                                    <select className="input-select" value={issueType} onChange={(e) => handleIssueTypeChange(e.target.value)}>
                                        <option value="">Select</option>
                                        <option value="evm">EVM Issue</option>
                                        <option value="law-and-order">Law and Order Issue</option>
                                        {/* Add more options as needed */}
                                    </select>
                                </div>
                            </label>
                        </div>
                        



                    <br/>
                        <textarea
                            className='input-select'
                        value={issueDetails}
                        onChange={(e) => handleIssueDetailsChange(e.target.value)}
                        placeholder="Please provide details of the issue..."
                        aria-label="Issue Details"
                        aria-describedby="issue-details-error" // Add aria-describedby for any error messages
                    />
                    {errors.issueDetails && (
                        <div className="error-message" id="issue-details-error">
                            {errors.issueDetails}
                        </div>
                    )}
                </div>
                </header>)}
            {(mockPollConducted === 'NO' || evmCleared === 'NO' || pollStarted === 'NO' || enableIssue === 'YES')&&(
                <div>
                    <button className="button-47 submit-error" type="submit" disabled={isLoading}>
                        {isLoading ? 'Submitting...' : 'Submit Report'}
                    </button>
                    <button className="button-47 contact" type="submit" disabled={isLoading}>
                        {isLoading ? 'Redirecting...' : 'Contact SO'}
                    </button>

                    <button className="button-47 contact"  type="submit" disabled={isLoading}>
                        {isLoading ? 'Redirecting...' : 'Contact MT'}
                    </button>
                </div>

            )}

            {pollComplete==='YES' && (
                <div>
                    <header>
                    <div className='radio-inputs'>
                        <label>Poll  Party Reached Safely :
                            <div className='radio-inputs-block pollStatusRadio'>
                                <div className="radio-button-container">
                                    <label for="option1" className="radio-button active"> YES </label>
                                        <input type="radio" id="option1" name="pollend" value="option1" onChange={() => handleEventChange(type, 'YES', setPollSafe('YES'))}  />


                                    <label for="option2" className="radio-button"> NO </label>
                                        <input type="radio" id="option2" name="pollend" value="option2" onChange={() => handleEventChange(type, 'NO', setPollSafe('NO'))} />
                                </div>
                            </div>
                        </label>
                        </div>
                    </header>


                </div>
            )}
            


            {errors.general && <div className="error-message">{errors.general}</div>}
            {isLoading && <div className="loading-indicator">Loading...</div>}
        </form>
    );
};

export default PollDayReporting;

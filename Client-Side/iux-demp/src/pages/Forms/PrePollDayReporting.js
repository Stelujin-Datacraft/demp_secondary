//SET ON CHANGE POST MECHANISM FOR EACH RADIO BUTTON

import React, { useState, useEffect } from 'react';
import RadioButtons from '../../components/RadioButtons'; // Replace with actual component
import PollTimeInput from '../../components/PollTimeInput'; // Replace with actual component
import IssueSelection from '../../components/IssueSelection'; // Replace with actual component
import axios from 'axios'; // Import for server communication
import '../../assets/radiostyle.css'
import '../../assets/styles.css'



const PrePollDayReporting = () => {
    // State variables for form data and error handling
    const [isLoading, setIsLoading] = useState(false); // Initially false
    const [mockPollConducted, setMockPollConducted] = useState('NA'); // Default: NA
    const [evmCleared, setEvmCleared] = useState('NA'); // Default: NA
    const [pollStarted, setPollStarted] = useState('NA'); // Default: NA
    const [pollComplete, setPollComplete] = useState('NA')
    const [pollSafe, setPollSafe] = useState('NA')
    const [status,setStatus] = useState('false')
    const mockPollOptions = ['YES', 'NO']
    const [pollTimes, setPollTimes] = useState([
        { male: '', transgender: '', female: '' },
        { male: '', transgender: '', female: '' },
        // ... add more time slots if needed
    ]);
    const [timeSlots, setTimeSlots] = useState([
        { time: '7-9 am', male: '', transgender: '', female: '' },
        { time: '7-11 am', male: '', transgender: '', female: ''},
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
        TIMESLOTS:'TIMESLOTS'
    }
    const [error, setError] = useState('');


    const handleEventChange = async (key, value, setFunction) => {
        
        console.log(key, value)
        try {
            const response = await axios.post('http://localhost:5000/post_report', { key, value });
            if (response && response.data) {
                console.log(response.data); // Handle successful login
                const level = response.data.level
                console.log(response.data)
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
    const handlePollComplete = async (poll_id) => {
        // ADD LOGIN to check all fields of POLL is completed
        //IF YES
        setStatus(true)


        try {
            const response = await axios.post('http://localhost:5000/check_poll_complete', { poll_id });
            if (response && response.data) {
                console.log(response.data); // Handle successful login
                setStatus(response.data.status)
                console.log(response.data)
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
        if (status) {
            setPollComplete('YES')
        }



        
        //IF NO
        //Raise ERROR and get back
    };
    const [isOpenSelected, setIsOpenSelected] = useState(true);

    const handleClick = () => {
        setIsOpenSelected(!isOpenSelected);
        if (isOpenSelected) {
            console.log("Open")
            handleEventChange(type, 'No', setMockPollConducted('NO'))
            //onResolvedClick();
        } else {
            handleEventChange(type, 'YES', setMockPollConducted('YES'))
            console.log("CLosed")
            }
            //onOpenClick();
        }

    const [isOpenSelectedEVM, setIsOpenSelectedEVM] = useState('')

    const handleClickEVM = () => {
        setIsOpenSelectedEVM(!isOpenSelectedEVM);
        if (isOpenSelectedEVM) {
            console.log("Open")
            handleEventChange(type, 'NO', setEvmCleared('NO'))
            //onResolvedClick();
        } else {
            handleEventChange(type, 'YES', setEvmCleared('YES'))
            console.log("CLosed")
        }
        //onOpenClick();
    }


    const handleIssueTypeChange = () => {};
    const handleIssueDetailsChange = () => {};
    return (
        <form onSubmit={handleSubmit} className="poll-form" style={{ width: '100% !important'}}>
            <h2>Poll Day Reporting</h2>



            <div className="RadioButtons">
                <header>
                    <div className='radio-inputs'>
                        <label className="label-input" >Mock Poll Conducted :
                            <div className='radio-inputs-block pollStatusRadio'>
                                <div className="toggle-button">
                                    <button
                                        className={isOpenSelected ? 'active' : ''}
                                        
                                       onClick={handleClick}
                                    >
                                        YES
                                    </button>
                                    <button
                                        className={!isOpenSelected ? 'active' : ''}
                                       
                                       onClick={handleClick}
                                    >
                                        NO
                                    </button>
                                </div>

                           
                            </div>
                        </label>
                            </div>
            {/*EVM CLEARED*/}
                    <div className='radio-inputs'>
                        <label className="label-input">EVM  CLeared :
                            <div className="toggle-button">
                                <button
                                    className={isOpenSelectedEVM ? 'active' : ''}

                                    onClick={handleClickEVM}
                                >
                                    YES
                                </button>
                                <button
                                    className={!isOpenSelectedEVM ? 'active' : ''}

                                    onClick={handleClickEVM}
                                >
                                    NO
                                </button>
                            </div>
                            
                        </label>
                    </div>

                    <div className='radio-inputs'>
                        <label className="label-input">Poll Started :
                            <div className='radio-inputs-block pollStatusRadio'>
                                <div className="radio-button-container">
                                    <label for="option1" className="radio-button active"> YES </label>
                                    <input type="radio" id="option1" name="pollstart" value="option1" onChange={() => handleEventChange(type, 'YES', setPollStarted('YES'))} />


                                    <label for="option2" className="radio-button"> NO </label>
                                    <input type="radio" id="option2" name="pollstart" value="option2" onChange={() => handleEventChange(type, 'NO', setPollStarted('NO'))} />
                                </div>
                            </div>
                        </label>
                    </div>

                    </header>
                        </div >

      


            {(mockPollConducted === 'NO' || evmCleared === 'NO' || pollStarted === 'NO') && (
                <header>
                <div>

                    <h3>Issue Selection</h3>
                        <br/>
                        <IssueSelection
                        onChange={handleIssueTypeChange}
                        selected={issueType}
                    />
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
         

            {errors.general && <div className="error-message">{errors.general}</div>}
            {isLoading && <div className="loading-indicator">Loading...</div>}
        </form>
    );
};

export default PrePollDayReporting;

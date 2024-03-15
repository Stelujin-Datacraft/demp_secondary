import React, { useState, useEffect } from 'react';

function LiveUpdateForm() {
    const genders = {MALE:'male',FEMALE:'female',TRANSGENDER:'transgender'}
    const [voterNumber, setVoterNumber] = useState('');
    const [voterDetails, setVoterDetails] = useState({});
    const [selectedGender, setSelectedGender] = useState(null); // Initially no selection
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleInputChange = (event) => {
        setVoterNumber(event.target.value);
    };

    
  
    const handleSubmission = async () => {
        if (!selectedGender || voterNumber == '') {
            setError('Please select a gender');
            return;
        }

        // Implement your logic to send updated voter data to the backend using POST
        // You might need to modify this based on your specific data format and requirements
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch(`https://your-server-url/votes`, {
                method: 'POST',
                body: JSON.stringify({
                    voterNumber,
                    gender: selectedGender,
                }),
            });

            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.status}`);
            }

            // Handle successful submission (e.g., clear form, update table)
            console.log('Vote submitted successfully!');
            // ...your logic to update table

        } catch (error) {
            setError(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <h1>Voter Details</h1>
            <header>
                <p>Voter Number</p>
                <br/>
            <input type="number" className='input-margin' value={voterNumber} onChange={handleInputChange} placeholder="Enter voter number" />
                <br />
                <br />
                <br />
                <p className='left-margin'>Select Gender to Vote:</p>
            
                <div>



                <div className="radio-inputs">
                    <div className="radio-inputs">
                        <label>
                            <input type="radio" id="male" name="gender" value="male" onClick={() => setSelectedGender(genders.MALE)} className="radio-input" className="radio-input" type="radio" />
                            <span className="radio-tile">
                                <span className="radio-icon">

                                    <img className="icon" src={require('../icons8-male-48.png')} />
                                </span>
                                <span className="radio-label">Male</span>
                            </span>
                        </label>
                        <label>
                            <input type="radio" id="female" name="gender" value="female" onClick={() => setSelectedGender(genders.FEMALE)} className="radio-input" checked="" className="radio-input" />
                            <span className="radio-tile">
                                <span className="radio-icon">
                                    <img className="icon" src={require('../icons8-female-48.png')} />
                                </span>
                                <span className="radio-label">Female</span>
                            </span>
                        </label>
                        <label>
                            <input type="radio" id="transgender" name="gender" value="transgender" onClick={() => setSelectedGender(genders.TRANSGENDER)} className="radio-input"  />
                            <span className="radio-tile">
                                <span className="radio-icon">

                                    <img className="icon" src={require('../icons8-male-female-48.png')} />
                                </span>
                                <span className="radio-label">Transgender</span>
                            </span>
                        </label>
                    </div>
                </div>

            </div>
                <button className='button-47 input-margin' onClick={handleSubmission}>Submit Vote</button>

            </header>
{/*            <button onClick={handleSubmit}>Get Details</button>
*/}
            {isLoading && <p>Loading...</p>}
            {error && <p>Error: {error.message}</p>}
            {voterDetails && (
                <div className="card">
  <div className="tools">
    <div className="circle">
      <span className="red box"></span>
    </div>
    <div className="circle">
      <span className="yellow box"></span>
    </div>
    <div className="circle">
      <span className="green box"></span>
    </div>
  </div>
  <div className="card__content">
  </div>

                <div>
                    <h2>Voter #{voterNumber}</h2>

                    <p>Total Male Votes: {voterDetails.totalMaleVotes}</p>
                    <p>Total Female Votes: {voterDetails.totalFemaleVotes}</p>
                    <p>Total Transgender Votes: {voterDetails.totalTransgenderVotes}</p>
                    <p>Total Votes: {voterDetails.totalVotes}</p>
                    
                </div>
                </div>
            )}
        </div>
    );
}

export default LiveUpdateForm;

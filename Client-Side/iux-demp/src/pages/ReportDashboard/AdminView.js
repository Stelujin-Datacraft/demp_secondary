import React, { useState, useEffect } from 'react';
import Button from '../CommonComponents/Button';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AssemblyLevelView from './AssemblyLevelView';
import BoothLevelView from './BoothLevelView'
import '../../assets/styles.css'
import { LoginType, saveUserLogin, loadUserLogin } from '../../components/actions';
import DistrictLevelView from './DistrictLevel'

function AdminView() {
    //const [data, setData] = useState([]); // State to store fetched data
    const [viewLevel, setViewLevel] = useState('BL')
    const [userLogin, setUserLogin] = useState(loadUserLogin)

    const handleButtonClick = (buttonName) => {
        // Handle button click here based on buttonName
        console.log(`Clicked button: ${buttonName}`);
        window.location.href = `/${buttonName}`;
    };

    useEffect(() => {
        //console.log(userLogin.payload)
        /*if (userLogin.payload === LoginType.ADMIN || userLogin.payload === LoginType.DADMIN) {
            setViewLevel('ASL')
        }
        else {
            setViewLevel('BL')
        }
*/    })
    return (
        <div className='internal-container'>
            <main className="internal-container">
                <h2>Admin View</h2>
                <br />
                <main className="internal-container">
                <header>

                   {(userLogin.payload === LoginType.ADMIN || userLogin.payload === LoginType.DADMIN) && (
                            <Button className="header_buttons" name="District Level" onClick={() => setViewLevel("DL")} />

                        )}
                    {(userLogin.payload === LoginType.ADMIN || userLogin.payload === LoginType.DADMIN) && (
                        <Button className="header_buttons" name="Assembly Level" onClick={() => setViewLevel("ASL")} />

                    )}


                <Button className="header_buttons" name="Booth Level" onClick={() => setViewLevel("BL")} />
                
                </header>


                    {viewLevel === "DL" && (<div><DistrictLevelView /></div>)}

            {viewLevel === "ASL" && (<div><AssemblyLevelView /></div>)}

            {viewLevel === "BL" && (<div><BoothLevelView /> </div>)}
               
           </main>
            </main>
        </div>
    );
}

export default AdminView;

import React, { useState, useEffect } from 'react';
import { Button, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '../CommonComponents/ExpandMoreIcon'
import '../../assets/styles.css'
import IconLoc from '../CommonComponents/IconComponent';

function LocationCard({ title, locations, onLocationClick }) {
    const [booths, setBooths] = useState([
        { "assembly": "Sillod", "booth": "booth 1" },
        { "assembly": "Sillod", "booth": "booth 2" },
        { "assembly": "Sillod", "booth": "booth 3" }
    ])
    const handleLocationClick = (url) => {
        console.log(`Clicked button: ${url}`);
        window.location.href = `/map`;
    }
    const onAssemblyClick = (id) => { console.log(id)}
    return (
        <div className="internal-container">
            <br />
            <h2>Assembly Level View</h2>

        <div style={{ backgroundColor: "white" }} className="content location-page" >
            <ul>
                {locations.map((location) => (
                    <li key={location.id}>
                       
                        {location.assembly && (
                            <Accordion onClick={() => onLocationClick(location)} className={location.issue === 'yes' ? 'alerts-border' : 'non-alert'}>
                                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                    {location.assembly}
                                </AccordionSummary>
                                
                                <AccordionDetails>
                                    <div>
                                        <table>
                                            <thead>
                                            <th></th>
                                            </thead>
                                            <tbody>
                                                <tr><td>ARO Office :</td><td><a onClick={() => handleLocationClick('ARO')}><IconLoc/></a> </td></tr>
                                                <tr><td>Training Center :</td><td><a onClick={() => handleLocationClick('ARO')}><IconLoc /></a>  </td></tr>
                                                <tr><td>Dispatch Center : </td><td><a onClick={() => handleLocationClick('ARO')}><IconLoc /></a>  </td></tr>
                                                <tr><td>Recieving Center :</td><td><a onClick={() => handleLocationClick('ARO')}><IconLoc /></a>  </td></tr>
                                                <tr><td>EVM strong Room :</td><td><a onClick={() => handleLocationClick('ARO')}><IconLoc /></a>  </td></tr>

                                            </tbody>

                                        </table>
                                    </div>
                                    
                                    <Accordion >
                                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                                Expand Poll booths for {location.assembly} 
                                    </AccordionSummary>
                                    <AccordionDetails>
                                            <table className="accordianTable">
                                                <tbody>
                                                {booths.map((booth) => (

                                                    <tr key={booth}><td>{booth.booth}</td><td><div>Location</div></td></tr>
                                                    ))}
                                                    </tbody>
                                                    </table>
                                        {/* Render dropdown for booths within the assembly */}
                                        </AccordionDetails>
                                        </Accordion>
                                </AccordionDetails>
                            </Accordion>
                        )}
                    </li>
                ))}
            </ul>
            </div></div>
    );
}

export default LocationCard;

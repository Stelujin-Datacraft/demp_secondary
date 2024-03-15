import React, { useState, useEffect } from 'react';
import LocationCard from './LocationCard';
import MapComponent from './MapComponent';
import Button from '../CommonComponents/Button'
import '../../assets/styles.css'
import BoothLevelLocation from './BoothLevelLocation';
import DistrictLevelView from './DistrictLevelLocation';
function TrackPage() {
    const [locations, setLocations] = useState([]);
    const [locationLevel, setLocationLevel] = useState('ASL')
    const [selectedLocations, setSelectedLocations] = useState([]);
    const [districtLocations, setDistrictLocations] = useState([
        { "id": "Sillod", "issue": "no","booth": "Booth 1", "assembly": "Sillod", "district": "Aurangabad", "name": "abad" }, { "id": "Phulambri", "issue":"yes","booth": "Booth 2", "assembly": "Phulambri", "district": "Auranagabad", "name": "abad" },
        { "id": "Auranagabad east", "issue":"no","booth": "Booth 3", "assembly": "Auranagabad east", "district": "Auranagabad", "name": "abad" },
        { "id": "Kannad", "issue":"no","booth": "Booth 4", "assembly": "Kannad", "district": "Auranagabad", "name": "abad" }
    ]);

    const navigateToMapPage = (slocations) => {
        console.log(slocations)
    }

    useEffect(() => {
        // Fetch locations from backend
    }, []);

    const handleLocationClick = (location) => {
        // Update selected locations state
    };


    const handleDistrictLocationClick = () => {
        // Access specific properties of the clicked location based on your data structure
        const districtName = "Aurangabad"
         // Example

        // Choose the appropriate action based on your desired functionality:

       


    };



    return (
        <div className="location-page" style={{ display: 'flex', justifyContent: 'space-between' }}>
            <main className="internal-container">

                <h3>Admin View</h3>

                <br />
                <main className="internal-container">
                    <Button name="District Level" onClick={() => setLocationLevel('DL')} />

            <Button name="Booth Level" onClick={() => setLocationLevel('BT')} />
            <Button name="Assembly Level" onClick={() => setLocationLevel('ASL')} />
            
            {locationLevel === 'ASL' && (
                < LocationCard title="Assembly Level" locations={districtLocations} onLocationClick={handleDistrictLocationClick} />
            )}
            {locationLevel === 'BT' && (
                <BoothLevelLocation title="Assembly Level" locations={districtLocations} onLocationClick={handleDistrictLocationClick} />
                )}
                {locationLevel === 'DL' && (
                    <DistrictLevelView title="District Level" locations={districtLocations} onLocationClick={handleDistrictLocationClick} />
                )}
            <div style={{ width: '30%' }}>
                {/* Render LocationCards for each level */}
            {/*    <Button name="Track Selected" onClick={() => navigateToMapPage(selectedLocations)}>Track Selected</Button>
*/}            </div>
            <div style={{ width: '70%' }}>
                {/*<MapComponent locations={locations} />*/}
                    </div>
                </main>
            </main>
        </div>
    );
}

export default TrackPage;

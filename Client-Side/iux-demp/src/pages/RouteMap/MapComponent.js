import React, { useState } from 'react';
import GoogleMapReact from 'google-map-react';
import axios from 'axios';

// API key for Google Maps Directions API
const API_KEY = 'AIzaSyBfOmrWClwtqt16IZJAtFMKRpt32Zb5xN4';

const MapMarker = ({ text }) => <div>{text}</div>;

const MapComponent = () => {
    const [directions, setDirections] = useState(null);

    // Function to fetch directions from Google Maps Directions API
    const fetchDirections = () => {
        // Static coordinates for start and end locations
        const origin = '40.7128,-74.0060'; // Example: New York, NY
        const destination = '34.0522,-118.2437'; // Example: Los Angeles, CA

        axios.get(`https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&key=${API_KEY}`)
            .then(response => {
                setDirections(response.data.routes[0].legs[0]);
            })
            .catch(error => {
                console.error('Error fetching directions:', error);
            });
    };

    return (
        <div style={{ height: '500px', width: '100%' }}>
            <button onClick={fetchDirections}>Get Directions</button>
            <div style={{ height: '100%', width: '100%' }}>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: API_KEY }}
                    defaultCenter={{ lat: 40.7128, lng: -74.0060 }}
                    defaultZoom={8}
                >
                    {directions && (
                        <>
                            <MapMarker
                                lat={directions.start_location.lat}
                                lng={directions.start_location.lng}
                                text="Start"
                            />
                            <MapMarker
                                lat={directions.end_location.lat}
                                lng={directions.end_location.lng}
                                text="End"
                            />
                        </>
                    )}
                </GoogleMapReact>
            </div>
            {directions && (
                <div>
                    <h2>Directions:</h2>
                    <ul>
                        {directions.steps.map((step, index) => (
                            <li key={index}>{step.html_instructions}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default MapComponent;

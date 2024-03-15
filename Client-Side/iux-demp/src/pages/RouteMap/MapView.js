import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const libraries = ['places']; // Required library for marker functionality

const MapView = () => {
    const [coordinates, setCoordinates] = useState(null); // State to hold retrieved coordinates

    // Function to fetch coordinates from backend (replace with your actual API call)
    const fetchCoordinates = async () => {
        try {
            const response = await fetch('/api/coordinates'); // Replace with your API endpoint
            const jsonData = await response.json();
            setCoordinates(jsonData);
        } catch (error) {
            console.error('Error fetching coordinates:', error);
        }
    };

    // Fetch coordinates on component mount
    useEffect(() => {
        //
        fetchCoordinates();
        setCoordinates({ lat: 37.7749, lng: -122.4194 })
    }, []);

    // Map configuration (replace with your Google Maps API key)
    const mapContainerStyle = {
        width: '100vw',
        height: '400px',
    };
    const center = { lat: 40.7128, lng: -74.0059 }; // Default center coordinates (New York City)

    // Check if coordinates are loaded before rendering
    if (!coordinates) return <p>Loading map data...</p>;

    return (
        <LoadScript
            googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY" // Replace with your API key
            libraries={libraries}
        >
            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                zoom={10}
                center={center}
            >
                {coordinates && (
                    <Marker key={coordinates.id} position={coordinates} />
                )}
            </GoogleMap>
        </LoadScript>
    );
};

export default MapView;

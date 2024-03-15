import React from 'react';
import Form from './Form';
import '../../assets/styles.css'

const GpsMappingForm = () => {
    const fields = [
        { name: 'latitude', type: 'number', label: 'Latitude' },
        { name: 'longitude', type: 'number', label: 'Longitude' },
        // ...other fields
    ];

    const handleSubmit = (formData) => {
        // Send data to server using axios or fetch
    };

    return (
        <Form title="GPS Mapping Form" fields={fields} onSubmit={handleSubmit} />
    );
};

export default GpsMappingForm;

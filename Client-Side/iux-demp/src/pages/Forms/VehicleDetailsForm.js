import React from 'react';
import Form from './Form';

const VehicleDetailsForm = () => {
    const fields = [
        { name: 'vehicle number', type: 'string', label: 'Latitude' },
        { name: 'assembly', type: 'string', label: 'Longitude' },
        { name: 'booth', type: 'string', label: 'Longitude' },

        // ...other fields
    ];

    const handleSubmit = (formData) => {
        // Send data to server using axios or fetch
    };

    return (
        <Form title="Vehicle Details Form" fields={fields} onSubmit={handleSubmit} />
    );
};

export default VehicleDetailsForm;

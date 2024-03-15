import React, { useState } from 'react';
import axios from 'axios'; // Import Axios
import Input from '../../components/Input';
import Select from '../../components/Select';
import TextArea from '../../components/TextArea';
import { Button } from '@mui/material';
import Form from './Form'

const VIssueForm = () => {
    const [formData, setFormData] = useState({});
    const [errors, setErrors] = useState({});
    const field = {}

    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            //const response = await axios.post('/api/submit-form', formData);
            //if (response.status === 200) {

            //console.log("Submitted")// Handle successful submission (e.g., redirect, clear form)
            //} else {
            console.log("event ->", event);
            console.log("event ->", formData);

            // Handle server errors
            //}
        } catch (error) {
            // Handle network errors
        }
    };

    return (
        <div><Form title="GPS FORM" fields={field} onSubmit={() => handleSubmit()} /></div>
    );
};

export default VIssueForm;

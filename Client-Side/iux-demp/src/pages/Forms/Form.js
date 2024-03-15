import React, { useState } from 'react';
import axios from 'axios'; // Import Axios
import Input from '../../components/Input';
import Select from '../../components/Select';
import TextArea from '../../components/TextArea';
import { Button } from '@mui/material';

const Form = ({ title, fields, onSubmit }) => {
    const [formData, setFormData] = useState({});
    const [errors, setErrors] = useState({});

    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    

    return (
        <main className="internal-container">
        <form onSubmit={onSubmit}>
            <h2>{title}</h2>
            <br/>
            <div className="internal-container">
            {fields.map((field) => (


                <Input key={field.name} {...field} value={formData[field.name]} onChange={handleChange} />
                
            ))}
            <br/>
                <button type="submit" className='button-47 form-page input-button-test'>Submit</button>
            </div>
        </form></main>
    );
};

export default Form;

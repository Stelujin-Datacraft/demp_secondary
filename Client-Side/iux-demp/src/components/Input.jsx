import React from 'react';

const Input = ({ label, type, name, value, onChange, ...props }) => (
    <div><label htmlFor={name}>{label}</label>
    <div className="form-group">
        
        
        <input type={type} className="input-test" id={name} name={name} value={value} onChange={onChange} {...props} />
        </div></div>
);

export default Input;

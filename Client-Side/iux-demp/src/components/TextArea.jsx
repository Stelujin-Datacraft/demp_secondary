import React from 'react';

const TextArea = ({ label, name, value, onChange, ...props }) => (
    <div className="form-group">
        <label htmlFor={name}>{label}</label>
        <textarea id={name} name={name} value={value} onChange={onChange} {...props} />
    </div>
);

export default TextArea;

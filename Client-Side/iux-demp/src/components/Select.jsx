import React from 'react';

const Select = ({ label, name, options, value, onChange, ...props }) => (
    <div className="form-group">
        <label htmlFor={name}>{label}</label>
        <select id={name} name={name} value={value} onChange={onChange} {...props}>
            {options.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    </div>
);

export default Select;

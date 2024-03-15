import React from "react";
import '../../assets/styles.css'


const Button = ({ name, onClick }) => {
    return (
        <button style={{ backgroundColor: '#5165ff', color: 'white' }}  className='button-47' onClick={onClick}>{name}</button>
    );
};

export default Button;
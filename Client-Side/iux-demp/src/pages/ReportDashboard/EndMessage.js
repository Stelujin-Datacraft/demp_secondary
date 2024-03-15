import React, { useState } from 'react';

const EndMessage = () => {
    const [selectedLanguage, setSelectedLanguage] = useState('en');

    const languages = {
        en: {
            title: 'Thank You for Voting!',
            message: 'You have successfully exercised your right to vote. Your participation is vital for a strong democracy.',
            buttonText: 'Learn More',
        },
        hi: {
            title: 'मतदान करने के लिए धन्यवाद!',
            message: 'आपने सफलतापूर्वक मतदान का अपना अधिकार प्रयोग किया है। आपकी भागीदारी एक मजबूत लोकतंत्र के लिए महत्वपूर्ण है।',
            buttonText: 'अधिक जानें',
        },
        mr: {
            title: 'मतदानासाठी धन्यवाद!',
            message: 'आपण यशस्वीरित्या मतदानाचा अधिकार बजावला आहे. आपली सहभागिता मजबूत लोकशाहीसाठी अत्यंत महत्वाची आहे.',
            buttonText: 'अधिक जाणून घ्या',
        },
    };

    const handleLanguageChange = (event) => {
        setSelectedLanguage(event.target.value);
    };

    const currentText = languages[selectedLanguage];

    return (
        <div className="thank-you-container">
            <header className="header">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Flag_of_India.svg/1200px-Flag_of_India.svg.png" alt="Indian Flag" />
                <h1>{currentText.title}</h1>
            </header>
            <section className="message">
                <p>{currentText.message}</p>
            </section>
            <footer className="footer">
                <button >
                    {currentText.buttonText}
                </button>
                <select value={selectedLanguage} onChange={handleLanguageChange}>
                    <option value="en">English</option>
                    <option value="hi">Hindi</option>
                    <option value="mr">Marathi</option>
                </select>
            </footer>
        </div>
    );
};

export default EndMessage;

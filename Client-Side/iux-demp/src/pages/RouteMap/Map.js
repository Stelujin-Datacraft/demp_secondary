import React from 'react';

class GoogleMapDirections extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            origin: "Collector Office, Aurangabad", // Sample origin location
            destination: "Sillod, Auranagabad", // Sample destination location
        };
    }

    openGoogleMapDirections = () => {
        const { origin, destination } = this.state;
        const url = `https://www.google.com/maps/dir/?api=1&origin=${encodeURI(origin)}&destination=${encodeURI(destination)}`;
        window.open(url, '_blank');
    };

    render() {
        return (
            <div className="internal-container">

                <main className="internal-container">
                <h2>Google Maps Directions</h2>
                    <br />
                    <br />
                    
                    <header>
                        <p>Origin: {this.state.origin}</p>
                        <br/>
                <p>Destination: {this.state.destination}</p>
                    </header>
                        <button className='button-47' onClick={this.openGoogleMapDirections}>Get Directions</button>
            </main></div>
        );
    }
}

export default GoogleMapDirections;

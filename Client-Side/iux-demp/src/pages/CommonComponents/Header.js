import React, { useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { loadNavTypes, NavTypes,saveNavTypes,LoginType, saveUserLogin, loadUserLogin } from '../../components/actions';


const Header = ({ title, softwareName }) => {
    const [linkUrl, setLinkUrl] = useState(null);
    const setData = () => {
        console.log(loadNavTypes().payload, NavTypes.KEYT)
        if (loadNavTypes().payload == NavTypes.KEYT) {
            console.log("SAVE FALSE")
            saveNavTypes(NavTypes.KEYF)
        } else if(loadNavTypes().payload == NavTypes.KEYF){
            console.log("SAVE TRUE")
            saveNavTypes(NavTypes.KEYT)
        }
    }

    const handleNav = (url) => {
        console.log(url)
        if (url === '/logout') {
            saveUserLogin(LoginType.PUBLIC);
            window.location.href = '/login';
        }
        else {
            setLinkUrl(url)
            window.location.href = url;
        }

    }
    return (
        <header style={styles.header} className="header-bg">
            <a type="button" className="menuButton" onClick={() => setData() }>
                <img className="logo" src={require('../../assets/ICON/icon_logo.png')} />
                <div>
                <h3 style={{ color: 'yellow' }}>DEMP</h3>
                    <p >District Election Management Portal</p>
                </div>
            </a>
            <div style={{
                left: '150px',
                position: 'relative'
}}>

              {/*  <div className="search-container">
                    <form action="/action_page.php">
                        <input type="text" placeholder="Search.." name="search"/>
                            <button className="search-button" type="submit"><i class="fa fa-search"></i></button>
    </form>
  </div>*/}

            </div>
            <div className="header-content">
                <img src={require('../../assets/ICON/icon_logout.png')} /><span>.</span><a onClick={() => handleNav('/logout')}>Logout</a>
            </div>
        </header>
    );
};

const styles = {
    header: {
        //backgroundColor: 'rgb(21 40 127)', // Sky blue color
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '30px',
        margin: '0',
        borderRadius: '0',
        border: 'none',
        fontFamily: 'Poppins'
    },
    headerContent: {
        display: 'flex',
        alignItems: 'center',
    },
    logo: {
        marginRight: '1rem',
    },
    a: {
        color: 'white',
        display: 'flex',
        width: 'auto'
    },
    h3: {
        color: 'yellow'
    }
};

export default Header;

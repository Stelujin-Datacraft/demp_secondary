import React, { useState, useEffect } from 'react';
import '../../assets/styles.css'; // Import local stylesheet (replace './styles.css' with your actual path)

import { loadUser, LoginType, saveUserLogin, loadUserLogin } from '../../components/actions';

const NavigationBar = () => {
    const [activeLink, setActiveLink] = useState(null);
    const [linkUrl, setLinkUrl] = useState(null);
    const [mobileView, setMobileView] = useState(false);

    const closeNavBar = () => {
        console.log("CLICKED", mobileView)
        if (mobileView === true) {
            console.log(mobileView)
            setMobileView(false)
        }
        else {
            console.log(mobileView)
            setMobileView(true)
        }

    }

    useEffect(() => {
        const pathname = window.location.pathname; // Get current pathname

        // Find the matching active link based on pathname
        setActiveLink(navigationLinks.find((link) => link.path === pathname));
    }, []);

    const navigationLinks = [
        { name: 'Dashboards', path: '/canvas', img_url:'../../assets/ICON/icon_dashboard.png' },
        { name: 'Reports', path: '/adminview', img_url: '../../assets/ICON/icon_reports.png' },
        { name: 'Issues', path: '/issue_view', img_url: '../../assets/ICON/icon_issues.png' },
      /*  { name: 'Forms', path: '/forms-page', img_url: '../../assets/ICON/icon_forms.png' },*/
        { name: 'Route Map', path: '/routemap', img_url: '../../assets/ICON/icon_location.png' },
        { name: 'Communication Plan', path: '/contacts-details', img_url: '../../assets/ICON/icon_communication.png' },
        { name: 'Login', path: '/login', img_url: '../../assets/ICON/icon_logout.png' },
    ];
    const navigationAssemblyLinks = [
        { name: 'Dashboards', path: '/canvas', img_url: '../../assets/ICON/icon_dashboard.png' },
        { name: 'Poll Day Reporting', path: '/report-booth?target=poll', img_url: '../../assets/ICON/icon_location.png' },
        { name: 'Reports', path: '/adminview', img_url: '../../assets/ICON/icon_reports.png' },
        { name: 'Issues', path: '/issue_view', img_url: '../../assets/ICON/icon_issues.png' },
        { name: 'Forms', path: '/forms-page', img_url: '../../assets/ICON/icon_forms.png' },
        { name: 'Route Map', path: '/routemap', img_url: '../../assets/ICON/icon_location.png' },
        
        { name: 'Communication Plan', path: '/contacts-details', img_url: '../../assets/ICON/icon_communication.png' },
        { name: 'Login', path: '/login', img_url: '../../assets/ICON/icon_logout.png' },
    ];
    const navigationBoothLinks = [
        { name: 'Dashboards', path: '/canvas', img_url: '../../assets/ICON/icon_dashboard.png' },
        { name: 'Reports', path: '/adminview', img_url: '../../assets/ICON/icon_reports.png' },
        { name: 'Issues', path: '/issue_view', img_url: '../../assets/ICON/icon_issues.png' },
        /*  { name: 'Forms', path: '/forms-page', img_url: '../../assets/ICON/icon_forms.png' },*/
        { name: 'Route Map', path: '/routemap', img_url: '../../assets/ICON/icon_location.png' },
        { name: 'Communication Plan', path: '/contacts-details', img_url: '../../assets/ICON/icon_communication.png' },
        { name: 'Login', path: '/login', img_url: '../../assets/ICON/icon_logout.png' },
    ];

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
    const [activeNav, setActiveNav] = useState(navigationLinks)
    const [level, setLevel] = useState(loadUser().pay_level);
    useEffect(() => {
        // Call your function here
        
        if (level == 'dl') {
            setActiveNav(navigationLinks)
        }
        else if (level == 'al') { setActiveLink(navigationAssemblyLinks) }
        else if (level == 'dl') { setActiveLink(navigationBoothLinks) }


        //console.log(userLogin.type, LoginType.ADMIN);


        // Replace with your actual function name
    }, []);

    return (
        <div className="NBar" style={mobileView ? {  background: 'white'} : { backgroundColor: 'white'  }}>
            
            <a style={{ color: 'white' }} onClick={() => closeNavBar()}><img src={mobileView ? require('../../assets/ICON/icon_extender.png') : require('../../assets/ICON/icon_extender.png')} /></a>

            
                <div style={mobileView ? { display: 'none' } : { display: 'flex' }}>
        <nav className='NavBar'>
            
            <ul>
                {navigationLinks.map((link) => (
                    <li key={link.name} className={link.path === activeLink?.path ? 'active-link' : ''}>
                        
                        <a href={link.path} onClick={() => handleNav(link.path)}>{link.name}</a>
                    </li>
                ))}
                      {/*  <li><span><img style={}src={require('../../assets/ICON/icon_dashboard.png')} /></span><a onClick={() => handleNav('/canvas')}>Dashboard</a></li>
                <li><span><img src={require('../../assets/ICON/icon_reports.png')} /></span><a onClick={() => handleNav('/adminview')}>Reports</a></li>
                <li><span><img src={require('../../assets/ICON/icon_issues.png')} /></span><a onClick={() => handleNav('/issue_view')}>Issues</a></li>
                <li><span><img src={require('../../assets/ICON/icon_forms.png')} /></span><a onClick={() => handleNav('/forms-page')}>Forms</a></li>
                <li><span><img src={require('../../assets/ICON/icon_location.png')} /></span><a onClick={() => handleNav('/routemap')}>Route Maps</a></li>
                <li><span><img src={require('../../assets/ICON/icon_communication.png')} /></span><a onClick={() => handleNav('/contact-details')}>Communication Plan</a></li>
                <li><span><img src={require('../../assets/ICON/icon_login.png')} /></span><a onClick={() => handleNav('/login')}>Login</a></li>*/}
                <li><a onClick={ () => handleNav('/logout')}>Logout</a></li>
            </ul>
            </nav>
        </div>
        </div>
            );
};

export default NavigationBar;

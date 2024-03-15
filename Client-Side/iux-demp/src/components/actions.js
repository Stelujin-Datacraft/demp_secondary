// actions.js
//import { localStorage } from 'localStorage';


//USER DETAILS 
export const saveUser = (login, token, assembly, booth, level) => {
    localStorage.setItem('login', login);
    localStorage.setItem('level', level);
    localStorage.setItem('token', token);
    localStorage.setItem('assembly_code', assembly);
    localStorage.setItem('booth_code', booth);
}
export const loadUser = () => {
    const userData = {
        payload: localStorage.getItem('login'),
        pay_level: localStorage.getItem('level'),
        pay_token: localStorage.getItem('token'),
        pay_assembly_code: localStorage.getItem('assembly_code'),
        pay_booth_code: localStorage.getItem('booth_code')
    }
    return userData
}


// USER TYPE


export const LoginType = {
    PUBLIC: 'PublicUser',
    ADMIN: 'AdminUser',
    DADMIN: 'DistAdminUser',
    AROADMIN: 'AssemblyUser',
    SO: 'SectorOfficer',
    BLO:'BoothOfficer'

}

export const setUserLogin = (loginType) => ({
    type: 'SET_USERLOGIN',
    payload: loginType,

});

export const saveUserLogin = (loginType) => {
    localStorage.setItem('userlogin', loginType);
    return setUserLogin(loginType);
};

export const loadUserLogin = () => {
    const storedLogin = localStorage.getItem('userlogin');
    return storedLogin ? setUserLogin(storedLogin) : LoginType.PUBLIC;
};


/*
export const fetchUserData = () => async (dispatch) => {
    try {
        const response = await fetch('https://api.example.com/user');
        const data = await response.json();
        dispatch(userReducer(data)); // Dispatch a valid action with data
    } catch (error) {
        // Handle errors appropriately
    }
};
*/

export const getURLParams = () => {
    const searchParams = new URLSearchParams(window.location.search);
    const params = {};

    // Loop through each search parameter
    for (const [key, value] of searchParams.entries()) {
        params[key] = value;
    }

    return params;
}


// Navigation Bar



export const NavTypes = {
    KEYT: 'true',
    KEYF: 'false'
}

export const setNavTypes = (navType) => ({
    type: 'SET_NAV',
    payload: navType,
});

export const saveNavTypes = (navType) => {
    console.log("CALLED", navType)
    localStorage.setItem('nav', navType);
    return setNavTypes(navType);
};

export const loadNavTypes = () => {
    console.log("GETTING", localStorage.getItem('nav'))
    const storedNav = localStorage.getItem('nav');
    return storedNav ? setNavTypes(storedNav) : NavTypes.KEY;
};



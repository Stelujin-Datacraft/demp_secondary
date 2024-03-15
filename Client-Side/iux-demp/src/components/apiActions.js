import axios from 'axios';

// Function to handle POST requests
export const postData = async (url, data, headers = {}) => {
    try {
        const response = await axios.post(url, data, { headers });
        return response.data;
    } catch (error) {
        handleApiError(error);
    }
};

// Function to handle GET requests
export const getData = async (url,body, headers = {}) => {
    try {
       
        const response = await axios.get(url, {
            headers,
            params: body // Pass the body as query parameters
        });
        console.log(response.status)
        return response.data;
    } catch (error) {
        handleApiError(error);
    }
};

// Function to handle PUT requests
export const putData = async (url, data, headers = {}) => {
    try {
        const response = await axios.put(url, data, { headers });
        return response.data;
    } catch (error) {
         handleApiError(error);
    }
};

// Function to handle DELETE requests
export const deleteData = async (url, headers = {}) => {
    try {
        const response = await axios.delete(url, { headers });
        return response.data;
    } catch (error) {
        handleApiError(error);
    }
};

// Function to handle API errors
export const handleApiError = (error) => {
    if (error) {
        let errorMessage = 'An error occurred while making the API call';
        if (error.response) {
            // The request was made and the server responded with a status code
            errorMessage = `API Error: ${error.response.status} - ${error.response.data}`;
        } else if (error.request) {
            // The request was made but no response was received

            errorMessage = 'No response received from the server';
        } else {
            // Something happened in setting up the request that triggered an error
            errorMessage = `Request failed: ${error.message}`;
        }
        //throw new Error(errorMessage);
        console.log('ERROR CATCHED')
        console.log(errorMessage)
        return error.response.status
    } else {
        console.log("NO ERROR RESPONSE ")
        return 0
    }

};

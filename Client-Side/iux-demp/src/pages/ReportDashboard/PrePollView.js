import React, { useState, useEffect } from 'react';
import '../../assets/styles.css'
import IconLoc from '../CommonComponents/IconComponent';
import { loadUser, LoginType, loadUserLogin } from '../../components/actions';
import { urlPre, get_body, get_pre_poll_status, } from '../../components/globalApiConfig';
import { getData, handleApiError } from '../../components/apiActions';
import { getURLParams } from '../../components/actions'

function PrePollView() {
    
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const [prePollData, setPrePollData] = useState([
        { 'assembly': 'Gangapur','booth':'123', 'mock_poll': 'Yes', 'evm_clear': 'Yes' },
        { 'assembly': 'Gangapur', 'booth': '13', 'mock_poll': 'Yes', 'evm_clear': 'Yes' },
        { 'assembly': 'Gangapur', 'booth': '23', 'mock_poll': 'Yes', 'evm_clear': 'Yes' },
        { 'assembly': 'Gangapur', 'booth': '43', 'mock_poll': 'Yes', 'evm_clear': 'Yes' },
        { 'assembly': 'Gangapur', 'booth': '6', 'mock_poll': 'Yes', 'evm_clear': 'Yes' },
        { 'assembly': 'Gangapur', 'booth': '73', 'mock_poll': 'Yes', 'evm_clear': 'Yes' },
        { 'assembly': 'Kannad','booth':'9', 'mock_poll': 'No', 'evm_clear': 'No' },
        { 'assembly': 'Kannad', 'booth': '13', 'mock_poll': 'Yes', 'evm_clear': 'Yes' },
        { 'assembly': 'Kannad', 'booth': '53', 'mock_poll': 'Yes', 'evm_clear': 'No' },
        { 'assembly': 'Kannad', 'booth': '4', 'mock_poll': 'No', 'evm_clear': 'No' },
        { 'assembly': 'Kannad', 'booth': '90', 'mock_poll': 'Yes', 'evm_clear': 'No' },
        { 'assembly': 'Kannad', 'booth': '12', 'mock_poll': 'No', 'evm_clear': 'No' },

        { 'assembly': 'Paithan', 'booth': '8', 'mock_poll': 'Yes', 'evm_clear': 'Yes' },
        { 'assembly': 'Paithan', 'booth': '6', 'mock_poll': 'Yes', 'evm_clear': 'No' },
        { 'assembly': 'Paithan', 'booth': '7', 'mock_poll': 'No', 'evm_clear': 'No' },
        { 'assembly': 'Paithan', 'booth': '12', 'mock_poll': 'Yes', 'evm_clear': 'Nos' },
        { 'assembly': 'Paithan', 'booth': '14', 'mock_poll': 'No', 'evm_clear': 'Nos' },
        { 'assembly': 'Paithan', 'booth': '80', 'mock_poll': 'No', 'evm_clear': 'Nos' },

        { 'assembly': 'East', 'booth': '13', 'mock_poll': 'Yes', 'evm_clear': 'Yes' },
        { 'assembly': 'Central','booth':'3', 'mock_poll': 'Yes', 'evm_clear': 'Yes' },
        { 'assembly': 'Central', 'booth': '1', 'mock_poll': 'Yes', 'evm_clear': 'Yes' },
        { 'assembly': 'Central', 'booth': '5', 'mock_poll': 'Yes', 'evm_clear': 'Yes' },
        { 'assembly': 'Central', 'booth': '9', 'mock_poll': 'Yes', 'evm_clear': 'Yes' },
        { 'assembly': 'Central', 'booth': '31', 'mock_poll': 'Yes', 'evm_clear': 'Yes' },
        { 'assembly': 'Central', 'booth': '73', 'mock_poll': 'Yes', 'evm_clear': 'Yes' },
        { 'assembly': 'West','booth':'01', 'mock_poll': 'Yes', 'evm_clear': 'Yes' },
        { 'assembly': 'West', 'booth': '17', 'mock_poll': 'Yes', 'evm_clear': 'Yes' },
        { 'assembly': 'West', 'booth': '26', 'mock_poll': 'Yes', 'evm_clear': 'Yes' },
        { 'assembly': 'West', 'booth': '113', 'mock_poll': 'Yes', 'evm_clear': 'Yes' },
        { 'assembly': 'West', 'booth': '13', 'mock_poll': 'Yes', 'evm_clear': 'Yes' },


        { 'assembly': 'Bijapur', 'booth': '123', 'mock_poll': 'Yes', 'evm_clear': 'Yes' },
        { 'assembly': 'Bijapur', 'booth': '123', 'mock_poll': 'Yes', 'evm_clear': 'Yes' },
        { 'assembly': 'Bijapur', 'booth': '123', 'mock_poll': 'Yes', 'evm_clear': 'Yes' },
        { 'assembly': 'Bijapur', 'booth': '123', 'mock_poll': 'Yes', 'evm_clear': 'Yes' },
        { 'assembly': 'Bijapur', 'booth': '123', 'mock_poll': 'Yes', 'evm_clear': 'Yes' },
        { 'assembly': 'Bijapur', 'booth': '123', 'mock_poll': 'Yes', 'evm_clear': 'Yes' },

        { 'assembly': 'Sillod', 'booth': '123', 'mock_poll': 'No', 'evm_clear': 'No' },
        { 'assembly': 'Sillod', 'booth': '123', 'mock_poll': 'Yes', 'evm_clear': 'Yes' },
        { 'assembly': 'Sillod', 'booth': '123', 'mock_poll': 'Yes', 'evm_clear': 'Yes' },
        { 'assembly': 'Sillod', 'booth': '123', 'mock_poll': 'No', 'evm_clear': 'No' },
        { 'assembly': 'Sillod', 'booth': '123', 'mock_poll': 'Yes', 'evm_clear': 'No' },
        { 'assembly': 'Sillod', 'booth': '123', 'mock_poll': 'Yes', 'evm_clear': 'No' },


        { 'assembly': 'Phulambri', 'booth': '123', 'mock_poll': 'Yes', 'evm_clear': 'Yes' },
    ])
    const [prePollDataActive, setPrePollDataActive] = useState(prePollData)


    const [userId, setUserId] = useState(loadUser.payload);
    const [level, setLevel] = useState(loadUser.pay_level);
    const [token, setToken] = useState(loadUser.pay_token);
    const [isOpenSelected, setIsOpenSelected] = useState(true);

    const [openIssue, setOpenIssue] = useState('open')
    const [isAssmbly, setIsAssmbly] = useState('all')
    const handleClick = () => {
        setIsOpenSelected(!isOpenSelected);
        if (isOpenSelected) {
            console.log("all")
            setOpenIssue('open')
            setPrePollData(prePollDataActive.filter(obj => obj.evm_clear === 'No'))

            try { getPrePollStatus() } catch (error) { console.log(error) }
            //onResolvedClick();
        } else {
            setOpenIssue('failed')
            console.log("CLosed")
            setPrePollData(prePollDataActive)

            try { getPrePollStatus() } catch (error) { console.log(error) }
            //onOpenClick();
        }
    };
    const handleChangeData = (array, key) => {
        //console.log(array.filter(obj => obj.assembly === key))
        //console.log(key)

        return array.filter(obj => obj.assembly === key);
        
    }

    async function getPrePollStatus(userId, token) {
        try {
            let body = get_body(userId, token)
            body['pre_poll_status'] = openIssue
            body['assembly'] = isAssmbly

            const response = await getData(`${urlPre}/${get_pre_poll_status}/`, body);
            console.log(response)
            if (response) { setPrePollData(response); }

        } catch (error) {
            console.log("Server Failed to respond")

            handleApiError(error)

        }
    }


    useEffect(() => {
        const urlParams = getURLParams();
        console.log(urlParams.assembly);
        setIsAssmbly(urlParams.assembly)
        try { getPrePollStatus() } catch (error) { console.log(error) }
    }, []);
    const [selectedCategory, setSelectedCategory] = useState('EVM Issues');

    const handleCategoryChange = (event) => {
 
        setIsAssmbly(event.target.value)
        setSelectedCategory(event.target.value);
        
        setPrePollData(handleChangeData(prePollDataActive, event.target.value))
        try { getPrePollStatus() } catch (error) { console.log(error) }
        //onCategoryChange(event.target.value); // Pass selected category to parent
    };
    const handleDropdownClick = (index) => {
        // Implement your dropdown menu logic here
        // You can access the detailed data for the selected row using data[index]
        console.log('Dropdown clicked for row:', index);
        window.location.href = `/dbview?booth=${index}`;
    };
  
    return (
        <div className='internal-container' style={{ backgroundColor: 'white', overflowY:'scroll' }}>
            <header>

                <div className="toggle-button">
                    <button
                        className={isOpenSelected ? 'active' : ''}
                        onClick={handleClick}
                    >
                        All Booths
                    </button>
                    <button
                        className={!isOpenSelected ? 'active' : ''}
                        onClick={handleClick}
                    >
                        Booths Not Started
                    </button>
                </div>
                <div className="toggle-button">

                    <label>Select Issue type</label>
                    <select value={selectedCategory} onChange={handleCategoryChange} >
                        <option value="Sillod">Sillod</option>
                        <option value="Paithan">Paithan</option>
                        <option value="Kannad">Kannad</option>
                        <option value="Central">Central</option>
                        <option value="East">East</option>
                        <option value="West">West</option>
                        <option value="Phulambri">Phulambri</option>
                        <option value="Gangapur">Gangapur</option>
                        <option value="Vaijapur">Vijapur</option>
                    </select></div>

            </header>
            <main className='internal-container'>
                <br />

                <div>Pre-Poll Status
                    <table>
                        <thead>
                            <tr>
                                <th>Assembly</th>
                                <th>Booth</th>
                                <th>Mock - poll</th>
                                <th>EVM clear</th>
                                <th>Poll Start</th>
                                <th>SO Contact</th>
                            </tr>
                        </thead>
                        <tbody>
                            {prePollData.map((row, index) => (
                                <tr onClick={() => handleDropdownClick(row.booth)}>
                                    <td>{row.assembly}</td>
                                    <td>{row.booth}</td>
                                    <td ><img style={{ width: '30px' }} src={row.mock_poll === 'Yes' ? "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAADFklEQVR4nO2WW0xScRzHz4v2ni8JA0VRuSkhMF9600DxmooiiKnokce2HnL22GrVQxfTtLd6yLx0WSvU1COguUxN5aIgEoqKst5M30p+7ZC3CQcBca3N7/bZDr/L//uF/ccOgpzpfxLfhTKELnWjwI1iQrfaInQ3bP9FbfHWXOpGfCbixoKVeqHAVTcs2GgAgfsYNhqAv46O8V3opRMb8wGNSl+pb+OvoR7+Ogohge8461rxM8IyF84rY3hOlS7dVQ8ngees1bLMqvOhffMpNIrnqNHyVlUQCbiO6lGWWRoddIA029X2i85aiCTcxarW4MznKjO432s83KUaiCj2ag/bqhAeG4BjrdKmOarhNOAsKIcCmjNnZOxUmxJS7VUn4vp6C6hW7/r2bEpgm8qZhAHYpoomjk0JYbOghNYfbwDX5u9t4FgrfWZYRvkN4l/AKMfY1koIC0sltLhfw54ebXT5nWOY5IOEARgG2SLLogB/VNtvwbWlh8Ca99OfV0DLes++Of7sd86iAKZBtkAYIGVWtsWck4MPxgrY/LXtPfzJWjcwzYd6Zrm3tief/hFwD8IAydNlPxkmGfhglMED58t9k+aVLm8NB3/2qZuISfkm3SQMkDRZaksxlINfZsqgebnzwGy50+czPkO4v0vSZImVMAD9awmWPFsGhExL4b79BRzVY0eHtxdwdxf6eAnxJUzUFd1MmpZCQKZK4Z7t+cFtt3d4a8fu7ULXFzUSBojT5jHoE8VAnyoJzEQxqA13QG24DUHNH9qLG5AQ/xHhoukLtIkTxXAa0HQFGHKcKJocQcJY4U7C+BWIJLTPRZ74j5IMJBhR+3PaaV+KIJJQByVPkWDF6pZGUz/l6uLHCiESUAZyxui92eeQUER6mxlD6cvWx43kQ9xomIzkA6U/R4efFZL5nljdrGjSe1E7Fcv1UPV5EBKYZIf8QdSGPOOH91J6WKSOTB6pV9xLwSRA0eUGBpMASSMeJvdcDu7ChaILr7KYse+ymmI1oiGyRmQl94m3cEgasSVWIxrEe/hMSIeeCfnH+gM5kThN5WVbbgAAAABJRU5ErkJggg==" : "https://img.icons8.com/ios-filled/50/FA5252/close-window.png"} /></td>
                                    <td ><img style={{ width: '30px' }} src={row.evm_clear === 'Yes' ? "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAADFklEQVR4nO2WW0xScRzHz4v2ni8JA0VRuSkhMF9600DxmooiiKnokce2HnL22GrVQxfTtLd6yLx0WSvU1COguUxN5aIgEoqKst5M30p+7ZC3CQcBca3N7/bZDr/L//uF/ccOgpzpfxLfhTKELnWjwI1iQrfaInQ3bP9FbfHWXOpGfCbixoKVeqHAVTcs2GgAgfsYNhqAv46O8V3opRMb8wGNSl+pb+OvoR7+Ogohge8461rxM8IyF84rY3hOlS7dVQ8ngees1bLMqvOhffMpNIrnqNHyVlUQCbiO6lGWWRoddIA029X2i85aiCTcxarW4MznKjO432s83KUaiCj2ag/bqhAeG4BjrdKmOarhNOAsKIcCmjNnZOxUmxJS7VUn4vp6C6hW7/r2bEpgm8qZhAHYpoomjk0JYbOghNYfbwDX5u9t4FgrfWZYRvkN4l/AKMfY1koIC0sltLhfw54ebXT5nWOY5IOEARgG2SLLogB/VNtvwbWlh8Ca99OfV0DLes++Of7sd86iAKZBtkAYIGVWtsWck4MPxgrY/LXtPfzJWjcwzYd6Zrm3tief/hFwD8IAydNlPxkmGfhglMED58t9k+aVLm8NB3/2qZuISfkm3SQMkDRZaksxlINfZsqgebnzwGy50+czPkO4v0vSZImVMAD9awmWPFsGhExL4b79BRzVY0eHtxdwdxf6eAnxJUzUFd1MmpZCQKZK4Z7t+cFtt3d4a8fu7ULXFzUSBojT5jHoE8VAnyoJzEQxqA13QG24DUHNH9qLG5AQ/xHhoukLtIkTxXAa0HQFGHKcKJocQcJY4U7C+BWIJLTPRZ74j5IMJBhR+3PaaV+KIJJQByVPkWDF6pZGUz/l6uLHCiESUAZyxui92eeQUER6mxlD6cvWx43kQ9xomIzkA6U/R4efFZL5nljdrGjSe1E7Fcv1UPV5EBKYZIf8QdSGPOOH91J6WKSOTB6pV9xLwSRA0eUGBpMASSMeJvdcDu7ChaILr7KYse+ymmI1oiGyRmQl94m3cEgasSVWIxrEe/hMSIeeCfnH+gM5kThN5WVbbgAAAABJRU5ErkJggg==" : "https://img.icons8.com/ios-filled/50/FA5252/close-window.png"} /></td>
                                    <td ><div className={row.evm_clear === 'Yes' ? 'tableStatusGreen' : 'tableStatusRed'}>{row.evm_clear === 'Yes' ? 'Started' : 'Not Started'}</div></td>
                                    <td><img style={{ width: '20px', margin: '5px' }} width="20" height="20" src="https://img.icons8.com/ios-filled/50/000000/ringer-volume.png" alt="ringer-volume" />9049807255</td>
                                </tr>))}
                        </tbody>
                    </table>

                </div>

            </main> </div>
    );
}

export default PrePollView;

import React, { useState, useEffect } from 'react';
import '../../assets/styles.css'
import IconLoc from '../CommonComponents/IconComponent';
import IssueAllView from './IssueAllView';
import IssueAssemblyView from './IssueAssemblyView';
function IssueList() {
    const [issues, setIssues] = useState([
        {
            "id_issue": 'Issue is the best',
            "title": 'EVM',
            "type": 'evm',
            "publisher": 'SO. ARO',
            "status": 'Open',
            "assembly": 'Sillod',
            "pollbooth": 'Booth 1',
            "contact": '9049807255',
            "contact_url": "https://sjcbsbk",
            "location": 'Abad',
            "time": '2 mins',
            "location_url":'https://hcjsk'
        },
        {
            "id_issue": 'Issue is the best',
            "title": 'Law and Order',
            "type": 'law',
            "publisher": 'SO. ARO',
            "status": 'Closed',
            "assembly": 'Phulambri',
            "pollbooth": 'Booth 1',
            "contact": '9049807255',
            "contact_url": "https://sjcbsbk",
            "location": 'Abad',
            "time": '40 mins',
            "location_url": 'https://hcjsk'
        }, {
            "id_issue": 'Issue is the best',
            "title": 'EVM',
            "type": 'evm',
            "publisher": 'SO. ARO',
            "status": 'Closed',
            "assembly": 'Kannad',
            "pollbooth": 'Booth 1',
            "contact": '9049807255',
            "contact_url": "https://sjcbsbk",
            "location": 'Abad',
            "time": '1 hour',
            "location_url": 'https://hcjsk'
        },
    ]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        
    }, []);
    const handleLocationClick = (url) => {
        console.log(`Clicked button: ${url}`);
        window.location.href = `/map`;
    }
    const [isOpenSelected, setIsOpenSelected] = useState(true);
    const [isOpenLevelSelected, setIsOpenLevelSelected] = useState(true);

    const [openIssue, setOpenIssue] = useState('open')
    const [issueType, setIssueType] = useState('all')
    const [allIssue, setAllIssue] = useState('all')
    const [activeIssues, setActiveIssues] = useState(issues)

    const handleClick = () => {
        setIsOpenSelected(!isOpenSelected);
        if (isOpenSelected) {
            console.log("Open")
            setOpenIssue('open')
/*            const tempActiveIssues = activeIssues*/
            setIssues(activeIssues.filter(obj => obj.status === 'Open'))
            //onResolvedClick();
        } else {
            setOpenIssue('closed')
            console.log("CLosed")
            console.log(activeIssues)
            setIssues(activeIssues.filter(obj => obj.status === 'Closed'))
            console.log(issues)
            //onOpenClick();
        }
    };
    const handleClickLevel = () => {
        setIsOpenLevelSelected(!isOpenLevelSelected);
        if (isOpenLevelSelected) {
            setAllIssue('all')
            console.log("ALL")
            //onResolvedClick();
        } else {
            setAllIssue('assembly')
            console.log("CLosed")
            //onOpenClick();
        }
    };


    const [selectedCategory, setSelectedCategory] = useState('EVM Issues');

    const handleCategoryChange = (event) => {
        setIssueType(event.target.value)
        setSelectedCategory(event.target.value);
        setIssues(activeIssues.filter(obj => obj.type === event.target.value))
        //onCategoryChange(event.target.value); // Pass selected category to parent
    };


    return (
        <div className='internal-container'>
            <header>
                <div className="toggle-button">
                    <button
                        className={isOpenSelected ? 'active' : ''}
                        onClick={handleClick}
                    >
                        Open issues
                    </button>
                    <button
                        className={!isOpenSelected ? 'active' : ''}
                        onClick={handleClick}
                    >
                        Resolved issues
                    </button>
                </div>

            </header>
            <main className='internal-container'>
                <br />

            <header>
                    <h2>Issues </h2>
                    <br />
                    <div style={{ display: 'flex' }}>
                    <div className="toggle-button">
                        <label>Select Issue type</label>
                    <select value={selectedCategory} onChange={handleCategoryChange}>
                        <option value="evm">EVM Issues</option>
                        <option value="law">LAW and Order Issues</option>
                        <option value="na">Natural Disaster issues</option>
                        </select></div>
                    <div className="toggle-button">
                        <button
                            className={isOpenLevelSelected ? 'active' : ''}
                            onClick={handleClickLevel}
                        >
                        All Issues 
                        </button>
                        <button
                            className={!isOpenLevelSelected ? 'active' : ''}
                            onClick={handleClickLevel}
                        >
                            Assembly Level
                        </button>
                    </div>

                    </div>
                <br />
            <div >
            {isLoading && <p>{/*Loading issues...*/}</p>}
                        {error && <p>{/*Error: {error.message}*/}</p>}
                        {!isOpenLevelSelected || (
                            <div><IssueAllView issuesD={issues} openIssue={openIssue} issueType={ issueType } allIssue={allIssue}/></div>
                        )}
                        {isOpenLevelSelected || (
                            <div><IssueAssemblyView issuesD={ issues}  openIssue={openIssue} issueType={issueType} allIssue={allIssue}/></div>
                        )}

                    </div></header>
            </main> </div>
            );
}

export default IssueList;

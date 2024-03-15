import React, { useEffect } from 'react';

const MyChart = () => {
    useEffect(() => {
        const appLocation = "";
        window.__basePath = appLocation;

        const script1 = document.createElement("script");
        script1.src = "https://cdn.jsdelivr.net/npm/ag-charts-enterprise@9.1.1/dist/umd/ag-charts-enterprise.js?t=1708596453429";
        script1.async = true;
        document.body.appendChild(script1);

        const script2 = document.createElement("script");
        script2.src = "data.js";
        script2.async = true;
        document.body.appendChild(script2);

        const script3 = document.createElement("script");
        script3.src = "main.js";
        script3.async = true;
        document.body.appendChild(script3);

        return () => {
            document.body.removeChild(script1);
            document.body.removeChild(script2);
            document.body.removeChild(script3);
        };
    }, []);

    return (
        <div id="myChart"></div>
    );
};

export default MyChart;

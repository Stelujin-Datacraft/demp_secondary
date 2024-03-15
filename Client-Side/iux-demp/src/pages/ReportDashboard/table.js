import React from 'react';

const Table = ({ timeData }) => {
    const uniqAssemblies = [...new Set(timeData.map((item) => item.assembly))];
    const headerRows = [
        ['Time', 'Counts'],
        ...uniqAssemblies.map((assembly) => [assembly, 'Total', 'Male', 'Female', 'Trans']),
    ];

    const tableData = timeData.reduce((acc, item) => {
        const assemblyIndex = uniqAssemblies.indexOf(item.assembly);
        const rowKey = item.time + item.assembly;
        if (!acc[rowKey]) {
            acc[rowKey] = [];
            acc[rowKey].push(item.time);
            acc[rowKey].push('Total');
        }
        acc[rowKey][assemblyIndex + 2] = item[`total_male_count`];
        acc[rowKey][assemblyIndex + 3] = item[`total_female_count`];
        acc[rowKey][assemblyIndex + 4] = item[`total_trans_count`];
        // Adjust for 'Total-Count' column if needed
        return acc;
    }, {});

    return (
        <table>
            <thead>
                <tr>
                    {headerRows[0].map((header) => (
                        <th key={header}>{header}</th>
                    ))}
                </tr>
                <tr>
                    {headerRows[1].map((header) => (
                        <th key={header}>{header}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {Object.values(tableData).map((row, index) => (
                    <tr key={index}>
                        {row.map((value) => (
                            <td key={value}>{value}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default Table;

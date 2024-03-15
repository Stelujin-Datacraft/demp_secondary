const bigqueryService = require('../services/bigqueryService');

async function getAssemblyDashboard() {
    const query = 'SELECT * FROM your_assembly_dashboard_table';
    const data = await bigqueryService.executeQuery(query);
    return data;
}

module.exports = {
    getAssemblyDashboard,
};

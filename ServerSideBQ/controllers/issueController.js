const bigqueryService = require('../services/bigqueryService');

async function getIssuesDetail() {
    const query = 'SELECT * FROM your_issues_detail_table';
    const data = await bigqueryService.executeQuery(query);
    return data;
}

async function getIssueDetail() {
    const query = 'SELECT * FROM your_issue_detail_table';
    const data = await bigqueryService.executeQuery(query);
    return data;
}

async function postIssueForm(reqBody) {
    const datasetId = 'your_dataset';
    const tableId = 'your_issue_form_table';
    const rows = [{ column1: reqBody.value1, column2: reqBody.value2 }];
    await bigqueryService.insertRows(datasetId, tableId, rows);
}

module.exports = {
    getIssuesDetail,
    getIssueDetail,
    postIssueForm,
};

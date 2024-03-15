const bigqueryService = require('../services/bigqueryService');

async function getPrePollStatusBooth() {
    const query = 'SELECT * FROM your_pre_poll_status_booth_table';
    const data = await bigqueryService.executeQuery(query);
    return data;
}

async function postPrePoll(reqBody) {
    const datasetId = 'your_dataset';
    const tableId = 'your_pre_poll_table';
    const rows = [{ column1: reqBody.value1, column2: reqBody.value2 }];
    await bigqueryService.insertRows(datasetId, tableId, rows);
}

async function postPollClosed(reqBody) {
    const datasetId = 'your_dataset';
    const tableId = 'your_poll_closed_table';
    const rows = [{ column1: reqBody.value1, column2: reqBody.value2 }];
    await bigqueryService.insertRows(datasetId, tableId, rows);
}

module.exports = {
    getPrePollStatusBooth,
    postPrePoll,
    postPollClosed,
};

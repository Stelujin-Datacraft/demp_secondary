const { BigQuery } = require('@google-cloud/bigquery');

const bigquery = new BigQuery({
    projectId: 'modified-glyph-416314',
    keyFilename: 'modified-glyph-416314-6b363db68f32.json',
});

async function executeQuery(query) {
    const [rows] = await bigquery.query(query);
    return rows;
}

async function insertRows(datasetId, tableId, rows) {
    const dataset = bigquery.dataset(datasetId);
    const table = dataset.table(tableId);

    await table.insert(rows);
}

module.exports = {
    executeQuery,
    insertRows,
};

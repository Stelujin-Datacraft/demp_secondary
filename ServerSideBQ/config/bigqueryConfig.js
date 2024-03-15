const { BigQuery } = require('@google-cloud/bigquery');

// Initialize BigQuery with service account credentials
const bigquery = new BigQuery({
    projectId: 'modified-glyph-416314',
    keyFilename: 'modified-glyph-416314-6b363db68f32.json',
});

module.exports = bigquery;

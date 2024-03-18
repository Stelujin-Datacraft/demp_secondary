const express = require('express');
const issueController = require('../controllers/issueController');
const bigqueryService = require('../services/bigqueryService');

const router = express.Router();

router.get('/details', async (req, res) => {
    try {
        const issuesDetail = await issueController.getIssuesDetail();
        res.json({ status: 'success', data: issuesDetail });
    } catch (error) {
        console.error('Error fetching issues detail:', error);
        res.status(500).json({ status: 'error', message: 'Failed to fetch issues detail' });
    }
});

router.get('/detail', async (req, res) => {
    try {
        const issueDetail = await issueController.getIssueDetail();
        res.json({ status: 'success', data: issueDetail });
    } catch (error) {
        console.error('Error fetching issue detail:', error);
        res.status(500).json({ status: 'error', message: 'Failed to fetch issue detail' });
    }
});

router.post('/form', async (req, res) => {
    try {
        await issueController.postIssueForm(req.body);
        res.json({ status: 'success', message: 'Issue form data inserted successfully' });
    } catch (error) {
        console.error('Error inserting issue form data:', error);
        res.status(500).json({ status: 'error', message: 'Failed to insert issue form data' });
    }
});


router.get('/get_issues_details', async (req, res) => {
    try {
        // Construct the query to get issues details
        const query = `
            SELECT 
                COALESCE(COUNT(CASE WHEN issues <> 'NA' THEN 1 END), 0) as total_issues,
                COALESCE(COUNT(CASE WHEN issues = 'YES' THEN 1 END), 0) AS open_issues,
                COALESCE(COUNT(CASE WHEN issues = 'NO' THEN 1 END), 0) AS closed_issues,
                COALESCE(COUNT(CASE WHEN issue_type = 'evm' THEN 1 END), 0) AS evm_issues,
                COALESCE(COUNT(CASE WHEN issue_type = 'law' THEN 1 END), 0) AS law_issues
            FROM 
                \`modified-glyph-416314.demp_dev_master.demp_core\``;

        // Execute the query
        console.log(query)
        const rows = await bigqueryService.executeQuery(query);
        console.log(rows)
        // Return the result
        if (rows != null ) {
            const result = rows[0];
            res.status(200).json({ status: 'success', data: result });
        } else {
            res.status(404).json({ status: 'failed', message: 'No data found' });
        }
    } catch (error) {
        console.error('Error fetching issues details:', error);
        res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
});




router.get('/get_all_issues', async (req, res) => {
    try {
        // Get the issue_type parameter from the request query
        const issueType = req.query.issue_type;

        // Construct the base query to get all issues
        let baseQuery = `
            SELECT
                sector,
                booth_no,
                issue_type,
                time
            FROM
                \modified-glyph-416314.demp_dev_master.demp_core\
            WHERE
                issues = 'YES'`;

        // If issue_type parameter is provided and not 'all', add condition for specific issue type
        if (issueType && issueType !== 'all') {
            baseQuery += ` AND issue_type = '${issueType}'`;
        }

        // Execute the query
        const rows = await bigqueryService.executeQuery(baseQuery);

        // Return the result
        res.status(200).json({ status: 'success', data: rows });
    } catch (error) {
        console.error('Error fetching all issues:', error);
        res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
});

router.get('/get_issue_detail_booth', async (req, res) => {
    try {
        // Get the assembly and booth number parameters from the request query
        const sector = req.query.assembly;
        const boothNumber = req.query.booth;

        // Construct the base query to get issue details for a specific booth
        let baseQuery = `
            SELECT
                issues as status,
                issue_type as issue,
                issue_description as description,
                \`time\`,
                so_mob as so_contact
            FROM
                \`modified-glyph-416314.demp_dev_master.demp_core\`
            WHERE
                sector = '${sector}' AND
                booth_no = '${boothNumber}'`;

        // Execute the query
        const rows = await bigqueryService.executeQuery(baseQuery);

        // Return the result
        res.status(200).json({ status: 'success', data: rows });
    } catch (error) {
        console.error('Error fetching issue details for booth:', error);
        res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
});






router.put('/post_issue_form', async (req, res) => {
    try {
        // Get parameters from request body
        const { sector, boothNumber, issue_status, issueType, issueDescription } = req.body;
        console.log(sector, boothNumber, issue_status, issueType, issueDescription)
        // Construct the update query
        const updateQuery = `
            UPDATE
                \`modified-glyph-416314.demp_dev_master.demp_core\`
            SET
                issues = '${issue_status}',
                issue_type = '${issueType}',
                issue_description = '${issueDescription}',
                time = CURRENT_TIMESTAMP()
            WHERE
                sector = '${sector}' AND
                booth_no = '${boothNumber}'`;

        // Execute the update query
        await bigqueryService.executeQuery(updateQuery);

        // Return success response
        res.status(200).json({ status: 'success', message: 'Issue updated successfully' });
    } catch (error) {
        console.error('Error updating issue:', error);
        res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
});




// Endpoint to get issues report list
router.get('/get_issues_report_list_bl', async (req, res) => {
    try {
        // Get parameters from request query
        const { issueType, sector, issues } = req.query;

        // Construct the base query
        let baseQuery = `
            SELECT *
            FROM (
                SELECT issues ,issue_type, booth_no, sector, issue_publisher, time
                FROM \`modified-glyph-416314.demp_dev_master.demp_core\`
                WHERE issues <> 'NA'`;

        // Add filters based on dynamic parameters
        if (sector !== 'all') {
            baseQuery += ` AND sector = '${sector}'`;
        }
        if (issueType !== 'all') {
            baseQuery += ` AND issue_type = '${issueType}'`;
        }
        if (issues) {
            baseQuery += ` AND issues = '${issues}'`;
        }

        baseQuery += `) AS main
            LEFT JOIN (
                SELECT sector, booth_no, blo_name, blo_mob, time
                FROM \`modified-glyph-416314.demp_dev_master.demp_core\`
                WHERE issues <> 'NA'
            ) AS sub ON main.sector =  sub.sector and main.booth_no = sub.booth_no`;

        // Execute the query
        const rows = await bigqueryService.executeQuery(baseQuery);
        console.log(rows)
        // Return the result
        res.status(200).json({ status: 'success', data: rows });
    } catch (error) {
        console.error('Error fetching issues report list:', error);
        res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
});



// Endpoint to get issue details for a specific booth
router.get('/get_issue_all_details', async (req, res) => {
    try {
        // Get parameters from request query
        const { assembly, boothNumber } = req.query;

        // Construct the query
        const query = `
            SELECT
                sector,
                booth_no,
                booth_name,
                blo_name,
                blo_mob,
                so_name,
                so_mob,
                issues,
                issue_type,
                issue_description,
                issue_publisher,
                \`time\`
            FROM
                \`modified-glyph-416314.demp_dev_master.demp_core\`
            WHERE
                sector = '${assembly}' AND
                booth_no = '${boothNumber}'`;

        // Execute the query
        const rows = await bigqueryService.executeQuery(query);
        console.log(rows)
        // Return the result
        res.status(200).json({ status: 'success', data: rows });
    } catch (error) {
        console.error('Error fetching issue details:', error);
        res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
});





// Endpoint to update issue status
router.post('/post_update_issue', async (req, res) => {
    try {
        // Get parameters from request body
        const { sector, boothNumber, key } = req.body;

        // Construct the update query
        const updateQuery = `
            UPDATE \`modified-glyph-416314.demp_dev_master.demp_core\`
            SET issues = '${key}'
            WHERE sector = '${sector}' AND booth_no = '${boothNumber}'`;

        // Execute the update query
        await bigqueryService.executeQuery(updateQuery);

        // Return success response
        res.status(200).json({ status: 'success', message: 'Issue status updated successfully' });
    } catch (error) {
        console.error('Error updating issue status:', error);
        res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
});



module.exports = router;

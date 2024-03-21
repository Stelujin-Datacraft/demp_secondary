const express = require("express");
const pollController = require("../controllers/pollController");
const otpService = require("../services/otpService");
const bigqueryService = require("../services/bigqueryService");
const router = express.Router();

router.get("/pre-poll-status-booth", async (req, res) => {
  const token = req.query.token;
  try {
    const valid = await otpService.checkToken(token);
    if (valid) {
      const data = await pollController.getPrePollStatusBooth();
      res.json({ status: "success", data });
    } else {
      res.json({ status: "failed" });
    }
  } catch (error) {
    console.error("Error fetching pre-poll status for booth:", error);
    res.status(500).json({
      status: "error",
      message: "Failed to fetch pre-poll status for booth",
    });
  }
});

router.post("/pre-poll", async (req, res) => {
  const token = req.query.token;
  try {
    const valid = await otpService.checkToken(token);
    if (valid) {
      await pollController.postPrePoll(req.body);
      res.json({
        status: "success",
        message: "Pre-poll data inserted successfully",
      });
    } else {
      res.json({ status: "failed" });
    }
  } catch (error) {
    console.error("Error inserting pre-poll data:", error);
    res
      .status(500)
      .json({ status: "error", message: "Failed to insert pre-poll data" });
  }
});

router.post("/poll-closed", async (req, res) => {
  const token = req.query.token;
  try {
    const valid = await otpService.checkToken(token);
    if (valid) {
      await pollController.postPollClosed(req.body);
      res.json({
        status: "success",
        message: "Poll closed data inserted successfully",
      });
    } else {
      res.json({ status: "failed" });
    }
  } catch (error) {
    console.error("Error inserting poll closed data:", error);
    res
      .status(500)
      .json({ status: "error", message: "Failed to insert poll closed data" });
  }
});

router.get("/get_pre_poll_status", async (req, res) => {
  const token = req.query.token;
  try {
    const valid = await otpService.checkToken(token);
    if (valid) {
      // Get the assembly parameter from the request query
      const assembly = req.query.assembly;

      // Construct the base query to get pre-poll status
      let baseQuery = `
            SELECT
                main.*,
                sub.so_mob as so_mob
            FROM
                (
                    SELECT
                        sector as assembly,
                        COALESCE(COUNT(CASE WHEN evm_clear = 'YES' THEN 1 END), 0) AS evm_clear,
                        COALESCE(COUNT(CASE WHEN mockpoll = 'YES' THEN 1 END), 0) AS mock_poll,
                        COALESCE(COUNT(CASE WHEN poll_start = 'YES' THEN 1 END), 0) AS poll_start_no_count,
                        COALESCE(COUNT(poll_start), 0) AS total_count
                    FROM
                        \`modified-glyph-416314.demp_dev_master.demp_core\`
                    GROUP BY
                        sector
                    ORDER BY
                        sector
                ) AS main
            LEFT JOIN
                (
                    SELECT
                        *
                    FROM
                        (
                            SELECT
                                sector,
                                so_mob,
                                ROW_NUMBER() OVER(PARTITION BY sector ORDER BY so_mob) AS rank
                            FROM
                                \`modified-glyph-416314.demp_dev_master.demp_core\`
                        )
                    WHERE
                        rank = 1
                ) AS sub
            ON
                main.assembly = sub.sector`;

      // If assembly parameter is provided and not 'all', add condition for specific sector
      if (assembly && assembly !== "all") {
        baseQuery += ` WHERE main.assembly = '${assembly}'`;
      }
      // Execute the query
      const rows = await bigqueryService.executeQuery(baseQuery);

      // Return the result
      res.status(200).json({ status: "success", data: rows });
    } else {
      res.json({ status: "failed" });
    }
  } catch (error) {
    console.error("Error fetching pre-poll status:", error);
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
});

// Endpoint to get pre-poll status
router.get("/get_pre_poll_booths", async (req, res) => {
  const token = req.query.token;
  try {
    const valid = await otpService.checkToken(token);
    if (valid) {
      // Get the sector parameter from the request query
      const sector = req.query.assembly;
      const evm_clear = req.query.evm_clear;
      console.log(evm_clear);
      // Construct the base query to get pre-poll status
      let baseQuery = `
            SELECT
                main.*,
                sub.blo_mob as so_mob
            FROM
                (
                    SELECT
                        sector as assembly,
                        booth_name,
                        booth_no,
                        evm_clear  AS evm_clear,
                        mockpoll as  mock_poll,
                        poll_start  as poll_start
                    FROM
                        \`modified-glyph-416314.demp_dev_master.demp_core\`
                    WHERE
                        sector = '${sector}' 
                ) AS main
            LEFT JOIN
                (
                    SELECT
                        *
                    FROM
                        (
                            SELECT
                                sector,
                                blo_mob,
                                ROW_NUMBER() OVER(PARTITION BY sector ORDER BY blo_mob) AS rank
                            FROM
                                \`modified-glyph-416314.demp_dev_master.demp_core\` 
                        )
                    WHERE
                        rank = 1
                ) AS sub
            ON
                main.assembly = sub.sector`;

      if (evm_clear != "all") {
        baseQuery += ` where main.evm_clear = '${evm_clear}' order by main.booth_no`;
      } else {
        baseQuery += `  order by main.booth_no`;
      }
      // Execute the query
      console.log(baseQuery);
      const rows = await bigqueryService.executeQuery(baseQuery);

      // Return the result
      res.status(200).json({ status: "success", data: rows });
    } else {
      res.json({ status: "failed" });
    }
  } catch (error) {
    console.error("Error fetching pre-poll status:", error);
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
});

// Endpoint to get pre-poll status for a single booth
router.get("/get_pre_poll_status_booth", async (req, res) => {
  const token = req.query.token;
  try {
    const valid = await otpService.checkToken(token);
    if (valid) {
      // Get the assembly and booth number parameters from the request query
      const assembly = req.query.assembly;
      const boothNumber = req.query.booth;

      // Construct the base query to get pre-poll status for a single booth
      let baseQuery = `
            SELECT
                main.*,
                sub.blo_mob as so_mob
            FROM
                (
                    SELECT
                        sector as assembly,
                        booth_name,
                        booth_no,
                        evm_clear  AS evm_clear,
                        mockpoll as  mock_poll,
                        poll_start  as poll_start
                    FROM
                        \`modified-glyph-416314.demp_dev_master.demp_core\`
                    WHERE
                        sector = '${assembly}' AND
                        booth_no = '${boothNumber}'
                ) AS main
            LEFT JOIN
                (
                    SELECT
                        *
                    FROM
                        (
                            SELECT
                                sector,
                                blo_mob,
                                ROW_NUMBER() OVER(PARTITION BY sector ORDER BY blo_mob) AS rank
                            FROM
                                \`modified-glyph-416314.demp_dev_master.demp_core\`
                        )
                    WHERE
                        rank = 1
                ) AS sub
            ON
                main.assembly = sub.sector`;

      // Execute the query
      console.log(baseQuery);
      const rows = await bigqueryService.executeQuery(baseQuery);
      console.log(rows);
      // Return the result
      res.status(200).json({ status: "success", data: rows[0] });
    } else {
      res.json({ status: "failed" });
    }
  } catch (error) {
    console.error("Error fetching pre-poll status for booth:", error);
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
});

router.put("/update_evm_clear", async (req, res) => {
  const token = req.query.token;
  try {
    const valid = await otpService.checkToken(token);
    if (valid) {
      // Get the sector and booth number parameters from the request body
      const { sector, boothNumber, value } = req.body;

      // Construct the update query
      const updateQuery = `
            UPDATE
                \`modified-glyph-416314.demp_dev_master.demp_core\`
            SET
                evm_clear = '${value}'
            WHERE
                sector = '${sector}' AND
                booth_no = '${boothNumber}'`;

      // Execute the update query
      await bigqueryService.executeQuery(updateQuery);

      // Return success response
      res.status(200).json({
        status: "success",
        message: "evm_clear updated to YES successfully",
      });
    } else {
      res.json({ status: "failed" });
    }
  } catch (error) {
    console.error("Error updating evm_clear:", error);
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
});

router.put("/update_mockpoll", async (req, res) => {
  const token = req.query.token;
  try {
    const valid = await otpService.checkToken(token);
    if (valid) {
      // Get the sector and booth number parameters from the request body
      const { sector, boothNumber, value } = req.body;

      // Construct the update query
      const updateQuery = `
            UPDATE
                \`modified-glyph-416314.demp_dev_master.demp_core\`
            SET
                mockpoll = '${value}'
            WHERE
                sector = '${sector}' AND
                booth_no = '${boothNumber}'`;

      // Execute the update query
      await bigqueryService.executeQuery(updateQuery);

      // Return success response
      res.status(200).json({
        status: "success",
        message: "mockpoll updated to YES successfully",
      });
    } else {
      res.json({ status: "failed" });
    }
  } catch (error) {
    console.error("Error updating mockpoll:", error);
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
});

router.put("/update_poll_start", async (req, res) => {
  const token = req.query.token;
  try {
    const valid = await otpService.checkToken(token);
    if (valid) {
      // Get the sector and booth number parameters from the request body
      const { sector, boothNumber, value } = req.body;

      // Construct the update query
      const updateQuery = `
            UPDATE
                \`modified-glyph-416314.demp_dev_master.demp_core\`
            SET
                poll_start = '${value}'
            WHERE
                sector = '${sector}' AND
                booth_no = '${boothNumber}'`;

      // Execute the update query
      await bigqueryService.executeQuery(updateQuery);

      // Return success response
      res.status(200).json({
        status: "success",
        message: "poll_start updated to YES successfully",
      });
    } else {
      res.json({ status: "failed" });
    }
  } catch (error) {
    console.error("Error updating poll_start:", error);
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
});

router.put("/post_time_based_report", async (req, res) => {
  const token = req.query.token;
  try {
    const valid = await otpService.checkToken(token);
    if (valid) {
      // Get the parameters from the request body
      const {
        sector,
        boothNumber,
        timeKey,
        maleVotes,
        femaleVotes,
        transVotes,
        totalVotes,
      } = req.body;

      // Construct the update query
      const updateQuery = `
              UPDATE
                  \`modified-glyph-416314.demp_dev_master.demp_time_core\`
              SET
                  male_votes = ${maleVotes},
                  female_votes = ${femaleVotes},
                  trans_votes = ${transVotes},
                  total_votes = ${totalVotes}
              WHERE
                  sector = '${sector}' AND
                  booth_no = '${boothNumber}' AND
                  time_key = ${timeKey}`;

      updateQuery2 = `
              UPDATE
                  \`modified-glyph-416314.demp_dev_master.demp_core\`
              SET
                  male_votes = ${maleVotes},
                  female_votes = ${femaleVotes},
                  trans_votes = ${transVotes},
                  total_votes = ${totalVotes}
              WHERE
                  sector = '${sector}' AND
                  booth_no = '${boothNumber}'`;

      //console.log(updateQuery)

      // Execute the update query
      await bigqueryService.executeQuery(updateQuery);
      await bigqueryService.executeQuery(updateQuery2);
      // Return success response
      res
        .status(200)
        .json({ status: "success", message: "Poll data updated successfully" });
    } else {
      res.json({ status: "failed" });
    }
  } catch (error) {
    console.error("Error updating poll data:", error);
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
});
module.exports = router;

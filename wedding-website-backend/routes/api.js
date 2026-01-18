var express = require("express");
var router = express.Router();
const { body, validationResult } = require("express-validator");
const pool = require("../config/database");

// RSVP endpoint - Save to PostgreSQL
router.post(
  "/rsvps",
  [
    body("name").trim().notEmpty().withMessage("Name is required"),
    body("attending")
      .isIn(["yes", "no"])
      .withMessage("Attending must be 'yes' or 'no'")
      .toLowerCase(),
  ],
  async function (req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { name, attending } = req.body;

    try {
      const rsvpStatus = attending === "yes" ? "attending" : "not_attending";
      const query = `
        INSERT INTO guests (name, rsvp_status, updated_at)
        VALUES ($1, $2, CURRENT_TIMESTAMP)
        RETURNING *
      `;
      const result = await pool.query(query, [name, rsvpStatus]);
      res.json({
        success: true,
        message: "RSVP received successfully",
        data: result.rows[0],
      });
    } catch (error) {
      console.error("Error saving RSVP:", error);
      res.status(500).json({
        success: false,
        message: "Failed to save RSVP",
        error: error.message,
      });
    }
  },
);

// Get all RSVPs (for admin use)
router.get("/rsvps", async function (req, res, next) {
  try {
    const query = "SELECT * FROM guests ORDER BY created_at DESC";
    const result = await pool.query(query);

    res.json({
      success: true,
      data: result.rows,
    });
  } catch (error) {
    console.error("Error fetching RSVPs:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch RSVPs",
      error: error.message,
    });
  }
});

module.exports = router;

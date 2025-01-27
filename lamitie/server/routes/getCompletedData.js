
const express = require("express");
const { google } = require("googleapis");
const router = express.Router();

// Load service account credentials
const credentials = require("../config/google-sheets.json");

// Google Sheets API Setup
const client = new google.auth.GoogleAuth({
  credentials,
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

const sheets = google.sheets({ version: "v4", auth: client });

// Replace with your Google Sheet ID
const SPREADSHEET_ID = "11H05cDTAQNu0La1TNIfdiErvNYqARw5m_KLhPaGObaU";
const SHEET_NAME = "Sheet1";

// Route to get completed data from the Google Sheet
router.get("/getCompletedData", async (req, res) => {
  try {
    // Fetch data from Google Sheets
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: `${SHEET_NAME}!A:G`, // Get all the columns from the sheet
    });

    // Process the data and structure it for the frontend
    const rows = response.data.values.slice(1).map((row) => ({
      timestamp: row[0],
      title: row[1],
      name: row[2],
      index: row[3],
      contact: row[4],
      email: row[5],
      combination: row[6],
    }));

    // Send the data as JSON
    res.status(200).json(rows);
  } catch (error) {
    console.error("Error fetching completed data:", error);
    res.status(500).send({ error: "Failed to fetch data" });
  }
});

module.exports = router;

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

// Route to save registration data
router.post("/", async (req, res) => {
  const { title, name, index, contact, email, combination } = req.body;

  try {
    const timestamp = new Date().toISOString();
    const values = [[timestamp, title, name, index, contact, email, combination]];

    // Append data to the sheet
    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: `${SHEET_NAME}!A:G`,
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values,
      },
    });

    res.status(200).send({ message: "Registration data saved successfully!" });
  } catch (error) {
    console.error("Error details:", error); 
    res.status(500).send({ error: "Failed to save data" });
  }
});

module.exports = router;

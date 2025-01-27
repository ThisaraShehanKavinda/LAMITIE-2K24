const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const registerRoute = require("./routes/register");

const app = express();
const PORT = 5000;


// Import the completed data route
const completedDataRoute = require("./routes/getCompletedData");
// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/api/register", registerRoute);

// Use the completed data route
app.use("/api", completedDataRoute);


// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

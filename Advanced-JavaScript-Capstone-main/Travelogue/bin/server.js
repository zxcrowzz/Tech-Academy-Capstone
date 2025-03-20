const express = require("express");
const cors = require("cors");
const path = require("path");
const dotenv = require("dotenv").config();


const app = express();
const port = process.env.PORT || 5000;

// ✅ Connect to MongoDB using Mongoose


// ✅ GLOBAL MIDDLEWARE (Move before routes)
app.use(express.json()); // Parse JSON requests
app.use(cors()); // Allow cross-origin requests

// ✅ Serve Angular app from `dist` directory
const distPath = path.join(__dirname, "..", "www", "Miami", "public");
console.log("📂 Serving assets from:", distPath);

app.use(express.static(distPath));

// ✅ Import API Routes
const routes = require("../www/Miami/routes");
app.use("/api", routes); // Mount API routes under `/api`


const assetsPath = path.join(__dirname, "..", "assets");
console.log("📂 Serving assets from:", assetsPath);

app.use("/assets", express.static(assetsPath)); // Serve assets at '/assets' route





// ✅ Start the server
app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});

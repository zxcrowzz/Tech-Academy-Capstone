the main project is located in master! 

project summary: 

Story1 


For user story #1 I was tasked with Planning the front end component layout using angular, with the goal of transitioning to mongodb to source the page content. Utilizing as much bootstrap as possible to save time.



Some of the code I used for attractions of places within my city include : 

<div class="container">
  <h2>Top Attractions</h2>
  <div class="row">
    <div class="col-md-3" *ngFor="let attraction of attractions"> <!-- Use col-md-3 for 4 items per row -->
      <div class="card">
        <img [src]="attraction.image" class="card-img-top" alt="Attraction">
        <div class="card-body">
          <h5 class="card-title">{{ attraction.name }}</h5>
          <p class="card-text">{{ attraction.description }}</p>
        </div>
      </div>
    </div>
  </div>
</div>
 
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-attractions',
  templateUrl: './attractions.component.html',
  styleUrls: ['./attractions.component.css'],
  imports: [CommonModule]
})
export class AttractionsComponent {
  attractions = [
    { name: "Art Deco District", image: "/assets/art-deco.jpg", description: "Famous for pastel buildings and neon lights." },
    { name: "Vizcaya Museum", image: "/assets/vizcaya.jpg", description: "A beautiful historic estate with gardens." },
    { name: "Little Havana", image: "/assets/little-havana.jpg", description: "Experience Cuban culture, food, and music." },
    { name: "South Beach", image: "/assets/south-beach.jpg", description: "Iconic beach with lively nightlife and clear waters." },
    { name: "Wynwood Walls", image: "/assets/wynwood.jpg", description: "Outdoor museum showcasing vibrant street art." },
    { name: "Miami Seaquarium", image: "/assets/seaquarium.jpg", description: "Marine life exhibits and shows with dolphins and sea lions." },
    { name: "Bayfront Park", image: "/assets/bayfront-park.jpg", description: "A waterfront park with beautiful views and recreational spaces." },
    { name: "Miami Zoo", image: "/assets/miami-zoo.jpg", description: "One of the largest zoos in the U.S. with diverse animal species." },
  
  ];
  
}




Story2


For user story #2 I was tasked with creating and connecting to a mongo db cluster. Here is exactly how I did this. 

I ran into a problem , that problem was how to run the server and the client at the same time, so I downloaded concurrently , this allows me to run client and server at the same time, 


"scripts": {
  "start": "concurrently \"npm run server\" \"npm run client\"",
  "server": "node ./bin/server.js",
  "client": "cd www/Miami/Miami-ang-dev && npx ng serve --open"

},




if I am in the correct directory "\Advanced-JavaScript-Capstone-main\Travelogue>"  both with run after running "npm start" 



server code: 


const express = require('express');
const cors = require('cors');
const app = express();
const path = require('path');
const dotenv = require('dotenv').config(); // Load environment variables
const mongoose = require('mongoose'); // Import mongoose
const port = process.env.PORT || 4200;
const routes = require('../www/Miami/routes'); // Adjusted relative path to routes.js

// Connect to MongoDB using Mongoose
mongoose.connect(process.env.MONGODB_STRING, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Successfully connected to MongoDB');
  })
  .catch(err => {
    console.error('Error connecting to MongoDB:', err);
  });

// GLOBAL MIDDLEWARE (Move before routes)
app.use(express.json());
app.use(cors());

// Serve Angular app from `dist` directory
const distPath = path.join(__dirname, '..', 'www', 'Miami', 'public');
console.log('Serving assets from:', distPath);

app.use(express.static(distPath));

// Use routes
app.use('/api', routes);

// Handle Angular routes (Ensure this is below static middleware)
app.get('*', (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
});

// Start the server
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});


Story3 

In user story3 I was tasked with creating a mongoose schema. I was also tasked with writing API methods to alter data in mongoose.

my schema: 

const mongoose = require("mongoose");

const DataSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String },  // Optional image link
  location: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const DataModel = mongoose.model("Data", DataSchema);
module.exports = DataModel;




my routes: 


const express = require("express");
const router = express.Router();
const DataModel = require("../../models/DataModel");

// 📌 CREATE: Add a new entry
router.post("/data", async (req, res) => {
  try {
    const newData = new DataModel(req.body);
    await newData.save();
    res.status(201).json(newData);
  } catch (error) {
    res.status(500).json({ error: "Error creating data" });
  }
});

// 📌 READ: Get all records
router.get("/data", async (req, res) => {
  try {
    const data = await DataModel.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Error fetching data" });
  }
});

// 📌 READ: Get one record by ID
router.get("/data/:id", async (req, res) => {
  try {
    const data = await DataModel.findById(req.params.id);
    if (!data) return res.status(404).json({ error: "Data not found" });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Error fetching data" });
  }
});

// 📌 UPDATE: Modify a record by ID
router.put("/data/:id", async (req, res) => {
  try {
    const updatedData = await DataModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedData) return res.status(404).json({ error: "Data not found" });
    res.json(updatedData);
  } catch (error) {
    res.status(500).json({ error: "Error updating data" });
  }
});

// 📌 DELETE: Remove a record by ID
router.delete("/data/:id", async (req, res) => {
  try {
    const deletedData = await DataModel.findByIdAndDelete(req.params.id);
    if (!deletedData) return res.status(404).json({ error: "Data not found" });
    res.json({ message: "Data deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting data" });
  }
});

module.exports = router;

 

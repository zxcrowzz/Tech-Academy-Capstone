const express = require("express");
const router = express.Router();
const DataModel = require("../../models/DataModel");

const mongoose = require("mongoose");
const defaultAttractions = [
    { 
      title: "Art Deco District", // added title
      imageUrl: "/assets/art-deco.jpg", 
      description: "Famous for pastel buildings and neon lights.", 
      location: "Miami"
    },
    { 
      title: "Vizcaya Museum", // added title
      imageUrl: "/assets/vizcaya.jpg", 
      description: "A beautiful historic estate with gardens.", 
      location: "Miami"
    },
    { 
      title: "Little Havana", // added title
      imageUrl: "/assets/little-havana.jpg", 
      description: "Experience Cuban culture, food, and music.", 
      location: "Miami"
    },
    { 
      title: "South Beach", // added title
      imageUrl: "/assets/south-beach.jpg", 
      description: "Iconic beach with lively nightlife and clear waters.", 
      location: "Miami"
    },
    { 
      title: "Wynwood Walls", // added title
      imageUrl: "/assets/wynwood.jpg", 
      description: "Outdoor museum showcasing vibrant street art.", 
      location: "Miami"
    },
    { 
      title: "Miami Seaquarium", // added title
      imageUrl: "/assets/seaquarium.jpg", 
      description: "Marine life exhibits and shows with dolphins and sea lions.", 
      location: "Miami"
    },
    { 
      title: "Bayfront Park", // added title
      imageUrl: "/assets/bayfront-park.jpg", 
      description: "A waterfront park with beautiful views and recreational spaces.", 
      location: "Miami"
    },
    { 
      title: "Miami Zoo", // added title
      imageUrl: "/assets/miami-zoo.jpg", 
      description: "One of the largest zoos in the U.S. with diverse animal species.", 
      location: "Miami"
    }
];

  
mongoose
  .connect(process.env.MONGODB_STRING, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ Successfully connected to MongoDB"))
  .catch((err) => console.error("❌ Error connecting to MongoDB:", err));

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




async function initializeData() {
    try {
      // Check if there's any data in the collection
      const count = await DataModel.countDocuments();
      if (count === 0) {
        // Insert default attractions if no data exists
        await DataModel.insertMany(defaultAttractions);
        console.log("Default attractions inserted into the database.");
      } else {
        console.log("Data already exists, skipping insertion.");
      }
    } catch (error) {
      console.error("Error inserting default data:", error);
    }
  }
  initializeData();
module.exports = router;

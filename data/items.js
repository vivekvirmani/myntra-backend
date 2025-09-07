const express = require("express");
const cors = require("cors");
const { getStoredItems, storeItems } = require("./item");

const app = express();

// ✅ Enable CORS
app.use(cors({
  origin: "https://melodious-sunshine-423362.netlify.app", // Your Netlify frontend URL
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());

// Example GET route
app.get("/items", async (req, res) => {
  const items = await getStoredItems();
  res.json({ items });
});

// Example POST route
app.post("/items", async (req, res) => {
  const items = req.body.items;
  await storeItems(items);
  res.status(201).json({ message: "Items stored!" });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const express = require("express");
const cors = require("cors");
const db = require("./db/database");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

app.get("/profile", (req, res) => {
  db.get("SELECT * FROM profile LIMIT 1", (err, profile) => {
    if (err) {
      return res.status(500).json({ error: "Database error" });
    }
    res.json(profile);
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

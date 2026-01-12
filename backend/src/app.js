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
      console.error("Profile error:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json(profile);
  });
});

app.get("/projects", (req, res) => {
  const { skill } = req.query;

  if (!skill) {
    return res.status(400).json({ error: "Skill query parameter is required" });
  }

  const query = `
    SELECT p.id, p.title, p.description, p.link
    FROM projects p
    JOIN project_skills ps ON p.id = ps.project_id
    JOIN skills s ON ps.skill_id = s.id
    WHERE LOWER(s.name) = LOWER(?)
  `;

  db.all(query, [skill], (err, rows) => {
    if (err) {
      console.error("Projects error:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json(rows);
  });
});

app.get("/skills/top", (req, res) => {
  const query = `
    SELECT s.name, COUNT(ps.project_id) as usage_count
    FROM skills s
    LEFT JOIN project_skills ps ON s.id = ps.skill_id
    GROUP BY s.id
    ORDER BY usage_count DESC
  `;

  db.all(query, [], (err, rows) => {
    if (err) {
      console.error("Skills error:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json(rows);
  });
});

app.get("/search", (req, res) => {
  const { q } = req.query;

  if (!q) {
    return res.status(400).json({ error: "Search query is required" });
  }

  const likeQuery = `%${q}%`;

  db.all(
    `SELECT * FROM projects WHERE title LIKE ? OR description LIKE ?`,
    [likeQuery, likeQuery],
    (err, projects) => {
      if (err) {
        console.error("Search error:", err);
        return res.status(500).json({ error: "Database error" });
      }

      db.all(
        `SELECT * FROM skills WHERE name LIKE ?`,
        [likeQuery],
        (err, skills) => {
          if (err) {
            console.error("Search error:", err);
            return res.status(500).json({ error: "Database error" });
          }

          res.json({ projects, skills });
        }
      );
    }
  );
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

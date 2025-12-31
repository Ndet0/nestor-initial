// 1️⃣ Imports
import express from "express";
import sqlite3 from "sqlite3";
import cors from "cors";

// 2️⃣ App setup
const app = express();
app.use(cors());
app.use(express.json());

// 3️⃣ Database connection
const db = new sqlite3.Database("./nestor.db", (err) => {
  if (err) console.error("DB error:", err);
  else console.log("Connected to SQLite database");
});

// 4️⃣ Create table (safe to keep)
db.run(`
CREATE TABLE IF NOT EXISTS places (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  location TEXT NOT NULL,
  county TEXT NOT NULL,
  price INTEGER DEFAULT 0,
  category TEXT,
  description TEXT,
  highlights TEXT,
  openingHours TEXT,
  bestTimeToVisit TEXT,
  difficulty TEXT,
  duration TEXT,
  facilities TEXT,
  phone TEXT,
  email TEXT,
  images TEXT,
  featured INTEGER DEFAULT 0,
  rating REAL DEFAULT 0,
  reviewCount INTEGER DEFAULT 0
)
`);

// 5️⃣ CREATE place
app.post("/api/places", (req, res) => {
  const p = req.body;

  const stmt = `
    INSERT INTO places (
      name, location, county, price, category, description,
      highlights, openingHours, bestTimeToVisit, difficulty,
      duration, facilities, phone, email, images, featured
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.run(
    stmt,
    [
      p.name,
      p.location,
      p.county,
      p.price || 0,
      p.category,
      p.description,
      JSON.stringify(p.highlights || []),
      p.openingHours,
      p.bestTimeToVisit,
      p.difficulty,
      p.duration,
      JSON.stringify(p.facilities || []),
      p.contact?.phone || "",
      p.contact?.email || "",
      JSON.stringify(p.images || []),
      p.featured ? 1 : 0
    ],
    function (err) {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Failed to save place" });
      }
      res.json({ success: true, id: this.lastID });
    }
  );
});

// 6️⃣ GET all places
app.get("/api/places", (req, res) => {
  db.all("SELECT * FROM places ORDER BY id DESC", (err, rows) => {
    if (err) return res.status(500).json(err);

    const parsed = rows.map(p => ({
      ...p,
      images: JSON.parse(p.images || "[]"),
      highlights: JSON.parse(p.highlights || "[]"),
      facilities: JSON.parse(p.facilities || "[]"),
      featured: Boolean(p.featured)
    }));

    res.json(parsed);
  });
});

// 7️⃣ Start server
app.listen(4000, () => {
  console.log("API running on http://localhost:4000");
});

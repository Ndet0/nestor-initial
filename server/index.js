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

  // Validate required fields
  const required = ["name", "location", "county"];
  const missing = required.filter(field => !p[field] || !p[field].trim());
  if (missing.length > 0) {
    return res.status(400).json({
      error: "Missing required fields",
      fields: missing
    });
  }

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
      p.name.trim(),
      p.location.trim(),
      p.county.trim(),
      p.price || 0,
      p.category || null,
      p.description || null,
      JSON.stringify(p.highlights || []),
      p.openingHours || null,
      p.bestTimeToVisit || null,
      p.difficulty || null,
      p.duration || null,
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

// Helper for safe JSON parsing
function safeJsonParse(str, fallback = []) {
  try {
    return JSON.parse(str || JSON.stringify(fallback));
  } catch {
    return fallback;
  }
}

// 6️⃣ GET all places
app.get("/api/places", (req, res) => {
  db.all("SELECT * FROM places ORDER BY id DESC", (err, rows) => {
    if (err) return res.status(500).json({ error: "Database error" });

    const parsed = rows.map(p => ({
      ...p,
      images: safeJsonParse(p.images, []),
      highlights: safeJsonParse(p.highlights, []),
      facilities: safeJsonParse(p.facilities, []),
      featured: Boolean(p.featured)
    }));

    res.json(parsed);
  });
});

// 6.5️⃣ GET single place by ID
app.get("/api/places/:id", (req, res) => {
  const { id } = req.params;

  db.get("SELECT * FROM places WHERE id = ?", [id], (err, row) => {
    if (err) return res.status(500).json({ error: "Database error" });
    if (!row) return res.status(404).json({ error: "Place not found" });

    const parsed = {
      ...row,
      images: safeJsonParse(row.images, []),
      highlights: safeJsonParse(row.highlights, []),
      facilities: safeJsonParse(row.facilities, []),
      featured: Boolean(row.featured)
    };

    res.json(parsed);
  });
});

// 6.6️⃣ DELETE place by ID
app.delete("/api/places/:id", (req, res) => {
  const { id } = req.params;

  db.run("DELETE FROM places WHERE id = ?", [id], function (err) {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Failed to delete place" });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: "Place not found" });
    }
    res.json({ success: true, deleted: id });
  });
});

// 6.7️⃣ UPDATE place by ID
app.put("/api/places/:id", (req, res) => {
  const { id } = req.params;
  const p = req.body;

  // Check if place exists
  db.get("SELECT id FROM places WHERE id = ?", [id], (err, row) => {
    if (err) return res.status(500).json({ error: "Database error" });
    if (!row) return res.status(404).json({ error: "Place not found" });

    // Validate required fields if provided (partial updates allowed)
    const required = ["name", "location", "county"];
    const invalid = required.filter(field =>
      p[field] !== undefined && (!p[field] || !p[field].trim())
    );
    if (invalid.length > 0) {
      return res.status(400).json({ error: "Invalid required fields", fields: invalid });
    }

    // Build dynamic update
    const updates = [];
    const values = [];
    const fields = {
      name: p.name?.trim(),
      location: p.location?.trim(),
      county: p.county?.trim(),
      price: p.price,
      category: p.category,
      description: p.description,
      highlights: p.highlights ? JSON.stringify(p.highlights) : undefined,
      openingHours: p.openingHours,
      bestTimeToVisit: p.bestTimeToVisit,
      difficulty: p.difficulty,
      duration: p.duration,
      facilities: p.facilities ? JSON.stringify(p.facilities) : undefined,
      phone: p.contact?.phone ?? p.phone,
      email: p.contact?.email ?? p.email,
      images: p.images ? JSON.stringify(p.images) : undefined,
      featured: p.featured !== undefined ? (p.featured ? 1 : 0) : undefined
    };

    for (const [key, value] of Object.entries(fields)) {
      if (value !== undefined) {
        updates.push(`${key} = ?`);
        values.push(value);
      }
    }

    if (updates.length === 0) {
      return res.status(400).json({ error: "No fields to update" });
    }

    values.push(id);
    db.run(`UPDATE places SET ${updates.join(", ")} WHERE id = ?`, values, function(err) {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Failed to update place" });
      }
      res.json({ success: true, id: Number(id) });
    });
  });
});

// 7️⃣ Start server
app.listen(4000, () => {
  console.log("API running on http://localhost:4000");
});

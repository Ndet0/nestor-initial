import express from "express";
import sqlite3 from "sqlite3";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 4000;
const ALLOWED_ORIGINS = (process.env.CORS_ORIGINS || "http://localhost:5173")
  .split(",")
  .map((o) => o.trim());

app.use(
  cors({
    origin(origin, cb) {
      if (!origin || ALLOWED_ORIGINS.includes(origin)) return cb(null, true);
      cb(new Error("Not allowed by CORS"));
    },
  })
);
app.use(express.json({ limit: "1mb" }));

app.use((req, _res, next) => {
  const ts = new Date().toISOString();
  console.log(`[${ts}] ${req.method} ${req.originalUrl}`);
  next();
});

const db = new sqlite3.Database("./nestor.db", (err) => {
  if (err) console.error("DB error:", err);
  else console.log("Connected to SQLite database");
});

db.run(`
  CREATE TABLE IF NOT EXISTS places (
    id            INTEGER PRIMARY KEY AUTOINCREMENT,
    name          TEXT NOT NULL,
    location      TEXT NOT NULL,
    county        TEXT NOT NULL,
    price         INTEGER DEFAULT 0,
    category      TEXT,
    description   TEXT,
    highlights    TEXT,
    openingHours  TEXT,
    bestTimeToVisit TEXT,
    difficulty    TEXT,
    duration      TEXT,
    facilities    TEXT,
    phone         TEXT,
    email         TEXT,
    images        TEXT,
    featured      INTEGER DEFAULT 0,
    rating        REAL DEFAULT 0,
    reviewCount   INTEGER DEFAULT 0
  )
`);

function safeJsonParse(str, fallback = []) {
  try {
    return JSON.parse(str || JSON.stringify(fallback));
  } catch {
    return fallback;
  }
}

function parseRow(row) {
  return {
    ...row,
    images: safeJsonParse(row.images, []),
    highlights: safeJsonParse(row.highlights, []),
    facilities: safeJsonParse(row.facilities, []),
    featured: Boolean(row.featured),
  };
}

function sanitize(str) {
  if (typeof str !== "string") return str;
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function validateId(req, res, next) {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({ error: "Invalid place ID" });
  }
  req.placeId = id;
  next();
}

function validatePlaceBody(req, res, next) {
  const p = req.body;
  if (!p || typeof p !== "object") {
    return res.status(400).json({ error: "Request body must be JSON" });
  }

  const required = ["name", "location", "county"];
  const missing = required.filter(
    (f) => !p[f] || typeof p[f] !== "string" || !p[f].trim()
  );
  if (missing.length > 0) {
    return res.status(400).json({ error: "Missing required fields", fields: missing });
  }

  if (p.price !== undefined && (typeof p.price !== "number" || p.price < 0)) {
    const parsed = Number(p.price);
    if (isNaN(parsed) || parsed < 0) {
      return res.status(400).json({ error: "Price must be a non-negative number" });
    }
    p.price = parsed;
  }

  if (p.email && typeof p.email === "string" && p.email.trim()) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(p.email.trim())) {
      return res.status(400).json({ error: "Invalid email format" });
    }
  }

  next();
}

// ── GET all places ──────────────────────────────────────────────────────
app.get("/api/places", (_req, res, next) => {
  db.all("SELECT * FROM places ORDER BY id DESC", (err, rows) => {
    if (err) return next(err);
    res.json(rows.map(parseRow));
  });
});

// ── GET single place ────────────────────────────────────────────────────
app.get("/api/places/:id", validateId, (req, res, next) => {
  db.get("SELECT * FROM places WHERE id = ?", [req.placeId], (err, row) => {
    if (err) return next(err);
    if (!row) return res.status(404).json({ error: "Place not found" });
    res.json(parseRow(row));
  });
});

// ── CREATE place ────────────────────────────────────────────────────────
app.post("/api/places", validatePlaceBody, (req, res, next) => {
  const p = req.body;

  const stmt = `
    INSERT INTO places (
      name, location, county, price, category, description,
      highlights, openingHours, bestTimeToVisit, difficulty,
      duration, facilities, phone, email, images, featured
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const phone = p.contact?.phone || p.phone || "";
  const email = p.contact?.email || p.email || "";

  db.run(
    stmt,
    [
      sanitize(p.name.trim()),
      sanitize(p.location.trim()),
      sanitize(p.county.trim()),
      Number(p.price) || 0,
      sanitize(p.category?.trim() || null),
      sanitize(p.description?.trim() || null),
      JSON.stringify((p.highlights || []).map(sanitize)),
      sanitize(p.openingHours?.trim() || null),
      sanitize(p.bestTimeToVisit?.trim() || null),
      sanitize(p.difficulty?.trim() || null),
      sanitize(p.duration?.trim() || null),
      JSON.stringify((p.facilities || []).map(sanitize)),
      sanitize(phone.trim()),
      sanitize(email.trim()),
      JSON.stringify(p.images || []),
      p.featured ? 1 : 0,
    ],
    function (err) {
      if (err) return next(err);
      res.status(201).json({ success: true, id: this.lastID });
    }
  );
});

// ── UPDATE place ────────────────────────────────────────────────────────
app.put("/api/places/:id", validateId, (req, res, next) => {
  const p = req.body;

  db.get("SELECT id FROM places WHERE id = ?", [req.placeId], (err, row) => {
    if (err) return next(err);
    if (!row) return res.status(404).json({ error: "Place not found" });

    const required = ["name", "location", "county"];
    const invalid = required.filter(
      (f) => p[f] !== undefined && (!p[f] || typeof p[f] !== "string" || !p[f].trim())
    );
    if (invalid.length > 0) {
      return res
        .status(400)
        .json({ error: "Invalid required fields", fields: invalid });
    }

    const updates = [];
    const values = [];
    const fields = {
      name: p.name ? sanitize(p.name.trim()) : undefined,
      location: p.location ? sanitize(p.location.trim()) : undefined,
      county: p.county ? sanitize(p.county.trim()) : undefined,
      price: p.price !== undefined ? Number(p.price) || 0 : undefined,
      category: p.category ? sanitize(p.category.trim()) : undefined,
      description: p.description ? sanitize(p.description.trim()) : undefined,
      highlights: p.highlights
        ? JSON.stringify(p.highlights.map(sanitize))
        : undefined,
      openingHours: p.openingHours ? sanitize(p.openingHours.trim()) : undefined,
      bestTimeToVisit: p.bestTimeToVisit
        ? sanitize(p.bestTimeToVisit.trim())
        : undefined,
      difficulty: p.difficulty ? sanitize(p.difficulty.trim()) : undefined,
      duration: p.duration ? sanitize(p.duration.trim()) : undefined,
      facilities: p.facilities
        ? JSON.stringify(p.facilities.map(sanitize))
        : undefined,
      phone: sanitize((p.contact?.phone ?? p.phone)?.trim?.()) || undefined,
      email: sanitize((p.contact?.email ?? p.email)?.trim?.()) || undefined,
      images: p.images ? JSON.stringify(p.images) : undefined,
      featured: p.featured !== undefined ? (p.featured ? 1 : 0) : undefined,
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

    values.push(req.placeId);
    db.run(
      `UPDATE places SET ${updates.join(", ")} WHERE id = ?`,
      values,
      function (err) {
        if (err) return next(err);
        res.json({ success: true, id: req.placeId });
      }
    );
  });
});

// ── DELETE place ─────────────────────────────────────────────────────────
app.delete("/api/places/:id", validateId, (req, res, next) => {
  db.run(
    "DELETE FROM places WHERE id = ?",
    [req.placeId],
    function (err) {
      if (err) return next(err);
      if (this.changes === 0) {
        return res.status(404).json({ error: "Place not found" });
      }
      res.json({ success: true, deleted: req.placeId });
    }
  );
});

// ── Global error handler ────────────────────────────────────────────────
app.use((err, _req, res, _next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ error: "Internal server error" });
});

// ── Start server with graceful shutdown ─────────────────────────────────
const server = app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
});

function shutdown() {
  console.log("\nShutting down…");
  server.close(() => {
    db.close((err) => {
      if (err) console.error("Error closing DB:", err);
      process.exit(0);
    });
  });
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

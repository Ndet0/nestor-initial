import sqlite3 from "sqlite3";

const db = new sqlite3.Database("./nestor.db");

const place = {
  name: "Hell’s Gate",
  location: "Naivasha",
  county: "Nakuru",
  price: 300,
  category: "Adventure",
  description: "Gorges, cycling & geothermal activity",
  highlights: ["Gorge walk", "Cycling"],
  openingHours: "6 AM - 6 PM",
  bestTimeToVisit: "Morning",
  difficulty: "Moderate",
  duration: "4-6 hours",
  facilities: ["Parking", "Guides"],
  phone: "+254722222222",
  email: "info@hellsgate.ke",
  images: ["https://example.com/hellsgate.jpg"],
  featured: 1
};

db.run(
  `
  INSERT INTO places (
    name, location, county, price, category, description,
    highlights, openingHours, bestTimeToVisit, difficulty,
    duration, facilities, phone, email, images, featured
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `,
  [
    place.name,
    place.location,
    place.county,
    place.price,
    place.category,
    place.description,
    JSON.stringify(place.highlights),
    place.openingHours,
    place.bestTimeToVisit,
    place.difficulty,
    place.duration,
    JSON.stringify(place.facilities),
    place.phone,
    place.email,
    JSON.stringify(place.images),
    place.featured
  ],
  function (err) {
    if (err) console.error(err);
    else console.log("Inserted with ID:", this.lastID);
    db.close();
  }
);

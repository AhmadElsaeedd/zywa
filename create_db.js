const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./card_status.db');

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS Cards (
    card_id TEXT PRIMARY KEY,
    user_contact TEXT
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS Status (
    id TEXT PRIMARY KEY,
    card_id TEXT,
    status TEXT,
    timestamp TEXT,
    comment TEXT,
    FOREIGN KEY (card_id) REFERENCES Cards(card_id)
  )`);
});

module.exports = db;

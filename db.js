// db.js — SQLite database setup for subscribers

const Database = require('better-sqlite3');
const path = require('path');

// Allow overriding the DB location via environment variable (vital for Render Disks)
const dbPath = process.env.DB_PATH || path.join(__dirname, 'subscribers.db');
const db = new Database(dbPath);

db.exec(`
  CREATE TABLE IF NOT EXISTS subscribers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    phone TEXT UNIQUE NOT NULL,
    nickname TEXT NOT NULL,
    personality TEXT NOT NULL,
    active INTEGER DEFAULT 1,
    created_at TEXT DEFAULT (datetime('now')),
    last_sent TEXT
  )
`);

const Subscribers = {
  add(phone, nickname, personality) {
    return db.prepare(`
      INSERT INTO subscribers (phone, nickname, personality)
      VALUES (?, ?, ?)
      ON CONFLICT(phone) DO UPDATE SET
        nickname    = excluded.nickname,
        personality = excluded.personality,
        active      = 1
    `).run(phone, nickname, personality);
  },
  remove(phone) {
    return db.prepare(`UPDATE subscribers SET active = 0 WHERE phone = ?`).run(phone);
  },
  getActive() {
    return db.prepare(`SELECT * FROM subscribers WHERE active = 1`).all();
  },
  getByPhone(phone) {
    return db.prepare(`SELECT * FROM subscribers WHERE phone = ?`).get(phone);
  },
  updateLastSent(phone) {
    return db.prepare(`UPDATE subscribers SET last_sent = datetime('now') WHERE phone = ?`).run(phone);
  },
  count() {
    return db.prepare(`SELECT COUNT(*) as total FROM subscribers WHERE active = 1`).get().total;
  },
};

module.exports = { db, Subscribers };

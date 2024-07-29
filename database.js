// database.js
const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./library.db', (err) => {
  if (err) {
    console.error('Error opening database', err.message);
  } else {
    db.run(`CREATE TABLE IF NOT EXISTS library (
      user_id TEXT,
      book_title TEXT,
      book_authors TEXT,
      normalized_title TEXT
    )`, (err) => {
      if (err) {
        console.error('Error creating table', err.message);
      } else {
        // Add the normalized_title column if it doesn't exist
        db.run(`ALTER TABLE library ADD COLUMN normalized_title TEXT`, (err) => {
          if (err && err.message.includes('duplicate column name')) {
            console.log('Column normalized_title already exists.');
          } else if (err) {
            console.error('Error adding column:', err.message);
          } else {
            console.log('Column normalized_title added successfully.');
          }
        });
      }
    });
  }
});

// Ajoutez cette partie après la création ou la modification de la table pour normaliser les titres existants
db.serialize(() => {
  db.each(`SELECT rowid, book_title FROM library`, (err, row) => {
    if (err) {
      console.error('Error reading from database:', err.message);
    } else {
      const normalizeTitle = (str) => str.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
      const normalizedTitle = normalizeTitle(row.book_title);
      db.run(`UPDATE library SET normalized_title = ? WHERE rowid = ?`, [normalizedTitle, row.rowid], (updateErr) => {
        if (updateErr) {
          console.error('Error updating normalized_title:', updateErr.message);
        } else {
          console.log(`Updated normalized_title for book_title "${row.book_title}"`);
        }
      });
    }
  });
});

module.exports = db;

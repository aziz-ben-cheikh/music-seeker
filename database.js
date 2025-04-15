// db.js
import sqlite3 from "sqlite3"
sqlite3.verbose()

// Create a new SQLite database or open an existing one
const db = new sqlite3.Database('./Chinook.db', (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to SQLite database.');
  }
});

// Test the connection by running a simple query
db.get('SELECT 1', [], (err, row) => {
  if (err) {
    console.error('Error testing connection:', err.message);
  } else {
    console.log('Database connection is working:', row); // Should log { '1': 1 }
  }
});

export default db;
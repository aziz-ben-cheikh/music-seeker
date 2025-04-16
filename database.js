// db.js
import mysql from 'mysql2/promise';

// Create a connection pool (adjust with your own credentials)
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '12345',
  database: 'my_database',
});

// Test the connection by running a simple query
try {
  const connection = await pool.getConnection();
  const [rows] = await connection.query('SELECT 1');
  console.log('Database connection is working:', rows); // Should log [ { '1': 1 } ]
  connection.release();
} catch (err) {
  console.error('Error connecting to MySQL database:', err.message);
}

export default pool;
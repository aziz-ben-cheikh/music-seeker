import mysql from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

const testConnection = async () => {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query("SELECT 1");
    console.log("Database connection is working:", rows);
    connection.release();
  } catch (err) {
    console.error("Error connecting to MySQL database:", err.message);
  }
};


testConnection();

export default pool;

const mysql = require("mysql2/promise");
const dotenv = require("dotenv");
const fs = require("fs");
const path = require("path");

dotenv.config();

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  charset: "utf8mb4",
});

async function checkTablesExist(connection) {
  try {
    const [rows] = await connection.query(
      `SELECT table_name FROM information_schema.tables WHERE table_schema = ?`,
      [process.env.DB_NAME]
    );
    return rows.length > 0;
  } catch (err) {
    console.error("Failed to check if tables exist:", err);
    throw err;
  }
}

async function initializeDatabase() {
  try {
    const connection = await db.getConnection();

    const tablesExist = await checkTablesExist(connection);
    if (!tablesExist) {
      console.log("Tables do not exist. Initializing database...");
      const schemaPath = path.join(__dirname, "schema.sql");
      const schema = fs.readFileSync(schemaPath, "utf8");
      await connection.query(schema);
      console.log("Database initialized successfully.");
    } else {
      console.log("Tables already exist. Skipping initialization.");
    }

    connection.release();
  } catch (err) {
    console.error("Database initialization failed:", err);
  }
}

// Initialize the database
initializeDatabase();

module.exports = db;

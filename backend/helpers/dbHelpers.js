const db = require("../config/db");

async function getUserById(id) {
  const [user] = await db.query("SELECT * FROM users WHERE id = ?", [id]);
  return user;
}

module.exports = { getUserById };

const express = require("express");
const router = express.Router();
const db = require("../config/db");

// Get User Profile
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const [user] = await db.query("SELECT * FROM users WHERE id = ?", [id]);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const snippets = await db.query("SELECT * FROM snippets WHERE userId = ?", [
      id,
    ]);
    res.json({ user, snippets });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;

const express = require("express");
const router = express.Router();
const db = require("../config/db");

// Add Comment
router.post("/", async (req, res) => {
  const { snippetId: snippet_id, userId: user_id, content } = req.body;
  try {
    await db.query(
      "INSERT INTO comments (snippet_id, user_id, content) VALUES (?, ?, ?)",
      [snippet_id, user_id, content]
    );
    res.status(201).json({ message: "Comment added" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get Comments
router.get("/:snippetId", async (req, res) => {
  const { snippetId } = req.params;
  try {
    const [rows, fields] = await db.query(
      "SELECT * FROM comments WHERE snippet_id = ?",
      [snippetId]
    );

    const data = rows.map((row) => {
      return {
        ...row,
        content: row.content.toString(), // Convert buffer to string
      };
    });

    res.status(200).json({ comments: data });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;

const express = require("express");
const router = express.Router();
const db = require("../config/db");

// Create Snippet
router.post("/", async (req, res) => {
  const { title, content, language, tags, userId } = req.body;
  try {
    await db.query(
      "INSERT INTO snippets (title, content, language, tags, user_id) VALUES (?, ?, ?, ?, ?)",
      [title, content, language, tags, userId]
    );
    res.status(201).json({ message: "Snippet created successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get All Snippets
router.get("/", async (req, res) => {
  try {
    const [rows, fields] = await db.query("SELECT * FROM snippets");
    const data = rows.map((row) => {
      return {
        ...row,
        content: row.content.toString(), // Convert buffer to string
      };
    });

    res.status(200).json({ data });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get Snippets by id
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const [rows, fields] = await db.query(
      "SELECT * FROM snippets WHERE id = ?",
      [id]
    );
    const data = rows.map((row) => {
      return {
        ...row,
        content: row.content.toString(), // Convert buffer to string
      };
    });

    res.status(200).json({ data });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Update Snippet
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { title, content, language, tags } = req.body;
  try {
    await db.query(
      "UPDATE snippets SET title = ?, content = ?, language = ?, tags = ? WHERE id = ?",
      [title, content, language, tags, id]
    );
    res.json({ message: "Snippet updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Delete Snippet
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await db.query("DELETE FROM snippets WHERE id = ?", [id]);
    res.json({ message: "Snippet deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Search Snippets
router.post("/search", async (req, res) => {
  const { keyword, language, tags } = req.body;
  let query = "SELECT * FROM snippets WHERE 1=1";
  let params = [];

  if (keyword) {
    query += " AND (title LIKE ? OR content LIKE ?)";
    params.push(`%${keyword}%`, `%${keyword}%`);
  }
  if (language) {
    query += " AND language = ?";
    params.push(language);
  }
  if (tags) {
    query += " AND tags LIKE ?";
    params.push(`%${tags}%`);
  }

  try {
    const [rows, fields] = await db.query(query, params);

    const data = rows.map((row) => {
      return {
        ...row,
        content: row.content.toString(), // Convert buffer to string
      };
    });

    res.status(200).json({ data });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Upvote Snippet
router.post("/:id/upvote", async (req, res) => {
  const { id } = req.params;
  try {
    await db.query("UPDATE snippets SET upvotes = upvotes + 1 WHERE id = ?", [
      id,
    ]);
    res.json({ message: "Snippet upvoted" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Downvote Snippet
router.post("/:id/downvote", async (req, res) => {
  const { id } = req.params;
  try {
    await db.query(
      "UPDATE snippets SET downvotes = downvotes + 1 WHERE id = ?",
      [id]
    );
    res.json({ message: "Snippet downvoted" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;

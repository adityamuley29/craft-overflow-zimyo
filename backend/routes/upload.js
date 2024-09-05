const express = require("express");
const router = express.Router();
const multer = require("multer");

// file upload route
const upload = multer({ dest: "uploads/" });
router.post("/", upload.single("file"), (req, res) => {
  res.json({ file: req.file });
});

module.exports = router;

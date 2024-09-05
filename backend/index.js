const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/auth");
const snippetRoutes = require("./routes/snippets");
const commentRoutes = require("./routes/comments");
const userRoutes = require("./routes/users");
const uploadRoutes = require("./routes/upload");
const db = require("./config/db");

dotenv.config();

const app = express();

app.use(cors({ origin: "*" }));
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Routes
app.use("/api/auth", authRoutes);
app.use("/api/snippets", snippetRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/users", userRoutes);
app.use("/api/upload", uploadRoutes);

const PORT = process.env.PORT || 5000;

// Check database connection before starting the server
db.getConnection()
  .then((connection) => {
    console.log("Database connection established.");
    connection.release(); // Release the connection back to the pool

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to the database. Server not started.");
    console.error(err);
    process.exit(1); // Exit the process with an error code
  });

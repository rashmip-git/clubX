require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const clubRoutes = require("./routes/clubRoutes");
const eventRoutes = require("./routes/eventRoutes");
const registrationRoutes = require("./routes/registrationRoute");
const favRoutes = require("./routes/favoriteRoutes");
const revRoutes = require("./routes/reviewRoutes");
const certiRoutes = require("./routes/certificateRoutes");
const postRoutes = require("./routes/postRoutines");
const commentRoutes = require("./routes/commentRoutes");
const userRoutes = require("./routes/userRoutes");
const errorHandler = require("./middleware/errorHandler");

const app = express();
app.use(cors()); // allow all localhost requests
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/clubs",clubRoutes);
app.use("/api/events",eventRoutes);
app.use("/api/registration",registrationRoutes );
app.use("/api/favorites",favRoutes);
app.use("/api/rating",revRoutes);
app.use("/api/certificate",certiRoutes);
app.use("/api/posts",postRoutes);
app.use("/api/comments",commentRoutes);
app.use("/api/users", userRoutes);


app.get("/", (req, res) => {
  res.send("club API Running (Localhost)");
});


app.use(errorHandler);

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    await connectDB(process.env.MONGO_URI);
    console.log(" Database connected successfully!");
 
    app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on http://127.0.0.1:${PORT}`);
});

  } 
  catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
}

startServer();


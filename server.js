const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;


// Import routes
const authRoutes = require("./routes/Auth.router");
const userRoutes = require("./routes/User.router");
const calenderRoutes = require("./routes/CalenderEvent.router");
const courseRoutes = require("./routes/Course.router");
const courseProgress = require("./routes/CourseProgress.router");
const answerRoutes = require("./routes/Answer.router");
const enrollmentRoutes = require("./routes/Enroll.router");
const forumRoutes = require("./routes/Forum.router");
const notificationRoutes = require("./routes/Notification.router");
const announceRoutes = require("./routes/Announcement.router");
const queryRoutes = require("./routes/Query.router");
const uploadRoutes = require("./routes/Upload.router");

// Use routes
app.use("/api/auth", authRoutes);
app.use("/api/users",userRoutes);
app.use("/api/calender", calenderRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/courseProgress", courseProgress);
app.use("/api/answers", answerRoutes);
app.use("/api/enrollments", enrollmentRoutes);
app.use("/api/forum", forumRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/announcements",announceRoutes);
app.use("/api/queries", queryRoutes);
app.use("/api/upload",uploadRoutes);

// Database connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));


  app.get("/", (req, res) => {
    res.send("Welcome to LMS API");
  });
  
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
  
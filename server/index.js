const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");


// ✅ Allow CORS for all origins (Temporary fix)
app.use(cors());

// ✅ OR allow CORS for specific frontend origin
app.use(
  cors({
    origin: ["http://localhost:3000", "https://your-deployed-frontend.netlify.app"], // Add your frontend URL here
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

const adminRoutes = require("./routes/adminRoute");
const teacherRoutes = require("./routes/teacherRoute");
const studentRoutes = require("./routes/studentRoute");
const noticeRoutes = require("./routes/noticeRoute");

const PORT = 5050;

const mongoose = require("mongoose");
mongoose
  .connect(
    "mongodb+srv://shubhamuday21:CHEdine42bPRpYvl@clustertechnogiq.g1ziia6.mongodb.net/?retryWrites=true&w=majority&appName=ClusterTechnogiq"
  )
  .then(() => console.log("DB connected"))
  .catch((err) => {
    console.log(err);
  });

app.use(express.json());
app.use(express.urlencoded());

app.use("/api/admins", adminRoutes);
app.use("/api/teachers", teacherRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/notices", noticeRoutes);

app.listen(PORT, () => {
  console.log("Server Started");
});

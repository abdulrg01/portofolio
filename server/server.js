require("express-async-errors");
require("dotenv").config();
const e = require("express");
const app = e();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");
const corsOptions = require("./config/corsOptions");
const { logger, logEvents } = require("./middleware/logger");
const mongoose = require("mongoose");
const cloudinary = require("cloudinary");
const connectDB = require("./config/connectDB");
const errorHandler = require("./middleware/errorHandler");
const PORT = process.env.PORT;

console.log("development");

connectDB();

// cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_SECRET_KEY,
});

app.use(logger);

app.use(e.json({ limit: "50mb" }));
app.use(cors(corsOptions));
app.use(cookieParser());

app.use("/", e.static(path.join(__dirname, "public")));
app.use("/", require("./routes/root"));
app.use("/users", require("./routes/user"));
app.use("/hero", require("./routes/hero"));
app.use("/history", require("./routes/history"));
app.use("/projects", require("./routes/projects"));
app.use("/skills", require("./routes/skills"));
app.use("/message", require("./routes/message"));

app.all("*", (req, res) => {
  res.status(400);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ message: "404, not found" });
  } else {
    res.type("txt").send("404 not found");
  }
});

app.use(errorHandler);

mongoose.connection.once("open", () => {
  console.log("MongoDB Connected");
  app.listen(PORT, () => console.log(`Server running on PORT: ${PORT}`));
});

mongoose.connection.on("error", (err) => {
  console.log(err);
  logEvents(
    `${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`,
    "mongoErrLog.log"
  );
});

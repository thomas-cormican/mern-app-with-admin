const bodyParser = require("body-parser");
const path = require("path");
const session = require("express-session");
const mongoose = require("mongoose");
const passport = require("passport");
const cors = require("cors");
const usersRoute = require("./routes/users");
const User = require("./models/User");
const AdminBro = require("admin-bro");
const { adminBroRouter, adminBro } = require("./config/adminbro.js");

const express = require("express");

const port = process.env.PORT || 5000;
const app = express();

app.use(adminBro.options.rootPath, adminBroRouter);

// Priority serve any static files.
app.use(express.static(path.resolve(__dirname, "../client/react-ui/build")));
app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(
  session({
    secret: "session secret",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect("mongodb://localhost:27017/test", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("database connected");
});

require("./config/passport.js");

app.use("/api/users", usersRoute);

app.get("*", function (request, response) {
  response.sendFile(
    path.resolve(__dirname, "../client/react-ui/build", "index.html")
  );
});

/// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    errors: {
      message: err.message,
      error: {},
    },
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

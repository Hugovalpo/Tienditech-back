require("dotenv").config();
var express = require("express");
//const helmet = require("helmet");
const connection = require("./models/connection");

var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

//router
const indexRouter = require("./routes/index");
const articlesRouter = require("./routes/articles");
//const brandsRouter = require("./routes/brands");

var app = express();

const cors = require("cors");
app.use(cors());
//app.use(helmet());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// router prefixes
app.use("/", indexRouter);
app.use("/articles", articlesRouter);
//app.use("/brands", brandsRouter);

module.exports = app;

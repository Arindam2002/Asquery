require("dotenv").config({path: './.env'});
const cors = require("cors");
const mysql = require("mysql2");
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const cookieParser = require("cookie-parser");

const methodOverride = require("method-override");
// const { Sequelize } = require('sequelize');

// const mongoose = require("mongoose");


const app = express();

// const sequelize = new Sequelize('database', 'username', 'password', {
//   host: 'localhost',
//   dialect: 'mysql'
// });
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({
  extended : false
}));

const publicDirectory = path.join(__dirname, "./public")
app.use(express.static(publicDirectory));

app.set("view engine", "ejs");


// --------------------------------------------
// app.use(bodyParser.urlencoded({
//   extended: true
// }));
// --------------------------------------------
const db = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE,
  multipleStatements: true
});

// mysqlConnection.connect((err)=>{
//   if (!err) {
//     console.log("Connected Successfully!");
//   } else {
//     console.log(err);
//   }
// });

db.connect(function(err){
  if (!err) {
    console.log("connected Successfully");
  } else {
    console.log(err);
  }
});

app.use(methodOverride("_method"));
app.use("/", require("./routes/pages"));
app.use("/auth", require("./routes/auth"));


// app.get("/signup", function(req, res){
//   res.render("signup");
// });
//
// app.get("/login", function(req, res){
//   res.render("login");
// });
//
// app.get("/posts", function(req, res){
//   res.render("posts");
// });

// app.post("/signup", function(req, res){
//   fName: ;
// });









app.listen(3000, function(){
  console.log("Server started on port 3000.");
});

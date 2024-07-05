
require("dotenv").config;
const express = require("express");
const path  = require("path");
const bodyParser = require("body-parser");
const sessionMiddleware = require("./Middlewares/session");
const contactRoute = require("./Routes/contactRoute");
const connectDB = require("./Services/dbConn");

const app = express();
const PORT = process.env.PORT;

// Connect to Database
connectDB();

// Middlewares
sessionMiddleware(app);
app.use (bodyParser.urlencoded({extended: false}));
app.use (express.json());


// Load static folder 
app.use(express.static(path.join(__dirname, 'Upload')));

// Set view engine to ejs
app.set("view engine", "ejs");

app.use ("", contactRoute);

app.listen(PORT , (req , res) => {
    console.log (`Server running at: http://localhost:${PORT}`);
})

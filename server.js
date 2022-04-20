const express = require("express");
const { animals } = require("./data/animals");
const fs = require("fs");
const path = require("path");
const apiRoutes = require("./routes/apiRoutes");
const htmlRoutes = require("./routes/htmlRoutes");

const PORT = process.env.PORT || 3001;
// instantiate the server
const app = express();

// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
//parse incoming JSON data
app.use(express.json());
app.use("/api", apiRoutes);
app.use("/", htmlRoutes);
// add middleware to help attach our front end files to back end
app.use(express.static("public"));

// tell the server to listen for requests in port 3001
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});
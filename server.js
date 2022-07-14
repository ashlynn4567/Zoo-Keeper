const express = require("express");
const apiRoutes = require("./routes/apiRoutes");
const htmlRoutes = require("./routes/htmlRoutes");

const PORT = process.env.PORT || 3001;
// instantiate the server
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// setup api routes
app.use("/api", apiRoutes);
app.use("/", htmlRoutes);

// tell the server to listen for requests in port 3001
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});
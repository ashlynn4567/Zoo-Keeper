const path = require("path");
const router = require("express").Router();

// set route for index.html
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../../public/index.html"));
});

// set route for animals
router.get("/animals", (req, res) => {
    res.sendFile(path.join(__dirname, "../../public/animals.html"));
});

// set route for zookeepers.html
app.get("/zookeepers", (req, res) => {
    res.sendFile(path.join(__dirname, "../../public/zookeepers.html"));
});

// set a wildcard (*) route in case of users trying to navigate to unforseen path
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../../public/index.html"));
});

module.exports = router;
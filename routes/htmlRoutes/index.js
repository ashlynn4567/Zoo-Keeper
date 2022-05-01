const path = require("path");
const express = require("express");
const router = express.Router();

// set route for index.html
router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../../public/index.html"));
});

// set route for animals
router.get("/animals", (req, res) => {
    res.sendFile(path.join(__dirname, "../../public/animals.html"));
});

// set route for zookeepers.html
router.get("/zookeepers", (req, res) => {
    res.sendFile(path.join(__dirname, "../../public/zookeepers.html"));
});

// set a wildcard (*) route in case of users trying to navigate to unforseen path
router.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../../public/index.html"));
});

module.exports = router;
const express = require("express");
const { animals } = require("./data/animals");
const fs = require("fs");
const path = require("path");

const PORT = process.env.PORT || 3001;
// instantiate the server
const app = express();

// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
//parse incoming JSON data
app.use(express.json());
// add middleware to help attach our front end files to back end
app.use(express.static("public"));

// setting up queries for which users can request data using specific search parameters
function filterByQuery(query, animalsArray) {
    let personalityTraitsArray = [];
    let filteredResults = animalsArray;

    if (query.personalityTraits) {
        if (typeof query.personalityTraits === "string") {
            personalityTraitsArray = [query.personalityTraits];
        } else {
            personalityTraitsArray = query.personalityTraits;
        };
        // loop through each trait in the personalityTraits array
        personalityTraitsArray.forEach(trait => {
            // for each queried trait, the filteredResults array will only contain 
            // entries containing the queried trait. At the end, we'll have an array
            // of animals that have every one of the queried traits
            filteredResults = filteredResults.filter(
                animal => animal.personalityTraits.indexOf(trait) !== -1
            );
        });
    };
    if (query.diet) {
        filteredResults = filteredResults.filter(animal => animal.diet === query.diet);
    };
    if (query.species) {
        filteredResults = filteredResults.filter(animal => animal.species === query.species);
    };
    if (query.name) {
        filteredResults = filteredResults.filter(animal => animal.name === query.name);
    };
    return filteredResults;
};

function findById(id, animalsArray) {
    const result = animalsArray.filter(animal => animal.id === id) [0];
    return result;
};

function createNewAnimal(body, animalsArray) {
    const animal = body;
    animalsArray.push(animal);
    // write new animal data to the JSON file stored in data/
    fs.writeFileSync(
        path.join(__dirname, ",./data/animals.json"),
        JSON.stringify({ animals: animalsArray }, null, 2)
    );

    // return finished code to post route for response
    return animal;
};

function validateAnimal(animal) {
    if (!animal.name || typeof animal.name !== "string") {
        return false;
    };
    if (!animal.species || typeof animal.species !== "string") {
        return false;
    };
    if (!animal.diet || typeof animal.diet !== "string") {
        return false;
    };
    if (!animal.personalityTraits || !Array.isArray(animal.personalityTraits)) {
        return false;
    };
    return true;
};

// add route for basic json data
app.get("/api/animals", (req, res) => {
    let results = animals;
    if (req.query) {
        results = filterByQuery(req.query, results);
    };
    res.json(animals);
});

// add route for animal id json data
app.get("/api/animals/:id", (req, res) => {
    const result = findById(req.params.id, animals);
    if (result) {
        res.json(result);
    } else {
        res.send(404);
    };
});

app.post("/api/animals", (req, res) => {
    // set id based on what the next index of the array will be
    req.body.id = animals.length.toString();

    // if any data in req.body is incorrect, send 400 error back
    if (!validateAnimal(req.body)) {
        res.status(400).send("The animal is not properly formatted.");
    } else {
        const animal = createNewAnimal(req.body, animals);
        res.json(animal);
    };
});

// set route for index.html
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});

// set route for zookeepers.html
app.get("/zookeepers", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/zookeepers.html"));
});

// set a wildcard (*) route in case of users trying to navigate to unforseen path
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});

// tell the server to listen for requests in port 3001
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});
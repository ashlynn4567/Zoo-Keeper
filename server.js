// import express into project so we can use express framework
const express = require("express");
// import json data about animals
const { animals } = require("./data/animals");


const PORT = process.env.PORT || 3001;
// instantiate the server
const app = express();

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
        filteredResults = filteredResults.filter(animal => animal.diet === query.diet);
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

// tell the server to listen for requests in port 3001
app.listen(3001, () => {
    console.log(`API server now on port ${PORT}!`);
});
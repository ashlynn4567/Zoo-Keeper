const fs = require("fs");
const path = require("path");

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
        console.log(personalityTraitsArray);
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
    const result = animalsArray.filter(animal => animal.id === id)[0];
    return result;
};

function createNewAnimal(body, animalsArray) {
    const animal = body;
    animalsArray.push(animal);
    // write new animal data to the JSON file stored in data/
    fs.writeFileSync(
        path.join(__dirname, "../data/animals.json"),
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

module.exports = {
    filterByQuery,
    findById,
    createNewAnimal,
    validateAnimal
};
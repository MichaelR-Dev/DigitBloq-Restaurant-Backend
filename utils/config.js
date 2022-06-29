'use strict';
const fs = require('fs');

const boxenOptions = {
    padding: 1,
    margin: 1,
    borderStyle: "round",
    borderColor: "white",
    backgroundColor: "black"
};

let rawData = fs.readFileSync('./utils/config.json');
let config = JSON.parse(rawData);

const writeConfig = (newConfig) => {
    let data = JSON.stringify(newConfig);
    fs.writeFileSync('./utils/config.json', data);
}

module.exports = { config, boxenOptions, writeConfig };
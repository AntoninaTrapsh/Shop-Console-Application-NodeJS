const path = require('path');
const {readFile} = require("./read-file");

const dirPath = path.resolve(__dirname, 'database');
const filePath = path.resolve(dirPath, 'products.json');
const file = readFile(filePath);
const content = file && JSON.parse(file) || [];

module.exports = {dirPath, filePath, content};
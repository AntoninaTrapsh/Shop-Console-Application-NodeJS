const path = require('path');
const {readFile} = require("./read-file");

const dirPath = path.resolve(__dirname, '../database');
const filePath = path.resolve(dirPath, 'products.json');

function readContent() {
    let files = readFile(filePath);
    return files && JSON.parse(files) || [];
}

module.exports = {dirPath, filePath, readContent};
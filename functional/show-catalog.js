const {readContent} = require("../read&write-files/content");

function showCatalog() {
    let content = readContent();
    content.forEach((product) => console.log(product));
}

module.exports = showCatalog;
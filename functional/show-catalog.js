const {content} = require("../read&write-files/content");
const arr = [];

function showCatalog() {
    content.forEach((product) => console.log(product));
}

module.exports = showCatalog;
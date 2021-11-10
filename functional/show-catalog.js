const {content} = require("../read&write-files/content");

function showCatalog() {
    content.forEach((product) => console.log(product));
}

module.exports = showCatalog;
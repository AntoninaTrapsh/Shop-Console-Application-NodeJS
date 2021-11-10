const rl = require("../read&write-files/read-line");
const fs = require("fs");
const searchProduct = require("./search-product");
const {readContent} = require("../read&write-files/content");
const {filePath} = require("../read&write-files/content");
const {dirPath} = require("../read&write-files/content");
const {getInput} = require("../read&write-files/interaction");

async function deleteProduct() {
    let content = readContent();
    let findIndex = await searchProduct();
    if (findIndex === false) {
        return;
    }
    let answer = await getInput(rl, "Вы действительно хотите удалить данный товар? (1 - да, 0 - нет): ");
    if (+answer === 1) {
        content.splice(findIndex, 1);

        let jsonContent = JSON.stringify(content, null, 2);

        fs.mkdirSync(dirPath, {recursive: true});
        fs.writeFileSync(filePath, jsonContent);

        console.log("Данные о товаре удалены", "\n");
    } else {
        console.log("Данные о товаре не были удалены","\n");
        return;
    }
}

module.exports = deleteProduct;
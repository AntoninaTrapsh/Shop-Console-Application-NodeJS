const rl = require("./read-line");
const fs = require("fs");
const searchProduct = require("./search-product");
const {filePath} = require("./content");
const {dirPath} = require("./content");
const {content} = require("./content");
const {getInput} = require("./interaction");

async function deleteProduct() {
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
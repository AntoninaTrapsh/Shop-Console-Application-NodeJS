const rl = require("../read&write-files/read-line");
const fs = require("fs");
const searchProduct = require("./search-product");
const {filePath} = require("../read&write-files/content");
const {dirPath} = require("../read&write-files/content");
const {getInput} = require("../read&write-files/interaction");
const {content} = require("../read&write-files/content");

async function changeProduct() {
    let findIndex = await searchProduct();
    if (findIndex === false) {
        return;
    }
    console.log("Введите следующие данные о товаре: ");
    let answer = await getInput(rl, "Введите наименование: ");
    content[findIndex].name = answer;
    answer = await getInput(rl, "Введите цену: ");
    content[findIndex].price = answer;
    answer = await getInput(rl, "Введите путь до изображения: ");
    content[findIndex].img = answer;
    console.log("Измененный товар: ", content[findIndex], "\n");
    let jsonContent = JSON.stringify(content, null, 2);

    fs.mkdirSync(dirPath, {recursive: true});
    fs.writeFileSync(filePath, jsonContent);
}

module.exports = changeProduct;
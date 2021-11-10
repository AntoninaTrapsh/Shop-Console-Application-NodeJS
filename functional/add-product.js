const fs = require("fs");
const rl = require("../read&write-files/read-line");
const {readContent} = require("../read&write-files/content");
const {filePath} = require("../read&write-files/content");
const {dirPath} = require("../read&write-files/content");
const {getInput} = require("../read&write-files/interaction");

async function addProduct() {
    let content = readContent();
    let newProduct = {};
    console.log("Введите следующие данные о товаре:");
    let answer = await getInput(rl, "Введите наименование: ");
    newProduct.name = answer;
    answer = await getInput(rl, "Введите цену: ");
    newProduct.price = answer;
    answer = await getInput(rl, "Введите путь до изображения: ");
    newProduct.img = answer;
    if (newProduct.name.trim() && newProduct.price.trim() && newProduct.img.trim()) {
        console.log("Будет добавлен следующий товар: ", newProduct, "\n");
        content.push(newProduct);
    } else {
        console.log("Товар не может иметь пустых полей. Попробуйте еще раз", "\n");
        return;
    }
    let jsonContent = JSON.stringify(content, null, 2);

    fs.mkdirSync(dirPath, {recursive: true});
    fs.writeFileSync(filePath, jsonContent);
}

module.exports = addProduct;
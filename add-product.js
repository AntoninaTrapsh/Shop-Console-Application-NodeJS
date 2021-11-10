const fs = require("fs");
const rl = require("./read-line");
const {filePath} = require("./content");
const {dirPath} = require("./content");
const {content} = require("./content");
const {getInput} = require("./interaction");

async function addProduct() {
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
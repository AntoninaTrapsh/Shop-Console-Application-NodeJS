const rl = require("./read-line");
const fs = require("fs");
const {filePath} = require("./content");
const {dirPath} = require("./content");
const {getInput} = require("./interaction");
const {content} = require("./content");

let answer;
let findIndex;

async function changeProduct() {
    answer = await getInput(rl, "Введите наименование интересующего Вас товара: ");
    findIndex = content.findIndex((product) => product.name.toLowerCase() === answer.toLowerCase());
    if (findIndex === -1) {
        console.log("Такой товар не найден, попробуйте снова" + '\n');
        return;
    } else {
        console.log('Найденный товар: ', content[findIndex]);
    }
    console.log("Введите следующие данные о товаре: ");
    answer = await getInput(rl, "Введите наименование: ");
    content[findIndex].name = answer;
    answer = await getInput(rl, "Введите цену: ");
    content[findIndex].price = answer;
    answer = await getInput(rl, "Введите путь до изображения: ");
    content[findIndex].img = answer;
    console.log("Измененный товар: ", content[findIndex]);
    console.log('\n');
    let jsonContent = JSON.stringify(content, null, 2);

    fs.mkdirSync(dirPath, {recursive: true});
    fs.writeFileSync(filePath, jsonContent);
}

module.exports = changeProduct();
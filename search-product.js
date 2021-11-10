const rl = require("./read-line");
const {getInput} = require("./interaction");
const {content} = require("./content");

async function searchProduct() {
    let answer = await getInput(rl, "Введите наименование интересующего Вас товара: ");
    let findIndex = content.findIndex((product) => product.name.toLowerCase() === answer.toLowerCase());
    if (findIndex === -1) {
        console.log("Такой товар не найден, попробуйте снова" + '\n');
        return false;
    } else {
        console.log('Найденный товар: ', content[findIndex]);
        return findIndex;
    }
}
module.exports = searchProduct;
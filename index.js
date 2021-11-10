const fs = require('fs');
const path = require('path');

const dirPath = path.resolve(__dirname, 'database');
const filePath = path.resolve(dirPath, 'products.json');
const file = readFile(filePath);
const content = file && JSON.parse(file) || [];

const readline = require("readline");
let isActive = true;

let jsonContent;

startApp();

async function startApp() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    const menu =
        "1. Вывод списка товаров" + '\n' +
        "2. Добавление нового товара" + '\n' +
        "3. Изменение существующего" + '\n' +
        "4. Удаление товара" + '\n' +
        "5. Выход"

    let answer;
    let findIndex;

    let newProduct = {};

    while (isActive) {
        console.log(menu);
        answer = await getInput(rl, "Выберите действие из приведенного ниже списка: ");
        switch (+answer) {
            case 1:
                content.forEach((product) => console.log(product));
                break;
            case 2:
                console.log("Введите следующие данные о товаре:");
                answer = await getInput(rl, "Введите наименование: ");
                newProduct.name = answer;
                answer = await getInput(rl, "Введите цену: ");
                newProduct.price = answer;
                answer = await getInput(rl, "Введите путь до изображения: ");
                newProduct.img = answer;
                console.log("Будет добавлен следующий товар: ", newProduct);
                content.push(newProduct);
                jsonContent = JSON.stringify(content, null, 2);

                fs.mkdirSync(dirPath, {recursive: true});
                fs.writeFileSync(filePath, jsonContent);
                break;
            case 3:
                answer = await getInput(rl, "Введите наименование интересующего Вас товара: " );
                findIndex = content.findIndex((product) => product.name.toLowerCase() === answer.toLowerCase());
                if (!content[findIndex]) {
                    console.log("Такой товар не найден, попробуйте снова");
                    break;
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
                jsonContent = JSON.stringify(content, null, 2);

                fs.mkdirSync(dirPath, {recursive: true});
                fs.writeFileSync(filePath, jsonContent);
                break;
            case 4:
                answer = await getInput(rl, "Введите наименование интересующего Вас товара: " );
                findIndex = content.findIndex((product) => product.name.toLowerCase() === answer.toLowerCase());
                if (!content[findIndex]) {
                    console.log("Такой товар не найден, попробуйте снова");
                    break;
                } else {
                    console.log('Найденный товар: ', content[findIndex]);
                }
                answer = await getInput(rl, "Вы действительно хотите удалить данный товар? (1 - да, 0 - нет): ");
                if (!answer) {
                    break;
                } else {
                    content.splice(findIndex, 1);

                    jsonContent = JSON.stringify(content, null, 2);

                    fs.mkdirSync(dirPath, {recursive: true});
                    fs.writeFileSync(filePath, jsonContent);

                    console.log("Данные о товаре удалены");
                }
                break;
            case 5:
                isActive = false;
                break;
            default:
                console.log("Попробуйте еще раз");
                break;
        }
    }
    rl.close();
}

function getInput(rl, text = "- ") {
    return new Promise(resolve => {
        rl.question(text, answer => resolve(answer));
    })
}

function readFile(filePath) {
    if (fs.existsSync(filePath)) {
        return fs.readFileSync(filePath);
    }
}


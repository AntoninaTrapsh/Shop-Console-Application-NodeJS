const {getInput} = require("./interaction");
const fs = require("fs");
const showCatalog = require("./show-catalog");
const addProduct = require("./add-product");
const changeProduct = require("./change-product");
const rl = require("./read-line");
const {filePath} = require("./content");
const {dirPath} = require("./content");
const {content} = require("./content");


async function startApp() {
    const menu =
        "1. Вывод списка товаров" + '\n' +
        "2. Добавление нового товара" + '\n' +
        "3. Изменение существующего" + '\n' +
        "4. Удаление товара" + '\n' +
        "5. Выход" + '\n';

    let isActive = true;
    let jsonContent;
    let answer;
    let findIndex;

    let newProduct = {};

    while (isActive) {
        console.log(menu);
        answer = await getInput(rl, "Выберите действие из приведенного ниже списка: ");
        console.log('\n');
        switch (+answer) {
            case 1:
                showCatalog();
                break;
            case 2:
                await addProduct();
                break;
            case 3:
                await changeProduct();
                break;
            case 4:
                answer = await getInput(rl, "Введите наименование интересующего Вас товара: " );
                findIndex = content.findIndex((product) => product.name.toLowerCase() === answer.toLowerCase());
                if (findIndex === -1) {
                    console.log("Такой товар не найден, попробуйте снова" + '\n');
                    break;
                } else {
                    console.log('Найденный товар: ', content[findIndex]);
                }
                answer = await getInput(rl, "Вы действительно хотите удалить данный товар? (1 - да, 0 - нет): ");
                console.log('\n');
                if (+answer === 1) {
                    content.splice(findIndex, 1);

                    jsonContent = JSON.stringify(content, null, 2);

                    fs.mkdirSync(dirPath, {recursive: true});
                    fs.writeFileSync(filePath, jsonContent);

                    console.log("Данные о товаре удалены" + '\n');
                } else {
                    console.log("Данные о товаре не были удалены" + '\n');
                    break;
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

startApp();
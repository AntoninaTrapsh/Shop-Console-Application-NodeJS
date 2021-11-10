const {getInput} = require("./interaction");
const fs = require("fs");
const showCatalog = require("./show-catalog");
const addProduct = require("./add-product");
const changeProduct = require("./change-product");
const rl = require("./read-line");
const deleteProduct = require("./deleteProduct");
const startActive = require("./start-active");
const {filePath} = require("./content");
const {dirPath} = require("./content");
const {content} = require("./content");


async function startApp() {
    let isActive = true;

    while (isActive) {
        let answer = await startActive();
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
                await deleteProduct();
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
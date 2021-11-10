const showCatalog = require("./functional/show-catalog");
const addProduct = require("./functional/add-product");
const changeProduct = require("./functional/change-product");
const rl = require("./read&write-files/read-line");
const deleteProduct = require("./functional/deleteProduct");
const startActive = require("./functional/start-active");


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
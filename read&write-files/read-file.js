const fs = require('fs');
function readFile(filePath) {
    if (fs.existsSync(filePath)) {
        return fs.readFileSync(filePath);
    }
}

module.exports = {readFile};
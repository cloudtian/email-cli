const fs = require('fs');
const path = require('path');

const prefixMap = {
    '.png': 'data:image/png;base64,',
    '.gif': 'data:image/gif;base64,',
    '.jpeg': 'data:image/jpeg;base64,',
    '.jpg': 'data:image/jpg;base64,'
}

const extractName = (pathUrl) => {
    return path.basename(pathUrl).split('.')[0];
}
const pictureToBase64 = async (picUrl) => {
    const imageData = fs.readFileSync(picUrl);
    const imageBase64 = imageData.toString('base64');

    console.log('pic:', picUrl);

    const ext = path.extname(picUrl);
    const name = extractName(picUrl);
    const imagePrefix = prefixMap[ext];

    const file = path.resolve(process.cwd(), name);
    fs.writeFile(file, (imagePrefix || '') + imageBase64, (err) => {
        if (err) throw err;
        console.log(`文件已被保存: ${file}`);
    });
}

module.exports = pictureToBase64
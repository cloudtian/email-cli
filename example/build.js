const ejs = require('ejs');
const path = require('path');
const fs = require('fs-extra');
const getDirName = path.dirname;

const outputPath = 'template'
const template = [
    './src/template.html'
];

function writeFile (path, contents, cb) {
    fs.mkdirp(getDirName(path), function (err) {
        if (err) return cb(err);
        fs.writeFile(path, contents, cb);
    });
}

template.forEach(file => {
    ejs.renderFile(path.resolve(__dirname, file), null, null, function(err, str) {
        if (err) throw err;
        let distFilePath = path.resolve(__dirname, outputPath, path.basename(file))
        writeFile(distFilePath, str, function (err) {
            if (err) throw err;
            return true;
        });
    });
});
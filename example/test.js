// 测试：预览生成邮件效果  通过node test.js生成最终模板内容进行效果测试预览
const process = require('child_process');
const path = require('path')

const template = [
    './template/template.html'
];

const data = path.resolve(__dirname, 'config/data.json');

// const lang = 'en';
// const langjson = path.resolve(__dirname, 'i18n/en.json');

process.exec(`node ./build`, (err) => {
    if (err) {
        console.error(`exec error: ${err}`);
        return;
    }
    template.forEach(t => {
        process.exec(`email-cli -t ${path.resolve(__dirname, t)} -c ${data} -f`, (error) => {
            if (error) console.error(`exec error: ${error}`)
        });
    });
});


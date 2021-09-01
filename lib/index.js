const fs = require('fs')
const mustache = require('mustache')
const iconv = require('iconv-lite')
iconv.skipDecodeWarning = true;

const i18n = {
    zh: 'zh_CN',
    en: 'en',
    lang: this.zh,
    _: function (text, data) {
        return data[text] || text
    },
    setLang (lang) {
        this.lang = lang;
    },
    isEn (lang) {
        return this.en === lang
    }
};

const extractName = (path) => {
    return path.slice(path.lastIndexOf('/') === -1 ? 0 : path.lastIndexOf('/') + 1, path.lastIndexOf('.'));
}

const replace = ({template, config, data, filename, langjson, lang = 'zh_CN', }) => {
    console.log('Please wait while building...')
    const html = fs.readFileSync(template, 'utf-8')
    let templateData, langData;
    try {   
        const jsondata = config ? iconv.decode(fs.readFileSync(config, 'binary'), 'utf-8') : data
        templateData = JSON.parse(jsondata)
        langData = langjson ? JSON.parse(iconv.decode(fs.readFileSync(langjson, 'binary'), 'utf-8')) : {}
    } catch (err) {
        console.log(err)
    }

    i18n.setLang(lang)
    const content = mustache.render(html, {
        ...templateData,
        isEn: i18n.isEn(lang),
        lang: function () {
            return function (text, render) {
                return render(i18n._(text, langData));
            }
        }
    });
    const defaultFile = `${extractName(template)}.email.html`;
    const file = `${filename || defaultFile}`
    fs.writeFile(file, content, (err) => {
        if (err) {
            throw err
        }
        console.log(`complete ${file}`)
    })
}

module.exports = {
    replace
}
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

const ttyLog = (msg) => {
    if (Boolean(process.stdout.isTTY)) {
        console.log(msg)
    }
}
const replace = (opt) => {
    let { template, config, data, filename, langjson, lang = 'zh_CN' } = opt;
    ttyLog('Please wait while building...')
    
    const html = fs.readFileSync(template, 'utf-8')
    let templateData, langData;
    try {   
        const jsondata = config ? iconv.decode(fs.readFileSync(config, 'binary'), 'utf-8') : data
        templateData = JSON.parse(jsondata)
        langData = langjson ? JSON.parse(iconv.decode(fs.readFileSync(langjson, 'binary'), 'utf-8')) : {}
    } catch (err) {
        console.error(err)
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

    if (!filename) {
        process.stdout.write(content);
        return;
    }

    const defaultFile = `${extractName(template)}.email${i18n.isEn(lang) ? '-en' : ''}.html`;
    const file = typeof filename === 'string' ? filename : defaultFile;
    fs.writeFile(file, content, (err) => {
        if (err) {
            throw err
        }
        ttyLog(`complete ${file}`)
    })
}

module.exports = {
    replace
}
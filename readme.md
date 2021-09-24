# email-cli
邮件模板替换命令行工具，根据模板和配置生成HTML字符串

# 安装
## 自动安装
下载install.cmd，双击运行，按回车，将自动安装工具到当前目录的email-cli目录。脚本运行完后，email-cli命令全局可用。

## 手动安装
进入需要安装的目录，运行下面的命令安装
``` bash
$ git clone xxx
$ npm install
$ npm link
```
## 不用安装
直接下载dist中email-cli.exe，直接运行也可

# 支持的命令参数
$ email-cli --help
```
Welcome to use email-cli tool (version: 1.0.0), use "email-cli --help" show more options.
Usage: email-cli [options]

    For Example:
        email-cli -t ./template.html -c ./template-config.json -l en -ls ./langjson.json
        email-cli -t ./template.html -d "json string" -l en -ls ./langjson.json

Options 
  -v, --version               output the version number
  -t, --template [template]   email template file. required
  -d, --data [data]           json data for template file
  -c, --config [config]       json config file for template file
  -f, --filename [filename]   the name of the generated html file. optional (default: 'template'.email.html)
  -l, --lang [lang]           the language type of the generated html file. [en, zh_CN] optional (default: "zh_CN")
  -ls, --langjson [langjson]  the language json map of the generated html file
  -h, --help
```
# 使用
前端调试，可通过--config json配置文件进行数据插入，--filename 配置文件名输出html文件预览效果
```
node ./bin/email-cli
    --template ./example/template/template.html
    --config ./example/config/data.json
    --filename ./example/email.html
    --lang en
    --langjson ./example/i18n/en.json
```
后端使用，采用--data传入json数据进行数据插入，默认输出标准流
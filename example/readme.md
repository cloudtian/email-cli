## 邮件模板
### 注意事项
- 不要使用浮动定位，position定位
- 尽量使用`div`和`table`布局
- css样式的定义不要使用缩写
- 使用完整的十六进制编码，不要使用简写
- 邮件模板中变量使用`mustache`插值语法编写 
- 需要支持多语言的词条使用`{{#lang}}内容{{/lang}}`进行包裹

### 图片导入
邮件中的图片采用base64格式进行导入  
可使用命令`node p2b/index xxx.png` 将图片转换为base64编码格式，复制到模板中即可   
iconfont引入：从图形库里设置大小和颜色后，下载png图片，然后再进行转换。

### example目录下文件说明
- `config`  邮件模板的数据配置文件。方便前后端查看对接词条。方便前端通过`--config`参数传json数据测试生成效果。 后端推荐直接通过`--data`参数传json数据
- `i18n` 存放模板的翻译词条配置文件的文件夹
- `src` 存放原始模板文件的文件夹
- `template` 存放构建后的模板文件

### 邮件内容生成效果预览
- `node test.js`  构建生成模板文件，并对模板进行插值生成内容
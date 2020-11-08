const { prettier } = require('@ice/spec');

module.exports = {
  ...prettier,

  printWidth: 100, //每行到多少长度开始折行
  //tabWidth: 2, //const { tslint } = require('@ice/spec'); 已经设置值为2
  singleQuote: true, //单引号
  trailingComma: 'none', //数组、对象最后一个元素的尾逗号
  bracketSpacing: true, //花括号前后空格
  jsxBracketSameLine: true, //使多行JSX元素最后一行末尾的 > 单独一行
  jsxSingleQuote: true, //在JSX中使用单引号
  semi: true, //是否在行尾加分号
  arrowParens: 'avoid', //只有一个参数的箭头函数的参数是否带圆括号（默认avoid不带）
  endOfLine: 'lf'
};

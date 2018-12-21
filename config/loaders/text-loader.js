const { markdownData } = require('../plugin/MyAwesomePlugin')

module.exports = function (content) {
  // this.cacheable && this.cacheable();
  console.log('lailailai')
  this.value = content;
  markdownData.content = '66666'
  return "module.exports = " + JSON.stringify(content);
}

const { markdownData } = require('../plugin/markdwonPlugin')

module.exports = function (content) {
  // this.cacheable && this.cacheable();
  const stra = content.split('---')[1]

  const headerTemp = stra.split('\n')

  let headerData = {}

  headerTemp.forEach((item) => {
    const temps = item.split(':')
    if (temps.length > 1) {
      headerData[temps[0].trim()] = temps[1].trim()
    }
  })
  markdownData.header[headerData.title] = headerData
  return "module.exports = " + JSON.stringify(content);
}

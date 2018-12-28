const { calculatePostData } = require('../../scripts/postbuild')

module.exports = function (content) {
  this.cacheable && this.cacheable();
  const path = this.resourcePath
  const index = path.lastIndexOf('/')
  const pathName = path.substring(index + 1)
  const data = calculatePostData(content, pathName)
  return "module.exports = " + JSON.stringify(data);
}

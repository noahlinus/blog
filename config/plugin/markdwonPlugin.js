const markdownData = {
  header: {}
}

const dataTemp = {
  data: ''
}

class MarkdwonPlugin {
  onAfterEmit() {
    console.log('onAfterEmit')
    const fs = require('fs')
    const path = require('path')
    const dataString = JSON.stringify(markdownData)
    if (dataTemp.data !== dataString) {
      dataTemp.data = dataString
      fs.writeFile(path.join(__dirname, '../../src/assets/articles.json'), dataString, (err) => {
        if (err) {
          console.log(err)
          return;
        }
      })
    }
  }

  apply(compiler) {
    compiler.plugin('afterEmit', this.onAfterEmit.bind(this))
  }
};

module.exports = {
  markdownData,
  MarkdwonPlugin,
  dataTemp,
};
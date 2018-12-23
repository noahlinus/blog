const fs = require('fs');
const path = require('path')
const { markdownData, dataTemp } = require('../config/plugin/markdwonPlugin')
const dirPath = path.join(__dirname, '../src/_posts/')

async function getPostsToJson() {
  return new Promise((resolve, reject) => {
    fs.readdir(dirPath, (err, files) => {
      if (err) {
        return reject(err)
      }
      for (const fileName of files) {
        const filePath = path.join(dirPath, fileName)
        fs.stat(filePath, (err, stats) => {
          if (err) {
            return reject(err)
          }
          if (stats.isFile() && path.extname(fileName) === '.md') {
            const content = fs.readFileSync(filePath, 'utf8')
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
          }
        })
      }
    })
  })
}

getPostsToJson()

// module.exports = getPostsToJson

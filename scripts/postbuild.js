const fs = require('fs')
const fsPromises = fs.promises; const path = require('path')
const dirPath = path.join(__dirname, '../src/_posts/')
const postFilePath = path.join(__dirname, '../src/assets/posts.json')
const tagsFilePath = path.join(__dirname, '../src/assets/tags.json')

const postData = {
  data: {}
}

const tagsData = {}

const tempPostData = {
  data: ''
}

const calculatePostData = (content, fileName) => {
  const stra = content.split('---')[1]
  const headerTemp = stra.split('\n')
  const headerString = headerTemp.filter((item) => item)
  let headerData = {}
  headerString.forEach((item) => {
    const index = item.indexOf(':')
    const key = item.substring(0, index).trim()
    const value = item.substring(index + 1).trim()
    headerData[key] = value
  })
  postData.data[fileName] = headerData
}

const calculateTagsData = (posts) => {
  for (const key in posts) {
    const data = posts[key]
    const tagSplit = data.tags.split(',')
    tagSplit.forEach((item) => {
      item = item.trim()
      if (!tagsData[item]) {
        tagsData[item] = []
      }
      tagsData[item].push(key)
    })
  }
}

async function writePostToFile(content) {
  await fsPromises.writeFile(postFilePath, content)
}

async function writeTagsToFile(content) {
  await fsPromises.writeFile(tagsFilePath, content)
}

async function beginBuildPosts() {
  try {
    const files = await fsPromises.readdir(dirPath)
    for (const fileName of files) {
      const filePath = path.join(dirPath, fileName)
      const stats = await fsPromises.stat(filePath)
      if (stats.isFile() && path.extname(fileName) === '.md') {
        const content = await fsPromises.readFile(filePath, 'utf8')
        calculatePostData(content, fileName)
      }
    }
    const postJson = JSON.stringify(postData.data)
    tempPostData.data = postJson
    await writePostToFile(postJson)
    calculateTagsData(postData.data)
    await writeTagsToFile(JSON.stringify(tagsData))
  } catch (error) {
    console.log(error)
  }
}

async function watchBuildPosts() {
  const postJson = JSON.stringify(postData.data)
  if (tempPostData.data !== postJson) {
    tempPostData.data = postJson
    await writePostToFile(postJson)
    calculateTagsData(postData.data)
    await writeTagsToFile(JSON.stringify(tagsData))
  }
}

module.exports = {
  beginBuildPosts,
  watchBuildPosts,
  calculatePostData,
}

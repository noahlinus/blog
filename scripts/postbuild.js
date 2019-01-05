const fs = require('fs-extra')
const path = require('path')
const dirPath = path.join(__dirname, '../src/_posts/')
const tagsFilePath = path.join(__dirname, '../src/assets/posts/tags.json')
const moment = require('moment')

const PAGE_SIZE = 10

const postData = {
  data: {}
}

const tagsData = {}

const tempPostData = {
  data: ''
}

const calculatePostData = (content, fileName) => {
  fileName = path.basename(fileName)
  const contents = content.split('---')
  const stra = contents[1].trim()
  const headerTemp = stra.split('\n')
  const headerString = headerTemp.filter((item) => item)
  let headerData = {}
  headerString.forEach((item) => {
    const index = item.indexOf(':')
    const key = item.substring(0, index).trim()
    const value = item.substring(index + 1).trim()
    headerData[key] = value
  })
  headerData.key = fileName
  let preview = contents[2].replace(/[#-/\n]/g, '')
  if (preview.length > 250) {
    preview = preview.substring(0, 250) + '...'
  }
  const contentData = { ...headerData, content: contents[2] }
  headerData.preview = preview
  postData.data[fileName] = headerData
  return contentData
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

async function writePostToFile(content, fileName) {
  await fs.emptyDir(path.join(__dirname, `../src/assets/posts`))
  const postFilePath = path.join(__dirname, `../src/assets/posts/${fileName}.json`)
  await fs.writeFile(postFilePath, content)
}

async function writeTagsToFile(content) {
  await fs.writeFile(tagsFilePath, content)
}

async function beginBuildPosts() {
  try {
    const files = await fs.readdir(dirPath)
    for (const fileName of files) {
      const filePath = path.join(dirPath, fileName)
      const stats = await fs.stat(filePath)
      if (stats.isFile() && path.extname(fileName) === '.md') {
        const content = await fs.readFile(filePath, 'utf8')
        calculatePostData(content, fileName)
      }
    }
    await watchBuildPosts()
  } catch (error) {
    console.log(error)
  }
}

async function watchBuildPosts() {
  const { data } = postData
  const postJson = JSON.stringify(data)
  if (tempPostData.data !== postJson) {
    tempPostData.data = postJson
    let jsonData = []
    jsonData = Object.keys(data).map((key) => {
      const value = data[key]
      return value
    })
    jsonData.sort((s1, s2) => {
      return moment(s1.date).valueOf() - moment(s2.date).valueOf() > 0 ? -1 : 1
    })
    const length = jsonData.length
    let oldIndex = 0
    let page = 1
    for (let i = PAGE_SIZE; i < length + PAGE_SIZE; i += PAGE_SIZE) {
      const index = i > length ? length : i;
      const pageJsonData = jsonData.slice(oldIndex, index)
      oldIndex = index
      await writePostToFile(JSON.stringify({ data: pageJsonData, current: page, total: length, pageSize: PAGE_SIZE }), `page_${page}`)
      page++;
    }
    calculateTagsData(postData.data)
    await writeTagsToFile(JSON.stringify(tagsData))
  }
}

// beginBuildPosts()

// function watchBuild() {
//   fs.watch(dirPath, (eventType, filename) => {
//     console.log(eventType + ',' + filename)

//   })
// }

// watchBuild()

module.exports = {
  beginBuildPosts,
  watchBuildPosts,
  calculatePostData,
}

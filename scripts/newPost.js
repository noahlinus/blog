const inquirer = require('inquirer')
const fs = require('fs-extra')
const path = require('path')
const moment = require('moment')
const postDirPath = path.join(__dirname, '../src/_posts/')

const PostTemplate = {
  title: '',
  date: '',
  tags: '',
  header_img: '',
}

inquirer.prompt([
  {
    type: 'input',
    name: 'post_name',
    message: '请输入您的文章名称：',
    validate: async (value) => {
      if (/(\.|\*|\?|\\|\/)/gi.test(value)) {
        return '文章名不得包含特殊符号（.*?\\/），请重新输入';
      } else if (!value) {
        return '文章名称不能为空，请重新输入'
      }
      const files = await fs.readdir(postDirPath)
      for (const fileName of files) {
        if (fileName === `${value}.md`) {
          return '已经存在重复的文章名，请重新输入'
        }
      }
      return true;
    },
    filter: value => value.replace(/\s+/gi, '-'),
  }
]).then(answers => {
  const { post_name } = answers
  let headerData = ''
  const keys = Object.keys(PostTemplate)
  keys.forEach((key, index) => {
    if (index === 0) {
      headerData = '---\n'
    }
    let value = PostTemplate[key]
    if (key === 'title') {
      value = post_name
    } else if (key === 'date') {
      value = moment().format('YYYY-MM-DD HH:mm:ss')
    }
    headerData = `${headerData}${key}: ${value}\n`
    if (index === keys.length - 1) {
      headerData = `${headerData}---\n`
    }
  })
  fs.writeFile(path.join(postDirPath, `${post_name}.md`), headerData)
})

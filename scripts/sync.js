const shell = require('shelljs')
const fs = require('fs-extra')
const path = require('path')
const buildPath = path.join(__dirname, '../build/')

shell.cd(buildPath)
console.log('----获取更新---')
shell.exec('git pull')
shell.cd('..')

const buildPromise = require('./build.js')

buildPromise.then(() => {
  console.log(buildPath)
  fs.copyFileSync(path.join(buildPath, 'index.html'), path.join(buildPath, '404.html'));
  shell.cd(buildPath)
  shell.exec('git add .');
  shell.exec('git commit -m "更新部署"');
  console.log('\r');
  console.log('----开始push到git代码库----');
  shell.exec('git push');
  console.log('----成功push到git代码库----')
  process.stdout.on('data', data => console.log(data));
  process.stderr.on('data', data => console.log(data));
  process.exit();
})


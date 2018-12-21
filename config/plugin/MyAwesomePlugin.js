const markdownData = {
  content: ''
}
class MyAwesomePlugin {
  constructor(options) {
    this.options = options;
  }

  onBuildCompleted() {
    console.log('onBuildCompleted !!!!!!!!!!!!!!!!!!!!!')
  }

  onWatching() {
    console.log(markdownData.content)
  }
  onEmit(compilation, callback) {
    console.log('onEmit', markdownData.content)
    callback()
  }

  apply(compiler) {
    compiler.plugin('watchRun', this.onWatching.bind(this));

    compiler.plugin('done', this.onBuildCompleted.bind(this));

    compiler.plugin('emit', this.onEmit.bind(this))
  }
};

module.exports = {
  markdownData,
  MyAwesomePlugin
};
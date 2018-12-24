const { watchBuildPosts } = require('../../scripts/postbuild')

class MarkdwonPlugin {
  onAfterEmit() {
    console.log('onAfterEmit')
    watchBuildPosts()
  }

  apply(compiler) {
    compiler.plugin('afterEmit', this.onAfterEmit.bind(this))
  }
};

module.exports = MarkdwonPlugin
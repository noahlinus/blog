// 获取所有文章信息
const getPosts = (page) => import(`../assets/posts/page_${page}.json`)

// 获取tag
const getPostTags = () => import('../assets/posts/tags.json')

// 获取文件内容
const getPostContent = (fileName) => import(`../_posts/${fileName}`)

export { getPosts, getPostTags, getPostContent }

import ActionTypes from "../action/actionTypes";

const initArticle = {
  articles: {
    data: [],
    pagination: {
      current: 1,
      pageSize: 10,
      total: 10,
    },
    loading: false,
  },
  articleContent: {
    data: {
      title: '',
      body: '',
      tags: '',
      created_at: '',
      comments: 0,
    },
    menuList: [],
    isNotFound: false,
    loading: false,
  },
  comments: {
    data: [],
    loading: false,
    pagination: {
      current: 1,
      pageSize: 10,
      total: 10,
    },
  },
  tags: {},
}

const article = (state = initArticle, action) => {
  switch (action.type) {
    case ActionTypes.GET_ARTICLES_SUCCESS:
      const { current, pageSize, total, data } = action.articles
      return {
        ...state,
        articles: {
          data,
          pagination: {
            current,
            pageSize,
            total,
          },
          loading: false,
        },
      }
    case ActionTypes.GET_ARTICLES:
      return {
        ...state,
        articles: {
          ...state.articles,
          loading: true,
        }
      }
    case ActionTypes.GET_ARTICLES_FAILED:
      return {
        ...state,
        articles: {
          ...state.articles,
          loading: false,
        }
      }
    case ActionTypes.GET_TAGS:
      return {
        ...state,
        tags: action.tags
      }
    case ActionTypes.GET_ARTICLE_CONTENT: {
      return {
        ...state,
        articleContent: {
          ...state.articleContent,
          isNotFound: false,
          loading: true,
        },
      }
    }
    case ActionTypes.GET_ARTICLE_CONTENT_SUCCESS:
      const menuList = []
      if (action.article && action.article.content) {
        const headline = /^(#{1,6})([^#\n]+)$/m
        let str = action.article.content
        let stra
        while ((stra = headline.exec(str)) !== null) {
          const count = stra[1].length;
          menuList.push({ count, data: stra[2].trim() })
          str = str.replace(stra[0], '')
        }
      }
      return {
        ...state,
        articleContent: {
          data: action.article,
          menuList,
          isNotFound: false,
          loading: false,
        },
      }
    case ActionTypes.GET_ARTICLE_CONTENT_FAILD:
      return {
        ...state,
        articleContent: {
          ...state.articleContent,
          isNotFound: true,
          loading: true,
        }
      }
    case ActionTypes.GET_COMMENTS:
      return {
        ...state,
        comments: {
          ...state.comments,
          ...action.comments
        }
      }
    default:
      return state
  }
}

// function getLinkData(link) {
//   let pagedata = {}
//   link.split(',').forEach(element => {
//     let temp = element.split('?')[1].split(';')
//     let key = temp[1].split('=')[1].replace(/"/g, "")
//     let datas = {}
//     temp[0].split('&').forEach(item => {
//       let data = item.split('=')
//       datas[data[0]] = data[1]
//     })
//     pagedata[key] = datas
//   });
//   return pagedata;
// }

export default article

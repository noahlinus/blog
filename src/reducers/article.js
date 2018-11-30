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
  articleContent: null,
  tags: [],
}

const article = (state = initArticle, action) => {
  switch (action.type) {
    case ActionTypes.GET_ARTICLES_SUCCESS:
      let total = action.total
      const { articles } = action
      const { link } = articles
      if (link) {
        let linkData = getLinkData(link)
        if (linkData['last']) {
          total = linkData['last'].page * linkData['last'].per_page
        } else if (linkData['prev']) {
          total = linkData['prev'].page * linkData['prev'].per_page + Number(linkData['prev'].per_page)
        }
      }
      return {
        ...state,
        articles: {
          data: articles.data,
          pagination: {
            current: articles.current,
            pageSize: articles.pageSize,
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
    case ActionTypes.GET_ARTICLE_CONTENT:
      return {
        ...state,
        articleContent: action.articleContent
      }
    default:
      return state
  }
}

function getLinkData(link) {
  let pagedata = {}
  link.split(',').forEach(element => {
    let temp = element.split('?')[1].split(';')
    let key = temp[1].split('=')[1].replace(/"/g, "")
    let datas = {}
    temp[0].split('&').forEach(item => {
      let data = item.split('=')
      datas[data[0]] = data[1]
    })
    pagedata[key] = datas
  });
  return pagedata;
}

export default article

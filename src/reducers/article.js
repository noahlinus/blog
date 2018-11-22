import ActionTypes from "../action/actionTypes";

const initArticle = {
  loading: true,
  articles: {
    data: [],
    pagination: {
      current: 1,
      pageSize: 10,
      total: 10,
    },
  },
}

const article = (state = initArticle, action) => {
  switch (action.type) {
    case ActionTypes.GET_ARTICLES_SUCCESS:
      const { link } = action.payload
      let linkData = getLinkData(link)
      let total = action.total
      if (linkData['last']) {
        total = linkData['last'].page * linkData['last'].per_page
      } else if (linkData['prev']) {
        total = linkData['prev'].page * linkData['prev'].per_page + Number(linkData['prev'].per_page)
      }
      return {
        ...state,
        articles: {
          data: action.payload.data,
          pagination: {
            current: action.payload.current,
            pageSize: action.payload.pageSize,
            total,
          },
        },
        loading: false,
      }
    case ActionTypes.GET_ARTICLES:
      return {
        ...state,
        loading: true,
      }
    case ActionTypes.GET_ARTICLES_FAILED:
      return {
        ...state,
        loading: false,
      }
    default:
      return state
  }
}

function getLinkData(link) {
  let pagedata = {}
  link.split(',').forEach(element => {
    let temp = element.split('?')[1].split(';')
    let key = temp[1].split('=')[1].replace(/"/g,"")
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

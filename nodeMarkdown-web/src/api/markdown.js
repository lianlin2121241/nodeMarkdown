import axiosInstance from '../assets/http'

export default {
  createMarkdown (obj) {
    return axiosInstance.post('/createMarkdown', {
      title: obj.title
    })
  },
  saveMarkdown (obj) {
    return axiosInstance.post('/saveMarkdown', {
      title: obj.title,
      content: obj.content
    })
  },
  queryMarkdownList () {
    return axiosInstance.post('/queryMarkdownList', {})
  },
  getMarkdownByTitle (data) {
    return axiosInstance.post('/getMarkdownByTitle', {
      title: data.title
    })
  }
}

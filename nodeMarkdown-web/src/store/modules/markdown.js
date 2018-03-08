import markdown from '../../api/markdown'

const state = {
  markdown: {
    title: '',
    content: '',
    saveResult: null
  },
  markdownList: [],
  createMarkdownResult: null
}

const getters = {
}

const actions = {
  createMarkdown: async ({ commit, dispatch, state }, obj) => {
    const responseResult = await markdown.createMarkdown(obj)
    if (responseResult.data.success) {
      commit('setNewMarkdown', obj)
    }
    commit('createMarkdown', responseResult.data)
  },
  saveMarkdown: async ({ commit, dispatch, state }) => {
    const responseResult = await markdown.saveMarkdown({
      title: state.markdown.title,
      content: state.markdown.content
    })
    if (responseResult.data.success) {
      commit('saveMarkdownResult', responseResult.data)
    }
  },
  queryMarkdownList: async ({ commit, dispatch, state }) => {
    const responseResult = await markdown.queryMarkdownList()
    if (responseResult.data.success) {
      commit('setMarkdownList', responseResult.data.data)
    }
  },
  getMarkdownByTitle: async ({ commit, dispatch, state }) => {
    const responseResult = await markdown.getMarkdownByTitle({
      title: state.markdown.title
    })
    if (responseResult.data.success) {
      commit('setNewMarkdownContent', responseResult.data.data)
    }
  }
}

const mutations = {
  createMarkdown (state, data) {
    state.createMarkdownResult = data
  },
  setNewMarkdown (state, data) {
    state.markdown.title = data.title
  },
  setNewMarkdownContent (state, data) {
    state.markdown.content = data
  },
  saveMarkdownResult (state, data) {
    state.markdown.saveResult = data
  },
  setMarkdownList (state, data) {
    state.markdownList = data
  },
  resetCreateMarkdownResult (state) {
    state.createMarkdownResult = null
  },
  resetMarkdownState (state) {
    state.markdown.saveResult = null
    state.markdown.content = ''
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}

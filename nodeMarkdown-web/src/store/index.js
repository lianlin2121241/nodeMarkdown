import Vue from 'vue'
import Vuex from 'vuex'
import markdown from './modules/markdown'
import createLogger from 'vuex/dist/logger'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    markdown
  },
  strict: false,
  plugins: debug ? [createLogger()] : []
})

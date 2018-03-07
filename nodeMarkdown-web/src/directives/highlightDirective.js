import vue from 'vue'
import Prism from 'prismjs'

vue.directive('highlight', {
  bind: function (el, binding, vnode) {
  },
  componentUpdated: function (el, binding, vnode) {
    // console.log(el, binding, vnode)
    el.querySelectorAll('pre code').forEach(function (ele) {
      Prism.highlightElement(ele)
    })
  },
  unbind: function (el) {
  }
})

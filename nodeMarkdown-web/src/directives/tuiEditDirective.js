import vue from 'vue'
import TuiEditor from 'tui-editor/dist/tui-editor-Editor-all'
import 'codemirror/lib/codemirror.css'
import 'tui-editor/dist/tui-editor.css'
import 'tui-editor/dist/tui-editor-contents.css'
import 'tui-color-picker/dist/tui-color-picker.css'
import 'highlight.js/styles/github.css'

vue.directive('tuiEdit', {
  bind: function (el, binding, vnode) {
    vnode.context.editor = new TuiEditor(Object.assign({
      el: el,
      initialEditType: 'markdown',
      previewStyle: 'vertical',
      height: '300px',
      language: 'zh_CN'
    }, binding.value))
  },
  componentUpdated: function (el, binding, vnode) {
    console.log('componentUpdated')
  },
  unbind: function (el) {
    console.log('unbind')
  }
})

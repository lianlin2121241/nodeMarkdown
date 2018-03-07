<template>
  <div class="edit-wrap">
    <el-row>
      <el-col :span="12">
        <codemirror v-model='code' style='height:100%' :options='cmOptions' @ready='onCmReady' @focus='onCmFocus' @input='onCmCodeChange'></codemirror>
      </el-col>
      <el-col :span="12">
        <div class="markdown-body" v-highlight v-html='markedCode'></div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { codemirror } from 'vue-codemirror'
import marked from 'marked'
// import Prism from 'prismjs'
import '../directives/highlightDirective'
import 'github-markdown-css/github-markdown.css'
import 'codemirror/lib/codemirror.css'
import 'prismjs/themes/prism.css'
export default {
  name: 'markdownEdit',
  data () {
    return {
      code: 'const a = 10',
      cmOptions: {
        tabSize: 4,
        mode: 'markdown',
        theme: 'base16-dark',
        lineNumbers: true,
        line: true
      }
    }
  },
  methods: {
    onCmReady (cm) {
      console.log('the editor is readied!', cm)
    },
    onCmFocus (cm) {
      console.log('the editor is focus!', cm)
    },
    onCmCodeChange (newCode) {
      console.log('this is new code', newCode)
      this.code = newCode
    }
  },
  computed: {
    markedCode () {
      return marked(this.code)
      /* .replace(this.reg, function (sr, $1, $2, $3, $4) {
        return $1 + Prism.highlight($2, Prism.languages.javascript) + $4
      }) */
    }
  },
  created () {
    this.reg = new RegExp('(<pre><code>)((.*\\n)*?)(</code></pre>)', 'g')
  },
  mounted () {
    var markedRender = new marked.Renderer()
    marked.setOptions({
      renderer: markedRender,
      gfm: true,
      tables: true,
      breaks: true,
      pedantic: false,
      sanitize: true,
      smartLists: true,
      smartypants: false
    })
    console.log('this is current codemirror object', this.codemirror)
  },
  components: {
    codemirror
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.el-row{
  margin-bottom: 0px;
  height: 100%;
}
.edit-wrap,
.el-row .el-col{
  height: 100%;
}
.el-row .el-col .CodeMirror,
.el-row .el-col .markdown-body {
    font-size: 18px;
    height: 100%;
}
.el-row .el-col .markdown-body {
    border-left: 1px solid #cccccc;
    padding: 20px;
    overflow: auto;
}
</style>

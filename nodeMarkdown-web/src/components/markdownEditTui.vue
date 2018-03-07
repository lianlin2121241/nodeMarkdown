<template>
  <div class="edit-panel">
    <div class="edit-header">
      <label class="title">{{title}}</label>
      <el-button type="primary" size="medium" @click="save">保存文件</el-button>
    </div>
    <div v-tui-edit="options" ></div>
  </div>
</template>

<script>
import '../directives/tuiEditDirective'
import { mapState } from 'vuex'
export default {
  name: 'markdownEditTui',
  computed: {
    ...mapState({
      title: state => state.markdown.markdown.title,
      content: state => state.markdown.markdown.content,
      saveResult: state => state.markdown.markdown.saveResult
    })
  },
  created () {
    this.$store.dispatch('getMarkdownByTitle')
    this.$store.commit('resetMarkdownState')
  },
  data () {
    return {
      options: {
        initialEditType: 'markdown',
        previewStyle: 'vertical',
        height: 'calc(100% - 50px)',
        useCommandShortcut: true,
        exts: ['scrollSync', 'colorSyntax', 'uml', 'chart', 'mark', 'table', 'taskCounter']
      }
    }
  },
  methods: {
    save () {
      this.fileContent = this.editor.getValue()
      this.$store.commit('setNewMarkdownContent', this.fileContent)
      this.$store.dispatch('saveMarkdown')
      console.log(this.fileContent)
    }
  },
  watch: {
    saveResult: {
      handler (newValue, oldValue) {
        if (newValue) {
          this.$message({
            showClose: true,
            message: '保存成功',
            type: 'success'
          })
          this.$router.push({path: '/markdownList'})
        }
      },
      deep: true
    },
    content: {
      handler (newValue, oldValue) {
        if (newValue) {
          this.editor.setValue(newValue)
        }
      },
      deep: true
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.edit-panel{
  height: 100%;
}
.edit-header{
  height: 50px;
  line-height: 50px;
}
.edit-header .title{
  font-family: \5FAE\8F6F\96C5\9ED1;
  font-size: 20px;
  margin-left: 20px;
}
.edit-header .el-button{
  float: right;
  margin-top: 7px;
  margin-right: 10px;
}
</style>

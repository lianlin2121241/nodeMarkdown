<template>
  <div class="create-wrap">
    <button type="button" class="btn btn-info newFile" @click="dialogFormVisible = true">新建md文件</button>
    <el-dialog title="新建md文件" width="600px" :visible.sync="dialogFormVisible">
      <el-form :model="form" :rules="rules" ref="ruleForm" label-width="100px">
        <el-form-item label="文件名称：" prop="mdName">
          <el-input v-model="form.mdName" @keyup.enter="newFile()" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="newFile()">确 定</el-button>
      </div>
    </el-dialog>
    <el-table
      :data="markdownList"
      style="width: 100%;padding:0px 15px;">
      <el-table-column
        label="文件名">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="大小">
        <template slot-scope="scope">
          <span>{{ scope.row.size | addUnit }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="修改日期">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span>{{ scope.row.mtime | formatDate('yyyy-MM-dd hh:mm:ss')}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作"
        width="280">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          <el-button
            size="mini"
            type="success"
            @click="handleDownload(scope.$index, scope.row)">下 载</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import axiosInstance from '../assets/http'
import config from '../config'
import '../filters'
export default {
  name: 'markdownNewFile',
  data () {
    return {
      dialogFormVisible: false,
      form: {
        mdName: ''
      },
      rules: {
        mdName: [
          { required: true, message: '请输入文件名称', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    this.$store.commit('resetCreateMarkdownResult')
    this.$store.dispatch('queryMarkdownList')
  },
  computed: {
    ...mapState({
      createMarkdownResult: state => state.markdown.createMarkdownResult,
      markdownList: state => state.markdown.markdownList
    })
  },
  methods: {
    newFile: function () {
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          this.$store.dispatch('createMarkdown', {
            title: this.form.mdName
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    handleEdit: function (index, row) {
      let fileName = row.name.substring(0, row.name.lastIndexOf('.'))
      this.$store.commit('setNewMarkdown', {
        title: fileName
      })
      this.$router.push({path: '/markdownEditTui'})
    },
    handleDownload: function (index, row) {
      let fileName = row.name
      window.open(config.baseUrl + '/downMarkdown?fileName=' + fileName)
    },
    handleDelete: function (index, row) {
      let fileName = row.name.substring(0, row.name.lastIndexOf('.'))
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        axiosInstance.post('/deleteMarkdownByTitle', {
          title: fileName
        }).then((response) => {
          if (response.data.success) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.$store.dispatch('queryMarkdownList')
          }
        })
      })
    }
  },
  watch: {
    createMarkdownResult: {
      handler (newValue, oldValue) {
        if (newValue && newValue.success) {
          this.$router.push({path: '/markdownEditTui'})
        } else {
          this.$message({
            showClose: true,
            type: 'error',
            message: newValue.message
          })
        }
      },
      deep: true
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.newFile{
  margin:20px;
}
</style>

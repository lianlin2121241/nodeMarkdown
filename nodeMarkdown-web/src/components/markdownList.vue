<template>
  <div class="create-wrap">
    <button type="button" class="btn btn-info newFile" @click="dialogFormVisible = true">新建md文件</button>
    <el-dialog title="新建md文件" :visible.sync="dialogFormVisible">
      <el-form :model="form"  label-width="100px">
        <el-form-item label="文件名称：">
          <el-input v-model="form.mdName" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="newFile()">确 定</el-button>
      </div>
    </el-dialog>
    <el-table
      :data="markdownList"
      style="width: 100%">
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
        width="180">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import axiosInstance from '../assets/http'
import '../filters'
export default {
  name: 'markdownNewFile',
  data () {
    return {
      dialogFormVisible: false,
      form: {
        mdName: ''
      }
    }
  },
  created () {
    this.$store.commit('distroyNewFile')
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
      this.dialogFormVisible = false
      this.$store.dispatch('createMarkdown', {
        title: this.form.mdName
      })
    },
    handleEdit: function (index, row) {
      let fileName = row.name.substring(0, row.name.lastIndexOf('.'))
      this.$store.commit('setNewMarkdown', {
        title: fileName
      })
      this.$router.push({path: '/markdownEditTui'})
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
        if (newValue) {
          this.$router.push({path: '/markdownEditTui'})
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

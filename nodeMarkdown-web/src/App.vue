<template>
  <div id="app">
    <el-container>
      <el-header height="60px" >
        MarkdownPad
      </el-header>
      <el-main>
        <router-view/>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
html,
body,
#app,
.el-container{
  height: 100%;
}
.el-header{
  line-height: 60px;
  font-family: \5FAE\8F6F\96C5\9ED1;
  font-size: 30px;
  border-bottom: 1px solid #cccccc;
}
.el-main{
  padding: 0px;
  height: calc( 100% - 60px )
}
</style>

import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import markdownList from '@/components/markdownList'
import markdownEdit from '@/components/markdownEdit'
import markdownEditTui from '@/components/markdownEditTui'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/markdownList',
      name: 'markdownList',
      component: markdownList
    },
    {
      path: '/markdownEdit',
      name: 'markdownEdit',
      component: markdownEdit
    },
    {
      path: '/markdownEditTui',
      name: 'markdownEditTui',
      component: markdownEditTui
    }
  ]
})

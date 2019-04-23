import Vue from 'vue'
import Router from 'vue-router'
import register from '@/views/register'
import login from '@/views/login'
import home from '@/views/home'
import recommend from '@/views/recommend'
import publish from '@/views/publish'
import tag from '@/views/tag'
import tagDetail from '@/views/tagDetail'
import userManage from '@/views/userManage'
import admin from '@/views/admin'
import index from '@/views/index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/admin',
      name: 'admin',
      component: admin
    },
    // {
    //   path: '/',
    //   name: 'login',
    //   component: login
    // },
    {
      path: '/',
      name: 'login',
      component: index,
      children: [
        { path: '/', component: login, name: 'login'},
        { path: '/login', component: login, name: 'login'},
        { path: '/register', component: register, name: 'register'},
        { path: '/home', component: home, name: 'home'},
        { path: '/recommend', component: recommend, name: 'recommend'},
        { path: '/publish', component: publish, name: 'publish'},
        { path: '/tag', component: tag, name: 'tag'},
        { path: '/tagDetail', component: tagDetail, name: 'tagDetail'},
        { path: '/userManage', component: userManage, name: 'userManage'}
     ]
   }
  ]
})

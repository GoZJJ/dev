import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/views/layout/Index.vue'
import Login from '@/views/login/Index.vue'
import Home from '@/views/home/Home.vue'
//异步加载的形式定义组件
//商品管理
const Product = () => import("@/views/product/Index.vue")
const List = () => import("@/views/product/list/Index.vue")
const Category = () => import("@/views/product/category/Index.vue")
const ProductPage = () => import("@/views/product/list/ProductPage.vue")

//会员管理
const User = () => import("@/views/user/Index.vue")
const Userlist = () => import("@/views/user/list/Index.vue")
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Layout,
    children: [{
      path: '/',
      name: 'home',
      component: Home
    },
    //商品管理 
    {
      path: '/product',
      name: 'product',
      component: Product,
      children: [{
        path: 'list',
        name: 'list',
        component: List
      }, {
        path: 'category',
        name: 'category',
        component: Category
      }, {
        path: 'product-page',
        name: 'ProductPage',
        component: ProductPage,
        meta: {
          activeMenu: '/product/list'
        }
      }]
    },
    //会员管理
    {
      path: '/user',
      name: 'user',
      component: User,
      children: [{
        path: '',
        name: 'userlist',
        component: Userlist
      }]

    }]
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

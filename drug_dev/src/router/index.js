import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/views/layout/Index.vue'
import Login from '@/views/login/Index.vue'
import Home from '@/views/home/Home.vue'
import api from '@/api/index.js'
//异步加载的形式定义组件
//商品管理
const Product = () => import("@/views/product/Index.vue")
const List = () => import("@/views/product/list/Index.vue")
const Category = () => import("@/views/product/category/Index.vue")
const ProductPage = () => import("@/views/product/list/ProductPage.vue")

//会员管理
const User = () => import("@/views/user/Index.vue")
const Userlist = () => import("@/views/user/list/Index.vue")
const UserPage = () => import("@/views/user/list/UserPage.vue")

//订单管理
const Order = () => import("@/views/order/Index.vue")
const Orderlist = () => import("@/views/order/list/Index.vue")
//评论管理
const Comment = () => import("@/views/comment/Index.vue")
const Commentlist = () => import("@/views/comment/list/Index.vue")
//地区管理
const Address = () => import("@/views/address/Index.vue")
const Addresslist = () => import("@/views/address/category/Index.vue")
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
      }, {
        path: 'user-page',
        name: 'UserPage',
        component: UserPage,
        meta: {
          activeMenu: '/user'
        }
      }]

    },
    //订单管理
    {
      path: '/order',
      name: 'order',
      component: Order,
      children: [{
        path: '',
        name: 'orderlist',
        component: Orderlist
      }]

    },//评论管理
    {
      path: '/comment',
      name: 'comment',
      component: Comment,
      children: [{
        path: '',
        name: 'commentlist',
        component: Commentlist
      }]

    },//地区管理
    {
      path: '/address',
      name: 'address',
      component: Address,
      children: [{
        path: '',
        name: 'addresslist',
        component: Addresslist
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
router.beforeEach((to, from, next) => {
  api.userIsOnline().then((res) => {
    if (to.path == "/login") {
      // res.data.map.code == 1 在线
      if (res.data.map.code == 1) {
        next("/")
      }
      next()
    } else {
      if (res.status == 200) {
        //console.log(res.data.map.code)
        // res.data.map.code == 0 不在线
        if (res.data.map.code == 0) {
          next("/login")
        } else {
          if (to.path == "/login") {
            next("/")
          } else {
            next()
          }
        }
      } else {
        next("/login")
      }
    }
  })



})

export default router

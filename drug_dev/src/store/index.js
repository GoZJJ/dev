import Vue from 'vue'
import Vuex from 'vuex'
import product from './modules/product'
import createPersistedstate from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    product
  },
  plugins: [ //vuex 插件 数组语法 多个插件名称
    createPersistedstate({
      key: 'info', //存储vuex数据的任意键名--本地存储里面 localStore
      paths: ["product"] //存储的模块名称一级全局state数据 不写默认存储所有内容
    })
  ]
})

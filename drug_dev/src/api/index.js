//公共请求方法
import base from "@/api/base.js";
import axios from "@/utils/request.js"

const api = {
  // 首页数据统计接口
  totalInfo() {
    return axios.get(base.totalInfo);
  },

  //用户管理接口
  selectUserAdmin(form, pages) {
    return axios.get(base.selectUserAdmin, {
      params: {
        queryKey: form.queryKey,
        current: pages.current,
        size: pages.pageSize
      }
    })
  },
  deleteUserAdmin(ids) {
    return axios.delete(base.deleteUserAdmin, {
      params: {
        ids
      }
    })
  },


  //商品管理接口
  selectGoodsAdmin(form, pages) {
    return axios.get(base.selectGoodsAdmin, {
      params: {
        queryKey: form.queryKey,
        current: pages.current,
        size: pages.pageSize
      }
    });
  },
  deleteGoodsAdmin(ids) {
    return axios.delete(base.deleteGoodsAdmin, {
      params: {
        ids
      }
    })
  },
  addGoodsAdmin(goods) {
    return axios.post(base.addGoodsAdmin, {
      goods
    })
  },
  updateGoodsAdmin(goods) {
    return axios.put(base.updateGoodsAdmin, {
      goods
    })
  },


  //商品类别接口
  selectGoodsCategoryAdmin() {
    return axios.get(base.selectGoodsCategoryAdmin)
  },
  updateGoodsCategoryAdmin(goodsCategory) {
    return axios.put(base.updateGoodsCategoryAdmin, {
      goodsCategory
    })
  },
  addGoodsCategoryAdmin(goodsCategory) {
    return axios.post(base.addGoodsCategoryAdmin, {
      goodsCategory
    })
  },
  deleteGoodsCategoryAdmin(id) {
    return axios.delete(base.deleteGoodsCategoryAdmin, {
      params: {
        id: id,
      }
    })
  },
  addGoodsCategoryOneLevel(goodsCategory) {
    return axios.post(base.addGoodsCategoryOneLevel, {
      goodsCategory
    })
  },

  //地区接口
  selectAddressAdmin() {
    return axios.get(base.selectAddressAdmin)
  },
  updateAddressAdmin(address) {
    return axios.put(base.updateAddressAdmin, {
      address
    })
  },
  addAddressAdmin(address) {
    return axios.post(base.addAddressAdmin, {
      address
    })
  },
  deleteAddressAdmin(id) {
    return axios.delete(base.deleteAddressAdmin, {
      params: {
        id: id,
      }
    })
  },
  addAddressOneLevel(address) {
    return axios.post(base.addAddressOneLevel, {
      address
    })
  },

  //添加图片接口
  addGoodsImg(file) {
    return axios.post(base.addGoodsImg, {
      params: {
        file: file,
      }
    })
  },
  userIsOnline() {
    return axios.get(base.userIsOnline, { withCredentials: true })
  },
  //登录接口
  login(form) {
    return axios.post(base.login, {
      number: form.username,
      password: form.password
    });
  }
}

export default api
//公共请求方法
import base from "@/api/base.js";
import axios from "@/utils/request.js"

const api = {
  // 首页数据统计接口
  totalInfo() {
    return axios.get(base.totalInfo);
  },
  //后端查询商品接口
  selectGoodsAdmin(form, pages) {
    return axios.get(base.selectGoodsAdmin, {
      params: {
        queryKey: form.queryKey,
        current: pages.current,
        size: pages.pageSize
      }
    });
  },
  //后端查询用户接口
  selectUserAdmin(form, pages) {
    return axios.get(base.selectUserAdmin, {
      params: {
        queryKey: form.queryKey,
        current: pages.current,
        size: pages.pageSize
      }
    })
  },
  //后端删除用户接口
  deleteUserAdmin(ids) {
    return axios.delete(base.deleteUserAdmin, {
      params: {
        ids
      }
    })
  },
  //后端删除商品接口
  deleteGoodsAdmin(ids) {
    return axios.delete(base.deleteGoodsAdmin, {
      params: {
        ids
      }
    })
  },
  //后端增加商品接口
  addGoodsAdmin(goods) {
    console.log(goods)
    return axios.post(base.addGoodsAdmin, {
      goods
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
  //登录接口
  login(form) {
    return axios.post(base.login, {
      number: form.username,
      password: form.password
    });
  }
}

export default api
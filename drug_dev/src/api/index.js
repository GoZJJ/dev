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
  selectUserAdmin(form, pages) {
    return axios.get(base.selectUserAdmin, {
      params: {
        queryKey: form.queryKey,
        current: pages.current,
        size: pages.pageSize
      }
    })
  },
  deleteUserAdmin(id) {
    return axios.delete("/api/admin/deleteUserById", {
      params: {
        id: id,
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
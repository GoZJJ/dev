//公共请求方法
import base from "@/api/base.js";
import axios from "axios"

const api = {
  // 首页数据统计接口
  totalInfo() {
    return axios.get(base.totalInfo);
  },
  selectGoodsAdmin(form) {
    return axios.get(base.selectGoodsAdmin, {
      params: {
        queryKey: form.queryKey
      }
    });
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
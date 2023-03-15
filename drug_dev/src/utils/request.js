import axios from "axios";
import qs from 'querystring'
import router from '@/router'
const instance = axios.create({
  timeout: 5000,
})
//请求拦截器
instance.interceptors.request.use(function (config) {
  return config;
}, function (error) {
  // console.log("axios.interceptors request error", error);
  return Promise.reject(error);
});
//响应拦截器

instance.interceptors.response.use(
  function (response) {
    //console.log("axios.interceptors response", response);
    // if (response.data.msg == "请先登录后再操作！") {
    //   router.push("/login")
    // }
    return response;
  }, function (error) {
    console.log("axios.interceptors response error", error, error.message);
    if (error.message === "Request failed with status code 500") {
      return "无法连接服务器，请检查您的网络连接"
    } else if (error.message.indexOf("timeout of") > -1) {
      return "客户端请求超时"
    } else {
      return "未收到响应"
      // return Promise.reject("未收到响应");
    }
  }
);
export default instance;
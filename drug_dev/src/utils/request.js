import axios from "axios";
import qs from 'querystring'
const instance = axios.create({
  timeout: 5000,
})
instance.interceptors.request.use(function (config) {

})
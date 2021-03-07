/**
 * 使用 axios 封装的 ajax 请求函数 函数返回的是 promise 对象(异步返回的是response.data)
 * */

import axios from 'axios'
import {store} from "../store";
import {getters} from "../store/getters";
const debug = require('../../config/debug')


axios.defaults.timeout = 5000;
axios.defaults.baseURL=`${debug.servers}/`;


const {isLogin, token} = getters;
export default function ajax(url, data={}, type='GET') {

  return new Promise(function (resolve,reject) {

    let promise
    if(type === 'GET') { //GET请求
      let paramStr = ''
      Object.keys(data).forEach(key => {
        paramStr += `${key}=${data[key]}&`
      })
      if(paramStr) {
        paramStr = paramStr.substring(0,paramStr.length-1)
      }
      let httpUrl = `${url}?${paramStr}`
      promise = axios.get(httpUrl)
    } else {
      // 发送 post 请求
      promise = axios.post(url, data)// data: 包含请求体数据的对象
    }
    promise.then(function (response) {
      if (isLogin) {
        axios.defaults.headers.common['Authorization'] = token;
      }
      resolve(response)
    }).catch(function (error) {
      reject(error)
    })
  })
}


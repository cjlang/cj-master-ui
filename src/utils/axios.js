import axios from 'axios'
import { Message } from 'element-ui'
import { MessageBox } from 'element-ui'
import { getToken,getSid} from '@/utils/auth'
import router from '@/router'
import { store } from '@/store'

/**
 * 统一进行异常输出
 * 如果异常只是弹框显示即可，可使用该实例
 */
const httpCustom = axios.create({
  timeout: 1000 * 120,
  withCredentials: true,
  baseURL:'/api',
  headers: {
    'Content-Type': 'application/json; charset=utf-8'
  }
})

/**
 * 自定义请求拦截
 */
httpCustom.interceptors.request.use(config => {
  config.headers[window.global.tokenKey||store.state.sys.tokenKey] = getToken() // 请求头带上token
  config.headers[window.global.sidKey||store.state.sys.tokenKey] = getSid()
  config.params = {
    _t: Date.parse(new Date()) / 1000,
    ...config.params
  }
  return config
}, error => {
  return Promise.reject(error)
})

/**
 * get请求
 * @param url
 * @param params
 * @returns {Promise<any>}
 */
export function get(url, params = {}) {
  return new Promise((resolve, reject) => {
    httpCustom.get(url, {
      params: params
    }).then(response => {
      resolve(response)
    }).catch(err => {
      reject(err)
    })
  })
}


/**
 * post 请求
 * @param url
 * @param params
 * @returns {Promise<any>}
 */
export function post(url, data = {}) {
  data = JSON.stringify(data)
  return new Promise((resolve, reject) => {
    httpCustom.post(url, data).then(response => {
      resolve(response)
    }).catch(err => {
      reject(err)
    })
  })
}

/**
 * delete 请求
 * @param url
 * @param data
 * @returns {Promise<any>}
 */
export function del(url, data = {}) {
  data = JSON.stringify(data)
  return new Promise((resolve, reject) => {
    httpCustom.delete(url, {data:data}).then(response => {
      resolve(response)
    }).catch(err => {
      reject(err)
    })
  })
}

/**
 * put 请求
 * @param url
 * @param data
 * @returns {Promise<any>}
 */
export function put(url, data = {}) {
  data = JSON.stringify(data)
  return new Promise((resolve, reject) => {
    httpCustom.put(url, data).then(response => {
      resolve(response)
    }).catch(err => {
      reject(err)
    })
  })
}

/**
 * 包装uri地址
 * @param url
 * @returns {*}
 */
export function wrapUrl(url) {
  return url
}

/**
 * 响应拦截
 */
httpCustom.interceptors.response.use(response => {
  const res = response.data
  if(res.code=='200'){
    if(!store.state.sys.isShowReLogin){
      store.commit('sys/set_isShowReLogin',false);
    }
    return res.data
  }else if(res.code=='-9')
  {
    if(!store.state.sys.isShowReLogin){
      store.commit('sys/set_isShowReLogin',true);
      MessageBox.confirm('您当前登录已失效，请重新登录?', '登录异常', {
        confirmButtonText: '移步登录页面',
        cancelButtonText: '不了',
        showClose:false,
        type: 'error',
        center: true
      }).then(() => {
        router.replace('/relogin')
      }).catch(() => {
      });
    }
    
  }else if(res.code=='-110')
  {
    Message({
      message: response.data.msg,
      type: 'error',
      duration: 5 * 1000
    })
  }
},
error => {
  if (error.response.status == '400') {
    Message({
      message: '400错误请求：'+JSON.stringify(error.response),
      type: 'error',
      duration: 5 * 1000
    })
  } else if (error.response.status == '404') {
    Message({
      message: '404访问的资源不存在，请联系管理员！',
      type: 'error',
      duration: 5 * 1000
    })
  } else if (error.response.status == '500') {
    Message({
      message: `500服务器故障，请联系管理员！`,
      type: 'error',
      duration: 5 * 1000
    })
  } else {
    Message({
      message: error.response.status+`未知异常，请联系管理员！`,
      type: 'error',
      duration: 5 * 1000
    })
  }
  return Promise.reject(error)
})

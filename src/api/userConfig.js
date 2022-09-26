/**封装一些通用的接口,避免重复书写 */
import {post} from '@/utils/axios.js'

export function saveUserConfig(params,callback){
  post("/userconfig/sync",params).then((data) => {
      callback(data)
  });
}
export function getUserConfig(params,callback){
  post("/userconfig/list",params).then((data) => {
      callback(data)
  });
}
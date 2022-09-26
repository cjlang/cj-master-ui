/**封装一些通用的接口,避免重复书写 */
import {post} from '@/utils/axios.js'
import { store } from '@/store'
import EventBus from '@/utils/eventbus.js'

export function initGlobalData(){
  getGlobalConfig({groupName:'system',configName:'loginBg'},function(data){
    if(data!=null && data!='' && data.length>0){
      store.commit('sys/set_loginBg', data[0].configValue);
      EventBus.$emit('change-login-image',data[0].configValue);
    }
    
  })
}
export function saveGlobalConfig(params,callback){
  post("/globalconfig/sync",params).then((data) => {
      callback(data)
  });
}
export function getGlobalConfig(params,callback){
  post("/globalconfig/list",params).then((data) => {
      callback(data)
  });
}
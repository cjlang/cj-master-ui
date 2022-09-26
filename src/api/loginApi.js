import { post } from '@/utils/axios.js'
/**
 * 登录系统
 * @param {*} params 
 * @param {*} callback 
 */
export function login(params,callback){
    post("/sys/login", params).then((data) => callback(data));
}
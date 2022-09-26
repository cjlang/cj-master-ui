import { post } from '@/utils/axios.js'

export function getMenu(params,callback){
    post("/cjmenu/treelist", params).then((data) => callback(data));
}
export function addMenu(params,callback){
    post("/cjmenu/add", params).then((data) => callback(data));
}
export function updateMenu(params,callback){
    post("/cjmenu/update", params).then((data) => callback(data));
}
export function delMenu(params,callback){
    post("/cjmenu/del", params).then((data) => callback(data));
}
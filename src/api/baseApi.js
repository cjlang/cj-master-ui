import { post } from '@/utils/axios.js'

const baseapi={
    list:(tablename,params,callback)=>{post("/"+tablename+"/list", params).then((data) => callback(data))},
    pagelist:(tablename,params,callback)=>{post("/"+tablename+"/pagelist", params).then((data) => callback(data))},
    add:(tablename,params,callback)=>{post("/"+tablename+"/add", params).then((data) => callback(data))},
    update:(tablename,params,callback)=>{post("/"+tablename+"/update", params).then((data) => callback(data))},
    del:(tablename,params,callback)=>{post("/"+tablename+"/del", params).then((data) => callback(data))}
}
export default baseapi
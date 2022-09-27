import { post } from '@/utils/axios.js'

const menuapi={
    treelist:(tablename,params,callback)=>{post("/"+tablename+"/treelist", params).then((data) => callback(data))}
}
export default menuapi
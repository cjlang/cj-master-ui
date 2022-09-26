import Vue from 'vue'
import VueRouter from 'vue-router'
import publicRoutes from '@/router/public_route.js'
import privateRoute from '@/router/private_route.js'
import { store } from '@/store'
Vue.use(VueRouter)

// 解决重复点击路由报错的BUG
const originalReplace = VueRouter.prototype.replace
VueRouter.prototype.replace = function replace (location) {
  return originalReplace.call(this, location).catch((err) => err)
}
// 解决重复点击路由报错的BUG
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch((err) => err)
}
// 合并两个路由
const routes = [...privateRoute,...publicRoutes]

const router = new VueRouter({
  //mode: 'history',
  base: '/web/',
  routes
})

/// /////////////////////////////////////////////////////////////////
/*
1、无需登录的，可直接跳转。
2、需要登录的，检测token是否存在。
3、动态菜单路由的，也在这里加载，前提是登录以后再加载。
*/

/** 前置守卫，判断是否登录 */

router.beforeEach((to, from, next) => {
  //NProgress.start()
  console.log("====开始跳转====="+to.path );
  if(to.path=='/' || to.path=='/home' || to.path==from.path) //根路径，直接进入
  {
    next()
    return;
  }
  if(to.path=='/relogin') //需要重新登录
  {

    store.commit('window/remove_all',true);
    router.matcher = new VueRouter({routes:[...privateRoute,...publicRoutes]}).matcher;
    next('/')
    return;
  }
  //不是更路径，需要判断跳转的路由是否存在
  if (!hasRoute(to)) {
    if(store.state.window.winBox.length>0)
    {
      reFrashRoute(to,from,next)
    }else{
      //winbox没有数据，表示客户端是刷新的，直接跳转到home算了
      next('/home')
    }
    return
  }else{
    //虽然路径存在，但是对于的命名视图的name可能不对，再对比一下
    let res = store.state.window.winBox.find(item => '/home/'+item.urlPath==to.path);
    if('/home/'+store.state.window.routes.children[0].ww[res.WinId]!=to.path || '/home/'+store.state.window.routes.children[0].path!=to.path)
    {
      reFrashRoute(to,from,next)
      return
    }
  }
  next()
})
//刷新路由
function reFrashRoute(to,from,next){
  router.matcher = new VueRouter({routes:[addPreRouteToHome(from),...publicRoutes]}).matcher;
  var newRoute=addChildRouteToHome();
  store.commit('window/update_routes',newRoute);
  router.addRoute('/',newRoute)
  next({ ...to, replace: true })
}
//判断当前路由表是否有要跳转的路由
function hasRoute(to) {
  let find = router.getRoutes().find(item => item.path==to.path);
  return !!find;
}
//将所有子窗口路由都添加到home下面
export function addChildRouteToHome() {
  const temp_route = {
    path: '/home',
    name: 'home',
    component: resolve => require(['@/views/home/index.vue'], resolve),
    children: []
  }
  if(store.state.window.winBox.length>0)
  {
    temp_route.children.unshift(...configCurrentWindowRoute())
  }
  return temp_route
}

// 组装当前打开的窗口路由
function configCurrentWindowRoute () {
  const routeList = []
  const current_path = store.state.window.currentActiveWindowPath
  const temp_route = {
    path: current_path
  }
  let components = {}
  let keys={}
  store.state.window.winBox.forEach(item => {
    components[item.WinId] =  (resolve) => resolve(require('@/views/'+item.component))
    keys[item.WinId]=item.urlPath
  })
  temp_route.components = components
  temp_route.ww = keys
  routeList.push(temp_route)
  return routeList
}
/**
 * 需要将前一个路由也加入
 * @param {} from 
 * @returns 
 */
 function addPreRouteToHome(from) {
  const temp_route = {
    path: '/home',
    name: 'home',
    component: resolve => require(['@/views/home/index.vue'], resolve),
    children: []
  }
  if(store.state.window.winBox.length>0)
  {
    temp_route.children.unshift(...configPreChildRoute(from))
  }
  return temp_route
}
//配置前一个路由为当前路由
function configPreChildRoute (from) {
  const routeList = []
  const temp_route = {
    path: from.path
  }
  routeList.push(temp_route)
  return routeList
}

/// //////////////////////////////////////////////////////////////////////////

router.afterEach((to, from) => {
//  NProgress.done()
})

export default router

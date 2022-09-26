const state = {
  routes:'', /*当前所有窗口的路由*/
  winBox: [], /*当前所有窗口的数据配置*/
  windowThumb: [], /*当前所有窗口的缩略图数据*/
  winIndex: 1, /*当前所有窗口的索引，每打开一个就增加1*/
  currentActiveWindowPath: '', /*当前打开置顶的窗口的路径*/
  currentActiveWinId:'', /*当前打开窗口的ID*/
  currentActivemenuCode:'', /*当前打开窗口的菜单的ID*/
  desktopHeight:0,  /*当前桌面的高度*/
  desktopWidth:0,  /*当前桌面的宽度*/
  manualOrderIcon:0, /*桌面图标手动排序*/
  notifyNum:0,  /*消息中心通知的数量*/
  desktopMenu:[], /*桌面应用*/
  allMenu:[],   /*所有应用*/
  windowMaxNum:5
}

//很多时候还是使用同步模式较多
const mutations = {
  /**设置路由 */
  update_routes(state, obj){
    state.routes=obj;
  },
  /**初始化窗口，当前路径 */
  INIT (state, obj){
    state.winBox=obj.winBox
    state.winIndex = obj.winIndex
    state.currentActiveWindowPath = obj.currentActiveWindowPath
  },
  /**移除所有窗口 */
  remove_all (state, obj){
    state.routes=''
    state.winBox=[]
    state.desktopMenu=[]
    state.allMenu=[]
    state.winIndex = 1
    state.currentActiveWindowPath ='/'
    state.notifyNum=0
  },
  /**增加一个窗口 */
  add_window (state, box) {
      let temBox=state.winBox.filter(function (item) {
        return item.menuCode == box.menuCode
      })
      if(temBox.length==0)
      {
        state.winBox.push(box)
        state.winIndex = state.winIndex + 1
        state.currentActiveWindowPath = box.urlPath
        state.currentActivemenuCode=box.menuCode
      }
  },
  /**更新当前路由路径 */
  update_currentActiveWindowPath (state, path) {
      state.currentActiveWindowPath = path
  },
  /**移除其中一个窗口 */
  remove_window (state, winid) {
    state.winBox = state.winBox.filter(function (item) {
      return item.WinId != winid
    })
  },
  /**更新窗口为最小化状态 */
  update_window_status_min (state, winid) {
    for(var i=0;i<state.winBox.length;i++){
      if(state.winBox[i].WinId==winid){
        state.winBox[i].winStatus = 'MIN';
      }
    }
  },
  /**更新窗口为正常状态 */
  update_window_status_nomal (state, winid) {
    for(var i=0;i<state.winBox.length;i++){
      if(state.winBox[i].WinId==winid){
        state.winBox[i].winStatus = 'NOMAL';
      }
    }
  },
  /**更新窗口为做大花状态 */
  update_window_status_max (state, winid) {
    for(var i=0;i<state.winBox.length;i++){
      if(state.winBox[i].WinId==winid){
        state.winBox[i].winStatus = 'MAX';
      }
    }
  },
  /**更新图片地址 */
  update_windowThumb (state, obj) {
    let imgs = state.windowThumb.filter(function (item) {
      return item.WinId != obj.WinId
    })
    state.windowThumb=imgs;
    state.windowThumb.push(obj);
  },
  /**更新桌面大小 */
  update_desktop_size (state, obj) {
    state.desktopHeight=obj.height;
    state.desktopWidth=obj.width;
  },
  /**设置桌面图标自动排序 */
  update_manualOrderIcon (state, obj) {
    state.manualOrderIcon=obj;
  },
  /**更新通知中心通知数量 */
  update_notifyconter_num (state, num) {
    if(num==1)
    {
      state.notifyNum=state.notifyNum+1;
    }else if(num==0)
    {
      state.notifyNum=0
    }else if(num==-1)
    {
      state.notifyNum=state.notifyNum-1
    }
  },
  /**更新桌面APP应用 */
  update_desktop_menu (state, data) {
    state.desktopMenu=JSON.parse(JSON.stringify(data))
  },
  /**更新所有APP */
  update_all_menu (state, data) {
    state.allMenu=JSON.parse(JSON.stringify(data))
  },
  /**更新当前激活的APP的ID是谁 */
  update_current_active_window_id (state, winid) {
    state.currentActiveWinId=winid
    for(var i=0;i<state.winBox.length;i++){
      if(state.winBox[i].WinId==winid){
        state.currentActivemenuCode=state.winBox[i].menuCode
      }
    }
  },
  /**更新窗口URL的信息 */
  update_window_menu_routes_info(state, obj){
    for(var i=0;i<state.winBox.length;i++){
      if(state.winBox[i].WinId==obj.WinId){
        state.winBox[i].urlPath = obj.urlPath;
        state.winBox[i].component = obj.component;
      }
    }
    state.currentActiveWindowPath = obj.urlPath
  },
  /**更新窗口最大数量 */
  update_windowMaxNum(state, obj){
    state.windowMaxNum = obj
  }

  
  
}
//异步操作会导致很多问题，只有数据请求使用
const actions = {
  addBox ({ commit }, box) {
    commit('add_window', box)
  },
  removeBox ({ commit }, id) {
    commit('remove_window', id)
  }
}


export default {
  namespaced: true,
  state,
  mutations,
  actions
}

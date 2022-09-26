const state = {
  userInfo:'',
  tokenKey:'token',
  sidKey:'sid',
  //未登录的弹窗出来后，就不允许后面的再弹了
  isShowReLogin:false,
  //登录背景
  loginBg:1,
  //桌面背景
  deskTopBg:1,
  //桌面背景
  startMenuBg:1,
  /**全局主题色 */
  themeColor:'#409EFF',
  /**当前窗口顶部颜色 */
  topWindowColor:'rgba(0,122,255,0.8)',
  /**非置顶窗口颜色 */
  unActiveWindowColor:'rgba(8,8,8,0.8)',
  /**开始菜单存颜色 */
  startMenuPureColor:'0',
  startMenuLeftColor:'rgba(8,8,8,0.9)',
  startMenuCenterColor:'rgba(10,10,10,0.9)',
  startMenuRightColor:'rgba(10,10,10,0.9)',
  moreFuncColor:'rgba(0,0,0,0.9)',
  bottomTaskColor:'rgba(0,0,0,0.9)',
  noticePanelColor:'rgba(0,0,0,0.9)',


  //窗体大小相关
  windowSize:{
    height:600,
    width:960,
    minHeight:300,
    minWidth:460
  },

  desktopFilter:false,

  isOverDeskTop:true,
  taskNavMode:'nomal',

  contextMenuConfig:[
      {menuCode:'mysetting',menuName:'个人设置',sysWindow:1,urlPath:'mysetting',component:'sys/setting/myinfo.vue',icon:'gcwodegerenzhongxin',imgUrl:'2'},
      {menuCode:'systemsetting',menuName:'系统设置',sysWindow:1,urlPath:'systemsetting',component:'sys/setting/sysconfig/index.vue',icon:'gcscreen',imgUrl:'3'}
    ],
  startMenuFavoriteConfig:[
    [{ span: 16, menuName: '待办事项', imgUrl: require('@/assets/image/favorite/f1.png'), menuCode: '10007' }],
    [{ span: 8, menuName: '消息通知', imgUrl: require('@/assets/image/favorite/f2.png'), menuCode: '10007' }, { span: 16, menuName: '即使消息', imgUrl: require('@/assets/image/favorite/f1.png'), menuCode: '10007' }],
    [{ span: 16, menuName: '统计查询', imgUrl: require('@/assets/image/favorite/f1.png'), menuCode: '10007' }, { span: 8, menuName: '待办文件', imgUrl: require('@/assets/image/favorite/f2.png'), menuCode: '10007' }],
    [{ span: 8, menuName: '月度报告', imgUrl: require('@/assets/image/favorite/f2.png'), menuCode: '10007' }, {span:8},{ span: 8, menuName: '待办事项', imgUrl: require('@/assets/image/favorite/f2.png'), menuCode: '10007' }],
    [{ span: 8, menuName: '延迟审批', imgUrl: require('@/assets/image/favorite/f2.png'), menuCode: '10007' }, { span: 16, menuName: 'QQ', imgUrl: require('@/assets/image/favorite/f1.png'), menuCode: '10007' }]
  ],
  recycleBinId:'recycleBin100',

  iconData:[
    {id:1,icon:'\ue7e7'},
    {id:2,icon:'\uea12'},
    {id:3,icon:'\uea88'},
    {id:4,icon:'\ue77e'},
    {id:5,icon:'\ue8e1'},
    {id:6,icon:'\ue8e3'},
    {id:7,icon:'\ue9e6'},
    {id:8,icon:'\ue9e7'},
    {id:9,icon:'\ue7c2'},
    {id:10,icon:'\ueae9'},
    {id:11,icon:'\ue8ec'},
    {id:12,icon:'\ueaed'},
    {id:13,icon:'\uebee'},
    {id:14,icon:'\uecfd'},
    {id:15,icon:'\ue636'},
    {id:16,icon:'\uebdf'},
    {id:17,icon:'\ue8e6'},
    {id:18,icon:'\ue8ec'},
    {id:19,icon:'\ue8f2'},
    {id:20,icon:'\uecf5'}
  ],
  imgIconData:[
    {id:1,imgUrl:'1'},
    {id:2,imgUrl:'2'},
    {id:3,imgUrl:'3'},
    {id:4,imgUrl:'4'},
    {id:5,imgUrl:'5'},
    {id:6,imgUrl:'6'},
    {id:7,imgUrl:'7'},
    {id:8,imgUrl:'8'},
    {id:9,imgUrl:'9'},
    {id:10,imgUrl:'10'},
    {id:11,imgUrl:'11'},
    {id:12,imgUrl:'12'},
    {id:13,imgUrl:'13'},
    {id:14,imgUrl:'14'},
    {id:15,imgUrl:'15'},
    {id:16,imgUrl:'16'},
    {id:17,imgUrl:'17'},
    {id:18,imgUrl:'18'},
    {id:19,imgUrl:'19'},
    {id:20,imgUrl:'20'},
    {id:21,imgUrl:'21'},
    {id:22,imgUrl:'22'}
  ],
  windowSize2:[
    {menuCode:'10005',width:500,height:600,minWidth:400,minHeight:600},
    {menuCode:'10004',width:600,height:600,minWidth:400,minHeight:600},
    {menuCode:'systemsetting',width:850,height:600,minWidth:600,minHeight:400}
  ]
}

//很多时候还是使用同步模式较多
const mutations = {

  set_userInfo(state, data){
    localStorage.setItem("userInfo",JSON.stringify(data))
    state.userInfo=data;
  },
  set_isShowReLogin(state, data){
    state.isShowReLogin=data;
  },
  
  set_loginBg(state, data){
    state.loginBg=data;
  },
  set_deskTopBg(state, data){
    state.deskTopBg=data;
  },
  set_startMenuBg(state, data){
    state.startMenuBg=data;
  },
  set_themeColor(state, data){
    state.themeColor=data;
  },
  set_topWindowColor(state, data){
    state.topWindowColor=data;
  },
  set_unActiveWindowColor(state, data){
    state.unActiveWindowColor=data;
  },

  set_startMenuPureColor(state, data){
    state.startMenuPureColor=data;
  },
  

  set_startMenuLeftColor(state, data){
    state.startMenuLeftColor=data;
  },
  set_startMenuCenterColor(state, data){
    state.startMenuCenterColor=data;
  },
  set_startMenuRightColor(state, data){
    state.startMenuRightColor=data;
  },
  set_moreFuncColor(state, data){
    state.moreFuncColor=data;
  },
  set_bottomTaskColor(state, data){
    state.bottomTaskColor=data;
  },
  set_noticePanelColor(state, data){
    state.noticePanelColor=data;
  },
  set_windowSize(state, data){
    state.windowSize=JSON.parse(JSON.stringify(data));
  },
  set_desktopFilter(state, data){
    state.desktopFilter=data;
  },
  
  set_isOverDeskTop(state, data){
    state.isOverDeskTop=data;
  },
  set_taskNavMode(state, data){
    state.taskNavMode=data;
  },
  set_contextMenuConfig(state, data){
    state.contextMenuConfig=JSON.parse(JSON.stringify(data));
  },
  set_startMenuFavoriteConfig(state, data){
    state.startMenuFavoriteConfig=JSON.parse(JSON.stringify(data));
  },
  set_recycleBinId(state, data){
    state.recycleBinId=data;
  },
  set_windowSize2(state, data){
    state.windowSize2=JSON.parse(JSON.stringify(data));
  }
}
const actions = {
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}

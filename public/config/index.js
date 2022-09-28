/*
 * @Author: cjlang 759403090@qq.com
 * @Date: 2022-05-18 17:40:09
 * @LastEditors: cjlang 759403090@qq.com
 * @LastEditTime: 2022-09-27 17:37:17
 * @FilePath: /cj-master-ui/public/config/index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
(function (window) {
  window.global = {
    version: 'v1.0.0',
    title: 'CJ基础应用平台框架',
    tokenkey:'token',
    sidKey:'sid',
    // 默认主题色
    themeDefault: '#409EFF',
    //颜色配置
    colorConfig:{
      //开始菜单
      startMenuColor:{left:'rgba(8,8,8,0.9)',center:'rgba(10,10,10,0.9)',right:'rgba(10,10,10,0.9)'},
      //任务栏更多功能
      moreFuncColor:'rgba(0,0,0,0.9)',
      //底部任务栏颜色
      bottomTaskColor:'rgba(0,0,0,0.9)',
      //通知面板颜色
      noticePanelColor:'rgba(0,0,0,0.9)'
    },
    /**开始菜单是否纯颜色 */
    startMenuPureColor:'0',
    //拖动窗体，是否能超过桌面
    isOverDeskTop:false,
    //任务栏模式:nomal（全部显示），onlymin（只显示最小化的）
    taskNavMode:'nomal',
    //右键菜单
    contextMenuConfig:[],
    //开始菜单配置
    startMenuFavoriteConfig:[],
    //垃圾箱APP的ID
    recycleBinId:'recycleBin100',
    //激活窗口颜色
    topWindowColor:'#007aff',
    //未激活窗口顶部颜色
    unActiveWindowColor:'#505050',
    //窗口的默认值和最小值
    windowSize:{
      height:600,
      width:960,
      minHeight:300,
      minWidth:460
    },
    //有特殊窗口的，可单独设置大小,appID:{width,height}
    windowSize2:[]
  }

  window.initSysUrl = function (env) {
    window.global['baseUrl'] = 'http://192.168.3.205:9090/service'
  }
})(window)

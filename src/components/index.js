/*===============================================================*/
/*==========全局通用组建，不需要单个引用，自动加载，直接使用 ============*/
/*===============================================================*/
/*===============================================================*/
import Vue from 'vue'
// 查找当前目录下所有文件
const requireComponent = require.context('.', true, /\.vue$/)
// 遍历所有查找的组件
requireComponent.keys().forEach(fileName => {
  const config = requireComponent(fileName)
  // 获取组件名称
  const index = fileName.split('/').length
  fileName = fileName.split('/')[index - 1]
  // 名称不用做任何格式转换，直接文件名方式
  const componentName = fileName.replace(/^\.\//, '').replace(/\.\w+$/, '')
  Vue.component(componentName, config.default || config)
})

import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router'
import { store} from '@/store'
import ElementUI from 'element-ui'
import $ from 'jquery'
import 'jquery-ui-dist/jquery-ui'
import 'jquery-ui-dist/jquery-ui.min.css'
import html2canvas from "html2canvas"
import 'normalize.css/normalize.css'
import animate from 'animate.css'
import '@/assets/style/iconfont.css'
import '@/components/index.js'
import { initThemeColor } from '@/utils/theme.js'
import { get,post,put,del } from '@/utils/axios.js'
import baseapi from '@/api/baseApi.js'
import tools from '@/utils/tools.js'
import winutils from '@/utils/winutils.js'
import mynotify from '@/views/com/notify/index.js'
import msg from '@/views/com/message/index.js'
Vue.use(animate)
initThemeColor()
Vue.config.productionTip = false
Vue.use(ElementUI, { size: 'small', zIndex: 3000 });
Vue.prototype.$ = $
Vue.prototype.$tools = tools
Vue.prototype.$utils = winutils
Vue.prototype.$h2c = html2canvas
Vue.prototype.$mynotify=mynotify
Vue.prototype.$mymsg=msg
Vue.prototype.$get=get
Vue.prototype.$post=post
Vue.prototype.$put=put
Vue.prototype.$del=del
Vue.prototype.$baseapi=baseapi

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

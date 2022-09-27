<template>
  <div id="app" :style="{backgroundImage:`url(${bgimg})`}">
    <el-scrollbar style="height: 100%;" wrapStyle="overflow-x:hidden;">
      <transition name="fade-up">
        <router-view class="routeview" />
      </transition>
    </el-scrollbar>
  </div>
</template>

<script>
import EventBus from '@/utils/eventbus.js'
import { changeThemeColor } from '@/utils/theme.js'
export default {
  data() {
    return {
      bgimg: require('@/assets/image/loginbg/' + this.$store.state.sys.loginBg + '.png')
    }
  },
  created() {
    EventBus.$on('change-sys-themecolor', color => {
      this.$store.commit('sys/set_themeColor', color);
      changeThemeColor(color)
    });
    EventBus.$on('change-login-image', id => {
      var that = this;
      setTimeout(function () {
        that.bgimg = require('@/assets/image/loginbg/' + id + '.png')
      }, 1500)
    });
    EventBus.$on('change-desktop-image', id => {
      var that = this;
      setTimeout(function () {
        that.bgimg = require('@/assets/image/wallpaper/' + id + '.png')
      }, 500)
    });
    EventBus.$on('app-fullscreen', data => {
      this.$tools.fullScreenById();
    });
  },
  mounted() {
    var that = this;
    this.desktopSize();
    window.onresize = () => that.desktopSize();
  },
  methods: {
    desktopSize() {
      let w = this.$(window).width();
      let h = this.$(window).height() - 36;
      this.$store.commit('window/update_desktop_size', { width: w, height: h })
      EventBus.$emit('reset-appposition', true);
      EventBus.$emit('reset-minstate', true);
    }
  }
}
</script>
<style scoped lang="scss">
#app {
  background-repeat: no-repeat;
  background-size: 100% 100%;
  -moz-background-size: 100% 100%;
  z-index: -1000;
  margin: 0px;
  padding: 0px;
  overflow: hidden;
  transition: all 1s ease-in-out;
}
</style>
<!--
在桌面空白处右键
-->
<template>
  <div class="context-menu-panel" :style="{left:`${layerX}px`,top:`${layerY}px`}">
    <div class="context-item" :key="app.menuCode" v-for="app in contextMenus" @click="contextClick(app.menuCode)">
      <i class="iconfont" :class="app.icon"></i>
      <span>{{app.menuName}}</span>
    </div>
    <div class="context-item" @click="AppSortAuto()"><i class="iconfont">&#xed8e;</i><span>重新排列</span></div>
    <div class="context-item" @click="RefrashDesktop()"><i class="iconfont">&#xe798;</i><span>刷新桌面</span></div>
    <div v-if="!isFull" class="context-item" @click="FullScreen()"><i class="iconfont">&#xead9;</i><span>全屏桌面</span>
    </div>
    <div v-else class="context-item" @click="FullScreen()"><i class="iconfont">&#xea00;</i><span>退出全屏</span></div>
  </div>
</template>
<script>
import EventBus from '@/utils/eventbus.js'
import { saveUserConfig } from '@/api/userConfig.js'
export default {
  props: {
    layerX: {
      type: Number,
      default: 0
    },
    layerY: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      isFull: false,
      context: []
    }
  },
  created() {
    this.contextMenus = this.$store.state.sys.contextMenuConfig
  },
  mounted() {
    this.$(".context-menu-panel").height(96 + (this.contextMenus.length * 32))
  },
  methods: {
    contextClick(menucode) {
      this.$emit('hiddenContext');
      EventBus.$emit('open-window', this.contextMenus.filter(function (item) { return item.menuCode == menucode })[0]);
    },
    AppSortAuto() {
      this.$emit('hiddenContext');
      this.$store.commit('window/update_manualOrderIcon', '0')
      saveUserConfig({ groupName: 'system', configName: 'manualOrderIcon', configValue: '0' }, function () { })
      EventBus.$emit('reset-appposition', true);
    },
    RefrashDesktop() {
      window.location.reload()
    },
    FullScreen() {
      this.$emit('hiddenContext');
      var that = this;
      setTimeout(function () {
        that.isFull = !that.$tools.isFullscreen()
        EventBus.$emit('app-fullscreen', true);
      }, 500)
    }
  }
}
</script>
<style scoped lang="scss">
.context-menu-panel {
  width: 100px;
  height: 128px;
  display: inline-block;
  background: #FFFFFF;
  position: absolute;
  border-radius: 8px;
  z-index: 9999999;
  box-shadow: $shadow-2;
  transition: all .4s ease-in-out;
}

.context-item {
  height: 28px;
  width: calc(100% - 10px);
  display: block;
  line-height: 28px;
  text-align: left;
  font-size: 13px;
  margin: 3px 5px;
  border-radius: 8px;
  transition: all .4s ease-in-out;

  .iconfont {
    margin: 0px 5px;
    height: 28px;
  }

  span {
    display: inline-block;
    height: 28px;
  }

  &:hover {
    cursor: pointer;
    background: rgba($color: $themeColor, $alpha: 0.1);
    transition: all .4s ease-in-out;
    color: $themeColor;
  }
}
</style>
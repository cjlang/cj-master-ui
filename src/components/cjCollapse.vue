<!--
设置分割条
-->
<template>
  <div class="collapse-panel">
    <div class="collapse-main">
      <div class="panel-left">
        <i class="iconfont" :style="{color:`${IconColor}`}">{{Icon}}</i>
      </div>
      <div class="panel-center">
        <span :class="[Discript!=''?'panel-center-title2':'panel-center-title']">{{Title}}</span>
        <span v-if="Discript!=''" class="panel-center-content">{{Discript}}</span>
      </div>
      <div class="panel-right">
        <slot></slot>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    Icon: {
      type: String,
      default: '\ue92e'
    },
    IconColor: {
      type: String,
      default: '#409EFF'
    },
    Title: {
      type: String,
      default: '标题'
    },
    Discript: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
    }
  }
}
</script>
<style scoped lang="scss">
.collapse-panel {
  width: calc(100% - 20px);
  padding: 5px 10px;
  display: block;

  .collapse-main {
    position: relative;
    left: 0px;
    width: calc(100% - 5px);
    height: 53px;
    display: block;
    box-shadow: $shadow-2;
    border: 1px solid rgba($color: #ffffff, $alpha: 0.5);
    border-radius: 5px;
    background-color: rgba($color: #ffffff, $alpha: 0.5);
    transition: all .4s ease-in-out;

    &:hover {
      position: relative;
      cursor: pointer;
      left: 5px;
      box-shadow: $shadow-1;
      transition: all .4s ease-in-out;
    }

    .panel-left {
      width: 55px;
      height: 55px;
      line-height: 55px;
      text-align: center;
      display: block;
      float: left;

      i {
        width: 30px;
        height: 30px;
        display: inline-block;
        font-size: 30px;
        color: #0e25f2;
      }
    }

    .panel-center {
      width: calc(100% - 230px);
      height: 55px;
      line-height: 55px;
      text-align: left;
      padding-left: 10px;
      display: inline-block;
      float: left;

      .panel-center-title {
        display: block;
        width: 100%;
        height: 25px;
        color: #222222;
        font-size: 14px;
        font-weight: 500;
        text-align: left;
        float: left;
      }

      .panel-center-title2 {
        position: relative;
        top: -10px;
        display: block;
        width: 100%;
        height: 25px;
        color: #222222;
        font-size: 14px;
        font-weight: 500;
        float: left;
      }

      .panel-center-content {
        position: relative;
        top: -12px;
        display: block;
        color: #888888;
        height: 15px;
        width: 100%;
        text-align: left;
        font-size: 12px;
        float: left;
      }
    }

    .panel-right {
      width: 165px;
      height: 55px;
      text-align: center;
      display: inline-block;
      float: left;
    }
  }
}
</style>
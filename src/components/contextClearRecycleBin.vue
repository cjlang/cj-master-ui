<!--
在垃圾箱上面右键
-->
<template>
    <div class="context-cancel-panel" :style="{left:`${layerX}px`,top:`${layerY}px`}" @click="RemoveAppIcon()">
        <i class="iconfont">&#xebb1;</i>
        <span>{{Title}}</span>
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
        },
        Title: {
            type: String,
            default: '清空'
        }
    },
    methods: {
        RemoveAppIcon() {
            EventBus.$emit('close-contextclearrecyclebin', false);
            EventBus.$emit('play-recyclebinani', false);
            saveUserConfig({ groupName: 'system', configName: 'desktopMenu', configValue: JSON.stringify(this.$store.state.window.desktopMenu) }, function () { })
            this.$mymsg({
                showClose: false,
                message: '相关桌面快捷菜单已移除！',
                type: 'success'
            });
        }
    }
}
</script>
<style scoped lang="scss">
.context-cancel-panel {
    width: 60px;
    height: 25px;
    position: absolute;
    z-index: 9999999;
    background-color: rgba($color: $themeColor, $alpha: 0.6);
    text-align: center;
    border-radius: 10px;
    box-shadow: $shadow-1;
    transition: all 0.4s ease-in-out;

    i {
        width: 24px;
        height: 24px;
        line-height: 24px;
        display: inline-block;
        color: #FFFFFF;
        font-weight: 500;
        float: left;
    }

    span {
        width: 30px;
        height: 24px;
        line-height: 24px;
        font-size: 13px;
        text-align: center;
        display: inline-block;
        color: #FFFFFF;
        float: left;
    }

    &:hover {
        cursor: pointer;
        background-color: rgba($color: #FF0000, $alpha: 0.8);
        transition: all 0.4s ease-in-out;
    }
}
</style>
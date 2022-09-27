<!--
程序面板最左边菜单
-->
<template>
    <div class="menu-panel unselect">
        <div class="left-menu-panel">
            <div class="setting-panel">
                <div class="set-item" @click="MySetting()">
                    <i class="iconfont">&#xea5c;</i>
                </div>
                <div class="set-item" @click="SysSetting()">
                    <i class="iconfont">&#xece9;</i>
                </div>
                <div class="set-item" @click="QuitSys()">
                    <i class="iconfont">&#xed66;</i>
                </div>
            </div>
            <div class="program-panel">
                <programList></programList>
            </div>
        </div>
        <div class="right-menu-panel">
            <favoriteAppList></favoriteAppList>
        </div>
    </div>
</template>
<script>
import EventBus from '@/utils/eventbus.js'
import { removeToken, removeSid, removeUserInfo } from "@/utils/auth.js";
export default {
    data() {
        return {

        }
    },
    mounted() {
        if (this.$store.state.sys.startMenuPureColor == '1') {
            this.$('.menu-panel').css('background', this.$store.state.sys.startMenuLeftColor)
            this.$('.program-panel').css('background', this.$store.state.sys.startMenuCenterColor)
            this.$('.right-menu-panel').css('background', this.$store.state.sys.startMenuRightColor)
        } else {
            this.$('.menu-panel').css('background-image', 'url(' + require('@/assets/image/startmenubg/' + this.$store.state.sys.startMenuBg + '.png') + ')')
            this.$('.menu-panel').css('background-repeat', 'no-repeat')
        }
        EventBus.$on('update-start-menu-left-color', data => {
            this.$('.menu-panel').css('background', data)
            this.$store.commit('sys/set_startMenuLeftColor', data);
        })
        EventBus.$on('update-start-menu-center-color', data => {
            this.$('.program-panel').css('background', data)
            this.$store.commit('sys/set_startMenuCenterColor', data);
        })
        EventBus.$on('update-start-menu-right-color', data => {
            this.$('.right-menu-panel').css('background', data)
            this.$store.commit('sys/set_startMenuRightColor', data);
        })
        EventBus.$on('update-startmenu-pure-color', data => {
            if (data) {
                this.$('.menu-panel').css('background', this.$store.state.sys.startMenuLeftColor)
                this.$('.program-panel').css('background', this.$store.state.sys.startMenuCenterColor)
                this.$('.right-menu-panel').css('background', this.$store.state.sys.startMenuRightColor)
            } else {
                this.$('.menu-panel').css('background-image', 'url(' + require('@/assets/image/startmenubg/' + this.$store.state.sys.startMenuBg + '.png') + ')')
                this.$('.menu-panel').css('background-size', '100% 100%')
                this.$('.menu-panel').css('-moz-background-size:', '100% 100%')
                this.$('.program-panel').css('background', 'rgba(0,0,0,0)')
                this.$('.right-menu-panel').css('background', 'rgba(0,0,0,0)')
                this.$('.menu-panel').css('background-repeat', 'no-repeat')
            }
        })
    },
    methods: {
        MySetting() {
            EventBus.$emit('open-startmenu', true);
            EventBus.$emit('open-window', { menuCode: 'mysetting', menuName: '个人设置', sysWindow: 1, urlPath: 'mysetting', component: 'sys/setting/myinfo.vue', icon: 'gcwodegerenzhongxin', imgUrl: '2' });
        },
        SysSetting() {
            EventBus.$emit('open-startmenu', true);
            EventBus.$emit('open-window', { menuCode: 'systemsetting', menuName: '系统设置', sysWindow: 1, urlPath: 'systemsetting', component: 'sys/setting/sysconfig/index.vue', icon: 'gcscreen', imgUrl: '3' });
        },
        QuitSys() {
            EventBus.$emit('open-startmenu', true);
            removeToken()
            removeSid()
            removeUserInfo()
            EventBus.$emit('change-login-image', "1")
            this.$router.replace('/relogin')
        }
    }
}
</script>
<style scoped lang="scss">
.menu-panel {
    width: 100%;
    height: 100%;
    display: block;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    -moz-background-size: 100% 100%;
    backdrop-filter: blur(15px);

    .left-menu-panel {
        width: 200px;
        height: 100%;
        float: left;

        .setting-panel {
            width: 36px;
            height: 108px;
            float: left;
            position: absolute;
            left: 0px;
            bottom: 5px;

            .set-item {
                width: 36px;
                height: 36px;
                display: block;
                text-align: center;
                transition: all .4s ease-in-out;

                i {
                    width: 36px;
                    height: 36px;
                    display: block;
                    text-align: center;
                    line-height: 36px;
                    font-size: 18px;
                    color: #FFFFFF;
                    transition: all .4s ease-in-out;
                }

                &:hover {
                    cursor: pointer;
                    background-color: #3E3E3E;
                    transition: all .4s ease-in-out;

                    i {
                        color: rgba($color: $themeColor, $alpha: 1.0);
                        transition: all .4s ease-in-out;
                    }
                }
            }
        }

        .program-panel {
            width: 164px;
            height: 100%;
            float: right;
        }

    }

    .right-menu-panel {
        width: 300px;
        height: 100%;
        float: right;
    }

}
</style>
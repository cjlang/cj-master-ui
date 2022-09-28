<template>
    <div class="content-panel unselect">
        <div class="title-bar">个性颜色</div>
        <div class="content-panel-10">
            <cj-collapse :Icon='icon.theme' Title="主题颜色" Discript="设置全局主色调">
                <my-color-picker v-model="sysColor.theme" @change="setThemeColor" style="position: relative;top:10px;">
                </my-color-picker>
            </cj-collapse>
            <cj-collapse :Icon='icon.topWindow' Title="窗口顶部栏颜色" Discript="当前置顶的窗口">
                <my-color-picker v-model="sysColor.topWindow" show-alpha @change="setTopWindowColor"
                    style="position: relative;top:10px;"></my-color-picker>
            </cj-collapse>
            <cj-collapse :Icon='icon.unActiveWindow' Title="窗口顶部栏颜色" Discript="非当前置顶的窗口">
                <my-color-picker v-model="sysColor.unActiveWindow" show-alpha @change="setUnActiveWindowColor"
                    style="position: relative;top:10px;"></my-color-picker>
            </cj-collapse>
            <cj-collapse :Icon='icon.windowBackgroundColor' Title="窗口背景颜色" Discript="窗口主体背景">
                <my-color-picker v-model="sysColor.windowBackgroundColor" show-alpha @change="setWindowBackgroundColor"
                    style="position: relative;top:10px;"></my-color-picker>
            </cj-collapse>
            <cj-collapse :Icon='icon.moreFuncColor' Title="更多功能颜色">
                <my-color-picker v-model="sysColor.moreFuncColor" show-alpha @change="setMoreFuncColor"
                    style="position: relative;top:10px;"></my-color-picker>
            </cj-collapse>
            <cj-collapse :Icon='icon.bottomTaskColor' Title="底部任务栏颜色">
                <my-color-picker v-model="sysColor.bottomTaskColor" show-alpha @change="setBottomTaskColor"
                    style="position: relative;top:10px;"></my-color-picker>
            </cj-collapse>
            <cj-collapse :Icon='icon.noticePanelColor' Title="通知中心面板">
                <my-color-picker v-model="sysColor.noticePanelColor" show-alpha @change="setNoticePanelColor"
                    style="position: relative;top:10px;"></my-color-picker>
            </cj-collapse>
        </div>
        <div class="title-bar">开始菜单</div>
        <div class="content-panel-10">
            <cj-collapse :Icon='icon.theme' Title="启用纯色">
                <el-switch v-model="sysColor.startMenuPureColor" active-color="#409EFF" inactive-color="#CCCCCC"
                    @change="startPureColor" style="position: relative;top:15px;"></el-switch>
            </cj-collapse>
        </div>
        <transition name="fade">
            <div class="content-panel-20" v-if="!sysColor.startMenuPureColor">
                <div class="wallpaper" v-for="item in startMenuBgimgUrl" :key="item.id">
                    <img :src="item.url" :class="{ischeck:item.ischeck}" :width="photoSize.width"
                        :height="photoSize.height" @click="setstartMenuBg(item.id)" />
                    <i class="iconfont img-check" v-if="item.ischeck">&#xec10;</i>
                </div>
            </div>
            <div class="content-panel-10" v-if="sysColor.startMenuPureColor">
                <cj-collapse :Icon='icon.theme' Title="开始菜单左边" Discript="开始菜单左边">
                    <my-color-picker v-model="sysColor.startMenuLeftColor" show-alpha @change="setStartMenuLeftColor"
                        style="position: relative;top:10px;"></my-color-picker>
                </cj-collapse>
                <cj-collapse :Icon='icon.theme' Title="开始菜单中间" Discript="开始菜单中间">
                    <my-color-picker v-model="sysColor.startMenuCenterColor" show-alpha
                        @change="setStartMenuCenterColor" style="position: relative;top:10px;"></my-color-picker>
                </cj-collapse>
                <cj-collapse :Icon='icon.theme' Title="开始菜单右边" Discript="开始菜单右边">
                    <my-color-picker v-model="sysColor.startMenuRightColor" show-alpha @change="setStartMenuRightColor"
                        style="position: relative;top:10px;"></my-color-picker>
                </cj-collapse>
            </div>
        </transition>
        <div class="title-bar">桌面背景</div>
        <div class="content-panel-20">
            <div class="wallpaper" v-for="item in desktopBgimgUrl" :key="item.id">
                <img :src="item.url" :class="{ischeck:item.ischeck}" :width="photoSize.width" :height="photoSize.height"
                    @click="selectDesktopBg(item.id)" />
                <i class="iconfont img-check" v-if="item.ischeck">&#xec10;</i>
            </div>
        </div>
        <div class="title-bar"><i class="iconfont">&#xec4a;</i>登录背景(管理员)</div>
        <div class="content-panel-20">
            <div class="wallpaper" v-for="item in loginBgimgUrl" :key="item.id">
                <img :src="item.url" :class="{ischeck:item.ischeck}" :width="photoSize.width" :height="photoSize.height"
                    @click="selectLoginBg(item.id)" />
                <i class="iconfont img-check" v-if="item.ischeck">&#xec10;</i>
            </div>
        </div>
    </div>
</template>
<script>
import EventBus from '@/utils/eventbus.js'
import MyColorPicker from '@/views/com/color-picker/index.js'
import { saveGlobalConfig } from '@/api/globalConfig.js';
import { saveUserConfig } from '@/api/userConfig.js';
import CjCollapse from '../../../../components/cjCollapse.vue';
export default {
    components: { MyColorPicker, CjCollapse },
    data() {
        return {
            icon: {
                theme: '\ueab3',
                topWindow: '\ue6d0',
                unActiveWindow: '\ue893',
                moreFuncColor: '\ueb94',
                bottomTaskColor: '\ueb96',
                noticePanelColor: '\ue607',
                windowBackgroundColor: '\uea0e'
            },
            photoSize: {
                width: 160,
                height: 120
            },
            loginBgimgUrl: [],
            desktopBgimgUrl: [],
            startMenuBgimgUrl: [],
            sysColor: {
                theme: '',
                topWindow: '',
                unActiveWindow: '',
                startMenuLeftColor: 'rgba(8,8,8,0.9)',
                startMenuCenterColor: 'rgba(10,10,10,0.9)',
                startMenuRightColor: 'rgba(10,10,10,0.9)',
                moreFuncColor: 'rgba(0,0,0,0.9)',
                bottomTaskColor: 'rgba(0,0,0,0.9)',
                noticePanelColor: 'rgba(0,0,0,0.9)',
                startMenuPureColor: false,
                windowBackgroundColor: 'rgba(0,0,0,0.9)'
            }
        };
    },
    created() {
        this.sysColor.theme = this.$store.state.sys.themeColor
        this.sysColor.topWindow = this.$store.state.sys.topWindowColor
        this.sysColor.unActiveWindow = this.$store.state.sys.unActiveWindowColor
        this.sysColor.windowBackgroundColor = this.$store.state.sys.windowBackgroundColor

        this.sysColor.startMenuLeftColor = this.$store.state.sys.startMenuLeftColor
        this.sysColor.startMenuCenterColor = this.$store.state.sys.startMenuCenterColor
        this.sysColor.startMenuRightColor = this.$store.state.sys.startMenuRightColor
        this.sysColor.moreFuncColor = this.$store.state.sys.moreFuncColor
        this.sysColor.bottomTaskColor = this.$store.state.sys.bottomTaskColor
        this.sysColor.noticePanelColor = this.$store.state.sys.noticePanelColor

        this.sysColor.startMenuPureColor = this.$store.state.sys.startMenuPureColor == '1' ? true : false


        for (let i = 1; i <= 5; i++) {
            this.loginBgimgUrl.push({ id: i, url: require('@/assets/image/loginbg/' + i + '.png'), ischeck: this.$store.state.sys.loginBg == i })
        }
        for (let i = 1; i <= 9; i++) {
            this.desktopBgimgUrl.push({ id: i, url: require('@/assets/image/wallpaper/' + i + '.png'), ischeck: this.$store.state.sys.deskTopBg == i })
        }
        for (let i = 1; i <= 4; i++) {
            this.startMenuBgimgUrl.push({ id: i, url: require('@/assets/image/startmenubg/' + i + '.png'), ischeck: this.$store.state.sys.startMenuBg == i })
        }
    },
    methods: {
        selectLoginBg(id) {
            for (let i = 0; i < this.loginBgimgUrl.length; i++) {
                let temp = JSON.parse(JSON.stringify(this.loginBgimgUrl[i]))
                if (this.loginBgimgUrl[i].id == id) {
                    temp.ischeck = true
                    this.$set(this.loginBgimgUrl, i, temp)
                    this.$store.commit('sys/set_loginBg', id);
                    saveGlobalConfig({ groupName: 'system', configName: 'loginBg', configValue: id }, function () { })
                } else {
                    temp.ischeck = false
                    this.$set(this.loginBgimgUrl, i, temp)
                }

            }
        },
        selectDesktopBg(id) {
            for (let i = 0; i < this.desktopBgimgUrl.length; i++) {
                let temp = JSON.parse(JSON.stringify(this.desktopBgimgUrl[i]))
                if (this.desktopBgimgUrl[i].id == id) {
                    temp.ischeck = true
                    this.$set(this.desktopBgimgUrl, i, temp)
                    EventBus.$emit("change-desktop-image", id);
                    this.$store.commit('sys/set_deskTopBg', id);
                    saveUserConfig({ groupName: 'system', configName: 'desktopBg', configValue: id }, function () { })
                } else {
                    temp.ischeck = false
                    this.$set(this.desktopBgimgUrl, i, temp)
                }
            }
        },
        setThemeColor(newColor) {
            EventBus.$emit("change-sys-themecolor", newColor);
            saveUserConfig({ groupName: 'system', configName: 'themeColor', configValue: newColor }, function () { })
        },
        setTopWindowColor(newColor) {
            this.$store.commit('sys/set_topWindowColor', newColor);
            EventBus.$emit("update-topwindow-color", newColor);
            saveUserConfig({ groupName: 'system', configName: 'topWindowColor', configValue: newColor }, function () { })
        },
        setUnActiveWindowColor(newColor) {
            this.$store.commit('sys/set_unActiveWindowColor', newColor);
            EventBus.$emit("update-unactivewindow-color", newColor);
            saveUserConfig({ groupName: 'system', configName: 'unActiveWindowColor', configValue: newColor }, function () { })
        },
        setWindowBackgroundColor(newColor) {
            this.$store.commit('sys/set_windowBackgroundColor', newColor);
            EventBus.$emit("update-window-background-color", newColor);
            saveUserConfig({ groupName: 'system', configName: 'windowBackgroundColor', configValue: newColor }, function () { })
        },
        setStartMenuLeftColor(newColor) {
            EventBus.$emit("update-start-menu-left-color", newColor);
            saveUserConfig({ groupName: 'system', configName: 'startMenuLeftColor', configValue: newColor }, function () { })
        },
        setStartMenuCenterColor(newColor) {
            EventBus.$emit("update-start-menu-center-color", newColor);
            saveUserConfig({ groupName: 'system', configName: 'startMenuCenterColor', configValue: newColor }, function () { })
        },
        setStartMenuRightColor(newColor) {
            EventBus.$emit("update-start-menu-right-color", newColor);
            saveUserConfig({ groupName: 'system', configName: 'startMenuRightColor', configValue: newColor }, function () { })
        },
        setMoreFuncColor(newColor) {
            EventBus.$emit("update-morefunc-color", newColor);
            saveUserConfig({ groupName: 'system', configName: 'moreFuncColor', configValue: newColor }, function () { })
        },
        setBottomTaskColor(newColor) {
            EventBus.$emit("update-bottomtask-color", newColor);
            saveUserConfig({ groupName: 'system', configName: 'bottomTaskColor', configValue: newColor }, function () { })
        },
        setNoticePanelColor(newColor) {
            EventBus.$emit("update-noticepanel-color", newColor);
            saveUserConfig({ groupName: 'system', configName: 'noticePanelColor', configValue: newColor }, function () { })
        },
        startPureColor(value) {
            EventBus.$emit("update-startmenu-pure-color", value ? '1' : 0);
            saveUserConfig({ groupName: 'system', configName: 'startPureColor', configValue: value ? '1' : 0 }, function () { })
        },
        setstartMenuBg(id) {
            for (let i = 0; i < this.startMenuBgimgUrl.length; i++) {
                let temp = JSON.parse(JSON.stringify(this.startMenuBgimgUrl[i]))
                if (this.startMenuBgimgUrl[i].id == id) {
                    temp.ischeck = true
                    this.$set(this.startMenuBgimgUrl, i, temp)
                    this.$store.commit('sys/set_startMenuBg', id);
                    EventBus.$emit("update-startmenu-pure-color", false);
                    saveUserConfig({ groupName: 'system', configName: 'startMenuBg', configValue: id }, function () { })
                } else {
                    temp.ischeck = false
                    this.$set(this.startMenuBgimgUrl, i, temp)
                }

            }
        }
    }
}
</script>
<style scoped lang="scss">
.wallpaper {
    width: 230px;
    display: inline-block;
    margin: 20px;
    perspective: 300px;
    perspective-origin: 0 0;

    img {
        border: 2px solid #f3f3f3;
        box-shadow: $shadow-1;
        transition: all .4s ease-in-out;
        float: left;

        &:hover {
            border: 2px solid #ffffff;
            box-shadow: $shadow-theme1;
            transform: rotateY(30deg);
            cursor: pointer;
            transition: all .4s ease-in-out;

            &+i {
                bottom: -60px;
                transition: all .4s ease-in-out;
            }
        }
    }

    .ischeck {
        border: 2px solid $themeColor;
    }

    .img-check {
        width: 40px;
        height: 40px;
        display: inline-block;
        position: relative;
        bottom: -80px;
        right: 70px;
        background: $themeColor;
        color: #FFFFFF;
        font-size: 20px;
        line-height: 40px;
        border-radius: 20px;
        text-align: center;
        float: right;
        transition: all .4s ease-in-out;
    }
}
</style>
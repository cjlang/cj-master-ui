<template>
    <div class="main-panel">
        <div class="username-panel">下午好,{{UserName}}</div>
        <div class="desktop-panel" @click="clickDeskTop" @contextmenu.prevent.self.stop="openContextMenu($event)">
            <windowContent v-for="item in winBox" class="page-content" :key="item.WinId" :WinId="item.WinId"
                :menuCode="item.menuCode" :menuName="item.menuName" :layerX="item.layerX" :layerY="item.layerY"
                :ZIndex="item.ZIndex" :sysWindow="item.sysWindow==1"></windowContent>
            <desktopIcon class="appicon" v-for="menu in desktopMenus" :key="menu.Inx" :menuCode="menu.menuCode"
                :Inx="menu.Inx" :Icon="menu.icon" :iconColor="menu.iconColor" :layerX="menu.layerX"
                :layerY="menu.layerY" :menuName="menu.menuName" :imgOrIcon="menu.imgOrIcon" :imgUrl="menu.imgUrl"
                @openWin="openWin(menu)"></desktopIcon>
        </div>
        <transition name="menu-show">
            <div class="startmenu-panel" v-show="ctrl.startpanel">
                <startMenu></startMenu>
            </div>
        </transition>
        <transition name="desktoptask-show">
            <div class="desktop-task unselect" v-show="ctrl.desktoptaskshow" @click="ClickDesktopTask()">
                <div class="start-button">
                    <div class="btn-start" @click="openStartMenu()">
                        <img :src="startIcon" />
                    </div>
                </div>
                <div class="opened-page">
                    <minState></minState>
                </div>
                <div class="shortcut-app">
                    <div class="sapp-more" @click="OpenMoreFunc()"><i class="iconfont"></i></div>
                    <div class="sapp-func1" @click="OpenTestFunc()"><i class="iconfont"></i></div>
                    <div class="sapp-func2" @click="OpenTestFunc()"><i class="iconfont"></i></div>
                    <div class="sapp-func3" @click="OpenTestFunc()"><i class="iconfont"></i></div>
                </div>
                <div class="date-notice">
                    <div class="btn-datetime"><span>2021-12-03</span></div>
                    <div class="btn-notice" @click="openNoticePanel"><i class="iconfont"></i></div>
                </div>
            </div>
        </transition>
        <transition name="notice-ani">
            <div class="notice-panel" v-show="ctrl.noticepanel">
                <noticeCenter></noticeCenter>
            </div>
        </transition>
        <transition name="morefunc-show">
            <div class="morefunc-panel" v-show="ctrl.morefunc">
                <moreFunc></moreFunc>
            </div>
        </transition>
        <transition name="context-ani">
            <contextMenu @hiddenContext="hiddenContext" v-show="ctrl.contexmenushow" :layerX=layerX :layerY=layerY>
            </contextMenu>
        </transition>
        <transition name="fade">
            <contextClearRecycleBin v-show="ctrl.contextclearrecyclebinshow" :layerX=layerX1 :layerY=layerY1>
            </contextClearRecycleBin>
        </transition>

    </div>
</template>
<script>
import EventBus from "@/utils/eventbus.js";
import desktop from '@/mixins/desktop.mixin.js'
import noticeCenter from '@/mixins/notice-center.mixin.js'
import winContent from '@/mixins/win-content.mixin.js'
import MinState from '@/components/minState.vue'
import { getUserConfig } from '@/api/userConfig.js'
import { getUserInfo } from "@/utils/auth.js";
export default {
    mixins: [desktop, MinState, noticeCenter, winContent],
    data() {
        return {
            UserName: '',
            startIcon: require('@/assets/image/icon/winicon.png'),
            recycleBin_Empty: require('@/assets/image/app/empty.png'),
            recycleBin_Full: require('@/assets/image/app/full.png'),
            ctrl: {
                startpanel: false,
                noticepanel: false,
                contexmenushow: false,
                desktoptaskshow: false,
                contextclearrecyclebinshow: false,
                morefunc: false
            },
            desktopMenus: []
        }
    },
    created() {
        this.registerEvent();
        let userinfo = getUserInfo()
        this.UserName = userinfo != null ? userinfo.username : ''
    },
    mounted() {
        this.InitUserData();
    },
    methods: {
        InitUserData() {
            let recycleBin = {
                menuCode: this.$store.state.sys.recycleBinId,
                iconColor: '#FF0000',
                menuName: '垃圾箱',
                urlPath: 'recyclebin',
                component: '',
                imgOrIcon: 'image',
                Inx: 0,
                imgUrl: require('@/assets/image/rcani.png')
            }
            let that = this
            getUserConfig({ groupName: 'system' }, function (userConfigList) {
                if (userConfigList != null && userConfigList != '' && userConfigList.length > 0) {
                    /**背景图 */
                    let desktopBg = userConfigList.filter(function (item) {
                        return item.configName == 'desktopBg'
                    })
                    if (desktopBg.length > 0) {
                        that.$store.commit('sys/set_deskTopBg', desktopBg[0].configValue);
                        EventBus.$emit('change-desktop-image', desktopBg[0].configValue);
                    }
                    /**手动排列 */
                    let manualOrderIcon = userConfigList.filter(function (item) {
                        return item.configName == 'manualOrderIcon'
                    })
                    if (manualOrderIcon.length > 0) {
                        that.$store.commit('window/update_manualOrderIcon', manualOrderIcon[0].configValue)
                    }

                    /**初始化用户个人桌面快捷菜单 */
                    let desktopMenu = userConfigList.filter(function (item) {
                        return item.configName == 'desktopMenu'
                    })
                    if (desktopMenu.length > 0) {
                        let menu = JSON.parse(desktopMenu[0].configValue)
                        for (let i = 0; i < menu.length; i++) {
                            if (menu[i].hasOwnProperty("imgUrlName")) {
                                menu[i].imgUrl = require('@/assets/image/menuicon/' + menu[i].imgUrlName + '.png')
                            }
                        }
                        let ljx = menu.filter(function (item) {
                            return item.menuCode == that.$store.state.sys.recycleBinId
                        })
                        if (ljx.length == 0) {
                            menu.unshift(recycleBin)
                        }
                        that.$store.commit('window/update_desktop_menu', menu);
                        EventBus.$emit('refrash-desktop-menu', true)
                        setTimeout(function () {
                            EventBus.$emit('event-bindDraggableAndDroppableEvent', true);
                        }, 1500)
                    } else {
                        that.$store.commit('window/update_desktop_menu', [recycleBin]);
                        EventBus.$emit('refrash-desktop-menu', true)
                        setTimeout(function () {
                            EventBus.$emit('event-bindDraggableAndDroppableEvent', true);
                        }, 1500)
                    }

                    /**主题颜色 */
                    let themeColor = userConfigList.filter(function (item) {
                        return item.configName == 'themeColor'
                    })
                    if (themeColor.length > 0) {
                        EventBus.$emit("change-sys-themecolor", themeColor[0].configValue);
                    }

                    /**设置窗口顶部颜色 */
                    let topWindowColor = userConfigList.filter(function (item) {
                        return item.configName == 'topWindowColor'
                    })
                    if (topWindowColor.length > 0) {
                        that.$store.commit('sys/set_topWindowColor', topWindowColor[0].configValue);
                        EventBus.$emit("update-topwindow-color", topWindowColor[0].configValue);
                    }

                    /**设置未激活窗口颜色 */
                    let unActiveWindowColor = userConfigList.filter(function (item) {
                        return item.configName == 'unActiveWindowColor'
                    })
                    if (unActiveWindowColor.length > 0) {
                        that.$store.commit('sys/set_unActiveWindowColor', unActiveWindowColor[0].configValue);
                        EventBus.$emit("update-unactivewindow-color", unActiveWindowColor[0].configValue);
                    }

                    /**设置开始菜单左颜色 */
                    let startMenuLeftColor = userConfigList.filter(function (item) {
                        return item.configName == 'startMenuLeftColor'
                    })
                    if (startMenuLeftColor.length > 0) {
                        EventBus.$emit("update-start-menu-left-color", startMenuLeftColor[0].configValue);
                    }

                    /**设置开始菜单中颜色 */
                    let startMenuCenterColor = userConfigList.filter(function (item) {
                        return item.configName == 'startMenuCenterColor'
                    })
                    if (startMenuCenterColor.length > 0) {
                        EventBus.$emit("update-start-menu-center-color", startMenuCenterColor[0].configValue);
                    }

                    /**设置开始菜单右颜色 */
                    let startMenuRightColor = userConfigList.filter(function (item) {
                        return item.configName == 'startMenuRightColor'
                    })
                    if (startMenuRightColor.length > 0) {
                        EventBus.$emit("update-start-menu-right-color", startMenuRightColor[0].configValue);
                    }

                    /**更多功能 */
                    let moreFuncColor = userConfigList.filter(function (item) {
                        return item.configName == 'moreFuncColor'
                    })
                    if (moreFuncColor.length > 0) {
                        EventBus.$emit("update-morefunc-color", moreFuncColor[0].configValue);
                    }

                    /**底部任务栏颜色 */
                    let bottomTaskColor = userConfigList.filter(function (item) {
                        return item.configName == 'bottomTaskColor'
                    })
                    if (bottomTaskColor.length > 0) {
                        EventBus.$emit("update-bottomtask-color", bottomTaskColor[0].configValue);
                    }

                    /**通知中心 */
                    let noticePanelColor = userConfigList.filter(function (item) {
                        return item.configName == 'noticePanelColor'
                    })
                    if (noticePanelColor.length > 0) {
                        EventBus.$emit("update-noticepanel-color", noticePanelColor[0].configValue);
                    }
                    /**开始菜单背景 */
                    let startMenuBg = userConfigList.filter(function (item) {
                        return item.configName == 'startMenuBg'
                    })
                    if (startMenuBg.length > 0) {
                        that.$store.commit('sys/set_startMenuBg', startMenuBg[0].configValue);
                    }
                    /**启用存色 */
                    let startPureColor = userConfigList.filter(function (item) {
                        return item.configName == 'startPureColor'
                    })
                    if (startPureColor.length > 0) {
                        that.$store.commit('sys/set_startMenuPureColor', startPureColor[0].configValue);
                        EventBus.$emit("update-startmenu-pure-color", startPureColor[0].configValue == '1' ? true : false);
                    }
                } else {
                    that.$store.commit('window/update_desktop_menu', [recycleBin]);
                    EventBus.$emit('refrash-desktop-menu', true)
                    setTimeout(function () {
                        EventBus.$emit('event-bindDraggableAndDroppableEvent', true);
                    }, 1500)
                }
            })
        }
    }
}
</script>
<style scoped lang="scss">
.username-panel {
    position: absolute;
    right: 30px;
    bottom: 50px;
    color: #FFFFFF;
    font-weight: 800;
    opacity: 0.5;
}

.desktop-panel {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 36px;
    z-index: 1;
    overflow: hidden;
    perspective: 500px;

    .appicon {
        z-index: 10;
    }

    .page-content {
        z-index: 20;
    }
}

.desktop-task {
    height: 36px;
    width: 100%;
    position: absolute;
    left: 0px;
    bottom: 0px;
    backdrop-filter: blur(5px);
    background: rgba($color: #000000, $alpha: 0.9);
    z-index: 200000;

    //overflow: hidden;
    .start-button {
        width: 36px;
        height: 36px;
        position: absolute;
        left: 0;
        bottom: 0;
        text-align: center;
        line-height: 36px;
        padding: 0;
        margin: 0;

        .btn-start {
            position: absolute;
            width: 36px;
            height: 36px;
            left: 0;
            bottom: 0;
            line-height: 36px;
            text-align: center;
            transition: all .4s ease-in-out;

            img {
                width: 36px;
                height: 36px;
                margin: 0px;
                line-height: 36px;
                display: inline-block;
                transition: all .4s ease-in-out;
            }

            &:hover {
                cursor: pointer;
                background-color: #1E1E1E;
                transition: all .4s ease-in-out;

                img {
                    width: 26px;
                    height: 26px;
                    display: inline-block;
                    margin: 5px;
                    transition: all .4s ease-in-out;
                }
            }
        }
    }

    .opened-page {
        height: 36px;
        position: absolute;
        left: 36px;
        right: 294px;
        bottom: 0;
        line-height: 36px;
    }

    .shortcut-app {
        height: 36px;
        width: 144px;
        position: absolute;
        right: 150px;
        bottom: 0;
        text-align: center;
        padding: 0px;
        margin: 0px;
        border: 0px;
        overflow: hidden;

        .sapp-more {
            position: absolute;
            width: 36px;
            height: 36px;
            line-height: 36px;
            left: 0px;
            bottom: 0px;
            float: left;
            transition: all .4s ease-in-out;

            i {
                font-size: 18px;
                color: #FFFFFF;
                text-align: center;
                transition: all .4s ease-in-out;
            }

            i:after {
                content: '\e6bd'
            }

            &:hover {
                cursor: pointer;
                transition: all .4s ease-in-out;
                background-color: #1E1E1E;

                i {
                    color: rgba($color: $themeColor, $alpha: 1.0);
                    transition: all .4s ease-in-out;
                }
            }
        }

        .sapp-func1 {
            position: absolute;
            width: 36px;
            height: 36px;
            line-height: 36px;
            left: 36px;
            bottom: 0;
            transition: all .4s ease-in-out;

            i {
                font-size: 18px;
                color: #FFFFFF;
                transition: all .4s ease-in-out;
            }

            i:after {
                content: '\e9c3'
            }

            &:hover {
                cursor: pointer;
                transition: all .4s ease-in-out;
                background-color: #1E1E1E;

                i {
                    color: rgba($color: $themeColor, $alpha: 1.0);
                    transition: all .4s ease-in-out;
                }
            }
        }

        .sapp-func2 {
            position: absolute;
            width: 36px;
            height: 36px;
            line-height: 36px;
            left: 72px;
            bottom: 0;
            transition: all .4s ease-in-out;

            i {
                font-size: 18px;
                color: #FFFFFF;
                transition: all .4s ease-in-out;
            }

            i:after {
                content: '\ecb8'
            }

            &:hover {
                cursor: pointer;
                transition: all .4s ease-in-out;
                background-color: #1E1E1E;

                i {
                    color: rgba($color: $themeColor, $alpha: 1.0);
                    transition: all .4s ease-in-out;
                }
            }
        }

        .sapp-func3 {
            position: absolute;
            width: 36px;
            height: 36px;
            line-height: 36px;
            left: 108px;
            bottom: 0;
            transition: all .4s ease-in-out;

            i {
                font-size: 18px;
                color: #FFFFFF;
                transition: all .4s ease-in-out;
            }

            i:after {
                content: '\eb97'
            }

            &:hover {
                cursor: pointer;
                transition: all .4s ease-in-out;
                background-color: #1E1E1E;

                i {
                    color: rgba($color: $themeColor, $alpha: 1.0);
                    transition: all .4s ease-in-out;
                }
            }
        }
    }

    .date-notice {
        height: 36px;
        width: 150px;
        position: absolute;
        right: 0;
        bottom: 0;

        .btn-datetime {
            height: 36px;
            width: 104px;
            position: absolute;
            right: 46px;
            bottom: 0;
            text-align: center;
            line-height: 36px;
            font-size: 13px;
            color: #FFFFFF;
            transition: all .4s ease-in-out;

            &:hover {
                cursor: pointer;
                background: rgba($color: #000000, $alpha: 0.2);
                transition: all .4s ease-in-out;
            }
        }

        .btn-notice {
            height: 36px;
            width: 45px;
            position: absolute;
            right: 0;
            bottom: 0;
            text-align: center;
            line-height: 36px;
            border-left: 1px solid rgba($color: #FFFFFF, $alpha: 0.2);
            transition: all .4s ease-in-out;

            i {
                display: inline-block;
                color: #FFFFFF;
                transition: all .4s ease-in-out;
            }

            i:after {
                content: '\ebbe'
            }

            &:hover {
                transition: all .4s ease-in-out;
                cursor: pointer;
                background-color: #1E1E1E;

                i:after {
                    content: '\e9a8'
                }

                i {
                    color: rgba($color: $themeColor, $alpha: 1.0);
                    transition: all .4s ease-in-out;
                }
            }
        }

        .btn-notice2 {
            background-color: rgba($color: $themeColor, $alpha: 1);

            i:after {
                content: '\e9a8'
            }
        }
    }
}

.startmenu-panel {
    position: absolute;
    left: 0;
    bottom: 36px;
    width: 500px;
    height: 480px;
    transition: all .4s ease-in-out;
    z-index: 100000;
}

.notice-panel {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 36px;
    width: 280px;
    margin: 0px;
    padding: 0px;
    background: rgba($color: #000000, $alpha: 1);
    z-index: 2999;
}

.morefunc-panel {
    position: absolute;
    right: 145px;
    bottom: 40px;
    width: 280px;
    height: 150px;
    margin: 0px;
    padding: 5px;
    background: rgba($color: #000000, $alpha: 1);
    border-radius: 10px;
    z-index: 100000;
}
</style>

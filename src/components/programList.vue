<template>
    <el-scrollbar style="height: 100%;" wrapStyle="overflow-x:hidden;">
        <transition name="allprogram">
            <div v-show="isShow" class="program-item-panel">
                <div :class="item.type==1?'diritem':'menuitem'" v-for="item in menuList" :key="item.Inx"
                    @click="openMenu(item)">
                    <img v-if="item.imgOrIcon=='image'" :src="item.imgUrl" />
                    <i v-else class="iconfont menu-icon" :style="{background:`${item.iconColor}`}">{{item.icon}}</i>
                    <span class="showdot">{{item.menuName}}</span>
                    <i v-if="item.type=='2'" class="iconfont right-arrow"
                        @click.self.stop="SendToDeskTop(item.menuCode)">&#xe89e;</i>
                </div>
            </div>
        </transition>
    </el-scrollbar>
</template>
<script>
import EventBus from '@/utils/eventbus.js'
import menuapi from '@/api/menuApi.js'
export default {
    data() {
        return {
            menuList: [],
            isShow: false
        }
    },
    mounted() {
        EventBus.$on('show-allprogram', data => {
            this.isShow = data;
        });
    },
    created() {
        this.getProgramMenuDataList()
        EventBus.$on('get-allprogrammenudata', data => {
            this.getProgramMenuDataList()
        });
    },
    methods: {
        getProgramMenuDataList() {
            this.menuList = []
            let that = this
            menuapi.treelist("cjmenu", { type: 2, sysWindow: 0 }, function (data) {
                let index = 0;
                for (let i = 0; i < data.length; i++) {
                    let menu = JSON.parse(JSON.stringify(data[i]))
                    if (menu.type == 1) {
                        index = index + 1
                        menu.Inx = index
                        if (menu.imgOrIcon == 'image') {
                            menu.imgUrl = require('@/assets/image/menuicon/0.png')
                            menu.imgUrlName = '0'
                        }
                        that.menuList.push(menu)
                        if (menu.children != null && menu.children.length > 0) {
                            for (let j = 0; j < menu.children.length; j++) {
                                index = index + 1
                                menu.children[j].Inx = index
                                if (menu.children[j].imgOrIcon == 'image') {
                                    menu.children[j].imgUrlName = menu.children[j].imgUrl
                                    menu.children[j].imgUrl = require('@/assets/image/menuicon/' + menu.children[j].imgUrl + '.png')
                                }
                                that.menuList.push(menu.children[j])
                            }
                        }
                    }
                }
                //再更新桌面上不需要的菜单。
                let desktopMenu = that.$store.state.window.desktopMenu
                let HasMenu = []
                for (let n = 0; n < desktopMenu.length; n++) {
                    let temp = that.menuList.filter(function (item) {
                        return item.menuCode == desktopMenu[n].menuCode
                    })
                    if (temp.length > 0 || desktopMenu[n].menuCode == that.$store.state.sys.recycleBinId) {
                        if (desktopMenu[n].menuCode != that.$store.state.sys.recycleBinId) {
                            desktopMenu[n].menuName = temp[0].menuName
                            desktopMenu[n].urlPath = temp[0].urlPath
                            desktopMenu[n].component = temp[0].component
                            desktopMenu[n].iframe = temp[0].iframe
                            desktopMenu[n].iframePath = temp[0].iframePath
                            desktopMenu[n].imgOrIcon = temp[0].imgOrIcon
                            desktopMenu[n].icon = temp[0].icon
                            desktopMenu[n].iconColor = temp[0].iconColor
                            desktopMenu[n].imgUrl = temp[0].imgUrl
                            desktopMenu[n].orderNum = temp[0].orderNum
                            desktopMenu[n].remark = temp[0].remark
                        }
                        HasMenu.push(desktopMenu[n])
                    }
                }
                that.$store.commit('window/update_all_menu', that.menuList);
                that.$store.commit('window/update_desktop_menu', HasMenu);
                EventBus.$emit('refrash-desktop-menu', true)
                setTimeout(function () {
                    EventBus.$emit('event-bindDraggableAndDroppableEvent', true);
                }, 1500)
            })
        },
        SendToDeskTop(menucode) {
            EventBus.$emit('close-startmenu', false);
            EventBus.$emit('send-desktopicon', menucode);
        },
        openMenu(menu) {
            if (menu.type == 2) {
                EventBus.$emit('open-window', this.$store.state.window.allMenu.filter((item) => { return item.menuCode == menu.menuCode })[0]);
                EventBus.$emit('close-startmenu', true);
            }
        }
    }
}
</script>
<style scoped lang="scss">
.program-item-panel {
    width: 100%;
    height: 100%;
    display: block;
    background-color: rgba($color: #000000, $alpha: 0);

    .menuitem {
        height: 24px;
        width: calc(100% - 20px);
        display: block;
        padding: 6px;
        line-height: 24px;
        transition: all .4s ease-in-out;

        img {
            width: 24px;
            height: 24px;
            display: inline-block;
            float: left;
            transition: all .4s ease-in-out;
        }

        .menu-icon {
            width: 24px;
            height: 24px;
            display: inline-block;
            float: left;
            line-height: 24px;
            text-align: center;
            color: #FFFFFF;
            border-radius: 3px;
            transition: all .4s ease-in-out;
        }

        span {
            width: calc(100% - 60px);
            height: 24px;
            text-align: left;
            line-height: 24px;
            display: inline-block;
            color: #FFFFFF;
            padding-left: 10px;
            font-size: 12px;
            float: left;
            transition: all .4s ease-in-out;
        }

        .right-arrow {
            width: 20px;
            height: 24px;
            display: none;
            color: #FFFFFF;
            float: right;
            transition: all .4s ease-in-out;
        }

        &:hover {
            cursor: pointer;
            background: linear-gradient(90deg, rgba($themeColor, 0), rgba($themeColor, 0.8) 40px, rgba($themeColor, 0.4) 100px, rgba($themeColor, 0));
            transition: all .4s ease-in-out;

            &>.right-arrow {
                display: inline-block;
                transition: all .4s ease-in-out;
            }
        }
    }

    .diritem {
        height: 24px;
        width: calc(100% - 20px);
        display: block;
        padding: 6px;
        line-height: 24px;
        transition: all .4s ease-in-out;

        img {
            width: 24px;
            height: 24px;
            display: inline-block;
            float: left;
            transition: all .4s ease-in-out;
        }

        .menu-icon {
            width: 24px;
            height: 24px;
            display: inline-block;
            float: left;
            background: #FF0000;
            color: #FFFFFF;
            line-height: 24px;
            text-align: center;
            border-radius: 3px;
            transition: all .4s ease-in-out;
        }

        span {
            width: calc(100% - 60px);
            height: 24px;
            text-align: left;
            line-height: 24px;
            display: inline-block;
            color: #FFFFFF;
            padding-left: 10px;
            font-size: 12px;
            float: left;
            transition: all .4s ease-in-out;
        }

        .right-arrow {
            width: 20px;
            height: 24px;
            display: none;
            color: #FFFFFF;
            float: right;
            transition: all .4s ease-in-out;
        }
    }
}
</style>
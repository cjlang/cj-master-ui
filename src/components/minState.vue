<!--
最小化任务栏的隐藏类的窗体
-->
<template>
    <div class="minstate-panel">
        <div :class="getClassStyle(item.WinId)" v-for="(item,index) in minBox" :key="item.WinId" :winId="item.WinId"
            @click="nomalWindow(item.WinId)" @dblclick="minWindow(item.WinId)">
            <img v-if="item.imgOrIcon == 'image'" class="task-barimage" :src="item.imgUrl" />
            <i v-else class="iconfont task-baricon" :style="{backgroundColor:`${item.iconColor}`}">{{item.icon}}</i>
            <span>{{item.menuName}}</span>
            <div class="short-img" :style="{'left':(index*98-35)+'px'}">
                <img :src="getImg(item.WinId)" height="110" width="170" />
                <i class="iconfont" @click="closeWindow(item.WinId)">&#xebe6;</i>
            </div>
        </div>
    </div>
</template>
<script>
import EventBus from '@/utils/eventbus.js'
export default {
    data() {
        return {
            minBox: []
        }
    },
    mounted() {
        EventBus.$on('rander-minstate', data => {
            this.randerMinState();
        });
        EventBus.$on('reset-minstate', data => {
            let panelWidth = this.$(".minstate-panel").outerWidth()
            let num = panelWidth / 70
            this.$store.commit('window/update_windowMaxNum', Math.floor(num));
        });
    },
    methods: {
        randerMinState() {
            this.minBox = []
            let that = this
            var allBox = JSON.parse(JSON.stringify(this.$store.state.window.winBox));
            if (this.$store.state.sys.taskNavMode == 'nomal') {
                for (let i = 0; i < allBox.length; i++) {
                    let menutemp = this.$store.state.window.allMenu.filter((item) => {
                        return item.menuCode == allBox[i].menuCode
                    })
                    if (menutemp.length > 0) {
                        allBox[i].imgOrIcon = menutemp[0].imgOrIcon
                        if (menutemp[0].imgOrIcon == 'image') {
                            if (!menutemp[0].imgUrl.endsWith('.png')) {
                                allBox[i].imgUrl = require('@/assets/image/menuicon/' + menutemp[0].imgUrl + '.png')
                            } else {
                                allBox[i].imgUrl = menutemp[0].imgUrl
                            }
                        } else {
                            allBox[i].icon = menutemp[0].icon
                            allBox[i].iconColor = menutemp[0].iconColor
                        }
                    }

                    let menusys = this.$store.state.sys.contextMenuConfig.filter((item) => {
                        return item.menuCode == allBox[i].menuCode
                    })
                    if (menusys.length > 0) {
                        allBox[i].imgOrIcon = 'image'
                        if (!menusys[0].imgUrl.endsWith('.png')) {
                            allBox[i].imgUrl = require('@/assets/image/menuicon/' + menusys[0].imgUrl + '.png')
                        } else {
                            allBox[i].imgUrl = menusys[0].imgUrl
                        }
                    }
                }
                this.minBox = allBox;
            } else if (this.$store.state.sys.taskNavMode == 'onlymin') {
                let minWin = allBox.filter((item) => {
                    return item.winStatus == 'MIN'
                })
                for (let i = 0; i < minWin.length; i++) {
                    let menutemp = this.$store.state.window.allMenu.filter((item) => {
                        return item.menuCode == minWin[i].menuCode
                    })

                    if (menutemp.length > 0) {
                        minWin[i].imgOrIcon = menutemp[0].imgOrIcon
                        if (menutemp[0].imgOrIcon == 'image') {
                            if (!menutemp[0].imgUrl.endsWith('.png')) {
                                minWin[i].imgUrl = require('@/assets/image/menuicon/' + menutemp[0].imgUrl + '.png')
                            } else {
                                minWin[i].imgUrl = menutemp[0].imgUrl
                            }

                        } else {
                            minWin[i].icon = menutemp[0].icon
                            minWin[i].iconColor = menutemp[0].iconColor
                        }
                    }

                    let menusys = this.$store.state.sys.contextMenuConfig.filter((item) => {
                        return item.menuCode == allBox[i].menuCode
                    })
                    if (menusys.length > 0) {
                        minWin[i].imgOrIcon = 'image'
                        if (!menusys[0].imgUrl.endsWith('.png')) {
                            minWin[i].imgUrl = require('@/assets/image/menuicon/' + menusys[0].imgUrl + '.png')
                        } else {
                            minWin[i].imgUrl = menusys[0].imgUrl
                        }
                    }
                }
                this.minBox = minWin;
            }
        },
        minWindow(winid) {
            EventBus.$emit('change-window-min', winid);
        },
        nomalWindow(winid) {
            EventBus.$emit('window-nomal', winid);
            this.changeNomal(winid);
        },
        closeWindow(winid) {
            EventBus.$emit('change-window-close', winid);
        },
        changeNomal(winid) {
            this.$store.commit('window/update_window_status_nomal', winid);
            if (this.$store.state.sys.taskNavMode == 'onlymin') {
                this.randerMinState();
            }
            EventBus.$emit('system-info-refrash', true);
        },
        getImg(winid) {
            let imgs = this.$store.state.window.windowThumb.filter(function (item) {
                return item.WinId == winid
            })
            if (imgs.length > 0) {
                return imgs[0].dataurl
            }
        },
        getClassStyle(winid) {
            if (this.$store.state.sys.taskNavMode == 'nomal') {
                if (this.$store.state.window.currentActiveWinId == winid) {
                    return 'win-min-item-active';
                } else {
                    return 'win-min-item';
                }
            }
            return 'win-min-item';
        }
    }
}
</script>
<style scoped lang="scss">
.minstate-panel {
    height: 26px;
    width: 100%;
    display: inline-block;
    text-align: left;
    margin: 5px 0px;
    transition: all .4s ease-in-out;

    .win-min-item {
        width: 96px;
        height: 24px;
        display: inline-block;
        border: 1px solid rgba($color: #ffffff, $alpha: 0.15);
        border-radius: 2px;
        background: rgba($color: #ffffff, $alpha: 0.15);
        margin: 0px 2px;
        transition: all .4s ease-in-out;
        float: left;

        .task-baricon {
            width: 16px;
            height: 16px;
            margin: 5px;
            border-radius: 3px;
            display: inline-block;
            line-height: 16px;
            text-align: center;
            color: #FFFFFF;
            float: left;
        }

        .task-barimage {
            width: 16px;
            height: 16px;
            padding: 5px;
            display: inline-block;
            line-height: 16px;
            text-align: center;
            float: left;
        }

        span {
            width: 65px;
            height: 26px;
            display: inline-block;
            line-height: 26px;
            text-align: left;
            color: #fefefe;
            font-size: 11px;
            padding-left: 5px;
            float: left;
        }

        &:hover {
            cursor: pointer;
            border-bottom: 1px solid $themeColor;
            transition: all .4s ease-in-out;

            &>span {
                color: #fcfcfc;
                font-weight: 500;
                transition: all .4s ease-in-out;
            }

            &>.short-img {
                display: inline-block;
                transition: all .4s ease-in-out;
            }
        }
    }

    .win-min-item-active {
        width: 96px;
        height: 24px;
        display: inline-block;
        border-radius: 2px;
        border: 1px solid rgba($color: #ffffff, $alpha: 0.4);
        border-bottom: 1px solid $themeColor;
        background: rgba($color: #ffffff, $alpha: 0.3);
        margin: 0px 2px;
        transition: all .4s ease-in-out;
        float: left;


        .task-barimage {
            width: 16px;
            height: 16px;
            padding: 5px;
            display: inline-block;
            line-height: 16px;
            text-align: center;
            float: left;
        }

        .task-baricon {
            width: 16px;
            height: 16px;
            border-radius: 3px;
            margin: 5px;
            display: inline-block;
            line-height: 16px;
            color: #FFFFFF;
            text-align: center;
            float: left;
        }

        span {
            width: 65px;
            height: 26px;
            display: block;
            line-height: 26px;
            text-align: left;
            color: #ffffff;
            font-weight: 500;
            font-size: 11px;
            padding-left: 5px;
            float: left;
        }

        &:hover {
            cursor: pointer;
            transition: all .4s ease-in-out;

            &>.short-img {
                display: inline-block;
                transition: all .4s ease-in-out;
            }
        }
    }

    .short-img {
        position: absolute;
        left: 0px;
        top: -125px;
        width: 180px;
        height: 120px;
        padding: 5px;
        background: rgba($color: #000000, $alpha: 0.3);
        display: none;
        border-radius: 5px;
        cursor: pointer;
        transition: all .4s ease-in-out;

        img {
            position: relative;
            left: 5px;
            top: 5px;
            object-fit: fill;
            transition: all .4s ease-in-out;
        }

        i {
            position: absolute;
            width: 26px;
            height: 26px;
            line-height: 26px;
            text-align: center;
            top: 0px;
            right: 0px;
            background: #FFFFFF;
            color: $themeColor;
            font-size: 18px;
            font-weight: 500;
            border-radius: 13px;
            box-shadow: $shadow-theme1;
            transition: all .4s ease-in-out;

            &:hover {
                background: $themeColor;
                color: #FFFFFF;
                box-shadow: $shadow-theme1;
                transition: all .4s ease-in-out;
            }
        }
    }
}
</style>
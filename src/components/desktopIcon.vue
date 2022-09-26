<!--
桌面图标
-->
<template>
    <transition name="appicon-show">
        <div :menucode="menuCode" class="AppIcon unselect" v-show="isShow"
            :style="{left:`${layerX}px`,top:`${layerY}px`}">
            <template v-if="imgOrIcon=='image'">
                <div class="app-img" @mousedown="MD($event)" @mouseup="MU($event)" @click="openWin()"
                    @contextmenu.prevent.stop="CancleShortCut($event)">
                    <div v-if="(menuCode=='recycleBin100')" class="recyclebin recyclebin-empty"
                        :style="{backgroundImage:`url(${imgUrl})`}"></div>
                    <img v-else :src="imgUrl" width="60" height="60" />
                </div>
                <div class="app-name showdot">{{menuName}}</div>
            </template>
            <template v-else>
                <div class="app-icon" :style="{background:`${iconColor}`}" @mousedown="MD($event)" @mouseup="MU($event)"
                    @click="openWin()" @contextmenu.prevent.stop="CancleShortCut($event)">
                    <i class="iconfont">{{Icon}}</i>
                </div>
                <div class="app-name showdot">{{menuName}}</div>
            </template>

        </div>
    </transition>
</template>
<script>
import EventBus from '@/utils/eventbus.js'
export default {
    props: {
        menuCode: {
            type: String,
            default: "0"
        },
        Inx: {
            type: Number,
            default: 0
        },
        layerX: {
            type: Number,
            default: 0
        },
        layerY: {
            type: Number,
            default: 0
        },
        AppIcon: {
            type: String,
            default: '未命名'
        },
        iconColor: {
            type: String,
            default: '#888888'
        },
        menuName: {
            type: String,
            default: '未命名'
        },
        Icon: {
            type: String,
            default: ''
        },
        imgOrIcon: {
            type: String,
            default: 'icon'
        },
        imgUrl: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            isShow: false,
            isClick: false,
            md_X: 0,
            md_Y: 0
        }
    },
    mounted() {
        var that = this;
        setTimeout(function () {
            that.isShow = true;
        }, this.Inx * 50)
        if (this.menuCode == 'recycleBin100') {
            /**播放垃圾箱清除的动画 */
            EventBus.$on('play-recyclebinani', data => {
                if (this.$('.recyclebin').hasClass('recyclebin-full')) {
                    this.$('.recyclebin').addClass('recyclebin-ani');
                }
            });
            EventBus.$on('empty-recyclebin', data => {
                if (this.$('.recyclebin').hasClass('recyclebin-full')) {
                    this.$('.recyclebin').removeClass('recyclebin-full');
                }
                this.$('.recyclebin').addClass('recyclebin-empty');
            });
            EventBus.$on('full-recyclebin', data => {
                if (this.$('.recyclebin').hasClass('recyclebin-empty')) {
                    this.$('.recyclebin').removeClass('recyclebin-empty');
                }
                if (this.$('.recyclebin').hasClass('recyclebin-ani')) {
                    this.$('.recyclebin').removeClass('recyclebin-ani');
                }
                this.$('.recyclebin').addClass('recyclebin-full');
            });
        }
    },
    methods: {
        openWin() {
            if (this.menuCode != this.$store.state.sys.recycleBinId) {
                if (this.isClick) {
                    this.$emit('openWin');
                    this.isClick = false;
                }
            }
        },
        MD(e) {
            this.md_X = e.screenX;
            this.md_Y = e.screenY;
        },
        MU(e) {//拖动不触发点击事件
            if (e.screenX == this.md_X && e.screenY == this.md_Y) {
                this.isClick = true;
            }
        },
        CancleShortCut(e) {
            if (this.menuCode == this.$store.state.sys.recycleBinId) {
                EventBus.$emit('open-contextclearrecyclebin', { "X": e.pageX, "Y": e.pageY });
            } else {
                EventBus.$emit('close-contextclearrecyclebin', false);
            }
        }

    }
}
</script>
<style scoped lang="scss">
.AppIcon {
    display: inline-block;
    width: 60px;
    height: 80px;
    padding: 5px;
    border-radius: 5px;
    position: absolute;

    .app-icon {
        display: block;
        width: 40px;
        height: 40px;
        margin: 10px;
        text-align: center;
        line-height: 40px;
        background: #FF0000;
        color: #FFFFFF;
        border-radius: 8px;

        i {
            font-size: 30px;
            text-shadow: #666 1px 2px 2px;
            width: 40px;
            height: 40px;
        }
    }

    .app-img {
        display: block;
        width: 40px;
        height: 40px;
        padding: 10px;
        text-align: center;
        line-height: 40px;
        color: #FFFFFF;
        border-radius: 8px;

        img {
            width: 40px;
            height: 40px;
            object-fit: fill;
        }
    }

    .app-name {
        display: block;
        width: 60px;
        height: 20px;
        text-align: center;
        line-height: 20px;
        font-weight: 500;
        font-size: 10px;
        color: #FFFFFF;
        text-shadow: #666 1px 2px 2px;
    }

    &:hover {
        cursor: pointer;
        background: rgba($color: #FFFFFF, $alpha: 0.4);

        .app-name {
            overflow: visible;
            font-size: 10px;
            transition: all .4s ease-in-out;
            text-overflow: ellipsis !important;
            white-space: normal !important;
        }
    }

    .recyclebin {
        background-repeat: no-repeat;
        background-size: cover;
        width: 40px;
        height: 40px;
    }

    .recyclebin-empty {
        background-position: 0px 0px;
    }

    .recyclebin-full {
        background-position: -160px 0px;
    }

    .recyclebin-ani {
        animation: recyclebin 1s steps(1, start) 1;
        -webkit-animation: recyclebin 1s steps(1, start) 1;
        animation-fill-mode: forwards;
    }
}
</style>
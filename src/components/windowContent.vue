<!--
打开的窗体页面
-->
<template>
    <transition name="widow-close">
        <div :id=WinId class="win-content" v-show="isVisible"
            :style="{left:`${layerX}px`,top:`${layerY}px`,width:`${_width}px`,height:`${_height}px`,minWidth:`${minWidth}px`,minHeight:`${minHeight}px`,zIndex:`${ZIndex}`}"
            @click="ActiveWindow" @contextmenu="CopyTxt()">
            <div v-if='sysWindow' class="win-title unselect">
                <div class="win-title-left"><span><i class="iconfont">&#xe725;</i>{{windowName}}</span></div>
                <div class="win-title-right">
                    <i class="iconfont win-min" @click.stop="MinWindow(WinId)"></i>
                    <i v-if="!isWindowMax" class="iconfont win-max" @click.stop="MaxWindow"></i>
                    <i v-else class="iconfont win-nomal" @click.stop="MaxWindow"></i>
                    <i class="iconfont win-close" @click.stop="CloseWindow(WinId)"></i>
                </div>
            </div>
            <div v-else class="win-title unselect">
                <div class="win-title-left"><span><i class="iconfont">&#xe767;</i>{{windowName}}</span></div>
                <div class="win-title-right">
                    <i class="iconfont win-min" @click.stop="MinWindow(WinId)"></i>
                    <i v-if="!isWindowMax" class="iconfont win-max" @click.stop="MaxWindow"></i>
                    <i v-else class="iconfont win-nomal" @click.stop="MaxWindow"></i>
                    <i class="iconfont win-close" @click.stop="CloseWindow(WinId)"></i>
                </div>
            </div>
            <div class="win-panel">
                <el-scrollbar style="height: 100%;" wrapStyle="overflow-x:hidden;">
                    <router-view :name=WinId :WinId="WinId" />
                </el-scrollbar>
            </div>
        </div>
    </transition>
</template>
<script>
import EventBus from '@/utils/eventbus.js'
export default {
    data() {
        return {
            isVisible: false,
            _width: 0,
            _height: 0,
            minWidth: 0,
            minHeight: 0,
            isWindowMax: false,
            windowName: '',
            iframe: false
        }
    },
    created() {
        this._width = this.$store.state.sys.windowSize.width;
        this._height = this.$store.state.sys.windowSize.height;
        this.minWidth = this.$store.state.sys.windowSize.minWidth;
        this.minHeight = this.$store.state.sys.windowSize.minHeight;
        this.$store.state.sys.windowSize2.forEach(item => {
            if (item.menuCode == this.menuCode) {
                this._width = item.width == '' ? this._width : item.width;
                this._height = item.height == '' ? this._height : item.height;
                this.minWidth = item.minWidth == '' ? this._minWidth : item.minWidth;
                this.minHeight = item.minHeight == '' ? this._minHeight : item.minHeight;
            }
        });
        this.windowName = this.menuName;
    },
    props: {
        WinId: {
            type: String,
            default: 'W0'
        },
        menuCode: {
            type: String,
            default: ''
        },
        WindowStatus: {
            type: String,
            default: 'NOMAL'
        },
        layerX: {
            type: Number,
            default: 50
        },
        layerY: {
            type: Number,
            default: 50
        },
        menuName: {
            type: String,
            default: '未命名'
        },
        sysWindow: {
            type: Boolean,
            default: false
        },
        ZIndex: {
            type: Number,
            default: 20
        }
    },
    mounted() {
        var that = this;
        this.$(".win-content").resizable({
            stop: function (event, ui) {
                EventBus.$emit('change-windowsize', { height: (ui.size.height - 40), menuCode: that.menuCode });
            }
        });
        EventBus.$on('active-window', data => {
            this.$store.commit('window/update_current_active_window_id', data);
            if (this.WinId == data) {
                if (this.sysWindow) {
                    this.$('#' + this.WinId + ' .win-title').css('background-color', 'rgba(255,255,255,0.3)');
                    this.$('#' + this.WinId + ' .win-title-left span').css('color', 'rgba(255,255,255,1)');
                    this.$('#' + this.WinId + ' .win-title-right i').css('color', 'rgba(255,255,255,1)');
                } else {
                    this.$('#' + this.WinId + ' .win-title').css('background-color', this.$store.state.sys.topWindowColor);
                    this.$('#' + this.WinId + ' .win-title-left span').css('color', 'rgba(255,255,255,1)');
                    this.$('#' + this.WinId + ' .win-title-right i').css('color', 'rgba(255,255,255,1)');
                }
                //let newIndex = this.$store.state.window.winBox[this.$store.state.window.winBox.length - 1].zIndex
                this.$('#' + this.WinId).css('z-index', 1000);
            } else {
                if (this.sysWindow) {
                    this.$('#' + this.WinId + ' .win-title').css('background-color', 'rgba(255,255,255,0.3)');
                    this.$('#' + this.WinId + ' .win-title-left span').css('color', 'rgba(255,255,255,1)');
                    this.$('#' + this.WinId + ' .win-title-right i').css('color', 'rgba(255,255,255,1)');
                } else {
                    this.$('#' + this.WinId + ' .win-title').css('background-color', this.$store.state.sys.unActiveWindowColor);
                    this.$('#' + this.WinId + ' .win-title-left span').css('color', 'rgba(255,255,255,1)');
                    this.$('#' + this.WinId + ' .win-title-right i').css('color', 'rgba(255,255,255,1)');
                }
                this.$('#' + this.WinId).css('z-index', this.ZIndex);
            }
        });
        EventBus.$on('update-topwindow-color', color => {
            // this.$('#' + this.WinId + ' .win-title').css('background-color', color);
        });
        EventBus.$on('update-unactivewindow-color', color => {
            this.$('#' + this.WinId + ' .win-title').css('background-color', color);
        });
        EventBus.$on('window-nomal', data => {
            //将收到恢复状态的，显示出来
            if (this.WinId === data) {
                this.isVisible = true;
                EventBus.$emit('active-window', this.WinId);
            }
        });
        EventBus.$on('window-title', data => {
            if (this.menuCode === data.menuCode) {
                this.windowName = data.windowName;
            }
        });
        EventBus.$on('recover-window-size', data => {
            if (this.menuCode === data.menuCode) {
                this._width = this.$store.state.sys.windowSize.width;
                this._height = this.$store.state.sys.windowSize.height;
                this.$store.state.sys.windowSize2.forEach(item => {
                    if (item.menuCode == this.menuCode) {
                        this._width = item.width == '' ? this._width : item.width;
                        this._height = item.height == '' ? this._height : item.height;
                        this.$("#" + this.WinId).addClass('transition_ani');
                        let that = this
                        setTimeout(function () {
                            that.$("#" + that.WinId).removeClass('transition_ani');
                        }, 500)
                    }
                });
            }
        });
        EventBus.$on('change-window-size', data => {
            if (this.menuCode === data.menuCode) {
                this._width = data.width;
                this._height = data.height;
                this.$("#" + this.WinId).addClass('transition_ani');
                let that = this
                setTimeout(function () {
                    that.$("#" + that.WinId).removeClass('transition_ani');
                }, 500)
            }
        });
        EventBus.$on('change-window-min', data => {
            this.MinWindow(data)
        });
        EventBus.$on('change-window-close', data => {
            this.CloseWindow(data)
        });
        EventBus.$emit('active-window', this.WinId);
        //挂载完成后，在显示，这样才有动画
        this.isVisible = true
        if (this.$store.state.sys.taskNavMode == 'nomal') {
            EventBus.$emit('rander-minstate', true);
            setTimeout(function () {
                that.getWindowImg();
            }, 1500);
        }
    },
    methods: {
        CopyTxt() {
            let copytxt = "";
            if (window.getSelection) {
                copytxt = window.getSelection().toString();
            } else if (document.getSelection) {
                copytxt = document.getSelection().toString();
            } else if (document.selection) {
                copytxt = document.selection.createRange().text;
            }
            if (copytxt.toString() != '') {
                this.$notify({
                    title: '复制信息',
                    message: copytxt.toString()
                });
            }
        },
        ActiveWindow() {
            EventBus.$emit('active-window', this.WinId);
        },
        MinWindow(WinId) {
            if (WinId == this.WinId) {
                this.isVisible = false;
                this.$store.commit('window/update_window_status_min', this.WinId);
                this.getWindowImg();
                if (this.$store.state.window.winBox.length > 1) {
                    var TopWin = this.$store.state.window.winBox.filter(function (item) { return item.winStatus != 'MIN' })
                    let num = TopWin.length;
                    if (num > 0) {
                        EventBus.$emit('active-window', TopWin[num - 1].WinId);
                    }
                }
                EventBus.$emit('rander-minstate', true);
            }
        },
        MaxWindow() {
            let desktopHeight = this.$store.state.window.desktopHeight;
            let desktopWidth = this.$store.state.window.desktopWidth;
            if (this.isWindowMax) {
                this._width = this.$store.state.sys.windowSize.width;
                this._height = this.$store.state.sys.windowSize.height;
                this.$store.state.sys.windowSize2.forEach(item => {
                    if (item.menuCode == this.menuCode) {
                        if (item.width != '') {
                            this._width = item.width;
                        }
                        if (item.height != '') {
                            this._height = item.height;
                        }
                    }
                });
                this.$("#" + this.WinId).css('left', this.layerX + 'px');
                this.$("#" + this.WinId).css('top', this.layerY + 'px');
                this.$("#" + this.WinId).addClass('transition_ani');
                let that = this
                setTimeout(function () {
                    that.$("#" + that.WinId).removeClass('transition_ani');
                }, 500)
                this.$store.commit('window/update_window_status_nomal', this.WinId);
                this.isWindowMax = false
            } else {
                this.$("#" + this.WinId).css('left', '0px');
                this.$("#" + this.WinId).css('top', '0px');
                this.$("#" + this.WinId).addClass('transition_ani');
                let that = this
                setTimeout(function () {
                    that.$("#" + that.WinId).removeClass('transition_ani');
                }, 500)
                this._width = desktopWidth;
                this._height = desktopHeight;
                this.$store.commit('window/update_window_status_max', this.WinId);
                this.isWindowMax = true
            }
            EventBus.$emit('change-windowsize', { height: (this._height - 40), menuCode: this.menuCode });
        },
        CloseWindow(WinId) {
            if (WinId == this.WinId) {
                this.$store.commit('window/remove_window', this.WinId);
                this.isVisible = false;
                //关闭窗口时，取前一个窗口激活
                if (this.$store.state.window.winBox.length > 0) {
                    var TopWin = this.$store.state.window.winBox[this.$store.state.window.winBox.length - 1];
                    EventBus.$emit('active-window', TopWin.WinId);
                    this.$store.commit('window/update_currentActiveWindowPath', TopWin.urlPath);
                    this.$router.push('/home/' + TopWin.urlPath)
                } else {
                    this.$router.push('/home')
                }
                EventBus.$emit('refrash-window', true);
                EventBus.$emit('rander-minstate', true);
            }
        },
        getWindowImg() {
            this.$h2c(document.querySelector("#" + this.WinId)).then(canvas => {
                let dataURL = canvas.toDataURL("image/png");
                this.$store.commit('window/update_windowThumb', { WinId: this.WinId, dataurl: dataURL });
            });
        }
    }

}
</script>
<style scoped lang="scss">
.transition_ani {
    transition: all .4s ease-in-out;
}

.win-content {
    position: absolute;
    left: 0;
    top: 0;
    display: inline-block;
    border-radius: 5px;
    overflow: hidden;
    box-shadow: $shadow-3;

    .win-title {
        display: block;
        width: 100%;
        height: 36px;
        backdrop-filter: blur(15px);
        line-height: 36px;
        border-radius: 5px 5px 0px 0px;

        .win-title-left {
            display: inline-block;
            width: calc(100% - 80px);
            height: 36px;

            span {
                float: left;
                padding-left: 10px;
                font-size: 16px;
                font-weight: 500;
                color: #ffffff;

                i {
                    margin-right: 5px;
                }
            }
        }

        .win-title-right {
            display: inline-block;
            width: 76px;
            height: 24px;
            padding: 6px 0px;
            text-align: center;

            i {
                height: 24px;
                width: 24px;
                line-height: 24px;
                text-align: center;
                font-size: 13px;
                font-weight: 500;
                color: #ffffff;
                border-radius: 14px;
                float: left;

                &:hover {
                    cursor: pointer;
                }
            }

            .win-min::after {
                content: '\e8ba';
            }

            .win-max::after {
                content: '\e903';
            }

            .win-nomal::after {
                content: '\e6e6';
            }

            .win-close::after {
                content: '\eaee';
            }

            .win-min:hover {
                background: rgba($color: #040404, $alpha: 0.2);
                color: #FFFFFF;
            }

            .win-max:hover {
                background: rgba($color: #000000, $alpha: 0.2);
                color: #FFFFFF;
            }

            .win-nomal:hover {
                background: rgba($color: #000000, $alpha: 0.2);
                color: #FFFFFF;
            }

            .win-close:hover {
                background: rgba($color: #ff0909, $alpha: 0.8);
                color: #FFFFFF;
            }
        }

        &:hover {
            cursor: move;
        }
    }

    .win-panel {
        width: 100%;
        height: calc(100% - 36px);
        background-color: rgba($color: #ffffff, $alpha: 0.2);
        border-radius: 0px 0px 5px 5px;
        backdrop-filter: blur(15px);

        .iframeContent {
            width: 100%;
            height: 100%;
        }
    }

    .is-iframe {
        background-color: rgba($color: #ffffff, $alpha: 1);
    }
}
</style>
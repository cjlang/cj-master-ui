<!--
通知中心面板
-->
<template>
    <div class="noticecenter-panel">
        <div class="noticecenter-title">
            <span @click="ClearNotify()"><i class="iconfont">&#xe923;</i>&nbsp;清空
                ({{this.$store.state.window.notifyNum}})</span>
        </div>
        <div class="notify-area">
            <el-scrollbar style="height: 100%;" wrapStyle="overflow-x:hidden;">
                <div id="notifyList"></div>
            </el-scrollbar>
        </div>
        <div class="noticecenter-other">
            <el-row :gutter="5">
                <el-col :span="6">
                    <div class="bg-box">
                        <i class="iconfont">&#xe65e;</i>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="bg-box">
                        <i class="iconfont">&#xea02;</i>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="bg-box">
                        <i class="iconfont">&#xea88;</i>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="bg-box">
                        <i class="iconfont">&#xedb1;</i>
                    </div>
                </el-col>
            </el-row>
            <el-row :gutter="5">
                <el-col :span="6">
                    <div class="bg-box">
                        <i class="iconfont">&#xe7b1;</i>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="bg-box">
                        <i class="iconfont">&#xe9d7;</i>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="bg-box">
                        <i class="iconfont">&#xeada;</i>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="bg-box">
                        <i class="iconfont">&#xe8df;</i>
                    </div>
                </el-col>
            </el-row>
            <el-row :gutter="5">
                <el-col :span="6">
                    <div class="bg-box">
                        <i class="iconfont">&#xe783;</i>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="bg-box">
                        <i class="iconfont">&#xeadd;</i>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="bg-box">
                        <i class="iconfont">&#xebd7;</i>
                    </div>
                </el-col>
            </el-row>
        </div>
    </div>
</template>
<script>
//import EventBus from '@/utils/eventbus.js'
export default {
    data() {
        return {
            msgList: []
        }
    },
    mounted() {
        this.$(".notify-area").css('height', (this.$store.state.window.desktopHeight - 186) + "px");
    },
    methods: {
        ClearNotify() {
            this.$mynotify.closeAll()
        }
    }
}
</script>
<style scoped lang="scss">
.noticecenter-panel {
    width: 100%;
    height: 100%;
    display: block;
    transition: all .4s ease-in-out;

    .noticecenter-title {
        width: 100%;
        height: 36px;
        display: block;
        line-height: 36px;
        background-color: rgba($color: #222222, $alpha: 0.2);

        span {
            color: #FFFFFF;
            font-size: 12px;
            float: right;
            padding-right: 10px;

            i {
                display: inline-block;
                color: #FFFFFF;
                font-size: 12px;
            }

            &:hover {
                cursor: pointer;
                color: $themeColor;

                &>i {
                    cursor: pointer;
                    color: $themeColor;
                }
            }
        }
    }

    .notify-area {
        display: block;
        width: 100%;
        background-color: rgba($color: #000000, $alpha: 0);
    }

    .noticecenter-other {
        background-color: rgba($color: #000000, $alpha: 0.2);
        width: 100%;
        display: block;
        height: 150px;

        .el-row {
            margin: 5px;
            text-align: center;
            padding: 0px 5px;
        }

        .bg-box {
            background: rgba($color: #1C1C1C, $alpha: 0.4);
            width: 100%;
            display: block;
            min-height: 40px;
            text-align: center;
            transition: all .4s ease-in-out;

            &:hover {
                cursor: pointer;
                background: rgba($color: $themeColor, $alpha: 0.4);
                transition: all .4s ease-in-out;
            }

            i {
                width: 40px;
                height: 40px;
                display: inline-block;
                color: #FFFFFF;
                line-height: 40px;
                font-size: 18px;
            }
        }
    }
}

/deep/.el-scrollbar__view,
.el-scrollbar__wrap {
    overflow-x: hidden;
}
</style>
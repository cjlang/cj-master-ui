<template>
    <div class="content-panel unselect">
        <div class="system-panel" v-show="currentPage == 'all'">
            <el-row :gutter="10">
                <el-col :span="12">
                    <div class="bg-box-left" @click="editConfig(1)">
                        <div class="icon">
                            <i class="iconfont">&#xe614;</i>
                        </div>
                        <div class="discripinfo">
                            <span class="setting-name">个性化</span>
                            <span class="setting-tip">桌面背景、任务栏、颜色配置</span>
                        </div>
                    </div>
                </el-col>
                <el-col :span="12">
                    <div class="bg-box-right" @click="editConfig(2)">
                        <div class="icon">
                            <i class="iconfont">&#xece0;</i>
                        </div>
                        <div class="discripinfo">
                            <span class="setting-name">桌面配置</span>
                            <span class="setting-tip">右键菜单、窗口大小，效果</span>
                        </div>
                    </div>
                </el-col>
            </el-row>
            <el-row :gutter="10">
                <el-col :span="12">
                    <div class="bg-box-left" @click="editConfig(4)">
                        <div class="icon">
                            <i class="iconfont">&#xe601;</i>
                        </div>
                        <div class="discripinfo">
                            <span class="setting-name">收藏</span>
                            <span class="setting-tip">任务栏、开始菜单</span>
                        </div>
                    </div>
                </el-col>
                <el-col :span="12">
                    <div class="bg-box-right" @click="editConfig(3)">
                        <div class="icon">
                            <i class="iconfont">&#xe8e1;</i>
                        </div>
                        <div class="discripinfo">
                            <span class="setting-name">特效</span>
                            <span class="setting-tip">桌面模糊</span>
                        </div>
                    </div>
                </el-col>
            </el-row>
            <el-row :gutter="10">
                <el-col :span="12">
                    <div class="bg-box-left" @click="editConfig(4)">
                        <div class="icon">
                            <i class="iconfont">&#xe7e1;</i>
                        </div>
                        <div class="discripinfo">
                            <span class="setting-name">任务栏</span>
                            <span class="setting-tip">配置、权限</span>
                        </div>
                    </div>
                </el-col>
                <el-col :span="12">
                    <div class="bg-box-right" @click="editConfig(5)">
                        <div class="icon">
                            <i class="iconfont">&#xeb07;</i>
                        </div>
                        <div class="discripinfo">
                            <span class="setting-name">认证</span>
                            <span class="setting-tip">指纹、虹膜、声音</span>
                        </div>
                    </div>
                </el-col>
            </el-row>
            <el-row :gutter="10">
                <el-col :span="12">
                    <div class="bg-box-left" @click="editConfig(4)">
                        <div class="icon">
                            <i class="iconfont">&#xe77e;</i>
                        </div>
                        <div class="discripinfo">
                            <span class="setting-name">登录</span>
                            <span class="setting-tip">账号、密码、权限</span>
                        </div>
                    </div>
                </el-col>
                <el-col :span="12">
                    <div class="bg-box-right" @click="editConfig(3)">
                        <div class="icon">
                            <i class="iconfont">&#xea81;</i>
                        </div>
                        <div class="discripinfo">
                            <span class="setting-name">同步</span>
                            <span class="setting-tip">配置、缓存</span>
                        </div>
                    </div>
                </el-col>
            </el-row>
        </div>
        <transition name="fade">
            <div class="system-item" v-if="currentPage == 'single'">
                <photo-color v-if="subPage==1"></photo-color>
                <window-size v-if="subPage==2"></window-size>
                <effect-config v-if="subPage==3"></effect-config>
                <task-favorite v-if="subPage==4"></task-favorite>
                <auth-setting v-if="subPage==5"></auth-setting>
                <div class="window-opter" v-show="backButton">
                    <div class="opter-button">
                        <i class="iconfont" @click="backMenuPage()">&#xe836;</i>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>
<script>
import PhotoColor from "./photoColor.vue";
import WindowSize from "./windowSize.vue";
import EffectConfig from "./effectConfig.vue";
import TaskFavorite from "./taskFavorite.vue";
import AuthSetting from "./authSetting.vue";
export default {
    components: { PhotoColor, WindowSize, EffectConfig, TaskFavorite, AuthSetting },
    data() {
        return {
            currentPage: "all",
            subPage: "",
            backButton: false,
            configGroupName: "",
        };
    },
    created() {
    },
    methods: {
        editConfig(id) {
            this.currentPage = "single"
            this.subPage = id
            let that = this
            setTimeout(function () {
                that.backButton = true
            }, 1000)
        },
        backMenuPage() {
            this.currentPage = "all";
            this.subPage = ""
            this.backButton = false
        }
    }
}
</script>
<style scoped lang="scss">
.system-panel {
    width: calc(100% - 100px);
    height: 100%;
    display: block;
    overflow-x: hidden;
    padding: 10px 50px;
}

.el-row {
    margin: 10px;
}

.bg-box-left {
    width: 330px;
    height: 70px;
    transition: all .4s ease-in-out;
    float: right;

    &:hover {
        cursor: pointer;
        opacity: 0.7;
    }

    .icon {
        width: 70px;
        height: 70px;
        float: left;
        text-align: center;

        i {
            width: 70px;
            height: 70px;
            line-height: 70px;
            font-size: 38px;
            font-family: 500;
            color: $themeColor;
        }
    }

    .discripinfo {
        width: 260px;
        height: 50px;
        padding: 10px 0px;
        float: right;

        .setting-name {
            display: block;
            height: 25px;
            line-height: 25px;
            text-align: left;
            font-size: 16px;
            font-weight: bold;
            color: #272727;
        }

        .setting-tip {
            display: block;
            height: 25px;
            line-height: 25px;
            text-align: left;
            font-size: 14px;
            color: #6e6e6e;
        }
    }
}

.bg-box-right {
    width: 330px;
    height: 70px;
    transition: all .4s ease-in-out;
    float: left;

    &:hover {
        cursor: pointer;
        opacity: 0.7;
    }

    .icon {
        width: 70px;
        height: 70px;
        float: left;
        text-align: center;

        i {
            width: 70px;
            height: 70px;
            line-height: 70px;
            font-size: 38px;
            font-family: 500;
            color: $themeColor;
        }
    }

    .discripinfo {
        width: 260px;
        height: 50px;
        padding: 10px 0px;

        .setting-name {
            display: block;
            height: 25px;
            line-height: 25px;
            text-align: left;
            font-size: 16px;
            font-weight: bold;
            color: #272727;
        }

        .setting-tip {
            display: block;
            height: 25px;
            line-height: 25px;
            text-align: left;
            font-size: 14px;
            color: #6e6e6e;
        }
    }
}
</style>
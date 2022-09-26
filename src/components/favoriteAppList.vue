<!--
程序菜单栏快捷方式
-->
<template>
    <el-scrollbar style="height: 100%;" wrapStyle="overflow-x:hidden;">
        <transition name="favoriteapp-show">
            <div v-show="isShow" class="favoriteapp-panel">
                <el-row :gutter="10" :key="index" v-for="(cols,index) in favoriteAppList">
                    <el-col :span="col.span" :key="key" v-for="(col,key) in cols">
                        <div v-if="col.hasOwnProperty('menuCode')" class="bg-box" aniType="0"
                            @click="openMenu(col.menuCode)">
                            <div class="box-info">
                                <span>{{col.menuName}}</span>
                            </div>
                            <div class="box-img">
                                <img :src='col.imgUrl' />
                            </div>
                        </div>
                        <div v-else class="bg-null">
                        </div>
                    </el-col>
                </el-row>
            </div>
        </transition>
    </el-scrollbar>
</template>
<script>
import EventBus from '@/utils/eventbus.js'
export default {
    data() {
        return {
            favoriteAppList: [],
            isShow: false
        }
    },
    created() {
        this.favoriteAppList = this.$store.state.sys.startMenuFavoriteConfig;
    },
    mounted() {
        EventBus.$on('show-favoriteapp', data => {
            this.isShow = data;
        });
        var that = this;
        this.$(".favoriteapp-panel .bg-box").hover(function () {
            let type = that.$tools.getRandom(4);
            that.$(this).attr('aniType', type);
            that.$(this).css('background-color', '#' + ('00000' + (Math.random() * 0x1000000 << 0).toString(16)).slice(-6));
            if (type == 1)//向上消失
            {
                that.$(this).children('.box-img').css({ 'height': '0px', 'left': '0px', 'right': 'auto', 'opacity': '0', 'float': 'left' })
            }
            if (type == 2)//向下消失
            {
                that.$(this).children('.box-img').css({ 'height': '0px', 'bottom': '0px', 'top': 'auto', 'opacity': '0', 'float': 'left' })
            }
            if (type == 3)//向左消失
            {
                that.$(this).children('.box-img').css({ 'width': '0px', 'left': '0px', 'right': 'auto', 'float': 'left', 'opacity': '0' })
            }
            if (type == 4)//向右消失
            {
                that.$(this).children('.box-img').css({ 'width': '0px', 'left': 'auto', 'right': '0px', 'float': 'right', 'opacity': '0' })
            }
            that.$(this).children('.box-info').css('opacity', '1')
        }, function () {
            let type = that.$(this).attr('aniType')
            if (type == 1) {
                that.$(this).children('.box-img').css({ 'height': '70px', 'left': '0px', 'right': 'auto', 'float': 'left', 'opacity': '1' })
            }
            if (type == 2) {
                that.$(this).children('.box-img').css({ 'height': '70px', 'bottom': '0px', 'top': 'auto', 'float': 'left', 'opacity': '1' })
            }
            if (type == 3) {
                that.$(this).children('.box-img').css({ 'width': '100%', 'left': '0px', 'right': 'auto', 'float': 'left', 'opacity': '1' })
            }
            if (type == 4) {
                that.$(this).children('.box-img').css({ 'width': '100%', 'left': 'auto', 'right': '0px', 'float': 'right', 'opacity': '1' })

            }
            that.$(this).children('.box-info').css('opacity', '0')
        });
    },
    methods: {
        openMenu(menucode) {
            this.$notify({ title: '标题名称', message: '打开一个新窗口.menuCode=' + menucode });
            EventBus.$emit('close-startmenu', false);
        },
    }
}
</script>
<style scoped lang="scss">
.favoriteapp-panel {
    width: clac(100% -20px);
    height: 100%;
    display: block;
    overflow-x: hidden;
    padding: 10px;
}

.el-row {
    margin: 10px;
}

.bg-box {
    width: 100%;
    height: 70px;
    display: block;
    position: relative;
    left: 0;
    top: 0;
    transition: all .4s ease-in-out;

    &:hover {
        cursor: pointer;
    }

    .box-info {
        display: block;
        position: absolute;
        opacity: 0;
        top: 0px;
        left: 0px;
        width: 100%;
        height: 70px;
        background: #383838;
        transition: all .4s ease-in-out;
        text-align: center;
        line-height: 70px;
        float: left;

        span {
            font-size: 13px;
            font-weight: bold;
            color: #FFFFFF;
            display: inline-block;
        }
    }

    .box-img {
        display: block;
        position: absolute;
        top: 0px;
        left: 0px;
        width: 100%;
        height: 70px;
        background: #4512ff;
        transition: all .4s ease-in-out;

        img {
            width: 100%;
            height: 100%;
            object-fit: fill;
        }

    }
}

.bg-null {
    width: 100%;
    height: 70px;
    display: block;
}

.mirrorRotateLevel {
    /* 水平镜像翻转 */
    -moz-transform: scaleX(-1);
    -webkit-transform: scaleX(-1);
    -o-transform: scaleX(-1);
    transform: scaleX(-1);
    /*兼容IE*/
    filter: FlipH;
}

.mirrorRotateVertical {
    /* 垂直镜像翻转 */
    -moz-transform: scaleY(-1);
    -webkit-transform: scaleY(-1);
    -o-transform: scaleY(-1);
    transform: scaleY(-1);
    /*兼容IE*/
    filter: FlipV;
}




.bg-null {
    min-height: 70px;
}
</style>
<template>
    <div class="content-panel">
        <div class="addmenu">
            <div class="left-tree">
                <div class="title-bar">目录</div>
                <el-tree :data="menuList" default-expand-all :expand-on-click-node="false" :highlight-current="true"
                    :props="defaultProps" @node-click="selectParenDirClick">
                    <span class="custom-tree-node" slot-scope="{ node, data }">
                        <i v-if="data.type==2" icon-class="file" class="iconfont">&#xece7;</i>
                        <i v-else-if="node.expanded" icon-class="floder_open" class="iconfont">&#xea19;</i>
                        <i v-else-if="data.type==1" icon-class="floder_close" class="iconfont">&#xea1b;</i>
                        <i v-else-if="data.type==3" class="iconfont" style="color:#FFA98D;">&#xe648;</i>
                        <span v-if="data.type==1" :title='node.label'
                            style="font-size:14px;font-weight:500;padding-left: 5px;">{{node.label}}</span>
                        <span v-else :title='node.label' style="font-size:14px;padding-left: 5px;">{{node.label}}</span>
                    </span>
                </el-tree>
                <div class="div_placeholder"></div>
            </div>
            <div class="right-form">
                <div class="title-bar">菜单信息</div>
                <el-form ref="menuDataForm" :model="form" label-width="80px" :rules="dataFormRules">
                    <el-row v-show="!isEdit">
                        <el-col :span="12">
                            <el-form-item label="所属目录" prop="pname">
                                <el-input v-model="form.pname" disabled></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="菜单名称" prop="menuName">
                                <el-input v-model="form.menuName"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="链接类型">
                                <el-radio-group v-model="form.iframe">
                                    <el-radio :label=0>内链接</el-radio>
                                    <el-radio :label=1>外链接</el-radio>
                                </el-radio-group>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row v-if="form.iframe==0">
                        <el-col :span="12">
                            <el-form-item label="菜单路径" prop="urlPath">
                                <el-input v-model="form.urlPath"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row v-if="form.iframe==0">
                        <el-col :span="12">
                            <el-form-item label="组件路径" prop="component">
                                <el-input v-model="form.component"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row v-if="form.iframe==1">
                        <el-col :span="12">
                            <el-form-item label="外部链接">
                                <el-input v-model="form.iframePath"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="图标类型">
                                <el-radio-group v-model="form.imgOrIcon">
                                    <el-radio label='image'>图片</el-radio>
                                    <el-radio label='icon'>图标</el-radio>
                                </el-radio-group>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row v-if="form.imgOrIcon=='icon'">
                        <el-col :span="12">
                            <el-form-item label="图标颜色">
                                <my-color-picker v-model="form.iconColor" show-alpha></my-color-picker>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row v-if="form.imgOrIcon=='icon'">
                        <el-col :span="12">
                            <el-form-item label="icon图标">
                                <el-popover v-model="showIcon" placement="bottom" width="400" :visible-arrow=false
                                    trigger="click">
                                    <div class="icon-select">
                                        <i class="iconfont" v-for="item in iconList" :key="item.id"
                                            @click="selectIcon(item.icon)">{{item.icon}}</i>
                                    </div>
                                    <div slot="reference" class="iconpanel"><i class="iconfont">{{form.icon}}</i></div>
                                </el-popover>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row v-if="form.imgOrIcon=='image'">
                        <el-col :span="12">
                            <el-form-item label="图片选择">
                                <el-popover v-model="showImage" placement="bottom" width="400" :visible-arrow=false
                                    trigger="click">
                                    <div class="icon-select">
                                        <img :src="item.localImgPath" width="32" height="32" v-for="item in imgList"
                                            :key="item.id" @click="selectImage(item.imgUrl)" />
                                    </div>
                                    <div slot="reference" class="iconpanel"><img width="30" height="30"
                                            :src="localImgPath" /></div>
                                </el-popover>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="菜单排序">
                                <el-input-number v-model="form.orderNum" :min="1" :max="10000" label="排序">
                                </el-input-number>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="备注信息">
                                <el-input v-model="form.remark" type="textarea"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-form-item>
                        <el-button type="primary" @click="saveMenu">提交</el-button>
                    </el-form-item>
                    <el-form-item>
                        <div class="div_placeholder"></div>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
import EventBus from '@/utils/eventbus.js'
import MyColorPicker from '@/views/com/color-picker/index.js'
import { addMenu, updateMenu, getMenu } from '@/api/menuApi.js'
export default {
    components: { MyColorPicker },
    data() {
        return {
            isEdit: false,
            showIcon: false,
            showImage: false,
            localImgPath: '',
            form: {
                id: '',
                pid: '0',
                type: 2,
                level: '0',
                pname: '',
                menuName: '',
                menuCode: '',
                urlPath: '',
                component: '',
                iframe: 0,
                iframePath: '',
                imgOrIcon: 'image',
                icon: '\uebdc',
                iconColor: '',
                imgUrl: '',
                orderNum: '0',
                remark: ''
            },
            dataFormRules: {
                pname: [
                    { required: true, message: '菜单归属目录不能为空，左边选择！', trigger: 'blur' }
                ],
                menuName: [
                    { required: true, message: '菜单名称不能为空！', trigger: 'blur' }
                ],
                urlPath: [
                    { required: true, message: '菜单路径不能为空！', trigger: 'blur' }
                ],
                component: [
                    { required: true, message: '菜单组件不能为空！', trigger: 'blur' }
                ]
            },
            menuList: [],
            defaultProps: {
                children: 'children',
                label: 'menuName'
            },
            iconList: this.$store.state.sys.iconData,
            imgList: this.$store.state.sys.imgIconData,
        };
    },
    created() {
        this.getAllMenu()
        for (let i = 0; i < this.imgList.length; i++) {
            this.imgList[i].localImgPath = require('@/assets/image/menuicon/' + this.imgList[i].imgUrl + '.png')
        }

        EventBus.$on('editmenu-2', data => {
            this.form = JSON.parse(JSON.stringify(data))
            this.form.pname = "过滤问题"
            this.isEdit = true
            if (this.form.imgOrIcon == 'image') {
                this.localImgPath = require('@/assets/image/menuicon/' + this.form.imgUrl + '.png')
            }
        });
        EventBus.$on('addmenu-2', data => {
            this.isEdit = false
            this.form = {
                id: '',
                pid: '0',
                type: 2,
                level: '0',
                pname: '',
                menuName: '',
                menuCode: '',
                urlPath: '',
                component: '',
                iframe: 0,
                iframePath: '',
                imgOrIcon: 'image',
                icon: '\uebdc',
                iconColor: '#409EFF',
                imgUrl: '',
                orderNum: '0',
                remark: ''
            }
        });
        EventBus.$on('updatemenu-2', data => {
            this.getAllMenu()
        });
    },
    methods: {
        setRootDir() {
            if (!this.isEdit) {
                this.form.pname = ''
                this.form.pid = 0
                this.form.level = 0
            }
        },
        selectParenDirClick(data) {
            if (!this.isEdit) {
                if (data.type == 1) {
                    this.form.pname = data.menuName
                    this.form.pid = data.id
                    this.form.level = data.level + 1
                    this.form.sysWindow = data.sysWindow
                }
            }
        },
        saveMenu() {
            this.$refs.menuDataForm.validate(valid => {
                if (!valid) {
                    return
                }
                let that = this

                let menuPathRepeat = this.menuList.filter(function (item) {
                    return item.urlPath == that.form.urlPath
                })
                if (menuPathRepeat.length > 0) {
                    this.$mymsg({
                        message: '菜单路径不能重复！',
                        type: 'error'
                    });
                    return
                }
                this.form.component = this.form.iframe == '1' ? 'sys/iframe/index.vue' : this.form.component
                this.form.menuCode = this.form.urlPath
                if (!this.isEdit) {
                    addMenu(this.form, function (data) {
                        that.$mymsg({
                            message: '创建成功！',
                            type: 'success'
                        });
                        that.getAllMenu()
                        EventBus.$emit('updatemenu-3', true);
                        EventBus.$emit('get-allprogrammenudata', true);
                    })
                } else {
                    updateMenu(this.form, function (data) {
                        that.$mymsg({
                            message: '修改成功！',
                            type: 'success'
                        });
                        that.getAllMenu()
                        EventBus.$emit('updatemenu-3', true);
                        EventBus.$emit('get-allprogrammenudata', true);
                    })
                }
            })
        },
        getAllMenu() {
            getMenu({ type: 2 }, data => this.menuList = data)
        },
        selectIcon(icon) {
            this.form.icon = icon
            this.showIcon = false
        },
        selectImage(imgurl) {
            this.form.imgUrl = imgurl
            this.localImgPath = require('@/assets/image/menuicon/' + imgurl + '.png')
            this.showImage = false
        }
    }
}
</script>

<style scoped lang="scss">
.left-tree {
    width: 200px;
    height: 100%;
    display: inline-block;
    float: left;
}

.right-form {
    width: calc(100% - 200px);
    height: 100%;
    display: inline-block;
    float: right;
}

.icon-select {
    display: block;
    text-align: left;

    i,
    img {
        width: 32px;
        height: 32px;
        display: inline-block;
        font-size: 30px;
        border: 1px solid #CCCCCC;
        text-align: center;
        line-height: 32px;
        padding: 3px;
        margin: 5px;
        border-radius: 3px;
        color: #666666;
        float: left;

        &:hover {
            cursor: pointer;
            border: 1px solid $themeColor;
            color: $themeColor;
        }
    }
}

.iconpanel {
    width: 120px;
    height: 32px;
    text-align: center;
    line-height: 32px;
    border: 1px solid #CCCCCC;

    i {
        width: 30px;
        height: 30px;
        display: inline-block;
        color: #666666;
        font-size: 28px;
    }

    &:hover {
        cursor: pointer;
    }
}

.el-tooltip,
.el-popover :focus {
    outline: 0;
}
</style>
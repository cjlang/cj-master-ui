<template>
    <div class="content-panel-20">
        <transition name="fade-left">
            <div class="data-list" v-show="currentPage=='list'">
                <el-scrollbar style="height: 100%;" wrapStyle="overflow-x:hidden;">
                    <el-table ref="roleList" :data="roleList" highlight-current-row style="width: 100%">
                        <el-table-column type="index" label="序号" :index="indexMethod">
                        </el-table-column>
                        <el-table-column prop="name" label="角色名称" width="150">
                        </el-table-column>
                        <el-table-column prop="code" label="角色编码" width="120">
                        </el-table-column>
                        <el-table-column prop="type" width="120" label="角色类型">
                            <template slot-scope="scope">
                                <el-tag v-if="scope.row.type==1">系统角色</el-tag>
                                <el-tag type="success" v-if="scope.row.type==2">业务角色</el-tag>
                                <el-tag type="info" v-if="scope.row.type==3">机构角色</el-tag>
                            </template>
                        </el-table-column>
                        <el-table-column prop="remark" width="150" label="备注说明">
                        </el-table-column>
                        <el-table-column label="操作">
                            <template slot-scope="scope">
                                <el-button-group>
                                    <el-button size="mini" type="warning" icon="el-icon-edit" @click="edit(scope.row)">
                                    </el-button>
                                    <el-button size="mini" type="danger" icon="el-icon-delete" @click="del(scope.row)">
                                    </el-button>
                                    <el-button size="mini" type="primary" icon="el-icon-s-operation"
                                        @click="JumpToRoleMenuRefPage(scope.row)"></el-button>
                                </el-button-group>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="page-panel">
                        <el-pagination :current-page="currentpage" :page-sizes="[10, 20, 50, 100]" :page-size="pagesize"
                            :total="totalCount" background layout="total, prev, pager, next, sizes"
                            @size-change="sizeChangeHandle" @current-change="currentChangeHandle" />
                    </div>
                </el-scrollbar>
            </div>
        </transition>
        <transition name="fade-left">
            <div class="data-list" v-show="currentPage=='other'">
                <el-scrollbar style="height: 100%;" wrapStyle="overflow-x:hidden;">
                    <el-tree :data="menuList" show-checkbox default-expand-all node-key="id" ref="menutree"
                        highlight-current :props="defaultProps" @check="selectMenu">
                    </el-tree>
                    <div class="div_placeholder"></div>
                </el-scrollbar>
            </div>
        </transition>
        <transition name="fade-left">
            <div class="data-list" v-show="currentPage=='add'">
                <el-scrollbar style="height: 100%;" wrapStyle="overflow-x:hidden;">
                    <el-form :model="form" label-width="80px">
                        <el-row>
                            <el-col :span="24">
                                <el-form-item label="角色类型" prop="type">
                                    <el-radio v-model="form.type" label="1">系统角色</el-radio>
                                    <el-radio v-model="form.type" label="2">业务角色</el-radio>
                                    <el-radio v-model="form.type" label="3">机构角色</el-radio>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="24">
                                <el-form-item label="角色名称" prop="name">
                                    <el-input v-model="form.name"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="24">
                                <el-form-item label="角色编码" prop="code">
                                    <el-input v-model="form.code"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="24">
                                <el-form-item label="备注信息" prop="remark">
                                    <el-input type="textarea" v-model="form.remark"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-form-item>
                            <el-button type="primary" @click="save">提交</el-button>
                        </el-form-item>
                        <el-form-item>
                            <div class="div_placeholder"></div>
                        </el-form-item>
                    </el-form>
                </el-scrollbar>
            </div>
        </transition>
        <div class="window-opter">
            <div class="opter-button">
                <i v-if="currentPage=='list'" class="iconfont" @click="addPage()">&#xec1a;</i>
                <i v-else class="iconfont" @click="backListPage()">&#xe836;</i>
            </div>
        </div>
    </div>
</template>
<script>
import EventBus from '@/utils/eventbus.js'
import { pageMixins } from '@/mixins/page.mixin.js';
import menuapi from '@/api/menuApi.js'
export default {
    mixins: [pageMixins],
    data() {
        return {
            isEdit: false,
            currentPage: 'list',
            roleList: [],
            allMenuList: [],
            roleMenuList: [],
            form: {
                id: '',
                type: '2',
                code: '',
                name: '',
                remark: ''
            },
            menuList: [],
            currentSelectRole: '',
            defaultProps: {
                children: 'children',
                label: 'menuName'
            },
        }
    },
    created() {
        this.getDataList();
        this.getAllMenuList();
        this.menuCode = this.$store.state.window.currentActivemenuCode;
    },
    methods: {
        indexMethod(index) {
            return ((this.currentpage - 1) * this.pagesize) + index + 1;
        },
        getDataList() {
            this.$baseapi.pagelist("cjrole", { currentpage: this.currentpage, pagesize: this.pagesize }, (data) => {
                this.roleList = data.list;
                this.totalPage = data.totalPage
                this.totalCount = data.totalCount
            })
        },
        getAllMenuList() {
            menuapi.treelist("cjmenu", {}, (data) => {
                this.menuList = data
            })
        },
        getMenuListByRole() {
            this.$baseapi.list("cjrolemenu", { "roleId": this.currentSelectRole.id }, (data) => {
                this.roleMenuList = data
                let checkList = []
                for (let i = 0; i < data.length; i++) {
                    checkList.push(data[i].menuId)
                }
                this.$refs.menutree.setCheckedKeys(checkList)
            });
        },
        JumpToRoleMenuRefPage(row) {
            this.currentSelectRole = row;
            EventBus.$emit('window-title', { menuCode: this.menuCode, windowName: '【' + row.name + '】的菜单' });
            EventBus.$emit('change-window-size', { menuCode: this.menuCode, width: 300, height: 500 });
            this.currentPage = 'other';
            this.getMenuListByRole();
        },
        addPage() {
            EventBus.$emit('window-title', { menuCode: this.menuCode, windowName: '增加新角色' });
            this.currentPage = 'add';
            this.isEdit = false
            this.form = {
                type: '2',
                code: '',
                name: '',
                remark: ''
            };
            EventBus.$emit('change-window-size', { menuCode: this.menuCode, width: 300, height: 500 });
        },
        edit(row) {
            this.isEdit = true
            this.currentPage = 'add';
            this.form.id = row.id
            this.form.type = row.type
            this.form.code = row.code
            this.form.name = row.name
            this.form.remark = row.remark
        },
        del(row) {
            this.$baseapi.del("cjrole", { 'id': row.id }, (data) => {
                this.$mymsg({
                    message: '【' + row.name + '】删除成功！',
                    type: 'success'
                });
                this.getDataList();
            })
        },
        save() {
            if (!this.isEdit) {
                this.$baseapi.add("cjrole", this.form, (data) => {
                    this.$mymsg({
                        message: '【' + this.form.name + '】添加成功！',
                        type: 'success'
                    });
                    this.getDataList();
                    this.form = {
                        type: '2',
                        code: '',
                        name: '',
                        remark: ''
                    };
                    this.backListPage()
                });
            } else {
                this.$baseapi.update("cjrole", this.form, (data) => {
                    this.$mymsg({
                        message: '【' + this.form.name + '】修改成功！',
                        type: 'success'
                    });
                    this.getDataList();
                    this.form = {
                        type: '2',
                        code: '',
                        name: '',
                        remark: ''
                    };
                    this.backListPage()
                });
            }
        },
        selectMenu(row, allmenu) {
            let ischeck = allmenu.checkedNodes.filter(function (item) {
                return item.id == row.id
            })
            if (ischeck.length > 0) {
                //插入
                this.$baseapi.add("cjrolemenu", { roleId: this.currentSelectRole.id, menuId: row.id }, data => { })
            } else {
                //删除
                let temp = this.roleMenuList.filter(function (item) {
                    return item.menuId == row.id
                })
                if (temp.length > 0) {
                    this.$baseapi.del("cjrolemenu", { id: temp[0].id }, data => { this.getMenuListByRole() })
                }
            }

        },
        backListPage() {
            EventBus.$emit('window-title', { menuCode: this.menuCode, windowName: '角色管理' });
            EventBus.$emit('recover-window-size', { menuCode: this.menuCode });
            this.currentPage = 'list';
        }
    }
}
</script>
<style scoped lang="scss">
.data-list {
    width: cacl(100% -20px);
    padding: 10px;
    position: absolute;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 36px;
    display: block;
}

.page-panel {
    position: absolute;
    left: 0px;
    right: 0px;
    bottom: 0px;
}

/deep/ .el-table__row {
    box-shadow: $shadow-1;
}
</style>
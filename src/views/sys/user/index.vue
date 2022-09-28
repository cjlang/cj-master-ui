<template>
    <div class="content-panel-20">
        <transition name="fade-left">
            <div class="data-list" v-show="currentPage=='list'">
                <el-scrollbar style="height: 100%;" wrapStyle="overflow-x:hidden;">
                    <el-table ref="userList" :data="userList" highlight-current-row style="width: 100%">
                        <el-table-column type="index" label="序号" :index="indexMethod">
                        </el-table-column>
                        <el-table-column prop="username" label="登录账户" width="100">
                        </el-table-column>
                        <el-table-column prop="password" label="用户密码" width="100">
                        </el-table-column>
                        <el-table-column prop="pwdExpireDate" label="过期时间" width="150">
                        </el-table-column>
                        <el-table-column prop="realName" label="真实姓名" width="150">
                        </el-table-column>
                        <el-table-column prop="status" label="用户状态" width="120">
                            <template slot-scope="scope">
                                <el-tag type="success" v-if="scope.row.status==1">正常</el-tag>
                                <el-tag type="danger" v-if="scope.row.status==0">禁用</el-tag>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作">
                            <template slot-scope="scope">
                                <el-button-group>
                                    <el-button size="mini" type="warning" icon="el-icon-edit" @click="edit(scope.row)">
                                    </el-button>
                                    <el-button size="mini" type="danger" icon="el-icon-delete" @click="del(scope.row)">
                                    </el-button>
                                    <el-button size="mini" type="primary" icon="el-icon-s-operation"
                                        @click="setRole(scope.row)"></el-button>
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
                    <el-table ref="roleList" :data="roleList" highlight-current-row style="width: 100%">
                        <el-table-column type="index" label="序号" :index="indexMethod2">
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
                        <el-table-column prop="remark" label="备注说明">
                        </el-table-column>
                        <el-table-column label="操作">
                            <template slot-scope="scope">
                                <el-button v-if="scope.row.ischeck" size="mini" type="success" icon="el-icon-success"
                                    @click="delrole(scope.row)">
                                </el-button>
                                <el-button v-else size="mini" type="info" icon="el-icon-circle-plus"
                                    @click="addrole(scope.row)">
                                </el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="page-panel">
                        <el-pagination :current-page="currentpage2" :page-sizes="[10, 20, 50, 100]"
                            :page-size="pagesize2" :total="totalCount2" background
                            layout="total, prev, pager, next, sizes" @size-change="sizeChangeHandle2"
                            @current-change="currentChangeHandle2" />
                    </div>
                </el-scrollbar>
            </div>
        </transition>
        <transition name="fade-left">
            <div class="data-list" v-show="currentPage=='add'">
                <el-scrollbar style="height: 100%;" wrapStyle="overflow-x:hidden;">
                    <div class="title-bar">信息录入</div>
                    <el-form :model="form" label-width="80px" style="margin-top:10px;">
                        <el-row>
                            <el-col :span="24">
                                <el-form-item label="登录账号" prop="username">
                                    <el-input v-model="form.username"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="24">
                                <el-form-item label="用户密码" prop="password">
                                    <el-input v-model="form.password"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="24">
                                <el-form-item label="真实姓名" prop="realName">
                                    <el-input v-model="form.realName"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="24">
                                <el-form-item label="密码过期" prop="pwdExpireDate">
                                    <el-date-picker v-model="form.pwdExpireDate" type="datetime" placeholder="过期时间"
                                        format="yyyy 年 MM 月 dd 日 HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss"
                                        default-time="09:00:00" style="width:100%;">
                                    </el-date-picker>
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
export default {
    mixins: [pageMixins],
    data() {
        return {
            isEdit: false,
            currentPage: 'list',
            userList: [],
            roleList: [],
            roleMenuList: [],
            form: {
                id: '',
                username: '',
                password: '',
                realName: '',
                status: '1',
                orgId: '1',
                pwdExpireDate: ''
            },
            currentSelectUser: '',
            defaultProps: {
                children: 'children',
                label: 'menuName'
            },
            currentpage2: 1,
            pagesize2: 10,
            totalPage2: 0,
            totalCount2: 0
        }
    },
    created() {
        this.getDataList();
        this.menuCode = this.$store.state.window.currentActivemenuCode;
    },
    methods: {
        indexMethod(index) {
            return ((this.currentpage - 1) * this.pagesize) + index + 1;
        },
        indexMethod2(index) {
            return ((this.currentpage2 - 1) * this.pagesize2) + index + 1;
        },
        getDataList() {
            this.$baseapi.pagelist("cjuser", { currentpage: this.currentpage, pagesize: this.pagesize }, (data) => {
                this.userList = data.list;
                this.totalPage = data.totalPage
                this.totalCount = data.totalCount
            })
        },
        getAllRoleList() {
            this.$baseapi.pagelist("cjrole", { currentpage: this.currentpage2, pagesize: this.pagesize2 }, (data) => {
                this.roleList = data.list
                this.totalPage2 = data.totalPage
                this.totalCount2 = data.totalCount
                for (let i = 0; i < this.roleList.length; i++) {
                    let tempList = JSON.parse(JSON.stringify(this.roleList[i]))
                    let temp = this.roleMenuList.filter(item => { return item.roleId == this.roleList[i].id })
                    if (temp.length > 0) {
                        tempList.ischeck = true
                    } else {
                        tempList.ischeck = false
                    }
                    this.$set(this.roleList, i, tempList)
                }
            })
        },
        getRoleListByUser(roleid) {
            this.$baseapi.list("cjrolemenu", { "roleId": roleid }, (data) => {
                this.roleMenuList = data;
                this.getAllRoleList();
            })
        },
        setRole(row) {
            this.currentSelectRole = row;
            EventBus.$emit('window-title', { menuCode: this.menuCode, windowName: '【' + row.username + '】的角色' });
            EventBus.$emit('change-window-size', { menuCode: this.menuCode, width: 800, height: 620 })
            this.currentPage = 'other'
            this.getRoleListByUser()
        },
        addrole(row) {
            // this.$baseapi.add("cjrolemenu", {}, (data) => {

            // })
        },
        delrole(row) {
            // this.$baseapi.add("cjrolemenu", {}, (data) => {

            // })
        },
        sizeChangeHandle2(val) {
            this.pagesize2 = val
            this.currentpage2 = 1
            this.getAllRoleList()
        },
        currentChangeHandle2(val) {
            this.currentpage2 = val
            this.getAllRoleList()
        },
        addPage() {
            EventBus.$emit('window-title', { menuCode: this.menuCode, windowName: '创建用户' });
            this.currentPage = 'add';
            this.isEdit = false
            this.form = {
                id: '',
                username: '',
                password: '',
                realName: '',
                status: '1',
                orgId: '1',
                pwdExpireDate: ''
            };
            EventBus.$emit('change-window-size', { menuCode: this.menuCode, width: 300 });
        },
        edit(row) {
            EventBus.$emit('window-title', { menuCode: this.menuCode, windowName: '编辑【' + row.realName + '】信息' });
            this.isEdit = true
            this.currentPage = 'add';
            this.form.id = row.id
            this.form.username = row.username
            this.form.password = row.password
            this.form.realName = row.realName
            this.form.status = row.status
            this.form.pwdExpireDate = row.pwdExpireDate
            EventBus.$emit('change-window-size', { menuCode: this.menuCode, width: 300 });
        },
        del(row) {
            delRole({ 'id': row.id }, (data) => {
                this.$mymsg({
                    message: '【' + row.name + '】删除成功！',
                    type: 'success'
                });
                this.getDataList();
            })
        },
        save() {
            if (!this.isEdit) {
                this.$baseapi.add("cjuser", this.form, (data) => {
                    this.$mymsg({
                        message: '【' + this.form.username + '】添加成功！',
                        type: 'success'
                    });
                    this.getDataList();
                    this.form = {
                        id: '',
                        username: '',
                        password: '',
                        realName: '',
                        status: '1',
                        orgId: '1',
                        pwdExpireDate: ''
                    };
                    this.backListPage()
                });
            } else {
                this.$baseapi.update("cjuser", this.form, (data) => {
                    this.$mymsg({
                        message: '【' + this.form.username + '】修改成功！',
                        type: 'success'
                    });
                    this.getDataList();
                    this.form = {
                        id: '',
                        username: '',
                        password: '',
                        realName: '',
                        status: '1',
                        orgId: '1',
                        pwdExpireDate: ''
                    };
                    this.backListPage()
                });
            }
        },
        backListPage() {
            EventBus.$emit('window-title', { menuCode: this.menuCode, windowName: '用户管理' });
            EventBus.$emit('recover-window-size', { menuCode: this.menuCode });
            this.currentPage = 'list';
        }
    }
}
</script>
<style scoped lang="scss">
.data-list {
    width: cacl(100% -20px);
    position: absolute;
    padding: 10px;
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
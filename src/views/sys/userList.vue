<template>
  <div class="content-panel-20">
    <transition name="fade-left">
      <div class="data-list" v-show="currentPage=='user'">
        <el-scrollbar style="height: 100%;" wrapStyle="overflow-x:hidden;">
          <el-table :data="userList" highlight-current-row style="width: 100%">
            <el-table-column type="index" label="序号" :index="indexMethod">
            </el-table-column>
            <el-table-column prop="username" label="登录账号" width="100">
            </el-table-column>
            <el-table-column prop="realName" label="用户姓名" width="100">
            </el-table-column>
            <el-table-column prop="status" width="180" label="邮箱">
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button-group>
                  <el-button size="mini" type="danger" icon="el-icon-delete"
                    @click="deleteUser(scope.$index, scope.row)"></el-button>
                  <el-button size="mini" type="warning" icon="el-icon-edit"
                    @click="JumpToUserEditPage(scope.$index, scope.row)"></el-button>
                  <el-button size="mini" type="primary" icon="el-icon-user"
                    @click="JumpToUserRoleRefPage(scope.$index, scope.row)"></el-button>
                </el-button-group>
              </template>
            </el-table-column>
          </el-table>
        </el-scrollbar>
      </div>
    </transition>
    <transition name="fade-left">
      <div class="data-list" v-show="currentPage=='role'">
        <el-scrollbar style="height: 100%;" wrapStyle="overflow-x:hidden;">
          <ul class="menuapp-list">
            <li class="app-item" v-for="item in allRoleList" :key="item.id" @click="selectRole(item.code)">
              <el-badge value="√" class="selected-app" type="success" v-if="item.status">
                <img :src="require('@/assets/image/app/linkman.png')" />
              </el-badge>
              <img :src="require('@/assets/image/app/linkman.png')" v-else />
              <span>{{item.name}}</span>
            </li>
          </ul>
        </el-scrollbar>
      </div>
    </transition>
    <transition name="fade-left">
      <div class="data-list" v-show="currentPage=='add'">
        <el-scrollbar style="height: 100%;" wrapStyle="overflow-x:hidden;">
          <el-form :model="userInfo" label-width="80px">
            <el-form-item label="登录账号" prop="empno">
              <el-input v-model="userInfo.empno"></el-input>
            </el-form-item>
            <el-form-item label="用户姓名" prop="username">
              <el-input v-model="userInfo.username"></el-input>
            </el-form-item>
            <el-form-item label="登录密码" prop="userpwd">
              <el-input v-model="userInfo.userpwd"></el-input>
            </el-form-item>
            <el-form-item label="用户邮箱" prop="email">
              <el-input v-model="userInfo.email"></el-input>
            </el-form-item>
          </el-form>
        </el-scrollbar>
      </div>
    </transition>
    <transition name="fade-left">
      <div class="data-list" v-show="currentPage=='edit'">
        <el-scrollbar style="height: 100%;" wrapStyle="overflow-x:hidden;">
          <el-form :model="userInfo" label-width="80px">
            <el-form-item label="ID标识" prop="id">
              <el-input v-model="userInfo.id"></el-input>
            </el-form-item>
            <el-form-item label="登录账号" prop="empno">
              <el-input v-model="userInfo.empno"></el-input>
            </el-form-item>
            <el-form-item label="用户姓名" prop="username">
              <el-input v-model="userInfo.username"></el-input>
            </el-form-item>
            <el-form-item label="用户邮箱" prop="email">
              <el-input v-model="userInfo.email"></el-input>
            </el-form-item>
          </el-form>
        </el-scrollbar>
      </div>
    </transition>
    <div class="opter">
      <div class="opter-button" v-show="currentPage=='user'">
        <i class="iconfont" @click="jumpToAddUserPage()">&#xec1a;</i>
        <i class="iconfont" @click="queryUserInfo()">&#xeadc;</i>
      </div>
      <div class="opter-button" v-show="currentPage=='role'">
        <i class="iconfont" @click="backUserPage()">&#xe836;</i>
      </div>
      <div class="opter-button" v-show="currentPage=='add'">
        <i class="iconfont" @click="backUserPage()">&#xe836;</i>
        <i class="iconfont" @click="saveUser()">&#xe916;</i>
      </div>
      <div class="opter-button" v-show="currentPage=='edit'">
        <i class="iconfont" @click="backUserPage()">&#xe836;</i>
        <i class="iconfont" @click="saveUpdateInfo()">&#xe916;</i>
      </div>
    </div>
  </div>
</template>
<script>
import EventBus from '@/utils/eventbus.js'
export default {
  data() {
    return {
      currentPage: 'user',
      userList: [],
      allRoleList: [],
      userRoleList: [],
      userInfo: {
        empno: '',
        username: '',
        userpwd: '',
        email: ''
      },
      currentSelectUser: '',
      menuCode: ''
    }
  },
  created() {
    this.getUserList();
    this.menuCode = this.$store.state.window.currentActivemenuCode;
  },
  methods: {
    indexMethod(index) {
      return index + 1;
    },
    getUserList() {
      this.$post("/cjuser/pagelist", { currentpage: 1, pagesize: 10 }).then((data) => {
        if (data.code == '0' && data.data.records != null) {
          this.userList = data.data.records;
        }
      });
    },
    async getAllRoleList() {
      await this.$post("/role/all", {}).then((data) => {
        this.allRoleList = data.list;
      });
    },
    getRoleListByUser(empno) {
      this.userRoleList = []
      this.$post("/userrole/getuserrole", { "empno": empno }).then((data) => {
        if (data.code == '0' && data.data != null) {
          this.userRoleList = data.data;
          for (var i = 0; i < this.allRoleList.length; i++) {

            let code = this.allRoleList[i].code;
            let netstatus = this.userRoleList.filter(function (item) {
              return item.rcode == code
            }).length > 0 ? true : false;
            this.$set(this.allRoleList[i], 'status', netstatus)
          }
        }
      });
    },
    queryUserInfo() {
      this.$prompt('', '账号或姓名', {
        confirmButtonText: '搜索',
        cancelButtonText: '取消',
        inputPattern: /^[\s\S]*.*[^\s][\s\S]*$/,
        inputErrorMessage: '不可为空'
      }).then(({ value }) => {

      }).catch(() => {

      });
    },
    deleteUser(val, row) {
      this.$del("/user/del", { 'id': row.id }).then((data) => {
        if (data.code == '0') {
          this.$mymsg({
            message: '【' + row.username + '】删除成功！',
            type: 'success'
          });
          this.getUserList();
        }
      });
    },
    selectRole(code) {
      let index = -1;
      for (var i = 0; i < this.allRoleList.length; i++) {
        if (this.allRoleList[i].code == code) {
          index = i;
        }
      }
      let isSelected = this.allRoleList[index].status;
      if (isSelected) {
        this.$del("/userrole/deluserrole", { empno: this.currentSelectUser, rcode: code }).then((data) => {
          if (data.code == '0') {
            this.allRoleList[index].status = false;
          }
        })
      } else {
        this.$post("/userrole/adduserrole", { empno: this.currentSelectUser, rcode: code }).then((data) => {
          if (data.code == '0') {
            this.allRoleList[index].status = true;
          }
        })
      }

    },
    JumpToUserEditPage(val, row) {
      EventBus.$emit('window-title', { menuCode: this.menuCode, windowName: '编辑【' + row.username + '】的信息' });
      this.currentPage = 'edit';
      this.userInfo.id = row.id;
      this.userInfo.empno = row.empno;
      this.userInfo.username = row.username;
      this.userInfo.email = row.email;
    },
    JumpToUserRoleRefPage(val, row) {
      this.getAllRoleList();
      this.currentSelectUser = row.empno;
      EventBus.$emit('window-title', { menuCode: this.menuCode, windowName: '【' + row.username + '】的角色' });
      this.currentPage = 'role';
      let that = this;
      setTimeout(function () {
        that.getRoleListByUser(row.empno);
      }, 500)
      this.userInfo = {
        empno: '',
        username: '',
        userpwd: '',
        email: ''
      }
    },
    jumpToAddUserPage() {
      EventBus.$emit('window-title', { menuCode: this.menuCode, windowName: '创建新用户' });
      this.currentPage = 'add';
    },
    saveUpdateInfo() {
      this.$put("/user/update", this.userInfo).then((data) => {
        if (data.code == 0) {
          this.$mymsg({
            message: '修改成功！',
            type: 'success'
          });
          this.currentPage = 'user';
          EventBus.$emit('window-title', { menuCode: this.menuCode, windowName: '用户管理' });
          this.getUserList();
        }
      });
    },
    saveUser() {
      this.$post("/user/add", this.userInfo).then((data) => {
        if (data.code == 0) {
          this.$mymsg({
            message: '【' + this.userInfo.username + '】添加成功！',
            type: 'success'
          });
          this.getUserList();
          this.currentPage = 'user';
          EventBus.$emit('window-title', { menuCode: this.menuCode, windowName: '用户管理' });
          this.userInfo = {
            empno: '',
            username: '',
            userpwd: '',
            email: ''
          };
        }
      });
    },
    backUserPage() {
      EventBus.$emit('window-title', { menuCode: this.menuCode, windowName: '用户管理' });
      EventBus.$emit('recover-window-size', { menuCode: this.menuCode });
      this.currentPage = 'user';
    }
  }
}
</script>
<style scoped lang="scss">
.data-list {
  width: 100%;
  position: absolute;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 36px;
  display: block;
}

.opter {
  width: 100%;
  height: 36px;
  position: absolute;
  left: 0px;
  right: 0px;
  bottom: 0px;
  display: block;
  background-color: #EEEEEE;

  .opter-button {
    display: block;
    height: 36px;
    text-align: center;
    line-height: 36px;

    i {
      position: relative;
      top: 0px;
      display: inline-block;
      height: 34px;
      width: 72px;
      text-align: center;
      color: #333333;
      font-size: 18px;
      font-weight: 500;
      transition: all .4s ease-in-out;
      border-bottom: 2px solid $themeColor;
      margin: 0px 5px;

      &:hover {
        cursor: pointer;
        color: #FFFFFF;
        font-size: 20px;
        background-color: $themeColor;
        transition: all .4s ease-in-out;
      }
    }
  }
}

.menuapp-list {
  height: 100%;
  width: 100%;

  .app-item {
    width: 50px;
    height: 70px;
    display: inline-block;
    text-align: center;
    border: 1px solid #FFFFFF;
    margin: 10px;
    border-radius: 5px;
    background-color: rgba($color: #AAAAAA, $alpha: .2);

    img {
      width: 40px;
      height: 40px;
      margin: 5px;
      display: block;
      line-height: 40px;
    }

    span {
      width: 50px;
      height: 20px;
      display: block;
      font-size: 10px;
      text-align: center;
    }

    &:hover {
      background-color: rgba($color: $themeColor, $alpha: 0.5);
    }
  }
}

.selected-app {
  margin-top: 0px;
  margin-right: 0px;
}

.el-form {
  padding: 10px 10px;
}
</style>
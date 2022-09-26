<template>
  <div class="content-panel-20">
    <transition name="fade-left">
      <div class="data-list" v-show="currentPage=='role'">
        <el-scrollbar style="height: 100%;" wrapStyle="overflow-x:hidden;">
          <el-table ref="roleList" :data="roleList" highlight-current-row style="width: 100%">
            <el-table-column type="index" label="序号" :index="indexMethod">
            </el-table-column>
            <el-table-column prop="name" label="角色名称" width="100">
            </el-table-column>
            <el-table-column prop="code" label="角色编码" width="100">
            </el-table-column>
            <el-table-column prop="mono" width="100" label="备注说明">
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button-group>
                  <el-button size="mini" type="danger" icon="el-icon-delete"
                    @click="roleDelete(scope.$index, scope.row)"></el-button>
                  <el-button size="mini" type="primary" icon="el-icon-menu"
                    @click="JumpToRoleMenuRefPage(scope.$index, scope.row)"></el-button>
                </el-button-group>
              </template>
            </el-table-column>
          </el-table>
        </el-scrollbar>
      </div>
    </transition>
    <transition name="fade-left">
      <div class="data-list" v-show="currentPage=='menu'">
        <el-scrollbar style="height: 100%;" wrapStyle="overflow-x:hidden;">
          <ul class="menuapp-list">
            <li class="app-item" v-for="item in allMenuList" :key="item.menuCode" @click="selectApp(item.menuCode)">
              <el-badge value="√" class="selected-app" type="success" v-if="item.status">
                <img :src="require('@/assets/image/app/linkman.png')" />
              </el-badge>
              <img :src="require('@/assets/image/app/linkman.png')" v-else />
              <span>{{item.menuName}}</span>
            </li>
          </ul>
        </el-scrollbar>
      </div>
    </transition>
    <transition name="fade-left">
      <div class="data-list" v-show="currentPage=='add'">
        <el-scrollbar style="height: 100%;" wrapStyle="overflow-x:hidden;">
          <el-form :model="roleInfo" label-width="80px">
            <el-form-item label="角色编码" prop="code">
              <el-input v-model="roleInfo.code"></el-input>
            </el-form-item>
            <el-form-item label="角色名称" prop="name">
              <el-input v-model="roleInfo.name"></el-input>
            </el-form-item>
            <el-form-item label="备注信息" prop="mono">
              <el-input type="textarea" v-model="roleInfo.mono"></el-input>
            </el-form-item>
          </el-form>
        </el-scrollbar>
      </div>
    </transition>
    <div class="opter">
      <div class="opter-button" v-show="currentPage=='role'">
        <i class="iconfont" @click="jumpToAddRolePage()">&#xec1a;</i>
      </div>
      <div class="opter-button" v-show="currentPage=='menu'">
        <i class="iconfont" @click="backRolePage()">&#xe836;</i>
      </div>
      <div class="opter-button" v-show="currentPage=='add'">
        <i class="iconfont" @click="backRolePage()">&#xe836;</i>
        <i class="iconfont" @click="saveRole()">&#xe916;</i>
      </div>
    </div>
  </div>
</template>
<script>
import EventBus from '@/utils/eventbus.js'
export default {
  data() {
    return {
      currentPage: 'role',
      roleList: [],
      allMenuList: [],
      roleMenuList: [],
      roleInfo: {
        code: '',
        name: '',
        mono: ''
      },
      currentSelectRole: '',
      menuCode: ''
    }
  },
  created() {
    this.getRoleList();
    this.getAllMenuList();
    this.menuCode = this.$store.state.window.currentActivemenuCode;
  },
  methods: {
    indexMethod(index) {
      return index + 1;
    },
    getRoleList() {
      this.$post("/role/all", {}).then((data) => {
        if (data.code == '0' && data.data != null) {
          this.roleList = data.data;
        }
      });
    },
    getAllMenuList() {
      this.$post("/menu/allmenu", {}).then((data) => {
        if (data.code == '0' && data.data != null) {
          this.allMenuList = data.data;
        }
      });
    },
    getMenuListByRole(code) {
      this.$post("/menu/rolemenu", { "code": code }).then((data) => {
        if (data.code == '0' && data.data != null) {
          this.roleMenuList = data.data;
          for (var i = 0; i < this.allMenuList.length; i++) {
            let menucode = this.allMenuList[i].menuCode;
            this.allMenuList[i].status = this.roleMenuList.filter(function (item) {
              return item.menuCode == menucode
            }).length > 0 ? true : false;
          }
        }
      });
    },
    roleDelete(val, row) {
      this.$del("/role/del", { 'id': row.id }).then((data) => {
        if (data.code == '0') {
          this.$mymsg({
            message: '【' + row.name + '】删除成功！',
            type: 'success'
          });
          this.getRoleList();
        }
      });
    },
    selectApp(menucode) {
      let index = -1;
      for (var i = 0; i < this.allMenuList.length; i++) {
        if (this.allMenuList[i].menuCode == menucode) {
          index = i;
        }
      }
      let isSelected = this.allMenuList[index].status;
      if (isSelected) {
        this.$del("/rolemenu/delrolemenu", { rcode: this.currentSelectRole, menucode: menucode }).then((data) => {
          if (data.code == '0') {
            this.allMenuList[index].status = false;
          }
        })
      } else {
        this.$post("/rolemenu/add", { rcode: this.currentSelectRole, menucode: menucode }).then((data) => {
          if (data.code == '0') {
            this.allMenuList[index].status = true;
          }
        })
      }

    },
    JumpToRoleMenuRefPage(val, row) {
      this.currentSelectRole = row.code;
      EventBus.$emit('window-title', { menuCode: this.menuCode, windowName: '【' + row.name + '】的菜单' });
      EventBus.$emit('change-window-size', { menuCode: this.menuCode, width: 505, height: 600 });
      this.currentPage = 'menu';
      let that = this;
      setTimeout(function () {
        that.getMenuListByRole(row.code);
      }, 500);
    },
    jumpToAddRolePage() {
      EventBus.$emit('window-title', { menuCode: this.menuCode, windowName: '增加新角色' });
      this.currentPage = 'add';
    },
    saveRole() {
      this.$post("/role/add", this.roleInfo).then((data) => {
        if (data.code == 0) {
          this.$mymsg({
            message: '【' + this.roleInfo.name + '】添加成功！',
            type: 'success'
          });
          this.getRoleList();
          this.currentPage = 'role';
          this.roleInfo = {
            code: '',
            name: '',
            mono: ''
          };
        }
      });
    },
    backRolePage() {
      EventBus.$emit('window-title', { menuCode: this.menuCode, windowName: '角色管理' });
      EventBus.$emit('recover-window-size', { menuCode: this.menuCode });
      this.currentPage = 'role';
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
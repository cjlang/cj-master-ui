<template>
  <div class="content-panel">
    <transition name="fade-left">
      <div class="data-list" v-show="currentPage == 'menu'">
        <el-scrollbar style="height: 100%" wrapStyle="overflow-x:hidden;">
          <el-table :data="menuList" style="width: calc(100% - 20px); margin: 10px" row-key="id" default-expand-all
            :tree-props="{ children: 'children'}">
            <el-table-column prop="menuName" label="名称" width="160"></el-table-column>
            <el-table-column prop="type" label="类型" width="70">
              <template slot-scope="scope">
                <div v-if="scope.row.type==1">
                  <i class="iconfont">&#xea19;</i>
                  <span>&nbsp;目录</span>
                </div>
                <div v-if="scope.row.type==2">
                  <i class="iconfont">&#xece7;</i>
                  <span>&nbsp;菜单</span>
                </div>
                <div v-if="scope.row.type==3">
                  <i class="iconfont">&#xe648;</i>
                  <span>&nbsp;权限</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="urlPath" label="访问路径" width="120"></el-table-column>
            <el-table-column prop="component" label="组件路径" width="220">
              <template slot-scope="scope">
                <div v-if="scope.row.iframe==0">
                  {{scope.row.component}}
                </div>
                <div v-else>
                  {{scope.row.iframePath}}
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="orderNum" label="排序" width="60"></el-table-column>
            <el-table-column prop="menuCode" label="权限标识" width="160">
              <template slot-scope="scope">
                <div v-if="scope.row.type==3">
                  {{scope.row.menuCode}}
                </div>
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button @click="editMenu(scope.row)" size="mini">编辑</el-button>
                <el-button type="danger" @click="deleteMenu(scope.row)" size="mini">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-scrollbar>
      </div>
    </transition>
    <transition name="fade-left">
      <el-scrollbar style="height: 100%" wrapStyle="overflow-x:hidden;">
        <el-tabs v-model="tabActiveName" type="card" v-show="currentPage == 'add'" @tab-click="tabHandleClick"
          ref="tabs">
          <el-tab-pane label="目录" name="menu1">
            <add-dir></add-dir>
          </el-tab-pane>
          <el-tab-pane label="菜单" name="menu2">
            <add-menu></add-menu>
          </el-tab-pane>
          <el-tab-pane label="权限" name="menu3">
            <add-perm></add-perm>
          </el-tab-pane>
        </el-tabs>
      </el-scrollbar>
    </transition>
    <div class="window-opter">
      <div class="opter-button">
        <i class="iconfont" v-show="currentPage == 'menu'" @click="addMenu()">&#xec1a;</i>
        <i class="iconfont" v-show="currentPage == 'add'" @click="backMenuPage()">&#xe836;</i>
      </div>
    </div>
  </div>
</template>
<script>
import EventBus from "@/utils/eventbus.js";
import AddDir from "./addDir.vue";
import AddMenu from "./addMenu.vue";
import AddPerm from "./addPerm.vue";
import menuapi from '@/api/menuApi.js'
export default {
  components: { AddDir, AddMenu, AddPerm },
  data() {
    return {
      currentPage: "menu",
      tabActiveName: "menu1",
      menuList: [],
      menuCode: ""
    };
  },
  created() {
    this.getAllMenuList();
    this.menuCode = this.$store.state.window.currentActivemenuCode;
  },
  methods: {
    tabHandleClick(tab, event) {
      console.log(tab, event);
    },
    getAllMenuList() {
      menuapi.treelist("cjmenu", {}, data => this.menuList = data)
    },
    addMenu() {
      EventBus.$emit("window-title", {
        menuCode: this.menuCode,
        windowName: "创建菜单",
      });
      EventBus.$emit('addmenu-1', true);
      EventBus.$emit('addmenu-2', true);
      EventBus.$emit('addmenu-3', true);
      this.currentPage = "add";
      this.tabActiveName = "menu1"
      this.$nextTick(() => {
        this.$refs.tabs.$children[0].$refs.tabs[0].style.display = "inline-block";
        this.$refs.tabs.$children[0].$refs.tabs[1].style.display = "inline-block";
        this.$refs.tabs.$children[0].$refs.tabs[2].style.display = "inline-block";
      })
    },
    editMenu(item) {
      let name = item.type == 1 ? '目录' : item.type == 2 ? '菜单' : '权限'
      EventBus.$emit("window-title", {
        menuCode: this.menuCode,
        windowName: "编辑" + name,
      });
      this.currentPage = "add";
      this.tabActiveName = "menu" + item.type
      EventBus.$emit('editmenu-' + item.type, item);
      this.$nextTick(() => {
        this.$refs.tabs.$children[0].$refs.tabs[0].style.display = item.type == '1' ? "inline-block" : "none"
        this.$refs.tabs.$children[0].$refs.tabs[1].style.display = item.type == '2' ? "inline-block" : "none"
        this.$refs.tabs.$children[0].$refs.tabs[2].style.display = item.type == '3' ? "inline-block" : "none"
      })
    },
    deleteMenu(item) {
      let that = this
      if (item.children != null && item.children != '') {
        this.$mymsg({
          message: '非叶子结点，不能删除！',
          type: 'error'
        });
      } else {
        this.$baseapi.del("cjmenu", item, function (data) {
          that.$mymsg({
            message: '删除成功！',
            type: 'success'
          });
          that.getAllMenuList();
          EventBus.$emit('updatemenu-1', true);
          EventBus.$emit('updatemenu-2', true);
          EventBus.$emit('updatemenu-3', true);
          EventBus.$emit('get-allprogrammenudata', true);
        })
      }

    },
    backMenuPage() {
      EventBus.$emit("window-title", {
        menuCode: this.menuCode,
        windowName: "菜单管理",
      });
      this.currentPage = "menu";
      this.getAllMenuList();
      EventBus.$emit('updatemenu-1', true);
      EventBus.$emit('updatemenu-2', true);
      EventBus.$emit('updatemenu-3', true);

    },
  }
};
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

.menuapp-list {
  height: 100%;
  width: 100%;

  .app-item {
    width: 50px;
    height: 70px;
    display: inline-block;
    text-align: center;
    border: 1px solid #ffffff;
    margin: 10px;
    border-radius: 5px;

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
      background-color: rgba($color: $themeColor, $alpha: 0.2);
    }
  }
}

.selected-app {
  background-color: rgba($color: $themeColor, $alpha: 0.2);
}

.el-descriptions {
  margin: 0px 50px;
}
</style>
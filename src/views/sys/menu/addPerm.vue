<template>
  <div class="content-panel" style="min-height:600px">
    <div class="addperm">
      <div class="left-tree">
        <div class="title-bar">目录</div>
        <el-tree :data="menuList" default-expand-all :expand-on-click-node="false" :highlight-current="true"
          :props="defaultProps" @node-click="selectParenDirClick">
          <span class="custom-tree-node" slot-scope="{ node, data }">
            <i v-if="data.type==2" icon-class="file" class="iconfont">&#xece7;</i>
            <i v-else-if="data.type==1 && node.expanded" icon-class="floder_open" class="iconfont">&#xea19;</i>
            <i v-else-if="data.type==1" icon-class="floder_close" class="iconfont">&#xea1b;</i>
            <i v-else-if="data.type==3" class="iconfont">&#xe648;</i>
            <span v-if="data.type==1" :title='node.label'
              style="font-size:14px;font-weight:500;padding-left: 5px;">{{node.label}}</span>
            <span v-else-if="data.type==2" :title='node.label'
              style="font-size:14px;padding-left: 5px;">{{node.label}}</span>
            <span v-else :title='node.label' style="font-size:14px;padding-left: 5px;">{{node.label}}</span>
          </span>
        </el-tree>
        <div class="div_placeholder"></div>
      </div>
      <div class="right-form">
        <div class="title-bar">权限信息</div>
        <el-form ref="form" :model="form" label-width="80px">
          <el-row v-show="!isEdit">
            <el-col :span="12">
              <el-form-item label="所属菜单">
                <el-input v-model="form.pname" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="权限名称">
                <el-input v-model="form.menuName"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="权限标识">
                <el-input v-model="form.menuCode"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="权限排序">
                <el-input-number v-model="form.orderNum" :min="1" :max="10000" label="排序"></el-input-number>
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
            <el-button type="primary" @click="saveMenuPerm">提交</el-button>
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
import { addMenu, updateMenu, getMenu } from '@/api/menuApi.js'
export default {
  data() {
    return {
      isEdit: false,
      form: {
        id: '',
        pid: '0',
        type: 3,
        level: '0',
        pname: '',
        menuName: '',
        menuCode: '',
        urlPath: '',
        component: '',
        iframePath: '',
        icon: '',
        orderNum: '0',
        remark: ''
      },
      menuList: [],
      defaultProps: {
        children: 'children',
        label: 'menuName'
      }
    };
  },
  created() {
    this.getAllMenuPerm()
    EventBus.$on('editmenu-3', data => {
      this.form = JSON.parse(JSON.stringify(data))
      this.isEdit = true
    });
    EventBus.$on('addmenu-3', data => {
      this.isEdit = false
      this.form = {
        id: '',
        pid: '0',
        type: 3,
        level: '0',
        pname: '',
        menuName: '',
        menuCode: '',
        urlPath: '',
        component: '',
        iframePath: '',
        icon: '',
        orderNum: '0',
        remark: ''
      }
    });
    EventBus.$on('updatemenu-3', data => {
      this.getAllMenuPerm()
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
        if (data.type == 2) {
          this.form.pname = data.menuName
          this.form.pid = data.id
          this.form.level = data.level + 1
        }
      }
    },
    saveMenuPerm() {
      let that = this
      if (this.form.pid == '0') {
        this.$mymsg({
          message: '请选择左边菜单！',
          type: 'error'
        });
        return
      }
      if (!this.isEdit) {
        addMenu(this.form, function (data) {
          that.$mymsg({
            message: '创建成功！',
            type: 'success'
          });
          that.getAllMenuPerm()
        })
      } else {
        updateMenu(this.form, function (data) {
          that.$mymsg({
            message: '修改成功！',
            type: 'success'
          });
          that.getAllMenuPerm()
        })
      }
    },
    getAllMenuPerm() {
      getMenu({ type: 3 }, data => this.menuList = data)
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
</style>
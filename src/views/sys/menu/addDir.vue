<template>
  <div class="content-panel">
    <div class="adddir">
      <div class="left-tree">
        <div class="title-bar">目录</div>
        <el-tree :data="menuList" default-expand-all :expand-on-click-node="false" :highlight-current="true"
          :props="defaultProps">
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
        <div class="title-bar">目录信息</div>
        <el-form ref="form" :model="form" label-width="80px">
          <el-row>
            <el-col :span="24">
              <el-form-item label="目录名称">
                <el-input v-model="form.menuName"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="系统目录">
                <el-radio-group v-model="form.sysWindow">
                  <el-radio :label=0>否</el-radio>
                  <el-radio :label=1>是</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="目录排序">
                <el-input-number v-model="form.orderNum" :min="1" :max="10000" label="排序"></el-input-number>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="备注信息">
                <el-input v-model="form.remark" type="textarea"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item>
            <el-button type="primary" @click="saveMenuDir">提交</el-button>
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
import menuapi from '@/api/menuApi.js'
export default {
  data() {
    return {
      isEdit: false,
      form: {
        id: '',
        pid: '0',
        type: 1,
        sysWindow: 0,
        level: '0',
        pname: '',
        menuName: '',
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
    this.getAllMenuDir()
    EventBus.$on('editmenu-1', data => {
      this.form = JSON.parse(JSON.stringify(data))
      this.isEdit = true
    });
    EventBus.$on('addmenu-1', data => {
      this.isEdit = false
      this.form = {
        id: '',
        pid: '0',
        type: 1,
        level: '0',
        sysWindow: 0,
        pname: '',
        menuName: '',
        orderNum: '0',
        remark: ''
      }
    });
    EventBus.$on('updatemenu-1', data => {
      this.getAllMenuDir()
    });
  },
  methods: {
    setRootDir() {
      if (!this.isEdit) {
        this.form.pname = '/'
        this.form.pid = 0
        this.form.level = 0
      }
    },
    saveMenuDir() {
      let that = this
      if (!this.isEdit) {
        this.$baseapi.add("cjmenu", this.form, function (data) {
          that.$mymsg({
            message: '创建成功！',
            type: 'success'
          });
          that.getAllMenuDir()
          EventBus.$emit('updatemenu-2', true);
          EventBus.$emit('updatemenu-3', true);
          EventBus.$emit('get-allprogrammenudata', true);
        })
      } else {
        this.$baseapi.update("cjmenu", this.form, function (data) {
          that.$mymsg({
            message: '修改成功！',
            type: 'success'
          });
          that.getAllMenuDir()
          EventBus.$emit('updatemenu-2', true);
          EventBus.$emit('updatemenu-3', true);
          EventBus.$emit('get-allprogrammenudata', true);
        })
      }
    },
    getAllMenuDir() {
      menuapi.treelist("cjmenu", { type: 1 }, data => this.menuList = data)
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
  width: calc(100% - 240px);
  padding-right: 40px;
  height: 100%;
  display: inline-block;
  float: right;
}
</style>
<template>
  <div class="login-panel unselect">
    <el-row>
      <el-col :span="24">
        <div class="login-icon" @click="FullScreen()">
          <i class="iconfont">&#xec36;</i>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <transition name="login-txt">
          <div v-show="isShowName" class="user-name" @click="ChangeName()">
            {{ username }}
          </div>
        </transition>
      </el-col>
    </el-row>
    <transition name="login-ani">
      <el-row v-show="isShowNameInput">
        <el-col :span="24">
          <el-input ref="username" placeholder="UserName" v-model="username" @keyup.enter.native="InputUserName()">
            <el-button slot="append" icon="el-icon-right" style="width:46px" @click="InputUserName()"></el-button>
          </el-input>
        </el-col>
      </el-row>
    </transition>
    <transition name="login-ani">
      <el-row v-show="isShowPwd">
        <el-col :span="24">
          <el-input ref="userpwd" placeholder="Password" v-model="userpwd" show-password @keyup.enter.native="Login()">
            <el-button slot="append" icon="el-icon-right" style="width:46px" @click="Login()"></el-button>
          </el-input>
        </el-col>
      </el-row>
    </transition>
    <el-row>
      <el-col :span="24">
        <div class="forgetpwd" @click="ForgetIt()">{{ tips }}</div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import EventBus from "@/utils/eventbus.js";
import { setToken, setSid, setUserInfo } from "@/utils/auth.js";
import { login } from "@/api/loginApi.js";
export default {
  data() {
    return {
      isShowName: false,
      isShowNameInput: true,
      isShowPwd: false,
      username: "admin",
      userpwd: "123456",
      tips: "忘记用户名或密码！",
    };
  },
  methods: {
    ChangeName() {
      var that = this;
      this.isShowPwd = false;
      setTimeout(function () {
        that.isShowName = false;
      }, 300);
      setTimeout(function () {
        that.isShowNameInput = true;
      }, 600);
    },
    InputUserName() {
      if (this.username != "") {
        var that = this;
        this.isShowNameInput = false;
        setTimeout(function () {
          that.isShowName = true;
        }, 300);
        setTimeout(function () {
          that.isShowPwd = true;
          that.$refs.userpwd.focus();
        }, 600);
      }
    },
    Login() {
      if (this.username == '' || this.userpwd == '') {
        this.$notify({ title: '提示', message: '用户名密码不能不输！！' });
        return
      }
      let that = this
      login({
        username: this.username,
        password: this.userpwd,
      }, function (data) {
        setToken(data.token)
        setSid(data.sid)
        setUserInfo(data.userinfo)
        that.$router.push({ path: "/home" });
      })
    },
    ForgetIt() {
      this.tips = "这都能忘记，吃饭你咋不忘记呢？";
      var that = this;
      setTimeout(function () {
        that.tips = "忘记用户名或密码！";
      }, 3000);
    },
    FullScreen() {
      EventBus.$emit("app-fullscreen", true);
    },
  },
};
</script>
<style scoped lang="scss">
.el-row {
  margin: 15px;
}

.login-icon {
  position: relative;
  left: 75px;
  width: 120px;
  height: 120px;
  display: block;
  line-height: 120px;
  text-align: center;
  border-radius: 80px;
  background-color: rgba($color: #ffffff, $alpha: 0.3);
  perspective: 500px;

  i {
    font-size: 65px;
    font-weight: 500;
    color: #ffffff;
    display: block;
    transition: all .4s ease-in-out;
  }

  &:hover {
    cursor: pointer;
    box-shadow: $shadow-2;
    backdrop-filter: blur(15px);

    i {
      transition: all .4s ease-in-out;
    }
  }
}

.login-panel {
  width: 300px;
  height: 300px;
  display: inline-block;
  position: absolute;
  top: calc(50vh - 250px);
  left: calc(50vw - 150px);

  .user-name {
    font-size: 25px;
    font-weight: 500;
    color: #ffffff;
    display: block;
    text-align: center;

    &:hover {
      cursor: pointer;
    }
  }

  .forgetpwd {
    margin-top: 20px;
    text-align: right;
    font-size: 13px;
    color: #eeeeee;

    &:hover {
      cursor: pointer;
      color: #ffffff;
    }
  }
}

.el-input-group__append,
.el-input-group__prepend {
  background-color: #969696;
  color: #ffffff;
}

/deep/ .el-input__inner {
  background-color: rgba(#000000, 0.2);
  color: #FFFFFF;
}

/deep/ .el-icon-right {
  font-size: 16px;
  width: 16px;
  height: 16px;
}

/deep/ .el-input-group__append button.el-button,
.el-input-group__append,
.el-input-group__prepend,
.el-input-group__append,
.el-input-group__prepend {
  background: rgba($themeColor, 0);
  color: #FFFFFF;
}

/deep/ .el-input-group__append,
.el-input-group__prepend {
  background: rgba($themeColor, 1);
  color: #FFFFFF;
  border-right-color: #cecece;
  border-top-color: #cecece;
  border-bottom-color: #cecece;
  border-left-color: rgba(#FFFFFF, 0);
}

/deep/ .el-input__inner {
  border-right-color: rgba(#FFFFFF, 0);
  border-top-color: #cecece;
  border-bottom-color: #cecece;
  border-left-color: #cecece;
}

/deep/ .el-input__inner:focus {
  border-left-color: #FFFFFF;
  border-top-color: #FFFFFF;
  border-bottom-color: #FFFFFF;
  border-right-color: rgba(#FFFFFF, 0);
}
</style>

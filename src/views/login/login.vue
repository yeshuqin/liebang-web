<template>
  <div class="login">
    <div class="login-top">
      <div class="login-top-main">
        <div class="logo">

        </div>
        <span class="line"></span>
        <span class="text">登录</span>
        <span class="name" @click="handleGoIndex">猎邦首页</span>
      </div>
    </div>
    <div class="login-center">
      <div class="banner">

      </div>
      <div class="login-form">
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="账号密码登录" name="account" v-if="!isLogin">
              <div class="account-form">
                <el-input v-model="loginForm.phone" auto-complete="new-password" placeholder="请输入账号">
                  <template slot="prefix">
                    <span class="iconfont">&#xe651;</span>
                  </template>
                </el-input>
                <el-input v-model="loginForm.password" auto-complete="new-password" :type="isShowPwd ? 'text' : 'password'" placeholder="请输入密码">
                  <template slot="prefix">
                    <span class="iconfont" style="font-size:24px;">&#xe622;</span>
                  </template>
                  <template slot="suffix">
                    <span class="iconfont" @click="handleView">{{isShowPwd ? '&#xe6cc;' : '&#xe601;'}}</span>
                  </template>
                </el-input>
                 <drag-verify
                  ref="dragVerify1"
                  :width="320"
                  :isPassing.sync="isPassing"
                  text="请按住滑块拖动"
                  successText="验证通过"
                  handlerIcon="el-icon-d-arrow-right"
                  successIcon="el-icon-circle-check"
                >
                </drag-verify>
                 <el-button type="danger" class="login-btn" @click="handleLogin">登 录</el-button>
                 <div class="tip">
                   <el-row type="flex"  justify="space-between">
                     <el-col :span="12">
                       <span>还没有账号？</span>
                       <span class="free" @click="goRegister">免费注册</span>
                     </el-col>
                     <el-col :span="6">
                        <div class="noPass">忘记密码</div>
                     </el-col>
                   </el-row>
                 </div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="手机动态登录" name="phone" v-if="!isLogin">
               <div class="account-form">
                <el-input v-model="phone" auto-complete="new-password" placeholder="请输入手机号">
                  <template slot="prefix">
                    <span class="iconfont">&#xe651;</span>
                  </template>
                </el-input>
                <div class="clearfix">
                  <el-input class="fl" v-model="loginForm.code" auto-complete="new-password" placeholder="请输入验证码" style="width:180px;">
                    <template slot="prefix">
                      <span class="iconfont">&#xe64f;</span>
                    </template>
                   </el-input>
                   <span class="code-btn fr" @click="handleSendCode(2)">
                     <span v-if="!disabledCode" class="fontImp">获取验证码</span>
                     <span v-else>重新获取({{time}}s）</span>
                   </span>
                </div>
                 <drag-verify
                  ref="dragVerify2"
                  :width="320"
                  :isPassing.sync="isPassing"
                  text="请按住滑块拖动"
                  successText="验证通过"
                  handlerIcon="el-icon-d-arrow-right"
                  successIcon="el-icon-circle-check"
                >
                </drag-verify>
                 <el-button type="danger" class="login-btn" @click="handleLoginPhone">登 录</el-button>
                 <div class="tip">
                   <el-row type="flex"  justify="space-between">
                     <el-col :span="12">
                       <span>还没有账号？</span>
                       <span class="free" @click="goRegister">免费注册</span>
                     </el-col>
                     <el-col :span="6">
                        <div class="noPass">忘记密码</div>
                     </el-col>
                   </el-row>
                 </div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="账号注册" name="register" v-if="isLogin">
               <div class="account-form">
                <el-input v-model="phone" auto-complete="new-password" placeholder="请输入手机号">
                  <template slot="prefix">
                    <span class="iconfont">&#xe651;</span>
                  </template>
                </el-input>
                <div class="clearfix">
                  <el-input class="fl" v-model="registerForm.code" auto-complete="new-password" placeholder="请输入验证码" style="width:180px;">
                    <template slot="prefix">
                      <span class="iconfont">&#xe64f;</span>
                    </template>
                   </el-input>
                   <span class="code-btn fr" @click="handleSendCode(1)">
                     <span v-if="!disabledCode" class="fontImp">获取验证码</span>
                     <span v-else>重新获取({{time}}s）</span>
                   </span>
                </div>
                <el-input v-model="registerForm.password" auto-complete="new-password" :type="isShowPwd ? 'text' : 'password'" placeholder="请输入密码">
                  <template slot="prefix">
                    <span class="iconfont" style="font-size:24px;">&#xe622;</span>
                  </template>
                  <template slot="suffix">
                    <span class="iconfont" @click="handleView">{{isShowPwd ? '&#xe6cc;' : '&#xe601;'}}</span>
                  </template>
                </el-input>
                <div style="margin-top:16px">
                   <el-checkbox v-model="registerForm.checked"></el-checkbox> 同意并遵守《服务条款》和《隐私条款》
                </div>
                 <el-button type="danger" class="login-btn" @click="handleRegister" style="margin-top:20px">注 册</el-button>
                 <div class="tip">
                   <el-row type="flex"  justify="space-between">
                     <el-col :span="12">
                       <span>已有账号？</span>
                       <span class="free" @click="goLogin">去登录</span>
                     </el-col>
                     <el-col :span="6">
                        <div class="noPass">忘记密码</div>
                     </el-col>
                   </el-row>
                 </div>
              </div>
            </el-tab-pane>
          </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
  // 基本滑块验证组件
  import dragVerify from "@/components/Verify/dragVerify";
  export default {
    components: {
      dragVerify
    },
    data() {
      return {
        activeName: this.$route.query.tag || 'account',
        isPassing: false,
        isShowPwd: false,
        phone: '',
        loginForm: {
          phone: '',
          password: '',
          code: ''
        },
        registerForm: {
          phone: '',
          code: '',
          password: '',
          checked: false
        },
        timer: null,
        time: 60,
        isLogin: false,
        disabledCode: false
      }
    },
    mounted() {
      this.isLogin = this.activeName === 'register' ? true : false
    },
    watch: {
      activeName(val) {
        this.isPassing = false
        this.isShowPwd = false
        this.phone = ''
        if(this.$refs.dragVerify1 !== undefined) {
          this.$refs.dragVerify1.reset();
        } 
        if(this.$refs.dragVerify2 !== undefined) {
          this.$refs.dragVerify2.reset();
        }   
        this.loginForm = {
          phone: '',
          password: '',
          code: ''
        }
        this.registerForm = {
          phone: '',
          code: '',
          password: '',
          checked: false
        }
      }
    },
    methods: {
      handleLogin() { // 登录
        if(!this.loginForm.phone) {
          this.$message.error('请输入账号~')
          return
        }
        if(!this.loginForm.password) {
          this.$message.error('请输入密码~')
          return
        }
        if(!this.isPassing) {
          this.$message.error('请滑动验证~')
          return
        }
        let password = md5(this.loginForm.password)
        this.$http.send(this.$api.login, {
          password,
          phone: this.loginForm.phone
        }).then(res => {
          console.log(res)
          localStorage.setItem('token', res.data.token)
          localStorage.setItem('name', res.data.name)
          localStorage.setItem('phone', res.data.phone)
          this.$router.push({path: '/index'})
          this.$message.success('登录成功~')
        })
      },
      handleLoginPhone() {
        if(!this.phone) {
          this.$message.error('请输入手机号~')
          return
        }
        if(!this.isPhoneNumber(this.phone)) {
          this.$message.error('请输入正确的手机号')
          return
        }
        if(!this.loginForm.code) {
          this.$message.error('请输入验证码~')
          return
        }
         if(!this.isPassing) {
          this.$message.error('请滑动验证~')
          return
        }
        let password = md5(this.loginForm.password)
        this.$http.send(this.$api.login, {
          code: this.loginForm.code,
          phone: this.phone
        }).then(res => {
          console.log(res)
          localStorage.setItem('token', res.data.token)
          localStorage.setItem('name', res.data.name)
          localStorage.setItem('phone', res.data.phone)
          this.$router.push({path: '/index'})
          this.$message.success('登录成功~')
        })
      },
      handleRegister() {
        if(!this.phone) {
          this.$message.error('请输入手机号~')
          return
        }
        if(!this.isPhoneNumber(this.phone)) {
          this.$message.error('请输入正确的手机号')
          return
        }
        if(!this.registerForm.code) {
          this.$message.error('请输入验证码~')
          return
        }
        if(!this.registerForm.password) {
          this.$message.error('请输入密码~')
          return
        }
        if(!this.registerForm.checked) {
          this.$message.error('请同意并遵守《服务条款》和《隐私条款》')
          return
        }
        let password = md5(this.registerForm.password)
         this.$http.send(this.$api.register, Object.assign({}, this.registerForm, {
           password,
           phone: this.phone
         })).then(res => {
           this.$message.success('注册成功~')
           this.activeName = 'account'
           this.isLogin = false
        })
      },
      handleSendCode(type) { // 发送验证码
        if(!this.isPhoneNumber(this.phone)) {
          this.$message.error('请输入正确的手机号')
          return
        }
        if(this.disabledCode) {
          return
        }
        this.disabledCode = true
        this.$http.send(this.$api.code, {
          phone: this.phone,
          type: type
        }).then(res => {
           this.timer = setInterval(() => {
            if(this.time == 1){
              clearInterval(this.timer);  
              this.disabledCode = false 
              this.time = 60
            }else{
              this.time--;
            }
          }, 1000)
        })
      },
      goRegister() {
        this.isLogin = true
        this.activeName = 'register'
        this.initData()
      },
      goLogin() {
        this.isLogin = false
        this.activeName = 'account'
        this.initData()
      },
      initData() {
        this.isShowPwd = false
        clearInterval(this.timer)
        this.disabledCode = false 
        this.time = 60
      },
      handleView() {
        this.isShowPwd = !this.isShowPwd
      },
      handleClick() {},
      handleGoIndex() {
        this.$router.push({name: 'index'})
      }
    }
  }
</script>

<style lang="scss" scoped>
.login {
  width: 100%;
  min-height: 100vh;
  background: #F3F6F9;
  .login-top {
    height: 58px;
    line-height: 58px;
    background: rgba(255,255,255,1);
    box-shadow: 0px 10px 19px 0px rgba(0,0,0,0.07);
    .login-top-main {
      width: 1200px;
      margin: 0 auto;
      overflow: hidden;
      .logo {
          width:119px;
          height:23px;
          float: left;
          margin-top: 18px;
          background: url('../../assets/img/logo.png');
          background-size: 100% 100%;
        }
      .line {
          width:1px;
          height:20px;
          background:rgba(228,231,237,1);
          float: left;
          margin: 20px;
        }
      .text {
        font-size: 16px;
        float: left;
        cursor: pointer;
      }
      .name {
        float: right;
        font-size: 14px;
        cursor: pointer;
      }
    }
  }
  .login-center {
    margin:103px auto 0;
    width: 1062px;
    display: flex;
    .banner {
      width:640px;
      height:480px;
      background: #FE6A00;
      background-image: url('../../assets/img/denglu.png');
      background-size: 100% 100%;
    }
    .login-form {
      width:422px;
      height:480px;
      padding: 32px 49px 0;
      box-sizing: border-box;
      background: #ffffff;
      .account-form {
        margin-top: 25px;
      }
      .tip {
        margin: 12px;
        .free, .noPass{
          color: #FE6A00;
          cursor: pointer;
        }
        .noPass {
          text-align: right;
        }
      }
    }
  }
}
</style>
<style lang="scss">
.login-form  {
  .el-input__inner {
    width:100%;
    height:50px;
    border-radius:1px;
    border:1px solid rgba(217,217,217,1);
    margin-bottom: 20px;
  }
  .login-btn {
    width: 100%;
    height: 50px;
    border-radius: 1px;
    margin-top: 62px;
    background: #FE6A00;
    font-size: 16px;
  }
  .code-btn {
    width:136px;
    height:50px;
    line-height: 50px;
    color: #BBBBBBFF;
    border-radius:1px;
    border:1px solid rgba(217,217,217,1);
    display: inline-block;
    text-align: center;
    margin-left: 8px;
    font-size: 16px;
    cursor: pointer;
  }
  .el-input  {
    .iconfont {
      font-size: 18px;
      cursor: pointer;
    }
  }
  .el-input__prefix, .el-input__suffix {
    top: 14px;
    left: 14px;
  }
  .el-input__suffix {
    left: auto;
    right: 14px;
  }
  
  .el-input--prefix .el-input__inner {
    padding-left: 42px;
  }
}
.login {
  .el-tabs {
  .el-tabs__nav {
    width: 100%;
    display: flex;
  }
  .el-tabs__item {
    font-size: 20px;
    color: #999999;
    text-align: center;
    margin-bottom: 8px;
    flex: 1;
  }
  .el-tabs__item.is-active {
    color: #303133;
  }
  .el-tabs__active-bar {
    background-color: #FE6A00 !important;
  }
}
}
</style>
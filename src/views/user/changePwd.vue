<!-- 重置密码 -->
<template>
  <div class="change_pwd">
    <div class="login-top">
      <div class="login-top-main">
        <div class="logo">

        </div>
        <span class="line"></span>
        <span class="text" @click="handleGoLogin">登录</span>
        <span class="name" @click="handleGoIndex">猎邦首页</span>
      </div>
    </div>
    <el-form label-position="top" label-width="80px" :model="formInfo" class="form_info">
      <el-form-item label="手机号">
        <el-input clearable v-model.trim="formInfo.phone" placeholder="请输入手机号"></el-input>
      </el-form-item>
      <el-form-item label="验证码">
        <div class="clearfix">
          <el-input class="fl" v-model="formInfo.code" auto-complete="new-password" placeholder="请输入验证码" style="width:300px;">
            <template slot="prefix">
              <span class="iconfont">&#xe64f;</span>
            </template>
            </el-input>
            <span class="code-btn fr" @click="handleSendCode">
              <span v-if="!disabledCode" class="fontImp">获取验证码</span>
              <span v-else>重新获取({{time}}s）</span>
            </span>
        </div>
      </el-form-item>
      <el-form-item label="新密码">
        <el-input clearable type="password" auto-complete="new-password" v-model.trim="formInfo.password" placeholder="请输入新密码"></el-input>
      </el-form-item>
      <el-form-item label="确认密码">
        <el-input clearable type="password" v-model.trim="formInfo.confirmPassword" placeholder="请输入确认密码"></el-input>
      </el-form-item>
      <el-form-item style="text-align:center">
        <el-button type="primary" :loading="loading" @click="submitPwd">重置密码</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loading: false,
      formInfo: {
        phone: '',
        password: '',
        code: '',
        confirmPassword: ''
      },
      disabledCode: false,
      time: 60,
      timer: null
    }
  },
  components: {},
  methods: {
    submitPwd () {
      if(!this.formInfo.phone) {
          this.$message.error('请输入手机号~')
          return
      }
      if(!this.isPhoneNumber(this.formInfo.phone)) {
        this.$message.error('请输入正确的手机号')
        return
      }
      if(!this.formInfo.code) {
        this.$message.error('请输入验证码~')
        return
      }
      let password = md5(this.formInfo.password)
      let confirmPassword = md5(this.formInfo.confirmPassword)
      if (password !== confirmPassword) {
        this.$message.error('新密码与确认密码不一致')
        return
      }
      this.loading = true
      this.$http.send(this.$api.resetPassword, {
          password: password,
          code: this.formInfo.code,
          phone: this.formInfo.phone
        }).then(res => {
        this.loading = false
        this.$message.success('操作成功,请重新登录')
        // this.$router.push({name: 'login'})
      }).catch(res => {
        this.loading = false
      })
    },
    handleSendCode(type) { // 发送验证码
        if(!this.isPhoneNumber(this.formInfo.phone)) {
          this.$message.error('请输入正确的手机号')
          return
        }
        if(this.disabledCode) {
          return
        }
        this.disabledCode = true
        this.$http.send(this.$api.code, {
          phone: this.formInfo.phone,
          type: 5
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
    handleGoIndex() {
      this.$router.push({name: 'index'})
    },
    handleGoLogin() {
      this.$router.push({name: 'login'})
    }
  }
}
</script>
<style lang='scss' scoped>
.change_pwd {
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
  .form_info {
    width: 500px;
    margin: 20px auto;
    background: #FFF;
    border-radius: 10px;
    padding: 20px;
  }
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
    height:40px;
    line-height: 40px;
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
</style>

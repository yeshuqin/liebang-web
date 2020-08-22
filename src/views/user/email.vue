<template>
  <div class="email-wrap">
   <div class="login-top">
      <div class="login-top-main">
        <div class="logo">

        </div>
        <span class="line"></span>
        <span class="text" @click="handleGoLogin">登录</span>
        <span class="name" @click="handleGoIndex">猎邦首页</span>
      </div>
    </div>
    <div class="email">
      <i class="el-icon-circle-check"></i>
      <h1>激活成功</h1>
      <h2>您的邮箱已绑定成功</h2>
      <el-button type="primary" @click="goIndex">回到首页</el-button>
    </div>
  </div>
  
</template>

<script>
  export default {
    data() {
      return {
        id: this.$route.query.code
      }
    },
    created() {
      if(!this.id) {
        return
      }
      this.$http.send(this.$api.userActiveMail, {
        id: this.id
      }).then(res => {
      })
    },
    methods: {
      goIndex() {
        this.$router.push({name: 'index'})
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

<style lang="scss" scoped>
.email-wrap {
  .login-top {
    position: fixed;
    width: 100%;
    left: 0;
    top: 0;
    height: 58px;
    line-height: 58px;
    background: rgba(255,255,255,1);
    box-shadow: 0px 10px 19px 0px rgba(0,0,0,0.07);
    .login-top-main {
      width: 1024px;
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
  .email {
    position: absolute;
    top: 50%;
    left: 50%;
    text-align: center;
    transform: translate(-50%, -50%);
    .el-icon-circle-check {
      font-size: 50px;
      color: #00C901FF;
    }
    h1 {
      margin: 10px 0;
      font-size: 18px;
    }
    h2 {
      font-size: 16px;
      margin-bottom: 10px;
    }
  }
}
</style>
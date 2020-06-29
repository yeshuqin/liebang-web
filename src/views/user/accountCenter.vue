<template>
  <div class="account-center content-wrap">
    <left-menu></left-menu>
    <div class="account-center-main">
        <h3 class="title">当前账户安全区别</h3>
        <div class="account-center-number">
          <div class="progress-wrap">
            <span>当前安全级系数</span>
            <el-progress :percentage="percentage" :color="customColors" :format="format" style="width:210px;"></el-progress>
          </div>
          <p class="font999">为了更好的保护您的交易安全，建议您通过以下方式提高安全级别</p>
        </div>
        <ul class="account-center-list">
          <li>
            <span class="iconfont fl icon-secure">&#xe64f;</span>
            <div class="fl account-center-desc">
               <p>账户密码</p>
                <div class="font666">
                  <div class="account-center-desc-l">
                    当前密码强度:
                     <el-progress :percentage="percentage" :color="customColors" :format="format" style="width:100px;display:inline-block;"></el-progress>
                  </div>
                  <span class="font999 account-center-text">建议您定期修改密码以保护账户安全</span>
                </div>
            </div>
            <div class="account-btn fr">
              修改
            </div>
          </li>
          <li>
            <span class="iconfont fl icon-secure">&#xe64f;</span>
            <div class="fl account-center-desc">
               <p>绑定手机</p>
                <div class="font666">
                  <div class="account-center-desc-l">已绑：130*****3677</div>
                  <span class="font999 account-center-text">若手机号已丢失或停用，请立即更换，避免账户被盗</span>
                </div>
            </div>
            <div class="account-btn fr">
              修改
            </div>
          </li>
          <li>
            <span class="iconfont fl icon-secure red">&#xe60d;</span>
            <div class="fl account-center-desc">
               <p>绑定邮箱</p>
                <div class="font666">
                  <div class="account-center-desc-l fontImp">未绑定</div>
                  <span class="font999 account-center-text">若邮箱已丢失或停用，请立即更换，避免账户被盗</span>
                </div>
            </div>
            <div class="account-btn bang fr">
              绑定
            </div>
          </li>
          <li>
            <span class="iconfont fl icon-secure red">&#xe60d;</span>
            <div class="fl account-center-desc">
               <p>身份认证</p>
                <div class="font666">
                  <div class="account-center-desc-l fontImp">未绑定</div>
                  <span class="font999 account-center-text">认证后方可进行交易，开通服务等操作</span>
                </div>
            </div>
            <div class="account-btn bang fr" @click="goIdentity">
              绑定
            </div>
          </li>
        </ul>
    </div>
  </div>
</template>

<script>
  import leftMenu from '@/components/leftMenu/leftMenu'
  export default {
    components: {
      leftMenu
    },
    data() {
      return {
        percentage: 60,
        customColors: [
          {color: '#FF001C', percentage: 35},
          {color: '#FE6A00', percentage: 70},
          {color: '#5cb87a', percentage: 100}
        ]
      }
    },
    methods: {
      format(percentage) {
        if(percentage<35) {
          return '低'
        }else if(percentage<70) {
          return '中'
        }else {
          return '高'
        }
      },
      goIdentity() {
        this.$router.push({name: 'identity'})
      }
    }
  }
</script>

<style lang="scss" scoped>
.account-center {
  display: flex;
  margin-top: 11px;
  margin-bottom: 100px;
  .account-center-main {
    flex: 1;
    background: #ffffff;
    min-height: 500px;
    .title {
      height: 46px;
      line-height: 46px;
      border-bottom: 1px solid #D9D9D9;
      padding-left: 24px;
    }
    .account-center-number {
      padding-left: 45px;
      margin-top: 22px;
      .progress-wrap {
        margin-bottom: 6px;
        .el-progress {
          display: inline-block;
          margin-left: 10px;
        }
      }
    }
    .account-center-list {
      padding: 25px 55px 0 24px;
      li {
        width:100%;
        height:60px;
        border-radius:1px;
        border:1px solid rgba(217,217,217,1);
        padding: 0 52px 0 27px;
        margin-bottom: 20px;
        .icon-secure {
          color: #62B727;
          font-size: 26px;
          line-height: 60px;
          margin-right: 22px;
        }
        .account-center-desc {
          margin-top: 9px;
          width: 600px;
        }
        .account-center-desc-l {
          display: inline-block;
          width: 200px;
        }
        .account-center-text {
          padding-left: 10px;
          border-left: 1px solid #D8D8D8;
        }
        .account-btn {
          margin-top: 16px;
          width:76px;
          height:28px;
          text-align: center;
          line-height: 28px;
          color: #1A90FF;
          border-radius:1px;
          border:1px solid #1A90FF;
          cursor: pointer;
        }
        .bang {
          color: #ffffff;
          border: 1px solid #FE6A00;
          background: #FE6A00;
        }
      }
    }
  }
}
</style>
<style lang="scss">
   .el-progress__text {
      font-weight: 400;
      color: #FF001C;
    }
</style>
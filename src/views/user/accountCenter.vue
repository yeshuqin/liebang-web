<template>
  <div class="account-center content-wrap">
    <left-menu></left-menu>
    <div class="account-center-main">
        <h3 class="title">当前账户安全区别</h3>
        <div class="account-center-number">
          <div class="progress-wrap">
            <!-- <span>当前安全级系数</span> -->
            <!-- <el-progress :percentage="percentage" :color="customColors" :format="format" style="width:210px;"></el-progress> -->
          </div>
          <p class="font999">为了更好的保护您的交易安全，建议您通过以下方式提高安全级别</p>
        </div>
        <ul class="account-center-list">
          <li>
            <span class="iconfont fl icon-secure">&#xe64f;</span>
            <div class="fl account-center-desc">
               <p style="position: relative;top: 12px;">账户密码</p>
                <div class="font666">
                  <div class="account-center-desc-l">
                    <!-- 当前密码强度:中 -->
                     <!-- <el-progress :percentage="percentage" :color="customColors" :format="format" style="width:100px;display:inline-block;"></el-progress> -->
                  </div>
                  <span class="font999 account-center-text">建议您定期修改密码以保护账户安全</span>
                </div>
            </div>
            <div class="account-btn fr" @click="handlePwd">
              修改
            </div>
          </li>
          <li>
            <span class="iconfont fl icon-secure">&#xe64f;</span>
            <div class="fl account-center-desc">
               <p>绑定手机</p>
                <div class="font666">
                  <div class="account-center-desc-l">已绑：{{regPhone()}}</div>
                  <span class="font999 account-center-text">若手机号已丢失或停用，请立即更换，避免账户被盗</span>
                </div>
            </div>
            <div class="account-btn fr" @click="handlePhone">
              修改
            </div>
          </li>
          <li>
             <span class="iconfont fl icon-secure red" v-if="!infoObj.email">&#xe60d;</span>
             <span class="iconfont fl icon-secure" v-else>&#xe64f;</span>
            <div class="fl account-center-desc">
               <p>绑定邮箱</p>
                <div class="font666">
                  <div class="account-center-desc-l fontImp" v-if="infoObj.status === 0">未绑定</div>
                  <div class="account-center-desc-l fontImp" v-else>已认证</div>
                  <span class="font999 account-center-text">若邮箱已丢失或停用，请立即更换，避免账户被盗</span>
                </div>
            </div>
            <div class="account-btn bang fr" @click="handleEmail" v-if="!infoObj.email">
              绑定
            </div>
            <div class="account-btn fr" @click="handleEmail" v-else>
              修改
            </div>
          </li>
          <li>
            <span class="iconfont fl icon-secure red" v-if="infoObj.status === 0">&#xe60d;</span>
            <span class="iconfont fl icon-secure" v-else>&#xe64f;</span>
            <div class="fl account-center-desc">
               <p>身份认证</p>
                <div class="font666">
                  <div class="account-center-desc-l fontImp" v-if="infoObj.status === 0">未绑定</div>
                  <div class="account-center-desc-l fontImp" v-else>已认证</div>
                  <span class="font999 account-center-text">认证后方可进行交易，开通服务等操作</span>
                </div>
            </div>
            <div class="account-btn bang fr" @click="goIdentity" v-if="infoObj.status === 0">
              绑定
            </div>
             <div class="account-btn fr" @click="goIdentity" v-else>
              修改
            </div>
          </li>
        </ul>
    </div>
     <!-- 安全验证 -->
    <!-- <el-dialog title="安全验证" :visible.sync="showCodeDialog" :append-to-body="true" :close-on-click-modal="false" custom-class="counse-dialog">
      <div class="body">
          <h2 class="mb20">为确保是您本人的操作，请先验证手机</h2>
          <el-form :model="userFrom" size="medium" label-width="100px">
            <el-form-item label="联系方式：" required>
              <el-input v-model="userFrom.phone" placeholder="请输入手机号"></el-input>
              <div class="clearfix mt10">
                <el-input v-model="userFrom.code" class="fl" auto-complete="new-password" placeholder="请输入验证码" style="width:210px;">
                  </el-input>
                  <span class="code-btn fr" @click="handleSendCode">
                    <span v-if="!disabledCode">发送验证码</span>
                    <span v-else><span class="fontImp">{{time}}</span> 秒重新发送</span>
                  </span>
              </div>
            </el-form-item>
          </el-form>
          <el-button type="primary" class="btn" @click="handleSumbit">预约咨询</el-button>
      </div>
      <div class="footer">

      </div>
    </el-dialog> -->

     <!-- 修改密码 -->
    <el-dialog title="账户密码修改" center :visible.sync="showPwdDialog" :append-to-body="true" :close-on-click-modal="false">
      <el-form label-width="80px" class="form_info">
        <el-form-item label="原密码">
          <el-input clearable type="password" v-model.trim="formInfo.oldPassword" placeholder="请输入原密码"></el-input>
        </el-form-item>
        <el-form-item label="新密码">
          <el-input clearable type="password" v-model.trim="formInfo.newPassword" placeholder="请输入新密码"></el-input>
        </el-form-item>
        <el-form-item label="确认密码">
          <el-input clearable type="password" v-model.trim="formInfo.confirmPassword" placeholder="请输入确认密码"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
         <el-button @click="showPwdDialog = false">取 消</el-button>
         <el-button type="primary"  @click="submitPwd">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 修改邮箱 -->
    <el-dialog title="绑定邮箱" center :visible.sync="showEmailDialog" width="500px" :append-to-body="true" :close-on-click-modal="false">
      <el-form label-width="80px" class="form_info">
        <el-form-item label="邮箱账号">
          <el-input clearable v-model.trim="email" placeholder="请输入邮箱账号"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
         <el-button @click="showEmailDialog = false">取 消</el-button>
         <el-button type="primary"  @click="submitEmail" :loading="emailloading">确 定</el-button>
      </div>
    </el-dialog>
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
        showCodeDialog: false,
        disabledCode: false,
        userFrom: {
          phone: '',
          code: ''
        },
        percentage: 60,
        customColors: [
          {color: '#FF001C', percentage: 35},
          {color: '#FE6A00', percentage: 70},
          {color: '#5cb87a', percentage: 100}
        ],
        showPwdDialog: false,
        showEmailDialog: false,
        formInfo: {
          oldPassword: '',
          newPassword: '',
          confirmPassword: ''
        },
        infoObj: {},
        phone: localStorage.getItem('phone'),
        email: '',
        emailloading: false
      }
    },
    created() {
      this.getInfor()
    },
    methods: {
      regPhone() {
        var reg = /^(\d{3})\d{4}(\d{4})$/;
        return this.phone.replace(reg, "$1****$2");
      },
      format(percentage) {
        if(percentage<35) {
          return '低'
        }else if(percentage<70) {
          return '中'
        }else {
          return '高'
        }
      },
      handlePwd () {
        this.showPwdDialog = true
      },
      submitPwd () {
        if (!this.formInfo.oldPassword) {
          this.$message.error('请输入原密码')
          return
        }
        if (!this.formInfo.newPassword || this.formInfo.newPassword.length < 6) {
          this.$message.error('请正确输入新密码并且长度不少于6')
          return
        }
        let oldPwd = md5(this.formInfo.oldPassword)
        let newPwd = md5(this.formInfo.newPassword)
        let confirmPwd = md5(this.formInfo.confirmPassword)
        if (newPwd !== confirmPwd) {
          this.$message.error('新密码与确认密码不一致')
          return
        }
        this.loading = true
        this.$http.send(this.$api.updatePassword, {
            oldPassword: oldPwd,
            newPassword: newPwd
          }).then(res => {
          this.loading = false
          this.$message.success('操作成功,请重新登录')
          this.$http.send(this.$api.logout, {}).then(res => {
            localStorage.removeItem('token')
            this.$router.push({name: 'login'})
            location.reload()
          })
        }).catch(res => {
          this.loading = false
          // this.$message.error(res.msg)
        })
      },
      getInfor() {
        this.$http.send(this.$api.userInfo, {}).then(res => {
           if(res.data) {
             this.infoObj = res.data
           }
        })
      },
      handlePhone() {
        this.$message({
          message: '暂未开放该功能，敬请期待~',
          type: 'warning'
        });
      },
      handleEmail() {
        this.showEmailDialog = true
      },
      submitEmail() {
        if(!this.email){
          this.$message.error('请输入邮箱~')
          return
        }
        var reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
        if(!reg.test(this.email)){
          this.$message.error('邮箱格式不正确~')
          return
        }
        this.emailloading = true
        this.$http.send(this.$api.userSetMail, {
          email: this.email
        }).then(res => {
          this.showEmailDialog = false
          this.emailloading = false
           this.$confirm(`激活邮件已发送致您的邮箱，请在${res.data}内前往邮箱进行激活。`, '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消'
            }).then(() => {
             
            }).catch(() => {
            });
        }).catch(()=> {
          this.emailloading = false
        })
      },
      goIdentity() {
        this.$router.push({name: 'identity'})
      },
      handleSumbit() {

      },
      handleSendCode() {
        
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
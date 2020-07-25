<template>
   <div class="step3">
      <div class="alert">
        确认企业信息
      </div>
      <ul class="info_list">
        <li>
          <span class="label">企业名称:</span>
          <span class="value">{{edit.companyName}}</span>
        </li>
         <li>
          <span class="label">信用代码:</span>
          <span class="value">{{edit.companyCode}}</span>
        </li>
         <li>
          <span class="label">姓名:</span>
          <span class="value">{{edit.name}}</span>
        </li>
         <li>
          <span class="label">身份证号码:</span>
          <span class="value">{{edit.idCard}}</span>
        </li>
         <li>
          <span class="label">有效期限:</span>
          <span class="value">{{edit.startDate}}-{{edit.endDate}}</span>
        </li>
        <li style="margin-top:40px;">
          <span class="label">法人手机:</span>
          <el-input placeholder="请输入手机号" v-model="legalPhone" style="width:380px;"></el-input>
        </li>
        <li style="margin-top:20px;">
          <span class="label">验证码：</span>
          <el-input placeholder="请输入手机验证码" v-model="verifyCode" style="width:200px;"></el-input>
          <span class="code-btn" @click="handleSendCode">
            <span v-if="!disabledCode">发送验证码</span>
            <span v-else>重新获取({{time}}s）</span>
          </span>
        </li>
      </ul>
      <div style="text-align:center;margin-top:90px">
        <el-button class="btn mr20" @click="handleGoBack">上一步</el-button>
        <el-button type="primary" class="btn" @click="handleSumbitAuth">下一步</el-button>
      </div>
    </div>
</template>

<script>
  import Upload from '@/components/Upload/index'
  export default {
    components: {
      Upload
    },
    props: {
      edit: {
        type: Object,
        default: {}
      }
    },
    data() {
      return {
        disabledCode: false,
        timer: null,
        time: 60,
        legalPhone: '',
        verifyCode: ''
      }
    },
    created() {

    },
    methods: {
      handleSendCode() { // 发送验证码
        if(!this.isPhoneNumber(this.legalPhone)) {
          this.$message.error('请输入正确的手机号')
          return
        }
        if(this.disabledCode) {
          return
        }
        this.disabledCode = true
        this.$http.send(this.$api.code, {
          phone: this.legalPhone,
          type: 3
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
      handleGoBack() {
        this.$emit('handleGoStep', 2, {})
      },
      handleSumbitAuth() {
        this.$emit('handleGoStep', 4, {
          legalPhone: this.legalPhone,
          verifyCode: this.verifyCode
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
.step3 {
   .info_list {
     margin-top: 30px;
     padding-left: 24px;
     li {
       margin-bottom: 10px;
       color: #333333;
       .label {
         display: inline-block;
         width: 110px;
         font-weight: 400;
       }
       .value {
         font-weight: 500;
       }
     }
     .code-btn {
        width:150px;
        height:40px;
        line-height: 40px;
        border-radius:1px;
        margin-left: 14px;
        display: inline-block;
        text-align: center;
        border:1px solid rgba(221,221,221,1);
        font-size: 16px;
        color: #FE6A00;
        cursor: pointer;
     }
   }
}
</style>
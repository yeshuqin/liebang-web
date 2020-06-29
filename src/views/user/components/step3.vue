<template>
   <div class="step3">
      <div class="alert">
        确认企业信息
      </div>
      <ul class="info_list">
        <li>
          <span class="label">企业名称:</span>
          <span class="value">深圳市赢爱购有限公司</span>
        </li>
         <li>
          <span class="label">信用代码:</span>
          <span class="value">FB1176689996611QW</span>
        </li>
         <li>
          <span class="label">姓名:</span>
          <span class="value">琴哥哥</span>
        </li>
         <li>
          <span class="label">身份证号码:</span>
          <span class="value">411321199004203332</span>
        </li>
         <li>
          <span class="label">有效期限:</span>
          <span class="value">2017.11.07-2037.11.07</span>
        </li>
        <li style="margin-top:40px;">
          <span class="label">法人手机:</span>
          <el-input placeholder="请输入手机号" style="width:380px;"></el-input>
        </li>
        <li style="margin-top:20px;">
          <span class="label">验证码：</span>
          <el-input placeholder="请输入手机验证码" style="width:200px;"></el-input>
          <span class="code-btn">发送验证码</span>
        </li>
      </ul>
      <div style="text-align:center;margin-top:90px">
        <el-button class="btn mr20">上一步</el-button>
        <el-button type="primary" class="btn">下一步</el-button>
      </div>
    </div>
</template>

<script>
  import Upload from '@/components/Upload/index'
  export default {
    components: {
      Upload
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
<template>
   <div class="step4">
      <div class="alert">
        认证审核结果
      </div>
      <div class="result">
        <template v-if="pass">
          <img src="../../../assets/img/pass.png" alt="" class="mb10">
            <h2 class="fontImp mb20">恭喜您，您的认证审核通过！</h2>
            <div class="goods-list">
                <h2>新手福利，名额有限，领完即止</h2>
                  <ul class="user-checklist">
                    <el-checkbox-group v-model="checkedBox">
                        <li>
                          <el-checkbox :label="1">网络文化经营许可证</el-checkbox>
                        </li>
                        <li>
                          <el-checkbox :label="2">ICP许可证（互联网信息服务许可证）</el-checkbox>
                        </li>
                        <li>
                          <el-checkbox :label="3">IT公司注册</el-checkbox>
                        </li>
                        <li>
                          <el-checkbox :label="4">企业社保代缴</el-checkbox>
                        </li>
                      </el-checkbox-group>
                  </ul>
            </div>
            <div style="text-align:center;margin-top:38px">
              <el-button type="primary" class="btn">立即领取</el-button>
            </div>
        </template>
        <template v-else>
           <div class="iconfont icon-nopass">&#xe638;</div>
           <h2 class="fontImp mb20">很遗憾，实名认证提交申请失败！</h2>
           <div class="font666">
             <p>失败原因：法人信息错误，请重新上传证件。</p>
             <p>您可以 <span class="fontImp">重新实名</span> 或选择使用企业<span class="fontImp">人工审核</span> 。</p>
           </div>
            <div style="text-align:center;margin-top:38px">
              <el-button type="primary" class="btn">重新实名</el-button>
            </div>
        </template>
      </div>
    </div>
</template>

<script>
  export default {
    components: {
    },
    data() {
      return {
        checkedBox: [],
        pass: true
      }
    },
    methods: {
      goIdentity() {
        this.$router.push({name: 'identity'})
      }
    }
  }
</script>

<style lang="scss" scoped>
.step4 {
  .result {
    display: inline-block;
    position: relative;
    left: 50%;
    transform: translatex(-50%);
    h2 {
      font-size: 16px;
    }
    img {
      display: block;
      margin: 24px auto 0;
    }
    .goods-list {
       h2 {
        margin-bottom: 20px;
        font-size: 14px;
        font-weight: 400;
      }
      .tip {
        color: #999999;
        margin-bottom: 22px;
      }
      .user-checklist {
        li {
          margin-bottom: 16px;
        }
      }
    }
    .icon-nopass {
      font-size: 66px;
      color: #999999;
      text-align: center;
      display: block;
      margin: 64px auto 12px;
    }
  }
}
</style>
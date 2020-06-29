<template>
  <div class="footer-block">
      <div class="top">
        <div class="title">猎邦已帮助 <span class="number">6，157，952</span> 位雇主企业服务难题</div>
        <p>在线提交您的需求，我们将在30分钟内为您提供最专业的服务</p>
        <span class="btn" @click="showCounselDialog = true">免费咨询您的需求</span>
      </div>
      <div class="bottom">
        <ul class="footer-icon">
          <li>
            <img src="../../assets/img/footer-icon1.png" alt="">
            <h3>全行业的企业服务</h3>
            <p class="desc">数千种标准化产品，覆盖150+行业</p>
          </li>
          <li>
            <img src="../../assets/img/footer-icon2.png" alt="">
            <h3>专注企业服务十年</h3>
            <p class="desc">服务500万+用户，服务过程0投诉</p>
          </li>
          <li>
            <img src="../../assets/img/footer-icon3.png" alt="">
            <h3>实名认证安全保密</h3>
            <p class="desc">服务商100%实名，信息绝对保密</p>
          </li>
          <li>
            <img src="../../assets/img/footer-icon4.png" alt="">
            <h3>大平台更快更省</h3>
            <p class="desc">节约采购服务成本，更快办事效率</p>
          </li>
        </ul>
      </div>
      <!-- 咨询弹框 -->
      <el-dialog title="咨询专家" :visible.sync="showCounselDialog" custom-class="counse-dialog">
        <div class="body">
            <el-form :model="counseFrom"  label-width="100px">
              <el-form-item label="咨询内容：">
                <el-input v-model="counseFrom.name" type="textarea" :rows="6"></el-input>
              </el-form-item>
              <el-form-item label="咨询问题：">
                <el-select v-model="counseFrom.name" clearable filterable placeholder="请选择" style="width:100%">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="联系方式：">
                <el-input v-model="counseFrom.phone" placeholder="请输入手机号"></el-input>
              </el-form-item>
            </el-form>
            <el-button type="primary" class="btn">预约咨询</el-button>
        </div>
          <div class="footer">

          </div>
      </el-dialog>
  </div>
</template>

<script>
  export default {
    data() {
      return {
          showCounselDialog: false,
          counseFrom: {
            name: ''
          }
      }
    }
  }
</script>

<style lang="scss" scoped>
.footer-block {
    height: 586px;
    width: 100%;
    background-image: url('../../assets/img/footer-bg1.png');
    background-size: 100% 100%;
    text-align: center;
    color: #fff;
    .top {
      height:260px;
      background:#1a1a1a4f;
    }
    .title {
      padding: 30px 0 20px 0;
      font-size: 18px;
    }
    .number {
      color: #FF6109;
      font-size:48px;
      font-weight: 400;
      padding: 0 20px;
    }
    .btn {
      width:299px;
      height:47px;
      line-height: 47px;
      font-size: 21px;
      background:linear-gradient(180deg,rgba(255,155,20,1) 0%,rgba(255,92,1,1) 100%);
      border-radius:24px;
      cursor: pointer;
      display: inline-block;
      margin-top: 34px;
    }
  }
  .footer-icon {
    overflow: hidden;
    display: inline-block;
    margin: 30px auto;
    li {
      width: 270px;
      height: 270px;
      float: left;
      background: #fff;
      margin-right: 41px;
      img {
        margin: 41px 0 14px 0;
      }
      h3 {
        color: #000000;
        font-size: 16px;
        margin-bottom: 13px;
      }
      .desc {
        color: #525252;
      }
    }
    li:last-child {
      margin-right: 0;
    }
  }
</style>

<style lang="scss">
  .counse-dialog {
    width:691px;
    box-shadow:0px 4px 12px 0px rgba(0,0,0,0.2);
    border-radius:4px;
    .el-dialog__header {
      color: #000;
      font-weight: bold;
      border: 1px solid rgba(0,0,0,0.09);
    }
    .el-dialog__body {
      padding: 0;
    }
    .body {
      padding: 22px 120px 38px 80px;
    }
    .btn {
      width: 100%;
      height: 44px;
      line-height: 44px;
    }
    .footer {
      height: 75px;
      width: 100%;
      background-image: url('../../assets/img/question-bg.png');
      background-size: 100% 100%;
    }
  }
</style>
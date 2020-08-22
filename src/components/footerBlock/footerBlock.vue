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
      <quest-dialog :showCounselDialog.sync="showCounselDialog"></quest-dialog>
  </div>
</template>

<script>
  import questDialog from '@/components/questDialog/index'
  export default {
    components: {
      questDialog
    },
    data() {
      return {
         showCounselDialog: false,
         name: ''
      }
    },
    methods: {
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
    z-index: 1000;
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
      width: 225px;
      height: 225px;
      float: left;
      background: #fff;
      margin-right: 41px;
      img {
        margin: 21px 0 14px 0;
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

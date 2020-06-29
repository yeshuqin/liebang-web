<template>
  <div class="index">
    <Topbar></Topbar>
    <hero></hero>
    <div class="jinpai-list">
       <el-row type="flex" justify="space-between">
          <el-col :span="8"></el-col>
          <el-col :span="8"></el-col>
          <el-col :span="8"></el-col>
      </el-row>
    </div>
    <div class="main">
      <div class="card-list" v-for="(item, index) in 3" :key="index">
        <div class="title">工商服务</div>
        <div class="title-desc">
          <span>公司注册</span>
          <span>公司注册</span>
          <span>公司注册</span>
          <span>公司注册</span>
        </div>
        <div class="card-list-main">
          <div class="card-list-main-l"></div>
          <div class="card-list-main-r">
            <div class="card-list-item" v-for="(item, index) in 6" :key="index">
              <div>
                <span class="card-tag">极速申报</span>
                <span class="card-tag">极速申报</span>
              </div>
              <h3>商标注册申请</h3>
              <div class="card-desc">
                <p>便捷简易，简单高效</p>
                <p>递交迅速，反馈及时</p>
                <p>全流程掌控，随时查看进度</p>
              </div>
              <div class="money-wrap"><span class="money">¥300</span>起</div>
            </div>
          </div>
        </div>
      </div>
       <div class="card-list">
        <div class="title">热点资讯</div>
        <div class="title-desc">
          <span>公司注册</span>
          <span>公司注册</span>
          <span>公司注册</span>
          <span>公司注册</span>
        </div>
        <ul class="new-wrap">
          <li v-for="(item, index) in 4" :key="index">
            <img src="../../assets/logo.png" alt="">
            <div class="new-item">
              <h3>云栖号头条：浙江省和阿里等开发“企业码”平台11111</h3>
              <p>传感器好比人的眼耳口鼻，但又不仅仅只是人的感官那 么简单，它甚至能够采集到更多的有用信息。</p>
              <div class="time">2020-04-23</div>
            </div>
          </li>
        </ul>
      </div>
      <div class="card-list">
        <div class="title">最新案例</div>
        <div class="title-desc">
          <span>公司注册</span>
          <span>公司注册</span>
          <span>公司注册</span>
          <span>公司注册</span>
        </div>
        <ul class="case-wrap">
          <li v-for="(item, index) in 4" :key="index">
            <img src="../../assets/case-img.png" alt="">
          </li>
        </ul>
      </div>
    </div>
    <footer-block></footer-block>
    <Bottombar></Bottombar>
  </div>
</template>

<script>
  import Topbar from '../base/Topbar/index'
  import Bottombar from '../base/Bottombar/index'
  import footerBlock from '@/components/footerBlock/footerBlock'
  import hero from './hero'
  export default {
    components: {
      Topbar,
      Bottombar,
      hero,
      footerBlock
    },
    data () {
      return {
       
      }
    }
  }
</script>

<style lang="scss" scoped>
.index {
  background: #F3F6F9;
  .main {
    width: 1200px;
    margin: 20px auto;
  }
  .card-list {
    margin: 50px auto;
    .title {
      color: #000000;
      font-size: 28px;
      font-weight:400;
      text-align: center;
    }
    .title-desc {
      color: #7A7A7A;
      font-size: 14px;
      text-align: center;
      margin-bottom: 16px;
      span {
        display: inline-block;
      }
      span:not(:last-child):after {
        content: '';
        display: inline-block;
        width: 1px;
        height: 16px;
        background: #7A7A7A;
        margin: -3px 4px;
      }
    }
    .card-list-main {
      display: flex;
      height: 404px;
      width: 100%;
      .card-list-main-l {
        width: 300px;
        background: blue;
        background-image: url('../../assets/card-bg.png');
        background-size: cover;
      }
      .card-list-main-r {
        flex: 1;
        margin-left: 10px;
        .card-list-item {
          width:294px;
          height:200px;
          background: #fff;
          float: left;
          margin-right: 4px;
          margin-bottom: 4px;
          color: #000000;
          padding: 18px 0 0 22px;
          box-sizing: border-box;
          .card-tag {
            padding: 0 6px;
            display: inline-block;
            color: #D8D8D8;
            height:20px;
            border-radius:4px;
            border:1px solid rgba(216,216,216,1);
            margin-right: 10px;
          }
          h3 {
            font-size: 16px;
            margin: 16px 0 6px 0;
            font-weight: 500;
          }
          .card-desc {
            margin-bottom: 18px;
            p {
              font-size: 13px;
              color: #9A9A9A;
              font-weight: 400;
              line-height:18px
            }
          }
           .money {
              color: #FE6A00;
              font-size: 21px;
              padding-right: 5px;
            }
          
        }
        .card-list-item:nth-child(3n) {
          margin-right: 0;
        }
      }
    }
  }
  .case-wrap {
    overflow: hidden;
    li {
      width: calc(50% - 2px);
      float: left;
      height: 197px;
      background: #fff;
      margin-right: 4px;
      margin-bottom: 4px;
      img {
        width: 100%;
        background-size: 100% 100%;
      }
    }
    li:nth-of-type(2n) {
      margin-right: 0;
    }
    li:hover {
      box-shadow:2px 2px 8px 2px rgba(230,230,230,0.92);
    }
  }
  .new-wrap {
    overflow: hidden;
    li {
      width: calc(50% - 15px);
      float: left;
      height: 130px;
      background: #fff;
      display: flex;
      margin: 0 30px 30px 0;
      img {
        width: 220px;
        height: 100%;
      }
      .new-item {
        flex: 1;
        padding-left: 19px;
        width: calc(100% - 220px);
        h3 {
          padding-top: 12px;
          font-size: 16px;
          color: #000000;
          width: 100%;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
        }
        p {
          margin-bottom: 28px;
          line-height: 20px;
        }
        .time {
          color: #999999;
        }
      }
    }
    li:nth-of-type(2n) {
      margin-right: 0;
    }
    li:hover {
      box-shadow:2px 2px 8px 2px rgba(230,230,230,0.92);
    }
  }
  .jinpai-list {
    width: 1200px;
    margin: 22px auto 0 !important;
    .el-col {
      height: 189px;
      background: #fff;
      margin-right: 10px;
    }
    .el-col:last-child {
      margin-right: 0;
    }
  }
}
</style>
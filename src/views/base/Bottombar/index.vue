<template>
  <div class="bottom_bar">
      <el-row class="bottom_main" type="flex" justify="center">
        <el-col :span="4">
            <div class="title"><a href="javascript:void(0)">帮助中心</a></div>
            <ul class="link_wrap">
              <li><a href="javascript:void(0)">入驻指南</a></li>
              <li><a href="javascript:void(0)">下单指南</a></li>
              <li><a href="javascript:void(0)">入驻协议</a></li>
            </ul>
        </el-col>
        <el-col :span="4">
            <div class="title"><a href="javascript:void(0)">支付/配送方式</a></div>
            <ul class="link_wrap">
              <li><a href="javascript:void(0)">支付方式</a></li>
              <li><a href="javascript:void(0)">配送方式</a></li>
              <li><a href="javascript:void(0)">关于送货和验货</a></li>
            </ul>
        </el-col>
        <el-col :span="4">
            <div class="title"><a href="javascript:void(0)">服务条款</a></div>
            <ul class="link_wrap">
              <li><a href="javascript:void(0)">网站使用条款</a></li>
              <li><a href="javascript:void(0)">扣款服务协议</a></li>
              <li><router-link target="_blank" :to="{path:'/private'}">隐私保护政策</router-link></li>
            </ul>
        </el-col>
        <el-col :span="4">
            <div class="title"><a href="javascript:void(0)">关于我们</a></div>
            <ul class="link_wrap">
              <li><a href="javascript:void(0)">关于我们</a></li>
              <li><a href="javascript:void(0)">联系客服</a></li>
              <li><a href="javascript:void(0)">招商中心</a></li>
            </ul>
        </el-col>
         <el-col :span="4">
            <div class="title"><a href="javascript:void(0)">客服服务</a></div>
            <span class="phone">
              <span class="iconfont" style="font-size:18px;">&#xe8c3;</span>
              点击咨询客服</span>
            <p class="work-time">工作时间：周一至周日09:00-18:00</p>
        </el-col>
        <el-col :span="4" style="text-align:center">
            <div class="title"><a href="javascript:void(0)">关注我们</a></div>
            <div class="code"></div>
            <p class="code_tip">扫码关注享更多优惠</p>
        </el-col>
      </el-row>
      <div class="tip">
        关于我们 | 联系我们 | 联系客服 | 合作招商 | 营销中心 | 手机APP | 友情链接 | 销售联盟 | 隐私政策 | English | Contact Us
      </div>
      <p class="tip">www.LieBangwang.org © 2019 Copyright all Shanghai ICP No. 12345678</p>
  </div>
</template>

<script>
  export default {
    
  }
</script>

<style lang="scss" scoped>
.bottom_bar {
  width: 100%;
  height: 346px;
  background:rgba(234,238,241,1);
  padding-top: 83px;
  box-sizing: border-box;
  text-align: left;
  .bottom_main {
    width: 1200px;
    margin: 0 auto;
    border-bottom: 1px solid #ccc;
  }
  .title {
    font-size: 18px;
    font-weight: 400;
    color: #000000;
    margin-bottom: 14px;
  a {
      font-size: 18px;
      color: #000000;
    }
  }
  .link_wrap {
    li {
      margin-bottom: 10px;
      a {
        font-size: 14px;
        color: #333333;
      }
    }
  }
  .code {
    width: 90px;
    height: 90px;
    margin: 0 auto;
    background: url('../../../assets/img/code.jpeg');
    background-size: 100% 100%;
  }
  .code_tip {
    margin: 12px 0;
  }
  .tip {
    margin: 13px 0;
    font-size: 12px;
    color: #555555;
    text-align:center;
  }
  .phone {
    width:141px;
    height:32px;
    line-height: 32px;
    font-size: 16px;
    color: #333333;
    border-radius:8px;
    display: inline-block;
    background: #ffffff;
    text-align:center;
  }
  .work-time {
    width: 135px;
    margin-top: 10px;
  }
}
</style>
<template>
  <div class="menu-left">
      <div class="menu-left-item">
        <div class="menu-left-item-title">
          <span class="iconfont">&#xe651;</span>
          个人中心
        </div>
        <ul class="menu-left-item-list">
          <li :class="{active: currenPath === '/user'}">
            <router-link :to="{name: 'user'}">基本信息</router-link>
          </li>
          <li :class="{active: currenPath === '/accountCenter'}">
            <router-link :to="{name: 'accountCenter'}">账户中心</router-link>
          </li>
          <li :class="{active: currenPath === '/identity'}">
            <router-link :to="{name: 'identity'}">身份认证</router-link>
          </li>
        </ul>
      </div>
      <div class="menu-left-item">
        <div class="menu-left-item-title">
          <span class="iconfont">&#xe7e8;</span>
          交易中心
        </div>
        <ul class="menu-left-item-list">
          <li>我的订单</li>
          <li :class="{active: currenPath === '/schedule'}">
            <router-link :to="{name: 'schedule'}">进度查询</router-link>
          </li>
        </ul>
      </div>
      <div class="menu-left-item">
        <div class="menu-left-item-title">
          <span class="iconfont">&#xe691;</span>
          消息中心
        </div>
        <ul class="menu-left-item-list">
          <li>消息通知</li>
          <li>我的活动</li>
          <li>我的足迹</li>
          <li>我的优惠</li>
        </ul>
      </div>
    </div>
</template>

<script>
  export default {
     props: {
       active: {
         type: String,
         default: ''
       }
     },
     computed: {
       currenPath:function() {
         return this.$route.path
       }
     },
     created() {

     },
     methods: {}
  }
</script>

<style lang="scss" scoped>
.menu-left {
  width:154px;
  padding: 16px 0;
  background: #ffffff;
  // text-align: center;
  margin-right: 20px;
  min-height: 400px;
  .menu-left-item {
    margin-bottom: 14px;
    padding-left: 28px;
    .menu-left-item-title {
      font-size:16px;
      font-weight: 400;
      margin-bottom: 8px;
    }
    .menu-left-item-list li{
      font-size:14px;
      margin-bottom: 8px;
      padding-left: 20px;
      a {
        color: #666666;
      }
      &.active a{
        color: #FE6A00;
      }
    }
  }
}
</style>
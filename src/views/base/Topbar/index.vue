<template>
  <div class="topbar">
    <div class="topbar_banner">
    </div>
    <el-row class="topbar_desc">
      <el-col :span="12" class="l">
        <div>深圳站</div>
      </el-col>
      <el-col :span="12" class="r">
        <span>欢迎登录</span>
        <span>个人中心</span>
        <span>客服服务</span>
        <span>网站导航</span>
      </el-col>
    </el-row>
    <div class="topbar_search">
      <div class="logo"></div>
      <div class="search_wrapper">
        <el-input v-model="input" placeholder="请输入内容">
           <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
        <div class="hot-tag">
          <span>热门搜索:</span>
          <span>工商服务</span>
          <span>工商服务</span>
          <span>工商服务</span>
          <span>工商服务</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    
  }
</script>

<style lang="scss" scoped>
.topbar {
  background: #fff;
  .topbar_banner {
    height: 80px;
    background: #FE6A00;
  }
  .topbar_desc {
    width: 1200px;
    margin: 0 auto;
    height: 50px;
    line-height: 50px;
    color: #4A4A4A;
    font-size: 12px;
    .r {
      text-align: right;
      span {
        cursor: pointer;
        margin-right: 30px;
      }
      span:last-child {
        margin: 0;
      }
    }
  }
  .topbar_search {
    width: 1200px;
    margin: 0 auto;
    padding: 14px 0;
    .logo {
      display: inline-block;
      width: 120px;
      height: 22.5px;
      background: #FE6A00;
      margin-right: 40px;
      position: relative;
      top: -32px;
    }
    .search_wrapper {
      display: inline-block;
    }
     /deep/ .el-input__inner {
      width:450px;
      height:38px;
      background:rgba(255,255,255,1);
      border-radius:1px;
      border:1px solid rgba(204,204,204,1);
     }
     /deep/ .el-input-group__append {
      height:38px;
      background:#FE6A00;
      border-radius:1px;
      border: none;
      .el-button {
        width:80px;
      }
      .el-icon-search {
        font-size: 20px;
        color: #fff;
      }
     }
     .hot-tag {
       color: #CCCCCC;
       font-size: 12px;
       padding: 12px 0;
       span {
         margin-right: 10px;
       }
     }
  }
}
</style>
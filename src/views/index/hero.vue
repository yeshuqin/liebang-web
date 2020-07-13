<template>
  <div class="hero-container">
     <!-- 商品类别 -->
     <div class="category-wrap">
       <div class="button">精选爆款</div>
        <ul class="category-list">
          <li class="category-item" v-for="(item, index) in 6" :key="index">
            <h3>工商服务 <i class="el-icon-arrow-right"></i></h3>
            <p class="category-type">
              <span>公司注册</span>
              <span>公司注册</span>
              <span>公司注册</span>
            </p>
          </li>
        </ul>
        <div> 
          <h3 class="more clearfix" @click="showCategory = !showCategory">
            <span class="fl">查看更多</span> 
            <i class="el-icon-arrow-right fr" style="margin-top: 2px"></i>
          </h3>
        </div>
        <transition name="el-fade-in">
           <div class="category-index" v-show="showCategory">
              <h3>全部服务</h3>
              <ul class="goods-list">
                <li v-for="(item, index) in 30" :key="index">公司注册</li>
              </ul>
            </div>
        </transition>
     </div>
    <!-- 轮播图 -->
    <div class="banner-wrap">
      <el-carousel trigger="click" height="403px">
        <el-carousel-item v-for="item in 4" :key="item">
          <img src="https://file2.pingxiaobao.com/dev/2006/08/3a06b514288efd2804606c2a6caa9cfb.jpg" alt="" style="width:100%;height:100%">
        </el-carousel-item>
      </el-carousel>
      <el-row class="ad-list">
        <el-col :span="4" class="ad-item" v-for="(item, index) in 5" :key="index">
          <img src="https://file2.pingxiaobao.com/dev/2006/08/3a06b514288efd2804606c2a6caa9cfb.jpg" alt="">
          <p>品牌设计</p>
          <span>LOGO/宣传品/VI</span>
        </el-col>
        <el-col :span="4" class="more">
          <span class="el-icon-arrow-right"></span>
          <div>更多</div>
        </el-col>
      </el-row>
    </div>
    <div class="info-wrap">
      <div class="user">
         <el-row>
          <el-col :span="10">
            <img :src="info.picture" alt="">
          </el-col>
         <el-col :span="14">
            <div style="margin-top:26px" class="bold" v-if="!isLogin">Hi，欢迎来到猎邦</div>
            <div class="mt10" v-else> 
              <span>Hi，{{info.name}}</span> <br>
              <span class="font666">欢迎来到猎邦</span>
            </div>
          </el-col>
        </el-row>
        <div class="button-wrap" v-if="!isLogin">
           <el-button type="primary" class="btn" @click="goLogin">登 录</el-button>
           <el-button class="btn" @click="goLogin('register')">注 册</el-button>    
        </div>
        <el-row class="hero-menu" v-else>
          <el-col :span="12">
            <div @click="goPage('order')">
                <span class="iconfont">&#xe652;</span>
                <div>我的订单</div>
            </div>
          </el-col>
         <el-col :span="12">
            <div @click="goPage('schedule')">
              <span class="iconfont">&#xe625;</span>
              <div>进度查询</div>
            </div>
          </el-col>
        </el-row>
      </div>
      <ul class="info-list">
        <div class="title clearfix">
          <span class="fl">最新咨询</span>
          <span class="el-icon-arrow-right fr"></span>
        </div>
        <li v-for="(item, index) in 20" :key="index">[产品]怎么去设计厉害的名片才能lalala</li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        showCategory: false,
        isLogin: localStorage.getItem('token') || '',
        info:  {
          name: '琴哥哥',
          picture: 'https://file2.pingxiaobao.com/dev/2006/08/3a06b514288efd2804606c2a6caa9cfb.jpg'
        }
      }
    },
    methods: {
      goPage(pageName) {
        if(this.isLogin) {
          this.$router.push({name: pageName})
          return
        }
        this.$confirm('你还未登录，是否跳转到登录页?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$router.push({name: 'login'})
        }).catch(() => {

        });
      },
      goLogin(tag) {
        this.$router.push({name: 'login', query: {tag: tag}})
      }
    }
  }
</script>

<style lang="scss" scoped>
.hero-container {
   display: flex;
   height: 513px;
   width: 1200px;
   margin: 10px auto 19px;
   .category-wrap {
     width: 220px;
     height: 100%;
     background: #fff;
     position: relative;
     .button {
       height: 42px;
       line-height: 42px;
       background-color: #FE6A00;
       left: 42px;
       font-size: 18px;
       font-weight: bold;
       color: #fff;
       text-align: center;
     }
     .category-list {
       padding: 0 12px;
       .category-item {
         height: 67px;
         border-bottom: 1px solid #D8D8D8;
         overflow: hidden;
         h3 {
           padding-top: 12px;
         }
         .category-type {
           color: #999999;
           width: 100%;
           white-space: nowrap;
           text-overflow: ellipsis;
           overflow: hidden;
           span {
             padding-right: 6px;
           }
         }
       }
     }
     .more {
       margin-top: 23px;
       padding: 0 12px;
       cursor: pointer;
     }
   }
  .category-index {
    position: absolute;
    width:708px;
    height:403px;
    background: #ffffff;
    box-shadow:2px 2px 8px 2px rgba(230,230,230,0.92);
    border-radius:1px;
    left: 220px;
    z-index: 100;
    top: 0;
    h3 {
     height: 51px;
     line-height: 51px;
     border-bottom: 1px solid #EDEDED;
     padding-left: 27px;
     margin-bottom: 12px;
    }
    .goods-list {
      overflow: hidden;
      padding-left: 27px;
      li {
        float: left;
        width: 25%;
        color: #999999;
        cursor: pointer;
        margin-bottom: 12px;
      }
    }
   }
  .banner-wrap {
    flex: 1;
    margin: 0 10px;
    .ad-list {
      height: 102px;
      background: #fff;
      margin-top: 8px;
    }
    .ad-item {
      text-align: center;
      img {
        width: 52px;
        height: 52px;
        border-radius: 50%;
        margin-top: 8px;
      }
      span {
        color: #444444;
        font-size: 12px;
       }
    }
    .more {
      color: #666666;
      padding-top: 23px;
      text-align: center;
      .el-icon-arrow-right {
        color: #FF6B29;
        font-size: 20px;
        margin-bottom: 10px;
      }
    }
  }
  .info-wrap {
    width: 262px;
    .user {
      text-align: center;
      padding: 12px 35px;
      background: #fff;
      margin-bottom: 6px;
      img {
        width: 62px;
        height: 62px;
        border-radius: 50%;
        margin-right: 14px;
      }
      .button-wrap {
        padding: 31px 0 19px;
        .btn {
          width: 90px;
          height: 34px;
          line-height: 34px;
          padding: 0;
        }
      }
    }
    .info-list {
      background: #fff;
      height: 349px;
      overflow-y: auto;
      padding: 0 8px;;
      .title {
        padding: 6px 0;
        border-bottom: 1px solid #E8E8E8;
      }
      li {
        line-height: 20px;
        color: #808080;
        margin: 6px 0;
        width: 100%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        cursor: pointer;
      }
    }
  }
  .hero-menu {
    margin-top: 20px;
    color: #666666;
    cursor: pointer;
    .iconfont {
      font-size: 20px;
      color: #FF6B29;
      margin-bottom: 7px;
      display: block;
    }
  }
}
</style>
<template>
  <div class="hero-container">
     <!-- 商品类别 -->
     <div class="category-wrap">
       <div class="button">精选爆款</div>
        <ul class="category-list">
          <li class="category-item" v-for="(item, index) in cateSpuList" :key="index">
            <h3 @click="showCategory = !showCategory">{{item.cate.name}} <i class="el-icon-arrow-right"></i></h3>
            <p class="category-type">
              <span v-for="spu in item.spuList" :key="spu.id" @click="handleGoGoodsDetail(spu)">{{spu.name}}</span>
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
              <span class="el-icon-error close" @click="showCategory = false"></span>
              <div class="category-index-list">
                <div v-for="(item, index) in allCateSpuList" :key="index">
                 <h3>
                  {{item.cate.name}}
                </h3>
                <ul class="goods-list">
                  <li v-for="spu in item.spuList" :key="spu.id" @click="handleGoGoodsDetail(spu)">{{spu.name}}</li>
                </ul>
              </div>
              </div>
           </div>
        </transition>
     </div>
    <!-- 轮播图 -->
    <div class="banner-wrap">
      <el-carousel trigger="click" height="403px">
        <el-carousel-item v-for="item in bannerList" :key="item.id">
           <a :href="item.linkUrl" target="_blank">
            <img :src="item.picUrl" alt="" style="width:100%;height:100%">
          </a>
        </el-carousel-item>
      </el-carousel>
      <el-row class="ad-list" type="flex" justify="space-between">
        <el-col :span="4" class="ad-item cursor" v-for="(item, index) in spuList" :key="index" @click.native="handleGoGoodsDetail(item)">
          <img :src="item.primaryPic" alt="">
          <p>{{item.name}}</p>
          <!-- <span>LOGO/宣传品/VI</span> -->
        </el-col>
        <!-- <el-col :span="4" class="more">
          <span class="el-icon-arrow-right"></span>
          <div>更多</div>
        </el-col> -->
      </el-row>
    </div>
    <div class="info-wrap">
      <div class="user">
         <el-row>
          <el-col :span="10">
            <img src="../../assets/img/user.jpg" alt="">
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
           <el-button type="primary" class="btn" @click="goLogin('account')">登 录</el-button>
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
            <div @click="goPage('user')">
              <span class="iconfont">&#xe625;</span>
              <div>个人中心</div>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="info-list">
        <div class="title clearfix">
          <span class="fl">最新咨询</span>
          <span class="el-icon-arrow-right fr"></span>
        </div>
        <ul>
          <li v-for="(item, index) in 20" :key="index">
            <span style="margin-rigth:5px">[产品]</span>
            怎么去设计厉害的名片才能厉害的名片才厉害的名片才厉害的名片才
          </li>
        </ul>
      </div>
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
          name: localStorage.getItem('name') || localStorage.getItem('phone'),
          picture: ''
        },
        bannerList: [], //轮播图列表
        cateSpuList: [], //报考推荐类别商品
        allCateSpuList: [], //全部类别商品
        spuList: [] //首页橱窗商品推荐
      }
    },
    created() {
      this.getCateSpuList()
      this.getAllCateSpuList()
      this.getSpuList()
      this.getBannerList()
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
      },
      getCateSpuList() {
        this.$http.send(this.$api.spuCateSpu, {
           cateNum: 6,
           spuNum: 3
         }).then(res => {
           this.cateSpuList = res.data
        })
      },
      getAllCateSpuList() {
        this.$http.send(this.$api.spuCateSpu, {
           cateNum: 10,
           spuNum: 10
         }).then(res => {
           this.allCateSpuList = res.data
        })
      },
      getSpuList() {
        this.$http.send(this.$api.spuPage, {
           showcaseId: '1284165023534460930',
           current: 1,
           size: 6
         }).then(res => {
           this.spuList = res.data.records
        })
      },
      getBannerList() {
        this.$http.send(this.$api.bannerList, {
           code: 'banner',
           number: 4
         }).then(res =>{
           this.bannerList = res.data
        })
      },
      handleGoGoodsDetail(obj) {
        this.$router.push({name: 'goodsDetail', query: {id: obj.id}})
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
           font-weight:bold;
           margin-bottom: 5px;
           cursor: pointer;
         }
         .category-type {
           color: #999999;
           width: 100%;
           white-space: nowrap;
           text-overflow: ellipsis;
           overflow: hidden;
           span {
             padding-right: 6px;
             cursor: pointer;
           }
         }
       }
     }
     .more {
       margin-top: 23px;
       padding: 0 12px;
       cursor: pointer;
       position:absolute;
       width: 100%;
       left: 0;
       font-weight:bold;
       bottom: 26px;
     }
   }
  .category-index {
    position: absolute;
    width:708px;
    height:403px;
    background: #ffffff;
    padding-top: 30px;
    box-sizing: border-box;
    box-shadow:2px 2px 8px 2px rgba(230,230,230,0.92);
    border-radius:1px;
    left: 220px;
    z-index: 100;
    top: 0;
    .category-index-list {
      height: 373px;
      overflow-y: auto;
    }
    .close {
       position: absolute;
       right: 20px;
       color: #999999;
       cursor: pointer;
       top: 10px;
       font-size: 18px;
    }
    h3 {
     height: 51px;
     line-height: 51px;
     border-bottom: 1px solid #EDEDED;
     padding-left: 27px;
     margin-bottom: 12px;
     position: relative;
     font-weight: 600;
    }
    .goods-list {
      overflow: hidden;
      padding-left: 27px;
      li {
        float: left;
        width: 20%;
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
      padding: 0 20px;
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
        margin-bottom: 8px;
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
      padding: 12px 25px;
      background: #fff;
      height: 158px;
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
      height: calc(100% - 164px);
      padding: 0 8px;
      .title {
        height: 40px;
        font-size: 16px;
        line-height: 40px;
        border-bottom: 1px solid #E8E8E8;
        .el-icon-arrow-right {
          line-height: 40px;
        }
      }
      ul {
        height: calc(100% - 40px);
        overflow-y: auto;
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
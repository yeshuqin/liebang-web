<template>
   <div class="ad-list content-wrap">
     {{list.length}}
     <div class="hot-ad">
        <div :class="swpName +' swiperBox '+ className">
          <div class="swiper-wrapper hot-ad-list">
              <div class="swiper-slide" v-for="(item, index) in list" :key="'swiperSlide'+index">
                 <li class="hot-ad-list-item" @click="handleGoGoodsDetail(item)">
                  <img :src="item.primaryPic" alt="">
                    <h2 class="name">{{item.name}}</h2>
                    <p class="desc">{{item.tags}}</p>
                    <p class="money">¥{{item.minPrice | filterMoney}}</p>
                  </li>
                </div>
            </div>
            <!-- <div :class="swpName + 'prev swiper-button-prev swiper-button-'+ prevNextColor" slot="button-prev"></div>
            <div :class="swpName + 'next swiper-button-next swiper-button-'+ prevNextColor" slot="button-next"></div> -->
             <div :class="className + 'prev swiper-button-prev'"  class="swiper-button-prev">
                <span class="iconfont">&#xe640;</span>
              </div>
              <div :class="className + 'next swiper-button-next'" class="swiper-button-next">
                <span class="iconfont">&#xe63e;</span>
              </div>
            <!-- <div v-if="isPagination == true" :class="'swiper-pagination'"></div> -->
        </div>
     </div>
  </div>
</template>

<script>
  export default {  
    props: {
        //轮播图列表数据
        list: {
            type: Array,
            default: function(){
                return []
            }
        },
        //样式名称
        className: {
            type: String,
            default: ''
        },
        prevNextColor: {
            type: String,
            default: ''
        },
        //是否显示圆点
        isPagination: {
            type: Boolean,
            default: false
        },
        //是否显示左右箭头
        isPrevNext: {
            type: Boolean,
            default: true
        },
        //自动播放延迟多少毫秒
        delay: {
            type: String,
            default: '3000'
        },
        //是否循环切换
        loop: {
            type: Boolean,
            default: false
        },
        //是否自动播放
        autoPlay: {
            type: Boolean,
            default: false
        },
        // 一屏显示几个
        slidesPerView:{
            type:Number,
            default:5
        },
        //每个轮播间的间隔距离
        spaceBetween:{
            type:Number,
            default:7
        },
        //导航点样式
        paginationType:{
            type:String,
            default:''
        }
    },
    data(){
        return{
            swpName: this.roundString(),
            MySwiper:null,//swiper实例
        }
    },
    mounted(){
        var self=this;
        this.$nextTick(()=> {
          self.MySwiper = new Swiper ('.'+ self.swpName,{
              // init: true,
              observer:true,
              observeParents:true,
              slidesPerView: 5,
              slidesPerGroup: 5,
              spaceBetween: 7,
              // keyboard: {
              //     enabled: true,
              // },
              loop: self.loop,
              autoplay:self.autoPlay? {delay: self.delay,disableOnInteraction: false}:false,
              navigation: {
                  nextEl: '.'+self.className + 'prev',
                  prevEl: '.'+self.className + 'next'
              }
          });
        })
    },
    methods: {
        roundString() {
            let str = "";
            let chars = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
            chars.forEach(() => {
                str += chars[Math.ceil(Math.random()*25)]
            });
            return str
        },
        handleGoGoodsDetail() {

        }
    }
}
</script>

<style lang="scss" scoped>
.hot-ad {
  overflow: hidden;
  position: relative;
   h2 {
     font-size: 28px;
   }
  .hot-top {
    margin-bottom: 20px;
    text-align: center;
  }
  .swiper-wrapper {
    // width: 1024px;
    // overflow: hidden;
    position: relative;
  }
  .hot-ad-list {
    .hot-ad-list-item {
      height: 300px;
      // width: 234px;
      background: #ffffff;
      text-align: center;
      // overflow: hidden;
      cursor: pointer;
      img {
        width: 160px;
        height: 160px;
        display: block;
        margin: 24px auto 35px;
      }
      .name {
        font-size: 16px;
        margin-bottom: 6px;
      }
      .desc {
        font-size: 12px;
        color: #969696;
        margin-bottom: 6px;
      }
      .money {
        color: #FE6A00;
      }
    }
  }
}
.swiper-container {
    width: 1024px;
    //  background: pink;
    height: 300px;
    .swiper-slide {
      background: #fff;
    }
}  
</style>
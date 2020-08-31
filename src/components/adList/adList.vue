<template>
   <div class="ad-list">
     <div class="hot-ad">
      <div class="hot-top">
       <slot></slot>
      </div>
      <div class="swiper-father">
         <div class="swiper-container swiper-no-swiping" :class="className">
            <div class="swiper-wrapper hot-ad-list">
              <div class="swiper-slide" v-for="(item) in dataList" :key="item.id" @click.stop="handleGoGoodsDetail(item)">
                <li class="hot-ad-list-item">
                  <img :src="item.primaryPic" alt="">
                    <h2 class="name">{{item.name}}</h2>
                    <p class="desc">{{item.tags}}</p>
                    <p class="money">¥{{item.minPrice | filterMoney}}</p>
                </li>
              </div>
            </div>
          </div>
        <div :class="className + 'prev'"  class="swiper-button-prev">
          <span class="iconfont">&#xe640;</span>
        </div>
        <div :class="className + 'next'" class="swiper-button-next">
          <span class="iconfont">&#xe63e;</span>
        </div>
      </div>
    </div>
   </div>
</template>

<script>
  export default {
    props: {
      list: {
        type: Array,
        default() {
          return []
        }
      },
      className: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        dataList: [],
        options: {
          slidesPerView: 5,
          spaceBetween: 7,
          slidesPerGroup: 5,
          loop: true,
          observer:true,
          observeParents:true,
          loopFillGroupWithBlank: true
        },
        MySwiper:null,//swiper实例
      }
    },
    watch: {
      list(val) {
          this.dataList = this.list || []
          var self = this;
          this.$nextTick(() => {
            self.MySwiper = new Swiper ('.'+ this.className,{
                initialSlide: 0,
                slidesPerView: 5,
                spaceBetween: 7,
                slidesPerGroup: 5,
                autoplay: false,
                loop: true,
                observer:true,
                observeParents:false,
                loopFillGroupWithBlank: true,
                navigation: {
                  nextEl: '.'+self.className + 'next',
                  prevEl: '.'+self.className + 'prev'
                }
            });
          })
      }
    },
    mounted() {
    
    },
    methods: {
      handleGoGoodsDetail(obj) {
        this.$router.push({name: 'goodsDetail', query: {id: obj.id}})
      },
      initSwiper() {
         
      }
    }
  }
</script>

<style lang="scss" scoped>
.hot-ad {
   h2 {
     font-size: 28px;
   }
  .hot-top {
     margin-bottom: 20px;
    text-align: center;
  }
  .hot-ad-list {
    .hot-ad-list-item {
      height: 300px;
      // width: 234px;
      background: #fff;
      text-align: center;
      overflow: hidden;
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
.swiper-father {
  position: relative;
  width: 1270px;
  margin-left: -35px;
  .swiper-button-prev {
    left: 0;
  }
}
.swiper-button-next,.swiper-button-prev,.swiper-button-white{
	outline: none!important;
}
.swiper-container {
    width: 1200px;
    height: 300px;
    .swiper-slide {
      background: #fff;
    }
}  
</style>
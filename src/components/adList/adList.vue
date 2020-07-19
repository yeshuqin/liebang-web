<template>
   <div class="ad-list">
     <div class="hot-ad content-wrap">
      <div class="hot-top">
       <slot></slot>
      </div>
      <div class="swiper-container">
          <div class="swiper-wrapper hot-ad-list">
            <div class="swiper-slide" v-for="(item,index) in dataList" :key="index">
              <li class="hot-ad-list-item" @click="handleGoGoodsDetail(item)">
                 <img :src="item.primaryPic" alt="">
                  <h2 class="name">{{item.name}}</h2>
                  <p class="desc">{{item.tags}}</p>
                  <p class="money">¥{{item.minPrice}}</p>
              </li>
            </div>
          </div>
          <div class="swiper-button-prev">
            <span class="iconfont">&#xe640;</span>
          </div>
          <div class="swiper-button-next">
            <span class="iconfont">&#xe63e;</span>
          </div>
        </div>
      </div>
   </div>
</template>

<script>
  export default {
    props: {
      dataList: {
        type: Array,
        default() {
          return []
        }
      }
    },
    data() {
      return {

      }
    },
    mounted() {
      this.$nextTick(() => {
        this.initSwiper()
      })
    },
    computed: {
    },
    methods: {
      handleGoGoodsDetail(obj) {
        this.$router.push({name: 'goodsDetail', query: {id: obj.id}})
      },
      initSwiper() {
         var mySwiper = new Swiper ('.swiper-container', {
            loop: true, // 循环模式选项
            slidesPerView: 5,
            spaceBetween: 7,
            slidesPerGroup: 5,
            loop: true,
            loopFillGroupWithBlank: true,
            observer:true,
            // observeParents:false,
            navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            }
        })      
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
      width: 234px;
      background: #ffffff;
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
.swiper-container {
    width: 1200px;
    //  background: pink;
    height: 300px;
    .swiper-slide {
      background: #fff;
    }
}  
</style>
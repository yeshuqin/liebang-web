<template>
   <div class="ad-list">
     <div class="hot-ad content-wrap">
      <div class="hot-top">
       <slot></slot>
      </div>
      <div class="swiper-container" :class="swiperName">
          <div class="swiper-wrapper hot-ad-list">
            <div class="swiper-slide" v-for="(item) in dataList" :key="item.id">
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
      },
      swiperName: {
        type: String,
        default: ''
      }
    },
    data() {
      return {

      }
    },
    watch: {
      swiperName(val) {
        if(val) {
          console.log(val, 'sss')
          this.$nextTick(() => {
            // this.initSwiper()
          })
        }
      }
    },
    mounted() {
      this.$nextTick(() => {
        console.log(this.swiperName, 'sss')
        this.initSwiper()
      })
    },
    methods: {
      handleGoGoodsDetail(obj) {
        this.$router.push({name: 'goodsDetail', query: {id: obj.id}})
      },
      initSwiper() {
        let name = '.' + this.swiperName
        console.log(name, 'name')
        var swiper = new Swiper (name, {
          slidesPerView: 5,
          spaceBetween: 30,
          slidesPerGroup: 5,
          loop: true,
          observer:true,
          observeParents:true,
          loopFillGroupWithBlank: true,
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
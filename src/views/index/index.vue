<template>
  <div class="index">
    <Topbar></Topbar>
    <hero></hero>
    <div class="jinpai-list">
       <el-row type="flex">
          <el-col :span="8" v-for="item in jinpaiList" :key="item.id">
            <img :src="item.picUrl" alt="" style="width:100%;height:100%;" @click="showCounselDialog = true" class="cursor">
          </el-col>
      </el-row>
    </div>
    <div class="main">
      <div class="card-list" v-for="(item, index) in hotSpuList" :key="index">
        <div class="title">{{item.showcase.name}}</div>
        <div class="title-desc">
          <span v-for="(desc, index) in item.showcase.synopsis" :key="index">{{desc}}</span>
        </div>
        <div class="card-list-main">
          <div class="card-list-main-l">
            <img :src="item.showcase.picUrl" alt="">
          </div>
          <div class="card-list-main-r">
            <div class="card-list-item" v-for="spu in item.spuList" :key="spu.id">
              <div>
                <span class="card-tag" v-for="(tag, index) in spu.tags" :key="index">{{tag}}</span>
              </div>
              <h3>{{spu.name}}</h3>
              <div class="card-desc">
                <p v-for="(desc, index) in spu.synopsis" :key="index">{{desc}}</p>
              </div>
              <div class="money-wrap"><span class="money">¥{{spu.minPrice | filterMoney}}</span>起</div>
              <el-button type="primary" size="small" class="buy_btn" @click="handleGoGoodsDetail(spu)">立即购买</el-button>
            </div>
          </div>
        </div>
      </div>
       <div class="card-list">
        <div class="title">热点资讯</div>
        <div class="title-desc">
          <span>最新政策</span>
          <span>时事新闻</span>
          <span>同业动向</span>
          <span>创业指</span>
        </div>
        <ul class="case-wrap">
          <li v-for="(item, index) in hotList" :key="index">
             <a :href="item.linkUrl" target="_blank">
              <img :src="item.picUrl" alt="" style="width:100%;height:100%">
            </a>
            <!-- <img src="../../assets/logo.png" alt="">
            <div class="new-item">
              <h3>云栖号头条：浙江省和阿里等开发“企业码”平台11111</h3>
              <p>传感器好比人的眼耳口鼻，但又不仅仅只是人的感官那 么简单，它甚至能够采集到更多的有用信息。</p>
              <div class="time">2020-04-23</div>
            </div> -->
          </li>
        </ul>
      </div>
      <div class="card-list">
        <div class="title">最新案例</div>
        <div class="title-desc">
          <span>工商服务</span>
          <span>知识产权</span>
          <span>资质申请</span>
          <span>项目申报</span>
        </div>
        <ul class="case-wrap">
          <li v-for="(item, index) in caseList" :key="index">
            <a :href="item.linkUrl" target="_blank">
              <img :src="item.picUrl" alt="">
            </a>
          </li>
        </ul>
      </div>
    </div>
    <footer-block></footer-block>
    <Bottombar></Bottombar>
    <quest-dialog :showCounselDialog.sync="showCounselDialog"></quest-dialog>
  </div>
</template>

<script>
  import Topbar from '../base/Topbar/index'
  import Bottombar from '../base/Bottombar/index'
  import footerBlock from '@/components/footerBlock/footerBlock'
  import questDialog from '@/components/questDialog/index'
  import hero from './hero'
  export default {
    components: {
      Topbar,
      Bottombar,
      hero,
      questDialog,
      footerBlock
    },
    data () {
      return {
        jinpaiList: [], //广告位列表
        hotSpuList: [],
        caseList: [], //最新案例
        hotList: [], //热点资讯
        showCounselDialog: false
      }
    },
    created() {
      this.getJinpaiBannerList()
      this.getCateSpuList()
      this.getCaseList()
      this.getHotList()
    },
    methods: {
      handleGoGoodsDetail(obj) {
        this.$router.push({name: 'goodsDetail', query: {id: obj.id}})
      },
      getJinpaiBannerList() {
         this.$http.send(this.$api.bannerList, {
           code: '003',
           number: 3
         }).then(res => {
           this.jinpaiList = res.data
        })
      },
      getCateSpuList() {
        this.$http.send(this.$api.showcaseSpu, {
           code: 'cate_',
           showcaseNum: 3,
           spuNum: 6
         }).then(res => {
           this.hotSpuList = []
           res.data.forEach(item => {
             item.showcase.synopsis = item.showcase.synopsis.split(',') || []
             item.spuList.forEach(spu => {
               spu.tags = spu.tags ? spu.tags.split(',') : []
               spu.synopsis = JSON.parse(spu.synopsis).split('\n') || spu.synopsis
             })
             this.hotSpuList.push(item)
           })
        })
      },
      getCaseList() {
        this.$http.send(this.$api.bannerList, {
           code: 'case_',
           number: 4
         }).then(res => {
           this.caseList = res.data
        })
      },
      getHotList() {
        this.$http.send(this.$api.bannerList, {
           code: 'hot_',
           number: 4
         }).then(res => {
           this.hotList = res.data
        })
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
        // background-size: cover;
        img {
          width: 100%;
          height: 100%;
        }
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
          position: relative;
          .card-tag {
            padding: 0 6px;
            display: inline-block;
            color: #D8D8D8;
            height:20px;
            border-radius:4px;
            border:1px solid rgba(216,216,216,1);
            margin-right: 10px;
          }
          .buy_btn {
            position: absolute;
            bottom: 10px;
            right: 10px;
          }
          .money-wrap {
            position: absolute;
            left: 22px;
            bottom: 10px;
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
              line-height:18px;
              margin-bottom: 3px;
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
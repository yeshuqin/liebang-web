<template>
  <div class="order-detail content-wrap">
    <div class="order-wrap">
        <left-menu active="/order"></left-menu>
        <div class="order-main">
          <h2 class="title-warp bold">我的订单/订单详情</h2>
          <div class="order-detail">
            <div class="order-detail-top">
              <div class="l">
                <p class="font999">订单号：{{id}}</p>
                <h1 class="fontImp status font22">{{statusNameMapList[infoObj.status]}}</h1>
                <!-- <span class="font12">手机订单</span> -->
              </div>
              <div class="r">
                <div class="tip font12 font999">
                  <span class="iconfont fontImp">&#xe7fd;</span>
                  请及时关注订单详细信息，已确保您能及时收到货品
                </div>
                <el-steps :active="activeStep" align-center class="step" v-if="infoObj.status !== 4">
                  <el-step title="提交订单">
                    <template slot="description">
                      {{infoObj.createTime || ''}}
                    </template>
                    <template slot="icon"> 
                      <span class="iconfont">&#xe696;</span>
                    </template>
                  </el-step>
                  <el-step>
                    <template slot="title">
                      {{infoObj.status === 1 ? '支付中' : '付款成功'}}
                    </template>
                    <template slot="description">
                      {{infoObj.payTime || ''}}
                    </template>
                   <template slot="icon"> 
                      <span class="iconfont">&#xe63d;</span>
                    </template>  
                  </el-step>
                  <el-step>
                     <template slot="title"> 
                     <span v-if="infoObj.status === 11">待上传资料</span>
                     <span v-else-if="infoObj.status === 12">待资料审核</span>
                     <span v-else-if="infoObj.status === 13">资料审核失败</span>
                     <span v-else-if="infoObj.status === 14">资料审核成功</span>
                     <span v-else>审核资料</span>
                    </template>
                     <template slot="description"> 
                    </template>
                    <template slot="icon"> 
                      <span class="iconfont">&#xe611;</span>
                    </template>
                  </el-step>
                  <el-step title="发货">
                     <template slot="icon"> 
                      <span class="iconfont">&#xe605;</span>
                    </template>
                    <template slot="description"> 
                      <span>{{infoObj.deliverTime || ''}}</span>
                    </template>
                  </el-step>
                  <el-step title="完成">
                     <template slot="icon"> 
                      <span class="iconfont">&#xe6a7;</span>
                    </template>
                    <template slot="description"> 
                      <span>{{infoObj.completeTime || ''}}</span>
                    </template>
                  </el-step>
                </el-steps>
                <el-steps :active="activeStep" align-center class="step" v-else>
                  <el-step title="提交订单">
                    <template slot="description">
                      {{infoObj.createTime || ''}}
                    </template>
                    <template slot="icon"> 
                      <span class="iconfont">&#xe696;</span>
                    </template>
                  </el-step>
                  <el-step title="已取消">
                     <template slot="icon"> 
                      <span class="iconfont">&#xe6a7;</span>
                    </template>
                    <template slot="description"> 
                      <span>{{infoObj.updateTime || ''}}</span>
                    </template>
                  </el-step>
                </el-steps>
                <div class="success">
                  完成订单可能获得：
                  <span>
                    <i class="iconfont">&#xe61b;</i>
                    优惠券
                  </span>
                  <span>
                    <i class="iconfont">&#xe768;</i>
                    积分
                  </span>
                  <span>
                    <i class="iconfont">&#xe641;</i>
                    会员成长值
                  </span>
                </div>
              </div>
            </div>
            <div class="order-detail-bottom">
              <div class="item">
                <p class="title">收货人信息</p>
                <ul class="list">
                  <li>
                    <span class="label">收货人：</span>
                    <span class="value">{{infoObj.name}}</span>
                  </li>
                  <li>
                    <span class="label">收件地址：</span>
                    <span class="value">{{infoObj.province}}{{infoObj.city}}{{infoObj.county}}{{infoObj.town}}{{infoObj.address}}</span>
                  </li>
                  <li>
                    <span class="label">手机号码：</span>
                    <span class="value">{{infoObj.phone}}</span>
                  </li>
                </ul>
              </div>
              <div class="item" v-if="infoObj.expressName">
                <p class="title">配送信息</p>
                <ul class="list">
                  <li>
                    <span class="label">物流公司：</span>
                    <span class="value">{{infoObj.expressName}}</span>
                  </li>
                  <li>
                    <span class="label">物流单号：</span>
                    <span class="value">{{infoObj.expressNo}}</span>
                  </li>
                  <li>
                    <span class="label">运费：</span>
                    <span class="value">¥{{infoObj.freightAmount | filterMoney}}</span>
                  </li>
                </ul>
              </div>
              <div class="item" v-if="infoObj.status !== 0 && infoObj.status !== 4">
                <p class="title">付款信息</p>
                <ul class="list">
                  <li>
                    <span class="label">商品总额： </span>
                    <span class="value">¥{{infoObj.salePrice | filterMoney}}</span>
                  </li>
                  <li>
                    <span class="label">应付总额：</span>
                    <span class="value">¥{{infoObj.realAmount | filterMoney}}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="order-good">
            <el-row class="header">
              <el-col :span="7">
                商品信息
              </el-col>
              <el-col :span="3">
                平台价
              </el-col>
              <el-col :span="3">
                数量
              </el-col>
              <el-col :span="3">
                优惠金额
              </el-col>
              <el-col :span="3">
                付款方式
              </el-col>
              <el-col :span="3">
                应付总额
              </el-col>
              <el-col :span="2">
                操作
              </el-col>
            </el-row>
            <div class="body">
              <el-row class="body-main">
                <el-col :span="7">
                  <div class="img-wrap fl">
                    <img :src="infoObj.skuPic" alt="">
                  </div>
                  <div class="fl good-name">
                    <p class="font666">{{infoObj.skuName}}</p>
                    <p class="font12">{{infoObj.attribute}}</p>
                  </div>
                </el-col>
                <el-col :span="3">
                  ￥{{infoObj.salePrice | filterMoney}}
                </el-col>
                <el-col :span="3">
                  {{infoObj.quantity}}
                </el-col>
                <el-col :span="3">
                  {{infoObj.discountAmount | filterMoney}}
                </el-col>
                <el-col :span="3">
                  {{payTypeList[infoObj.payType]}}
                </el-col>
                <el-col :span="3">
                  ￥{{infoObj.realAmount | filterMoney}}
                </el-col>
                <el-col :span="2">
                  <div v-if="infoObj.status === 4">
                    <el-button @click="handleGoBuy(item)" size="mini">重新购买</el-button>
                  </div>
                  <div v-if="infoObj.status === 0">
                    <div class="cursor" @click="handleGoPay">立即付款</div>
                    <div class="cursor" @click="hanldeCancel">取消订单</div>
                  </div>
                  <div v-if="infoObj.status === 3">
                    <el-button @click="handleGoBuy(item)" type="default" size="mini" class="mb6">再次购买</el-button>
                  </div>
                  <div v-if="infoObj.status === 11">
                    <el-button @click="handleGoupload(item)" size="mini" class="mb6">上传资料</el-button>
                  </div>
                  <div v-if="infoObj.status === 12">
                    <el-button @click="handleGoupload(item)" size="mini" class="mb6">更新资料</el-button>
                  </div>
                  <div v-if="infoObj.status === 13">
                    <el-button @click="handleGoupload(item)" size="mini" class="mb6">重新上传</el-button>
                  </div>
                </el-col>
              </el-row>
            </div>
            
            <ul class="goods-list">
              <ul>
                <li>
                  <span class="label">商品总额：</span>
                  <span class="value">¥{{infoObj.salePrice | filterMoney}}</span>
                </li>
                <li>
                  <span class="label">优惠金额：</span>
                  <span class="value">¥{{infoObj.discountAmount | filterMoney}}</span>
                </li>
                <li>
                  <span class="label">运&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;费：</span>
                  <span class="value">¥{{infoObj.freightAmount | filterMoney}}</span>
                </li>
                <li class="fontImp">
                  <span class="label fontImp">应付总额：</span>
                  <span class="value">¥{{(infoObj.salePrice * infoObj.quantity) | filterMoney}}</span>
                </li>
              </ul>
            </ul>
          </div>
      </div>
    </div>
     <ad-list class="mb90" :list="hotList" :className="'detailHotSwiper'">
       <h2>热卖单品</h2>
    </ad-list> 
    <ad-list class="mb90" :list="likeList" :className="'detailLikeSwiper'">
       <h2>猜你喜欢</h2>
    </ad-list> 
  </div>
</template>

<script>  
  import leftMenu from '@/components/leftMenu/leftMenu'
  import adList from '@/components/adList/adList'
  export default {
    components: {
      leftMenu,
      adList
    },
    data() {
      return {
        activeStep: 1,
        formInline: {
          name: ''
        },
        statusItem: {
          1: '资料上传中',
          2: '政府审核中'
        },
        orderList: [
          {
            status: 2,
          },
          {
            status: 3,
          },
          {
            status: 4,
          }
        ],
        statusNameMapList: {
          0: '未支付',
          1: '支付中',
          2: '待收货',
          3: '已完成',
          4: '已取消',
          11: '待上传资料',
          12: '待资料审核',
          13: '资料审核失败',
          14: '资料审核通过'
        },
        payTypeList: {
          1: '对公转账',
          2: '支付宝',
          3: '微信支付'
        },
        checked: true,
        id: this.$route.query.id,
        infoObj: {},
        hotList: [],
        likeList: []
      }
    },
    created() {
      this.getDetail()
      this.getHotList()
      this.getLikeList()
    },
    methods: {
      getDetail() {
        this.$http.send(this.$api.orderDetail, {
          id: this.id
        }).then(res => {
          console.log(res)
          this.infoObj = res.data
          console.log(this.infoObj, 'infoObj')
          if(this.infoObj.status === 0) {
            this.activeStep = 1
          }else if(this.infoObj.status === 1) {
            this.activeStep = 2
          }else if(this.infoObj.status === 11 || this.infoObj.status === 12 || this.infoObj.status === 13 || this.infoObj.status === 14) {
            this.activeStep = 3
          }else if(this.infoObj.status === 3) {
            this.activeStep = 5
          }else if(this.infoObj.status === 2) {
            this.activeStep = 4
          }else {
            this.activeStep = 5
          }
        })
      },
      getHotList() {
        this.$http.send(this.$api.spuPage, {
           showcaseId: '1284753668595380225',
           current: 1,
           size: 20
         }).then(res => {
           this.hotList = res.data.records
        })
      },
      getLikeList() {
        this.$http.send(this.$api.spuPage, {
           showcaseId: '1284760453913899009',
           current: 1,
           size: 20
         }).then(res => {
           this.likeList = res.data.records
        })
      },
      handleGoBuy(obj) {
        this.$router.push({name: 'goodsDetail', query: {id: this.infoObj.spuId}})
      },
      handleGoupload () {
        this.$router.push({name: 'upload', query: {id: this.infoObj.spuId}})
      },
      hanldeCancel(id) {
        this.$confirm('此操作将取消该订单, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.send(this.$api.orderCancel, {
            id: this.id
          }).then(res => {
           this.$message.success('操作成功~')
           this.getDetail()
          }).catch(res => {
            this.$message.error(res.message)
          })
        }).catch(() => {});
      },
      handleGoPay (obj) {
        this.$router.push({name: 'playOrder', query: {id: this.infoObj.skuId, orderId: this.id}})
      },
      handleSelectionChange() {

      },
      handleTabClick() {

      },
      goUpload() {
        this.$router.push({name: 'upload'})
      }
    }
  }
</script>

<style lang="scss" scoped>
.order-wrap {
  display: flex;
  margin-top: 11px;
  margin-bottom: 120px;
  .order-main {
    flex: 1;
    .order-detail-top {
      margin-top: 10px;
      display: flex;
      padding: 5px 0;
      height: 206px;
      box-sizing: border-box;
      background: #ffffff;
      .l {
        width: 257px;
        border-right: 1px solid #EDEDED;
        text-align: center;
        padding-top: 10px;
        .status {
          margin: 40px 0 9px 0;
        }
      }
      .r {
        flex: 1;
        padding-left: 10px;
        position: relative;
        .tip {
          margin:10px 0 30px 0;
        }
        .success {
          color: #999999;
          font-size: 12px;
          position: absolute;
          left: 10px;
          bottom: 1px;
          .iconfont {
            font-size: 12px;
          }
          span {
            margin-right: 20px;
          }
        }
      }
    }
    .order-detail-bottom {
      display: flex;
      margin-top: 10px;
      height: 208px;
      padding-bottom: 6px;
      box-sizing: border-box;
      .item {
        flex: 1;
        background: #ffffff;
        border-right: 1px solid #EDEDED;
        padding-left: 30px;
        padding-top: 20px;
        box-sizing: border-box;
        .title {
          font-weight: 400;
          color:rgba(0,0,0,0.65);
          font-size: 18px;
          margin-bottom: 8px;
        }
        .list {
          li {
            color:rgba(0,0,0,0.65);
            display: flex;
            .label {
              display: inline-block;
              width: 90px;
            }
            .value {
              flex: 1;
            }
          }
        }
      }
    }
    .order-good {
      margin-top: 10px;
      background: #ffffff;
      padding: 20px 0;
      text-align: center;
      .header {
        margin-bottom: 5px;
        padding: 0 14px;
        color: #9F9F9FFF;
      }
      .body {
        padding: 0 14px;
        color: #666666FF;
        .body-main {
          padding: 25px 0 10px;
          border-top: 1px solid #EDEDFF;
          border-bottom: 1px solid #EDEDFF;
        }
        .good-name {
          text-align: left;
          margin-left: 12px;
          color: #868686FF;
        }
        .img-wrap {
          width:62px;
          height:62px;
          overflow: hidden;
          border-radius:1px;
          border:1px solid rgba(234,234,234,1);
          margin-left: 8px;
          img {
            margin-top: 2px;
            width: 55px;
          }
        }
      }
    }
    .goods-list {
      padding-right: 20px;
      padding-top: 10px;
      overflow: hidden;
      ul {
        float: right;
      }
      li {
        .label {
          width: 152px;
          display: inline-block;
          color: #666666;
        }
        .value {
          width: 50px;
          display: inline-block;
          text-align: right;
        }
      }
    }
  }
}
</style>

<style lang="scss">
  .order-detail {
    .el-step {
      .el-step__icon.is-text {
        border: none;
        .iconfont {
          font-size: 22px;
        }
      }
      .el-step__head {
        &.is-finish {
          color: #FE6A00;
          border-color: #FE6A00;
        }
       
      }
      .el-step__title {
        font-size: 14px;
        font-weight:600;
        margin-top:10px;
        &.is-finish {
          color: #333333;
        }
        &.is-wait {
          color: #BFBFBF;
        }
      }
      .el-step__description {
        color: #333333;
        font-size: 12px;
        &.is-wait {
          color: #BFBFBF;
        }
      }
    }
  }
</style>
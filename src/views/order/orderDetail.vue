<template>
  <div class="order-detail content-wrap">
    <div class="order-wrap">
        <left-menu active="/order"></left-menu>
        <div class="order-main">
          <h2 class="title-warp">我的订单/订单详情</h2>
          <div class="order-detail">
            <div class="order-detail-top">
              <div class="l">
                <p class="font999">订单号：304456778900</p>
                <h1 class="fontImp status font22">已完成</h1>
                <span class="font12">手机订单</span>
              </div>
              <div class="r">
                <div class="tip font12 font999">
                  <span class="iconfont fontImp">&#xe7fd;</span>
                  请及时关注订单详细信息，已确保您能及时收到货品
                </div>
                <el-steps :active="2" align-center class="step">
                  <el-step title="提交订单" description="2019-12-04 11:52:35">
                    <template slot="icon"> 
                      <span class="iconfont">&#xe696;</span>
                    </template>
                  </el-step>
                  <el-step title="付款成功">
                   <template slot="icon"> 
                      <span class="iconfont">&#xe63d;</span>
                    </template>  
                  </el-step>
                  <el-step title="商品出库" description="2020-01-04 11:52:35">
                    <template slot="icon"> 
                      <span class="iconfont">&#xe611;</span>
                    </template>
                  </el-step>
                  <el-step title="等待收货" description="2020-01-04 11:52:35">
                     <template slot="icon"> 
                      <span class="iconfont">&#xe605;</span>
                    </template>
                  </el-step>
                  <el-step title="完成" description="2020-01-04 11:52:35">
                     <template slot="icon"> 
                      <span class="iconfont">&#xe6a7;</span>
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
                    <span class="value">张三</span>
                  </li>
                  <li>
                    <span class="label">地址：</span>
                    <span class="value">上海市浦东新区金科路 1000弄3号楼603</span>
                  </li>
                  <li>
                    <span class="label">手机号码：</span>
                    <span class="value">134****7800</span>
                  </li>
                </ul>
              </div>
              <div class="item">
                <p class="title">配送信息</p>
                <ul class="list">
                  <li>
                    <span class="label">配送方式：</span>
                    <span class="value">普通快递</span>
                  </li>
                  <li>
                    <span class="label">运费：</span>
                    <span class="value">¥0.00</span>
                  </li>
                </ul>
              </div>
              <div class="item">
                <p class="title">付款信息</p>
                <ul class="list">
                  <li>
                    <span class="label">商品总额： </span>
                    <span class="value">¥3299.00</span>
                  </li>
                  <li>
                    <span class="label">应付总额：</span>
                    <span class="value">¥2700.00</span>
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
            <el-row class="body">
              <el-col :span="7">
                <div class="img-wrap fl">
                  <img src="https://file2.pingxiaobao.com/dev/2006/29/97e9b67ae59b01ba50308c09b78a55ee.jpg" alt="">
                </div>
                <div class="fl good-name">
                  <p class="font666">计算机软件著作权申请</p>
                  <p class="font12">加急自助</p>
                  <p class="font12">10个工作日</p>
                </div>
              </el-col>
              <el-col :span="3">
                ￥999
              </el-col>
              <el-col :span="3">
                1
              </el-col>
              <el-col :span="3">
                500
              </el-col>
              <el-col :span="3">
                1
              </el-col>
              <el-col :span="3">
                ￥499
                <div>手机订单</div>
              </el-col>
              <el-col :span="2">
                <div>立即付款</div>
                <div>取消订单</div>
              </el-col>
            </el-row>
            <ul class="goods-list">
              <ul>
                <li>
                <span class="label">商品总额：</span>
                  <span class="value">¥999.00</span>
                </li>
                <li>
                  <span class="label">优惠金额：</span>
                  <span class="value">¥999.00</span>
                </li>
                <li>
                  <span class="label">运 费：</span>
                  <span class="value">¥999.00</span>
                </li>
                <li class="fontImp">
                  <span class="label fontImp">应付总额：</span>
                  <span class="value">¥999.00</span>
                </li>
              </ul>
            </ul>
          </div>
      </div>
    </div>
     <ad-list class="mb90">
       <h2>热卖单品</h2>
    </ad-list> 
    <ad-list class="mb90">
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
        activeName: '1',
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
        checked: true
      }
    },
    methods: {
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
      }
      .body {
        padding: 25px 0 10px 0;
        border-top: 1px solid #EDEDFF;
        border-bottom: 1px solid #EDEDFF;
        .good-name {
          text-align: left;
          margin-left: 12px;
          color: #999999;
        }
        .img-wrap {
          width:62px;
          height:62px;
          border-radius:1px;
          border:1px solid rgba(234,234,234,1);
          margin-left: 20px;
          img {
            margin-top: 2px;
            width: 55px;
            height: 55px;
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
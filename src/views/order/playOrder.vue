<template>
  <div class="play-order content-wrap">
    <h2 class="title-warp clearfix mt10">
      <span class="fl">支付方式</span>
      <ul class="step-wrap fr">
        <li class="success">
          <span class="number">1</span>
          <p>1.确认订单</p>
        </li>
        <li class="active">
          <span class="number">2</span>
          <p>2.付款</p>
        </li>
        <li>
          <span class="number">3</span>
          <p>3.支付完成</p>
        </li>
      </ul>
    </h2>
    <div class="main">
      <h2>支付订单信息</h2>
      <ul class="main-list">
        <li class="clearfix" style="color:#333333FF;">
          <span class="fl">订单编号：{{orderId}}</span>
          <span class="fr">应付：<i class="fontImp">¥{{detailObj.salePrice | filterMoney}}</i></span>
        </li>
        <li class="clearfix">
          <span class="fl">{{detailObj.spuName}} <i>{{detailObj.name}}</i></span>
          <span class="fr">¥{{detailObj.salePrice | filterMoney}}</span>
        </li>
      </ul>
      <div class="border"></div>
      <div>
        <p class="play-type">选择支付方式</p>
        <div class="play-title">
          <img src="../../assets/img/ty.png" alt="" class="check">
          <img src="../../assets/img/kjzf.png" alt="">
          <span class="font999 font12">（支付更快捷，一步验证，无需网银）</span>
        </div>
        <div class="play-wrap">
          <div class="play-btn" :class="{active: type === 2}" @click="handleType(2)">
            <i class="iconfont ali fl">&#xe663;</i>
            <span class="fl">支付宝</span>
          </div>
          <div class="play-btn" :class="{active: type === 3}" @click="handleType(3)">
            <i class="iconfont wechat fl">&#xe607;</i>
            <span class="fl">微信支付</span>
          </div>
          <div class="play-btn" :class="{active: type === 1}" @click="handleType(1)">
            <i class="iconfont card fl">&#xe6c4;</i>
            <span class="fl">对公转账</span>
          </div>
        </div>
      </div>
      <div class="cash-wrap clearfix">
         <div class="fr">
          <p class="money fontImp font36">¥{{detailObj.salePrice | filterMoney}}</p>
          <span class="font666 font16">优惠¥0</span>
        </div>
        <div class="font16 fr font999" style="margin-top:12px">
          应付金额：
        </div>
      </div>
      <div  class="buy-btn">
        <el-button type="primary" @click="goStep">下一步</el-button>
      </div>
    </div>
    <el-dialog
      title="对公转账流程"
      :visible.sync="dialogVisible"
      :append-to-body="true" :close-on-click-modal="false"
      custom-class="card-setp"
      width="674px">
      <h2 class="font333 font16 mb10">1.对公汇款</h2>
      <p class="font333">汇款信息</p>
      <ul class="info-list">
        <li>
          <span class="label">账户名称：</span>
          <span class="value">北京位全科技信息有限公司</span>
        </li>
        <li>
          <span class="label">开户银行：</span>
          <span class="value">招商银行北京朝三里屯支行</span>
        </li>
        <li>
          <span class="label">银行账号：</span>
          <span class="value">1109 1354 6688 901</span>
        </li>
        <li>
          <span class="label">汇款金额：</span>
          <span class="value">¥{{detailObj.salePrice | filterMoney}}</span>
        </li>
        <li>
          <span class="label">汇款备注：</span>
          <span class="value">{{detailObj.spuName}}</span>
        </li>
      </ul>
      <h2 class="font333 font16 mb10">2.升级账号</h2>
      <p>（1）打开在线客服，转接人工客服或留言</p>
      <p>（2）提供对公知福电子回单和墨刀账号</p>
      
      <div class="tip">*如有疑问，请您通过在线客服或销售热线（010-52433870）咨询</div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleSumbitPay">确认支付</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        dialogVisible: false,
        checked: true,
        tableData: [],
        detailObj: {},
        id: '',
        orderId: '',
        type: '', //支付类型
      }
    },
    created() {
      let {id, orderId} = this.$route.query
      this.id =  id
      this.orderId = orderId
      this.getDetail()
    },
    methods: {
      goStep() {
        // this.$router.push({name: 'statusOrder'})
        if(!this.type) {
          this.$message.error('请选择支付方式~')
          return
        }
        if(this.type === 1) {
          this.dialogVisible = true
        }else {
          this.$http.send(this.$api.orderPay, {
            id: this.orderId,
            payType: this.type
          }).then(res => {
             window.location.href = res.data;
            // this.$confirm('提交成功，系统将在48小时内核查你的款项', '打款成功', {
            //     confirmButtonText: '确定',
            //     cancelButtonText: '取消',
            // }).then(() => {
            //   this.dialogVisible = false
            //   setTimeout(() => {
            //     this.$router.push({name: 'order'})
            //   }, 500);
            // }).catch(() => {
            //   this.dialogVisible = false
            // });
          })
        }
      },
      handleSumbitPay() {
         this.$http.send(this.$api.orderPay, {
            id: this.orderId,
            payType: this.type
          }).then(res => {
            this.$confirm('提交成功，系统将在48小时内核查你的款项', '打款成功', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
            }).then(() => {
              this.dialogVisible = false
              setTimeout(() => {
                this.$router.push({name: 'order'})
              }, 500);
            }).catch(() => {
              this.dialogVisible = false
            });
          })
      },
      handleType(type) {
        this.type = type
      },
      getDetail() {
        this.$http.send(this.$api.spuSku, {
           id: this.id
         }).then(res => {
           this.detailObj = res.data
         })
      },
    }
  }
</script>

<style lang="scss" scoped>
.play-order {
  padding-bottom: 85px;
  h2 {
    padding: 12px 0 12px 21px;
    font-weight: 600;
  }
  .title-warp {
    height: 54px;
    padding: 7px 54px 0 14px;
    box-sizing: border-box;
  }
  .step-wrap {
    margin-top: 7px;
    li {
      display: inline-block;
      width: 160px;
      background: #CCCCCCFF;
      height: 6px;
      position: relative;
      font-size: 12px;
      text-align: center;
      p {
        margin-top: 4px;
        font-size: 12px;
        color: #CCCCCCFF;
      }
      .number {
        width: 24px;
        height: 24px;
        line-height: 24px;
        text-align: center;
        color: #fff;
        font-size: 12px;
        border-radius: 50%;
        background: #CCCCCCFF;
        position: absolute;
        left: 50%;
        top: 50%;
        margin-left: -12px;
        margin-top: -12px;
      }
      &.success {
        background: #CBEDB6FF;
        .number {
          background: #CBEDB6FF;
        }
        p {
          color: #CBEDB6FF
        }
      }
      &.active {
        background: #7ABD55FF;
        .number {
          background: #7ABD55FF;
        }
        p {
          color: #7ABD55FF
        }
      }
      
    }
  }
  .main {
    background: #fff;
    margin-top: 16px;
    .main-list {
      li {
        padding: 15px 23px;
        border:1px solid rgba(230,230,230,1);
      }
      li:last-child {
        color: #373D42FF;
        background:rgba(245,245,246,1);
        border-top: none;
        i {
          margin-left: 46px;
        }
      }
    }
    .border {
      height:24px;
      background:rgba(250,250,250,1);
      margin: 28px 0;
    }
    .play-type {
      padding: 0 0 20px 20px;
      border-bottom: 1px solid #E6E6E6FF;
      margin-bottom: 20px;
    }
    .play-wrap {
      padding: 0 0 100px 20px;
    }
    .play-title {
      padding: 0 0 28px 20px;
      .check {
        margin-right: 16px;
      }
    }
    .play-btn {
      width:166px;
      height:40px;
      border-radius:2px;
      border:1px solid rgba(224,224,224,1);
      margin-right: 12px;
      text-align: center;
      line-height: 40px;
      font-size: 12px;
      font-weight:400;
      color:rgba(102,102,102,1);
      display: flex;
      justify-content: center;
      float: left;
      cursor: pointer;
      &.active {
         border:1px solid rgba(254,106,0,1);
      }
      .iconfont {
        margin-right: 5px;
        font-size: 24px;
      }
      .ali {
        color: #1F9EDAFF;
      }
      .wechat {
        color: #00C901FF;
      }
      .card {
        color: #FF5A3FFF;
      }
    }
    .cash-wrap {
      padding: 10px 0;
      background:rgba(244,244,244,1);
      padding-right: 98px;
    }
    .buy-btn {
      text-align: right;
      padding: 30px 70px 25px 0;
    }
  }
}
</style>

<style lang="scss">
  .card-setp {
    .el-dialog__header {
      height: 40px;
      line-height: 40px;
      padding: 0 0 0 11px;
      background:rgba(243,243,243,1);
      border-bottom: 1px solid #C2C2C2FF;
      .el-dialog__title{
         font-size: 15px;
         color: #444444FF;
      }
    }
    .el-dialog__headerbtn {
      top: 10px;
    }
    .label {
      font-weight:400;
      color:rgba(102,102,102,1);
      line-height:20px;
    }
    .value {
      font-weight:600;
      color:rgba(102,102,102,1);
      line-height:20px;
    }
    .info-list {
      margin-top: 6px;
      margin-bottom: 25px;;
      li {
        margin-bottom: 7px;
        .label {
          margin-right: 16px;
        }
      }
    }
    .el-dialog__body {
      padding: 36px;
    }
    .tip {
      margin-top: 32px;
      font-weight:700;
    }
  }
</style>
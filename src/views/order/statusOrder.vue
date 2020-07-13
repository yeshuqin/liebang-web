<template>
  <div class="status-order content-wrap">
    <h2 class="title-warp clearfix mt10"> 
      <span class="fl">{{type === 'error' ? '支持失败' : '支付成功'}}</span>
      <ul class="step-wrap fr">
        <li class="success">
          <span class="number">1</span>
          <p>1.确认订单</p>
        </li>
        <li class="success">
          <span class="number">2</span>
          <p>2.付款</p>
        </li>
        <li class="active">
          <span class="number">3</span>
          <p>3.{{type === 'error' ? '支持失败' : '支付成功'}}</p>
        </li>
      </ul>
    </h2>
    <div class="main">
      <div  v-if="type === 'error'">
        <span class="iconfont error">&#xe626;</span>
        <p class="font18 fontbold status">支持失败</p>
         <div>
          <el-button @click="goDetail">查看订单</el-button>
        </div>
      </div>
      <div v-else>
         <span class="iconfont success fontImp">&#xe706;</span>
         <p class="font18 fontbold status">支付成功</p>
         <div>
          <el-button @click="goDetail">查看订单</el-button>
        </div>
      </div> 
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        dialogVisible: false,
        checked: true,
        type: 'success',
        tableData: [
          {
            1: '软件著作权登记',
            2: '加急自助（35个工作日）',
            3: '预付款',
            4: '1',
            5: '¥30',
            6: '¥30',
            7: '¥30'
          }
        ],
        form: {
          name: '',
          status: '个人'
        }
      }
    },
    methods: {
      goDetail() {
        this.$router.push({name: 'orderDetail'})
      }
    }
  }
</script>

<style lang="scss" scoped>
.status-order {
  h2 {
    padding: 12px 0 12px 34px;
    font-weight: bold;
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
    margin-top: 18px;
    height: 543px;
    padding-top: 96px;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    text-align: center;
    width: 100%;
    .iconfont {
      font-size: 50px;
      color: #AAAFBEFF;
    }
    .status {
      margin-top: 16px;
      margin-bottom: 50px;
    }
  }
}
</style>


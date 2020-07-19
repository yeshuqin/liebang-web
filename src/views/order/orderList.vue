<template>
  <div class="order content-wrap">
    <div class="order-wrap">
        <left-menu></left-menu>
        <div class="order-main">
          <h2 class="title-warp">我的订单</h2>
          <div class="order-table-wrap">
            <div>
               <el-row type="flex" justify="end">
                 <el-col :span="20">
                   <el-tabs v-model="activeName" @tab-click="handleTabClick" style="width:450px;">
                      <el-tab-pane label="全部订单" name="1"></el-tab-pane>
                      <el-tab-pane label="待付款" name="2"></el-tab-pane>
                      <el-tab-pane label="进行中" name="3"></el-tab-pane>
                      <el-tab-pane label="已完成" name="4"></el-tab-pane>
                    </el-tabs>  
                 </el-col>
                 <el-col :span="4">
                   <el-input placeholder="搜索" size='mini' suffix-icon="el-icon-search"></el-input>
                 </el-col>
               </el-row>
            </div>
            <div class="order-table">
              <el-row class="order-table-header" style="margin-bottom:25px;">
                <el-col :span="5">
                   <el-checkbox v-model="checked">全选</el-checkbox> 
                   <span style="margin-left:6px;">删除</span>
                </el-col>
                <el-col :span="7">
                  产品名称
                </el-col>
                <el-col :span="2">
                  平台价
                </el-col>
                <el-col :span="2">
                  数量
                </el-col>
                <el-col :span="2">
                  优惠金额
                </el-col>
                <el-col :span="2">
                  实付
                </el-col>
                <el-col :span="2">
                  订单状态
                </el-col>
                <el-col :span="2" class="textR">
                  操作
                </el-col>
              </el-row>
              <div class="order-table-list" v-for="item in orderList" :key="item">
                <div>
                  <el-row class="order-table-header">
                    <el-col :span="5">
                      <el-checkbox v-model="checked" class="mr10"></el-checkbox> <span class="font999">2019-06-18 10:33:21</span>
                    </el-col>
                    <el-col :span="17">
                      <span class="font000">订单号：2019061823040</span>
                    </el-col>
                    <el-col :span="2" class="textR">
                      <i class="el-icon-delete"></i>
                    </el-col>
                  </el-row>
                </div>
                <div style="opacity:0">1</div>
                <div>
                  <el-row class="order-table-body">
                    <el-col :span="5">
                      <img src="https://file2.pingxiaobao.com/dev/2006/29/97e9b67ae59b01ba50308c09b78a55ee.jpg" alt="" class="order-img">
                    </el-col>
                    <el-col :span="7">
                      <div class="desc">
                        <p>得力不卡纸打印机11</p>
                        <p>白色 560*660cm</p>
                      </div>
                    </el-col>
                    <el-col :span="2">
                      ￥3999
                    </el-col>
                    <el-col :span="2">
                      1
                    </el-col>
                    <el-col :span="2">
                      ¥100
                    </el-col>
                    <el-col :span="2">
                      <span class="money font999">¥3899</span>
                      <p class="font999">手机订单</p>
                    </el-col>
                    <el-col :span="2">
                      <span class="font999" v-if="item.status === 4">已完成</span>
                      <span class="font999">代付款</span>
                      <span class="font999">待收货</span>
                      <span class="font999">已取消</span>
                      <p @click="handleGoDetail(4)" class="cursor">订单详情</p>
                    </el-col>
                    <!-- <el-col :span="2">
                      取消订单
                    </el-col> -->
                  </el-row>
                </div>
              </div>
            </div>
            <div class="pagination">
              <el-pagination
                background
                layout="prev, pager, next"
                :total="1000">
              </el-pagination>
            </div>
          </div>
      </div>
    </div>
    <ad-list class="mb90" :dataList="hotList">
       <h2>热卖单品</h2>
    </ad-list> 
    <ad-list class="mb90" :dataList="likeList">
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
        checked: true,
        hotList: [],
        likeList: []
      }
    },
    created() {
      this.getHotList()
      this.getLikeList()
    },
    methods: {
      handleSelectionChange() {

      },
      handleTabClick() {

      },
      handleGoDetail(status) {
        this.$router.push({name: 'orderDetail', query: {id: status}})
      },
      getHotList() {
        this.$http.send(this.$api.spuPage, {
           showcaseId: '1284753668595380225',
           current: 1,
           size: 10
         }).then(res => {
           this.hotList = res.data.records
        })
      },
      getLikeList() {
        this.$http.send(this.$api.spuPage, {
           showcaseId: '1284760453913899009',
           current: 1,
           size: 10
         }).then(res => {
           this.likeList = res.data.records
        })
      },
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
    .order-table-wrap {
      background: #ffffff;
      padding: 24px;
      margin-top: 10px;
    }
    .order-table{
      .order-table-header {
        width:978px;
        height:34px;
        line-height: 34px;
        background:#F5F5F5;
        border-radius:1px;
        padding: 0 14px;
        color: #8C8C8C;
      }
      .order-table-list {
        .el-icon-delete {
          font-size: 20px;
          cursor: pointer;
        }
        margin-bottom: 10px;
        width:978px;
        height:220px;
        border-radius:1px;
        border:1px solid rgba(232,232,232,1);
        font-size: 12px;
        .order-table-header {
          font-size: 12px;
        }
        .order-table-body {
          overflow: hidden;
          font-size: 14px;
          color: #666666;
          padding-top: 12px;
        }
        .order-img {
          width: 126px;
          height: 126px;
          margin: 3px 0 0 40px;
        }
        .desc {
          color: #868686;
          margin-top: 14px;
        }
        .money {
          border-bottom: 1px solid #999999;
          padding: 0 10px;
          display: inline-block;
          margin-bottom: 6px;
          line-height:20px;
        }
      }
    }
    .pagination {
      text-align: right;
      padding: 36px 12px 22px 0;
      background: #ffffff;
    }
  }
}
</style>
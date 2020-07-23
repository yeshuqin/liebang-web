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
                   <el-input placeholder="搜索" size='mini' v-model="formInline.id" suffix-icon="el-icon-search"></el-input>
                 </el-col>
               </el-row>
            </div>
            <div class="order-table">
              <el-row class="order-table-header" style="margin-bottom:25px;">
                <!-- <el-col :span="5"> -->
                   <!-- <el-checkbox v-model="checked">全选</el-checkbox>  -->
                   <!-- <span style="margin-left:6px;">删除</span> -->
                <!-- </el-col> -->
                <el-col :span="10" style="text-align:left;">
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
                <el-col :span="3" class="textR">
                  操作
                </el-col>
              </el-row>
              <div class="order-table-list" v-for="item in orderList" :key="item.id">
                <div>
                  <el-row class="order-table-header">
                    <!-- <el-col :span="5"> -->
                      <!-- <el-checkbox v-model="checked" class="mr10"></el-checkbox> <span class="font999">{{item.createTime}}</span> -->
                    <!-- </el-col> -->
                    <el-col :span="17" style="text-align: left;">
                      <span class="font000">订单号：{{item.id}}</span>
                    </el-col>
                    <!-- <el-col :span="2" class="textR">
                      <i class="el-icon-delete" @click="handleDelete(item.id)"></i>
                    </el-col> -->
                  </el-row>
                </div>
                <div style="opacity:0">1</div>
                <div>
                  <el-row class="order-table-body">
                    <el-col :span="5">
                      <div class="order-img">
                        <img :src="item.skuPic" alt="" class="">
                      </div>
                    </el-col>
                    <el-col :span="5" style="text-align: left;">
                      <div class="desc">
                        <p>{{item.skuName}}</p>
                        <p>{{item.attribute}}</p>
                      </div>
                    </el-col>
                    <el-col :span="2">
                      ￥{{item.salePrice | filterMoney}}
                    </el-col>
                    <el-col :span="2">
                      {{item.quantity}}
                    </el-col>
                    <el-col :span="2">
                      ¥{{item.discountAmount}}
                    </el-col>
                    <el-col :span="2">
                      <span class="money font999">¥{{item.realAmount}}</span>
                    </el-col>
                    <el-col :span="2">
                      <!-- // 0:待支付,11:待上传资料,12:待资料审核,13:资料审核失败,1:待发货,2:待收货,3:已完成,4:已取消 -->
                      <span class="font999" v-if="item.status === 4">已取消</span>
                      <span class="font999" v-if="item.status === 3">已完成</span>
                      <span class="font999" v-if="item.status === 0">待付款</span>
                      <span class="font999" v-else>进行中</span>
                      <p @click="handleGoDetail(4)" class="cursor">订单详情</p>
                    </el-col>
                    <el-col :span="3">
                      <div v-if="item.status === 4">
                        <el-button @click="handleGoBuy(item)" size="mini">重新购买</el-button>
                      </div>
                       <div v-if="item.status === 0">
                        <el-button @click="handleGoBuy(item)" size="mini">重新购买</el-button>
                        <span class="cursor" @click="hanldeCancel(item.id)">取消订单</span>

                        <!-- 11-- 上传资料按钮  12-- 更新资料  13.重新上传   1-空  2-空 -->
                      </div>
                    </el-col>
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
          id: '',
          orderBy: 0,
          orderType: 0,
          statusList: [] // 0:待支付,11:待上传资料,12:待资料审核,13:资料审核失败,1:待发货,2:待收货,3:已完成,4:已取消
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
        likeList: [],
        current: 1,
        size: 20
      }
    },
    created() {
      this.getOrderList()
      this.getHotList()
      this.getLikeList()
    },
    methods: {
      handleSelectionChange() {

      },
      handleTabClick() {
        let statusList = []
        if(this.activeName === '1') {
          statusList = []
        }else if(this.activeName === '2') {
          statusList = [0]
        }else if(this.activeName === '3') {
          statusList = [11, 12, 13, 1, 2]
        }else {
          statusList = [3]
        }
        this.formInline.statusList = statusList
        this.getOrderList()
      },
      handleGoBuy(obj) {
        this.$router.push({name: 'goodsDetail', query: {id: obj.spuId}})
      },
      hanldeCancel(id) {
        this.$confirm('此操作将取消该订单, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.send(this.$api.orderCancel, {
            id: id
          }).then(res => {
           this.$message.success('操作成功~')
           this.getOrderList()
          }).catch(res => {
            this.$message.error(res.message)
          })
        }).catch(() => {});
      },
      handleGoDetail(status) {
        this.$router.push({name: 'orderDetail', query: {id: status}})
      },
      getOrderList() {
        let params = Object.assign({} , this.formInline, {
           current: this.current,
           size: this.size
         })
         this.$http.send(this.$api.orderPage, params).then(res => {
           this.orderList = res.data.records
        })
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
      text-align: center;
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
          background:rgba(255,255,255,1);
          border:1px solid rgba(234,234,234,1);
          width:130px;
          height:130px; 
          margin: 3px 0 0 40px;
          img {
            width: 100%;
            height: 100%;
          }
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

<style lang="scss">
  .order-wrap {
    .el-tabs__nav-wrap::after {
       background: none;
    }
    .el-tabs .el-tabs__item.is-active {
      color: #FE6A00 !important;
    }
  }
</style>
<template>
  <div class="confirm-order content-wrap">
    <h2 class="title-warp clearfix mt10">
      <span class="fl">确认订单</span>
      <ul class="step-wrap fr">
        <li class="active">
          <span class="number">1</span>
          <p>1.确认订单</p>
        </li>
        <li>
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
        <h2>商品信息</h2>
        <el-table
        class="table-wrap"
        :data="tableData"
        style="width: 100%">
        <el-table-column
          prop="spuName"
          label="产品名称">
        </el-table-column>
        <el-table-column
          prop="name"
          width="200px"
          label="配置详情">
        </el-table-column>
        <el-table-column
          prop="3"
          label="付费方式">
          <template>
            预付款
          </template>
        </el-table-column>
        <el-table-column
          label="数量">
          <template>
            1
          </template>
        </el-table-column>
        <el-table-column
          prop="5"
          label="优惠金额">
          <template>
            ¥0
          </template>
        </el-table-column>
        <el-table-column
          prop="salePrice"
          label="价格">
           <template slot-scope="props">
            ¥{{props.row.salePrice | filterMoney}}
          </template>
        </el-table-column>
        <el-table-column
          prop="salePrice"
          label="小计">
          <template slot-scope="props">
            ¥{{props.row.salePrice | filterMoney}}
          </template>
        </el-table-column>
      </el-table>
      <el-row class="info" type="flex" justify="space-between">
        <el-col :span="11">
          <p class="title" style="color:rgba(0,0,0,1);">配送信息</p>
          <div style="padding-left:20px" class="mb10">
            普通配送
            <span style="margin-left:20px">快递费：包邮</span>
          </div>
          <div style="padding-left:20px" class="mb20">
            配送时间：24点前下单，预计4月28日24:00前送达
          </div>
          <p class="title" style="border-top: 1px solid #E6E6E6FF;padding-left:20px;font-weight: 400;">收货人信息</p>
          <el-form label-position="left" size="small" label-width="90px" style="width:90%;padding-left:20px">
            <el-form-item label="收货人:" required>
              <el-input v-model="formInline.name" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="所在地区:" required>
              <el-cascader :options="options" ref="tree" :props="cascaderProps" v-model="attressArr" clearable style="width:100%;"></el-cascader>
            </el-form-item>
            <el-form-item label="详细地址:" required>
              <el-input v-model="formInline.address" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="手机号码: " required>
              <el-input v-model="formInline.phone" placeholder="请输入"></el-input>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="11">
          <p class="title">发票信息</p>
          <el-form size="small" label-width="120px" label-position="left" style="width:90%;padding-left:20px">
            <div class="mb20">
                <el-checkbox v-model="checkType"></el-checkbox>
                开具发票
            </div>
            <el-form-item label="发票类型:">
              电子发票
            </el-form-item>
            <el-form-item label="发票信息:" :required="checkType">
              <el-select v-model="formInline.invoiceContent" clearable :disabled="!checkType" placeholder="请输入">
                <el-option label="明细" :value="1"></el-option>
                <el-option label="大类" :value="2"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="发票抬头类型:" :required="checkType">
              <el-radio-group v-model="formInline.invoiceType" :disabled="!checkType"> 
                <!-- <el-radio :label="2">个人</el-radio> -->
                <el-radio :label="1">企业</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="发票抬头:" :required="checkType">
              <el-input v-model="formInline.invoiceName" placeholder="请输入" :disabled="!checkType"></el-input>
            </el-form-item>
            <el-form-item label="纳税人识别号:" :required="checkType">
              <el-input v-model="formInline.invoiceCode" placeholder="请输入" :disabled="!checkType"></el-input>
            </el-form-item>
              <el-form-item label="发票备注:" :required="checkType">
              <el-input v-model="formInline.invoiceDesc" placeholder="电子发票金额范围及使用说明" :rows="3" type="textarea" :disabled="!checkType"></el-input>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <div class="file">
        <el-checkbox v-model="checked"></el-checkbox> 我已阅读理解并接受 <span class="fontImp">《{{detailObj.spuName}}服务协议》</span>
      </div>
      <div class="cash-wrap clearfix">
         <div class="fr">
          <p class="money fontImp font36">¥{{detailObj.salePrice | filterMoney}}</p>
          <span class="font666 font16">优惠¥0</span>
        </div>
        <div class="font16 fr font999" style="margin-top:12px">
          总配置费用：
        </div>
      </div>
      <div  class="buy-btn">
        <el-button type="primary" @click="goBuy">确认购买</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  let that = ''
  export default {
    data() {
      return {
        checked: true,
        options: [],
        cascaderProps: {
          value: 'id',
          label: 'nodeName',
          lazy: true,
          lazyLoad (node, resolve) {
            const { level, value} = node;
            console.log(level, 'level')
            var leaf = false
            that.$http.send(that.$api.systemNodeList, {
              level: level+1,
              parentId: value
            }).then(res => {
              // console.log(res, 'res==')
              // if (value === '166976388464378114') {
              //   leaf = level >= 2
              // } else {
              //   leaf = level >= 3
              // }
              console.log(leaf, 'leaf')
              const nodes = res.data.map(item => ({
                id: item.id,
                parentId: item.parentId,
                nodeName: item.nodeName
                // leaf: item.id === '166976388464378114' ? true : false
              }))
              nodes.forEach(item => {
                that.originIdMap[item.id] = item.nodeName
              })
              resolve(nodes);
            }).catch(res => {
              resolve([])
            })
            resolve([])
          }
        },
        originIdMap: {},
        tableData: [],
        formInline: {
          address: '',
          city: '',
          county: '',
          invoiceCode: '',
          invoiceContent: '',
          invoiceDesc: '',
          invoiceName: '',
          invoiceType: 1,
          name: '',
          phone: '',
          province: '',
          skuId: '',
          town: ''
        },
        id: this.$route.query.id,
        detailObj: {},
        checkType: true,
        attressArr: []
      }
    },
    created() {
      this.getDetail()
      that = this
    },
    methods: {
      getDetail() {
        this.$http.send(this.$api.spuSku, {
           id: this.id
         }).then(res => {
          this.detailObj = res.data
          this.tableData.push(res.data)
        })
      },
      getsystemNodeList() {
        this.$http.send(this.$api.systemNodeList, {
           level: 1,
           parentId: ''
         }).then(res => {
          this.options = res.data
        })
      },
      goBuy() {
      console.log(this.$refs.tree.getCheckedNodes())
        if(!this.formInline.name) {
          this.$message.error('请输入收货人名称~')
          return
        }
        if(this.attressArr.length === 0) {
          this.$message.error('请选择所在地区~')
          return
        }else {
          let [province = '', city = '', county = '', town = ''] = this.attressArr
          this.formInline.province = this.originIdMap[province] || ''
          this.formInline.city = this.originIdMap[city] || ''
          this.formInline.county = this.originIdMap[county] || ''
          this.formInline.town = this.originIdMap[town] || ''
        }
        console.log(this.formInline)
        if(!this.formInline.address) {
          this.$message.error('请输入详细地址~')
          return
        }
        if(!this.formInline.phone) {
          this.$message.error('请输入手机号码~')
          return
        }
        if(!this.formInline.phone) {
          this.$message.error('请输入手机号码~')
          return
        }
        if(!this.isPhoneNumber(this.formInline.phone)) {
          this.$message.error('请输入正确的手机号')
          return
        }
        if(this.checkType) {
           if(!this.formInline.invoiceContent) {
            this.$message.error('请选择发票信息~')
            return
          }
          if(!this.formInline.invoiceName) {
            this.$message.error('请输入发票抬头~')
            return
          }
          if(!this.formInline.invoiceCode) {
            this.$message.error('输入纳税人识别号~')
            return
          }
          if(!this.formInline.invoiceDesc) {
            this.$message.error('请输入发票备注~')
            return
          }
        }
        if(!this.checkType) {
          this.formInline.invoiceType = 0
        }
        this.formInline.skuId = this.id
        if(!this.checked) {
           this.$message.error('请勾选协议~')
          return
        }
        this.$http.send(this.$api.orderSubmit, this.formInline).then(res => {
          this.$message.success('操作成功~')
          this.$router.push({name: 'playOrder', query: {id: this.id, orderId: res.data}})
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
.confirm-order {
  padding-bottom: 85px;
  h2 {
    padding: 12px 0 12px 20px;
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
    margin-top: 16px;;
  }
}
</style>

<style lang="scss">
  .confirm-order {
    .table-wrap {
      .cell {
        text-align: center;
      }
      tbody {
        .el-table__row {
          background: #EAEBEBFF;
          height: 50px;
          color: rgba(55,61,66,1);;
        }
      }
      .el-table__header th {
          padding: 0;
          height: 32px;
          line-height: 32px;
          border-top: 1px solid rgba(230,230,230,1);
          border-bottom: 1px solid rgba(230,230,230,1);
          color: #333333FF;
        }
    }
    .info {
      background: #fff;
      border-bottom: 1px solid #E6E6E6FF;
      padding:8px 0 20px;
      .title {
       padding: 18px 0 18px 20px;
       border-bottom: 1px solid #E6E6E6FF;
       margin-bottom: 14px;
       font-weight: bold;
      }
    }
    .file {
      padding: 27px 0 30px 12px;
      font-size: 16px;
      color: #999999;
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
</style>
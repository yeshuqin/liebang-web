<template>
  <div class="goods-detail content-wrap">
    <div class="step">一级分类/二级分类</div>
    <div class="wrap">
       <div class="info">
         <div class="l">
           <img :src="detailObj.primaryPic" alt="">
         </div>
         <div class="r">
           <h1 class="font28 mb20">{{detailObj.name}}</h1>
           <div class="desc">
             <div class="desc-item">
               <span>价格：</span>
               <span class="fontImp font24">￥{{detailObj.minPrice | filterMoney}}</span>
               <span class="old-price">{{detailObj.maxPrice | filterMoney}}</span>
             </div>
             <div class="desc-item">
               <span>说明：</span>
               <span class="font333">审查时间为版权保护中心审查时间，自申请材料递至版权中心第二个工作日算起</span>
             </div>
             <div class="desc-item">
               <span>服务：</span>
               <span class="font12">
                 <i class="iconfont" style="color:#008AEDFF">&#xe64c;</i>
                 正规发票
               </span>
               <span class="font12">
                 <i class="iconfont" style="color:#FF7E00FF">&#xe641;</i>
                 品质保证
               </span>
               <span class="font12">
                 <i class="iconfont" style="color:green">&#xe615;</i>
                 售后无忧
               </span>
             </div>
           </div>
           <p class="mb20">
             <span class="font666">出货：</span>
             预计所需时间2-3个工作日
           </p>
           <ul class="attribute-list">
             <li v-for="(value, key) in attributeList" :key="key">
               <span class="title">选择{{key}}</span>
               <span class="tag" :class="{'active': attributeMap[key] === attr}" @click="handleAttr(key,attr)" v-for="attr in value" :key="attr">{{attr}}</span>
             </li>
           </ul>
           <div class="font16">
              <el-checkbox v-model="checked"></el-checkbox> 我已阅读理解并接受 <span class="fontImp">《{{detailObj.name}}服务协议》</span>
           </div>
           <div style="margin-top:27px">
             <el-button type="primary" class="btn" @click="goBuy">立即购买</el-button>
             <el-button class="btn" @click="showCounselDialog = true">
               <span class="iconfont font22">&#xe694;</span>
               专家咨询
              </el-button>
           </div>
         </div>
       </div>
       <div class="detail">
          <el-tabs v-model="activeName">
            <el-tab-pane :label="key" :name="key" v-for="(value, key) in infoList" :key="key">
              <img :src="value" alt="">
            </el-tab-pane>
          </el-tabs>
       </div>
    </div>
    <quest-dialog :showCounselDialog.sync="showCounselDialog"></quest-dialog>
  </div>
</template>

<script>
  import questDialog from '@/components/questDialog/index'
  export default {
    components: {
      questDialog
    },
    data() {
      return {
        infoList: {},
        detailObj: {},
        skuMapList: {},
        showCounselDialog: false,
        attributeList: {},
        attributeMap: {},
        activeName: '产品内容',
        checked: true,
        id: this.$route.query.id
      }
    },
    created() {
      this.getDetail()
    },
    watch: {
      $route(val) {
        this.id = val.query.id
        this.getDetail()
      }
    },
    methods: {
      handleAttr(value,attr) {
        if(this.attributeMap[value] === attr) {
          this.attributeMap[value] = ''
        }else {
          this.attributeMap[value] = attr
        }
      },
      getDetail() {
         this.$http.send(this.$api.spuDetail, {
           id: this.id
         }).then(res => {
           this.detailObj = res.data
           this.infoList = JSON.parse(res.data.introduction)
           let ObjMap = {}
           res.data.skuList.forEach(item => {
              this.skuMapList[item.attribute] = item
              let obj = JSON.parse(item.attribute)
              for(let i in obj) {
                if(!(ObjMap[i] instanceof Array)) {
                  ObjMap[i] = []
                }
                if(!ObjMap[i].includes(obj[i])) {
                  ObjMap[i].push(obj[i])
                }
              }
            })
            this.attributeList = ObjMap
            console.log(ObjMap, 'ObjMap')
            for(let attr in ObjMap) {
              this.$set(this.attributeMap, attr, ObjMap[attr][0])
            }
          })
      },
      goBuy() {
        for(let attr in this.attributeMap) {
          if(!this.attributeMap[attr]) {
            this.$message.error(`${attr}属性不能为空~`)
            return 
          }
        }
        if(!this.checked) {
           this.$message.error('请勾选协议~')
            return 
        }
        let attributeValue = JSON.stringify(this.attributeMap)
        let skuId = this.skuMapList[attributeValue] ? this.skuMapList[attributeValue].id : ''
        if(!skuId) {
          this.$message({
            type: 'warning',
            // message: ''暂时缺货~
          })
          return 
        }
        // console.log(attributeValue, skuId)
        this.$router.push({name: 'confirmOrder', query: {id: skuId}})
      }
    }
  }
</script>

<style lang="scss" scoped>
.goods-detail {
 .step {
   margin: 16px 0 29px 0;
 }
 .wrap {
   background: #ffffff;
   padding: 30px;
   margin-bottom: 30px;
   .info {
     display: flex;
     .l {
       width: 450px;
       height: 450px;
       background: #eee;
       img {
         width: 450px;
         height: 450px;
       }
     }
     .r {
       flex: 1;
       padding-left: 40px;
     }
   }
   .desc {
     height:108px;
     padding-left: 12px;
     padding-top: 8px;
     border: 1px solid #E0E0E0FF;
     margin-bottom: 10px;
     width: 660px;
     box-sizing: border-box;
     background: #FAFAFAFF;
     color: #666666;
     .old-price {
       text-decoration: line-through;
       font-size: 12px;
       margin-left: 6px;
       color: #999999;
     }
     .desc-item {
       margin-bottom: 6px;
     }
     .iconfont {
       font-size: 14px;
     }
     .font12 {
       margin-right: 12px;
     }
   }
   .detail {
     margin-top: 100px;
     img {
       width: 80%;
       margin: 0 auto;
       display: block;
     }
   }
   .attribute-list {
     margin-bottom: 30px;
     .title {
       width: 80px;
       display: inline-block;
       margin-right: 10px;
       font-size: 16px;
       color:rgba(160,160,160,1);
     }
     .tag {
       height: 30px;
       line-height: 30px;
       border: 1px solid #CCCCCCFF;
       text-align: center;
       display: inline-block;
       color: rgba(141,141,141,1);
       padding: 0 12px;
       width: 110px;
       box-sizing: border-box;
       margin-right: 10px;
       margin-bottom: 10px;
       cursor: pointer;
       &.active {
         color: #FF5C00FF;
         border-color: #FF5C00FF;
       }
     }
   }
   .btn {
     width: 218px;
     height: 54px;
     left: 54px;
     padding: 0;
     font-size: 16px;
     margin-right: 30px;
   }
 }
}
</style>

<style lang="scss">
  .goods-detail {
    .el-tabs .el-tabs__item {
      color:rgba(175,175,175,1);
      font-size: 18px;
    }
    .el-tabs .el-tabs__item.is-active {
      color: #FE6A00;
    }
    .el-tabs__item {
      height: 55px;
      line-height: 55px;
    }
  }
</style>
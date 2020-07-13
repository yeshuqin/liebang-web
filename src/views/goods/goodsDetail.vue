<template>
  <div class="goods-detail content-wrap">
    <div class="step">一级分类/二级分类</div>
    <div class="wrap">
       <div class="info">
         <div class="l">
           <img src="https://file2.pingxiaobao.com/dev/2006/29/97e9b67ae59b01ba50308c09b78a55ee.jpg" alt="">
         </div>
         <div class="r">
           <h1 class="font28 mb20">计算机软件著作权登记申请</h1>
           <div class="desc">
             <div class="desc-item">
               <span>价格：</span>
               <span class="fontImp font24">￥1499</span>
               <span class="old-price">1200</span>
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
              <el-checkbox v-model="checked"></el-checkbox> 我已阅读理解并接受 <span class="fontImp">《计算机软件著作登记申请相关协议》</span>
           </div>
           <div style="margin-top:27px">
             <el-button type="primary" class="btn">立即购买</el-button>
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
        infoList: {
          '产品内容': 'https://file2.pingxiaobao.com/dev/2006/29/97e9b67ae59b01ba50308c09b78a55ee.jpg',
          '产品作用': 'https://file2.pingxiaobao.com/dev/2006/29/97e9b67ae59b01ba50308c09b78a55ee.jpg',
          '服务优势': 'https://file2.pingxiaobao.com/dev/2006/29/97e9b67ae59b01ba50308c09b78a55ee.jpg',
          '办理流程': 'https://file2.pingxiaobao.com/dev/2006/29/97e9b67ae59b01ba50308c09b78a55ee.jpg',
          '所需资料': 'https://file2.pingxiaobao.com/dev/2006/29/97e9b67ae59b01ba50308c09b78a55ee.jpg',
          '常见问题': 'https://file2.pingxiaobao.com/dev/2006/29/97e9b67ae59b01ba50308c09b78a55ee.jpg',
        },
        showCounselDialog: false,
        attributeList: {
          '颜色': ['红', '绿', '蓝', '白'],
          '尺寸': ['小', '中', '大'],
          '属性': ['软', '硬']
        },
        attributeMap: {
          '颜色': '',
          '尺寸': '',
          '属性': ''
        },
        activeName: '产品内容',
        checked: true
      }
    },
    methods: {
      handleAttr(value,attr) {
        console.log(value,attr)
        if(this.attributeMap[value] === attr) {
          this.attributeMap[value] = ''
        }else {
          this.attributeMap[value] = attr
        }
        console.log(this.attributeMap)
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
   .info {
     display: flex;
     .l {
       width: 450px;
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
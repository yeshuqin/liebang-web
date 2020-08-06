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
           <!-- <ul class="attribute-list">
             <li v-for="(value, key) in attributeList" :key="key">
               <span class="title">选择{{key}}</span>
               <span class="tag" :class="{'active': attributeMap[key] === attr}" @click="handleAttr(key,attr)" v-for="attr in value" :key="attr">{{attr}}</span>
             </li>
           </ul> -->
           <!-- {{list}} -->
           <ul class="attribute-list">
             <li v-for="(item, key) in list.result" :key="key" v-bind:class="{hl: highKeys[key]}">
                <span class="title">选择{{key}}</span>
                <span class="tag" v-for="value in item" :key="value.name"
                  @click="handleActive(key, value)" v-bind:class="{active: value.active, disabled: !value.active && value.disabled}">{{value.name}}</span>
             </li>
           </ul>
          已经选择：{{ message }}
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
        id: this.$route.query.id,
        skuName: "skuId",
        data: [], //初始化数据结构
        skuId: '', // 选择的skuId
        result: {},
        list: {}, // 数据集合{list.result list.items}
        keys: [], // 属性名称信息
        message: "",
        highKeys: {},
        spliter: '\u2299'// 分隔符
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
            this.initData()
          })
      },
      goBuy() {
        if (!this.skuId) {
          this.$message.error('请选择一条sku属性~')
          return
        }
        // for(let attr in this.attributeMap) {
        //   if(!this.attributeMap[attr]) {
        //     this.$message.error(`${attr}属性不能为空~`)
        //     return 
        //   }
        // }
        if(!this.checked) {
           this.$message.error('请勾选协议~')
            return 
        }
        // let attributeValue = JSON.stringify(this.attributeMap)
        // let skuId = this.skuMapList[attributeValue] ? this.skuMapList[attributeValue].id : ''
        // if(!skuId) {
        //   this.$message({
        //     type: 'warning',
        //     // message: ''暂时缺货~
        //   })
        //   return 
        // }
        // console.log(attributeValue, skuId)
        this.$router.push({name: 'confirmOrder', query: {id: this.skuId}})
      },
      initData() {
        this.data = []
        let skuId = ''
        this.detailObj.skuList.forEach(item => {
          let skuObj = {}
          skuObj = JSON.parse(item.attribute)
          skuObj.skuId = item.id
          skuObj.salePrice = this.filterMoney(item.salePrice)
          skuObj.marketPrice = this.filterMoney(item.marketPrice)
          this.data.push(skuObj)
        })
        // for (let i = 0; i < this.data.length; i ++) {
        //     if (skuId == this.data[i][this.skuName]) {
        //         isHas = true;
        //         break
        //     }
        // }
        this.skuId = this.data[0].skuId
        console.log(this.data, 'data数据~~')
        console.log(this.skuId, 'skuId~~')
        this.initResultData()
      },
      initResultData() {
          this.result = {};
          this.keys = this.getAllKeys();
          console.log(this.keys, 'keys==')
          for (let i = 0; i < this.keys.length; i ++) {
              this.highKeys[this.keys[i]] = false;
          }
          this.list = this.combineAttr(this.data, this.keys);
          this.initSeleted(this.skuId);
          this.buildResult(this.list.items)
          this.updateStatus(this.getSelectedItem());
          this.showResult();
      },
      /**
       * 正常属性点击
       */
      handleNormalClick(key, value) {
          for (let i in this.list.result[key]) {
              if (i != value.name) {
                  this.list.result[key][i].active = false;
              } else {
                  this.list.result[key][i].active = true;
              }
          }
      },
      /**
       * 无效属性点击
       */
      handleDisableClick(key, value) {
          this.list.result[key][value.name]["disabled"] = false;
          // 清空高亮行的已选属性状态（因为更新的时候默认会跳过已选状态）
          for (let i in this.list.result) {
              if (i != key) {
                  for (let x in this.list.result[i]) {
                      this.list.result[i][x].active = false;
                  }
              }
          }
          this.updateStatus(this.getSelectedItem());
      },
      /**
       * 高亮行
       */
      highAttributes: function() {
          for (let key in this.list.result) {
              this.highKeys[key] = true;
              for (let attr in this.list.result[key]) {
                  if (this.list.result[key][attr].active === true) {
                      this.highKeys[key] = false;
                      break;
                  }
              }
          }
      },
      /**
       * 点击事件处理
       * @param  key   点击的行
       * @param  value 点击的按钮的数据
       */
      handleActive: function(key, value) {
          if (value.active == true) {
              return false;
          }
          this.handleNormalClick(key, value);
          if (value.disabled === true) {
              this.handleDisableClick(key, value);
          }
          this.updateStatus(this.getSelectedItem());
          this.highAttributes();
          this.showResult();
      },
      /**
       * 计算属性
       * @param  {[type]} data [description]
       * @param  {[type]} keys [description]
       * @return {[type]}      [description]
       */
      combineAttr(data, keys) {
          let allKeys = []
          let result = {}
          for (let i = 0; i < data.length; i++) {
              let item = data[i]
              let values = []
              for (let j = 0; j < keys.length; j++) {
                  let key = keys[j]
                  if (!result[key]) {
                      result[key] = {};
                  }
                  if (!result[key][item[key]]) {
                      result[key][item[key]] = {"name": item[key], "active": false, "disabled": true};
                  }
                  values.push(item[key]);
              }
              allKeys.push({
                  path: values.join(this.spliter),
                  sku: item['skuId']
              });
          }
          return {
              result: result,
              items: allKeys
          }
      },
      /**
       * 获取所有属性
       * @return {[type]} [description]
       */
      getAllKeys() {
          let arrKeys = [];
          for (let attribute in this.data[0]) {
              if (!this.data[0].hasOwnProperty(attribute)) {
                  continue;
              } 
              if (attribute !== this.skuName) {
                  arrKeys.push(attribute);
              }
          }
          return arrKeys;
      },
      getAttruites(arr) {
          let result = []
          for (let i = 0; i < arr.length; i++) {
              result.push(arr[i].path)
          }
          return result
      },
      /**
       * 生成所有子集是否可选、库存状态 map
       */
      buildResult(items) {
          let allKeys = this.getAttruites(items)
          for (let i = 0; i < allKeys.length; i++) {
              let curr = allKeys[i];
              let sku = items[i].sku;
              let values = curr.split(this.spliter);
              let allSets = this.powerset(values);
              // 每个组合的子集
              for (let j = 0; j < allSets.length; j++) {
                  let set = allSets[j]
                  let key = set.join(this.spliter)
                  if (this.result[key]) {
                      this.result[key].skus.push(sku)
                  } else {
                      this.result[key] = {
                          skus: [sku]
                      }
                  }
              }
          }
      },
      /**
       * 获取选中的信息
       * @return Array
       */
      getSelectedItem() {
          let result = [];
          for (let attr in this.list.result) {
              let attributeName = '';
              for (let attribute in this.list.result[attr]) {
                  if (this.list.result[attr][attribute].active === true) {
                      attributeName = attribute;
                  }
              }
              result.push(attributeName);
          }
          return result
      },
      /**
       * 更新所有属性状态
       */
      updateStatus(selected) {
          for (let i = 0; i < this.keys.length; i++) {
              let key = this.keys[i],
                  data = this.list.result[key],
                  hasActive = !!selected[i],
                  copy = selected.slice();
              for (let j in data) {
                  let item = data[j]["name"];
                  if (selected[i] == item) {
                      continue
                  }
                  copy[i] = item
                  let curr = this.trimSpliter(copy.join(this.spliter), this.spliter);
                  this.list.result[key][j]["disabled"]  = this.result[curr] ? false : true;
              }
          }
      },
      trimSpliter(str, spliter) {
          // ⊙abc⊙ => abc
          // ⊙a⊙⊙b⊙c⊙ => a⊙b⊙c
          let reLeft    = new RegExp('^' + spliter + '+', 'g');
          let reRight   = new RegExp(spliter + '+$', 'g');
          let reSpliter = new RegExp(spliter + '+', 'g');
          return str.replace(reLeft, '')
              .replace(reRight, '')
              .replace(reSpliter, spliter)
      },
      /**
       * 初始化选中
       * @param  mixed|Int|String skuId 需要选中的skuId
       * @return {[type]}       [description]
       */
      initSeleted(skuId) {
          for (let i in this.data) {
              if (this.data[i][this.skuName] == skuId) {
                  for (let x in this.data[i]) {
                      if (x !== this.skuName) {
                          this.list.result[x][this.data[i][x]].active = true;
                      }
                  }
                  break;
              }
          }
      },
      /**
       * 显示选中的信息
       * @return
       */
      showResult() {
          let result = this.getSelectedItem()
          let s = []
          for (let i = 0; i < result.length; i++) {
              let item = result[i];
              if (!!item) {
                  s.push(item)
              }
          }
          if (s.length == this.keys.length) {
              let curr = this.result[s.join(this.spliter)]
              if (curr) {
                  s = s.concat(curr.skus)
                  this.skuId = curr.skus[0];
              }
              this.message = s.join('\u3000-\u3000');
          }
      },
      powerset(arr) {
        let ps = [[]];
        for (let i = 0; i < arr.length; i++) {
            for (let j = 0, len = ps.length; j < len; j++) {
                ps.push(ps[j].concat(arr[i]));
            }
        }
        return ps;
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
       color: #333;
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
       &.disabled {
         color: #999;
         border: 1px dashed #999;
         background: #eee;
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
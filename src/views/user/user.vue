<template>
  <div class="user-wrap">
    <div class="user content-wrap">
      <left-menu></left-menu>
      <div class="content-main">
        <div class="user-info">
          <div class="user-l">
            <h2>完善主体资料 可享受更优服务</h2>
            <el-form :model="infoObj" size="mini" label-width="100px" style="width:80%;margin-top:10px">
              <el-form-item label="主体类型:">
                <el-radio-group v-model="infoObj.type">
                  <el-radio :label="1">企业</el-radio>
                  <el-radio :label="2">个人</el-radio>
                </el-radio-group>
              </el-form-item>
              <div v-if="infoObj.type === 2">
                <el-form-item label="真实姓名:">
                  <el-input v-model="infoObj.name" clearable placeholder="请输入真实姓名"></el-input>
                </el-form-item>
                <el-form-item label="身份证号码:">
                  <el-input v-model="infoObj.idCard" clearable placeholder="请输入身份证号码"></el-input>
                </el-form-item>
              </div>
              <el-form-item label="企业名称:">
                <el-input v-model="infoObj.companyName" clearable placeholder="必须填写营业执照上的企业名称"></el-input>
              </el-form-item>
              <el-form-item label="信用代码:">
                <el-input v-model="infoObj.companyCode" clearable placeholder="必须为13位或18位数字和字母（大写）"></el-input>
              </el-form-item>
              <el-form-item label="所在行业:">
                <el-select v-model="infoObj.companyCate" clearable filterable placeholder="请选择所从事的主要行业">
                  <el-option :label="item.label" :value="item.value" v-for="item in companyCateList" :key="item.value"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="企业规模:">
                <el-select v-model="infoObj.companyScale" clearable filterable placeholder="请选择您的企业规模">
                  <el-option :label="item.label" :value="item.value" v-for="item in companyScaleList" :key="item.value"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="所在职业:">
                <el-select v-model="infoObj.companyPosition" clearable filterable placeholder="请选择您的职务">
                  <el-option :label="item.label" :value="item.value" v-for="item in companyPositionList" :key="item.value"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="handleSumbit">确 定</el-button>
              </el-form-item>
            </el-form>
          </div>
          <div class="user-r"> 
              <h2>您的新手福利如下：</h2>
              <p class="tip">行业福利，名额有限，领完即止</p>
              <ul class="user-checklist">
                <el-checkbox-group v-model="checkedBox">
                    <li v-for="(item, index) in welfareList" :key="index">
                      <el-checkbox :label="item.id">{{item.name}}</el-checkbox>
                    </li>
                  </el-checkbox-group>
              </ul>
              <div style="text-align:left;margin-top:38px">
                <el-button type="primary" size="mini" class="btn" @click="goSave">一键领取福利</el-button>
              </div>
          </div>
        </div>
      </div>
    </div>
    <ad-list class="mb70" :dataList="serveList">
      <h2>行业必备服务</h2>
    </ad-list> 
    <ad-list class="mb100" :dataList="professionalList">
      <h2>专业为您推荐</h2>
    </ad-list>
    <footer-block></footer-block>
  </div>
</template>

<script>
  import leftMenu from '@/components/leftMenu/leftMenu'
  import adList from '@/components/adList/adList'
  import footerBlock from '@/components/footerBlock/footerBlock'
  export default {
    components: {
      adList,
      leftMenu,
      footerBlock
    },
    data() {
      return {
        infoObj: {
          companyCate: '',
          companyCode: '',
          companyName: '',
          companyPosition: '',
          companyScale: '',
          idCard: '',
          name: '',
          type: 1
        },
        companyCateList: [
          {
            value: '互联网金融',
            label: '互联网金融'
          },
          {
            value: '传统制造行业',
            label: '传统制造行业'
          }
        ],
        companyScaleList: [
          {
            value: '小型公司',
            label: '小型公司'
          },
          {
            value: '中型公司',
            label: '中型公司'
          },
          {
            value: '大型公司',
            label: '大型公司'
          }
        ],
        companyPositionList: [
          {
            value: '软件技术',
            label: '软件技术'
          }
        ],
        ruleForm: {
          name: '',
          region: ''
        },
        welfareList: [],
        checkedBox: [],
        serveList: [],
        professionalList: [],
        hotList: []
      }
    },
    created() {
      this.getInfor()
      this.getServeList()
      this.getProfessionalList()
      this.getNewWelfareList()
    },
    methods: {
      handleSumbit() {
        this.$http.send(this.$api.userUpdate, this.infoObj).then(res => {
           this.$message.success('操作成功~')
        })
      },
      getInfor() {
        this.$http.send(this.$api.userInfo, {}).then(res => {
           if(res.data) {
             this.infoObj = res.data
           }
        })
      },
      getServeList() {
        this.$http.send(this.$api.spuPage, {
           showcaseId: '1285837920850276354',
           current: 1,
           size: 10
         }).then(res => {
           this.serveList = res.data.records
        })
      },
      getProfessionalList() {
        this.$http.send(this.$api.spuPage, {
           showcaseId: '1284778321799933954',
           current: 1,
           size: 10
         }).then(res => {
           this.professionalList = res.data.records
        })
      },
      getNewWelfareList() {
        this.$http.send(this.$api.spuPage, {
           showcaseId: '1287036089298636802',
           current: 1,
           size: 4
         }).then(res => {
           this.welfareList = res.data.records
           this.checkedBox = this.welfareList.map(item => {
             return item.id
           })
        })
      },
      goSave() {
        this.$router.push({name: 'goodsDetail', query: {id: this.welfareList[0].id}})
      }
    }
  }
</script>

<style lang="scss" scoped>
.user {
  display: flex;
  margin-top: 11px;
  margin-bottom: 54px;
  .el-select {
    width: 100%;;
  }
}
.content-main {
  flex: 1;
  .user-info {
    display: flex;
    min-height: 400px;
    .user-l {
      width: 500px;
      background: #ffffff;
      margin-right: 20px;
      h2 {
        border-bottom: 1px solid #ECECEC;
        height: 45px;
        font-size: 16px;
        font-weight: 400;
        padding-left: 25px;
        padding-top: 14px;
      }
    }
    .user-r {
      flex: 1;
      background: #ffffff;
      padding-left: 25px;
      // width: calc(100% - 520px);
       h2 {
        height: 45px;
        font-size: 16px;
        font-weight: 400;
        padding-top: 14px;
      }
      .tip {
        color: #999999;
        margin-bottom: 22px;
      }
      .user-checklist {
        li {
          margin-bottom: 16px;
        }
      }
    }
  }
}
.mb70 {
  margin-bottom: 70px;
}
.mb100 {
  margin-bottom: 100px;
}
</style>
<template>
  <div class="user-wrap">
    <div class="user content-wrap">
      <left-menu></left-menu>
      <div class="content-main">
        <div class="user-info">
          <div class="user-l">
            <h2>完善主体资料 可享受更优服务</h2>
            <el-form :model="ruleForm" size="mini" label-width="100px" style="width:80%;margin-top:10px">
              <el-form-item label="主体类型:">
                <el-radio-group v-model="ruleForm.name">
                  <el-radio label="企业"></el-radio>
                  <el-radio label="个人"></el-radio>
                  <el-radio label="政府组织"></el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="企业名称:">
                <el-input v-model="ruleForm.name" clearable placeholder="必须填写营业执照上的企业名称"></el-input>
              </el-form-item>
              <el-form-item label="信用代码:">
                <el-input v-model="ruleForm.name" clearable placeholder="必须为13位或18位数字和字母（大写）"></el-input>
              </el-form-item>
              <el-form-item label="所在行业:">
                <el-select v-model="ruleForm.region" clearable filterable placeholder="请选择所从事的主要行业">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="企业规模:">
                <el-select v-model="ruleForm.region" clearable filterable placeholder="请选择您的企业规模">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="所在职业:">
                <el-select v-model="ruleForm.region" clearable filterable placeholder="请选择您的职务">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
              </el-form-item>
            </el-form>
          </div>
          <div class="user-r"> 
              <h2>您的新手福利如下：</h2>
              <p class="tip">行业福利，名额有限，领完即止</p>
              <ul class="user-checklist">
                <el-checkbox-group v-model="checkedBox">
                    <li>
                      <el-checkbox :label="1">网络文化经营许可证</el-checkbox>
                    </li>
                    <li>
                      <el-checkbox :label="2">ICP许可证（互联网信息服务许可证）</el-checkbox>
                    </li>
                    <li>
                      <el-checkbox :label="3">IT公司注册</el-checkbox>
                    </li>
                    <li>
                      <el-checkbox :label="4">企业社保代缴</el-checkbox>
                    </li>
                  </el-checkbox-group>
              </ul>
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
        ruleForm: {
          name: '',
          region: ''
        },
        checkedBox: [1, 2],
        serveList: [],
        professionalList: [],
        hotList: []
      }
    },
    created() {
      this.getServeList()
      this.getProfessionalList()
    },
    methods: {
      submitForm() {

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
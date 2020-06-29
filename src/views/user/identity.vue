<template>
  <div class="identity-wrap content-wrap">
    <left-menu></left-menu>
    <div class="identity-main">
        <h3 class="title">企业实名认证</h3>
        <el-steps :active="active" class="tab-list">
          <el-step title="上传企业信息" icon="iconfont iconqiyexinxi">
            <slot name="icon">嘻嘻嘻</slot>
          </el-step>
          <el-step title="上传法人信息" icon="iconfont iconcardid"></el-step>
          <el-step title="确认企业信息" icon="iconfont iconquerenhetongquerenhetongqueding"></el-step>
          <el-step title="认证审核结果" icon="iconfont iconshenhe"></el-step>
        </el-steps>
        <step1 v-show="active === 0" @handleGoStep="handleGoStep"></step1>
        <step2 v-show="active === 1" @handleGoStep="handleGoStep"></step2>
        <step3 v-show="active === 2" @handleGoStep="handleGoStep"></step3>
        <step4 v-show="active === 3"></step4>
    </div>
  </div>
</template>

<script>
  import leftMenu from '@/components/leftMenu/leftMenu'
  import step1 from './components/step1'
  import step2 from './components/step2'
  import step3 from './components/step3'
  import step4 from './components/step4'
  export default {
    components: {
      leftMenu,
      step1,
      step2,
      step3,
      step4
    },
    data() {
      return {
        active: 3
      }
    },
    methods: {
      handleGoStep(active) {
        this.active = active
      }
    }
  }
</script>

<style lang="scss" scoped>
.identity-wrap {
  display: flex;
  margin-top: 11px;
  margin-bottom: 100px;
  .identity-main {
    flex: 1;
    background: #ffffff;
    padding-bottom: 60px;
    .title {
      height: 46px;
      line-height: 46px;
      border-bottom: 1px solid #D9D9D9;
      padding-left: 24px;
    }
    .tab-list {
      padding: 10px 24px 0;
      height: 60px;
    }
  }
}
</style>
<style lang="scss">
   .identity-wrap {
    .btn {
      width: 200px;
      height: 48px;
      line-height: 48px;
    }
    .identity-upload {
        width:397px;
        height:179px;
        .el-upload--picture-card {
          width:397px;
          height:179px;
          line-height: inherit;
          border-radius:1px;
          padding-top: 40px;
          color: #666666;
          border:1px solid rgba(211,211,211,1);
        }
      }
    .alert {
      width: 100%;
      font-size: 16px;
      background:rgba(255,249,244,1);
      height: 46px;
      line-height: 46px;
      padding-left: 24px;
      font-weight:500;
    } 
    .tip-text {
      padding: 16px 0;
      margin-bottom: 0 !important;
      color: #333333;
    }
    .el-step__main {
        white-space: normal;
        text-align: left;
        z-index: 1;
        padding: inherit;
        position: relative;
        top: -30px;
        z-index: 1;
        left: 35px;
      }
      .el-step__icon.is-icon {
        width: 140px;
        text-align: left;
        align-items: initial;
        justify-content: initial;
        padding-left: 5px;
      }
      .el-step__icon-inner {
        font-size: 24px;
      }
      .el-step__title.is-finish {
        color: #FE6A00;
      }
      .el-step__head.is-finish {
        color: #FE6A00;
        border-color:#FE6A00;
      }
   
   }
</style>
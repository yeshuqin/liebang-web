<template>
   <div class="step2">
      <div class="alert">
        上传法人信息，请上传法人身份证信息
      </div>
      <el-row style="padding:10px 24px">
        <el-col :span="12"> 
          <p class="tip-text">法人身份证正面</p>
          <Upload class="identity-upload" :limit="20" :show-file-list="false">
            <p>请上传身份证正面</p>
          </Upload>
          <p class="tip-text">请上传身份证反面</p>
          <Upload class="identity-upload" :limit="20" :show-file-list="false">
            <p>请上传身份证反面</p>
          </Upload>
        </el-col>
        <el-col :span="12">
          <h2>证件要求：</h2>
          <p>1.请上传法人身份证正面头部照片。</p>
          <p>2.必须看清证件信息，且证件信息不能杯遮挡。</p>
          <p>3.仅支持.jpg.bmp.png.gif的图片格式。</p>
          <p>4.图片大小不超过4M，长宽4096px以内。</p>
          <p>5.您提供的照片我们将予以保护，不会用于其他用途。</p>
        </el-col>
      </el-row>
      <div style="text-align:center;margin-top:90px">
        <el-button type="primary" class="btn" @click="handleGoStep">下一步</el-button>
      </div>
    </div>
</template>

<script>
  import Upload from '@/components/Upload/index'
  export default {
    components: {
      Upload
    },
    data() {
      return {
      }
    },
    methods: {
      goIdentity() {
        this.$router.push({name: 'identity'})
      },
      handleGoStep() {
        this.$emit('handleGoStep', 2)
      }
    }
  }
</script>

<style lang="scss" scoped>
.step2 {
    h2 {
      margin-bottom: 20px;
      font-size: 16px;
      color: #333333;
    }
    p {
      color: #666666;
      margin-bottom: 20px;
      font-size: 16px;
    }
}
</style>
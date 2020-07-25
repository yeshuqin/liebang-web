<template>
   <div class="step2">
      <div class="alert">
        上传法人信息，请上传法人身份证信息
      </div>
      <el-row style="padding:10px 24px">
        <el-col :span="12"> 
          <p class="tip-text">法人身份证正面</p>
           <Upload class="identity-upload" :limit="20" :show-file-list="false" :image-url="idFrontageFile" @handleSuccess="handleSuccessFrontage">
            <p>请上传身份证正面</p>
          </Upload>
          <p class="tip-text">上传身份证反面</p>
          <Upload class="identity-upload" :limit="20" :show-file-list="false" :image-url="idReverseFile" @handleSuccess="handleSuccessReverse">
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
        <el-button class="btn mr20" @click="handleGoBack">上一步</el-button>
        <el-button type="primary" class="btn" @click="handleGoStep">下一步</el-button>
      </div>
    </div>
</template>

<script>
  import Upload from '@/components/Upload/index'
  export default {
    props: {
      idFrontageFile: {
        type: String,
        default: ''
      },
      idReverseFile: {
        type: String,
        default: ''
      }
    },
    components: {
      Upload
    },
    data() {
      return {
      }
    },
    methods: {
      handleSuccessFrontage(response) {
        this.idFrontageFile = response.data
      },
      handleSuccessReverse(response) {
        this.idReverseFile = response.data
      },
      handleGoStep() {
        if(!this.idFrontageFile) {
          this.$message.error('请上传身份证正面~')
          return
        }
        if(!this.idReverseFile) {
          this.$message.error('请上传身份证反面~')
          return
        }
        this.$emit('handleGoStep', 3, {
          idFrontageFile: this.idFrontageFile,
          idReverseFile: this.idReverseFile
        })
      },
      handleGoBack() {
        this.$emit('handleGoStep', 1, {})
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
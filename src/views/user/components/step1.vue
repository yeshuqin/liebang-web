<template>
   <div class="step1">
      <div class="step1-tip">
        <h2 class="font333">这是一项身份识别服务，请注意以下几点：</h2>
        <p>1.请确保您是具有法人资格的商户，您需要提供可证明您依法设立、依法经营、开展社会活动的执照、证件等（如营业执照）。</p>
        <p>2.证件有效期在3个月内的商户，请找工商部门更新资料后再行提交。</p>
        <p>
          3.根据《根据中华人民共和国发票管理办法》相关规定：所有单位和从事生产、经营活动的个人在购买商品、接受服务以及从事其他经营活动支付款项，应当向收款方取得发票，取得发票时不得要求变更与实际经营情况不符的开票信息。因此防止虚开，要求开具企业与实名认证的主体对应，个人实名认证，只能开具个人发票，谢谢配合！
        </p>
      </div>
      <div class="alert">
        上传企业信息，若法人为外籍人员请 <span class="fontImp">咨询客服</span>
      </div>
      <el-row style="padding:10px 24px">
        <p class="tip-text">营业执照（仅支持三证合一）</p>
        <el-col :span="12"> 
          <Upload class="identity-upload" :limit="20" :show-file-list="false" :image-url="companyFile" @handleSuccess="handleSuccess">
            <p>请上传营业执照</p>
          </Upload>
        </el-col>
        <el-col :span="12" class="upload-tip">
          <h2>证件要求：</h2>
          <p>1.必须为清晰、完整的彩色原件扫描件或数码照。</p>
          <p>2.仅支持.jpg.bmp.png.gif的图片格式，图片大小不超过4m。</p>
          <p>3.必须在有效期内且年检章齐全（当年成立的公司可无年检章）。</p>
          <p>4.必须为中国大陆工商局颁发。</p>
        </el-col>
      </el-row>
      <div style="text-align:center;margin-top:90px">
        <el-button class="btn mr20" disabled>上一步</el-button>
        <el-button type="primary" class="btn" @click="handleGoStep">下一步</el-button>
      </div>
    </div>
</template>

<script>
  import Upload from '@/components/Upload/index'
  export default {
    props: {
      companyFile: {
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
    mounted() {
    },
    methods: {
      handleSuccess(response) {
        this.companyFile = response.data
      },
      handleGoStep() {
        if(!this.companyFile) {
          this.$message.error('请上传营业执照~')
          return
        }
        this.$emit('handleGoStep', 2, {
          companyFile: this.companyFile
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
.step1 {
  .step1-tip {
    margin:10px 24px;
    background:rgba(243,243,243,1);
    padding: 10px;
    h2 {
      margin-bottom: 8px;
    }
    p {
      color: #666666;
      line-height: 22px;
      font-size: 13px;
    }
  }
  .upload-tip {
    font-size: 16px;
    h2 {
      margin-bottom: 20px;
      color: #333333;
    }
    p {
      color: #999999;
      margin-bottom: 20px;
    }
  }
}
</style>
<template>
  <div class="upload-file-wrap content-wrap">
    <div class="step"> 
      进度查询/上传资料
    </div>
    <h2 class="title-warp">计算机软即著作申请</h2> 
    <div class="upload-list">
      <div class="upload-item" v-for="(item, index) in 10" :key="item">
          <span class="index">{{index+1}}</span>
          <el-button class="status-btn" size="small">未上传</el-button>
          <p class="tip">请填写申请书</p>
          <div class="img-wrap">
            <img src="https://file2.pingxiaobao.com/dev/2006/29/97e9b67ae59b01ba50308c09b78a55ee.jpg" alt="">
          </div>
          <div class="btn-wrap">
             <el-button size="mini" @click="handleUpload"><i class="iconfont">&#xe723;</i>下载模版</el-button>
             <el-button size="mini" @click="handleUpload"><i class="iconfont">&#xe71d;</i>上传文件</el-button>
          </div>
      </div>
    </div>

    <!-- 上传文件 -->
    <el-dialog title="上传文件" :visible.sync="showFileDialog" append-to-body="true" close-on-click-modal="false" custom-class="showFileDialog">
      <div class="download-wrap">
        <el-row>
          <el-col :span="1">
             <i class="iconfont fontImp">&#xe723;</i>
          </el-col>
          <el-col :span="23">
            <span class="font666">下载模版</span>(计算机软即著作申请)
            <p>为提高导入的成功率，请下载并使用系统提供的模版。</p>
            <el-button type="primary" size="mini"><i class="iconfont">&#xe723;</i>下载模版</el-button>
          </el-col>
        </el-row>
      </div>
      <div class="upload-wrap">
        <el-row>
          <el-col :span="1">
             <i class="iconfont fontImp">&#xe71d;</i>
          </el-col>
          <el-col :span="23">
            <span class="font666">上传文件</span>
            <p class="font12">仅支持xlsx、xls、csv，文件大小≤4M。</p>
            <el-button size="mini"><i class="iconfont">&#xe71d;</i>上传文件</el-button>
          </el-col>
        </el-row>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showFileDialog = false" size="mini">取 消</el-button>
        <el-button type="primary" @click="showFileDialog = false" size="mini">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        showFileDialog: false
      }
    },
    methods: {
      handleUpload() {
        this.showFileDialog = true
      }
    }
  }
</script>

<style lang="scss" scoped>
.upload-file-wrap {
  margin-bottom: 20px;
  .step {
    font-weight: 400px;
    margin-top: 16px;
  }
  .title-warp {
    margin: 12px 0;
  }
  .upload-list {
    padding: 30px 20px 16px 20px;
    background: #ffffff;
    overflow: hidden;
    .upload-item {
      width:276px;
      height:274px;
      border-radius:2px;
      border:1px solid rgba(204,204,204,1);
      float: left;
      margin-right: 18px;
      margin-bottom: 14px;
      text-align: center;
      padding-top:20px;
      box-sizing: border-box;
      position: relative;
      .index {
        position: absolute;
        width:28px;
        height:28px;
        background:rgba(0,146,255,1);
        text-align: center;
        line-height: 28px;
        border-radius: 50%;
        color: #ffffff;
        font-size: 12px;
        top:18px;
        left: 20px;
      }
      .img-wrap {
        width:104px;
        height:104px;
        margin: 14px auto 27px;
        border-radius:4px;
        border:1px solid rgba(0,0,0,0.15);
        display: flex;
        justify-content: center;
        align-items: center;
        img {
          width: 88px;
          height: 88px;
        }
      }
      .tip {
        color: #666666;
        margin-top: 6px;
      }
      .status-btn {
        width:70px;
        height:27px;
        background:rgba(245,245,245,1);
        border-radius:4px;
        line-height: 27px;
        color: #B7B7B7;
        border: none;
        padding: 0;
      }
      .iconfont {
        font-size: 12px;
        color:rgba(0,0,0,0.65);
        margin-right: 5px;
      }
    }
    .upload-item.active {
        .tip {
          color: #999999;
        }
        .status-btn {
          color: #ffffff;
          background: #FE6A00;
        }
      }
     .upload-item:nth-child(4n) {
       margin-right: 0;
     }
     .el-button--default, .el-button--default:hover {
        color:rgba(0,0,0,0.65);
        border:1px solid rgba(217,217,217,1)
     }
  }
}
</style>

<style lang="scss">
  .showFileDialog {
     .download-wrap {
       margin-bottom: 30px;
     }
    .iconfont.fontImp {
      font-size: 20px;
      margin-right: 8px;
    }
    .iconfont {
      margin-right: 5px;
    }
    p {
      color:rgba(0,0,0,0.45);
      margin: 6px 0 10px 8px;
    }
    .el-button--default, .el-button--default:hover {
        color:rgba(0,0,0,0.65);
        border:1px solid rgba(217,217,217,1);
     }
     .el-button--primary, .el-button--primary:hover {
       background: #1890FF !important;
       border-color: #1890FF !important;
       color: #ffffff;
     }
  }
</style>
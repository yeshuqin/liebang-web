<template>
  <div class="upload-file-wrap content-wrap">
    <div class="step"> 
      上传资料
    </div>
    <h2 class="title-warp">{{infoObj.skuName}}</h2> 
    <div class="upload-list">
        <div v-for="(item, index) in materialList" :key="index" class="upload-item" :class="{active: item.status === 1}" >
          <span class="index">{{index+1}}</span>
          <el-button class="status-btn" size="small">{{item.status === 0 ? '未上传' : '已完成'}}</el-button>
          <p class="tip">{{item.name}}</p>
          <div class="img-wrap">
            <img :src="item.picUrl" alt="">
          </div>
          <div class="btn-wrap">
              <el-button size="mini">
                <a :href="item.templateUrl">
                <i class="iconfont">&#xe723;</i>下载模版</a>
              </el-button>
             <el-button size="mini" @click="handleUpload(item)"><i class="iconfont">&#xe71d;</i>上传文件</el-button>
          </div>
        </div>
    </div>
    <!-- 上传文件 -->
    <el-dialog title="上传文件" :visible.sync="showFileDialog" :append-to-body="true" :close-on-click-modal="false" custom-class="showFileDialog">
      <div class="download-wrap">
        <el-row>
          <el-col :span="2">
             <i class="iconfont fontImp">&#xe723;</i>
          </el-col>
          <el-col :span="22">
            <span class="font666">下载模版</span>({{infoObj.skuName}})
            <p>为提高导入的成功率，请下载并使用系统提供的模版。</p>
            <el-button type="primary" size="mini">
              <a :href="fileObj.templateUrl"><i class="iconfont">&#xe723;</i>下载模版</a>
            </el-button>
          </el-col>
        </el-row>
      </div>
      <div class="upload-wrap">
        <el-row>
          <el-col :span="2">
             <i class="iconfont fontImp">&#xe71d;</i>
          </el-col>
          <el-col :span="22">
            <span class="font666">上传文件</span>
            <p class="font12">仅支持xlsx、xls、csv，文件大小≤4M。</p>
             <el-upload
              :action="$api.uploadFile"
              name="file"
              :limit="1"
              :on-remove="handleFileRemove"
              :on-error="handleError"
              :headers="headers"
              :before-upload="beforeUpload"
              :on-success="handleFileSuccess"
              :file-list="fileList"
            >
              <el-button size="mini"><i class="iconfont">&#xe71d;</i>上传文件</el-button>
            </el-upload>
          </el-col>
        </el-row>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showFileDialog = false" size="mini">取 消</el-button>
        <el-button type="primary" @click="handleSumbit" size="mini">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        showFileDialog: false,
        infoObj: {},
        materialList: [],
        id: this.$route.query.id,
        fileObj: {
          fileUrl: '',
          id: '',
          templateUrl: ''
        },
        headers: {
          token: localStorage.getItem('token')
        },
        fileList: []
      }
    },
    created() {
      this.getDetail()
    },
    watch: {
      showFileDialog(val) {
        this.fileList = []
      }
    },
    methods: {
      handleUpload(row) {
        this.showFileDialog = true
        this.fileObj = row
      },
      handleFileSuccess(response, file, fileList) { //材料上传资料
        if(response.code === 0) {
          this.fileObj.fileUrl = response.data
          this.fileObj.fileName = file.name
        }else {
          if (response.code === 40001) {
            localStorage.removeItem('token')
            this.$router.push({name: 'login'})
              location.reload()
          }
          this.$message.error(response.msg, 5000)
        }
      },
      beforeUpload(file) {
         console.log(file)
            var testmsg = file.name.substring(file.name.lastIndexOf('.')+1)
            const extension = testmsg === 'xls'
            const extension2 = testmsg === 'xlsx'
            const extension3 = testmsg === 'csv'
            const isLt4M = file.size / 1024 / 1024 < 4
            if(!extension && !extension2 && !extension3) {
                this.$message({
                    message: '上传文件只能是 xlsx、xls、csv格式!',
                    type: 'warning'
                });
            }
            if(!isLt4M) {
                this.$message({
                    message: '上传文件大小不能超过 4MB!',
                    type: 'warning'
                });
            }
            return (extension || extension2) && isLt4M
      },
      handleFileRemove() {
        this.fileObj.fileUrl = ''
      },
      handleError() {

      },
      handleSumbit() {
        this.$http.send(this.$api.orderUpload, {
          id: this.id,
          materialList: [this.fileObj]
        }).then(res => {
          this.$message.success('上传成功~')
          this.showFileDialog = false
          this.getDetail()
        })
      },
      getDetail() {
        this.$http.send(this.$api.orderDetail, {
          id: this.id
        }).then(res => {
          this.infoObj = res.data
          this.materialList = res.data.materialList || []
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
.upload-file-wrap {
  margin-bottom: 20px;
  .btn-wrap {
    a {
      color: rgba(0, 0, 0, 0.65) !important;
    }
  }
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
<template>
   <!-- 咨询弹框 -->
      <el-dialog title="咨询专家" :visible.sync="showCounselDialog" width="700px" :append-to-body="true" :close-on-click-modal="false" custom-class="counse-dialog" :before-close="closeDialog">
        <div class="body">
            <el-form :model="counseFrom" size="medium" label-width="100px">
              <el-form-item label="咨询内容：" required>
                <el-input v-model="counseFrom.content" type="textarea" :rows="6"></el-input>
              </el-form-item>
              <el-form-item label="咨询问题：" required>
                <el-select v-model="counseFrom.type" filterable clearable placeholder="请选择" style="width:100%;">
                  <el-option
                    v-for="item in typeItems"
                    :key="item.label"
                    :label="item.label"
                    :value="item.label"
                  />
                </el-select>
              </el-form-item>
              <el-form-item label="联系方式：" required>
                <el-input v-model="counseFrom.phone" placeholder="请输入手机号"></el-input>
               <div class="clearfix mt10">
                  <el-input v-model="counseFrom.verifyCode" class="fl" auto-complete="new-password" placeholder="请输入验证码" style="width:210px;">
                   </el-input>
                   <span class="code-btn fr" @click="handleSendCode">
                     <span v-if="!disabledCode">发送验证码</span>
                     <span v-else><span class="fontImp">{{time}}</span> 秒重新发送</span>
                   </span>
                </div>
              </el-form-item>
            </el-form>
            <el-button type="primary" class="btn" @click="handleSumbit">预约咨询</el-button>
        </div>
        <div class="footer">

        </div>
      </el-dialog>
</template>

<script>
  export default {
    watch: {
      showCounselDialog(val) {
        if(val) {
            clearInterval(this.timer);  
            this.disabledCode = false 
            this.time = 60
            this. counseFrom = {
              content: '',
              phone: '',
              type: '',
              verifyCode: ''
            }
        }
      }
    }, 
    props: {
      showCounselDialog: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        counseFrom: {
          content: '',
          phone: '',
          type: '',
          verifyCode: ''
        },
        typeItems: [
          {
            label: '产品售前咨询'
          },
          {
            label: '资料审核问题'
          },
          {
            label: '其他'
          }
        ],
        disabledCode: false,
        timer: null,
        time: 60
      }
    },
    mounted() {
    },
    methods: {
      closeDialog() {
        this.$emit('update:showCounselDialog', false)
      },
      handleSumbit() {
        if(!this.counseFrom.content) {
          this.$message.error('请输入咨询内容')
          return
        }
        if(!this.counseFrom.type) {
          this.$message.error('请选择咨询问题')
          return
        }
        if(!this.counseFrom.phone) {
          this.$message.error('请输入手机号')
          return
        }
        if(!this.isPhoneNumber(this.counseFrom.phone)) {
          this.$message.error('请输入正确的手机号')
          return
        }
        if(!this.counseFrom.type) {
          this.$message.error('请选择咨询问题')
          return
        }
        if(!this.counseFrom.verifyCode) {
          this.$message.error('请输入验证码')
          return
        }
        this.$http.send(this.$api.userAfq, this.counseFrom).then(res => {
           this.$message.success('操作成功')
           this.$emit('update:showCounselDialog', false)
        })
      },
      handleSendCode() { // 发送验证码
        if(!this.isPhoneNumber(this.counseFrom.phone)) {
          this.$message.error('请输入正确的手机号')
          return
        }
        if(this.disabledCode) {
          return
        }
        this.disabledCode = true
        this.$http.send(this.$api.code, {
          phone: this.counseFrom.phone,
          type: 4
        }).then(res => {
           this.timer = setInterval(() => {
            if(this.time == 1){
              clearInterval(this.timer);  
              this.disabledCode = false 
              this.time = 60
            }else{
              this.time--;
            }
          }, 1000)
        })
      }
    }
  }
</script>

<style lang="scss">
  .counse-dialog {
    width:691px;
    box-shadow:0px 4px 12px 0px rgba(0,0,0,0.2);
    border-radius:4px;
    .el-dialog__header {
      color: #000;
      font-weight: bold;
      border: 1px solid rgba(0,0,0,0.09);
    }
    .el-dialog__body {
      padding: 0;
    }
    .body {
      padding: 22px 120px 38px 80px;
    }
    .btn {
      margin-left: 100px;
      width: calc(100% - 100px);
      height: 40px;
      line-height: 40px;
      padding: 0;
    }
    .footer {
      height: 75px;
      width: 100%;
      background-image: url('../../assets/img/question-bg.png');
      background-size: 100% 100%;
    }
    .code-btn {
      width:144px;
      height:40px;
      line-height: 40px;
      text-align: center;
      color: #999999;
      display: inline-block;
      background:rgba(255,255,255,1);
      border-radius:4px;
      border:1px solid rgba(0,0,0,0.15);
      cursor: pointer;
    }
  }
</style>
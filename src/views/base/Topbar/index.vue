<template>
  <div class="topbar">
    <div class="topbar_banner">
      <a :href="linkUrl" target="_blank">
        <img :src="topbannerUrl" alt="">
      </a>
    </div>
    <el-row class="topbar_desc">
      <el-col :span="12" class="l">
        <div>深圳站</div>
      </el-col>
      <el-col :span="12" class="r">
        <span @click="goLogin">{{isLogin ? '欢迎您，' + name : '请登录' }}</span>
        <span @click="goIndex">首页</span>
        <span @click="goUser">个人中心</span>
        <!-- <span @click="goOrder">我的订单</span> -->
        <span @click="goAsk">客户服务</span>
        <span @click="goLogout" v-if="isLogin">退出</span>
      </el-col>
    </el-row>
    <div class="topbar_search">
      <div class="logo" @click="goIndex">
        <img :src="require('@/assets/img/logo.png')" alt="">
      </div>
      <div class="search_wrapper">
        <!-- <el-input v-model="input" placeholder="请输入内容">
           <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input> -->
        <el-select
          v-model="value"
          filterable
          remote
          reserve-keyword
          clearable
          placeholder="请输入关键词"
          :remote-method="remoteMethod"
          :loading="loading">
          <el-option
            v-for="item in options"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
        <div class="search-input" @click="handleSearch">
          <span class="el-icon-search"></span>
        </div>
        <div class="hot-tag">
          <span>热门搜索:</span>
          <span>工商服务</span>
          <span>商标注册</span>
          <span>专利申请</span>
          <span>项目申报</span>
        </div>
      </div>
    </div>
    <quest-dialog :showCounselDialog.sync="showCounselDialog"></quest-dialog>
  </div>
</template>

<script>
  import questDialog from '@/components/questDialog/index';
  let url = '../../../assets/img/banner.png'
  export default {
    components: {
      questDialog
    },
    data(){
      return {
        isLogin: localStorage.getItem('token') || '',
        showCounselDialog: false,
        input: '',
        loading: false,
        value: '',
        options: [],
        name: localStorage.getItem('name') || localStorage.getItem('phone'),
        topbannerUrl: '',
        linkUrl: ''
      }
    },
    created() {
      this.getTopBanner()
    },
    methods: {
      getTopBanner() {
         this.$http.send(this.$api.bannerList, {
           code: '001',
           number: 1
         }).then(res => {
           this.topbannerUrl = res.data.length > 0 ? res.data[0].picUrl : 'https://liebang.oss-cn-shenzhen.aliyuncs.com/images/2800669529145915.png'
           this.linkUrl = res.data.length > 0 ? res.data[0].linkUrl : ''
        })
      },
      remoteMethod(query) {
        if (query !== '') {
          this.loading = true;
          setTimeout(() => {
            this.loading = false;
            this.$http.send(this.$api.spuPage, {
              name: query,
              size: 10,
              current: 1
            }).then(res => {
              this.options = res.data.records
            })
          }, 200);
        } else {
          this.options = [];
        }
      },
      goUser() {
        if(this.isLogin) {
          this.$router.push({name: 'user'})
          return
        }
        this.$confirm('你还未登录，是否跳转到登录页?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(() => {
          this.$router.push({name: 'login'})
        }).catch(() => {

        });
      },
      goIndex() {
        this.$router.push({name: 'index'})
      },
      goLogin() {
        if(this.isLogin) {
          return
        }
        this.$router.push({name: 'login'})
      },
      goAsk() {
         if(this.isLogin) {
          this.showCounselDialog = true
          return
        }
        this.$confirm('你还未登录，是否跳转到登录页?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(() => {
          this.$router.push({name: 'login'})
        }).catch(() => {

        });
      },
      handleSearch() {
        if(!this.value) {
          this.$message.error('请输入关键字')
          return
        }
        this.$router.push({name: 'goodsDetail', query: {id: this.value}})
      },
      goLogout() {
        this.$confirm('是否确定退出登录?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(() => {
          this.$http.send(this.$api.logout, {}).then(res => {
              localStorage.removeItem('token')
              this.$message.success('退出成功')
              this.$router.push({name: 'login'})
              location.reload()
            })
        }).catch(() => {

        });
      }
    },
    mounted() {
    }
  }
</script>

<style lang="scss">
.topbar {
  background: #fff;
  .topbar_banner {
    height: 80px;
    background: #FF6B01FF;
    img {
      width: 100%;
      height: 80px;
      display: block;
      margin: 0 auto;
    }
  }
  .topbar_desc {
    width: 1200px;
    margin: 0 auto;
    height: 50px;
    line-height: 50px;
    color: #4A4A4A;
    font-size: 12px;
    .r {
      text-align: right;
      span {
        cursor: pointer;
        margin-right: 30px;
      }
      span:last-child {
        margin: 0;
      }
    }
  }
  .topbar_search {
    width: 1200px;
    margin: 0 auto;
    padding: 14px 0;
    .logo {
      display: inline-block;
      width: 120px;
      // height: 22.5px;
      // background: #FE6A00;
      // background:url('../../../assets/img/logo.png') ;
      // background-size: 100% 100%;
      margin-right: 40px;
      position: relative;
      cursor: pointer;
      top: -32px;
      img {
        width: 100%;
      }
    }
    .search_wrapper {
      display: inline-block;
    }
     .el-input__inner {
      width:450px;
      height:40px;
      background:rgba(255,255,255,1);
      border-radius:1px;
      border:1px solid rgba(204,204,204,1);
     }
     .search-input {
      height:40px;
      width: 80px;
      background:#FE6A00;
      border-radius:1px;
      text-align: center;
      line-height: 40px;
      display: inline-block;
      cursor: pointer;
      .el-button {
        width:80px;
      }
      .el-icon-search {
        font-size: 16px;
        color: #fff;
      }
     }
     .hot-tag {
       color: #CCCCCC;
       font-size: 12px;
       padding: 12px 0;
       span {
         margin-right: 10px;
       }
     }
  }
}
</style>
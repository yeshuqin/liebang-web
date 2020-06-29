<template>
  <div class="schedule content-wrap">
    <div class="schedule-wrap">
        <left-menu></left-menu>
        <div class="schedule-main">
          <h2 class="title-warp">进度查询</h2>
          <div class="form-wrap">
            <el-form size="mini" :inline="true">
              <el-form-item label="服务类型:">
                <el-select v-model="formInline.name"  clearable filterable placeholder="全部">
                  <el-option label="区域一" value="shanghai"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="配置详情:">
                <el-select v-model="formInline.name"  clearable filterable placeholder="全部">
                  <el-option label="区域一" value="shanghai"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="订单状态:">
                <el-select v-model="formInline.name" clearable filterable placeholder="全部">
                  <el-option v-for="(value, key) in statusItem" :label="value" :value="key" :key="key"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="输入查询:">
                <el-input placeholder="订单号/商标名/申请人名称" clearable style="width:172px;"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" size="mini">搜索</el-button>
                <el-button size="mini">重置</el-button>
              </el-form-item>
            </el-form>
          </div>
          <div class="table-wrap">
            <el-table
            ref="multipleTable"
            :data="tableData"
            tooltip-effect="dark"
            style="width: 100%"
            @selection-change="handleSelectionChange">
            <el-table-column
              type="selection"
              width="55">
            </el-table-column>
            <el-table-column
              label="订单号"
              prop="orderNo"
              width="120">
              <template slot-scope="scope">{{ scope.row.orderNo }}</template>
            </el-table-column>
            <el-table-column
              prop="1"
              label="产品申请编号"
              width="120">
            </el-table-column>
            <el-table-column
              prop="2"
              label="服务类型">
            </el-table-column>
            <el-table-column
              prop="3"
              width="180px"
              label="注册名称">
            </el-table-column>
            <el-table-column
              prop="4"
              label="配置详情">
            </el-table-column>
            <el-table-column
              prop="5"
              label="申请人">
            </el-table-column>
            <el-table-column
              label="订单状态">
              <template slot-scope="scope">
                <span v-if="scope.row.status === 1" class="green cursor">{{statusItem[scope.row.status] }}</span>
                <span v-if="scope.row.status === 2" class="red cursor">{{statusItem[scope.row.status] }}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="time"
              label="更新时间">
            </el-table-column>
            <el-table-column
              label="操作状态">
              <template slot-scope="scope">
                <span v-if="scope.row.status === 1" class="fontImp">刷新进度</span>
                <span v-if="scope.row.status === 2" class="fontImp">上传资料</span>
              </template>
            </el-table-column>
          </el-table>
          <div class="pagination">
            <el-pagination
              background
              layout="prev, pager, next"
              :total="1000">
            </el-pagination>
          </div>
        </div>
      </div>
    </div>
     <ad-list class="mb90">
       <h2>热卖单品</h2>
    </ad-list> 
    <ad-list class="mb90">
       <h2>猜你喜欢</h2>
    </ad-list> 
  </div>
</template>

<script>  
  import leftMenu from '@/components/leftMenu/leftMenu'
  import adList from '@/components/adList/adList'
  export default {
    components: {
      leftMenu,
      adList
    },
    data() {
      return {
        formInline: {
          name: ''
        },
        statusItem: {
          1: '资料上传中',
          2: '政府审核中'
        },
        tableData: [
          {
            orderNo: '67863781672867 81637816372',
            1: 'F0018989789384',
            2: '工商注册',
            3: '上海快乐大本营股份有限责任公司',
            4: '30天加急',
            5: '赵倩倩',
            status: 1,
            time: '20200106'
          },
          {
            orderNo: '67863781672867 81637816372',
            1: 'F0018989789384',
            2: '工商注册',
            3: '上海快乐大本营股份有限责任公司',
            4: '30天加急',
            5: '赵倩倩',
            status: 1,
            time: '20200106'
          },
          {
            orderNo: '67863781672867 81637816372',
            1: 'F0018989789384',
            2: '工商注册',
            3: '上海快乐大本营股份有限责任公司',
            4: '30天加急',
            5: '赵倩倩',
            status: 2,
            time: '20200106'
          },
          {
            orderNo: '67863781672867 81637816372',
            1: 'F0018989789384',
            2: '工商注册',
            3: '上海快乐大本营股份有限责任公司',
            4: '30天加急',
            5: '赵倩倩',
            status: 1,
            time: '20200106'
          }
        ]
      }
    },
    methods: {
      handleSelectionChange() {

      }
    }
  }
</script>

<style lang="scss" scoped>
.schedule-wrap {
  display: flex;
  margin-top: 11px;
  margin-bottom: 120px;
  .schedule-main {
    flex: 1;
    .form-wrap {
      margin: 14px 0;
      background: #ffffff;
      padding: 20px 20px 0 20px;
      .el-form--inline .el-form-item {
        margin-right: 30px;
      }
    }
    .pagination {
      text-align: right;
      padding: 36px 12px 22px 0;
      background: #ffffff;
    }
  }
}
</style>
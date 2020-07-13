<template>
  <div class="confirm-order content-wrap">
    <h2 class="title-warp clearfix mt10">
      <span class="fl">确认订单</span>
      <ul class="step-wrap fr">
        <li class="success">
          <span class="number">1</span>
          <p>1.确认订单</p>
        </li>
        <li class="active">
          <span class="number">2</span>
          <p>2.付款</p>
        </li>
        <li>
          <span class="number">3</span>
          <p>3.支付完成</p>
        </li>
      </ul>
    </h2>
    <div class="main">
        <h2>商品信息</h2>
        <el-table
        class="table-wrap"
        :data="tableData"
        style="width: 100%">
        <el-table-column
          prop="1"
          label="产品名称">
        </el-table-column>
        <el-table-column
          prop="2"
          width="200px"
          label="配置详情">
        </el-table-column>
        <el-table-column
          prop="3"
          label="付费方式">
        </el-table-column>
        <el-table-column
          prop="4"
          label="数量">
        </el-table-column>
        <el-table-column
          prop="5"
          label="优惠金额">
        </el-table-column>
        <el-table-column
          prop="6"
          label="资费">
        </el-table-column>
        <el-table-column
          prop="7"
          label="小计">
        </el-table-column>
      </el-table>
      <el-row class="info" type="flex" justify="space-between">
        <el-col :span="11">
          <p class="title" style="color:rgba(0,0,0,1);">配送信息</p>
          <div style="padding-left:33px" class="mb10">
            普通配送
            <span style="margin-left:40px">快递费：包邮</span>
          </div>
          <div style="padding-left:33px" class="mb20">
            配送时间：24点前下单，预计4月28日24:00前送达
          </div>
          <p class="title" style="border-top: 1px solid #E6E6E6FF;padding-left:14px;">收货人信息</p>
          <el-form ref="form" :model="form" size="small" label-width="90px" style="width:90%">
            <el-form-item label="收货人:">
              <el-input v-model="form.name" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="所在地区:">
              <el-cascader :options="options" clearable></el-cascader>
            </el-form-item>
            <el-form-item label="详细地址:">
              <el-input v-model="form.name" placeholder="请输入"></el-input>
            </el-form-item>
            <el-row type="flex" justify="space-between">
              <el-col :span="12">
                <el-form-item label="手机号码:">
                    <el-input v-model="form.name" placeholder="请输入"></el-input>
                  </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="备用电话:">
                    <el-input v-model="form.name" placeholder="请输入"></el-input>
                  </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-col>
        <el-col :span="11">
          <p class="title">发票信息</p>
          <el-form ref="form" :model="form" size="small" label-width="120px" style="width:90%">
            <el-form-item label="发票类型:">
              电子发票
            </el-form-item>
            <el-form-item label="发票明细:">
              <el-select v-model="form.name" clearable  placeholder="请输入">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="公司税号:">
              <el-input v-model="form.name" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="发票抬头类型:">
              <el-radio-group v-model="form.status">
                <el-radio label="个人"></el-radio>
                <el-radio label="企业"></el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="发票抬头:">
              <el-input v-model="form.name" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="纳税人识别号:">
              <el-input v-model="form.name" placeholder="请输入"></el-input>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <div class="file">
        <el-checkbox v-model="checked"></el-checkbox> 我已阅读理解并接受 <span class="fontImp">《计算机软件著作登记申请相关协议》</span>
      </div>
      <div class="cash-wrap clearfix">
         <div class="fr">
          <p class="money fontImp font36">¥2999.00</p>
          <span class="font666 font16">优惠¥30</span>
        </div>
        <div class="font16 fr font999" style="margin-top:12px">
          总配置费用：
        </div>
      </div>
      <div  class="buy-btn">
        <el-button type="primary">确认购买</el-button>
      </div>
      
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        checked: true,
        options: [{
          value: 'zhinan',
          label: '指南',
          children: [{
            value: 'shejiyuanze',
            label: '设计原则',
            children: [{
              value: 'yizhi',
              label: '一致'
            }, {
              value: 'fankui',
              label: '反馈'
            }, {
              value: 'xiaolv',
              label: '效率'
            }, {
              value: 'kekong',
              label: '可控'
            }]
          }, {
            value: 'daohang',
            label: '导航',
            children: [{
              value: 'cexiangdaohang',
              label: '侧向导航'
            }, {
              value: 'dingbudaohang',
              label: '顶部导航'
            }]
          }]
        }, {
          value: 'zujian',
          label: '组件',
          children: [{
            value: 'basic',
            label: 'Basic',
            children: [{
              value: 'layout',
              label: 'Layout 布局'
            }, {
              value: 'color',
              label: 'Color 色彩'
            }, {
              value: 'typography',
              label: 'Typography 字体'
            }, {
              value: 'icon',
              label: 'Icon 图标'
            }, {
              value: 'button',
              label: 'Button 按钮'
            }]
          }, {
            value: 'form',
            label: 'Form',
            children: [{
              value: 'radio',
              label: 'Radio 单选框'
            }, {
              value: 'checkbox',
              label: 'Checkbox 多选框'
            }, {
              value: 'input',
              label: 'Input 输入框'
            }, {
              value: 'input-number',
              label: 'InputNumber 计数器'
            }, {
              value: 'select',
              label: 'Select 选择器'
            }, {
              value: 'cascader',
              label: 'Cascader 级联选择器'
            }, {
              value: 'switch',
              label: 'Switch 开关'
            }, {
              value: 'slider',
              label: 'Slider 滑块'
            }, {
              value: 'time-picker',
              label: 'TimePicker 时间选择器'
            }, {
              value: 'date-picker',
              label: 'DatePicker 日期选择器'
            }, {
              value: 'datetime-picker',
              label: 'DateTimePicker 日期时间选择器'
            }, {
              value: 'upload',
              label: 'Upload 上传'
            }, {
              value: 'rate',
              label: 'Rate 评分'
            }, {
              value: 'form',
              label: 'Form 表单'
            }]
          }, {
            value: 'data',
            label: 'Data',
            children: [{
              value: 'table',
              label: 'Table 表格'
            }, {
              value: 'tag',
              label: 'Tag 标签'
            }, {
              value: 'progress',
              label: 'Progress 进度条'
            }, {
              value: 'tree',
              label: 'Tree 树形控件'
            }, {
              value: 'pagination',
              label: 'Pagination 分页'
            }, {
              value: 'badge',
              label: 'Badge 标记'
            }]
          }, {
            value: 'notice',
            label: 'Notice',
            children: [{
              value: 'alert',
              label: 'Alert 警告'
            }, {
              value: 'loading',
              label: 'Loading 加载'
            }, {
              value: 'message',
              label: 'Message 消息提示'
            }, {
              value: 'message-box',
              label: 'MessageBox 弹框'
            }, {
              value: 'notification',
              label: 'Notification 通知'
            }]
          }, {
            value: 'navigation',
            label: 'Navigation',
            children: [{
              value: 'menu',
              label: 'NavMenu 导航菜单'
            }, {
              value: 'tabs',
              label: 'Tabs 标签页'
            }, {
              value: 'breadcrumb',
              label: 'Breadcrumb 面包屑'
            }, {
              value: 'dropdown',
              label: 'Dropdown 下拉菜单'
            }, {
              value: 'steps',
              label: 'Steps 步骤条'
            }]
          }, {
            value: 'others',
            label: 'Others',
            children: [{
              value: 'dialog',
              label: 'Dialog 对话框'
            }, {
              value: 'tooltip',
              label: 'Tooltip 文字提示'
            }, {
              value: 'popover',
              label: 'Popover 弹出框'
            }, {
              value: 'card',
              label: 'Card 卡片'
            }, {
              value: 'carousel',
              label: 'Carousel 走马灯'
            }, {
              value: 'collapse',
              label: 'Collapse 折叠面板'
            }]
          }]
        }, {
          value: 'ziyuan',
          label: '资源',
          children: [{
            value: 'axure',
            label: 'Axure Components'
          }, {
            value: 'sketch',
            label: 'Sketch Templates'
          }, {
            value: 'jiaohu',
            label: '组件交互文档'
          }]
        }],
        tableData: [
          {
            1: '软件著作权登记',
            2: '加急自助（35个工作日）',
            3: '预付款',
            4: '1',
            5: '¥30',
            6: '¥30',
            7: '¥30'
          }
        ],
        form: {
          name: '',
          status: '个人'
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
.confirm-order {
  padding-bottom: 85px;
  h2 {
    padding: 12px 0 12px 34px;
    font-weight: bold;
  }
  .title-warp {
    height: 54px;
    padding: 7px 54px 0 14px;
    box-sizing: border-box;
  }
  .step-wrap {
    margin-top: 7px;
    li {
      display: inline-block;
      width: 160px;
      background: #CCCCCCFF;
      height: 6px;
      position: relative;
      font-size: 12px;
      text-align: center;
      p {
        margin-top: 4px;
        font-size: 12px;
        color: #CCCCCCFF;
      }
      .number {
        width: 24px;
        height: 24px;
        line-height: 24px;
        text-align: center;
        color: #fff;
        font-size: 12px;
        border-radius: 50%;
        background: #CCCCCCFF;
        position: absolute;
        left: 50%;
        top: 50%;
        margin-left: -12px;
        margin-top: -12px;
      }
      &.success {
        background: #CBEDB6FF;
        .number {
          background: #CBEDB6FF;
        }
        p {
          color: #CBEDB6FF
        }
      }
      &.active {
        background: #7ABD55FF;
        .number {
          background: #7ABD55FF;
        }
        p {
          color: #7ABD55FF
        }
      }
      
    }
  }
  .main {
    background: #fff;
    margin-top: 16px;;
  }
}
</style>

<style lang="scss">
  .confirm-order {
    .table-wrap {
      .cell {
        text-align: center;
      }
      tbody {
        .el-table__row {
          background: #EAEBEBFF;
          height: 50px;
          color: rgba(55,61,66,1);;
        }
      }
      .el-table__header th {
          padding: 0;
          height: 32px;
          line-height: 32px;
          border-top: 1px solid rgba(230,230,230,1);
          border-bottom: 1px solid rgba(230,230,230,1);
          color: #333333FF;
        }
    }
    .info {
      background: #fff;
      border-bottom: 1px solid #E6E6E6FF;
      padding:8px 0 20px;
      .title {
       padding: 18px 0 18px 36px;
       border-bottom: 1px solid #E6E6E6FF;
       margin-bottom: 14px;
       font-weight: 400;
      }
    }
    .file {
      padding: 27px 0 30px 12px;
      font-size: 16px;
      color: #999999;
    }
    .cash-wrap {
      padding: 10px 0;
      background:rgba(244,244,244,1);
      padding-right: 98px;
    }
    .buy-btn {
      text-align: right;
      padding: 30px 70px 25px 0;
    }
  }
</style>
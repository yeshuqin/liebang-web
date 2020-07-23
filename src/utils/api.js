
export default {
  register: 'account/register', // 账号注册
  code: 'account/code', // 获取验证码
  login: 'account/login', // 账号登录
  logout: 'account/logout', // 账号退出

  // 广告位查询API
  bannerList: 'banner/list', //查询指定广告位列表
  
  //SPU查询API
 spuCateSpu: 'spu/cateSpu', //查询类别与SPU列表
 spuDetail: 'spu/detail', // 查询SPU详情
 spuPage: 'spu/page', // 分页查询SPU列表
 spuSku: 'spu/sku', // 查询SKU详情

 // 订单交易API
 orderDetail: 'order/detail', //订单详情
 orderPay: 'order/pay', //订单支付
 orderSubmit: 'order/submit', // 订单提交
 orderCancel: 'order/cancel', // 订单取消
 orderPage: 'order/page', // 分页查询订单列表
 orderUpload: 'order/upload', // 提交资料

 userAuth: 'user/auth', // 企业认证
 userInfo: 'user/info', // 查询当前用户信息
 userUpdate: 'user/update' // 修改用户信息
}

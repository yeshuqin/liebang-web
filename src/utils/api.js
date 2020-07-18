
export default {
  register: 'user/register', // 账号注册
  code: 'user/code', // 获取验证码
  login: 'user/login', // 账号登录
  logout: 'user/logout', // 账号退出

  // 广告位查询API
  bannerList: 'banner/list', //查询指定广告位列表
  
  //SPU查询API
 spuCateSpu: 'spu/cateSpu', //查询类别与SPU列表
 spuDetail: 'spu/detail', // 查询SPU详情
 spuPage: 'spu/page', // 分页查询SPU列表
 spuSku: '/spu/sku', // 查询SKU详情
 
 // 订单交易API
 orderDetail: 'order/detail', //订单详情
 orderPay: 'order/pay', //订单支付
 orderSubmit: 'order/submit' // 订单提交
}

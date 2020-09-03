import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('./views/Home.vue'),
      redirect: '/index',
      children: [
        {
          path: 'user',
          name: 'user',
          component: () => import('./views/user/user.vue'),
        },
        {
          path: 'accountCenter',
          name: 'accountCenter',
          component: () => import('./views/user/accountCenter.vue'),
        },
        {
          path: 'identity',
          name: 'identity',
          component: () => import('./views/user/identity.vue'),
        },
        {
          path: 'schedule',
          name: 'schedule',
          component: () => import('./views/trade/schedule.vue'),
        },
        {
          path: 'upload',
          name: 'upload',
          component: () => import('./views/trade/upload.vue'),
        },
        {
          path: 'order',
          name: 'order',
          component: () => import('./views/order/orderList.vue'),
        },
        {
          path: 'orderDetail',
          name: 'orderDetail',
          component: () => import('./views/order/orderDetail.vue'),
        },
        {
          path: 'goodsDetail',
          name: 'goodsDetail',
          component: () => import('./views/goods/goodsDetail.vue'),
        },
        {
          path: 'confirmOrder',
          name: 'confirmOrder',
          component: () => import('./views/order/confirmOrder.vue'),
        },
        {
          path: 'playOrder',
          name: 'playOrder',
          component: () => import('./views/order/playOrder.vue'),
        },
        {
          path: 'statusOrder',
          name: 'statusOrder',
          component: () => import('./views/order/statusOrder.vue'),
        }
      ]
    },
    {
      path: '/index',
      name: 'index',
      component: () => import('./views/index/index.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/login/login.vue'),
    },
    {
      path: '/serviceContract',
      name: 'serviceContract',
      component: () => import('./views/user/serviceContract.vue'),
    },
    {
      path: '/private',
      name: 'private',
      component: () => import('./views/user/private.vue'),
    },
    {
      path: '/changePwd',
      name: 'changePwd',
      component: () => import('./views/user/changePwd.vue'),
    },
    {
      path: '/email',
      name: 'email',
      component: () => import('./views/user/email.vue'),
    }
  ],
});

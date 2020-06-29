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
    }
  ],
});

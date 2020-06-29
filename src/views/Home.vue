<template>
  <div class="home">
     <Topbar></Topbar>
     <router-view></router-view>
     <Bottombar></Bottombar>
  </div>
</template>

<script>
import Topbar from '@/views/base/Topbar/index'
import Bottombar from '@/views/base/Bottombar/index'
export default {
  name: 'home',
  components: {
    Topbar,
    Bottombar
  },
};
</script>

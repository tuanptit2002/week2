

<template >
  <div style="display: flex; background-color: #F7F8FA; align-items: center; justify-content: center">

  <nav-page style="margin-right: 16px; background-color: #FFFFFF" v-if="getCheck"></nav-page>
  <div style="height: 1024px;">
    <the-header v-if="getCheck"></the-header>
    <router-view></router-view>
  </div>

  </div>
</template>
<script>
import {defineComponent} from "vue";
import Login from "@/components/pages/Login.vue";
import NavPage from "@/components/layout/Nav.vue"
import TheHeader from "@/components/layout/TheHeader.vue";
import BodyUsers from "@/components/layout/BodyUsers.vue";
import BodyProducts from "@/components/layout/BodyProducts.vue";

export default defineComponent({
  components: {BodyProducts, BodyUsers, TheHeader, Login, NavPage,},
  data(){
   return{
     check:''
   }
  },
  computed:{
    getCheck(){
      this.check = this.$store.getters.token;
      return this.check;
    }
  }
})
</script>
<style scoped>

</style>

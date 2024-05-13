<template>
  <div class="menu" :class="{ 'collapsed': isCollapsed }">
    <div class="logo">
      <div class="img1"><img src="../../assets/ttlab%20-%20logo%20ngang.svg" alt=""></div>
      <div class="img2" :class="{ 'collapsed': isCollapsed }">
        <button @click="setRotation" :style="{ left: isCollapsed ? '10%' : 'auto' }">
          <img src="../../assets/indent-decrease.png" alt="" :style="{ transform: 'rotate(' + rotation + 'deg)' }">
        </button></div>
    </div>
    <div class="section">
      <div class="label-section">
        QUẢN LÝ SẢN PHẨM
      </div>
    </div>
    <div class="app-page">
      <button @click="setClickProduct">
      <div :class="{ 'color': getProduct, 'list': !getProduct }">

        <div class="box"><img src="../../assets/box.png" alt=""></div>
        <div :class="{ 'product': !getProduct, 'product-change': getProduct }">Sản phẩm</div>

        <div class="chevron"></div>
      </div>
      </button>
      <button @click="setClickUser">
      <div :class="{ 'color': getUser, 'list': !getUser }" >

        <div class="icon-users"><img src="../../assets/users.png" alt=""></div>
        <div :class="{ 'users': !getUser, 'users-change': getUser }">
          Users
        </div>
        <div class="chevron"></div>
      </div>
      </button>
    </div>
  </div>
</template>

<script>
import router from "@/router.js";

export default {
  data(){
    return{
      rotation:0,
      isProduct:false,
      isUser:false,
      isCollapsed: false
    }
  },
  computed:{
    getProduct(){
      if (this.$store.getters['isClick'].data == 'product'){
        this.isProduct = true;
        return true;
      }
      else{
       return false
      }
    },
    getUser(){
      if (this.$store.getters['isClick'].data == 'user'){
        this.isProduct = true;
        return true;
      }
      else{
        return false
      }
    }
  },
  methods:{
    async setClickProduct() {
      await this.$store.dispatch('setIsClick','product');
      await this.$store.dispatch('products/getAllProduct');
      router.push('/products')
    },
    async setClickUser(){
      await this.$store.dispatch('setIsClick','user')
      await this.$store.dispatch('users/getAllUser');
      router.push('/users')
    },
    setRotation(){
      this.rotation += 180;
      this.isCollapsed = !this.isCollapsed;
    }
  }
}
</script>

<style scoped>
.menu{
  width: 260px;
  height: 1024px;
  padding: 0px 0px 10px 0px;
  gap: 0px;
  opacity: 0px;

}
.logo{
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 260px;
  height: 68px;
  padding: 20px 14px 20px 18px;
  gap: 10px;
  opacity: 0px;
  box-sizing: border-box;

}
.img1{
  width: 150px;
  height: 28px;
  justify-content: flex-start;
}
.img2{
  width: 24px;
  height: 24px;
}

.section{
  width: 260px;
  height: 44px;
  padding: 15px 30px 15px 30px;
  border-radius: 6px 0px 0px 0px;
  opacity: 0px;
  box-sizing: border-box;

}
.label-section{
  width: 120px;
  height: 14px;
  opacity: 0px;
  font-family: Public Sans;
  font-size: 11px;
  font-weight: 400;
  line-height: 14px;
  text-align: left;
  color: #8B909A;
}

.app-page{
  width: 260px;
  height: 88px;
  padding: 0px 14px 0px 14px;
  gap: 8px;
  opacity: 0px;
  box-sizing: border-box;
}
.box{

  width: 22px;
  height: 22px;

}
.list{
  width:232px;
  height: 40px;
  padding: 9px 16px 9px 16px;
  gap: 8px;
  border-radius: 6px 0px 0px 0px;
  opacity: 0px;
  display: flex;
  align-items: center;
}
.product{
  width: 170px;
  height: 22px;
  gap: 0px;
  opacity: 0px;
  font-family: Public Sans;
  font-size: 15px;
  font-weight: 600;
  line-height: 22px;
  text-align: left;
  color: #8B909A;
}
.product-change{
  width: 170px;
  height: 22px;
  gap: 0px;
  opacity: 0px;
  font-family: Public Sans;
  font-size: 15px;
  font-weight: 600;
  line-height: 22px;
  text-align: left;
  color: #23272E;
}
.users{
  width: 170px;
  height: 22px;
  gap: 0px;
  opacity: 0px;
  font-family: Public Sans;
  font-size: 15px;
  font-weight: 600;
  line-height: 22px;
  text-align: left;
  color: #8B909A;
}
.users-change{
  width: 170px;
  height: 22px;
  gap: 0px;
  opacity: 0px;
  font-family: Public Sans;
  font-size: 15px;
  font-weight: 600;
  line-height: 22px;
  text-align: left;
  color: #23272E;
}
.list button{
  background: none;
  border: none;
}
.color{
  width:232px;
  height: 40px;
  padding: 9px 16px 9px 16px;
  gap: 8px;
  border-radius: 6px 0px 0px 0px;
  opacity: 0px;
  display: flex;
  align-items: center;
  background-color: #F3F4F8;
}
.menu.collapsed {
  width: 0%;
}
.menu.collapsed .img2 {
  background-color: #FFFFFF;
  position: relative; /* Đặt vị trí tương đối cho .img2 */
  left: 780px;
  margin-top: 20px;
}
.menu.collapsed .section,
.menu.collapsed .app-page {
  display: none; /* Ẩn .section và .app-page khi sidebar được thu nhỏ */
}
</style>


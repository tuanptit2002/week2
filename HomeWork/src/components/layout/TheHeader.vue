<template>
  <div class="header">
    <div class="nav">
      <div class="nav-border"><p style="padding-left: 10px">{{ getTitle }}</p></div>
      <div class="icon">
        <div class="icon-1"><img src="../../assets/Notification.png" alt=""></div>
        <div class="icon-2"><img src="../../assets/Avatar.png" alt=""></div>
      </div>
    </div>
  </div>
</template>

<script>
import RegisterUser from "@/components/layout/RegisterUser.vue";
import CreateProduct from "@/components/layout/CreateProduct.vue";

export default {
  components: {CreateProduct, RegisterUser},
  data() {
    return {
      searchQuery:'',
      checkUser: 'false',
      checkProduct: 'false',
    }
  },
  watch:{
    searchQuery(val){
      console.log(val)
    }
  },
  computed: {
    getCheckUser() {
      return this.checkUser
    },
    getTitle() {
      if (this.$store.getters['isClick'].data === 'user') return "Danh sách người dùng"
      else if(this.$store.getters['isClick'].data === 'product') return "Danh sách sản phẩm"
    },
    getCheckSearch(){
      if(this.$store.getters['isClick'].data === 'user' || this.$store.getters['isClick'].data === 'product'){
        return true;
      }else return false;
    }
  },
  methods: {
    changeDialog() {
      if (this.$store.getters['isClick'].data === 'user') {
        this.checkUser = true;
      } else {
        this.checkProduct = true;
      }
    },
    receiveProduct(data) {
      this.checkProduct = data;
    },
    receiveUser(data) {
      this.checkUser = data;
    },
    searchData(){
      console.log(this.searchQuery)
    }
  }
}
</script>
<style scoped>
.header {
  background-color: #F7F8FA;
}

.nav {
  width: 1126px;
  height: 62px;
  margin-top: 10px;
  gap: 0px;
  opacity: 0px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
}

.nav p {
  width: 1026.44px;
  height: 22px;
  gap: 0px;
  opacity: 0px;
  font-family: Public Sans;
  font-size: 24px;
  font-weight: 600;
  line-height: 22px;
  text-align: left;
  color: #23272E;

}

.nav-border {
  width: 1026.44px;
  height: 38px;
  gap: 10px;
  opacity: 0px;
  align-items: center;
}

.icon {
  width: 89.56px;
  height: 38px;
  gap: 24px;
  opacity: 0px;

}

.nav-border,
.icon {
  display: flex; /* Sử dụng flexbox cho phần tử con của .nav */
  align-items: center; /* Canh chỉnh các phần tử con theo chiều dọc */
}

.nav > div {
  display: flex; /* Sử dụng flexbox cho phần tử con của .nav */
  align-items: center; /* Canh chỉnh các phần tử con theo chiều dọc */
}

.icon-1 {
  width: 27.56px;
  height: 37px;
  gap: 0px;
  opacity: 0px;
  box-sizing: border-box;
}

.icon-2 {
  width: 38px;
  height: 38px;
  gap: 0px;
  opacity: 0px;
  box-sizing: border-box;
}



.search input {
  width: 262px;
  height: 21px;
  gap: 0px;
  opacity: 0px;
  box-sizing: border-box;
  border: none;
}
input:focus{
  outline: none;
}


.button button {

  width: 122px;
  height: 40px;
  padding: 12px 24px 12px 24px;
  gap: 6px;
  border-radius: 6px 6px 6px 6px;
  opacity: 0px;
  background-color: #0F60FF;
  color: #FFFFFF;
  border: none;

}

</style>


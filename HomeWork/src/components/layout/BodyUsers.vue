<template>

  <div class="form-search" >
    <div class="search">
      <div><input type="text" placeholder="Tìm kiếm" v-model="searchTerm"></div>
      <div style="margin-top: 2px"><button><img src="../../assets/mingcute_search-line.png" alt=""></button></div>
    </div>
    <div class="button" >
      <v-btn @click="changeDialog">+ Tạo mới</v-btn>
    </div>
  </div>
  <div style="width: 1128px; height: 697px; margin-top: 56px; border-radius: 6px">
    <v-table density="compact">
      <thead style="height: 47px">
      <tr>
        <th class="text-left" style="color: #8B909A; font-family: 'Public Sans'">AVATAR</th>
        <th class="text-left" style="color: #8B909A; font-family: 'Public Sans'">TÊN NGƯỜI DÙNG</th>
        <th class="text-left" style="color: #8B909A; font-family: 'Public Sans'">EMAIL</th>
        <th class="text-left" style="color: #8B909A; font-family: 'Public Sans'">NGÀY SINH</th>
        <th class="text-left" style="color: #8B909A; font-family: 'Public Sans'">SỐ ĐIỆN THOẠI</th>
        <th class="text-left" style="color: #8B909A; font-family: 'Public Sans'">HÀNH ĐỘNG</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="user in amountUser" :key="user.name" style="height: 58px">
        <td><img :src='user.avatar' alt="" style="width: 36px; height: 36px"></td>
        <td style="color: #23272E; font-family: 'Public Sans'">{{ user.name }}</td>
        <td style="color: #23272E; font-family: 'Public Sans'">{{user.email}}</td>
        <td style="color: #23272E; font-family: 'Public Sans'">{{user.date}}</td>
        <td style="color: #23272E; font-family: 'Public Sans'">{{user.phone}}</td>
        <td class="td6" style="display: flex; margin-top: 22px">
          <button @click="editUser(user.id)"><img src='../../assets/edit.png' style="width: 24px;height: 24px;" ></button>
          <button @click="deleteUser(user.id)"><img src='../../assets/delete.png' style="width: 24px;height: 24px"></button>
        </td>
      </tr>
      </tbody>
    </v-table>
    <div class="footer" style="border-top: 1px solid rgb(70, 79, 96, 0.16); background-color: #FFFFFF; border-radius: 0px 0px 6px 6px">
      <div style="display: flex; justify-content: space-between">
        <div style="display: flex">
          <div style="color: #8B909A; font-size: 15px; font-family: 'Public Sans'; height: 38px; margin-top: 14px">Showing</div>
          <div style="display: flex">
            <v-select
                v-model="select"
                :items="items"
                item-title="state"
                item-value="state"
                label="Select"
                persistent-hint
                return-object
                single-line
                variant="solo"
                max-width="100px"
            ></v-select>
          </div>
          <div style="color: #8B909A; font-size: 15px; font-family: 'Public Sans'; height: 38px; margin-top: 14px">of {{totalUsers}}</div>
        </div>
        <div style="margin-top: 14px">
          <v-pagination v-model="page" :length=width :total-visible="5" :size="`28px`" ></v-pagination>
        </div>
      </div>
    </div>
  </div>
  <register-user v-if="checkUser == true"  @set-check="receiveUser" :dataUser="user" @update-user="updateUser" ></register-user>

</template>

<script >
import Swal from "sweetalert2";
import RegisterUser from "@/components/layout/RegisterUser.vue";
import users from "@/store/modules/users/index.js";

export default {
  components: {RegisterUser},
  data(){
    return{
      user: null,
      searchTerm:'',
      checkUser:'false',
      users:this.$store.getters['users/getAll'].slice(0,10),
      totalPage:0,
      select: { state: '10' },
      page:1,
      items: [
        {state: '10'},
        {state: '20'},
        {state: '30'},
      ],
    }
  },
  watch:{
    searchTerm(val) {
      const tmp = this.$store.getters['users/getAll'].slice();
      const result = tmp.filter(user => {
        return user.name.toLowerCase().includes(val) ||
            user.email.toLowerCase().includes(val) ||
            user.date.toLowerCase().includes(val) ||
            user.phone.toLowerCase().includes(val);
      });
      this.users = result;
    },
    select(newValue){
      const length = parseInt(newValue.state);
      const tmp = this.$store.getters['users/getAll'].slice();
      this.page =  tmp/length;
      if( length >= tmp.length){
        this.users = tmp;
      }else{
        this.users = tmp.splice(0,length)
      }
    },
    page(newValue){
      console.log(newValue);
      const length = parseInt(this.select.state);
      const index = newValue*parseInt(this.select.state);
      const tmp = this.$store.getters['users/getAll'].slice();
      if( length >= tmp.length){
        console.log("oke")
        this.users = tmp;
      }else{
        console.log("no oke")
        this.users = tmp.splice(index-10,index)
        console.log(this.users)
      }
    }
  },
  computed:{
    width(){
        if(parseInt(this.select.state) > this.$store.getters['users/getAll'].length)return 1;
      if(this.$store.getters['users/getAll'].length %10 == 0){
        return this.$store.getters['users/getAll'].length/parseInt(this.select.state);
      }
      else{
        return this.$store.getters['users/getAll'].length/parseInt(this.select.state)+1;
      }
    },


    totalUsers() {
      return this.$store.getters['users/getAll'].length;
    },
    amountUser(){
      return this.users;
    }
  },
  methods:{
  deleteUser(id) {
      Swal.fire({
        title: "Muốn xóa sản phẩm?",
        text: "Bạn chắc chắn chứ?",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Đồng ý",
        cancelButtonText: "Hủy bỏ",
      }).then((result) => {
        if (result.isConfirmed) {
          this.$store.dispatch('users/deleteUser', id)
        .then(() => {
          this.users = this.$store.getters['users/getAll'].slice(0, 10);
          console.log(users)
        })
        }
      });
    },
   async editUser(id){
      this.checkUser = true
      this.user = await this.$store.getters['users/getById'](id);
      console.log(this.user)
    },
    receiveUser(data){
      this.checkUser = data;
    },
    updateUser(data){
      this.$store.dispatch('users/updateUser', data).then(() => {
        this.users = this.$store.getters['users/getAll'].slice(0, 10);
        console.log(users)
      })
    },
    changeDialog(){
      this.checkUser = true;
      this.user = null;
    }
  }
}
</script>


<style scoped>
table {
  width: 1128px;
  height: 627px;
  margin-top: 8px;
  gap: 0px;
  opacity: 0px;
  box-sizing: border-box;

}


.header th{
  font-family: "Public Sans";
  color: #8B909A;
  padding:16px, 20px, 16px, 20px;
  gap: 4px;
  opacity: 0px;
  height: 47px;
  box-sizing: border-box;
  font-size: 13px;
}

.body td{
  font-family: "Public Sans";
  font-size: 15px;
  color: #23272E;

}
.td6 button{
  border: none;
  background: none;
}
button:hover{
  cursor: pointer;
}
td, th {
  text-align: left;
  padding: 8px;
}

.v-pagination {
  background: white;
  color: black;
}
.v-pagination :deep(v-pagination__item){
  background: white;
  color: black;
}
.v-pagination :deep(v-pagination__item--is-active){
  background: blue !important;
  color: white;
}

.button{
  margin-top: 32px;
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

.form-search {
  margin-top: 15px;
  height: 40px;
  width: 1126px;
  display: flex;
  justify-content: space-between;


}

.search {
  align-items: center;
  justify-content: center;
  width: 316px;
  height: 40px;
  margin-top: 32px;
  gap: 0px;
  border-radius: 4px;
  opacity: 0px;
  display: flex;
  float: left;
  border: 1px solid rgb(70, 79, 96, 0.16);
  background-color: #FFFFFF;
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
</style>



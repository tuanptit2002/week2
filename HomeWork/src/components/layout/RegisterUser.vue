<template>
  <div class="text-center pa-4">
    <v-dialog
        v-model="dialog"
        width="auto">
      <v-card>
        <div class="form-user" style="border-radius: 10px">
          <form @submit.prevent='createUserOrUpdate'>
            <div class="title">
              <p style="width: 250px;
             height:21px; padding-top: 12px;
             padding-left:20px;
              font-family: 'Public Sans'; color:#1A2240; font-size: 18px " v-if="this.dataUser == null">Tạo mới người dùng</p>
              <p style="width: 250px;
             height:21px; padding-top: 12px;
             padding-left:20px;
              font-family: 'Public Sans'; color:#1A2240; font-size: 18px " v-else="this.dataUser">Cập nhật người dùng</p>
            </div>
            <div class="form-body">
              <div class="form-input">
                <div>
                <label>Tên người dùng </label>
                <label style="color: #0F60FF">*</label>
                </div>
                <input placeholder="Nhập tên người dùng" v-model.trim="user.name">
              </div>
              <div class="form-input">
                <div>
                <label>Email </label>
                <label style="color: #0F60FF">*</label>
                </div>
                <input placeholder="Nhập email" v-model.trim="user.email">
              </div>
              <div class="form-input">
                <div>
                <label>Ngày sinh </label>
                <label style="color: #0F60FF">*</label>
                </div>
                <input placeholder="YYYY/MM/DD" type="date" v-model.trim="user.date">
              </div>
              <div class="form-input">
                <div>
                <label>Số điện thoại </label>
                <label style="color: #0F60FF">*</label>
                </div>
                <input placeholder="Nhập số điện thoại" v-model.trim="user.phone">
              </div>
              <div class="form-input">
                <div>
                <label>Avatar </label>
                <label style="color: #0F60FF">*</label>
                </div>
                <input placeholder="Nhập link ảnh avatar" v-model.trim="user.avatar">
              </div>
            </div>
            <div class="button">
              <div style="display: flex; width: 191px; height: 32px; margin-left: 229px; ">
                <div style="width: 70px; height: 32px; margin-top: 10px; margin-right: 20px">
                  <button @click="setCheck"
                          type="button"
                          style="width: 100%;
                             height: 100%;
                             border-radius: 6px;
                             border: 1px solid rgba(70, 79, 96, 0.16); font-family: 'Public Sans' ">Hủy
                  </button>
                </div>
                <div style="width: 105px; height: 32px; margin-top: 10px">
                  <button style="width: 100%;
                    height: 100%;
                    background-color: #0F60FF;
                    border-radius: 6px;
                     border: 1px solid rgba(70, 79, 96, 0.16);
                     font-family: 'Public Sans';
                       color: #FFFFFF" type="submit" v-if="this.dataUser == null">Tạo mới
                  </button>
                  <button style="width: 100%;
                    height: 100%;
                    background-color: #0F60FF;
                    border-radius: 6px;
                     border: 1px solid rgba(70, 79, 96, 0.16);
                     font-family: 'Public Sans';
                       color: #FFFFFF" type="submit" v-else="this.dataUser">Cập nhật
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: ['dataUser'],
  emits: ['setCheck','updateUser'],
  data() {
    return {
      dialog: true,
      user: {
        id:'',
        name: '',
        email: '',
        date: '',
        phone: '',
        avatar: ''
      }
    }
  },
  watch:{
    dataUser(value){
      this.user.id = value.id;
      this.user.name = value.name;
      this.user.email = value.email;
      this.user.date = value.date;
      this.user.phone = value.phone;
      this.user.avatar = value.avatar;
    }
  },
  computed: {
  },
  methods: {
    createUserOrUpdate() {
      if(!this.dataUser){
        console.log('day la con')
        this.$store.dispatch('users/register', this.user).then(() =>{
          const users = this.$store.getters['users/getAll']
          console.log(users)
        })

      }
      else{
        this.$emit('updateUser', this.user);
      }

      this.$emit('setCheck', false)

    },

    setCheck() {
      this.$emit('setCheck', false)
    }
  }
}
</script>

<style scoped>
.form-user {
  height: 518px;
  width: 440px;
  background-color: #F7F8FA;
}

.title {
  width: 440px;
  height: 54px;
  background-color: #FFFFFF;
}

.form-body {
  width: 400px;
  height: 364px;
  margin-left: 20px;
  gap: 16px;
}

.form-input {
  width: 400px;
  height: 60px;
  margin-bottom: 16px;
  margin-top: 12px;


}

.form-input input {
  width: 400px;
  height: 32px;
  background-color: #FFFFFF;
  margin-top: 10px;
  border-radius: 6px;
  border: none;
  outline: none;
}

.form-input label {
  font-family: "Public Sans";
  font-weight: 500;
  font-size: 16px;
  color: #464F60;
}

.button {
  width: 440px;
  height: 64px;
  background-color: #FFFFFF;
  margin-top: 22px;
}
</style>

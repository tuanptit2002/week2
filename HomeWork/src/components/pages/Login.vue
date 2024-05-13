<template>
  <form @submit.prevent="submitForm">
  <div class="login">

    <div class="header-line">
      <div><img src="../../assets/ttlab-logo.svg" alt=""></div>
      <div class="title" v-if='!checkValid'>Đăng nhập</div>
      <div class="title" v-else='checkValid'>Đăng ký</div>
    </div>

    <div class="frame-2">
      <div class="form" >
        <div class="form-group" >
          <label class="label-email">Email</label>
         <div class="border"><input placeholder="Nhập email" type="email" v-model.trim="email"></div>
        </div>
        <div class="form-group">
          <label class="label-password">Mật khẩu</label>

              <div class="border"><input type="password" placeholder="••••••••••••••" v-model.trim="password"></div>
              <div class="icon"></div>

        </div>
      </div>
      <p v-if="!formIsValid">Mật khẩu phải nhiều hơn 6 ký tự</p>
      <div class="remember">
        <div class="checkbox-wrapper" v-if="!checkValid">
       <input type="checkbox" style="margin-right: 4px">
        <p class="label-remember" >Ghi nhớ đăng nhập</p>
        </div>
        <button><p class="label-password2" v-if="!checkValid">Quên mật khẩu?</p></button>
      </div>
      <div>
        <button  type="submit" style="margin-top: 30px" class="button-login" v-if='!checkValid'> Đăng nhập</button>
        <button  type="submit" style="margin-top: 30px" class="button-login" v-if="checkValid"> Đăng ký</button>
      </div>

    </div>
    <div style="margin-top: 40px">
      <span class="label-3" v-if='!checkValid'>Bạn có tài khoản chưa?</span>
      <button @click.prevent="convert"><span class="sign" v-if='!checkValid'>Đăng ký</span></button>
      <button @click.prevent="convert"><span class="sign" v-if="checkValid">Đăng nhập</span></button>
    </div>

  </div>
  </form>
</template>
<script >
export default {

  data() {
    return {
      email: '',
      password: '',
      formIsValid: true,
      mode: 'login',
      isLoading: false,
      error: null,
      checkValid:false
    };
  },
  methods:{
    submitForm(){
      if(this.password.trim().length < 6){
        this.formIsValid = false;
        return
      }
     console.log("ok")
      if(this.checkValid == false){
         this.$store.dispatch('login', {
           email:this.email,
           password:this.password
         }).then(() =>{
           const redirectUrl = '/' + (this.$route.query.redirect || 'page');
           this.$router.replace(redirectUrl);
         })

      }
      else{
        this.$store.dispatch('signup',{
          email:this.email,
          password:this.password
        }).then(() =>{
          this.checkValid = !this.checkValid
        })
      }
    },
    convert(){
      this.checkValid = !this.checkValid
    }
  }
}
</script>


<style scoped>
.login{
  width: 426px;
  height: 476px;
  margin-top: 119px;
  margin-left: 507px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.header-line{
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 163px;
  height: 132px;
  gap: 24px;
}
.title{
  width: 163px;
  height: 48px;
  gap: 0px;
  opacity: 0px;
  font-family: "Public Sans";
  font-size: 32px;
  font-weight: 600;
  line-height: 48px;
  text-align: left;
}
.frame-2{
  width: 425px;
  height: 260px;
  gap: 24px;
  opacity: 0px;
}
.form{
  width: 425px;
  height: 144px;
  gap: 24px;
  opacity: 0px;
}
.form-group{
  width: 425px;
  height: 60px;
  gap: 0px;
  opacity: 0px;
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
}
.form-group input{
  width: 401px;
  height: 20px;
  box-sizing: border-box;
  border: none;
  outline: none;
}
.border{
  border: 1px solid #868FA029;
  width: 425px;
  height: 32px;
  top: 28px;
  padding: 6px 12px 6px 12px;
  gap: 0px;
  border-radius: 6px 6px 6px 6px;
  opacity: 0px;
  box-sizing: border-box;
  box-shadow: 0px 0px 0px 1px #868FA029;
}
.label-email{
  width:  38px;
  height:  20px;
  gap: 6px;
  opacity: 0px;
  font-family: Public Sans;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  letter-spacing: 0.02em;
  text-align: left;
  color: #464F60;
}
.label-password{
  width: 63px;
  height: 24px;
  gap: 6px;
  opacity: 0px;
  font-family: Public Sans;
  font-size: 13px;
  font-weight: 500;
  line-height: 20px;
  letter-spacing: 0.02em;
  text-align: left;
  color: #464F60;
}
.remember{
  display: flex;
  justify-content: space-between;
  align-items: center;
  //justify-content: flex-end;
  width: 425px;
  height: 20px;
  gap: 170px;
  opacity: 0px;

}
.checkbox-wrapper {
  width: 148px;
  height: 20px;
  opacity: 0px;

  display: flex;
  align-items: center;

}

.label-remember {
  width: 124px;
  height: 20px;
  gap: 0px;
  opacity: 0px;
  font-family: Public Sans;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  text-align: left;
  opacity: 0px;
  box-sizing: border-box;
}

.label-password2{
  width: 107px;
  height: 20px;
  gap: 0px;
  opacity: 0px;
  font-family: Public Sans;
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
  text-align: left;
  color: #0F60FF;
}
.button-login{
  width: 100%;
  height: 48px;
  border-radius: 6px;
  border: none;
  background-color: #0F60FF;
  color: #FFFFFF;
  font-family: "Public Sans";
  font-size: 16px;
  line-height: 20px;
  align-items: center;

}
.button-login:hover{
  cursor: pointer;
}
.label-3{
  font-family: Public Sans;
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  text-align: center;
  color: #5A5C6F;

}
.sign {
  width: 55px;
  height: 20px;
  gap: 0px;
  opacity: 0px;
  font-family: Public Sans;
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
  text-align: center;
  color: #0F60FF;

}
</style>

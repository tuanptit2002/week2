<template>
  <div class="text-center pa-4">
    <v-dialog
        v-model="dialog"
        width="440"
        height="614"
    >
      <v-card>
        <div class="form-product">
          <form @submit.prevent = 'createProductOrUpdate'>
          <div class="title">
            <p style="padding-top: 12px" v-if="dataProduct == null">Tạo mới sản phẩm</p>
            <p style="padding-top: 10px" v-else="dataProduct">Cập nhật sản phẩm</p>
          </div>
          <div class="body-new">
            <div class="input" style="margin-bottom: 16px">
              <div>
              <label style="width: 103px; height: 20px; margin-bottom: 10px">Tên sản phẩm </label>
              <label style="color: #0F60FF;">*</label>
              </div>
              <input placeholder="Nhập tên sản phẩm" v-model="product.name" style="padding:2px">
            </div>
            <div class="input"  style="margin-bottom: 16px">
              <div>
              <label>Giá </label>
              <label style="color: #0F60FF;">*</label>
              </div>
              <input placeholder="Nhập giá sản phẩm" v-model="product.price">
            </div>
            <div class="input"  style="margin-bottom: 16px">
              <div>
              <label>Số lượng </label>
              <label style="color: #0F60FF;">*</label>
              </div>
              <input placeholder="Nhập số lượng sản phẩm" v-model="product.count">
            </div>
            <div class="input-description">
              <label>Mô tả</label>
              <textarea placeholder="Nhập mô tả" v-model="product.description"></textarea>
            </div>
            <div class="input">
              <div>
              <label>Ảnh sản phẩm </label>
              <label style="color: #0F60FF">*</label>
              </div>
              <input placeholder="Nhập link ảnh sản phẩm" v-model="product.image">
            </div>
          </div>
          <div class="button">
                <div style="display: flex; width: 191px; height: 32px; margin-left: 229px; ">
                  <div style="width: 70px; height: 32px; margin-top: 10px; margin-right: 20px">
                    <button @click="setCheck"
                            style="width: 100%;
                             height: 100%;
                             border-radius: 6px;
                             border: 1px solid rgba(70, 79, 96, 0.16); font-family: 'Public Sans' ">Hủy</button>
                  </div>
                  <div style="width: 105px; height: 32px; margin-top: 10px">
                    <button style="width: 100%;
                    height: 100%;
                    background-color: #0F60FF;
                    border-radius: 6px;
                     border: 1px solid rgba(70, 79, 96, 0.16);
                     font-family: 'Public Sans';
                       color: #FFFFFF" type="submit" v-if="dataProduct == null">Tạo mới</button>
                    <button style="width: 100%;
                    height: 100%;
                    background-color: #0F60FF;
                    border-radius: 6px;
                     border: 1px solid rgba(70, 79, 96, 0.16);
                     font-family: 'Public Sans';
                       color: #FFFFFF" type="submit" v-else="this.dataProduct">Cập nhật</button>
                  </div>
                </div>
          </div>
          </form>
        </div>
        <template>
        </template>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props:['dataProduct'],
  emits:['setCheck','updateProduct'],
  data() {
    return {
      dialog: true,
      product:{
        id:'',
        name:'',
        price:'',
        count:'',
        description:'',
        image:''
      }
    }
  },
  watch:{
    dataProduct(val){
      this.product.id = val.id;
      this.product.name = val.name;
      this.product.price = val.price;
      this.product.count = val.count;
      this.product.description = val.description;
      this.product.image = val.image
    },

  },
  computed:{
        dataNew(){
          // this.product.id = this.dataProduct.id;
          // this.product.name = this.dataProduct.name;
          // this.product.price = this.dataProduct.price;
          // this.product.count = this.dataProduct.count;
          // this.product.description = this.dataProduct.description;
          // this.product.image = this.dataProduct.image;
          // return this.product;
          const productNew = this.dataProduct;
          return productNew
        }
  },
  methods:{
    createProductOrUpdate() {
      if(!this.dataProduct){
        console.log('day la con')
        this.$store.dispatch('products/createProduct', this.product);
      }
      else{
        this.$emit('updateProduct', this.product);
      }

      this.$emit('setCheck', false)

    },
    setCheck(){
      this.$emit('setCheck', false)
    }
  }
}
</script>

<style scoped>
.form-product{
  width: 440px;
  height: 614px;
  top: 140px;
  left: 1732px;
  gap: 0px;
  border-radius: 12px 0px 0px 0px;
  opacity: 0px;
  background-color: #F7F8FA;

}
.title{
  margin-top: -3.5%;
  width: 440px;
  height: 54px;
  gap: 0px;
  border-radius: 12px 12px 0px 0px;
  opacity: 0px;
  background-color: #FFFFFF;

}
.title p{
  width: 151px;
  height: 21px;
  font-size: 18px;
  font-weight: 500;
  font-family: Public Sans;
  margin-top: 17px;
  margin-left: 20px;
  color: #1A2240;
}
.body-new{
  width: 400px;
  height: 460px;
  margin-top: 20.5px;
  margin-left: 20px;
  gap: 16px;
}
.input{
  width: 400px;
  height: 60px;
  display: flex;
  flex-direction: column;

}
.input label{
  margin-bottom: 2px;
}
.input input{
  width: 400px;
  height: 32px;
  margin-bottom: 2px;
  background-color: #FFFFFF;
  border: none;
  outline: none;
  border-radius: 6px;
  padding: 5px;
}
.input-description{
  width: 400px;
  height: 156px;
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
}
.input-description label{
  margin-bottom: 5px;
}
.input-description textarea{
  width: 400px;
  height: 128px;
  background-color: #FFFFFF;
  border: none;
  outline: none;
}
.button{
  width: 440px;
  height: 64px;
  background-color: #FFFFFF;
  margin-top: 12px;
}
</style>

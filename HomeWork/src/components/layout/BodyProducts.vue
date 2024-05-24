<template>
  <div class="form-search" >
    <div class="search">
      <div><input type="text" placeholder="Tìm kiếm" v-model="searchTerm"></div>
      <div style="margin-top: 2px"><button ><img src="../../assets/mingcute_search-line.png" alt=""></button></div>
    </div>
    <div class="button" >
      <v-btn @click="changeDialog">+ Tạo mới</v-btn>
    </div>
  </div>

  <div style="width: 1128px; height: 697px; margin-top: 56px; border-radius: 6px">
    <v-table density="compact">
      <thead style="height: 47px">
      <tr>
        <th class="text-left" style="color: #8B909A; font-family: 'Public Sans'">TÊN SẢN PHẨM</th>
        <th class="text-left" style="color: #8B909A; font-family: 'Public Sans'">GIÁ</th>
        <th class="text-left" style="color: #8B909A; font-family: 'Public Sans'">SỐ LƯỢNG</th>
        <th class="text-left" style="color: #8B909A; font-family: 'Public Sans'">MÔ TẢ</th>
        <th class="text-left" style="color: #8B909A; font-family: 'Public Sans'">ẢNH</th>
        <th class="text-left" style="color: #8B909A; font-family: 'Public Sans'">HÀNH ĐỘNG</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="product in amountProduct" :key="product.name" style="height: 58px">
        <td style="color: #23272E; font-family: 'Public Sans'">{{ product.name }}</td>
        <td style="color: #23272E; font-family: 'Public Sans'">{{ product.price }}</td>
        <td class="td3" style="color: #23272E; font-family: 'Public Sans'">{{ product.count }}</td>
        <td class="td4" style="color: #23272E; font-family: 'Public Sans'">{{ product.description }}</td>
        <td class="td5" ><img :src='product.image' alt="Ảnh sản phẩm 1" style="width: 36px; height: 36px"></td>
        <td class="td6" style="display: flex; margin-top: 22px ">
          <button @click="editProduct(product.id)"><img src='../../assets/edit.png' style="width: 24px;height: 24px;">
          </button>
          <button @click="deleteProduct(product.id)"><img src='../../assets/delete.png'
                                                          style="width: 24px;height: 24px"></button>
        </td>
      </tr>
      </tbody>
    </v-table>
    <div class="footer"
         style="border-top: 1px solid rgb(70, 79, 96, 0.16); background-color: #FFFFFF; border-radius: 0px 0px 6px 6px">
      <div style="display: flex; justify-content: space-between">
        <div style="display: flex">
          <div style="color: #8B909A; font-size: 15px; font-family: 'Public Sans'; height: 38px; margin-top: 14px">
            Showing
          </div>
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
          <div style="color: #8B909A; font-size: 15px; font-family: 'Public Sans'; height: 38px; margin-top: 14px">of
            {{ totalProducts}}
          </div>
        </div>
        <div style="margin-top: 14px">
          <v-pagination v-model="page" :length=width :total-visible="5" :size="`28px`"></v-pagination>
        </div>
      </div>
    </div>
  </div>
  <create-product v-if="checkProduct == true" @set-check="receiveProduct" :dataProduct='product'
                  @update-product="updateProduct"></create-product>
</template>

<script>
import Swal from "sweetalert2";
import users from "@/store/modules/users/index.js";

export default {
  data() {
    return {
      searchTerm:'',
      product: null,
      checkProduct: false,
      products: this.$store.getters['products/products'].slice(0, 10),
      select: {state: '10'},
      items: [
        {state: '10'},
        {state: '20'},
        {state: '30'},
      ],
      page: 1,
    }
  },
  watch: {
    searchTerm(val) {
      console.log("ok")
      const tmp = this.$store.getters['products/products'].slice();
      console.log(tmp);
      const result = tmp.filter(product => {
        return product.name.toLowerCase().includes(val) ||
            product.price.toLowerCase().includes(val) ||
            product.count.toLowerCase().includes(val) ||
            product.description.toLowerCase().includes(val);
      });
      console.log(result)
      this.products = result;
    },
    select(newValue) {
      const length = parseInt(newValue.state);
      const tmp = this.$store.getters['products/products'].slice();
      this.page =  tmp/length;
      if (length >= tmp.length) {
        this.products = tmp;
      } else {
        this.products = tmp.splice(0, length)
      }
    },
    page(newValue) {
      console.log(newValue);
      const length = parseInt(this.select.state);
      const index = newValue * parseInt(this.select.state);
      const tmp = this.$store.getters['products/products'].slice();
      if (length >= tmp.length) {
        console.log("oke")
        this.products = tmp;
      } else {
        console.log("no oke")
        this.products = tmp.splice(index - 10, index)
      }
    },
    totalProducts(val){
      this.products = this.$store.getters['products/products'].slice(0, 10);
    },
    checkProduct(val){
      if(!val) this.product = null;
    }
  },
  computed: {
    amountProduct() {
      return this.products
    },
    width() {
      if (parseInt(this.select.state) > this.$store.getters['products/products'].length) return 1;
      if (this.$store.getters['products/products'].length % 10 == 0) {
        return this.$store.getters['products/products'].length / parseInt(this.select.state);
      } else {
        return this.$store.getters['products/products'].length / parseInt(this.select.state) + 1;
      }
    },
    totalProducts() {
      return this.$store.getters['products/products'].length;
    },
  },
  methods: {
    async editProduct(id) {
      console.log(id)
      console.log("edit")
      this.checkProduct = true;
      this.product = await this.$store.getters['products/getById'](id);
    },
    deleteProduct(id) {
      Swal.fire({
        title: "Muốn xóa sản phẩm?",
        text: "Bạn chắc chắn chứ?",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Đồng ý",
        cancelButtonText: "Hủy bỏ",
      }).then((result) => {
        if (result.isConfirmed) {
          console.log(id);
          this.$store.dispatch('products/deleteProduct', id).then(() => {
            this.products = this.$store.getters['products/products'].slice(0, 10);
          });
        }
      });
    },
    receiveProduct(data) {
      this.checkProduct = data;
    },
    updateProduct(data) {
      this.$store.dispatch('products/updateProduct', data).then(() => {
        this.products = this.$store.getters['products/products'].slice(0, 10);
        console.log(users)
      })
    },
    changeDialog(){
      this.checkProduct = true;
      this.product = null;
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


.header th {
  font-family: "Public Sans";
  color: #8B909A;
  padding: 16px, 20px, 16px, 20px;
  gap: 4px;
  opacity: 0px;
  height: 47px;
  box-sizing: border-box;
  font-size: 13px;
}


.body td {
  font-family: "Public Sans";
  font-size: 15px;
  color: #23272E;

}

.td3 {
  width: 127px;
  height: 50px;
  gap: 10px;
  opacity: 0px;
}

.td4 {
  width: 313px;
  height: 48px;
  gap: 10px;
  opacity: 0px;

}

.td5 {
  width: 141.5px;
  height: 50px;
  gap: 4px;
  opacity: 0px;
}

.td6 button {
  border: none;
  background: none;
}

button:hover {
  cursor: pointer;
}

td, th {
  text-align: left;
  padding: 8px;
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
<script setup>
import CreateProduct from "@/components/layout/CreateProduct.vue";
</script>

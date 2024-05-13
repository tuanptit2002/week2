import Swal from "sweetalert2";
export default{
   async createProduct(context, payload){
        const response = await fetch('https://week2-30338-default-rtdb.firebaseio.com/products.json',{
            method:"POST",
            body:JSON.stringify(payload)
        });
       const responseData = await response.json();
       if(!response.ok){
           const  error = new Error(responseData.message || 'Failed to send request.');
           throw error;

           Swal.fire({
               icon: "error",
               title: "Oops...",
               text: "Something went wrong!",
               footer: '<a href="#">Why do I have this issue?</a>'
           });
       }
       else{
           context.commit('addProduct',payload)
           Swal.fire({
               title: "Tạo thành công!",
               text: "You clicked the button!",
               icon: "success"
           })
       }
    },
    async getAllProduct(context){
        const response = await fetch('https://week2-30338-default-rtdb.firebaseio.com/products.json');
        const responseData = await  response.json();
        const dataProduct=[];
        for(const data in responseData){
            const product = {
                id:data,
                count:responseData[data].count,
                description: responseData[data].description,
                image:responseData[data].image,
                name:responseData[data].name,
                price:responseData[data].price
            }
            dataProduct.push(product)
        }
        console.log(dataProduct);
        context.commit('products', dataProduct);
    },
    async deleteProduct(context, payload){
       const response = await fetch(`https://week2-30338-default-rtdb.firebaseio.com/products/${payload}
.json`,{
           method:"DELETE",
       })
        if(response.ok){
            context.commit('deleteProduct',payload)
            Swal.fire({
                title: "Xóa thành công!",
                text: "You clicked the button!",
                icon: "success"
            })
        }else {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!",
                footer: '<a href="#">Why do I have this issue?</a>'
            });
        }
    },
    async updateProduct(context,payload){
        const response = await fetch(`https://week2-30338-default-rtdb.firebaseio.com/products/${payload.id}.json`, {
            method: "PUT",
            body: JSON.stringify(payload)
        });
        const responseData = await response.json();
        if (!response.ok) {
            const error = new Error(responseData.message || 'Failed to send request.');
            throw error;
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!",
                footer: '<a href="#">Why do I have this issue?</a>'
            });
        }
        else{
            context.commit('updateProduct',payload);
            Swal.fire({
                title: "Cập nhật thành công!",
                text: "You clicked the button!",
                icon: "success"
            })
        }
    },
}

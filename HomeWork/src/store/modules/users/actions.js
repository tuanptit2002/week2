import Swal from "sweetalert2";

export default {
    async register(context, payload) {
        const response = await fetch('https://week2-30338-default-rtdb.firebaseio.com/users.json', {
            method: "POST",
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
            context.commit('addUser',payload)
                Swal.fire({
                    title: "Tạo thành công!",
                    text: "You clicked the button!",
                    icon: "success"
                })
            }

    },
    async updateUser(context,payload){
        const response = await fetch(`https://week2-30338-default-rtdb.firebaseio.com/users/${payload.id}.json`, {
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
            context.commit('updateUser',payload);
            Swal.fire({
                title: "Cập nhật thành công!",
                text: "You clicked the button!",
                icon: "success"
            })
        }
    },
    async getAllUser(context) {
        const response = await fetch('https://week2-30338-default-rtdb.firebaseio.com/users.json');
        const responseData = await response.json();
        console.log(responseData)
        const dataUser = [];
        for (const data in responseData) {
            const user = {
                id:data,
                avatar:responseData[data].avatar,
                date: responseData[data].date,
                email:responseData[data].email,
                name:responseData[data].name,
                phone:responseData[data].phone
            }
            dataUser.push(user)
        }
        context.commit('users', dataUser)
    },
    async deleteUser(context, payload){
        const response = await fetch(`https://week2-30338-default-rtdb.firebaseio.com/users/${payload}
.json`,{
            method:"DELETE",
        })
        if(response.ok){
            context.commit('deleteUser', payload)
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
    getById(context, payload){

        context.commit('getById',payload);
    }
}

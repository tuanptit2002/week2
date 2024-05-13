
import getters from "@/store/modules/users/getters.js";
import actions from "@/store/modules/users/actions.js";
import mutations from "@/store/modules/users/mutation.js";
export default {
    namespaced:true,
    state(){
        return{
            users:[]
        }
    },
    getters,
    actions,
    mutations
}

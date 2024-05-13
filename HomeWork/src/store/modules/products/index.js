import getters from "@/store/modules/products/getters.js";
import actions from "@/store/modules/products/actions.js";
import mutations from "@/store/modules/products/mutation.js";
export default {
    namespaced:true,
    state(){
        return{
            products:[]
        }
    },
    getters,
    actions,
    mutations
}

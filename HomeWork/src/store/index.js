import {createStore} from "vuex";
import productsModule from './modules/products'
import usersModule from './modules/users'
import authModule from "@/store/modules/auth/index.js";
const store = createStore({
    modules:{
        products:productsModule,
        users:usersModule,
        auth: authModule
    },
    state(){
        return{
            isClick:'',
            isProduct:false
        }
    },
    getters:{
        isClick(state){
            return state.isClick
        },
        isProduct(state){
            return state.isProduct
        },

    },
    actions:{
        setIsClick(context, data){
            context.commit('setIsClick',{data})
        },
        setIsProduct(context, data){
            context.commit('setIsProduct',{data})
        }
    },
    mutations:{
        setIsClick(state, payload){
            state.isClick = payload
        },
        setIsProduct(state, payload){
            state.isProduct = payload
        },
    }
})

export default store;

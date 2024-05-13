import {createRouter, createWebHistory} from "vue-router";
import BodyProducts from "@/components/layout/BodyProducts.vue";
import BodyUsers from "@/components/layout/BodyUsers.vue";
import Page from "@/components/layout/Page.vue";
import Login from "@/components/pages/Login.vue";
import store from "@/store/index.js";

const router = createRouter({
    history: createWebHistory(),
    routes:[
        {path:'/', redirect:'page'},
        {path:'/page',component:Page},
        {path:'/products', component:BodyProducts, meta: { requiresAuth: true }},
        {path:'/users', component:BodyUsers, meta: { requiresAuth: true }},
        { path: '/auth', component: Login,  meta: { requiresUnauth: true }},
    ]
})

router.beforeEach((to, _, next) => {
    const isAuthenticated = store.getters.isAuthenticated;
    if (to.meta.requiresAuth && !isAuthenticated) {
        next('/auth');
    } else if (to.meta.requiresUnauth && isAuthenticated) {
        next('/page');
    } else {
        next();
    }
});
export default router

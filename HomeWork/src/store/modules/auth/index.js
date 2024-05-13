import mutations from "@/store/modules/auth/mutations.js";
import actions from "@/store/modules/auth/actions.js";
import getters from "@/store/modules/auth/getters.js";
export default {
    state() {
        return {
            userId: null,
            token: null,
            didAutoLogout: false
        };
    },
    mutations,
    actions,
    getters
};

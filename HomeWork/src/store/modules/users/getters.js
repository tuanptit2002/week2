export default {
    getAll(state){
        return state.users
    },
    getById: (state) => (id) => {
        return state.users.find(user => user.id === id);
    }
}

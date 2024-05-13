
export default {
    addUser(state, payload){
        state.users.push(payload);
    },
    users(state, payload){
        console.log("vao roi")
        state.users = payload
    },
    updateUser(state, updatedUser) {
        const index = state.users.findIndex(user => user.id === updatedUser.id);
        if (index !== -1) {
            const updatedUsers = [...state.users];
            updatedUsers[index] = updatedUser;
            state.users = updatedUsers;
        }
    },
    deleteUser(state, userId){
        state.users = state.users.filter(user => user.id !== userId);
    }

}

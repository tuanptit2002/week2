export default {
    products(state){
        return state.products;
    },
    getById: (state) => (id) => {
        return state.products.find(product => product.id === id);
    }
}

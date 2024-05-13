export default {
    addProduct(state, payload){
        state.products.push(payload)
    },
    products(state, payload){
        state.products= payload;
    },


    updateProduct(state, updatedProduct) {
        const index = state.products.findIndex(product => product.id === updatedProduct.id);
        if (index !== -1) {
            const updatedProducts = [...state.products];
            updatedProducts[index] = updatedProduct;
            state.products = updatedProducts;
        }
    },
    deleteProduct(state, productId){
        state.products = state.products.filter(product => product.id !== productId);
    }
}

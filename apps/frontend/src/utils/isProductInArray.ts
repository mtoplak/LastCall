export const isProductInArray = (products: any, productId: string | undefined) => {
    for (let item of products) {
        if (item.product._id === productId) {
            return true;
        }
    }
    return false;
};
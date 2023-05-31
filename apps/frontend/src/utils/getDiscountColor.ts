export const getDiscountColor = (discount: number) => {
    return discount === 0 ? 'black' : 'error';
};
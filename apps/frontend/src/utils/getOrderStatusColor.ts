export const getOrderStatusColor = (status: string) => {
    switch (status) {
        case 'Order placed':
            return 'primary';
        case 'In-Transit':
            return 'orange';
        case 'Delivered':
            return 'green';
        case 'Cancel':
            return 'error';
        default:
            return 'inherit';
    }
};
export const getOrderStatusColor = (status: string) => {
    switch (status) {
        case 'Accepted':
            return 'primary';
        case 'In-Transit':
            return 'orange';
        case 'Delivered':
            return 'green';
        case 'Rejected':
            return 'error';
        default:
            return 'inherit';
    }
};
const shippingOptions = [
    {
        id: 1,
        method: 'UPS Next Day Air',
        cost: 5.25
    },
    {
        id: 2,
        method: 'FedEx Ground Shipping',
        cost: 2.00
    },
    {
        id: 5,
        method: 'Hand Delivered',
        cost: 500.00
    }
];

const productImages = [
    {
        url: 'https://images.unsplash.com/photo-1498426107726-70079c7f6c6d'
    }
];

const taxInfo = [
    {
        subtotal: 10.00,
        tax: 0.60,
        total: 10.60
    }
];

const placedOrders = [
    {
        customerID: 1111111,
        orderID: 123456
    }
];

const updatedOrders = [
    {
        transaction_id: '1d02caa0a7833aa3917aa5f00f33b85f',
        error_code: '000',
        auth_response_text: 'Address Match',
        avs_result: 'A',
        cvv2_result: 'M',
        auth_code: 'T8921H',
        eresp_invoice_number: 106130
    }
];

export {
    shippingOptions,
    productImages,
    taxInfo,
    placedOrders,
    updatedOrders
};
import delay from './delay';
import { updatedOrders } from './_mockData';
import config from '../../storefront/config';

class OrderApi {
    
    /**
     * Accepts post body with order information
     */
    static placeOrder(data) {
        
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                let formData = new URLSearchParams();
                let subtotalPrice = 0;

                let orderResponseData = null;

                data.items.map((item) => {
                  subtotalPrice += item.posterData.templates[item.templateId].price * item.quantity;
                });
                formData.append('cardholder_first_name', data.shipping.address.fullName);
                formData.append('cardholder_last_name', '');
                formData.append('cardholder_street_address', data.billing.sameAddressAsShipping ? data.shipping.address.addressLineOne : data.billing.addressLineOne);
                formData.append('echo_address2', data.billing.sameAddressAsShipping ? data.shipping.address.addressLineTwo : data.billing.addressLineTwo);
                formData.append('echo_city', data.billing.sameAddressAsShipping ? data.shipping.address.city : data.billing.city);
                formData.append('echo_state', data.billing.sameAddressAsShipping ? data.shipping.address.state : data.billing.state);
                formData.append('cardholder_zip', data.billing.sameAddressAsShipping ? data.shipping.address.zip : data.billing.zip);
                formData.append('echo_country', data.billing.sameAddressAsShipping ? data.shipping.address.country : data.billing.country);
                formData.append('cardholder_phone', data.shipping.address.phone);
                formData.append('customer_email', data.shipping.address.email);

                formData.append('order[shipping_amount]', data.shipping.deliveryMethod.methodCost);
                formData.append('order[order_subtotal]', subtotalPrice);
                formData.append('order[payment_method]', 'Credit Card');
                formData.append('order[authorization_code]', '');
                // Item data
                data.items.forEach((item, index) => {
                    let textAndTemplate = item.text.slice();
                    if (textAndTemplate.length === 0) {
                        textAndTemplate.push({text: ""});
                    }
                    textAndTemplate.push({text: (typeof item.i6TemplateId !== 'undefined' ? item.i6TemplateId : 0)});
                    formData.append('order[item][' + item.itemId + '][' + index + '][info]', textAndTemplate.map(text => text.text).join('|'));
                    // Sometimes the thumbnails get out of order (CHROME).  Re-order them here.
                    item.thumbnails.sort((a, b) => {
                        return a.id - b.id;
                    });
                    formData.append('order[item][' + item.itemId + '][' + index + '][photo]', JSON.stringify(item.thumbnails.map(photo => photo.thumbnailSrc)));
                    formData.append('order[item][' + item.itemId + '][' + index + '][qty]', item.quantity);
                    formData.append('order[item][' + item.itemId + '][' + index + '][thumbnail]', item.preview);
                });

                // Shipping info.
                formData.append('shipping_first_name', data.shipping.address.fullName);
                formData.append('shipping_last_name', '');
                formData.append('shipping_address1', data.shipping.address.addressLineOne);
                formData.append('shipping_address2', data.shipping.address.addressLineTwo);
                formData.append('shipping_city', data.shipping.address.city);
                formData.append('shipping_state', data.shipping.address.state);
                formData.append('shipping_zip', data.shipping.address.zip);
                formData.append('shipping_country', data.shipping.address.country);
                formData.append('shipping_phone', data.shipping.address.phone);
                formData.append('shipping_email', data.shipping.address.email);

                fetch(config.apiIntegrations.placeOrder, {
                    cache: 'no-cache',
                    method: 'POST',
                    mode: 'cors',
                    referrer: 'no-referrer',
                    body: formData.toString(),
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                    },
                }).then(response => {
                    // If developing locally, comment the below condition out.
                    if (!response.ok) {
                        throw "Unable to place order.  Please try again later.";
                    }
                    return response.json();
                }).then(response => {
                    orderResponseData = response;
                    let paymentFormData = new URLSearchParams();
                    paymentFormData.append('cardholder_street_address', data.billing.sameAddressAsShipping ? data.shipping.address.addressLineOne : data.billing.addressLineOne);
                    paymentFormData.append('cardholder_zip', data.billing.sameAddressAsShipping ? data.shipping.address.zip : data.billing.zip);
                    paymentFormData.append('cvv2_encode', data.billing.cardSecurityCode);
                    paymentFormData.append('invoice_number', response.orderID);
                    paymentFormData.append('card_number_encode', data.billing.cardNumber.replace(/\s/g, ''));
                    const ccDate = data.billing.cardExpiration.split("/");
                    paymentFormData.append('cc_exp_date_month', ccDate[0]);
                    paymentFormData.append('cc_exp_date_year', ccDate[1]);
                    paymentFormData.append('transaction_amount', subtotalPrice + data.shipping.deliveryMethod.methodCost);
                    paymentFormData.append('shipping_first_name', data.shipping.address.fullName);
                    paymentFormData.append('shipping_email', data.shipping.address.email);

                    return fetch(config.apiIntegrations.paymentGateway, {
                      cache: 'no-cache',
                      method: 'POST',
                      mode: 'cors',
                      referrer: 'no-referrer',
                      body: paymentFormData.toString(),
                      headers: {
                        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                      },
                    });
                }).then(response => {
                    // If developing locally, comment the below condition out.
                    if (!response.ok) {
                        throw "Unable to place order.  Please try again later.";
                    }
                    return response.json();
                }).then(data => {

                    if (data.error_code === "000") {
                        return resolve({
                            orderID: data.eresp_invoice_number,
                            orderData: orderResponseData,
                        });
                    }
                    throw data.auth_response_text;
                }).catch(err => {
                    reject(err);
                });

            }, 0);
        });

    }

    /**
     * Accepts post body with updated order information
     */
    static updateOrder(data) {

        return new Promise((resolve, reject) => {
            setTimeout(() => {

                if( !data )
                    reject({
                        status: 'error',
                        error: 'Please provide upated order information!',
                    });
                else
                    resolve( Object.assign({ status: 'success' }, updatedOrders[0]) );

            }, delay);
        });

    }

}

export default OrderApi;

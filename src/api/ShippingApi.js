import delay from './delay';
import { shippingOptions } from './_mockData';

class ShippingApi {
    
    /**
     * Accepts JSON data with keys {address,line_items}s
     */
    static getShippingOptions(data) {

        return new Promise((resolve, reject) => {
            setTimeout(() => {
                
                if( !data || !('address' in data && 'line_items' in data))
                    reject({
                        status: 'error',
                        error: 'Please provide an address and list of items!'
                    }); 
                else
                    resolve( {
                        status: 'success',
                        shipping_options: shippingOptions
                    } );

            }, delay);
        });

    }

}

export default ShippingApi;
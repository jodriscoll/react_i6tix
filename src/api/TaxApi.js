import delay from './delay';
import { taxInfo } from './_mockData';

class TaxApi {
    
    /**
     * Accepts JSON data with key {address,line_items}
     */
    static calculateTax(data) {
        
        return new Promise((resolve, reject) => {
            setTimeout(() => {

                if( !data || !('address' in data && 'line_items' in data) )
                    reject({
                        status: 'error',
                        error: 'Please provide an address and list of items!'
                    });
                else
                    resolve( Object.assign({ status: 'success' }, taxInfo[0] ));

            }, delay);
        });

    }

}

export default TaxApi;
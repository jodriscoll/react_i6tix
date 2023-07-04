import delay from './delay';
import { productImages } from './_mockData';

class ImageApi {
    
    /**
     * Accepts JSON data with key {product}
     */
    static createImageFromCustomization(data) {
        
        return new Promise((resolve, reject) => {
            setTimeout(() => {

                if( !data || !( 'product' in data ) )
                    reject({
                        status: 'error',
                        error: 'Please provide product to create an image for!'
                    });
                else
                    resolve({
                        status: 'success',
                        url: productImages[0].url
                    });

            }, delay);
        });

    }

}

export default ImageApi;
import config from '../../storefront/config';

class ValidateShippingApi {

  /**
   * Accepts JSON data with keys {address}
   */
  static validateAddress(data) {

    return new Promise((resolve, reject) => {
      const payloadData = {
        address: {
          shipping_address1: data.addressLineOne,
          shipping_address2: data.addressLineTwo,
          shipping_city: data.city,
          shipping_state: data.state,
          shipping_zip: data.zip,
          shipping_country: data.country,
          shipping_email: data.email,
          shipping_phone: data.phone,
        }
      };

      fetch(config.apiIntegrations.validateShippingAddress, {
        cache: 'no-cache',
        method: 'POST',
        mode: 'cors',
        referrer: 'no-referrer',
        body: JSON.stringify(payloadData),
      }).then(response => {
        // If developing locally, comment the below condition out.
        if (!response.ok) {
          throw "Unable to validate address.  Please try again later.";
        }
        return response.json();
      }).then(data => {
        if (data.status !== "success") {
          throw data.error;
        }
        return resolve(data);
      }).catch(err => {
        reject(err);
      })

    });

  }

}

export default ValidateShippingApi;
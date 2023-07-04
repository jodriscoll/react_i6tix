/**
 * Poster config
 */

const config = {
    // The <title> tag value.
    'title': '<title here>',
    // The large header logo.
    'logo': './assets/imgs/header.png',
    // The small header logo that is shown on the poster editor screen
    'logoSm': './assets/imgs/header-sm.png',
    // The header logo for the checkout process
    'logoCheckout': './assets/imgs/header-checkout.png',
    // If including fonts from an external source (such as Google Fonts), specify the CSS Stylesheet here.
    'fontStylesheet': 'https://fonts.googleapis.com/css?family=Nunito+Sans:300,400,700|Oswald:200,300,400,700',
    // The stylesheet containing CSS overrides, if any are necessary.
    'styleOverrides': './assets/styles/overrides.css',
    // The partner logo in the lower left of the page.
    'partnersLeft': './assets/imgs/footer-logo-left.svg',
    // The partner logo in the lower right of the page.
    'partnersRight': './assets/imgs/footer-logo-right.svg',
    // The client ID (also referred to as the App ID) of the Facebook app.  Set to an empty string for Facebook Coming Soon.
    'facebookClientId': '1687627621351226',
    // The client ID of the Instagram app.
    'instagramClientId': '8d864b1c1c754a0b9d4063311fa7c809',
    // The Google Analytics ID.
    'googleAnalyticsId': 'UA-119544040-1',
    // The Google Tag Manager ID.  Be sure to also update in storefront.html on lines 8 and 35.
    'googleTagManagerId': '',
    // The URL to the Terms & Conditions.  This displays in a modal when selected from the cart page.
    'termsConditionsUrl': 'https://www.lovemyposter.com/lastwarped/terms&conditions.html',
    // The URL to the refund policy.  This displays in a modal when selected from the cart page.
    'refundPolicyUrl': 'https://www.lovemyposter.com/lastwarped/policies.html',
    // The URL to the shipping policy.  This displays in a modal when selected from the cart page.
    'shippingPolicyUrl': '',
    // The URL to the refund policy.  This displays in a modal when selected from the cart page.
    'privacyPolicyUrl': '',
    // The URL to the contact us information.  This displays in a modal when selected from the cart page.
    'contactUsUrl': '',
    // If you are running the experience in a subdirectory, set this to the name of the subdirectory.
    'directory': '',
    // Specify the different shipping options here.  To have shipping display as "FREE!", set the methodCost to 0.
    // Shipping Options are an array of objects where each object has a methodID, methodName, and methodCost.
    'shippingOptions': [
        {
            // Each shipping method should have a unique ID.
            'methodID': "1",
            // Each shipping method has a name, shown in the dropdown on checkout.
            'methodName': "Free Shipping",
            // Each shipping method has a cost.  Use 0 for "FREE!".
            'methodCost': 0
        },
    ],
    // The PE integrates with 3 different API endpoints within the i6 system.  The URLs for each of these are set here.
    'apiIntegrations': {
        // The URL of the API to validate a shipping address.
        'validateShippingAddress': 'https://www.lovemyposter.com/mindgrub/api/shippingAddressValidation/index.php',
        // The URL of the API to place an order.
        'placeOrder': 'https://www.lovemyposter.com/mindgrub/api/placeOrder.php',
        // The URL of the API to submit a user's payment information.
        'paymentGateway': 'https://www.lovemyposter.com/mindgrub/api/storePaymentGateway.php',
    },
    // At the crux of the PE are the items that can be configured and bought.
    // The PE supports an "unlimited" (within reason) number of posters and each poster can have an "unlimited" (within
    // reason) number of variations known as templates.  The data within each poster is important to the successful
    // operation of the PE and the integration with the APIs.
    'posters': [
        {
            // Each poster is identified in the PE by an ID.  This is normally a monotonically increasing integer and starts at 0.
            'id': 0,
            // The title of the poster.
            'title': '<title here>',
            // The path to the image of the poster, without defined wells.
            'image': './assets/imgs/poster01.png',
            // The item ID of the poster in the API.
            'item_id': 000000,
            // Each poster is comprised of one or more templates, defining variations of the poster.
            'templates': [
                {
                    // Each template is identified in the PE by an ID (scoped within the poster).  This is normally a
                    // monotonically increasing integer.
                    'id': 0,
                    // The template ID for i6 purposes.
                    'i6_id': 1,
                    // The title of the template.
                    'title': '<title here>',
                    // The print dimensions of the poster, used as subtext in some situations and during checkout.
                    'printDimensions': '11 x 17',
                    // The price of the poster.
                    'price': 00.00,
                    // The image of the template, without wells (the PE will add the wells automatically in the builder.
                    'image': './assets/imgs/posters01.png',
                    // The poster instance from the storefront
                    'posterWells': './assets/imgs/poster01-1-layout.png',
                    // The thumbnail image of the template.
                    'thumbnail': './assets/imgs/poster01-1-layout.png',
                    // The width of the template, in pixels.
                    'width': 475,
                    // The height of the template, in pixels.
                    'height': 750,
                    // The uploadSettings define each of the wells on the template.  A template can have any number of
                    // wells, but Mindgrub recommends sticking to 5 or fewer for performance and design.
                    'uploadSettings': [
                        {
                            // The width of the well, in pixels.
                            'width': 335,
                            // The height of the well, in pixels.
                            'height': 295,
                            // The minimum preferred width of user uploaded images.  Images smaller than this size will
                            // show an image resolution warning.  This also controls the size of the image sent to the
                            // API.  Calculated by width in inches (11) x image well width (335) / poster width x 300 DPI
                            'minimumPreferredWidth': 2102,
                            // The minimum preferred height of user uploaded images.  Images smaller than this size will
                            // show an image resolution warning.  This also controls the size of the image sent to the
                            // API.  Calculated by height in inches (17) x image well height (295) / poster height x 300 DPI
                            'minimumPreferredHeight': 1851,
                            // The percentage of the minimum preferred size to use for calculating the image resolution warning.
                            // For example, to use 50% enter .5
                            'dpiRatio': 0.5,
                            // The x position of this well.
                            'x': 65,
                            // The y position of this well.
                            'y': 305,
                            // The rotation of the well.
                            'rotate': -5,
                        },
                    ],
                    // The textSettings define each of the text input areas on the template.  A template can have any
                    // number of text input areas, but normally has just 1 or 2.
                    'textSettings': [
                        {
                            // The font size of the user uploaded text on the poster.
                            'fontSize': 16,
                            // The width of the text input area, in pixels.
                            'width': 389,
                            // The height of the text input area, in pixels.
                            'height': 40,
                            // The maximum number of characters the user can enter in the text input area.
                            'maxLength': 50,
                            // The x position of the text area.
                            'x': 42,
                            // The y position of the text area.
                            'y': 700,
                        }
                    ]
                }
            ],
        },
        // Additional posters are defined below, following the same structure as the poster above.
        {
            'id': 1,
            'title': '<title here>',
            'image': './assets/imgs/poster01.png',
            'item_id': 000000,
            'templates': [
                {
                    'id': 0,
                    'i6_id': 2,
                    'title': '<title here>',
                    'printDimensions': '11 x 17',
                    'price': 00.00,
                    'image': './assets/imgs/poster01.png',
                    'posterWells': './assets/imgs/poster01-2-layout.png',
                    'thumbnail': './assets/imgs/poster01-2-layout.png',
                    'width': 475,
                    'height': 750,
                    'uploadSettings': [
                        {
                            'width': 295,
                            'height': 198,
                            'minimumPreferredWidth': 1851,
                            'minimumPreferredHeight': 1242,
                            'dpiRatio': 0.5,
                            'x': 115,
                            'y': 242,
                            'rotate': -5,
                        },
                        {
                            'width': 295,
                            'height': 198,
                            'minimumPreferredWidth': 1851,
                            'minimumPreferredHeight': 1242,
                            'dpiRatio': 0.5,
                            'x': 58,
                            'y': 480,
                            'rotate': 1,
                        },
                    ],
                    'textSettings': [
                        {
                            'fontSize': 16,
                            'width': 389,
                            'height': 40,
                            'maxLength': 50,
                            'x': 42,
                            'y': 700,
                        }
                    ]
                }
            ],
        },
        {
            'id': 2,
            'title': '<title here>',
            'image': './images/posters/01/default.jpg',
            'item_id': 000000,
            'templates': [
                {
                    'id': 0,
                    'i6_id': 3,
                    'title': '<title here>',
                    'printDimensions': '11 x 17',
                    'price': 00.00,
                    'image': './assets/imgs/poster01.png',
                    'posterWells': './assets/imgs/poster01-3-layout.png',
                    'thumbnail': './assets/imgs/poster01-3-layout.png',
                    'width': 475,
                    'height': 750,
                    'uploadSettings': [
                        {
                            'width': 290,
                            'height': 200,
                            'minimumPreferredWidth': 1819,
                            'minimumPreferredHeight': 1255,
                            'dpiRatio': 0.5,
                            'x': 90,
                            'y': 245,
                            'rotate': -4,
                        },
                        {
                            'width': 195,
                            'height': 195,
                            'minimumPreferredWidth': 1223,
                            'minimumPreferredHeight': 1223,
                            'dpiRatio': 0.5,
                            'x': 28,
                            'y': 480,
                            'rotate': 2,
                        },
                        {
                            'width': 195,
                            'height': 195,
                            'minimumPreferredWidth': 1223,
                            'minimumPreferredHeight': 1223,
                            'dpiRatio': 0.5,
                            'x': 258,
                            'y': 466,
                            'rotate': -5,
                        },

                    ],
                    'textSettings': [
                        {
                            'fontSize': 16,
                            'width': 389,
                            'height': 40,
                            'maxLength': 50,
                            'x': 42,
                            'y': 700,
                        }
                    ]
                }
            ],
        },
    ],
};

export default config;

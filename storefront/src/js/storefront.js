/*
 localStorage management
 */

var initialState = {
    poster: {
        posterId: null
    },
    cart: null
};

var localinterface = (typeof localforage === 'undefined') ? localStorage : localforage;

var setPoster = function(posterId) {
    // For convenience, this always goes in localStorage.
    localStorage.setItem('posterId', posterId);
};

var state = null;
var cartQuantity = 0;

function getCartCount() {
    return new Promise(function(resolve) {
        // The local storage saves under the key `persist:<directory>`.  Try and determine automatically.
        var directoryPath = window.location.pathname;
        var persistKey = 'persist:root';
        if (directoryPath.length > 1 && directoryPath !== '/storefront.html') {
            persistKey = 'persist:' + directoryPath.split("/")[1];
        }

        localinterface.getItem(persistKey).then(function(data) {
            state = Object.assign(initialState, JSON.parse(data));
            if (state.cart) {
                var cart = JSON.parse(state.cart);
                cartQuantity = cart.items.length;
            }
            resolve(cartQuantity);
        });
    });
}

window.onload = function () {
    var slides = document.getElementsByClassName('slides')[0];

    // Get posters.
    var posters = Array.from(document.getElementsByClassName('poster-selection'));

    // Loop through posters and make them clickable.
    posters.forEach( function(poster) {
        poster.onclick = function (e) {
            e.preventDefault();
            // verify that the posters are not being
            // dragged at time of click
            if(!slides.dataset.slickDragging) {
                setPoster(this.dataset.poster);
                var pathname = window.location.pathname == "/storefront.html" ? "/" : window.location.pathname;
                window.location.href = window.location.protocol + "//" + window.location.host + pathname + "poster";
            }
            return false;
        };
    });
};


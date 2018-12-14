; (function () {
    'use strict';

    window.rq = {};

    function get(url) {
        let http = new XMLHttpRequest();
        http.open('get',url);
        http.send();

        http.addEventListener('load',)
    };

    function post() {};

})();
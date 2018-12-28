;(function(){
    'use strict';

    window.rq = {
        get,
    };
    
    get('https://api.github.com/search/users?q=biaoyansu');
    
    function get(url) {
        send(url, 'get');
    }


    function post(url, data) {
        send(url, 'post', data);
    }
    
    
    function send(url, type) {
        let http = new XMLHttpRequest();
        http.open(type, url);
        http.send();

        http.addEventListener('load', () => {
            let data = JSON.parse(http.responseText);
            return data;
        });
    }
    
})();
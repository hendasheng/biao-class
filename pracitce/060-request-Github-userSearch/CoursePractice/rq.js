; (function () {
    'use strict';


    window.rq = { get, post };

    /**
     * 取数据 - 从服务器获取数据
     * @param url - 服务器地址
     */
    function get(url, onSuccess, onError) {
        send(url, 'get', null, onSuccess, onError);
    }


    /**
     * 存数据 - 往服务器发数据
     *
     * @param {} url - 接收数据的地址
     * @param {*} data - 发送的数据
     */
    function post(url, data) {
        send(url, 'post', data, onSuccess, onError);
    };


    function send(url, type, data, onSuccess, onError) {
        let http = new XMLHttpRequest();
        http.open(type, url);
        http.send();

        http.addEventListener('load', () => {
            // 解析数据
            let data = JSON.parse(http.responseText);
            onSuccess && onSuccess(data);
        });
    };
})();

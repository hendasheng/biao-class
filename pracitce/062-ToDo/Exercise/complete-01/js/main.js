;(function(){
    'use strict';

    boot();

    function boot() {
        read();
    }

    function read() {
        api('todo/read', null, data => {
            console.log(data);
        })
    }
    
})()
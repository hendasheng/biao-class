/**
 * 分页插件
 *
 */


; (function () {
    'user strict';

    const DEFAULT_CONFIG = {
        limit: 10,
    };

    let config;
    
    window.biaoPage = {
        boot, render,
    };

    boot();

    function boot(settings) {
        config = { ...DEFAULT_CONFIG, ...settings };
        console.log(config);
    }

    function render() {
        
    }

})();
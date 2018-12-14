/**
 * 分页插件
 *
 */


; (function () {
    'user strict';

    const DEFAULT_CONFIG = {
        limit: 10,
    };

    window.biaoPage = {
        boot, render
    };

    function boot(settings) {
        let config = { ...DEFAULT_CONFIG, ...settings };
        let state = { config };

        prepare(state);
        console.log(config);
    }

    function prepare(state) {
        let el = document.createElement('div');
        el.classList.add('biao-page');
        el.innerHTML = `
                        <span class="shortcuts">
                            <button>prev</button>
                        </span>

                        <span class="page-list">
                            <button>1</button>
                            <button>2</button>
                            <button>3</button>
                        </span>

                        <span class="shortcuts">
                            <button>next</button>
                        </span>
                        `;

        state.root = document.querySelector(state.config.selector);
        state.el = el;
        state.root.appendChild(el)
        
    }

    function render(state) {
        
    };

})();

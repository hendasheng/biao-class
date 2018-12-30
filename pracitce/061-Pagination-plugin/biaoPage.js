/**
 * 分页插件
 *
 */


; (function () {
    'user strict';

    const DEFAULT_CONFIG = {
        limit: 10,
    }

    window.biaoPage = {
        boot,
        render
    }

    function boot(settings) {
        let config = { ...DEFAULT_CONFIG, ...settings };
        let state = {
            config
        };
        prepare(state);
        render(state);
    }

    function prepare(state) {
        let el = document.createElement('div');
        el.classList.add('biao-page');
        el.innerHTML = `
                        <span class="shortcuts">
                            <button>prev</button>
                        </span>

                        <span class="page-list">

                        </span>

                        <span class="shortcuts">
                            <button>next</button>
                        </span>
                        `;
        state.root = document.querySelector(state.config.selector);
        state.el = el;
        state.pageList = el.querySelector('.page-list');
        state.root.appendChild(el);
    }

    function render(state) {
        // console.log(state);
        // ↓ 页面数              ↓ 向上取整         ↓ 数据总数             ↓ 每页显示数量
        let amount = state.pageCount = Math.ceil(state.config.amount / state.config.limit);

        state.pageList.innerHTML = '';

        for (let i = 1; i <= amount; i++) {
            let button = document.createElement('button');
            button.innerText = i;
            state.pageList.appendChild(button);
        }
    }

})();

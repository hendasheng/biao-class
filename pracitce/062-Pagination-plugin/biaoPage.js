/**
 * 分页插件
 *
 */


; (function () {
    'user strict';

    const DEFAULT_CONFIG = {
        limit: 10,
        currentPage: 1,
    };

    window.biaoPage = {
        boot, render
    };

    function boot(settings) {
        let config = { ...DEFAULT_CONFIG, ...settings };
        let state = { config };

        state.currentPage = config.currentPage;

        prepare(state);
        render(state);
        bindEvents(state);
    }

    /**
     * 准备页面结构
     *
     * @param {Object} state
     */
    function prepare(state) {
        let el = document.createElement('div');
        el.classList.add('biao-page');
        el.innerHTML = `
                        <span class="shortcuts">
                            <button class="prev">prev</button>
                            <button class="first">first page</button>
                        </span>

                        <span class="page-list"></span>

                        <span class="shortcuts">
                            <button class="last">last page</button>
                            <button class="next">next</button>
                        </span>
                        `;

        state.root = document.querySelector(state.config.selector);
        state.el = el;

        state.pageList = el.querySelector('.page-list');
        state.root.appendChild(el)
    }

    /**
     * 渲染页面
     *
     * @param {*} state
     */
    function render(state) {
        let pageAmount =
            state.pageCount =
            Math.ceil(state.config.amount / state.config.limit);

        let list = state.pageList;
        list.innerHTML = '';

        for (let i = 0; i < pageAmount; i++) {
            let page = i + 1;
            let button = document.createElement('button');

            button.classList.add('biao-page-item');

            if (state.currentPage === page)
                button.classList.add('active');

            button.innerText = page;

            button.$page = page;

            state.pageList.appendChild(button);
        }
        state.buttons = state.pageList.querySelectorAll('.biao-page-item');
    };


    /**
     * 绑定事件
     *
     * @param {*} state
     */
    function bindEvents(state) {
        state.el.addEventListener('click', e => {
            let target = e.target
            let page = target.$page;
            let klass = target.classList;

            if (page) {
                setCurrentPage(state, page);
            }


            if (klass.contains('next'))
                setCurrentPage(state, state.currentPage + 1);

            if (klass.contains('prev'))
                setCurrentPage(state, state.currentPage - 1);

            if (klass.contains('first'))
                setCurrentPage(state, 1);

            if (klass.contains('last'))
                setCurrentPage(state, state.pageCount);

        });
    }

    function setCurrentPage(state, page) {
        if (page < 1)
            return setCurrentPage(state, 1);

        if (page > state.pageCount)
            return setCurrentPage(state, state.pageCount);

        state.currentPage = page;

        let onChange = state.config.onChange;
        if (onChange)
            onChange(page, state);

        state.buttons.forEach(it => {
            if (it.$page != page) {
                it.classList.remove('active');
                return;
            }
            it.classList.add('active');
        });
    }


})();

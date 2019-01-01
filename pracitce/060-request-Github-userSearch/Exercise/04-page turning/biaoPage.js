/**
 * 分页插件
 *
 */


; (function () {
    'user strict';

    const DEFAULT_CONFIG = {
        limit: 10,
        currentPage: 1,
    }

    window.biaoPage = {
        boot,
    }

    /**
     * 启动
     *
     * @param {Object} settings
     */
    function boot(settings) {
        // 合并默认配置（config）和用户配置（srttings）
        let config = { ...DEFAULT_CONFIG, ...settings };
        // 所有配置保存大 state 内容
        let state = { config };

        // 把 当前页数 拷贝到 state 中
        state.currentPage = config.currentPage;

        prepare(state);
        render(state);
        bindEvents(state);
    }

    /**
     * 准备
     *
     * @param {Object} state
     */
    function prepare(state) {
        // 为翻页按钮准备 HTML 结构
        let el = document.createElement('div');
        // 添加类名
        el.classList.add('biao-page');
        // 填充 HTML 结构
        el.innerHTML = `
                        <span class="shortcuts">
                        <button class="first">first</button>
                        <button class="prev">prev</button>
                        </span>

                        <span class="page-list">
                     
                        </span>

                        <span class="shortcuts">
                        <button class="next">next</button>
                        <button class="last">last</button>
                        </span>
                        `;

        // 缓存 biao-page
        state.el = el;

        // 缓存 翻页按钮的 HTML 根元素
        state.root = document.querySelector(state.config.selector);
        // 缓存 翻页按钮 的 HTML 元素
        state.pageList = el.querySelector('.page-list');

        // 将填充好的 按钮 插入到跟元素中
        state.root.innerHTML = '';
        state.root.appendChild(el);
    }

    /**
     * 渲染页面按钮
     *
     * @param {Object} state
     */
    function render(state) {
        // 计算总页数
        let pageAmount = state.pageCount = Math.ceil(state.config.amount / state.config.limit);

        state.pageList.innerHTML = '';

        // 计算按钮数量，并插入到 HTML 结构中
        for (let i = 0; i < pageAmount; i++) {
            let page = i + 1;
            let button = document.createElement('button');
            button.classList.add('biao-page-item');

            // 如果是 当前页 ，给当前按添加 active 类名
            if (state.currentPage === page)
                button.classList.add('active');

            button.innerText = page;

            // 在按钮对象上几页当前页码
            button.$page = page;

            state.pageList.appendChild(button);
        };
        // 缓存所有按钮
        state.buttons = state.pageList.querySelectorAll('.biao-page-item');
    }


    function bindEvents(state) {
        // el 为 'biao-page'
        state.el.addEventListener('click', e => {
            let target = e.target;
            // 如果有 $page 则代表点击的是 button
            let page = target.$page;

            // 如果 数字按钮
            if (page) {
                setCurrnetPage(state, page);
            }

            // 如果是上一页
            if (target.classList.contains('prev'))
                setCurrnetPage(state, state.currentPage - 1);

            // 如果是 下一页
            if (target.classList.contains('next'))
                setCurrnetPage(state, state.currentPage + 1);

            // 如果是第一页
            if (target.classList.contains('first'))
                setCurrnetPage(state, 1);

            // 如果是最后一页
            if (target.classList.contains('last'))
                setCurrnetPage(state, state.pageCount);
        });
    }


    /**
     * 前往 当前页
     * 给相应按钮添加 active 类名
     * @param {Object} state
     * @param {HTMLElemnt} page
     */
    function setCurrnetPage(state, page) {
        // 比如在 第一页 时点击 上一页
        if (page < 1)
            return setCurrnetPage(state, 1);

        // 比如在 最后一页 时点击 下一页
        if (page > state.pageCount)
            return setCurrnetPage(state, state.pageCount);

        // 记录当前页码
        state.currentPage = page;

        // 如果用户传入 onChange，就执行 onChange()
        let onChange = state.config.onChange;
        onChange && onChange(page, state);

        // 更新高亮按钮
        state.buttons.forEach(it => {
            // 如果按钮中缓存的 page 不等于 当前点击的 page
            if (it.$page != page) {
                // 则去掉 active 类名
                it.classList.remove('active');
                return;
            }
            // 否则给当前 button 添加 active 类名
            it.classList.add('active');
        });
    }

})();

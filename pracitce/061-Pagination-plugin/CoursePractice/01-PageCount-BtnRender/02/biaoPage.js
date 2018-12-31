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
        let state = {
            config,
        };
        prepare(state);
        render(state);
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
                        <button>prev</button>
                        </span>

                        <span class="page-list">
                     
                        </span>

                        <span class="shortcuts">
                        <button>next</button>
                        </span>
                        `;
        // 找到存放 翻页按钮的 HTML 根元素
        state.root = document.querySelector(state.config.selector);
        // 找到存放 翻页按钮 的 HTML 元素
        state.pageList = el.querySelector('.page-list');
        // 将填充好的 按钮 插入到跟元素中
        state.root.appendChild(el);
    }

    /**
     * 渲染页面按钮
     *
     * @param {Object} state
     */
    function render(state) {
        // 计算总页数
        let amount = state.pageCount = Math.ceil(state.config.amount / state.config.limit);

        state.pageList.innerHTML = '';
        
        // 计算按钮数量，并插入到 HTML 结构中
        for(let i = 1; i <= amount; i++) {
            let button = document.createElement('button')    ;
            button.innerText = i;
            state.pageList.appendChild(button);
        };
    }


})();

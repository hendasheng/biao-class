/**
 * 分页插件
 *
 */


; (function () {
    'user strict';

    // 默认配置
    const DEFAULT_CONFIG = {
        limit: 10,
    }

    // 暴露全局函数
    window.biaoPage = {
        boot,
        render
    }


    /**
     * 启动
     * @param {Object} settings
     */
    function boot(settings) {
        // 合并用户配置和默认配置
        let config = { ...DEFAULT_CONFIG, ...settings };
        // 保存所有配置数据（用户自定义配置 / 插件配置
        // state.config... --> 中为用户配置
        // state... -> 包括 用户配置（config）和插件配置
        let state = {
            config
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
        // 创建包含翻页的 HTML 结构
        let el = document.createElement('div');
        el.classList.add('biao-page');
        // 填充内部数据
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
        // 找到配置根元素，此时为 ".footer"
        state.root = document.querySelector(state.config.selector);
        
        // 储存包含按钮的 HTML 结构，便于在 render 调用
        state.pageList = el.querySelector('.page-list');
        
        // 把填充好的 biao-page 插入到根元素中
        state.root.appendChild(el);
    }

    /**
     * 渲染
     * @param {Object} state
     */
    function render(state) {
        // console.log(state);
        // ↓ 页面数              ↓ 向上取整         ↓ 数据总数             ↓ 每页显示数量
        let amount = state.pageCount = Math.ceil(state.config.amount / state.config.limit);

        // 每次渲染时先清空 page-list
        state.pageList.innerHTML = '';

        // 循环 页面数
        for (let i = 1; i <= amount; i++) {
            // 给每个页面数字创建 button
            let button = document.createElement('button');
            // 填充 button
            button.innerText = i;
            // 把 button 插入到 page-list HTML 结构中
            state.pageList.appendChild(button);
        }
    }

})();

; (function () {
    'use strict';

    window.biaoAlert = boot;

    let container;

    // 默认配置
    const defaultConfig = {
        type: 'info', // 类型
        timeout: 2000,  // 在 timeout 后，启动 xx
        containerClass: 'biao-alert-container', // 容器类名
        clickToClose: true, // 有点击关闭事件
    }

    // 启动
    function boot(title, config) {
        // 合并用户配置和默认配置
        config = { ...defaultConfig, ...config, title };
        prepare(config);
        render(config);
        openRemind(config);
        bindEvents(config);
    }
    
    // 准备
    function prepare(config) {
        container = document.querySelector('.' + config.containerClass);
        if (container)
            return;

        container = document.createElement('div');
        container.classList.add(config.containerClass);
        document.body.appendChild(container);
    }

    // 渲染消息 list
    function render(config) {
        let el = document.createElement('div');
        el.classList.add('biao-alert');
        el.classList.add(config.type);
        el.innerHTML = `
                        <div class="inner">
                            <div class="title">${config.title}</div>
                            <div class="desc">${config.desc}</div>
                        </div>
                        `;
        config.el = el;
    }

    /**
     * 打开 提醒
     * @param {Object} config 
     */
    function openRemind(config) {
        // 如果有 onOpen 就执行
        config.onOpen && config.onOpen(config);
        container.appendChild(config.el);

        if (!config.timeout)
            return;

        // 参照 timeout 关闭提醒
        setTimeout($ => {
            closeRemind(config);
        }, config.timeout);
    }

    /**
     * 关闭 提醒
     * @param {Object} config 
     */
    function closeRemind(config) {
        config.onClose && config.onClose(config);
        config.el.style.opacity = 0;
    }

    /**
     * 绑定点击事件
     * @param {Object} config 
     */
    function bindEvents(config) {
        config.el.addEventListener('click', e => {
            config.onClick && config.onClick(config);
            if (config.clickToClose)
                closeRemind(config);
        })
    }

})();



; (function () {
    'use strict';

    window.biaoAlert = boot;

    let container;

    const defaultCongif = {
        type: 'info',
        containerClass: 'biao-alert-container',
        clickToClose: true,
        timeout: 2000,
    }

    function boot(title, config) {
        config = { ...defaultCongif, ...config, title };
        prepare(config);
        render(config);
        open(config);
        bindClick(config);
    }

    /**
     * 准备包含提醒的容器
     * @param {*} config
     */
    function prepare(config) {
        let getContainer = document.querySelector('.' + config.containerClass);
        if (getContainer)
            return;

        container = document.createElement('div');
        container.classList.add(config.containerClass);
        document.body.appendChild(container);
    }

    /**
     * 渲染提醒
     * @param {*} config
     */
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
        document.body.appendChild(el);
        // 把 biao-alert 缓存到 config 中，方便后面调用
        config.el = el;

        // 如果 config.timeout 为 false，则返回（一直显示）
        if (!config.timeout)
            return;

        // 根据 config.timeout 设置显示事件
        setTimeout($ => {
            close(config);
        }, config.timeout);

    }

    /**
     * 显示提醒
     *
     * @param {*} config
     */
    function open(config) {
        config.onOpen && config.onOpen(config);
        container.appendChild(config.el);
    }

    /**
     * 隐藏提醒
     *
     * @param {*} config
     */
    function close(config) {
        config.onClose && config.onClose(config);
        config.el.hidden = true;
    }

    function bindClick(config) {
        config.el.addEventListener('click', e => {
            config.onClick && config.onClick(config);
            if (config.clickToClose)
                close(config);
        })
    }

})();



; (function () {
    'use strict';

    window.biaoAlert = boot;

    let container;

    const defaultConfig = {
        type: 'info',
        timeout: 2000,
        containerClass: 'biao-alert-container',
        clickToClose: true,
    }

    function boot(title, config) {
        // 合并默认配置和用户配置
        config = { ...defaultConfig, ...config, title };
        prepareEnv(config);
        render(config);
        open(config);
        bindClick(config);
    }

    /**
     * 准备环境
     * @param {Object} config
     * @returns
     */
    function prepareEnv(config) {
        // 所有提醒都存在一个容器内
        container = getContainer(config);

        // 如果有就直接用
        if (getContainer(config))
            return;

        // 没有就造一个
        container = document.createElement('div');
        container.classList.add(config.containerClass);
        document.body.appendChild(container);

    }

    /**
     * 获取容器
     * @param {Object} config
     * @returns
     */
    function getContainer(config) {
        return document.querySelector('.' + config.containerClass);
    }

    /**
     * 渲染提醒到页面中
     * @param {Object} config
     */
    function render(config) {
        let el = document.createElement('div');
        el.classList.add('biao-alert');
        
        // 给不同的类型添加不同的类
        // 实现不同类型不同的颜色
        el.classList.add(config.type);
        // el.hidden = true;
        el.innerHTML = `
                        <div class="inner">
                        <div class="title">${config.title}</div>
                        ${config.desc ? `<div class="desc">${config.desc}</div>` : ''}
                        </div>
                    `;
        document.body.appendChild(el);

        // 把 biao-alert(每个提醒) 缓存到 config 中
        config.el = el;
    }

    /**
     * 显示提醒
     * @param {Object} config
     * @returns
     */
    function open(config) {
        // 如果有回调就叫 回调函数
        config.onOpen && config.onOpen(config);
        container.appendChild(config.el);

        // 如果没有期限，就一直显示
        if (!config.timeout)
            return;

        // 如果有期限就按人家说的办
        setTimeout(e => {
            // 到指定时间隐藏提醒
            close(config);
        }, config.timeout);
    }

    /**
     * 隐藏提醒
     * @param {Object } config
     */
    function close(config) {
        config.onClose && config.onClose(config);
        config.el.hidden = true;
    }


    /**
     * 当被点击时
     *
     * @param {Object} config
     */
    function bindClick(config) {
        config.el.addEventListener('click', e => {
            // clickToClose 为 true 则表示执行在点击时隐藏
            if (config.clickToClose)
                close(config);

            // 如果有回调，就叫回调函数
            config.onClick && config.onClick(config);
        });
    }


})();



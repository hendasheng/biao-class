; (function () {
    'use strict';

    window.biaoAlert = boot;

    let container;

    const defaultConfig = {
        type: 'info', // {info | warn | danger | success} 类型，默认为 info
        containerClass: 'biao-alert-container',     // 包含所有提醒的容器
        clickToClose: true,     // 点击是否关闭 - 默认是
        timeout: 2000,  // 显示时间 - 默认 2000
    }

    function boot(title, config) {
        config = { ...defaultConfig, ...config, title };
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
        // 如果包含所有的容器存在，就退出
        if (getContainer)
            return;

        // 创建包含所有提醒的容器
        container = document.createElement('div');
        // 定义类名
        container.classList.add(config.containerClass);
        // 插入到 body 中
        document.body.appendChild(container);
    }

    /**
     * 渲染提醒
     * @param {*} config
     */
    function render(config) {
        // 创建包含每条提醒的容器
        let el = document.createElement('div');
        // 追加类名
        el.classList.add('biao-alert');
        // 追加类名，通过 类型 控制不同的显示颜色
        el.classList.add(config.type);
        el.innerHTML = `
                        <div class="inner">
                        <div class="title">${config.title}</div>
                        <div class="desc">${config.desc}</div>
                        </div>
                    `;

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
        // 把在 render 中组装好的字符串，插入到 container 中
        container.appendChild(config.el);
    }

    /**
     * 隐藏提醒
     * @param {*} config
     */
    function close(config) {
        // 如果有配置中有 onClose 就执行
        config.onClose && config.onClose(config);
        config.el.style.opacity = 0;
    }


    /**
     * 绑定点击事件
     *
     * @param {*} config
     */
    function bindClick(config) {
        config.el.addEventListener('click', e => {
            // 如果配置中有 onClick 就执行
            config.onClick && config.onClick(config);

            if (config.clickToClose)
                close(config);
        })
    }

})();



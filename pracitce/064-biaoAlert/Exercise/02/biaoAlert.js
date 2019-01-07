; (function () {
    'use strict';

    window.biaoAlert = boot;

    let container;

    /**
     * 默认配置
     */
    const defaultConfig = {
        type: 'info',       // {info | warn | danger | success} 类型
        containerClass: 'biao-alert-container', // 包含所有提醒的类
        timeout: 2000,      // 默认显示 2s 后隐藏
        clickToClose: true,     // 点击是否关闭，默认为 是
    }

    /**
     * 启动
     * @param {String} title
     * @param {*} config
     */
    function boot(title, config) {
        // 合并默认配置和用户配置
        config = { ...defaultConfig, ...config, title };

        prepare(config);
        render(config);
        open(config);
        bindEvents(config);
    }

    /**
     * 准备
     * @param {*} config
     * @returns
     */
    function prepare(config) {
        // 如果容器存在就跳过
        if (container)
            return;

        // 创建包含所有提醒的容器
        container = document.createElement('div');
        container.classList.add(config.containerClass);
        document.body.appendChild(container);
    }

    /**
     * 渲染每条提醒
     * @param {*} config
     * @returns
     */
    function render(config) {
        // 创建元素
        let el = document.createElement('div');
        // 添加基础类名
        el.classList.add('biao-alert');
        // 再按照不同类型添加类名，已获得不同颜色
        el.classList.add(config.type);
        // 拼装
        el.innerHTML = `
                        <div class="inner">
                            <div class="title">${config.title}</div>
                            <div class="desc">${config.desc}</div>
                        </div>
                        `;
        // 把拼装好的提醒插入到 container 中
        container.appendChild(el);
        // 把每条对象缓存到 config 中，方便后面调用
        config.el = el;

        // 如果 timeout 为 'false' 直接推出
        if (!config.timeout)
            return;
        // 每过 timeout 执行一次 close()
        setTimeout($ => {
            close(config);
        }, config.timeout);

    }


    /**
     * 显示 提醒
     * @param {*} config
     */
    function open(config) {
        config.onOpen && config.onOpen(config);
        config.el.style.opacity = 1;
    }

    /**
     * 隐藏提醒
     * @param {*} config
     */
    function close(config) {
        config.onClose && config.onClose();
        config.el.style.opacity = 0;
    }

    /**
     * 绑定点击事件
     * @param {*} config
     */
    function bindEvents(config) {
        config.el.addEventListener('click', e => {
            config.onClick && config.onClick(config);
            // 如果存在 clickToClose 则执行 close
            if (config.clickToClose)
                close(config);
        })
    }

})();



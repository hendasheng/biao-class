; (function () {
    'use strict';

    window.biaoAlert = boot;

    let container;

    // 默认配置
    const defaulltConfig = {
        type: 'info',   // 类型
        timeout: 2000,  // 在 timeout 后，启动 xxx
        containerClass: 'biao-alert-container', // 包含提醒的容器类名
        clickToClose: true, // 可以点击关闭
    }

    function boot(title, config) {
        // 合并配置
        config = { ...defaulltConfig, ...config, title };
        prepare(config);
        render(config);
        openRemind(config);
        bindEvents(config);
    }

    /**
     * 准备包含 提醒 的容器
     * @param {Object} config 
     */
    function prepare(config) {
        // 如果容器存在就退出函数，保证所有提醒都在一个容器中
        if (container)
            return;

        // 创建 容器
        // 添加配置中的类名
        // 推入到 body 中
        container = document.createElement('div');
        container.classList.add(config.containerClass);
        document.body.append(container);
    }

    /**
     * 渲染 提醒
     * @param {Object} config 
     */
    function render(config) {
        // 创建提醒
        // 设置类名
        let item = document.createElement('div');
        item.classList.add('biao-alert');
        // 讲 type 也设置为 类名
        // 通过不同类型名称 
        // 在 css 中设置不同的颜色
        item.classList.add(config.type);
        item.innerHTML = `
                            <div class="inner">
                                <div class="title">${config.title}</div>
                                <div class="desc">${config.desc}</div>
                            </div>
                            `;
        // 讲 item 存入带 config 中
        // 方便在外部调用
        config.item = item;
    }

    /**
     * 显示 item
     * @param {Object} config 
     */
    function openRemind(config) {
        // 如果配置中有 onOpen 则执行
        config.onOpen && config.onOpen(config);
        // 把 item 插入到 container 中
        container.appendChild(config.item);

        // 如果配置中没有 timeout 则退出
        if (!config.timeout)
            return;

        // 否则 item 在 timeout 后 关闭
        setTimeout($ => {
            closeRemind(config);
        }, config.timeout);
    }

    /**
     * 隐藏 item
     * @param {Object} config 
     */
    function closeRemind(config) {
        // 如果配置中有 onClose 则执行
        config.onClose && config.onClose(config);

        config.item.style.opacity = 0;
    }

    /**
     * 绑定 item 点击事件
     * @param {Object} config 
     */
    function bindEvents(config) {
        config.item.addEventListener('click', e => {
            // 如果配置中有 onClick 则执行
            config.onClick && config.onClick(config);
            // 如果配置中 clickToClose 为 true，则执行 隐藏 item 函数
            if (config.clickToClose)
                closeRemind(config);
        })
    }

})();



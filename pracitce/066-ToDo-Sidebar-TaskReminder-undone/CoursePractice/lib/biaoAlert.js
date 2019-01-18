; (function () {
    'use strict';

    window.biaoAlert = boot;

    let container;

    // 默认配置
    const defaultConfig = {
        type: 'info',
        containerClass: 'biao-alert-container',
        timeout: 2000,
        clickToClose: true,
    }

    /**
     * 启动
     * @param {String} title 
     * @param {Object} config 
     */
    function boot(title, config) {
        config = { ...defaultConfig, ...config, title };
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
        // 如果 容器 存在则推出 - 保证只有一个 容器
        if (container)
            return;

        // 创建 容器 HTML 元素
        // 添加类名
        // 插入到 body 中
        container = document.createElement('div');
        container.classList.add(config.containerClass);
        document.body.append(container);
    }

    /**
     * 渲染 提醒 (item)
     * @param {Object} config 
     */
    function render(config) {
        // 创建 提醒 HTML 元素
        // 添加类名
        let item = document.createElement('div');
        item.classList.add('biao-alert');
        // 将 type 也设置为类名
        // css 中通过 type 设置不同颜色
        item.classList.add(config.type);
        item.innerHTML = `
                        <div class="inner">
                            <div class="title">${config.title}</div>
                            <div class="desc">${config.desc}</div>
                        </div>
                        `;
        // 将 item 保存到 config 中, 方便在外部调用
        config.item = item;

        // 如果 timeout 为 false，则退出
        if (!config.timeout)
            return;

        // timeout 后，执行 关闭提醒
        setTimeout($ => {
            closeRemind(config);
        }, config.timeout);
    }

    /**
     * 显示 item
     * @param {Object} config 
     */
    function openRemind(config) {
        // 如果用户配置中有 onOpen 则执行
        config.onOpen && config.onOpen(config);
        // 把 item 插入到 container 容器中
        container.appendChild(config.item);
    }

    /**
     * 隐藏 item
     * @param {Object} config 
     */
    function closeRemind(config) {
        // 如果用户配置中有 onClose 则执行
        config.onClose && config.onClose(config);
        // 设置 item 隐藏
        // config.item.style.opacity = 0;

        // 删除 item
        config.item.remove();
    }
    
    /**
     * 绑定 item 点击事件
     * @param {Object} config 
     */
    function bindEvents(config) {
        config.item.addEventListener('click', e => {
            // 如果配置中有 onClick 则执行
            config.onClick && config.onClick(config);
            // 如果用户配置中有 clickToClose 则隐藏 item
            if (config.clickToClose)
                closeRemind(config);
        });
    }

})();



; (function () {
    'use strict';

    window.biaoAlert = biaoAlert;

    let container;

    const defaultConfig = {
        type: 'info',
        timeout: 6000,
        containerClass: 'biao-alert-container',
        clickToClose: true,
    }

    function biaoAlert(title, config) {
        // 合并默认配置和用户配置
        config = { ...defaultConfig, ...config, title };
        prepareEnv(config);
        render(config);
        open(config);
        bindClick(config);
    }


    function prepareEnv(config) {
        if (getContainer(config))
            return;

        container = document.createElement('div');
        container.classList.add(config.containerClass);
        document.body.appendChild(container);

    }


    function getContainer(config) {
        return !!document.querySelector('.' + config.containerClass);
    }


    function render(config) {
        let el = document.createElement('div');
        el.classList.add('biao-alert');
        el.classList.add(config.type);
        el.hidden = true;
        el.innerHTML = `
                        <div class="inner">
                        <div class="title">${config.title}</div>
                        ${config.desc ? `<div class="desc">${config.desc}</div>` : ''}
                        </div>
                    `;
        document.body.appendChild(el);
        config.el = el;
        config.el.hidden = false;
    }

    function open(config) {
        container.appendChild(config.el);
        if (!config.timeout)
            return;
        setTimeout(e => {
            config.el.hidden = true;
        }, config.timeout);
    }

    function bindClick(config) {
        config.el.addEventListener('click', e => {
            if (config.onClick)
                config.onClick(config);

            if (config.clickToClose)
                config.el.hidden = true;
        })
    }


})();



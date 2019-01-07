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
        config = { ...defaultConfig, ...config, title };
        prepare(config);
        render(config);
        openRemind(config);
        bindEvents(config);
    }

    function prepare(config) {
        container = document.querySelector('.' + config.containerClass);
        if (container)
            return;

        container = document.createElement('div');
        container.classList.add(config.containerClass);
        document.body.appendChild(container);
    }

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

    function openRemind(config) {
        config.onOpen && config.onOpen(config);
        container.appendChild(config.el);

        if (!config.timeout)
            return;

        setTimeout($ => {
            closeRemind(config);
        }, config.timeout);
    }

    function closeRemind(config) {
        config.onClose && config.onClose(config);
        config.el.style.opacity = 0;
    }

    function bindEvents(config) {
        config.el.addEventListener('click', e => {
            config.onClick && config.onClick(config);
            if (config.clickToClose)
                closeRemind(config);
        })
    }

})();



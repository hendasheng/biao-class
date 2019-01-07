; (function () {
    'use strict';

    class Alert {
        constructor(title, { desc, onClick, onOpen, onClose, timeout = 2000, type = "info", containerClass = "biao-alert-container", clickToClose = true }) {
            // 加载设置
            this.title = title;
            this.desc = desc;
            this.timeout = timeout;
            this.onClick = onClick;
            this.onOpen = onOpen;
            this.onClose = onClose;
            this.type = type;
            this.containerClass = containerClass;
            this.clickToClose = clickToClose;

            this.container = null;

            this.prepare();
            this.render();
            this.openRemind();
            this.bindEvents();
        }

        /**
         * 准备环境
         * 包含所有提醒的容器
         * @returns
         * @memberof Alert
         */
        prepare() {
            // 缓存容器到 this 中
            this.container = document.querySelector('.' + this.containerClass);
            // 如果容器存在，就跳过
            if (this.container)
                return;

            // 如果容器不存在
            // 创建容器，并插入到 HTML 中
            let container = this.container = document.createElement('div');
            container.classList.add(this.containerClass);
            document.body.appendChild(container);
        }

        /**
         * 渲染提醒
         * 渲染每一条提醒
         * @memberof Alert
         */
        render() {
            // 创建包含每一条提醒的容器
            let el = document.createElement('div');
            // 添加类名
            el.classList.add('biao-alert');
            // 通过不同的 type 类型赋予相应的类名，以便实现不同提醒，不同 style-color
            el.classList.add(this.type);
            el.innerHTML = `
                            <div class="inner">
                                <div class="title">${this.title}</div>
                                <div class="desc">${this.desc}</div>
                            </div>
                            `;
            // 把每条提醒缓存到 this 中，方便以后调用
            this.el = el;
        }

        /**
         * 显示 提醒
         */
        openRemind() {
            // 如果有回调就执行回调
            this.onOpen && this.onOpen();
            // 把每条提醒插入到 container 中
            this.container.appendChild(this.el);

            // 如果配置中 timeout 为 false，则跳过
            if (!this.timeout)
                return;

            // 根据 timeout 执行 closeRemind()
            setTimeout($ => {
                this.closeRemind();
            }, this.timeout);
        }

        /**
         * 隐藏 提醒
         *
         * @memberof Alert
         */
        closeRemind() {
            // 如果有回调就执行回调
            this.onClose && this.onClose();
            this.el.style.opacity = 0;
        }

        /**
         * 被点击时

         * @memberof Alert
         */
        bindEvents() {
            this.el.addEventListener('click', e => {
                // 如果有回调就执行回调
                this.onClick && this.onClick();
                // 如果配置中 clickToClose 为 true，则执行 closeRemind()
                if (this.clickToClose)
                    this.closeRemind(this);
            })
        }

    }
    window.Alert = Alert;

})();



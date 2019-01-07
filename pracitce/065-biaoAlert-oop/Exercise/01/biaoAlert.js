; (function () {
    'use strict';

    /**
     * 穿
     *
     * @class Alert
     */
    class Alert {
        constructor(title, { desc, onClick, onOpen, onClose, type = 'info', timeout = 3000, containerClass = 'biao-alert-container', clickToClose = true }) {
            // 加载设置
            this.title = title;
            this.desc = desc;
            this.type = type;
            this.timeout = timeout;
            this.containerClass = containerClass;
            this.clickToClose = clickToClose;
            this.onOpen = onOpen;
            this.onClick = onClick;
            this.onClose = onClose;

            this.container = null;

            this.prepare();
            this.render();
            this.open();
            this.bindEvents();

        }

        /**
         * 准备环境
         * 所有提醒都在一个容器内 - containerClass
         * @returns
         * @memberof Alert
         */
        prepare() {
            this.container = document.querySelector('.' + this.containerClass);
            // 如果有就跳过
            if (this.container)
                return;

            // 没有就早一个
            let container = this.container = document.createElement('div');
            container.classList.add(this.containerClass);
            document.body.appendChild(container);
        }

        /**
         * 渲染
         * @returns
         * @memberof Alert
         */
        render() {
            // 创建包含每条提醒的容器
            let el = document.createElement('div');
            // 设置类名
            el.classList.add('biao-alert');
            // 讲 type 设置为 类名，已实现不同类型不同颜色的样式
            el.classList.add(this.type);
            el.innerHTML = `
                            <div class="inner">
                            <div class="title">${this.title}</div>
                            ${this.desc ? `<div class="desc">${this.desc}</div>` : ''}
                            </div>
                            `;
            // 把包含每条挺行的容器缓存到 this 中， 方便以后调用
            this.el = el;
        }

        /**
         * 显示提醒
         * @memberof Alert
         */
        open() {
            // 如果有回调就叫一下 回调
            this.onOpen && this.onOpen(this);
            this.container.appendChild(this.el);

            // 如果 timeout 为 false 则跳过
            if (!this.timeout)
                return;

            // 每 timeout 执行一次 close
            setTimeout($ => {
                this.close();
            }, this.timeout);
        }

        /**
         * 隐藏提醒
         * @memberof Alert
         */
        close() {
            // 如果有回调就叫一下 回调
            this.onClose && this.onClose(this);
            this.el.style.opacity = 0;
        }

        /**
         * 当被点击时
         *
         * @memberof Alert
         */
        bindEvents() {
            this.el.addEventListener('click', e => {
                // 如果有回调就叫一下 回调                
                this.onClick && this.onClick();
                // 如果有 clickToclose 为 true
                if (this.clickToClose)
                    // 就执行 close
                    this.close();
            })
        }

    }

    window.Alert = Alert;

})();



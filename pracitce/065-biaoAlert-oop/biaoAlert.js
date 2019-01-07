; (function () {
    'use strict';

    class Alert {
        constructor(title, { desc, onClick, onOpen, onClose, type = 'info', timeout = 3000, containerClass = 'biao-alert-container', clickToClose = true } = {}) {
            this.title = title;
            this.desc = desc;
            this.type = type;
            this.timeout = timeout;
            this.onClick = onClick;
            this.onOpen = onOpen;
            this.onClose = onClose;
            this.containerClass = containerClass;
            this.clickToClose = clickToClose;

            this.containrer = null;

            this.prepareEnv();
            this.render();
            this.open();
            this.bindClick();
        }


        prepareEnv() {
            this.container =
                this.getContainer();

            // 有就用
            if (this.getContainer())
                return;

            // 没有就造一个
            let container = this.container = document.createElement('div');
            container.classList.add(this.containerClass);
            document.body.appendChild(container);
        }


        getContainer() {
            return document.querySelector('.' + this.containerClass);
        }


        render() {
            let el = document.createElement('div');
            el.classList.add('biao-alert');

            // 给不同的类型添加不同的类
            // 实现不同类型不同的颜色
            el.classList.add(this.type);
            // el.hidden = true;
            el.innerHTML = `
                    <div class="inner">
                    <div class="title">${this.title}</div>
                    ${this.desc ? `<div class="desc">${this.desc}</div>` : ''}
                    </div>
                `;
            document.body.appendChild(el);

            // 把 biao-alert(每个提醒) 缓存到 this 中
            this.el = el;
        }


        open() {
            // 如果有回调就叫 回调函数
            this.onOpen && this.onOpen();
            this.container.appendChild(this.el);

            // console.log(this.el);
            // 如果没有期限，就一直显示
            if (!this.timeout)
                return;

            // 如果有期限就按人家说的办
            setTimeout(e => {
                // 到指定时间隐藏提醒
                this.close(this);
            }, this.timeout);
        }


        close() {
            this.onClose && this.onClose();
            this.el.hidden = true;
        }


        bindClick() {
            this.el.addEventListener('click', e => {
                // clickToClose 为 true 则表示执行在点击时隐藏
                if (this.clickToClose)
                    close(this);

                // 如果有回调，就叫回调函数
                this.onClick && this.onClick();

            });
        }
    }
    window.Alert = Alert;
})();



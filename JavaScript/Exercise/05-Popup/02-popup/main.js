; (function () {
    'use strict';

    /**
     * 初始化 popup
     * 隐藏 popup 并在 body 中插入 mask
     * 
     * 绑定打开
     * 显示 popup 并且重置 popup 位置
     * 当浏览器窗口尺寸变化时，重置 popup 位置
     * 
     * 绑定关闭
     * 隐藏 popup
     * 
     * 设置 popup 位置
     * 
     */

    let trigger, popup, mask;

    boot('.trigger', '.popup')
    function boot(triggerSelector, popupSelector) {
        trigger = document.querySelector(triggerSelector);
        popup = document.querySelector(popupSelector);

        initPopup();
        bindOpen();
        bindClose();
    }

    function bindOpen() {
        trigger.addEventListener('click', () => {
            setViseble(true);
            rePosition('left', -150, 0);
        });
        window.addEventListener('resize', () => {
            rePosition('left', -150, 0);
        })
    }

    function bindClose() {
        window.addEventListener('keyup', (e) => {
            if (e.code === 'Escape')
                setViseble(false);
        });
        mask.addEventListener('click', () => {
            setViseble(false);
        })
    }

    function setViseble(show) {
        popup.hidden = mask.hidden = !show;
        if (show)
            mask.style.opacity = popup.style.opacity = 1;
        else
            mask.style.opacity = popup.style.opacity = 0;
    }

    function initPopup() {
        mask = document.createElement('div');
        mask.classList.add('mask');
        document.body.appendChild(mask);

        mask.hidden = popup.hidden = true;
    }

    /**
     * 
     * @param {*} position center | top | left | right
     * @param {*} yOffset 
     * @param {*} xOffset 
     */
    function rePosition(position = 'center', yOffset, xOffset) {
        let windowWidth = window.innerWidth;
        let windowHeight = window.innerHeight;

        let width = popup.offsetWidth;
        let height = popup.offsetHeight;

        popup.style.left = windowWidth / 2 - width / 2 + xOffset + 'px';
        popup.style.top = windowHeight / 2 - height / 2 + yOffset + 'px';
    }

})();
; (function () {
    'use strict';

    const box = document.getElementById('box');
    const items = box.querySelectorAll('.item');

    let prev, current;

    let currentIndex = 0;
    let lastIndex = items.length - 1;

    boot();
    function boot() {
        // 开始的时候显示第一张
        show(items[0]);
        setInterval(() => {
            loop();
        }, 1000);
    }

    /**
     * 执行动作
     * 启动 增量
     * 找到上一张和当前这张
     */
    function loop() {
        prev = getPrev();
        current = getCurrent();
        increment();
        hide(prev);
        show(current);

    }

    /**
     * 增量
     */
    function increment() {
        if (currentIndex < lastIndex)
            return currentIndex++;
        return currentIndex = 0;
    }

    /**
     * 上一张
     */
    function getPrev() {
        if (currentIndex == 0)
            return items[lastIndex];
        return items[currentIndex - 1];
    }

    /**
     * 当前项
     */
    function getCurrent() {
        return items[currentIndex];
    }

    /**
     * 隐藏元素
     * @param {Element} el 
     */
    function hide(el) {
        if (!el)
            return;
        el.style.opacity = 0;
    }

    /**
     * 显示元素
     * @param {Element} el 
     */
    function show(el) {
        if (!el)
            return;
        el.style.opacity = 1;
    }


})();
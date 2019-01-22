; (function () {
    'use strict';

    const parent = document.querySelector('.slider');
    const items = parent.querySelectorAll('.item');

    let current = 0;
    let lastCurrent = items.length - 1;

    boot();

    function boot() {
        // 开始显示第一张
        show(items[0]);

        // 每隔 2s 执行一次 loop
        setInterval(() => {
            loop();
        }, 2000);
    }

    /**
     * 循环显示
     */
    function loop() {
        current++;

        // 找到上一张
        let prev;
        // 在第一张的时候，最后一张就代表 上一张
        if (current == 0)
            prev = items[lastCurrent];
        else // 否则 当前 current - 1 代表上一张
            prev = items[current - 1];

        // 找到下一张
        // 如果 current 到了最后一张，第一张就代表 下一张
        if (current >= items.length)
            current = 0;
        
        let next = items[current];

        hide(prev);
        show(next);
    }

    /**
     * 隐藏元素 (opacity)
     * @param {Element} el 
     */
    function hide(el) {
        if (!el)
            return;
        el.style.opacity = 0;
    }

    /**
     * 显示元素 (opacity)
     * @param {Element} el 
     */
    function show(el) {
        if (!el)
            return;
        el.style.opacity = 1;
    }

})();
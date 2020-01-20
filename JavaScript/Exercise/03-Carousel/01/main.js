; (function () {
    'use strict';

    const slider = document.querySelector('.slider');
    const items = slider.querySelectorAll('.item');

    let current = 0;
    let lastIndex = items.length - 1;

    boot();
    function boot() {
        show(items[current]);
        setInterval(() => {
            flip();
        }, 500);
    }


    function flip() {
        ++current;
        if (current > items.length) current = 0;

        let prev = getPrev();
        let next = items[current];

        hide(prev);
        show(next);
    }

    /**
     * 获取前一张
     */
    function getPrev() {
        if (current == 0)
            return items[lastIndex];
        else
            return items[current - 1];
    }

    /**
     * 隐藏元素
     * @param {element}} el 
     */
    function hide(el) {
        if (!el) return;
        el.style.opacity = 0;
    }

    /**
     * 显示元素
     * @param {element} el 
     */
    function show(el) {
        if (!el) return;
        el.style.opacity = 1;
    }

})();
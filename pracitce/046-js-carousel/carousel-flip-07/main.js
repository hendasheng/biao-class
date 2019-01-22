; (function () {
    'use strict';

    const box = document.getElementById('box');
    const items = box.querySelectorAll('.item');

    let currentIndex = 0;
    let lastIndex = items.length - 1;

    let prev;
    let current;
    let next;

    boot();
    /**
     * 启动
     */
    function boot() {
        // 从第一项开始
        slidesX();
        slidesZ();
        setInterval(() => {
            increment();
            slidesX();
            slidesZ();
            console.log(currentIndex);
        }, 2000);
    }

    function increment() {
        if (currentIndex < lastIndex)
            return currentIndex++;
        return currentIndex = 0;
    }

    /**
     * 获取上一张
     */
    function getPrev() {
        if (currentIndex > 0)
            return items[currentIndex - 1];
        return items[lastIndex];
    }

    /**
     * 当前项
     */
    function getCurrent() {
        return items[currentIndex];
    }

    /**
     * 获取下一张
     */
    function getNext() {
        if (currentIndex < lastIndex)
            return items[currentIndex + 1];
        return items[0];
    }

    /**
     * 控制元素在 X轴 的位置
     */
    function slidesX() {
        prev = getPrev();
        current = getCurrent();
        next = getNext();

        prev.style.left = - prev.offsetWidth + 'px';
        current.style.left = 0;
        next.style.left = next.offsetWidth + 'px';
    }

    /**
     * 控制元素在 Z轴 的位置
     */
    function slidesZ() {
        prev = getPrev();
        current = getCurrent();
        next = getNext();

        prev.style.zIndex = 1;
        current.style.zIndex = 2;
        next.style.zIndex = 0;
    }

})();
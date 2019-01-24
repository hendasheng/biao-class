; (function () {
    'use strict';

    const box = document.getElementById('box');
    const items = box.querySelectorAll('.item');
    // 当前索引
    let currentIndex = 0;
    // items 长度
    let lastIndex = items.length - 1;

    let prev, current, next;

    boot();
    function boot() {
        slidesX();
        slidesZ();
        setInterval(() => {
            increment();
            slidesX();
            slidesZ();
        }, 1000);
    }

    /**
     * 设置增量
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
        if (currentIndex > 0)
            return items[currentIndex - 1];
        return items[lastIndex];
    }

    // 当前项
    function getCurrent() {
        return items[currentIndex];
    }

    /**
     * 下一张
     */
    function getNext() {
        if (currentIndex < lastIndex)
            return items[currentIndex + 1];
        return items[0];
    }

    /**
     * 设置元素在 X 的位置
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
     * 设置元素在 Z 轴的位置
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
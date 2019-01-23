; (function () {
    'use strict';


    const box = document.getElementById('box');
    const items = box.querySelectorAll('.item');

    // 当前索引
    let currentIndex = 0;
    // 最后一张
    let lastIndex = items.length - 1;

    let prev;
    let current;
    let next;

    boot();
    function boot() {
        slidesX();
        slidesZ();
        setInterval(() => {
            increment();
            slidesX();
            slidesZ();
        }, 2000)
    }

    /**
     * 增量
     */
    function increment() {
        // 当前索引小于最大索引值时 + 1
        if (currentIndex < lastIndex)
            return currentIndex++;
        // 如果超过最大值，就变成 0 
        // 当索引值到最后一张时，下一张就是第一张
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

    /**
     * 当前这张
     */
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
     * 图片在 X 轴的位置
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
     * 图片在 Z 轴的位置
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
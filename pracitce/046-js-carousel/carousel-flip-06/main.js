; (function () {
    'use strict';

    const parent = document.getElementById('box');
    const slides = parent.querySelectorAll('.item');

    let currentIndex = 0;
    let lastIndex = slides.length - 1;

    boot();
    function boot() {
        slidesX();
        slidesZ();
        setInterval(() => {
            increment();
            slidesX();
            slidesZ();
        }, 1000)
    }

    function slidesX() {
        let prev = getPrev();
        let current = getCurrent();
        let next = getNext();

        prev.style.left = - prev.offsetWidth + 'px';
        current.style.left = 0;
        next.style.left = next.offsetWidth + 'px';
    }

    function slidesZ() {
        let prev = getPrev();
        let current = getCurrent();
        let next = getNext();

        prev.style.zIndex = 1;
        current.style.zIndex = 2;
        next.style.zIndex = 0;
    }

    /**
     * 增量
     * 如果 currentIndex 在范围内，则 ++，超出范围时归零。
     */
    function increment() {
        if (currentIndex < lastIndex)
            return currentIndex++;
        return currentIndex = 0;
    }

    /**
     * 获取 上一个
     * 如果没小过最小值，则 -1，否则选中最后一个
     */
    function getPrev() {
        if (currentIndex > 0)
            return slides[currentIndex - 1];
        return slides[lastIndex];
    }

    /**
     * 获取 当前对象
     */
    function getCurrent() {
        return slides[currentIndex];
    }

    /**
     * 获取 下一个
     * 如果没超过最大值，则 +1 ，否则选中第一个
     */
    function getNext() {
        if (currentIndex < lastIndex)
            return slides[currentIndex + 1];
        return slides[0];
    }

})();
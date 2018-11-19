; (function () {
    'use strict';

    const parent = document.getElementById('box');
    const slides = document.querySelectorAll('.item');

    let currentIndex = 0;
    let lastIndex = slides.length - 1;


    boot();
    function boot() {
        slideX();
        slideZ();
        setInterval(() => {
            increment();
            slideX();
            slideZ();
        }, 2000);
    }


    function slideX() {
        let prev = getPrev();
        let current = getCurrent();
        let next = getNext();

        prev.style.left = - prev.offsetWidth + 'px';
        current.style.left = 0;
        next.style.left = next.offsetWidth + 'px';
    }

    function slideZ() {
        let prev = getPrev();
        let current = getCurrent();
        let next = getNext();

        prev.style.zIndex = 1;
        current.style.zIndex = 2;
        next.style.zIndex = 0;
    }

    function increment() {
        if (currentIndex < lastIndex)
            return currentIndex++;
        return currentIndex = 0;
    }

    /**
     * 获取 前一个
     *
     * @returns 如果不是第一个，则 -1， 否则回到最后一个
     */
    function getPrev() {
        if (currentIndex > 0)
            return slides[currentIndex - 1];
        return slides[lastIndex];
    }

    /**
     * 获取 当前元素
     *
     * @returns
     */
    function getCurrent() {
        return slides[currentIndex];
    }

    /**
     * 获取后一个
     *
     * @returns 如果不是最后一个，则 +1，否则回到第一个
     */
    function getNext() {
        if (currentIndex < lastIndex)
            return slides[currentIndex + 1];
        return slides[0];
    }




})();
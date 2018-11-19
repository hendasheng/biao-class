; (function () {
    'use strict';


    const parent = document.getElementById('box');
    const slides = parent.querySelectorAll('.item');

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
        }, 2000)
    }


    /**
     * 获取 上一张
     *  
     * @returns 如果 计数器 大于 0 则 - 1，否则直接变成最后一张
     */
    function getPrev() {
        if (currentIndex > 0)
            return slides[currentIndex - 1];
        else
            return slides[lastIndex];
    }

    /**
     * 获取 当前这张
     *
     * @returns 
     */
    function getCurrent() {
        return slides[currentIndex];
    }

    /**
     * 获取下一张
     *
     * @returns 如果在 item 总数的数量范围内，则 +1，如果超出范围，则回到第一张
     */
    function getNext() {
        if (currentIndex < lastIndex)
            return slides[currentIndex + 1];
        return slides[0];
    }

    /**
     * 增量
     *
     * @returns 如果在 item 总数范围内，则 ++，如果超出范围，则归零
     */
    function increment() {
        if (currentIndex < lastIndex)
            return currentIndex++;
        else
            return currentIndex = 0;
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





})();
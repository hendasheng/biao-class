; (function () {
    'use strict';

    const parent = document.getElementById('box');
    const slides = parent.querySelectorAll('.item');

    let current = 0;


    boot();
    function boot() {
        show(slides[current]);
        setInterval(() => {
            increment();
            loop()
        }, 1000);
    }

    function loop() {
        let prev = getPrev();
        let next = getNext();

        hide(prev);
        show(next);
    }

    function increment() {
        current++;
        if (current >= slides.length)
            current = 0;
    }
    /**
     * 获取 上一个
     * 如果 current 等于最小值，则选中最后一个，否则 -1
     */
    function getPrev() {
        if (current === 0)
            return slides[slides.length - 1];
        return slides[current - 1];
    }

    /**
     * 获取 下一个
     * 如果 current 在最大范围内则 +1，否则选中第一个
     */
    function getNext() {
        if (current < slides.length)
            return slides[current];
        return slides[0];
    }

    function hide(el) {
        if (!el)
            return;
        el.style.opacity = 0;
    }
    function show(el) {
        if (!el)
            return;
        el.style.opacity = 1;
    }

    // function getNext() {
    //     if(current)
    // }


})();
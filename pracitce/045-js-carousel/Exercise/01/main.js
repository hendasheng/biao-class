; (function () {
    'use strict';

    const parent = document.querySelector('.slider');
    const slides = parent.querySelectorAll('.item');
    let current = 0;
    let lastIndex = slides.length - 1;

    boot();
    
    function boot() {
        // 开始的时候显示第一张
        show(slides[0]);
        
        // 每隔 3 秒执行一次 loop
        setInterval(() => {
            loop();
        }, 3000);
    }

    /**
     * loop
     */
    function loop() {
        current++;
        // 如果 current 到了最后一张，则归零
        if (current >= slides.length)
            current = 0;

        
        let prev = getPrev();
        let next = slides[current];

        // prev && (prev.style.opacity = 0);
        // next.style.opacity = 1;
        hide(prev);
        show(next)
    }

    /**
     * 获取上一张
     */
    function getPrev() {
        // 如果 current 到了第一张，此时 “上一张” 就是最后一张
        if (current == 0)
            return slides[lastIndex];
        else // 否则 current - 1 就代表上一张
            return slides[current - 1];
    }

    /**
     * 隐藏元素 (opacity = 0) 
     * @param {Element} el 
     */
    function hide(el) {
        if (!el)
            return;
        el.style.opacity = 0;
    }

    /**
     * 显示元素 (opacity = 1)
     * @param {Element} el 
     */
    function show(el) {
        if (!el)
            return;
        el.style.opacity = 1;
    }






})();
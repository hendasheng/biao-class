; (function () {
    'use strict';

    const parent = document.getElementById('box');
    const item = parent.querySelectorAll('.item');

    // 最后一张
    let lastIndex = item.length - 1;

    // 计数器
    let currentIndex = 0;

    boot();
    function boot() {

        slideX();
        slideZ();

        setInterval(() => {
            increment();
            slideX();
            slideZ()
        }, 1000);
    }


    /**
     * 获取 上一张
     * 
     *  如果在页面在 item 范围内，则 -1
     *  否则 回到最后一张
     */
    function getPrev() {
        if (currentIndex > 0)
            return item[currentIndex - 1];
        else
            return item[lastIndex];
    }

    /**
     * 获取 下一张
     * 
     *  如果页面在 item 范围内，则 +1
     *  否则 回到第一张
     */
    function getNext() {
        if (currentIndex < lastIndex)
            return item[currentIndex + 1];
        else
            return item[0];
    }

    /**
     * 获取当前页面
     */
    function getCurrent() {
        return item[currentIndex];
    }

    /**
     * 自增当前索引 - 翻页
     */
    function increment() {
        if (currentIndex < lastIndex)
            currentIndex++;
        else
            currentIndex = 0;
    }

    function slideX() {
        let prev = getPrev();
        let current = getCurrent();
        let next = getNext();

        prev.style.left = -prev.offsetWidth + 'px';
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
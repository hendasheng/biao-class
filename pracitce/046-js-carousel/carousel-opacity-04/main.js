; (function () {
    'use strict';

    const box = document.getElementById('box');
    const items = box.querySelectorAll('.item');

    // 索引值
    let currentIndex = 0;
    let lastIndex = items.length - 1;

    boot();
    function boot() {
        // 最开始让第一张显示
        show(items[0]);
        setInterval(() => {
            loop();
            console.log(currentIndex);
        }, 1000);
    }

    /**
     * 循环显示图片
     */
    function loop() {
        let current = getCurrent();
        let next = getNext();

        // 索引值自增
        currentIndex++;

        // 如果索引值超过最大长度
        // 则归零（重头开始）
        if (currentIndex > lastIndex)
            currentIndex = 0;

        // 隐藏当前这张
        hide(current);
        // 显示下一张
        show(next);
    }

    function getCurrent() {
        return items[currentIndex];
    }

    function getNext() {
        if (currentIndex < lastIndex)
            return items[currentIndex + 1];
        return items[0];
    }

    /**
     * 隐藏元素
     * @param {Element} el 
     */
    function hide(el) {
        if (!el)
            return;
        el.style.opacity = 0;
    }

    /**
     * 显示元素
     * @param {Element} el 
     */
    function show(el) {
        if (!el)
            return;
        el.style.opacity = 1;
    }


})();
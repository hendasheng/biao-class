; (function () {
    'use strict';

    const box = document.getElementById('box');
    const items = box.querySelectorAll('.item');

    let currentIndex = 0;
    let lastIndex = items.length - 1;

    let current;
    let next;

    boot();
    function boot() {
        show(items[0]);
        setInterval(() => {
            loop();
        }, 1000);
    }

    function loop() {
        current = getCurrent();
        next = getNext();
        // inerement();

        // 索引值自增
        currentIndex++;

        // 如果索引值超过最大长度
        // 则归零（重头开始）
        if (currentIndex > lastIndex)
            currentIndex = 0;

        console.log(currentIndex);

        hide(current);
        show(next);
    }

    function inerement() {
        if (currentIndex > lastIndex)
            currentIndex = 0;
        currentIndex++;
    }

    function getCurrent() {
        return items[currentIndex];
    }

    function getNext() {
        if (currentIndex < lastIndex)
            return items[currentIndex + 1];
        return items[0];
    }

    function hide(el) {
        if (!el)
            return;
        el.style.opacity = 0
    }

    function show(el) {
        if (!el)
            return;
        el.style.opacity = 1;
    }

})();
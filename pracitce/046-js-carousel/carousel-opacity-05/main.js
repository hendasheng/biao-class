; (function () {
    'use strict';


    const box = document.getElementById('box');
    const items = box.querySelectorAll('.item');

    let currentIndex = 0;
    let lastIndex = items.length - 1;

    boot();
    function boot() {
        show(items[0]);
        setInterval(() => {
            loop();
        }, 1000);
    }

    function loop() {
        let current = getCurrent();
        let next = getNext();

        inerement();

        console.log(currentIndex);

        hide(current);
        show(next);

    }

    function inerement() {
        if (currentIndex < lastIndex)
            return currentIndex++;
        return currentIndex = 0;
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
        el.style.opacity = 0;
    }

    function show(el) {
        if (!el)
            return;
        el.style.opacity = 1;
    }

})();
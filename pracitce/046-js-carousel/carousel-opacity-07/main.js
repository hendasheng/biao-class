; (function () {
    'use strict';

    const box = document.getElementById('box');
    const items = box.querySelectorAll('.item');

    let currentInedx = 0;
    let lastIndex = items.length - 1;

    let prev;
    let current;

    boot();
    function boot() {
        setInterval(() => {
            loop();
        }, 1000);
    }

    function loop() {
        prev = getPrev();
        current = getCurrent();
        inerement();

        hide(prev);
        show(current);
    }

    function inerement() {
        if (currentInedx < lastIndex)
            return currentInedx++;
        return currentInedx = 0;
    }

    function getPrev() {
        if (currentInedx === 0)
            return items[lastIndex];
        return items[currentInedx - 1];
    }

    function getCurrent() {
        return items[currentInedx];
    }

    function hide(el) {
        el.style.opacity = 0;
    }

    function show(el) {
        el.style.opacity = 1;
    }

})();
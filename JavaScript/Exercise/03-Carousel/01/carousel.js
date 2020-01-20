; (function () {
    'use strict';

    const slider = document.querySelector('.slider');
    const items = slider.querySelectorAll('.item');

    let current = 0;
    let lastIndex = items.length - 1;


    boot();
    function boot() {
        show(items[current]);
        setInterval(() => {
            loop();
        }, 1000);
    }

    function loop() {
        current++;
        if (current >= items.length) current = 0;

        let prev = getPrev();
        let next = items[current];

        hide(prev);
        show(next);
    }

    function getPrev() {
        if (current == 0)
            return items[lastIndex];
        else
            return items[current - 1];

    }

    function hide(el) {
        if (!el) return;
        el.style.opacity = 0;
        el.style.zIndex = 998;
    }

    function show(el) {
        if (!el) return;
        el.style.opacity = 1;
        el.style.zIndex = 999;
    }

})();

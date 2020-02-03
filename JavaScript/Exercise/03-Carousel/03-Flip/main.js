; (function () {
    'use strict';

    const slider = document.querySelector('.slider');
    const items = slider.querySelectorAll('.item');

    let lastIndex = items.length - 1;
    let current = 0;

    boot();
    function boot() {
        slide();
        setInterval(() => {
            increment();
            slide();
        }, 1000);
    }

    function increment() {
        if (current < lastIndex)
            return current++;
        else
            return current = 0;
    }

    function getPrev() {
        if (current > 0)
            return items[current - 1];
        return items[lastIndex];
    }

    function getNext() {
        if (current < lastIndex)
            return items[current + 1];
        return items[0]
    }

    function getCurrent() {
        return items[current];
    }

    function slide() {
        let prev = getPrev();
        let current = getCurrent();
        let next = getNext();

        prev.style.left = -prev.offsetWidth + 'px';
        prev.style.zIndex = 1;

        current.style.left = 0;
        current.style.zIndex = 2;

        next.style.left = next.offsetWidth + 'px';
        next.style.zIndex = 0;
    }

})();
; (function () {
    'use strict';

    const box = document.getElementById('box');
    const items = box.querySelectorAll('.item');

    let currentIndex = 0;
    let lastIndex = items.length - 1;

    let prev;
    let current;
    let next;

    boot();
    function boot() {
        slidesX();
        slidesZ();
        setInterval(() => {
            increment();
            slidesX();
            slidesZ();
        }, 2000);
    }

    function increment() {
        if (currentIndex < lastIndex)
            return currentIndex++;
        return currentIndex = 0;
    }

    function getPrev() {
        if (currentIndex > 0)
            return items[currentIndex - 1];
        return items[lastIndex];
    }

    function getCurrent() {
        return items[currentIndex];
    }

    function getNext() {
        if (currentIndex < lastIndex)
            return items[currentIndex + 1];
        return items[0];
    }

    function slidesX() {
        prev = getPrev();
        current = getCurrent();
        next = getNext();

        prev.style.left = - prev.offsetWidth + 'px';
        current.style.left = 0;
        next.style.left = next.offsetWidth + 'px';
    }

    function slidesZ() {
        prev = getPrev();
        current = getCurrent();
        next = getNext();

        prev.style.zIndex = 1;
        current.style.zIndex = 2;
        next.style.zIndex = 0;
    }

})();
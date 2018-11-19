; (function () {
    'use strict';

    const parent = document.getElementById('box');
    const slides = parent.querySelectorAll('.item');

    let lastIndex = slides.length - 1;
    let currentIndex = 0;

    boot();
    function boot() {
        slideX();
        
        setInterval(() => {
            increment();
            slideX();
            slideZ();
        }, 1000);
    }

    function getPrev() {
        if (currentIndex > 0)
            return slides[currentIndex - 1];
        return slides[lastIndex];
    }
    function getNext() {
        if(currentIndex < lastIndex)
            return slides[currentIndex + 1];
        return slides[0];
    }

    function getCurrent() {
        return slides[currentIndex];
    }

    function increment() {
        if(currentIndex < lastIndex)
            return currentIndex++;
        return currentIndex = 0;
    }

    function slideX() {
        let prev = getPrev();
        let current = getCurrent();
        let next = getNext();
        
        prev.style.left = - prev.offsetWidth + 'px';
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
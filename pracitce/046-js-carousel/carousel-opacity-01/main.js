; (function () {
    'use strict';

    const parent = document.getElementById('box');
    const slides = parent.querySelectorAll('.item');

    let lastIndex = slides.length - 1;
    let current = 0;

    boot();
    function boot() {
        show(slides[current]);
        setInterval(() => {
            loop();
        }, 1000);
    }

    function loop() {
        current++;

        if(current >= slides.length)
            current = 0;
        
        let prev = getPrev();
        let next = getNext();

        hide(prev);
        show(next);
    }

    /**
     *  如果 
     *  
     * @returns
     */
    function getPrev() {
        if (current === 0)
            return slides[lastIndex];
        return slides[current - 1];
    }

    function getNext() {
        if (current < slides.length)
            return slides[current];
        return slides[0]
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
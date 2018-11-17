; (function () {
    'use stract';



    const parent = document.querySelector('.slider');
    const slides = parent.querySelectorAll('.item');

    let current = 0;


    boot();
    function boot() {
        show(slides[current]);
        setInterval(() => {
            loop();
        }, 1000);
    }

    /**
     * 循环
     */
    function loop() {
        current++;
        if (current >= slides.length)
            current = 0;

        let prev = getPrev();
        let next = slides[current];

        hide(prev);
        show(next);

    }

    /**
     * 获取 prev
     */
    function getPrev() {
        if (current === 0)
            return slides[slides.length - 1];
        return slides[current - 1];
    }

    /**
     * 通过 opacity = 0 隐藏 element
     * @param {} el 需要隐藏的 elemnt
     */
    function hide(el) {
        if (!el)
            return;
        el.style.opacity = 0;
    }

    /**
     * 通过 opacity = 1 显示 element
     * @param {} el 需要显示的 element
     */
    function show(el) {
        if (!el)
            return;
        el.style.opacity = 1;
    }

})();

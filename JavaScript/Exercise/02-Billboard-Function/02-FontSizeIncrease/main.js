; (function () {
    'use strict';

    const board = document.querySelector('.board');
    let size = 1;

    boot();

    function boot() {
        setInterval(() => {
            if (isVisible()) {
                setVisible(false);
            } else {
                setVisible(true);
            }
        }, 500);
    }

    function isVisible() {
        return getComputedStyle(board).opacity == '1';
    }

    function setVisible(check) {
        // check ? board.style.opacity = 0 : board.style.opacity = 1;
        if (check) {
            board.style.opacity = 0;
        } else {
            board.style.opacity = 1;
            setSize();
        }
    }

    function setSize() {
        size++;
        if (size > 3) size = 1;
        board.style.fontSize = 5 * size + 'rem';
    }



})();
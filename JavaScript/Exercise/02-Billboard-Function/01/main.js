; (function () {
    'use strict';

    const board = document.querySelector('.board');
    const inner = board.querySelector('.inner');

    let count = 1;

    boot();

    function boot() {
        inner.innerText = '已有 ' + count + ' 人领取';
        setInterval(() => {
            if (isVisible()) {
                onDisplay(false);
            } else {
                onDisplay(true);
                count++;
                inner.innerText = '已有 ' + count + ' 人领取';
            }
        }, 500);
    }

    function isVisible() {
        return getComputedStyle(board).opacity == '1';
    }

    function onDisplay(check) {
        // true ? board.style.opacity = 1: board.style.opacity = 0;
        if (check) {
            board.style.opacity = 1;
        } else {
            board.style.opacity = 0;
        }
    }

})();
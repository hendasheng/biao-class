; (function () {
    'use strict';

    let list = ['红', '绿'];
    const board = document.querySelector('.board');
    let count = 0;


    boot();

    function boot() {
        // 初始设置
        board.innerText = list[count];
        setBgColor(count);

        setInterval(() => {
            if (isVisible()) {
                setVisible(false);
            } else {
                setVisible(true);
                setText();
            }
        }, 500);
    }

    function isVisible() {
        return getComputedStyle(board).opacity == '1';
    }

    function setVisible(check) {
        if (!check) {
            board.style.opacity = 0;
        } else {
            board.style.opacity = 1;
        }
    }

    function setText() {
        count++;
        if (count > list.length - 1) count = 0;
        board.innerText = list[count];
        setBgColor(count);
    }

    function setBgColor(count) {
        if (count == 0) {
            board.style.background = 'green';
        } else if (count == 1) {
            board.style.background = 'red';
        }
    }
})();

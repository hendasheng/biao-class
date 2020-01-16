; (function () {
    'use strict';

    const board = document.querySelector('.board');
    const inner = board.querySelector('.inner');

    let count = 0;
    let list = ['100px', '150px', '200px'];
    let size = 1

    setInterval(() => {
        let visible = getComputedStyle(board).opacity == '1';
        if (visible) {
            board.style.opacity = 0;
        } else {
            board.style.opacity = 1;
            if (size < 3) {
                size++;
            } else {
                size = 1;
            }
            board.style.fontSize = 5 * size + 'em';
        }
        console.log(visible);
    }, 500);

})();
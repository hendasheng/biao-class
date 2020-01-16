; (function () {
    'use strict';

    const board = document.querySelector('.board');
    // console.log(board);
    let list = ['01-轮流', '02-显示'];
    let count = 0;
    board.innerText = list[count];

    setInterval(() => {
        let visible = getComputedStyle(board).opacity == '1';
        if (visible) {
            board.style.opacity = 0;
        } else {
            board.style.opacity = 1;
            
            count >= list.length-1 ? count = 0 : count++;
            board.innerText = list[count];
        }
    }, 500);

})();
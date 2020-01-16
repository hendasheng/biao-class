; (function () {
    'use strict';

    // 找到需要控制的元素
    const board = document.querySelector('.board');
    const inner = board.querySelector('.inner');
    const counter = inner.querySelector('.counter');

    let count = 0;

    console.log(counter);
    
    setInterval(function () {
        let visible = getComputedStyle(inner).opacity == '1';
        // console.log(typeof(visible));
        if (visible) {
            inner.style.opacity = 0;
        } else {
            inner.style.opacity = 1;
            count++;
        }
        counter.innerText = '已有 ' + count + ' 领取';

        inner.hidden = !inner.hidden;
    }, 1000);

})();
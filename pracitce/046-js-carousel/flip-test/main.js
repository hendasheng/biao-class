; (function () {
    'use strict';

    const parent = document.querySelector('.box');
    const item = parent.querySelectorAll('.item');

    let itemC = item[item.length - 1];

    let itemStyle = getComputedStyle(itemC);


    console.log(parseFloat(itemStyle.left));

    

    let current = 0;

    setInterval(() => {

        current--;

        /** 
        * 如果 item 的 left 大于等于 自身的宽度
        * 则 left 归零 
        */
        if (current <= - itemC.clientWidth) {
            itemC.style.left = 0;
            // itemC.style.opacity = 0;
        } else {
            itemC.style.left = current;
        }

    }, .1);




})();


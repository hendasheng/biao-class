; (function () {
    'use strict';

    /**
     * 图片轮播
     * ’当前张‘ / ‘上一张’ / ’下一张‘ 分别做不同的动作
     * ‘上一张’ 沿 X 轴向左滑动（-width)
     * ’当前张‘ 设置位置在视图中心
     * ’下一张‘ 设置位置在试图中心右侧，准备向左滑动 (+width)
     * 
     * X 轴 - position
     * Z 轴 - zIndex
     */

    const container = document.querySelector('.container');
    const items = container.querySelectorAll('.item');

    let current = 0;
    let lastIndex = items.length - 1;

    let prevPage;
    let currentPage;
    let nextPage;

    boot();
    function boot() {

        setInterval(() => {
            increment();
            slider();

        }, 1000)
    }

    function increment() {
        if (current < lastIndex)
            return current++;
        else
            return current = 0;
    }

    function getPrev() {
        if (current > 0)
            return items[current - 1];
        else
            return items[lastIndex];
    }

    function getCurrent() {
        return items[current];
    }

    function getNext() {
        if (current < lastIndex)
            return items[current + 1];
        else
            return items[0];
    }

    function slider() {
        prevPage = getPrev();
        currentPage = getCurrent();
        nextPage = getNext();

        prevPage.style.left = -prevPage.offsetWidth + 'px';
        prevPage.style.zIndex = 1;

        currentPage.style.left = 0;
        currentPage.style.zIndex = 2

        nextPage.style.left = nextPage.offsetWidth + 'px';
        nextPage.style.zIndex = 0;
    }




})();
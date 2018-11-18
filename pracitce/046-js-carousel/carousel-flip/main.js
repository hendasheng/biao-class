; (function () {
    'use strict';

    const parent = document.getElementById('box');
    const item = parent.querySelectorAll('.item');

    let lastIndex = item.length - 1;
    let currentIndex = 0;

    boot();
    function boot() {
        // 确保一开始就滚动一次
        // 横向移动
        itemX();
        // "前后"移动
        itemZ();

        // 每隔1秒滚动一次
        setInterval(() => {
            // 自增current
            inCrement();

            // 滚动其实就是重新调整元素位置
            // 横向移动
            itemX();
            // "前后"移动
            itemZ();
        }, 1000);
    }

    /**
     *  获取 上一页
     *
     * @returns
     */
    function getPrev() {
        if (currentIndex > 0)
            return item[currentIndex - 1];
        else
            return item[currentIndex];
    }

    /**
     *  获取 下一页
     *
     * @returns
     */
    function getNext() {
        if (currentIndex < lastIndex)
            return item[currentIndex + 1];
        else
            return item[0];
    }

    /**
     *  获取 当前元素
     *
     * @returns
     */
    function getCurrent() {
        return item[currentIndex];
    }

    /**
     *  索引自增
     *
     */
    function inCrement() {
        if (currentIndex < lastIndex)
            currentIndex++;
        else
            currentIndex = 0;
    }

    function itemZ() {
        let prev = getPrev();
        let current = getCurrent();
        let next = getNext();

        prev.style.zIndex = 1; // 前一页次重要
        current.style.zIndex = 2; // 当前页最重要，所以最靠前
        next.style.zIndex = 0; // 下一页最不重要，因为还看不见
    }

    function itemX() {
        let prev = getPrev();
        let current = getCurrent();
        let next = getNext();

        // 前一页向左挪
        prev.style.left = -prev.offsetWidth + 'px';
        // 当前页在中间
        current.style.left = 0;
        // 后一页向右挪
        next.style.left = next.offsetWidth + 'px';
    }





})();   
; (function () {
    'use strict';

    /** Slide -> 图片 X轴 轮播
     * ’当前张‘ / ‘上一张’ / ’下一张‘ 分别做不同的动作
     * ‘上一张’ 沿 X 轴向左滑动（-width)
     * ’当前张‘ 设置位置在视图中心
     * ’下一张‘ 设置位置在试图中心右侧，准备向左滑动 (+width)
     * X 轴 - position
     * Z 轴 - zIndex
     */

    /** Fade -> 图片渐隐渐显
     * 默认所有 item 为隐藏
     * '上一张' 隐藏, zIndex = 1；
     * '当前张' 显示, zIndex = 2;
     */

    const container = document.querySelector('.container');
    const items = container.querySelectorAll('.item');

    let current = 0;
    let lastIndex = items.length - 1;

    let prevPage;
    let currentPage;
    let nextPage;

    // 默认配置
    let config = {
        mode: 'slide',
        interval: 1000,
    }

    boot({
        mode: 'fade',
    });

    function boot(custom) {
        // 合并对象，用 custom 合并 config，生成新的对象
        config = Object.assign({}, config, custom);

        switch (config.mode) {
            case 'slide':
                slide();
                break;
            case 'fade':
                hideAll();
                fade();
                break;
        }

        setInterval(() => {
            increment();

            switch (config.mode) {
                case 'slide':
                    slide();
                    break;
                case 'fade':
                    hideAll();
                    fade();
                    break;
            }

        }, config.interval);
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

    function slide() {
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

    function fade() {
        prevPage = getPrev();
        currentPage = getCurrent();

        prevPage.style.opacity = 0;
        prevPage.style.zIndex = 1;

        currentPage.style.opacity = 1;
        currentPage.style.zIndex = 2;
    }

    function hideAll() {
        items.forEach(it => {
            it.style.opacity = 0;
        })
    }

})();
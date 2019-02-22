; (function () {

    let container = document.getElementById('container');
    let star, tag, logo_font, frame;
    let title;

    star = container.querySelector('.star');
    tag = container.querySelector('.tag');
    logo_font = container.querySelector('.logo-font');
    frame = container.querySelector('.frame');

    title = document.querySelector('.title');
    backTop();
    boot();

    function boot() {

        initPosition();
        scrollEvent();
    }

    function backTop() {
        window.scrollBy(0, -100)

        scrolldelay = setTimeout('backTop()', 10)

        var sTop = document.documentElement.scrollTop + document.body.scrollTop

        if (sTop === 0) {
            clearTimeout(scrolldelay)
        }
    }

    /**
     * 初始化元素位置及透明度
     */
    function initPosition() {

        star.style.top = -70;
        tag.style.top = document.body.offsetHeight;
        logo_font.style.top = document.body.offsetHeight + 120;

        star.style.opacity = tag.style.opacity = logo_font.style.opacity = frame.style.opacity = 0;
        document.body.style.height = '120%';
    }

    /**
     * 监听鼠标滚动
     */
    function scrollEvent() {
        let increment = 0;
        let reduction_tag = document.body.offsetHeight;
        let reduction_logo_font = document.body.offsetHeight + 120;
        window.addEventListener('scroll', e => {
            // 当鼠标滚动的时候发生变化
            increment += 25;
            reduction_tag -= 40;
            reduction_logo_font -= 40;

            // 当满足条件的时候停止变化
            if (increment > 320)
                increment = 320;

            if (reduction_tag < 382)
                reduction_tag = 382;

            if (reduction_logo_font < 480)
                reduction_logo_font = 480;

            changeMain(increment, reduction_tag, reduction_logo_font);
            changeTitle();
        });
    }


    /**
     * 位置移动
     * 透明度变化
     * @param {Object} increment 
     * @param {Object} reduction_tag 
     * @param {Object} reduction_logo_font 
     */
    function changeMain(increment, reduction_tag, reduction_logo_font) {
        star.style.top = increment;
        tag.style.top = reduction_tag;
        logo_font.style.top = reduction_logo_font;
        // logo_font.style.top = reduction;
        star.style.opacity = tag.style.opacity = logo_font.style.opacity = frame.style.opacity = 1;
    }

    /**
     * title 的变化
     */
    function changeTitle() {
        title.style.opacity = 0;
        title.style.marginTop = 0;
    }



})();


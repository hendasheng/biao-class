; (function () {
    'use strict';

    const btn = document.querySelector('.btn');
    const mask = document.querySelector('.mask');
    const popup = document.querySelector('.popup');

    boot();
    function boot() {
        popupVisible(false);
        update();
    }

    function popupVisible(boolean) {
        if (boolean === true) {
            mask.hidden = false;
            popup.hidden = false;
        }
        if (boolean === false) {
            mask.hidden = true;
            popup.hidden = true;
        }
    }

    function update() {
        document.body.addEventListener('click', (e) => {
            if (e.target === btn) {
                popupVisible(true);
                popupPosition();
                return;
            }

            if (e.target === mask) {
                popupVisible(false);
            }
        });
    }

    function popupPosition() {
        let windowWidth = window.innerWidth;
        let windowHeight = window.innerHeight;

        let width = popup.offsetWidth;
        let height = popup.offsetHeight;

        popup.style.left = windowWidth / 2 - width / 2 + 'px';
        popup.style.top = windowHeight / 2 - height / 2 + 'px';

    }



})();
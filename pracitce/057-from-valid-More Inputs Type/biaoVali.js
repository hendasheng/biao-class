; (function () {
    'user strict';

    let is = {
        numeric(value) {
            return !isNaN(parseFloat(value));
        },

        min(value, guide) {
            return value >= guide;
        },

        max(value, guide) {
            return value <= guide;
        },

        between(value, min, max) {
            return this.min(value, min) && this.max(value, max);
        },

        positive(value) {
            if (!this.numeric(value))
                return false;
            return value > 0;
        },

        negative(value) {
            if (!this.numeric(value))
                return false;
            return value < 0;
        },

        minLength(value, guide) {
            return value.length >= guide;
        },

        maxLength(value, guide) {
            return value.length <= guide;
        },

        LengthBetWeen(value, min, max) {
            return this.minLength(value, min) && this.maxLength(value, max);
        },

        startsWith(value, guide) {
            return value.startsWith(guide);
        },

        endsWith(value, guide) {
            return value.endsWith(guide);
        },

        includes(value, guide) {
            return value.includes(guide);
        },

        /**
         * 在数组中
         *
         * @param {mix} value
         * @param {Array} guide
         */
        in(value, guide) {
            return guide.indexOf(value) !== -1;
        },


    };

    console.log(is.numeric(1));
    console.log(is.min(1, 2));
    console.log(is.max(2, 1));
    console.log(is.between(3, 2, 4));
    console.log(is.positive(1));
    console.log(is.negative(2));

    console.log(is.minLength('aa', 2));
    console.log(is.maxLength('aass', 2));

    console.log(is.LengthBetWeen('23232', 1, 3));

    console.log(is.startsWith('211', 1));
    console.log(is.endsWith('212', 1));

    console.log(is.includes('dvx', 'a'))

    console.log(is.in('a', ['a', 'b']));




})();
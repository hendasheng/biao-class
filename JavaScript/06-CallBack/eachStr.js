; (function () {
    'use strict';

    // 基础函数 eachStr() 可以传入字符串组成的数组和一个回调函数
    function eachStr(arr, fn) {
        for (let i = 0; i < arr.length; i++) {
            fn(arr[i]);
        }
    }

    // 在数组中，找到包含 ‘yo’ 的元素，并保存到一个新的数组中
    // function getYo(arr) {
    //     let result = [];
    //     eachStr(arr, it => {
    //         if (it.includes('yo'))
    //             result.push(it);
    //     });
    //     return console.log(result);
    // }
    // getYo(['a', 'yo', 'yoo', 'oy']);

    // 在数组中，找到长度为 1 的元素，并保存到新的数组中
    // function shorStr(arr) {
    //     let result = [];
    //     eachStr(arr, it => {
    //         if (it.length <= 1)
    //             result.push(it);
    //     });
    //     return console.log(result);
    // }
    // shorStr(['a', 'abb', 'b', 'bcc']);

    // 将数组中的每个元素连接
    // function join(arr) {
    //     let result = '';
    //     eachStr(arr, it => {
    //         result += it;
    //     });
    //     return console.log(result);
    // }
    // join(['y', 'o', 'o']);

    // search() 在数组中，找出包含关键字的元素
    // function search(arr, key) {
    //     let result = [];
    //     eachStr(arr, it => {
    //         if (it.includes(key))
    //             result.push(it);
    //     });
    //     return console.log(result);
    // }
    // search(['abc', 'bbb', 'yoa', 'haha'], 'a');

    // search() 在数组中，找不不包含关键字的元素
    function search(arr, key) {
        let result = [];
        eachStr(arr, it => {
            if (it.includes(key)) {
                return;
            } else {
                result.push(it);
            }
        });
        return console.log(result);
    }
    search(['abc', 'bbb', 'yoa', 'haha'], 'a');


})();
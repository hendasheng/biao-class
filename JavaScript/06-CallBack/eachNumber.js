; (function () {
    'use strict';

    // 基础函数 eachNumber() 可以传入数字组成的数组和一个回调函数
    function eachNumber(arr, fn) {
        for (let i = 0; i < arr.length; i++) {
            fn(arr[i]);
        }
    }

    // 查找数组中的偶数
    // function evenNumber(arr) {
    //     let result = [];

    //     eachNumber(arr, function (it) {
    //         if (it % 2) return;
    //         result.push(it);
    //     });
    //     return console.log(result);
    // }
    // evenNumber([1, 2, 3, 4]);

    // 查找数组中的奇数
    // function oddNumber(arr) {
    //     let result = [];
    //     eachNumber(arr, function(it) {
    //         if(it % 2 == 0) return;
    //         result.push(it);
    //     });
    //     return console.log(result);
    // }
    // oddNumber([1, 2, 3]);

    // 数组中所有数字之和
    // function sum(arr) {
    //     let s = 0;
    //     eachNumber(arr, function (it) {
    //         s += it;
    //     });
    //     return console.log(s);
    // }
    // sum([1, 2, 3, 4]);

    // 找出数组中最大值
    // function max(arr) {
    //     let result;
    //     eachNumber(arr, it => {
    //         // 如果是第一次，将第一个值存为结果，用于后面的运算
    //         if (result == undefined) {
    //             result = it;
    //             return;
    //         }
    //         // 如果最新的值大于最大值，那么它就是新的最大值
    //         if (it > result)
    //             result = it;
    //     });
    //     return console.log(result);
    // }

    // max([1, 4, 2, 7]);




})();
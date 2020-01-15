; (function () {
    'use strict';

    // 返回两个参数之和
    // function add(a, b) {
    //     return a + b;
    // }
    // console.log(add(1, 5));

    // 分别打印数组中的元素
    // function printer(a) {
    //     for(let i = 0; i < a.length; i++) {
    //         console.log(a[i]);
    //     }
    // }
    // printer(['a', 'b', 'c']);
    // printer([1, 'z', 3]);

    // printer(arr, breaker) 分别打印数组中的每一项，且只打印 breaker 以前的元素
    // let list = ['王花花', '刘贝贝', '李栓蛋', '赵可爽'];
    // function printer(arr, breaker) {
    //     for (let i = 0; i < arr.length; i++) {
    //         if (arr[i] == breaker) break;
    //         console.log(arr[i]);
    //     }
    // }
    // printer(list, '赵可爽');

    // printer(arr, jumper) 分别打印数组中的每一项，且不打印 jumper
    // function printer(arr, jumper) {
    //     for(let i = 0; i < arr.length; i++) {
    //         if(arr[i] == jumper) continue;
    //         console.log(arr[i]);
    //     }
    // }
    // printer(list, '李栓蛋');

    // glue(list) 将数组内所有元素相连
    // let list = ['王花花', '刘贝贝', '李栓蛋', '赵可爽'];
    // function glue(arr) {
    //     let g = '';
    //     for(let i = 0; i < arr.length; i++) {
    //         g += list[i] + ' ';
    //     }
    //     return console.log(g);
    // }
    // glue(list);

     // glue(list) 将数组内所有元素相连, 并且可以指定用什么连接
    // function glue(arr, symbol) {
    //     let g = '';
    //     for(let i = 0; i < arr.length; i++) {
    //         g += arr[i] + symbol;
    //     }
    //     return console.log(g);
    // }
    // glue(list, '%');

    // sum(arr) 将传入的数组求和
    // function sum(arr) {
    //     let s = 0;
    //     for(let i = 0; i < arr.length; i++) {
    //         s += arr[i];
    //     }
    //     return console.log(s);
    // }
    // sum([1, 2, 3]);

    // filterSum(arr) 可以将传入的数组，且只求和内部所有的数字元素
    // function filterSum(arr) {
    //     let s = 0;
    //     for(let i = 0; i < arr.length; i++) {
    //         if(typeof arr[i] != 'number') continue;
    //         s += arr[i];
    //     }
    //     return console.log(s);
    // }
    // filterSum([1, 2, 3, 'Yo']);

    // filterGlue 可以传入数组，且只连接数组内部的所有字符串
    // function filterGlue(arr) {
    //     let s = '';
    //     for(let i = 0; i < arr.length; i++) {
    //         if(typeof arr[i] != 'string') continue;
    //         s += arr[i];
    //     }
    //     return console.log(s);
    // }
    // filterGlue([1, 2, 'Ha', 'Ji']);
    
    // sumEven(arr) 求数组中偶数元素之和
    // function sumEven(arr) {
    //     let s = 0;
    //     for(let i = 0; i < arr.length; i++) {
    //         if(arr[i] % 2 != 0) continue;
    //         s += arr[i];
    //     }
    //     return console.log(s);
    // }
    // sumEven([1, 2, 2, 3]);

    // filterOdd(arr) 返回新数组，且数组中只有奇数
    // function filterOdd(arr) {
    //     let list = [];
    //     for(let i = 0; i < arr.length; i++) {
    //         if(arr[i] % 2 == 0) continue;
    //         list.push(arr[i]);
    //     }
    //     return console.log(list);
    // }
    // filterOdd([1, 1, 3, 4, 5]);

    // yoMaker() 生成新数组，可以指定需要生成多少个元素
    function yoMaker(total) {
        
    }

    
    
})();
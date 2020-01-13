; (function () {
    'use strict';

    let a = '5';

    let b = a - 1;

    let c = [1, 2, 3, 4, 'Yo'];

    // console.log(typeof(a));
    // console.log(b);

    // for(let i = 0; i < c.length; i ++) {
    //     console.log(c[i])
    // }

    // let n = null;
    // console.log(typeof(n));

    // 对象类型
    let whh = {
        name: 'whh',
        age: 12,
    };

    let lsd = {
        name: 'lsd',
        age: 16,
    };

    let x = whh.age + lsd.age;
    // console.log(x);

    // 数组类型
    let arr = ['a', 'b', 'c', 'd', [1, 2, 3, 4]];
    for(let i = 0; i < arr.length; i ++) {
        console.log(arr[i])
    }
    console.log(arr[4][2]);

    let d = 'e';
    arr.push(d);
    arr.splice(1, 3);
    console.log(arr);

})();
; (function () {
    'use strict';

    // let i = 0;
    // while (i < 3) {
    //     console.log(i);
    //     i++;
    // }

    // for (let i = 0; i < 3; i++) {
    //     console.log(i);
    // }

    // let event = true;
    // let current = 0;
    // while (event) {
    //     console.log('继续执行');
    //     current++;
    //     if (current >= 100) break;
    // }

    // let current = 0;
    // while (current < 100) {
    //     console.log('正在执行第' + current + '次');
    //     current++;
    // }

    // 跳过 continue
    // let a = [1, 2, 4, 5, 'haha', 6];
    // for (let i = 0; i < a.length; i++) {
    //     let it = a[i];
    //     if (it === 'haha') continue;
    //     // console.log('字符串');
    //     console.log(it);
    // }

    // let a = [1, 2, 4, 5, 'haha', 6];
    // for (let i = 0; i < a.length; i++) {
    //     let it = a[i];
    //     if(typeof(it) != 'number') continue;
    //     console.log(it);
    // }

    // 连接数组中的字符串
    // 数组中数字之和
    // let list = ['Yo', 'haha', 1, 'Ka', 5, 9, 'der', 12, 2];
    // let s = '';
    // for (let i = 0; i < list.length; i++) {
    //     let join = '/';
    //     if (typeof (list[i]) != 'string') {
    //         continue;
    //     }
    //     s += list[i] + join;
    // }
    // console.log(s); // 连接数组中的字符串

    // let add = 0;
    // for (let i = 0; i < list.length; i++) {
    //     if (typeof (list[i]) != 'number') {
    //         continue;
    //     }
    //     add += list[i];
    // }
    // console.log(add); // 数组中数字之和

    // let list = ['a1', 'a2', ['b1', 'b2', ['c1', 'c2', 'c3'], 'b3'], 'a3'];

    // 将工资高于 100 的存放到 high 中
    // let list = [
    //     {
    //         name: '王花花',
    //         salary: 100,
    //     },
    //     {
    //         name: '李栓蛋',
    //         salary: 200,
    //     },
    //     {
    //         name: '牛杯杯',
    //         salary: 300,
    //     }
    // ];

    // let high = [];
    // for(let i = 0; i < list.length; i++) {
    //     let it = list[i];
    //     if(it.salary <= 100) continue;
    //     high.push(it);
    // }
    // console.log(high);

    // 用 while 替换 for
    // for(let i = 0; i < 3; i++) {
    //     alert(`number ${i}! `);
    // }

    // let i = 0;
    // while(i < 3) {
    //     alert(`number ${i} !`);
    //     i++;
    // }

    // let num;
    // do {
    //     num = prompt('输入大于 100 的数组', 0);
    // } while (num <= 100 && num);



})();
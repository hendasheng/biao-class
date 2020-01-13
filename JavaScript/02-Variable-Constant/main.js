; (function () {
    'use strict';

    // 变量 Variable - 可变
    let name = "王花花";
    let nickname = name;

    console.log(name);
    console.log(nickname);

    // 常量 Constant - 不可变
    const d = 1;
    console.log(d);

    let a, b, c;
    a = 1;
    b = 2;
    c = a + b;
    console.log(a, b, c);

})();
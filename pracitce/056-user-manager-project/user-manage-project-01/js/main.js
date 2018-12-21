; (function () {
    'use strict';

    let bf, bt;

    let structure = {
        username: '用户名',
        email: '邮箱',
        balance: '余额',
    };

    let list = [
        {
            username: 'whh',
            email: 'whh@gmail.com',
            balance: 100,
        },
        {
            username: 'lsd',
            email: 'lsd@gmail.com',
            balance: 102,
        },
    ];

    let actions = {
        Delete(tr, i) {
            tr.remove();
            list[i] = null;
        },
        Updata(tr, i) {

            bf.setData(list[i]);
        }
    };

    boot();

    function boot() {
        bf = biaoForm('form', onSubmit);

        bt = biaoTable('table', structure, list, actions);
    }

    function onSubmit(data) {
        list.push(data);
        bt.render();
    }

})();
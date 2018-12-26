; (function () {
    'use strict';

    let bf, bt;
    let form = document.querySelector('form');

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



    boot();

    function boot() {
        perpareForm();
        perpareTable();
    }


    function perpareForm() {
        bf = biaoForm('form', onSubmit);
    }

    function perpareTable() {
        let actions = {
            Delete(tr, i) {
                tr.remove();
                list[i] = null;
            },
            Updata(tr, i) {
                form.querySelector('[name=index]').value = i;
                bf.setData(list[i]);
            },
        };

        bt = biaoTable('table', structure, list, actions);
    }

    function onSubmit(row) {
        if (!row.index && row.index !== 0)
            list.push(row);
        list[row.index] = row;

        bt.render();
    }

})();
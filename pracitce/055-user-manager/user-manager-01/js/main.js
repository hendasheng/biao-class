; (function () {
    'use strict';

    let users = [
        {
            username: 'whh',
            email: 'whh@gmail.com',
            balance: '192',
        },
        {
            username: 'lsd',
            email: 'lsd@gmail.com',
            balance: '123',
        },
        {
            username: 'zks',
            email: 'zks@gmail.com',
            balance: '134',
        },
    ];

    let elForm = document.getElementById('user-form');
    let elTable = document.getElementById('user-table');
    let elTbody = elTable.tBodies[0];

    let inputs = {
        index: elForm.querySelector('[name=index]'),
        username: elForm.querySelector('[name=username]'),
        email: elForm.querySelector('[name=email]'),
        balance: elForm.querySelector('[name=balance]'),
    };

    boot();

    function boot() {
        render();
        bindSubmit();
    }

    function bindSubmit() {
        elForm.addEventListener('submit', e => {
            e.preventDefault();
            let row = {};

            let index = inputs.index.value;

            row.username = inputs.username.value;
            row.email = inputs.email.value;
            row.balance = inputs.balance.value;

            if (index)
                users[index] = row;
            else
                users.push(row);

            elForm.reset();
            render();

        });
    }

    function render() {
        elTbody.innerHTML = '';
        users.forEach((user, i) => {
            if (!user)
                return;

            let tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${user.username}</td>
                <td>${user.email}</td>
                <td>${user.balance}</td>
                <td class="text-right operations">
                    <button class="fill">更新</button>
                    <button class="delete">删除</button>
                </td>
            `;

            let q = tr.querySelector.bind(tr);

            q('.operations').addEventListener('click', e => {
                let klass = e.target.classList;
                if (klass.contains('delete')) {
                    users[i] = null;
                    tr.remove();
                    console.log(users);
                }

                if (klass.contains('fill')) {
                    inputs.index.value = i;
                    inputs.username.value = user.username;
                    inputs.email.value = user.email;
                    inputs.balance.value = user.balance;
                }
            })


            elTbody.appendChild(tr);
        });
    }

})();
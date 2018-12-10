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

    boot();

    function boot() {
        render();
        bindSubmit();
    }

    function bindSubmit() {
        elForm.addEventListener('submit', e => {
            e.preventDefault();
            let row = {};
            row.username = elForm.querySelector('[name=username]').value;
            row.email = elForm.querySelector('[name=email]').value;
            row.balance = elForm.querySelector('[name=balance]').value;

            users.push(row);
            render();
            elForm.reset();

        });
    }

    function render() {
        elTbody.innerHTML = '';
        users.forEach(user => {
            let tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${user.username}</td>
                <td>${user.email}</td>
                <td>${user.balance}</td>
            `;

            elTbody.appendChild(tr);
            
        });
    }

})();
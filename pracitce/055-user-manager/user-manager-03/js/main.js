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
    let elTbody = elTable.querySelector('tbody');
    let inputs = elForm.querySelectorAll('[name]');

    boot();

    function boot() {
        // renderBody();
        bindSubmit();
    }

    function bindSubmit() {
        elForm.addEventListener('submit', e => {
            let row = {};
            e.preventDefault();
            inputs.forEach(it => {
                row[it.name] = it.value
            });
            renderTbale();
            users.push(row);
            elForm.reset();
        });
    }


    function renderTbale() {
        users.forEach((it, i) => {
            if (!users)
                return;
            let html = '';
            let tr = document.createElement('tr');
            tr.innerHTML = '';
            for (let key in it) {
                html += `<td>${it[key]}</td>`;
            };
            html += `<td class="btn">
                        <button class="fill">更新</button>
                        <button class="delete">删除</button>
                    </td>`;
            tr.innerHTML = html;

            let btn = tr.querySelector('.btn');
            btn.addEventListener('click', e => {
                let el = e.target;
                // 如果点击的是 fill - 更新
                if (el.classList.contains('fill')) {
                   
                }
                // 如果点击的是 delete - 删除
                if (el.classList.contains('delete')) {
                    tr.remove();
                    users[i] = null;
                    console.log(users);
                }
            })

            elTbody.appendChild(tr);
        });
    }

})();
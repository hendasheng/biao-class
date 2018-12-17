; (function () {
    'use strict';

    // 用于存放全部用户数据
    let users = [
        //  {
        //      username: 'whh',
        //      email: 'whh@gmail',
        //      balance: '103',
        //  },
        //  {
        //     username: 'lsd',
        //     email: 'lsd@gmail',
        //     balance: '101',
        // },
    ];

    
    let elForm = document.getElementById('user-form');
    let elTable = document.getElementById('user-table');
    let elTbody = elTable.querySelector('tbody');

    boot();

    function boot() {
        bindSubmit();
    }


    /**
     * 绑定 submit 事件
     *
     */
    function bindSubmit() {
        elForm.addEventListener('submit', e => {
            e.preventDefault();

            // 获取每个用户的数据(每一行)
            let row = {};
            row.username = elForm.querySelector('[name=username').value;
            row.email = elForm.querySelector('[name=email]').value;
            row.balance = elForm.querySelector('[name=balance]').value;
            
            // 把每个用户数据存到 user 数组中
            users.push(row);

            // 执行渲染 tbody 函数
            render();

            // 每次执行 submit 后，重置 form
            elForm.reset();
        });
    }

    /**
     * 渲染 tbody
     *
     */
    function render() {
        elTbody.innerHTML = '';

        // 循环数组内的每一条数据
        users.forEach(user => {
            // 创建包含数据元素 tr
            let tr = document.createElement('tr');

            // 把数据添加到 tr > td 中
            tr.innerHTML = `
                            <td>${user.username}</td>
                            <td>${user.email}</td>
                            <td>${user.balance}</td>
                            `;
            
            // 把填充好的 tr 追加到 tbody 中
            elTbody.appendChild(tr);
        });
    }

})();
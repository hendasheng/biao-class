; (function () {
    'use strict';

    // 用于存放全部用户数据
    let users = [
         {
             username: 'whh',
             email: 'whh@gmail',
             balance: '103',
         },
         {
            username: 'lsd',
            email: 'lsd@gmail',
            balance: '101',
        },
    ];


    let elForm = document.getElementById('user-form');
    let elTable = document.getElementById('user-table');
    let elTbody = elTable.querySelector('tbody');

    let inputs = {
        index: elForm.querySelector('[name=index'),
        username: elForm.querySelector('[name=username'),
        email: elForm.querySelector('[name=email]'),
        balance: elForm.querySelector('[name=balance]'),
    }


    boot();

    function boot() {
        render();
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
            row.username = inputs.username.value;
            row.email = inputs.email.value;
            row.balance = inputs.balance.value;

            let index = inputs.index.value;

            index ?
                // 如果有 index ，则代表 更新
                users[index] = row :

                //如果没有 index，则代表 新增,把每个用户数据存到 user 数组中
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
        users.forEach((user, index) => {

            if (!user)
                return;

            // 创建包含数据元素 tr
            let tr = document.createElement('tr');

            // 把数据添加到 tr > td 中
            tr.innerHTML = `
                            <td>${user.username}</td>
                            <td>${user.email}</td>
                            <td>${user.balance}</td>                            
                            <td class="operation">
                                <button class="fill">更新</button>
                                <button class="delete">删除</button>
                            </td>
                            `;

            // 给 ”操作“ 单元格绑定点击事件 (代理模式)
            tr.querySelector('.operation').addEventListener('click', e => {
                let el = e.target;
                let btnFill = tr.querySelector('.fill');
                let btnDelete = tr.querySelector('.delete');

                // 如果点击 ”更新“
                if (el === btnFill) {
                    inputs.index.value = index;
                    inputs.username.value = user.username;
                    inputs.email.value = user.email;
                    inputs.balance.value = user.balance;
                }

                //如果点击 "删除"
                if (el === btnDelete) {
                    // 将当前这条数据设置为 null（如果用 splice 删除，会引发索引变化导致的 bug）
                    users[index] = null;
                    // 删除 HTML 中的 tr 元素
                    tr.remove();
                }
            });

            // 把填充好的 tr 追加到 tbody 中
            elTbody.appendChild(tr);
        });
    }

})();
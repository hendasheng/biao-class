; (function () {
    'use strict';


    let elForm = document.getElementById('user-form');
    let elTable = document.getElementById('user-table')
    let elTbody = elTable.querySelector('tbody');

    // 储存所有的用户数据
    let users = [
        {
            username: 'whh',
            email: 'whh@gmail.com',
            balance: 101,
        },
        {
            username: 'lsd',
            email: 'lsd@gmail.com',
            balance: 105,
        },
    ];

    // 储存 input 内的信息
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

    /**
     * 绑定 submit 事件
     *
     */
    function bindSubmit() {
        elForm.addEventListener('submit', e => {
            e.preventDefault();

            // 储存每条用户数据（每行）
            let row = {};
            row.username = inputs.username.value;
            row.email = inputs.email.value;
            row.balance = inputs.balance.value;

            // 定义索引值
            let index = inputs.index.value;

            if (index) {
                // 如果有索引值，代表更新，则用当前用户信息替换 users[index] 的信息
                users[index] = row;
            } else {
                // 如果没有所以只，则代表提交新的数据，直接把数据推入到 users 中
                users.push(row);
            }

            // 提交后清空 form 中的数据
            elForm.reset();

            // 渲染 tBody
            render();
        });
    };


    /**
     * 渲染 tbody
     */
    function render() {
        // 清空前一次渲染的数据，避免重复渲染数据
        elTbody.innerHTML = '';

        // 循环每一条用户数据， user > 每一条用户数据，index > 每条数据的索引
        users.forEach((user, index) => {

            // 如果用户不存在就跳过
            // 因为删除用户时会将数据设为 null
            if (!user)
                return;
                
            // 创建包含数据的容器
            let tr = document.createElement('tr');

            // 将数据填充到容器内
            tr.innerHTML = `
                            <td>${user.username}</td>
                            <td>${user.email}</td>
                            <td>${user.balance}</td>
                            <td class="operation">
                                <button class="fill">更新</button>
                                <button class="delete">删除</button>
                            </td>
                            `;

            // 给 “操作” 单元格绑定点击事件（代理模式）
            tr.querySelector('.operation').addEventListener('click', e => {
                let klass = e.target.classList;

                // 如果冒泡源类名是 fill（如果点击的是 ”更新“）
                if (klass.contains('fill')) {
                    // 将当前用户数据填充到表单中
                    inputs.username.value = user.username;
                    inputs.email.value = user.email;
                    inputs.balance.value = user.balance;

                    inputs.index.value = index;
                }

                // 如果冒泡源类名是 delete（如果点击的是 ”删除“)
                if (klass.contains('delete')) {
                    // 将当前这条数据设置为 null
                    users[index] = null;

                    // 并删除包含这条数据的 tr 元素
                    tr.remove();
                }
            });

            // 将 tr 元素填充到 tbody 中
            elTbody.appendChild(tr);
        });
    }


})();
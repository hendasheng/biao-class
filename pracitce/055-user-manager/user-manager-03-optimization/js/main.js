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
    // 用于判断点击 更新 时，被更新数据的索引值 
    let elIndex = document.querySelector('[name=index]');

    boot();

    function boot() {
        // renderBody();
        bindSubmit();
    }

    /**
     * 绑定提交事件
     */
    function bindSubmit() {
        elForm.addEventListener('submit', e => {
            // 取消默认提交事件
            e.preventDefault();
            // 储存每一行的数据
            let row = {};
            // 循环所有输入组件
            inputs.forEach(it => {
                // 保存到 row
                row[it.name] = it.value;
            });

            // 如果记录索引组建中有值
            // 如 <input type="number" name="index" value="1">
            if (elIndex.value) {
                // 就更新数据
                users[elIndex.value] = row;
            } else {
                // 否则把新的数据推到 users 数组中
                users.push(row);
            }

            // 每次提交后清空 记录索引值的组件
            elIndex.value = '';

            // 每次提交后清空 form 中的数据
            elForm.reset();

            // 但数据发生改变，就重新渲染 table
            renderTbale();
        });
    }


    function renderTbale() {
        // 清空前一次渲染
        elTbody.innerHTML = '';
        // 循环 users - 用户数据
        // it 代表每一条用户数据，i 代表每条数据的索引值
        users.forEach((it, i) => {
            // 如果当前用户（tr）不存在就跳过
            // 因为删除用户时会将数据设为null
            // 避免 tr 中只出现 '更新' '删除' 两个按钮
            if (!it)
                return;

            // 初始化组装字符串
            let html = '';
            // 创建表格行
            let tr = document.createElement('tr');
            tr.innerHTML = '';

            // 循环每一条用户数据
            // 如 {username: 'whh', ...'}
            // 此时 key 为 'username'
            // it[key] 为 'whh'
            // html += <td>whh</td>
            for (let key in it) {
                html += `<td>${it[key]}</td>`;
            };

            // 创建 操作部分的 按钮
            html += `<td class="btn">
                        <button class="fill">更新</button>
                        <button class="delete">删除</button>
                    </td>`;


            // 把拼接好的字符串存到 tr 中
            tr.innerHTML = html;

            // 如果点击了 操作部分的 按钮
            let btn = tr.querySelector('.btn');
            btn.addEventListener('click', e => {
                let el = e.target;
                // 如果点击的是 fill - 更新
                if (el.classList.contains('fill')) {
                    // 就给 index 输入组件填入相应索引值
                    elIndex.value = i;
                    // 循环当前这条用户数据
                    for (let key in it) {
                        // 找到相对应的 input - 输入组件
                        let input = elForm.querySelector(`[name=${key}]`);
                        // 在 input 中填入数据
                        input.value = it[key];
                    };
                };
                // 如果点击的是 delete - 删除
                if (el.classList.contains('delete')) {
                    tr.remove();
                    users[i] = null;
                    console.log(users);
                };
                console.log(i)
            });

            // 把拼装好的 tr 插入到 tbody 中
            elTbody.appendChild(tr);
        });
    }

})();
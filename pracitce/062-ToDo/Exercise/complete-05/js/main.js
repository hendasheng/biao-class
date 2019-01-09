; (function () {
    'use strict';

    let todoForm = document.getElementById('todo-form');
    let input = todoForm.querySelector('[name=title]');
    let list = document.getElementById('todo-list');

    // read 获取到的数据存为全文变量，方便以后调用
    let $list;

    // 点击 更新 时，为 currentId 赋值
    // 在 bingEvents 中，通过是否有 currentId 判断是 更新 还是 创建
    let currentId = null;

    boot();
    function boot() {
        read();
        bindEvents();
    }

    /**
     * 从服务器获取数据
     */
    function read() {
        api('todo/read', null, result => {
            // 把获取到的数据存为全文变量
            $list = result.data;
            render();
            // 取到数据后清空输入框
            todoForm.reset();
        })
    }

    /**
     * 绑定提交事件
     */
    function bindEvents() {
        todoForm.addEventListener('submit', e => {
            e.preventDefault();
            let title = input.value;
            // 如果 currentId 存在，执行 更新
            if (currentId)
                update({ id: currentId, title })
            // 如果 currentId 不存在，执行 创建
            else
                create({ title });
        })
    }

    /**
     * 在服务器中创建一条 item
     * @param {Object} row 
     */
    function create(row) {
        api('todo/create', row, result => {
            if (result)
                read();
        })
    }
    
    /**
     * 渲染 list
     */
    function render() {
        list.innerHTML = '';
        $list.forEach(it => {
            let item = document.createElement('div');
            item.classList.add('todo-item');
            item.innerHTML = `
                            <div>
                                <input class="completed" type="checkbox" ${it.completed ? 'checked' : ''}>
                            </div>
                            <div class="title">${it.title}</div>
                            <div class="operation">
                                <button class="fill">更新</button>
                                <button class="delete">删除</button>
                            </div>
                            `;
            let operation = item.querySelector('.operation');
            let checkbox = item.querySelector('.completed');

            // 当点击 更新 或 删除时
            operation.addEventListener('click', e => {
                let target = e.target;
                // 点击 更新 使
                if (target.classList.contains('fill')) {
                    // 把 title 传入到输入框中
                    input.value = it.title;
                    // 为 currentId 赋值
                    currentId = it.id;
                }

                // 点击 删除 时
                if (target.classList.contains('delete'))
                    remove(it.id);
            })

            // 当 checkbox 被更新时
            checkbox.addEventListener('change', e => {
                setCopmleted(it.id, checkbox.checked);
            })

            // 把组装好的 item 插入到 list 中
            list.appendChild(item);
        });
    }

    /**
     * 删除一条 item
     * @param {Number} id 
     */
    function remove(id) {
        api('todo/delete', { id }, result => {
            if (result)
                read();
        })
    }

    /**
     * 更新一条 item
     * @param {Object} row 
     */
    function update(row) {
        api('todo/update', row, result => {
            currentId = null;
            if (result)
                read();
        })
    }

    // 设置 checkbox
    function setCopmleted(id, completed) {
        api('todo/update', { id, completed }, result => {
            if (result)
                read();
        })
    }

})()
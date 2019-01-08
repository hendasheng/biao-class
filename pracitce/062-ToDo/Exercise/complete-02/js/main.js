; (function () {
    'use strict';

    let todoForm = document.getElementById('todo-form');
    let input = todoForm.querySelector('[name=title]');
    let list = document.getElementById('todo-list');

    let $list;

    let currentId = null;

    boot();

    function boot() {
        read();
        bindEvents();
    }

    /**
     * 获取数据
     */
    function read() {
        api('todo/read', null, result => {
            $list = result.data;
            render();
        })
    }

    /**
     * 绑定提交事件
     */
    function bindEvents() {
        todoForm.addEventListener('submit', e => {
            e.preventDefault();
            let title = input.value;
            // 如果有 currendId 说明是更新
            if (currentId)
                update({ id: currentId, title });
            // 否则被视为创建新的 item
            else
                create({ title });
        })
    }

    /**
     * 在数据库中创建一条 item
     * @param {Object} row 
     */
    function create(row) {
        api('todo/create', row, result => {
            if (result)
                read();
            todoForm.reset();
        })
    }

    /**
     * 渲染清单列表 - list
     */
    function render() {
        list.innerHTML = '';
        $list.forEach(it => {
            let item = document.createElement('div');
            item.classList.add('todo-item');
            item.innerHTML = `
                        <div class="checkbox">
                            <input class="completed" type="checkbox" ${it.completed ? 'checked' : ''}>
                        </div>
                        <div class="title">${it.title}</div>
                        <div class="operation">
                            <button class="fill">更新</button>
                            <button class="delete">删除</button>
                        </div>
                        `;
            
            let checkbox = item.querySelector('.completed');
            let operation = item.querySelector('.operation');

            // 当点击 checkbox 时
            checkbox.addEventListener('change', e => {
                // 设置 checkbox
                setCompleted(it.id, checkbox.checked);
            })

            // 当点击 更新 或 删除时
            operation.addEventListener('click', e => {
                let target = e.target;
                // 如果是 更新
                if (target.classList.contains('fill')) {
                    input.value = it.title;
                    // 给 currentId 提醒 bindEvents 这是 “更新”
                    currentId = it.id;
                }

                // 如果是 删除
                if (target.classList.contains('delete'))
                    remove(it.id);
            })


            list.appendChild(item);
        });
    }

    // 设置 checkbox
    function setCompleted(id, completed) {
        api('todo/update', { id, completed }, result => {
            if (result)
                read();
        })
    }

    // 删除 item
    function remove(id) {
        api('todo/delete', { id }, result => {
            if (result)
                read();
        })
    }

    // 更新 item
    function update(row) {
        api('todo/update', row, result => {
            currentId = null;
            if (result)
                read();
            todoForm.reset();
        })
    }

})()
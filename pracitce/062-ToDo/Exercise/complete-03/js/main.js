; (function () {
    'use strict';

    let todoForm = document.getElementById('todo-form');
    let input = todoForm.querySelector('[name=title]');
    let list = document.getElementById('todo-list');

    let $list;

    let currentId = null;

    boot()
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
            if (currentId)
                update({ id: currentId, title });
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

            // 如果点击 checkbox
            checkbox.addEventListener('change', e => {
                setCompleted(it.id, checkbox.checked)
            })

            // 如果点击 更新 或者 删除
            operation.addEventListener('click', e => {
                let target = e.target;
                if (target.classList.contains('delete'))
                    remove(it.id);

                if (target.classList.contains('fill')) {
                    input.value = it.title;
                    currentId = it.id;
                }
            })

            // 拼装好的 item 插入到 list 中
            list.appendChild(item);
        });
    }

    /**
     * 检查是否 checked
     * @param {Number} id 
     * @param {Object} completed 
     */
    function setCompleted(id, completed) {
        api('todo/update', { id, completed }, result => {
            if (result)
                read();
        })
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
     * 更新 item
     * @param {Object} row 
     */
    function update(row) {
        api('todo/update', row, result => {
            currentId = null;
            if (result)
                read();
        })
    }

})()
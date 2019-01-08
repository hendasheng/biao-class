; (function () {
    'use strict';

    let todoForm = document.getElementById('todo-form');
    let input = todoForm.querySelector('[name=title]');
    let list = document.getElementById('todo-list');

    let $list;

    let currentId = null;

    // console.log(list);

    boot();

    function boot() {
        read();
        bindEvents();
    }

    /**
     * 获取数据
     */
    function read() {
        api('todo/read', null, data => {
            // 把数据储存到全文变量中
            $list = data.data;
            // 获取数据后渲染 item
            render();
        });
    }

    /**
     * 绑定事件
     */
    function bindEvents() {
        todoForm.addEventListener('submit', e => {
            e.preventDefault();
            // 取得输入框中输入的内容
            let title = input.value;
            // 如果有 id 说明此时为更新，则执行 update
            if (currentId)
                update({ id: currentId, title });
            // 否则执行创建 item
            else
                create({ title: title });
        });
    }


    /**
     * 在数据库中创建一条 item
     * @param {Object} row 
     */
    function create(row) {
        api('todo/create', row, result => {
            // 创建后，重新获取数据
            if (result)
                read();
            // 清空输入框
            todoForm.reset();
        })
    }

    /**
     *  渲染 item
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
                                <div class="title">
                                    ${it.title}
                                </div>
                                <div class="operation">
                                    <button class="fill">更新</button>
                                    <button class="delete">删除</button>
                                </div>
                                `;

            let checkbox = item.querySelector('.completed');
            let operation = item.querySelector('.operation');

            // 当 checkbox 更新时
            checkbox.addEventListener('change', e => {
                setCompleted(it.id, checkbox.checked);
            });

            // 当点击 更新 或 删除 时
            operation.addEventListener('click', e => {
                let target = e.target;
                if (target.classList.contains('fill')) {
                    currentId = it.id;
                    input.value = it.title;
                }

                if (target.classList.contains('delete'))
                    remove(it.id);
            })

            list.appendChild(item);
        });
    }

    /**
     * 判断是否完成
     * @param {Number} id 
     * @param {Boolean} completed 
     */
    function setCompleted(id, completed) {
        api('todo/update', { id, completed }, result => {
            read();
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
            todoForm.reset();
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
            todoForm.reset();
        })
    }

})()
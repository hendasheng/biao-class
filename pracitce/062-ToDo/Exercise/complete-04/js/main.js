; (function () {
    'use strict';

    let todoForm = document.getElementById('todo-form');
    let input = todoForm.querySelector('[name=title]');
    let list = document.getElementById('todo-list');

    // 储存所有获取的数据
    let $list;

    // bindEvents 中基于 currentId 判断 更新 还是 创建
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
            // 把获取到的储存存为全文变量，方便以后调用
            $list = result.data;
            // 获取到数据后渲染到 HTML
            render();
            // 获取数据后清空输入框
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
            // currentId 配合更新使用，如果有则表示 更新，否则表示 创建
            if (currentId)
                update({ id: currentId, title });
            else
                create({ title });
        })
    }

    /**
     * 创建一条 item
     * @param {Object} row 
     */
    function create(row) {
        api('todo/create', row, result => {
            if (result)
                read();
        })
    }

    /**
     *  渲染 list
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

            // 如果点击的是 更新 或 删除
            operation.addEventListener('click', e => {
                let target = e.target;
                // 如果点击的是 更新
                if (target.classList.contains('fill')) {
                    // 当前 title 传入到 输入框
                    input.value = it.title;
                    // 设置 currentId 为当前 id
                    currentId = it.id;
                }
                if (target.classList.contains('delete'))
                    remove(it.id);
            })

            // 如果点击（更新）checkbox
            checkbox.addEventListener('change', e => {
                setCompleted(it.id, checkbox.checked);
            })

            // 把拼装好的 item 插入到 list 中
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
     * 更新 item
     * @param {Object} row 
     */
    function update(row) {
        api('todo/update', row, result => {
            // 更新时 currentId 恢复到 null，不然 bindEvents 中会一直以为是更新
            currentId = null;
            if (result)
                read();
        })
    }

    /**
     * 设置 checkbox
     * @param {Number} id 
     * @param {Boolean} completed 
     */
    function setCompleted(id, completed) {
        api('todo/update', { id, completed }, result => {
            if (result)
                read();
        })
    }

})()
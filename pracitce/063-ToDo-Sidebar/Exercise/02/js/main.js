; (function () {
    'use strict';

    let todoForm = document.getElementById('todo-form');
    let input = todoForm.querySelector('[name=title]');
    let list = document.getElementById('todo-list');

    // 在 create 中，把取到的数据存到 $list 全文变量中，方便以后调用
    let $list;

    // 用于判断是 更新 还是 创建
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
            // 取到数据后，存到 全文变量中
            $list = result.data;
            render();
            // 获取到数据后，清空 输入框
            todoForm.reset();
        });
    }

    /**
     * 绑定提交事件
     */
    function bindEvents() {
        todoForm.addEventListener('submit', e => {
            e.preventDefault();
            let title = input.value;
            // 如果 currentId 存在，则执行 更新
            if (currentId)
                update({ id: currentId, title });
            // 否则为执行 创建
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
            let checkbox = item.querySelector('.completed');
            let operation = item.querySelector('.operation');

            // 如果 checkbox 状态有更新，则在服务器中设置 checkbox
            checkbox.addEventListener('change', e => {
                setCompleted(it.id, checkbox.checked);
            })

            // 如果点击的是 更新 或者 删除
            operation.addEventListener('click', e => {
                let target = e.target;
                // 如果点击的是 更新
                if (target.classList.contains('fill')) {
                    // 把当前 title 传入到输入框内
                    input.value = it.title;
                    // 设置 currrentId 为当前 Id，create 中则会判断此时为更新
                    currentId = it.id;
                }

                // 如果点击的是 删除
                if (target.classList.contains('delete'))
                    remove(it.id);
            })

            // 组装好的 item 插入到 list 中
            list.appendChild(item);
        });
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
; (function () {
    'use strict';

    let todoForm = document.getElementById('todo-form');
    let input = todoForm.querySelector('[name=title]');
    let list = document.getElementById('todo-list');

    // 用于储存数据，方便以后调用
    let $list;

    // 用于判断是 更新 还是 创建
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
            // 把取到的数据存到全文变量中
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
            // 当 更新 时， currentId 会被替换成相应的 id，如果有 currentId 说明此时应该执行 更新
            if (currentId)
                update({ id: currentId, title })
            // 如果没有 currentId 则执行 创建
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

            // 当 checkbox 更新时，通过 setCompleted 设置 checkbox 状态
            checkbox.addEventListener('change', e => {
                setCompleted(it.id, checkbox.checked);
            });

            operation.addEventListener('click', e => {
                let target = e.target;
                // 当点击 更新 时
                if (target.classList.contains('fill')) {
                    // 把 输入框 中的内容替换成当前 title
                    input.value = it.title;
                    // currentId 设置为当前 id，creat 中会根据 currentId 判断此时为 更新
                    currentId = it.id;
                }

                if (target.classList.contains('delete'))
                    remove(it.id);
            });

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
     * 更新题条 item
     * @param {Object} row 
     */
    function update(row) {
        api('todo/update', row, result => {
            // 执行更新时，currentId 设置为 null，不然 create 会一直认为是 更新
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
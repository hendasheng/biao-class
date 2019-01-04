// 01 - 获取数据 read()
//      缓存取得的数据到全文变量，方便以后调用
//      获取数据后渲染 render()

// 02 - 绑定提交事件 bindEvents()
//      获取输入框中输入的内容 listTitle
//      通过 create(listTitle) 在数据库中创建一条 list

// 03 - 在数据库中创建一条 list create(row)
//      通过 api(action, row)

// 04 - 渲染 todo-list
//      循环取得的数据，渲染每一条
//      点击 复选框 时的状态  - setCompleted
//      点击 更新/删除 时的状态 - delete / update

; (function () {
    'use strict';

    let form = document.getElementById('todo-form');
    let input = form.querySelector('[name="title"]');
    let list = document.getElementById('todo-list');
    let currentId = null;

    let $list;

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
            $list = data.data;
            // 取得数据后渲染
            render();
        });
    }

    /**
     * 绑定提交事件
     */
    function bindEvents() {
        form.addEventListener('submit', e => {
            e.preventDefault();
            let title = input.value;

            if (currentId)
                update(currentId, { title });
            else
                // {title: title} ==> {title}
                create({ title });
        });
    }

    /**
     * 在数据库中创建一条 list
     * @param {Object} row
     */
    function create(row) {
        api('todo/create', row, result => {
            // 创建成功后
            if (result) {
                // 重新获取数据
                read();
                form.reset();
            }
        });
    }

    /**
     * 渲染数据
     */
    function render() {
        list.innerHTML = '';
        if (!$list)
            return;
        $list.forEach(it => {
            let item = document.createElement('div');
            item.classList.add('todo-item');
            // ↓ 
            item.innerHTML = `
                                <div class="checkbox">
                                    <input class="completed" type="checkbox" ${it.completed ? 'checked' : ''}>
                                </div>
                                <div class="title">
                                    ${it.title}
                                </div>
                                <div class="operations">
                                    <button class="fill">更新</button>
                                    <button class="delete">删除</button>
                                </div>
                                `;

            // 选中所有复选框
            let checkbox = item.querySelector('.completed');

            // 找到 更新/删除 的父级元素
            let operations = item.querySelector('.operations');

            // 当 复选框 状态改变时 - 打开 / 关闭
            checkbox.addEventListener('change', e => {
                setCompleted(it.id, checkbox.checked);
            });

            // 当点击 更新/删除 时
            operations.addEventListener('click', e => {
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
     * 删除一条 list
     *
     * @param {*} id
     */
    function remove(id) {
        api('todo/delete', { id }, resule => {
            read();
        });
    }

    /**
     * 更新 list
     *
     * @param {Number} id
     * @param {Object} row
     */
    function update(id, row) {
        api('todo/update', { id, ...row }, result => {
            if (result) {
                // 更新时清空 id
                currentId = null;
                read();
                form.reset();
            }
        });
    }

    /**
     * 设置完成与否 checked
     * @param {Number} id
     * @param {Boolean} completed
     */
    function setCompleted(id, completed) {
        api('todo/update', { id, completed }, result => {
            read();
        });
    }

})();
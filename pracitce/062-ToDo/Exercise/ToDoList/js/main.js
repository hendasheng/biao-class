// 01 - 获取数据 read
//      并保存数据到全文变量 - $list


// 02 - 绑定提交事件 bindEvents
//      取得输入的值，也就是清单标题
//      在 数据库 中创建一条新的数据 - create

// 03 - 在 数据库 中创建一条新数据
//      创建后重新获取数据

// 04 - 渲染 list
//      循环取得的数据填充 list
//  
//      如果点击 复选框 ...
//          setCompleted()
//      如果点击 删除      
//          remove()
//      如果点击 更新
//          update()


; (function () {
    'use strict';

    let form = document.getElementById('todo-form');
    let input = form.querySelector('[name="title"]');
    let list = document.getElementById('todo-list');

    // 用于保存 read 获取的数据
    let $list;

    // 用于在 update 中记录 id
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
        api('todo/read', null, data => {
            $list = data.data;
            render();
        })
    }

    /**
     * 提交事件
     */
    function bindEvents() {
        form.addEventListener('submit', e => {
            e.preventDefault();
            // 获取输入的内容
            let title = input.value;
            // 如果有 currentId - 代表 更新
            if (currentId)
                update({ id: currentId, title });
            else // 否则创建
                create({ title });
        });
    }

    // 在 数据库 中创建一条 list
    function create(row) {
        api('todo/create', row, result => {
            read();
            // 创建后清空输入框
            form.reset();
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
                            <div class="title">
                                ${it.title}
                            </div>
                            <div class="operations">
                                <button class="fill">更新</button>
                                <button class="delete">删除</button>
                            </div>
                            `;


            let completed = item.querySelector('.completed');
            let operations = item.querySelector('.operations');

            // 当 复选框 发生变化时 - 勾选 / 取消勾选
            completed.addEventListener('change', e => {
                setCompleted(it.id, completed.checked);
            })

            // 当点击 更新 / 删除 时
            operations.addEventListener('click', e => {
                let target = e.target;

                // 如果是 删除
                if (target.classList.contains('delete'))
                    remove(it.id);

                // 如果是 更新
                if (target.classList.contains('fill')) {
                    // 点击更新时设置 currentId，bindEvents 通过是否有 currentId 判断执行 update 或 create
                    currentId = it.id;
                    // 在输入框中填充这条 list 的 title
                    input.value = it.title;
                }
            })

            // 组装好的 item 插入到 list 中
            list.appendChild(item);
        });
    }

    /**
     * 设置 checked
     * 
     * @param {Number} id
     * @param {Boolean} completed
     */
    function setCompleted(id, completed) {
        api('todo/update', { id, completed }, resule => {
            read();
        })
    }

    /**
     * 删除 list
     *
     * @param {Number} id - 删除当前 id 项
     */
    function remove(id) {
        api('todo/delete', { id }, result => {
            read();
        })
    }

    /**
     * 更新 list
     *
     * @param {Object} row - row 中包含 id / title
     */
    function update(row) {
        api('todo/update', row, result => {
            currentId = null;
            read();
            form.reset();
        });
    }

})();